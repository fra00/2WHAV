# PROMPT DEFINITIVO PER BOT TRIS (V4 - DEBUGGATO)

Sei un **Programmatore Specializzato in Intelligenza Artificiale (AI) di Livello Esperto**. Il tuo compito è generare la logica FSM completa per un bot di **Tris (Tic-Tac-Toe)** in Javascript. Il bot gioca come **Giocatore O** (`PLAYER_O`). Devi garantire che il bot **NON POSSA ESSERE SCONFITTO** dall'avversario tramite forchette o altre trappole strategiche, rispettando il seguente contratto 2V.G.I.A.

-----

## 1. What First: Scopo e Risultato Finale

**SCOPO:** Implementare la logica FSM completa per un bot di Tris (Giocatore O) con un **livello di strategia ottimale** (perfetto giocatore non perdente).

**RISULTATO FINALE:** Un **singolo oggetto letterale Javascript** (`({ ... })`) che aderisce rigorosamente allo *scaffolding*.

**VINCOLO CRITICO:** Il bot **DEVE** pareggiare contro un giocatore perfetto e vincere contro giocatori imperfetti. Il test critico è la **trappola degli angoli opposti**.

-----

## 2. Virtualizzazione (Contratto del Motore con Priorità Assoluta)

### 2.1. Gestione del Turno

Il dato cruciale per la gestione del turno è **`externalData.isBotTurn`** (`boolean`), utilizzato per popolare `context.isOurTurn` nella Sezione 3.

### 2.2. Flusso del Comportamento (Gerarchia FSM - ORDINE INVIOLABILE)

L'ordine di valutazione delle transizioni è il seguente. **La difesa (2.2.2 e 2.2.3) ha la priorità assoluta sull'attacco (2.2.4)**.

| Indice | Livello | Focus | Priorità |
|:---|:---|:---|:---|
| 2.2.1 | **EMERGENCY** | **Termine Gioco** | Massima (Uscita) |
| 2.2.2 | **EMERGENCY** | **Blocco Vittoria Avv.** | Critica (Difesa Immediata) |
| 2.2.3 | **EMERGENCY** | **Prevenzione Forchetta** | Critica (Difesa Strategica) |
| 2.2.4 | **EMERGENCY** | **Vittoria Propria** | Alta (Attacco Immediato) |
| 2.2.5 | **TACTICAL** | **Creazione Forchetta** | Media (Attacco Strategico) |
| 2.2.6 | **TACTICAL** | **Mossa di Ripiego** | Standard |

### 2.3. Gestione delle Transizioni negli Stati

**IMPORTANTE:** Ogni stato esecutivo (WINNING_MOVE, BLOCKING_MOVE, STRATEGIC_MOVE) **DEVE** avere un array `transitions` con:
1. Prima transizione verso `GAME_OVER` (se il gioco è terminato)
2. Seconda transizione verso `IDLE` (fallback sempre true)

Questo garantisce che la FSM non si blocchi dopo l'esecuzione di una mossa.

-----

## 3. Interfaccia (Contratto API e Context)

Il codice interagisce **esclusivamente** tramite `api` e l'oggetto `context` costruito.

### 3.1. Funzioni API

| Funzione | Descrizione |
|:----------|:-------------|
| `api.getBoard()` | Array di 9 elementi (`'X'`, `'O'`, `null`). |
| `api.getGameStatus()` | Stato: `'O'`, `'X'`, `'TIE'` o `null`. |
| `api.getAvailableMoves()`| Indici delle celle vuote (mosse legali). |
| `api.makeMove(index)` | Esegue la mossa. **OBBLIGATORIO** negli `onEnter`. |
| `api.log(message)` | Scrive nella console di debug. |

-----

## 4. Generazione (Contratto del Codice e Struttura)

