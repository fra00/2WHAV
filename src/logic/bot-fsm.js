import { createFSM } from "../fsm/fsm-engine.js";

/**
 * L'API che la FSM si aspetta di ricevere per interagire con il gioco.
 * @typedef {object} BotApi
 * @property {() => Array<string|null>} getBoard - Ritorna lo stato attuale della scacchiera.
 * @property {() => number[]} getAvailableMoves - Ritorna un array con gli indici delle mosse disponibili.
 * @property {() => string|null} getGameStatus - Ritorna lo stato della partita ('X', 'O', 'TIE', o null).
 * @property {(moveIndex: number) => void} makeMove - Esegue la mossa del bot.
 * @property {(message: string) => void} log - Funzione per il logging.
 */

// SALVA un riferimento all'oggetto per accedere alle helper
const fsmDefinition = {
  // ===== SEZIONE A: CONFIGURAZIONE (initialState, initialMemory, constants) =====
  initialState: "IDLE",

  initialMemory: {
    moveCount: 0,
  },

  constants: {
    PLAYER: "O",
    OPPONENT: "X",
    TIE: "TIE",
    WINNING_LINES: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Righe
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Colonne
      [0, 4, 8],
      [2, 4, 6], // Diagonali
    ],
    CENTER: 4,
    CORNERS: [0, 2, 6, 8],
    SIDES: [1, 3, 5, 7],
    OPPOSITE_CORNERS: { 0: 8, 2: 6, 6: 2, 8: 0 },
  },

  // ===== SEZIONE B: COSTRUZIONE CONTESTO (buildContext) =====
  buildContext: function (api, memory, events, externalData) {
    const board = api.getBoard();
    const availableMoves = api.getAvailableMoves();
    const gameStatus = api.getGameStatus();

    // Derivazione del turno dall'external data
    const isOurTurn = externalData.isBotTurn;

    return {
      board: board,
      availableMoves: availableMoves,
      gameStatus: gameStatus,
      isOurTurn: isOurTurn,
      constants: fsmDefinition.constants,
    };
  },

  // ===== SEZIONE C: HELPER FUNCTIONS (Logica Strategica) =====

  /**
   * Trova una mossa vincente immediata per il giocatore specificato.
   * @param {Array} board - La board corrente (9 elementi)
   * @param {string} player - Il giocatore ('O' o 'X')
   * @param {Array} availableMoves - Array degli indici disponibili
   * @param {Object} constants - Costanti della FSM
   * @returns {number|null} - L'indice della mossa vincente o null
   */
  findWinningMove: function (board, player, availableMoves, constants) {
    // Itera su ogni mossa disponibile
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];

      // Simula la mossa
      const testBoard = board.slice();
      testBoard[move] = player;

      // Verifica se questa mossa completa una linea vincente
      for (let j = 0; j < constants.WINNING_LINES.length; j++) {
        const line = constants.WINNING_LINES[j];
        if (
          testBoard[line[0]] === player &&
          testBoard[line[1]] === player &&
          testBoard[line[2]] === player
        ) {
          return move;
        }
      }
    }

    return null;
  },

  /**
   * FUNZIONE CRITICA: Trova una mossa che crea o blocca una forchetta (doppia minaccia).
   * Una forchetta si verifica quando un giocatore ha DUE linee vincenti simultanee
   * con una sola cella vuota ciascuna, rendendo impossibile bloccarle entrambe.
   *
   * IMPORTANTE: Quando si blocca una forchetta dell'avversario, la strategia dipende
   * dal pattern specifico. Nel caso degli angoli opposti, si deve giocare un LATO
   * che crei una minaccia forzando l'avversario a difendersi.
   *
   * @param {Array} board - La board corrente
   * @param {string} player - Il giocatore da analizzare
   * @param {Array} availableMoves - Mosse disponibili
   * @param {Object} constants - Costanti
   * @returns {number|null} - Indice della mossa che crea/blocca forchetta o null
   */
  findForkMove: function (board, player, availableMoves, constants) {
    // CASO SPECIALE: Se stiamo cercando di bloccare X (opponent) e X ha angoli opposti
    // con O al centro, la mossa di blocco DEVE essere un lato strategico
    if (
      player === constants.OPPONENT &&
      board[constants.CENTER] === constants.PLAYER
    ) {
      const opponentCorners = [];
      for (let i = 0; i < constants.CORNERS.length; i++) {
        if (board[constants.CORNERS[i]] === constants.OPPONENT) {
          opponentCorners.push(constants.CORNERS[i]);
        }
      }

      // Se X ha 2 angoli opposti, scegli il lato che crea una minaccia
      if (opponentCorners.length === 2) {
        const corner1 = opponentCorners[0];
        const corner2 = opponentCorners[1];

        if (
          constants.OPPOSITE_CORNERS[corner1] === corner2 ||
          constants.OPPOSITE_CORNERS[corner2] === corner1
        ) {
          // Strategia: Gioca un lato che forma una linea col centro
          // creando una minaccia che forza X a difendersi
          // Le linee attraverso il centro sono: 1-4-7 e 3-4-5

          // Priorità 1: Lati che non sono adiacenti agli angoli occupati
          // Per angoli 0-8: i lati migliori sono 3 o 5 (non adiacenti a entrambi)
          // Per angoli 2-6: i lati migliori sono 1 o 7 (non adiacenti a entrambi)

          let safeSides = [];

          // Determina quali lati sono "sicuri" (creano minacce sul centro)
          if (
            (corner1 === 0 && corner2 === 8) ||
            (corner1 === 8 && corner2 === 0)
          ) {
            // Angoli diagonale principale: preferisci lati 3 o 5
            safeSides = [3, 5, 1, 7]; // Ordine di preferenza
          } else if (
            (corner1 === 2 && corner2 === 6) ||
            (corner1 === 6 && corner2 === 2)
          ) {
            // Angoli diagonale secondaria: preferisci lati 1 o 7
            safeSides = [1, 7, 3, 5]; // Ordine di preferenza
          }

          // Gioca il primo lato sicuro disponibile
          for (let i = 0; i < safeSides.length; i++) {
            if (availableMoves.indexOf(safeSides[i]) !== -1) {
              return safeSides[i];
            }
          }

          // Fallback: qualsiasi lato disponibile
          for (let i = 0; i < constants.SIDES.length; i++) {
            const side = constants.SIDES[i];
            if (availableMoves.indexOf(side) !== -1) {
              return side;
            }
          }
        }
      }
    }

    // LOGICA NORMALE: Per ogni mossa disponibile, simula e conta quante minacce crea
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];

      // Simula la mossa
      const testBoard = board.slice();
      testBoard[move] = player;

      // Conta quante linee vincenti possono essere completate con una sola mossa
      let threatsCount = 0;

      for (let j = 0; j < constants.WINNING_LINES.length; j++) {
        const line = constants.WINNING_LINES[j];
        const cellValues = [
          testBoard[line[0]],
          testBoard[line[1]],
          testBoard[line[2]],
        ];

        // Conta celle del giocatore e celle vuote nella linea
        let playerCount = 0;
        let emptyCount = 0;

        for (let k = 0; k < cellValues.length; k++) {
          if (cellValues[k] === player) {
            playerCount++;
          } else if (cellValues[k] === null) {
            emptyCount++;
          }
        }

        // Una minaccia è una linea con 2 celle del giocatore e 1 vuota
        // (può essere completata con una sola mossa)
        if (playerCount === 2 && emptyCount === 1) {
          threatsCount++;
        }
      }

      // FORCHETTA RILEVATA: Se questa mossa crea 2 o più minacce simultanee,
      // l'avversario non potrà bloccarle tutte in un turno
      if (threatsCount >= 2) {
        return move;
      }
    }

    return null;
  },

  /**
   * Trova la migliore mossa strategica seguendo l'euristica classica del Tris.
   * Include protezione avanzata contro tutte le trappole comuni.
   *
   * @param {Array} board - La board corrente
   * @param {Array} availableMoves - Mosse disponibili
   * @param {Object} constants - Costanti
   * @returns {number} - L'indice della mossa strategica
   */
  findStrategicMove: function (board, availableMoves, constants) {
    // 1. CENTRO: Posizione più forte (controllo massimo della board)
    if (availableMoves.indexOf(constants.CENTER) !== -1) {
      return constants.CENTER;
    }

    // 2. PROTEZIONE CRITICA: Se O ha il centro, gestisci gli angoli di X
    if (board[constants.CENTER] === constants.PLAYER) {
      // Conta e identifica gli angoli occupati dall'avversario
      const opponentCorners = [];
      for (let i = 0; i < constants.CORNERS.length; i++) {
        if (board[constants.CORNERS[i]] === constants.OPPONENT) {
          opponentCorners.push(constants.CORNERS[i]);
        }
      }

      // CASO A: X ha 2 angoli opposti → EMERGENZA: gioca un lato
      if (opponentCorners.length === 2) {
        const corner1 = opponentCorners[0];
        const corner2 = opponentCorners[1];

        if (constants.OPPOSITE_CORNERS[corner1] === corner2) {
          // Gioca il primo lato disponibile
          for (let i = 0; i < constants.SIDES.length; i++) {
            const side = constants.SIDES[i];
            if (availableMoves.indexOf(side) !== -1) {
              return side; // EXIT: ritorna immediatamente
            }
          }
        }
        // Se i 2 angoli NON sono opposti, continua normalmente
      }
      // CASO B: X ha 1 angolo → PREVENZIONE: gioca lato adiacente
      else if (opponentCorners.length === 1) {
        const xCorner = opponentCorners[0];

        // Mappa angolo → lati adiacenti prioritari
        const adjacentSides = {
          0: [1, 3], // Angolo 0 (alto-sx) → lati 1 (alto), 3 (sx)
          2: [1, 5], // Angolo 2 (alto-dx) → lati 1 (alto), 5 (dx)
          6: [3, 7], // Angolo 6 (basso-sx) → lati 3 (sx), 7 (basso)
          8: [5, 7], // Angolo 8 (basso-dx) → lati 5 (dx), 7 (basso)
        };

        const preferredSides = adjacentSides[xCorner];
        if (preferredSides) {
          for (let i = 0; i < preferredSides.length; i++) {
            if (availableMoves.indexOf(preferredSides[i]) !== -1) {
              return preferredSides[i]; // EXIT: ritorna immediatamente
            }
          }
        }

        // Se i lati adiacenti sono occupati, prova qualsiasi lato
        for (let i = 0; i < constants.SIDES.length; i++) {
          const side = constants.SIDES[i];
          if (availableMoves.indexOf(side) !== -1) {
            return side; // EXIT: ritorna immediatamente
          }
        }
      }
    }

    // 3. ANGOLO OPPOSTO: Solo se NON abbiamo il centro (altrimenti rischio)
    if (board[constants.CENTER] !== constants.PLAYER) {
      for (let i = 0; i < constants.CORNERS.length; i++) {
        const corner = constants.CORNERS[i];
        const opposite = constants.OPPOSITE_CORNERS[corner];

        if (
          board[corner] === constants.OPPONENT &&
          availableMoves.indexOf(opposite) !== -1
        ) {
          return opposite;
        }
      }
    }

    // 4. ANGOLO LIBERO: Gli angoli offrono più opportunità
    for (let i = 0; i < constants.CORNERS.length; i++) {
      const corner = constants.CORNERS[i];
      if (availableMoves.indexOf(corner) !== -1) {
        return corner;
      }
    }

    // 5. LATO: Fallback
    for (let i = 0; i < constants.SIDES.length; i++) {
      const side = constants.SIDES[i];
      if (availableMoves.indexOf(side) !== -1) {
        return side;
      }
    }

    // Ultima risorsa
    return availableMoves[0];
  },

  // ===== SEZIONE D: TRANSIZIONI DI EMERGENZA (Livello 1) - ORDINE RAFFORZATO =====
  emergencyTransitions: [
    // 1. Termine Gioco (2.2.1) - MASSIMA PRIORITÀ
    {
      target: "GAME_OVER",
      condition: function (api, memory, context, events) {
        return context.gameStatus !== null;
      },
      description: "Partita terminata: esci dalla FSM.",
    },

    // 2. Blocco Vittoria Avversaria (2.2.2) - DIFESA IMMEDIATA
    {
      target: "BLOCKING_MOVE",
      condition: function (api, memory, context, events) {
        if (!context.isOurTurn) return false;

        const blockMove = fsmDefinition.findWinningMove(
          context.board,
          context.constants.OPPONENT,
          context.availableMoves,
          context.constants
        );

        return blockMove !== null;
      },
      description: "BLOCCO OBBLIGATORIO: Impedisce la vittoria immediata di X.",
    },

    // 3. Prevenzione Forchetta Avversaria (2.2.3) - DIFESA STRATEGICA
    {
      target: "BLOCKING_MOVE",
      condition: function (api, memory, context, events) {
        if (!context.isOurTurn) return false;

        const forkBlockMove = fsmDefinition.findForkMove(
          context.board,
          context.constants.OPPONENT,
          context.availableMoves,
          context.constants
        );

        return forkBlockMove !== null;
      },
      description:
        "Previene la creazione di una forchetta (doppia minaccia) da parte di X.",
    },

    // 4. Vittoria Propria (2.2.4) - ATTACCO IMMEDIATO
    {
      target: "WINNING_MOVE",
      condition: function (api, memory, context, events) {
        if (!context.isOurTurn) return false;

        const winMove = fsmDefinition.findWinningMove(
          context.board,
          context.constants.PLAYER,
          context.availableMoves,
          context.constants
        );

        return winMove !== null;
      },
      description: "Trova la mossa vincente immediata per O.",
    },
  ],

  // ===== SEZIONE E: TRANSIZIONI TATTICHE (Livello 2) =====
  tacticalTransitions: [
    // 1. Creazione Forchetta Propria (2.2.5) - ATTACCO STRATEGICO
    {
      target: "STRATEGIC_MOVE",
      condition: function (api, memory, context, events) {
        if (!context.isOurTurn) return false;

        const forkMove = fsmDefinition.findForkMove(
          context.board,
          context.constants.PLAYER,
          context.availableMoves,
          context.constants
        );

        return forkMove !== null;
      },
      description: "Crea una forchetta (doppia minaccia) per O.",
    },

    // 2. Mossa di Ripiego (2.2.6) - MOSSA STANDARD
    {
      target: "STRATEGIC_MOVE",
      condition: function (api, memory, context, events) {
        return context.isOurTurn;
      },
      description:
        "Esegue la mossa strategica di ripiego (Centro/Angoli/Lati).",
    },
  ],

  // ===== SEZIONE F: STATI DELLA MACCHINA (onEnter/onExit/transitions) =====
  states: {
    /**
     * IDLE: Stato iniziale, attende il turno del bot
     */
    IDLE: {
      onEnter: function (api, memory, context) {
        api.log("Bot in attesa del proprio turno...");
      },
      // Concatena emergency e tactical transitions per formare l'array completo
      get transitions() {
        return fsmDefinition.emergencyTransitions.concat(
          fsmDefinition.tacticalTransitions
        );
      },
    },

    /**
     * WINNING_MOVE: Esegue la mossa vincente per O
     */
    WINNING_MOVE: {
      onEnter: function (api, memory, context) {
        const winMove = fsmDefinition.findWinningMove(
          context.board,
          context.constants.PLAYER,
          context.availableMoves,
          context.constants
        );

        if (winMove !== null) {
          api.log("VITTORIA! Eseguo mossa vincente in posizione: " + winMove);
          api.makeMove(winMove);
          memory.moveCount++;
        }
      },
      transitions: [
        {
          target: "GAME_OVER",
          condition: function (api, memory, context, events) {
            return context.gameStatus !== null;
          },
        },
        {
          target: "IDLE",
          condition: function (api, memory, context, events) {
            return true;
          },
        },
      ],
    },

    /**
     * BLOCKING_MOVE: Blocca la vittoria avversaria o previene una forchetta
     */
    BLOCKING_MOVE: {
      onEnter: function (api, memory, context) {
        // Priorità 1: Blocco vittoria immediata
        let blockMove = fsmDefinition.findWinningMove(
          context.board,
          context.constants.OPPONENT,
          context.availableMoves,
          context.constants
        );

        if (blockMove !== null) {
          api.log(
            "DIFESA CRITICA: Blocco vittoria avversaria in posizione: " +
              blockMove
          );
          api.makeMove(blockMove);
          memory.moveCount++;
          return;
        }

        // Priorità 2: Blocco forchetta avversaria
        blockMove = fsmDefinition.findForkMove(
          context.board,
          context.constants.OPPONENT,
          context.availableMoves,
          context.constants
        );

        if (blockMove !== null) {
          api.log(
            "DIFESA STRATEGICA: Blocco forchetta avversaria in posizione: " +
              blockMove
          );
          api.makeMove(blockMove);
          memory.moveCount++;
        }
      },
      transitions: [
        {
          target: "GAME_OVER",
          condition: function (api, memory, context, events) {
            return context.gameStatus !== null;
          },
        },
        {
          target: "IDLE",
          condition: function (api, memory, context, events) {
            return true;
          },
        },
      ],
    },

    /**
     * STRATEGIC_MOVE: Esegue mosse strategiche (forchetta propria o ripiego)
     */
    STRATEGIC_MOVE: {
      onEnter: function (api, memory, context) {
        let moveToMake = null;

        // PRIORITÀ 0: Verifica se siamo in situazione di emergenza difensiva
        // (angoli opposti dell'avversario con centro nostro)
        if (
          context.board[context.constants.CENTER] === context.constants.PLAYER
        ) {
          const opponentCorners = [];
          for (let i = 0; i < context.constants.CORNERS.length; i++) {
            if (
              context.board[context.constants.CORNERS[i]] ===
              context.constants.OPPONENT
            ) {
              opponentCorners.push(context.constants.CORNERS[i]);
            }
          }

          // Se X ha 2 angoli opposti, ignora la forchetta e gioca LATO
          if (opponentCorners.length === 2) {
            const corner1 = opponentCorners[0];
            const corner2 = opponentCorners[1];

            if (
              context.constants.OPPOSITE_CORNERS[corner1] === corner2 ||
              context.constants.OPPOSITE_CORNERS[corner2] === corner1
            ) {
              // EMERGENZA: gioca un lato, ignora forchette
              for (let i = 0; i < context.constants.SIDES.length; i++) {
                const side = context.constants.SIDES[i];
                if (context.availableMoves.indexOf(side) !== -1) {
                  api.log(
                    "DIFESA EMERGENZA ANGOLI OPPOSTI: Gioco lato " + side
                  );
                  api.makeMove(side);
                  memory.moveCount++;
                  return;
                }
              }
            }
          }
        }

        // Priorità 1: Crea forchetta propria (solo se non in emergenza)
        moveToMake = fsmDefinition.findForkMove(
          context.board,
          context.constants.PLAYER,
          context.availableMoves,
          context.constants
        );

        if (moveToMake !== null) {
          api.log(
            "ATTACCO STRATEGICO: Creo forchetta in posizione: " + moveToMake
          );
          api.makeMove(moveToMake);
          memory.moveCount++;
          return;
        }

        // Priorità 2: Mossa di ripiego strategica
        // Segue l'euristica: Centro > Protezione > Angolo > Lato
        moveToMake = fsmDefinition.findStrategicMove(
          context.board,
          context.availableMoves,
          context.constants
        );

        api.log("MOSSA STRATEGICA DI RIPIEGO in posizione: " + moveToMake);
        api.makeMove(moveToMake);
        memory.moveCount++;
      },
      transitions: [
        {
          target: "GAME_OVER",
          condition: function (api, memory, context, events) {
            return context.gameStatus !== null;
          },
        },
        {
          target: "IDLE",
          condition: function (api, memory, context, events) {
            return true;
          },
        },
      ],
    },

    /**
     * GAME_OVER: Stato terminale
     */
    GAME_OVER: {
      onEnter: function (api, memory, context) {
        const status = context.gameStatus;

        if (status === context.constants.PLAYER) {
          api.log("🎉 VITTORIA! Il bot O ha vinto!");
        } else if (status === context.constants.OPPONENT) {
          api.log("❌ SCONFITTA. Il giocatore X ha vinto.");
        } else if (status === context.constants.TIE) {
          api.log("🤝 PAREGGIO. Partita terminata in parità.");
        }

        api.log("Totale mosse del bot: " + memory.moveCount);
      },
      transitions: [],
    },
  },
};

// Export della FSM (per utilizzo in moduli o testing)
// Decommenta se necessario: 
export default fsmDefinition;

export const ticTacToeBotFSM = createFSM(fsmDefinition);
