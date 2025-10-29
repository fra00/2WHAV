PROMPT DEFINITIVO PER BOT TRIS (V3)

Sei un Programmatore Specializzato in Intelligenza Artificiale (AI) di Livello Esperto. Il tuo compito è generare la logica FSM completa per un bot di Tris (Tic-Tac-Toe) in Javascript. Il bot gioca come Giocatore O (PLAYER_O). Devi garantire che il bot NON POSSA ESSERE SCONFITTO dall'avversario tramite forchette o altre trappole strategiche, rispettando il seguente contratto 2WHAVVA

## 1. WHAT: Introduzione e Indice

### 1.1. What First: Scopo e Risultato Finale

SCOPO: Implementare la logica FSM completa per un bot di Tris (Giocatore O) con un livello di strategia ottimale (perfetto giocatore non perdente).
RISULTATO FINALE: Un singolo oggetto letterale Javascript ({ ... }) che aderisce rigorosamente allo scaffolding.

### 1.2. Indice

| Sezione                 | Logica                                                | Scopo                                       |
| :---------------------- | :---------------------------------------------------- | :------------------------------------------ |
| **\# Virtualizzazione** | WHERE                                                 | Contratto del Motore con Priorità Assoluta. |
| **\# Interfaccia**      | HOW                                                   | Contratto API e Context.                    |
| **\# Generazione**      | HOW                                                   | Contratto del Codice e Struttura.           |
| **\# Augmentation**     | Direttiva di Contribuzione Strategica e Intelligenza. |
| **\# Verification**     | VERIFY                                                | Autocontrollo Obbligatorio e Rigoroso.      |

## 2. HOW: Virtualizzazione (Contratto del Motore con Priorità Assoluta)

### 2.1. Gestione del Turno

Il dato cruciale per la gestione del turno è externalData.isBotTurn (boolean), utilizzato per popolare context.isOurTurn nella Sezione 3.

### 2.2. Flusso del Comportamento (Gerarchia FSM - ORDINE INVIOLABILE)

L'ordine di valutazione delle transizioni è il seguente. La difesa (2.2.2 e 2.2.3) ha la priorità assoluta sull'attacco (2.2.4).
| Indice | Livello | Focus | Priorità |
| :--- | :--- | :--- | :--- |
| 2.2.1 | EMERGENCY | Termine Gioco | Massima (Uscita) |
| 2.2.2 | EMERGENCY | Blocco Vittoria Avv. | Critica (Difesa Immediata) |
| 2.2.3 | EMERGENCY | Prevenzione Forchetta | Critica (Difesa Strategica) |
| 2.2.4 | EMERGENCY | Vittoria Propria | Alta (Attacco Immediato) |
| 2.2.5 | TACTICAL | Creazione Forchetta | Media (Attacco Strategico) |
| 2.2.6 | TACTICAL | Mossa di Ripiego | Standard |

## 3. HOW: I: Interfaccia (Contratto API e Context)

### 3.1. Funzioni API

Il codice interagisce esclusivamente tramite `api` e l'oggetto `context` costruito.
| Funzione | Descrizione |
| :--- | :--- |
| `api.getBoard()` | Array di 9 elementi ('X', 'O', null). |
| `api.getGameStatus()` | Stato: 'O', 'X', 'TIE' o null. |
| `api.getAvailableMoves()`| Indici delle celle vuote (mosse legali). |
| `api.makeMove(index)` | Esegue la mossa. OBBLIGATORIO negli `onEnter`. |

## 4. HOW: Generazione (Contratto del Codice e Struttura)

### 4.1. Regole di Sintassi

- Output = singolo oggetto letterale ({ ... }).
- Tutte le funzioni usano la sintassi `function(...) { ... }` (**no Arrow Functions $\Rightarrow$**).
- Gli Helper sono chiamati con `fsmDefinition.nomeHelper()`.

### 4.2. Scaffolding (Integrità Totale)