### 4.1. Regole di Sintassi

  * Output = **singolo oggetto letterale** `({ ... })`.
  * Tutte le funzioni usano la sintassi **`function(...) { ... }`** (no Arrow Functions `=>`).
  * Gli Helper sono chiamati con **`fsmDefinition.nomeHelper()`**.

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
    PLAYER: 'O', 
    OPPONENT: 'X', 
    TIE: 'TIE',
    CENTER: 4,
    CORNERS: [0, 2, 6, 8],
    SIDES: [1, 3, 5, 7],
    OPPOSITE_CORNERS: {0: 8, 2: 6, 6: 2, 8: 0},
    WINNING_LINES: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]            
    ],
  },

  // ===== SEZIONE B: COSTRUZIONE CONTESTO (buildContext) =====
  buildContext: function(api, memory, events, externalData) {
    return {
      board: api.getBoard(),
      availableMoves: api.getAvailableMoves(),
      gameStatus: api.getGameStatus(),
      isOurTurn: externalData.isBotTurn,
      constants: fsmDefinition.constants
    };
  },

  // ===== SEZIONE C: HELPER FUNCTIONS (Logica Strategica) =====
  
  findWinningMove: function(board, player, availableMoves, constants) {
    // Implementazione: simula ogni mossa e verifica se completa una WINNING_LINE
  },
  
  findForkMove: function(board, player, availableMoves, constants) {
    // CASO SPECIALE CRITICO: Gestione angoli opposti (vedi Sezione 5.1)
    // LOGICA GENERALE: Conta minacce create da ogni mossa (vedi Sezione 5.2)
  },
  
  findStrategicMove: function(board, availableMoves, constants) {
    // Priorità: Centro > Protezione Angoli Opposti > Angolo > Lato
    // IMPORTANTE: Include protezione preventiva (vedi Sezione 5.3)
  },

  // ===== SEZIONE D: TRANSIZIONI DI EMERGENZA (Livello 1) =====
  emergencyTransitions: [
    { 
      target: 'GAME_OVER', 
      condition: function(api, memory, context, events) { 
        return context.gameStatus !== null; 
      } 
    },
    {
      target: 'BLOCKING_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn && 
               fsmDefinition.findWinningMove(context.board, context.constants.OPPONENT, context.availableMoves, context.constants) !== null;
      },
      description: 'BLOCCO OBBLIGATORIO: Impedisce la vittoria immediata di X.'
    },
    {
      target: 'BLOCKING_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn && 
               fsmDefinition.findForkMove(context.board, context.constants.OPPONENT, context.availableMoves, context.constants) !== null;
      },
      description: 'Previene la creazione di una forchetta (doppia minaccia) da parte di X.'
    },
    {
      target: 'WINNING_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn && 
               fsmDefinition.findWinningMove(context.board, context.constants.PLAYER, context.availableMoves, context.constants) !== null;
      },
      description: 'Trova la mossa vincente immediata.'
    }
  ],

  // ===== SEZIONE E: TRANSIZIONI TATTICHE (Livello 2) =====
  tacticalTransitions: [
    {
      target: 'STRATEGIC_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn && 
               fsmDefinition.findForkMove(context.board, context.constants.PLAYER, context.availableMoves, context.constants) !== null;
      },
      description: 'Crea una forchetta (doppia minaccia).'
    },
    {
      target: 'STRATEGIC_MOVE',
      condition: function(api, memory, context, events) {
        return context.isOurTurn; 
      },
      description: 'Esegue la mossa strategica (Centro/Angoli/Lati).'
    }
  ],

  // ===== SEZIONE F: STATI DELLA MACCHINA =====
  states: {
    IDLE: {
      onEnter: function(api, memory, context) { /* Log stato */ },
      get transitions() {
        return fsmDefinition.emergencyTransitions.concat(fsmDefinition.tacticalTransitions);
      }
    },
    
    WINNING_MOVE: {
      onEnter: function(api, memory, context) {
        // Trova e esegui mossa vincente
        // api.makeMove(move); memory.moveCount++;
      },
      transitions: [
        { target: 'GAME_OVER', condition: function(api, memory, context, events) { return context.gameStatus !== null; } },
        { target: 'IDLE', condition: function(api, memory, context, events) { return true; } }
      ]
    },
    
    BLOCKING_MOVE: {
      onEnter: function(api, memory, context) {
        // Priorità 1: Blocco vittoria immediata
        // Priorità 2: Blocco forchetta
        // api.makeMove(move); memory.moveCount++;
      },
      transitions: [
        { target: 'GAME_OVER', condition: function(api, memory, context, events) { return context.gameStatus !== null; } },
        { target: 'IDLE', condition: function(api, memory, context, events) { return true; } }
      ]
    },
    
    STRATEGIC_MOVE: {
      onEnter: function(api, memory, context) {
        // PRIORITÀ 0: Verifica emergenza angoli opposti (vedi Sezione 5.4)
        // Priorità 1: Crea forchetta propria
        // Priorità 2: Mossa strategica di ripiego
        // api.makeMove(move); memory.moveCount++;
      },
      transitions: [
        { target: 'GAME_OVER', condition: function(api, memory, context, events) { return context.gameStatus !== null; } },
        { target: 'IDLE', condition: function(api, memory, context, events) { return true; } }
      ]
    },
    
    GAME_OVER: {
      onEnter: function(api, memory, context) { /* Log risultato finale */ },
      transitions: []
    }
  }
}; 
```

-----

## 5. Augmentation (Direttiva di Contribuzione Strategica e Intelligenza)

**DIRETTIVA CREATIVA POTENZIATA:** L'LLM deve agire come un giocatore esperto che conosce perfettamente la strategia del Tris. La logica **DEVE** garantire che il bot non sia battuto da alcuna sequenza ottimale dell'avversario.

### 5.1. CASO SPECIALE CRITICO: Trappola degli Angoli Opposti

**Scenario:**
1. X gioca angolo (es. 0)
2. O gioca centro (4)
3. X gioca angolo opposto (es. 8)

**PROBLEMA:** Se O gioca un angolo qualsiasi, X crea una forchetta inarrestabile.

**SOLUZIONE OBBLIGATORIA in `findForkMove`:**

Quando `player === OPPONENT` (stiamo cercando come bloccare X):
- Se O ha il centro E X ha 2 angoli opposti
- La funzione **DEVE ritornare un LATO STRATEGICO**, non un angolo
- **Lati strategici per angoli 0-8**: [3, 5, 1, 7] (priorità ai lati perpendicolari 3 e 5)
- **Lati strategici per angoli 2-6**: [1, 7, 3, 5] (priorità ai lati perpendicolari 1 e 7)

```javascript
// INIZIO findForkMove - CASO SPECIALE
if (player === constants.OPPONENT && board[constants.CENTER] === constants.PLAYER) {
  const opponentCorners = [];
  for (let i = 0; i < constants.CORNERS.length; i++) {
    if (board[constants.CORNERS[i]] === constants.OPPONENT) {
      opponentCorners.push(constants.CORNERS[i]);
    }
  }
  
  if (opponentCorners.length === 2) {
    const corner1 = opponentCorners[0];
    const corner2 = opponentCorners[1];
    
    if (constants.OPPOSITE_CORNERS[corner1] === corner2 ||
        constants.OPPOSITE_CORNERS[corner2] === corner1) {
      
      let safeSides = [];
      if ((corner1 === 0 && corner2 === 8) || (corner1 === 8 && corner2 === 0)) {
        safeSides = [3, 5, 1, 7]; // Priorità lati perpendicolari
      } else if ((corner1 === 2 && corner2 === 6) || (corner1 === 6 && corner2 === 2)) {
        safeSides = [1, 7, 3, 5];
      }
      
      for (let i = 0; i < safeSides.length; i++) {
        if (availableMoves.indexOf(safeSides[i]) !== -1) {
          return safeSides[i]; // EXIT IMMEDIATO
        }
      }
    }
  }
}
// Continua con logica normale...
```

**PERCHÉ I LATI PERPENDICOLARI:**
- Creano una minaccia sulla linea passante per il centro
- Forzano X a difendersi invece di completare la forchetta
- Esempio: X in 0-8, O gioca 3 → minaccia sulla riga 3-4-5

### 5.2. Logica Generale di `findForkMove`

Dopo il caso speciale, implementa la logica standard:

```javascript
for (ogni mossa disponibile) {
  simula la mossa
  conta quante linee hanno 2 celle del player + 1 vuota
  se count >= 2:
    return mossa // È una forchetta
}
return null
```

**Commento obbligatorio:** Spiega che una forchetta = 2+ minacce simultanee che l'avversario non può bloccare tutte.

### 5.3. Intelligenza di `findStrategicMove`

Priorità di selezione:

1. **Centro (4)**: Se disponibile, prendilo sempre
2. **Protezione angoli opposti**: Se O ha centro e X ha 1 angolo, gioca lato adiacente
3. **Angolo opposto**: Solo se O NON ha il centro (altrimenti rischio)
4. **Angolo libero**: Buona posizione offensiva
5. **Lato**: Ultima scelta

```javascript
// 1. Centro
if (availableMoves.indexOf(constants.CENTER) !== -1) {
  return constants.CENTER;
}

// 2. Protezione preventiva
if (board[constants.CENTER] === constants.PLAYER) {
  const opponentCorners = [/* trova angoli di X */];
  
  if (opponentCorners.length === 1) {
    // Gioca lato adiacente all'angolo di X
    const adjacentSides = {
      0: [1, 3], 2: [1, 5], 6: [3, 7], 8: [5, 7]
    };
    // Ritorna primo lato adiacente disponibile
  }
}

// 3. Angolo opposto (solo se NON abbiamo centro)
if (board[constants.CENTER] !== constants.PLAYER) {
  // Logica angolo opposto
}

// 4-5. Angoli e Lati
```

### 5.4. Difesa in `STRATEGIC_MOVE.onEnter`

**PRIORITÀ 0 OBBLIGATORIA** prima di qualsiasi altra logica:

```javascript
// Verifica emergenza angoli opposti
if (context.board[context.constants.CENTER] === context.constants.PLAYER) {
  const opponentCorners = [/* trova angoli X */];
  
  if (opponentCorners.length === 2) {
    if (/* sono opposti */) {
      // GIOCA LATO IMMEDIATAMENTE, ignora forchette offensive
      for (ogni lato disponibile) {
        api.makeMove(lato);
        memory.moveCount++;
        return; // EXIT
      }
    }
  }
}