```javascript
// SALVA un riferimento all'oggetto per accedere alle helper
const fsmDefinition = {
  // ===== SEZIONE A: CONFIGURAZIONE (initialState, initialMemory, constants) =====
  initialState: 'IDLE',

  initialMemory: {
    moveCount: 0
  },

  constants: {
    PLAYER: 'O', OPPONENT: 'X', TIE: 'TIE',
    WINNING_LINES: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ],
  },

  // ===== SEZIONE B: COSTRUZIONE CONTESTO (buildContext) =====
  buildContext: function(api, memory, events, externalData) {
    // Implementa la costruzione del contesto, inclusa la derivazione di context.isOurTurn
    return {
      board: api.getBoard(),
      availableMoves: api.getAvailableMoves(),
      gameStatus: api.getGameStatus(),
      isOurTurn: externalData.isBotTurn,
    };
  },

  // ===== SEZIONE C: HELPER FUNCTIONS (Logica Strategica) =====

  // *** OBBLIGATORIO: Implementazione robusta e commentata ***
  findWinningMove: function(board, player, availableMoves, constants) {
    // Restituisce l'indice della mossa vincente (0-8) o null
  },

  // *** OBBLIGATORIO: Funzione Critica per la Sopravvivenza del Bot ***
  findForkMove: function(board, player, availableMoves, constants) {
    // Restituisce l'indice che crea o blocca una forchetta (doppia minaccia), altrimenti null.
    // DEVI commentare la logica usata per la rilevazione della forchetta.
  },

  // ===== SEZIONE D: TRANSIZIONI DI EMERGENZA (Livello 1) - ORDINE RAFFORZATO (2.2) =====
  emergencyTransitions: [
    // 1. Termine Gioco (2.2.1)
    { target: 'GAME_OVER', condition: function(api, memory, context, events) { return context.gameStatus !== null; } },

    // 2. Blocco Vittoria Avversaria (2.2.2)
    {
      target: 'BLOCKING_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn && fsmDefinition.findWinningMove(context.board, context.constants.OPPONENT, context.availableMoves, context.constants) !== null;
      },
      description: 'BLOCCO OBBLIGATORIO: Impedisce la vittoria immediata di X.'
    },

    // 3. Prevenzione Forchetta Avversaria (2.2.3)
    {
      target: 'BLOCKING_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn && fsmDefinition.findForkMove(context.board, context.constants.OPPONENT, context.availableMoves, context.constants) !== null;
      },
      description: 'Previene la creazione di una forchetta (doppia minaccia) da parte di X.'
    },

    // 4. Vittoria Propria (2.2.4)
    {
      target: 'WINNING_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn && fsmDefinition.findWinningMove(context.board, context.constants.PLAYER, context.availableMoves, context.constants) !== null;
      },
      description: 'Trova la mossa vincente immediata.'
    }
  ],

  // ===== SEZIONE E: TRANSIZIONI TATTICHE (Livello 2) =====
  tacticalTransitions: [
    // 1. Creazione Forchetta Propria (2.2.5)
    {
      target: 'STRATEGIC_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn && fsmDefinition.findForkMove(context.board, context.constants.PLAYER, context.availableMoves, context.constants) !== null;
      },
      description: 'Crea una forchetta (doppia minaccia).'
    },
    // 2. Mossa di Ripiego (2.2.6)
    {
      target: 'STRATEGIC_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn;
      },
      description: 'Esegue la mossa strategica (Centro/Angoli/Lati).'
    }
  ],

  // ===== SEZIONE F: STATI DELLA MACCHINA (onEnter/onExit/transitions) =====
  states: {
    IDLE: { /* ... */ },
    WINNING_MOVE: { /* ... */ },

    BLOCKING_MOVE: {
      onEnter: function(api, memory, context) {
        // La logica di esecuzione DEVE distinguere tra blocco immediato e blocco forchetta
      },
      transitions: [ /* ... */ ]
    },

    STRATEGIC_MOVE: {
      onEnter: function(api, memory, context) {
        // La logica di esecuzione DEVE dare priorità a: Centro > Forchetta Propria > Angoli Opposti > Angoli > Lati
      },
      transitions: [ /* ... */ ]
    },

    GAME_OVER: { /* ... */ }
  }
};


5. HOW: Augmentation (Direttiva di Contribuzione Strategica e Intelligenza)

- **DIRETTIVA CREATIVA POTENZIATA:** L'LLM deve agire come un giocatore esperto che conosce perfettamente la strategia del Tris. La logica DEVE garantire che il bot non sia battuto da alcuna sequenza ottimale dell'avversario.

- **Priorità Strategica:** L'ordine di difesa e attacco nel codice rispecchia l'ordine del punto 2.2 (Difesa prioritaria).

- **Robustezza di `findForkMove`:** La funzione `findForkMove` deve contenere logica non banale e commenti dettagliati in linea che spieghino i passaggi per identificare:

  - La creazione di due minacce separate.

  - La necessità di trovare una mossa che le chiuda entrambe.

- **Intelligenza di `STRATEGIC_MOVE`:** Lo stato `STRATEGIC_MOVE: onEnter` deve gestire la complessità delle mosse di ripiego:

  - Prima Mossa: Centro (4).

  - Mossa di Ripiego: Sequenza Centro > Angoli Opposti > Angoli Vuoti > Lati.


## 6. VERIFY: Verification (Autocontrollo Obbligatorio e Rigoroso)

- **AUTOCONTROLLO FINALE:** L'LLM deve verificare che il codice generato rispetti tutti i seguenti punti:

  - **Priorità Critica Inviolabile:** La sezione `emergencyTransitions` contiene le quattro transizioni nell'ordine: `GAME_OVER` `Blocco Vittoria Avv.` `Prevenzione Forchetta Avv.` `Vittoria Propria`.

  - **Robustezza Funzionale:** La funzione `findForkMove` è implementata con logica complessa e include commenti esplicativi come richiesto nella Sezione 5.

  - **Esecuzione Completa:** Tutte le sei sezioni A, B, C, D, E, F sono presenti. Gli stati esecutivi chiamano `api.makeMove()` e aggiornano `memory.moveCount`.
```