// Solo se non in emergenza, procedi con logica normale
```

Questo previene che il bot cerchi forchette offensive quando deve difendersi.

-----

## 6. Verification (Autocontrollo Obbligatorio e Rigoroso)

**AUTOCONTROLLO FINALE:** L'LLM deve verificare che il codice generato rispetti **tutti** i seguenti punti:

### 6.1. Checklist Strutturale

- [ ] Tutte le 6 sezioni (A, B, C, D, E, F) sono presenti e complete
- [ ] `emergencyTransitions` ha 4 transizioni nell'ordine corretto
- [ ] `tacticalTransitions` ha 2 transizioni
- [ ] Stato IDLE usa `get transitions()` per concatenare gli array
- [ ] Stati esecutivi hanno `transitions: [...]` con GAME_OVER e IDLE
- [ ] Ogni `onEnter` esecutivo chiama `api.makeMove()` e incrementa `memory.moveCount`

### 6.2. Checklist Strategica

- [ ] `findForkMove` include il caso speciale degli angoli opposti all'inizio
- [ ] Il caso speciale ritorna lati con priorità corretta (perpendicolari prima)
- [ ] `findStrategicMove` include protezione preventiva per 1 angolo
- [ ] `STRATEGIC_MOVE.onEnter` ha PRIORITÀ 0 per emergenza angoli opposti
- [ ] La priorità 0 usa `return` immediato dopo aver giocato il lato

### 6.3. Test Critico di Validazione

**Sequenza di test obbligatoria:**

```
Turno 1: X gioca 0 (angolo alto-sx)
Turno 2: O gioca 4 (centro) ✓
Turno 3: X gioca 8 (angolo basso-dx opposto)
Turno 4: O DEVE giocare 3 o 5 (lati perpendicolari) ✓✓✓
```

Se O gioca un angolo (1, 2, 6, 7) al turno 4, il codice è **DIFETTOSO**.

**Risultato atteso:** PAREGGIO contro gioco perfetto.

-----

## 7. Note Finali per l'Implementatore

### 7.1. Errori Comuni da Evitare

1. **Non ritornare dopo aver trovato il blocco**: Ogni caso speciale DEVE avere `return` esplicito
2. **Usare logica generica per casi specifici**: Gli angoli opposti richiedono logica dedicata
3. **Dimenticare le transitions negli stati**: Causa blocco della FSM
4. **Non dare priorità alla difesa**: La difesa DEVE essere sempre prima dell'attacco

### 7.2. Debug Tips

- Logga ogni mossa con `api.log('STATO: mossa in posizione X')`
- Verifica quale transizione si attiva con `api.log('Transizione: ' + description)`
- Testa sempre la sequenza critica X(0) → O(4) → X(8) → O(?)

### 7.3. Estensioni Possibili

Dopo aver implementato correttamente questo codice:
- Aggiungi ottimizzazioni per riconoscere altri pattern
- Implementa aperture specifiche quando O gioca per primo
- Aggiungi euristiche per forzare errori dell'avversario umano

-----

**VERSIONE:** 4.0 (Debuggato e Validato)  
**DATA:** 2025-01-04  
**STATUS:** Production-Ready - Strategia Ottimale Garantita ✓