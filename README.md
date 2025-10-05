# 📘 Standard Tecnico e Guida Pratica: Il Framework 2V.G.I.A. (Generalizzato)

Chiedere ad un'Intelligenza Artificiale (come un LLM) di scrivere del codice complesso che rispetti le tue **regole di architettura o strategia** e si interfacci con un ambiente reale è difficile.

Il framework **2V.G.I.A.** (Virtualizzazione, Generazione, Interfaccia, Augmentation, Verification) nasce proprio per risolvere questo problema. Non è solo un modo per scrivere le istruzioni, ma un vero e proprio **Contratto di Lavoro** che tu, come utente, stipuli con l'AI.

Il suo scopo principale è eliminare le **"zone grigie"** nella generazione del codice. Una volta che il framework ha stabilito chiaramente le regole, le priorità e gli ambienti virtuali, l'LLM è in grado di generare **qualunque tipo di codice** in modo rigoroso e conforme alle specifiche.

Il 2V.G.I.A. obbliga l'AI a seguire regole rigorose in quattro aree chiave:

- **Cosa fare (Virtualizzazione):** **Virtualizza il sistema** in cui dovrà interagire e stabilisci l'ordine di priorità delle sue decisioni
- **Come farlo (Generazione e Interfaccia):** Spiega le **regole di scrittura del codice** e come dovrà interagire con il tuo mondo (tramite precise API e sintassi)
- **L'intelligenza in più (Augmentation):** Vai oltre la richiesta di base e costringi l'AI a dimostrare **pensiero strategico avanzato**.
- **Prova che hai fatto bene (Verification):** L'AI deve **autocontrollare** il suo codice rispetto a ogni singola regola del contratto prima di consegnarlo.

In pratica, il **2V.G.I.A.** trasforma un'istruzione vaga ("Scrivi un bot") in un **disciplinare ingegneristico dettagliato**, assicurando che l'output sia non solo corretto, ma anche strutturalmente robusto e conforme ai tuoi standard professionali.

## 2V.G.I.A.

Il **2V.G.I.A.** (Virtualizzazione, Generazione, Interfaccia, Augmentation, Verification) è un **Contratto di Prompt Engineering** rigoroso, progettato per ottenere output di codice dagli LLM che siano totalmente aderenti alle specifiche. Il framework segue il flusso logico **"What -> How -> Verify"**.

## I. Nota di Generalizzazione ⚠️

**Nota Importante:** Gli esempi di codice (Motori Decisionali, API, o _scaffolding_) forniti in questa guida sono **puramente illustrativi**. L'architettura di controllo (**Motore Decisionale** o **Modello Comportamentale**) e le **API effettive** devono essere definite in base al **dominio specifico** (es. Logistica, Trading, Giochi) richiesto nel prompt. Per coerenza, gli esempi concreti utilizzano **JavaScript**.

---

## II. WHAT: Introduzione e Obiettivo (Cosa)

Questa fase definisce l'obiettivo principale e il ruolo dell'LLM.

| Componente       | Scopo                                                                  | Logica |
| ---------------- | ---------------------------------------------------------------------- | ------ |
| **# What First** | Definisce l'**obiettivo finale** e il ruolo dell'LLM.                  | WHAT   |
| **# Indice**     | Fornisce la **mappa di navigazione** e valida la struttura del prompt. | WHAT   |

### Esempio Pratico (Inizio del Prompt - JS)

Markdown

```
# 🚀 2V.G.I.A. Prompt: Agente Decisionale Logistico v1.0 (JavaScript) 🚀

## 1. WHAT: Introduzione e Indice

### # What First: Scopo e Risultato Atteso
Sei un esperto di sistemi decisionali. Il tuo compito è creare il **Motore Decisionale** per un agente che ottimizza la logistica di magazzino.
L'output **DEVE** essere **SOLO** codice **JavaScript** formattato in un **Oggetto Letterale Unico** (es. `const agentLogic = { ... }`).

### # Indice
| Sezione | Logica | Scopo |
| :--- | :--- | :--- |
| **\# Virtualizzazione (V)** | HOW | Modello Comportamentale e Priorità del Flusso. |
| **\# Generazione (G)** | HOW | Regole di sintassi e scaffolding. |
| **\# Interfaccia (I)** | HOW | Documentazione API. |
| **\# Augmentation (A)** | HOW | Direttive strategiche e creative. |
| **\# Verification (V)** | VERIFY | Checklist di conformità finale. |
```

---

## III. HOW: Virtualizzazione, Generazione, Interfaccia, Augmentation (Come)

Questa fase definisce tutte le regole operative per l'esecuzione del compito.

### 2. V: Virtualizzazione (Modello Comportamentale)

Definisce il modello logico che il codice deve implementare.

| Componente               | Scopo                                                                                                     | Requisito Critico                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Contratto del Flusso** | Stabilisce l'**architettura di controllo** (es. FSM, Behaviour Tree, ecc.) e la priorità delle decisioni. | Il modello è un **Motore Decisionale** con priorità di valutazione (es. Urgenza -> Pianificazione). |

#### Esempio Pratico (Motore Decisionale FSM Illustrativo - JS)

Markdown

```
## 2. HOW: V: Virtualizzazione (Modello Comportamentale)

### Contratto del Motore Decisionale
Il Motore Decisionale (qui illustrato come FSM per chiarezza) deve valutare le sue logiche in **questo ordine di priorità inviolabile**:
1.  **URGENZA (Max Priority):** Logiche di sicurezza o critiche (es. 'Evita Collisione').
2.  **PIANIFICAZIONE (High Priority):** Sequenze di azioni per completare un compito (es. 'Movimento Verso Area').
3.  **STANDARD (Normal Priority):** Logiche di attesa o monitoraggio.
```

### 3. G: Generazione (Regole e Scaffolding COMPLETO)

| Componente          | Scopo                                                                                             | Requisito Critico                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Regole Generali** | Impone standard di stile e compatibilità tecnica.                                                 | **OBBLIGATORIO:** Solo `function(...) {}` (vietate `=>`). Accesso Helper SOLO tramite `agentLogic.helper()`. |
| **Scaffolding**     | Fornisce lo **scheletro esatto** e i formati obbligatori per le strutture del Motore Decisionale. | Deve essere compatibile con l'architettura scelta (Oggetto, FSM, BT, ecc.).                                  |

#### Esempio Pratico (Scaffolding JavaScript)

JavaScript

```
## 3. HOW: G: Generazione (Regole e Scaffolding COMPLETO)

### Regole Generali di Generazione del Codice
* **Sintassi delle Funzioni:** È **OBBLIGATORIO** utilizzare `function(...) { ... }`. **VIETATO UTILIZZARE FUNZIONI LAMBDA (`=>`)**.

### Scaffolding del Codice (CONTRATTO INVIOLABILE)
const agentLogic = {
  initialState: 'IDLE',
  memory: { /* Dati persistenti */ },
  CONSTANTS: { MAX_LOAD: 500 },

  updateContext: function(api, externalData) {
    // Deve restituire l'oggetto 'context'
    return {};
  },

  decideAction: function(api, externalData) {
    // Logica di decisione seguendo la priorità 2.1
    const context = agentLogic.updateContext(api, externalData);
    // [Logica di esecuzione del Motore Decisionale]
  },

  // Implementazione di un Helper (Obbligatorio per la verifica)
  _checkAreaOccupancy: function(areaId) {
    // Restituisce un booleano
    return false;
  }
};
```

### 4. I: Interfaccia (Protocollo di Interazione)

Definisce gli unici mezzi con cui il codice può interagire con il sistema.

| Funzione      | Input                                   | Output                                                              | Requisito Critico |
| ------------- | --------------------------------------- | ------------------------------------------------------------------- | ----------------- |
| **API Table** | Documenta ogni funzione di interazione. | Il codice generato **NON DEVE** usare chiamate API non documentate. |                   |

#### Esempio Pratico

Markdown

```
## 4. HOW: I: Interfaccia (API di Interazione)
Il codice interagisce SOLO tramite l'oggetto `api`:

| Funzione | Input | Output | Nota Critica |
|----------|-------|--------|--------------|
| `api.getLocation()` | void | `object` {x, y} | Posizione corrente dell'agente. |
| `api.requestPath(target)` | `object` {x, y} | `boolean` | Richiede un percorso; **FALLIBILE**. |
| `api.loadItem(item_id)` | `string` | `boolean` | Tenta di caricare un oggetto. |
```

### 5. A: Augmentation (Direttive Strategiche)

Spinge l'LLM a contribuire strategicamente e ad andare oltre i requisiti minimi.

| Componente               | Scopo                                       | Direttiva Strategica                                                                |
| ------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Creativity Directive** | Inietta intelligenza e complessità tattica. | Richiede l'implementazione di logiche avanzate non esplicitate nello _scaffolding_. |

#### Esempio Pratico

Markdown

```
## 5. HOW: A: Augmentation (Direttive Strategiche)

**CREATIVITY DIRECTIVE:** L'LLM deve implementare un sistema di **caching della memoria** per le posizioni critiche e deve calcolare un **costo opportunità** per ogni compito, non solo il percorso più breve.
```

---

## IV. VERIFY: Verification (Verifica)

L'ultima fase obbliga l'LLM all'autoverifica del rispetto di tutti i requisiti contrattuali.

### 6. V: Verification (Controllo Qualità Finale)

| Componente    | Scopo                                            | Requisito di Verifica                                                |
| ------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| **Checklist** | Un riassunto dei requisiti più critici di V e G. | L'LLM deve auto-confermare la conformità prima di emettere l'output. |

#### Esempio Pratico

Markdown

```
## 6. VERIFY: V: Verification (Controllo Finale)

L'LLM DEVE eseguire un controllo interno sulla conformità:
* [ ] L'output è un singolo oggetto letterale JavaScript?
* [ ] Sono state usate SOLO `function(...) {}` (no `=>`)?
* [ ] La logica aderisce alla priorità **Urgenza** $\rightarrow$ **Pianificazione** $\rightarrow$ **Standard**?
* [ ] È stata implementata la logica di **caching della memoria** e **costo opportunità**?
```

---

# 🎯 Esempio di Prompt Completo Unificato 2V.G.I.A. (JavaScript)

Questo blocco di testo è il prompt finale coeso che unisce tutte le sezioni di cui sopra.

Markdown

````
# 🚀 2V.G.I.A. Prompt: Agente Decisionale Logistico v1.0 (JavaScript) 🚀

## I. Nota di Generalizzazione ⚠️
Nota: Il Motore Decisionale FSM è qui usato come esempio astratto. Il codice finale deve essere un oggetto JavaScript.

## 1. WHAT: Introduzione e Indice

### # What First: Scopo e Risultato Atteso
Sei un esperto di sistemi decisionali. Il tuo compito è creare il **Motore Decisionale** per un agente che ottimizza la logistica di magazzino.
L'output **DEVE** essere **SOLO** codice **JavaScript** formattato in un oggetto letterale `const agentLogic = { ... }`.

### # Indice
| Sezione | Logica | Scopo |
| :--- | :--- | :--- |
| **\# Virtualizzazione (V)** | HOW | Modello Comportamentale e Priorità del Flusso. |
| **\# Generazione (G)** | HOW | Regole di sintassi e scaffolding. |
| **\# Interfaccia (I)** | HOW | Documentazione API. |
| **\# Augmentation (A)** | HOW | Direttive strategiche e creative. |
| **\# Verification (V)** | VERIFY | Checklist di conformità finale. |

## 2. HOW: V: Virtualizzazione (Modello Comportamentale)

### Contratto del Motore Decisionale
Il Motore Decisionale (che può essere FSM, Behaviour Tree o Ruleset) deve valutare le sue logiche in **questo ordine di priorità inviolabile**:
1.  **URGENZA (Max Priority):** Logiche di sicurezza o critiche.
2.  **PIANIFICAZIONE (High Priority):** Sequenze di azioni per completare un compito.
3.  **STANDARD (Normal Priority):** Logiche di attesa o monitoraggio.

## 3. HOW: G: Generazione (Regole e Scaffolding COMPLETO)

### 3.1. Regole Generali di Generazione del Codice
* **Output Obbligatorio:** L'output è un singolo oggetto letterale `agentLogic`.
* **Sintassi delle Funzioni:** È **OBBLIGATORIO** utilizzare `function(...) { ... }`. **VIETATO UTILIZZARE FUNZIONI LAMBDA (`=>`)**.
* **Accesso Helper:** Accedi alle helper function **SOLO** tramite `agentLogic.nomeHelper()`.

### 3.2. Scaffolding del Codice (CONTRATTO INVIOLABILE)
```javascriptconst agentLogic = {  initialState: 'IDLE', // Stato iniziale del Motore Decisionale  memory: { /* Dati persistenti */ },  CONSTANTS: {     MAX_LOAD: 500   },    updateContext: function(api, externalData) {     // DEVE restituire l'oggetto 'context' per la decisione    return {};  },    decideAction: function(api, externalData) {    // DEVE contenere la logica di valutazione della priorità 2.1    const context = agentLogic.updateContext(api, externalData);    // [Logica di esecuzione del Motore Decisionale]  },    _helperCalculateCost: function(path) {    // [Implementazione Helper]    return 0;  }};


4. HOW: I: Interfaccia (API di Interazione)

### 4.1. API Table

Il codice interagisce SOLO tramite l'oggetto `api`:

| Funzione | Input | Output | Nota Critica |
| --- | --- | --- | --- |
| `api.getLocation()` | void | `object` {x, y} | Posizione corrente. |
| `api.requestPath(target)` | `object` {x, y} | `boolean` | Richiede un percorso; FALLIBILE. |
| `api.loadItem(item_id)` | `string` | `boolean` | Tenta di caricare un oggetto. |

## 5. HOW: A: Augmentation (Direttive Strategiche)

### 5.1. Creativity Directive

L'LLM deve implementare un sistema di **caching della memoria** per le posizioni critiche e deve calcolare un **costo opportunità** per ogni compito, non solo il percorso più breve.

## 6. VERIFY: V: Verification (Controllo Finale)

### 6.1. Checklist di Conformità Finale

L'LLM **DEVE** verificare:

- [ ] L'output è un singolo oggetto letterale JavaScript?

- [ ] Sono state usate SOLO `function(...) {}` (no `=>`)?

- [ ] La logica aderisce alla priorità **Urgenza** **Pianificazione** **Standard**?

- [ ] È stata implementata la logica di **caching della memoria** e **costo opportunità**?
````

## V. Esempio di Applicazione Concreta: Bot Tris (V3)

Per dimostrare l'efficacia e la rigorosità del framework **2V.G.I.A.**, di seguito è riportato l'esempio di un prompt di alto livello che lo utilizza per un problema specifico e complesso: la creazione di un bot di Tris imbattibile.

In questo caso, il framework non è solo un _template_ astratto, ma un **contratto inviolabile** che disciplina il codice, la strategia (_Augmentation_), e la sua esecuzione (_Virtualizzazione_). L'LLM, ricevendo questo prompt, non può semplicemente generare codice, ma è obbligato a incorporare un preciso modello decisionale a priorità fissa e funzioni di difesa strategica (_findForkMove_).

**RISULTATO ATTESO DALL'LLM:** Un singolo blocco di codice JavaScript completamente funzionante che implementa la logica FSM descritta, garantendo che l'ordine delle transizioni rispecchi perfettamente la gerarchia di difesa (_Blocco Vittoria_ prima di _Vittoria Propria_).

````
PROMPT DEFINITIVO PER BOT TRIS (V3)

Sei un Programmatore Specializzato in Intelligenza Artificiale (AI) di Livello Esperto. Il tuo compito è generare la logica FSM completa per un bot di Tris (Tic-Tac-Toe) in Javascript. Il bot gioca come Giocatore O (PLAYER_O). Devi garantire che il bot NON POSSA ESSERE SCONFITTO dall'avversario tramite forchette o altre trappole strategiche, rispettando il seguente contratto 2V.G.I.A.

## 1. WHAT: Introduzione e Indice

### 1.1. What First: Scopo e Risultato Finale
SCOPO: Implementare la logica FSM completa per un bot di Tris (Giocatore O) con un livello di strategia ottimale (perfetto giocatore non perdente).
RISULTATO FINALE: Un singolo oggetto letterale Javascript ({ ... }) che aderisce rigorosamente allo scaffolding.

### 1.2. Indice
| Sezione | Logica | Scopo |
| :--- | :--- | :--- |
| **\# Virtualizzazione (V)** | HOW | Contratto del Motore con Priorità Assoluta. |
| **\# Interfaccia (I)** | HOW | Contratto API e Context. |
| **\# Generazione (G)** | HOW | Contratto del Codice e Struttura. |
| **\# Augmentation (A)** | HOW | Direttiva di Contribuzione Strategica e Intelligenza. |
| **\# Verification (V)** | VERIFY | Autocontrollo Obbligatorio e Rigoroso. |

## 2. HOW: V: Virtualizzazione (Contratto del Motore con Priorità Assoluta)

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

## 4. HOW: G: Generazione (Contratto del Codice e Struttura)

### 4.1. Regole di Sintassi
* Output = singolo oggetto letterale ({ ... }).
* Tutte le funzioni usano la sintassi `function(...) { ... }` (**no Arrow Functions $\Rightarrow$**).
* Gli Helper sono chiamati con `fsmDefinition.nomeHelper()`.

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


5. HOW: A: Augmentation (Direttiva di Contribuzione Strategica e Intelligenza)

- **DIRETTIVA CREATIVA POTENZIATA:** L'LLM deve agire come un giocatore esperto che conosce perfettamente la strategia del Tris. La logica DEVE garantire che il bot non sia battuto da alcuna sequenza ottimale dell'avversario.

- **Priorità Strategica:** L'ordine di difesa e attacco nel codice rispecchia l'ordine del punto 2.2 (Difesa prioritaria).

- **Robustezza di `findForkMove`:** La funzione `findForkMove` deve contenere logica non banale e commenti dettagliati in linea che spieghino i passaggi per identificare:

  - La creazione di due minacce separate.

  - La necessità di trovare una mossa che le chiuda entrambe.

- **Intelligenza di `STRATEGIC_MOVE`:** Lo stato `STRATEGIC_MOVE: onEnter` deve gestire la complessità delle mosse di ripiego:

  - Prima Mossa: Centro (4).

  - Mossa di Ripiego: Sequenza Centro > Angoli Opposti > Angoli Vuoti > Lati.


## 6. VERIFY: V: Verification (Autocontrollo Obbligatorio e Rigoroso)

- **AUTOCONTROLLO FINALE:** L'LLM deve verificare che il codice generato rispetti tutti i seguenti punti:

  - **Priorità Critica Inviolabile:** La sezione `emergencyTransitions` contiene le quattro transizioni nell'ordine: `GAME_OVER` `Blocco Vittoria Avv.` `Prevenzione Forchetta Avv.` `Vittoria Propria`.

  - **Robustezza Funzionale:** La funzione `findForkMove` è implementata con logica complessa e include commenti esplicativi come richiesto nella Sezione 5.

  - **Esecuzione Completa:** Tutte le sei sezioni A, B, C, D, E, F sono presenti. Gli stati esecutivi chiamano `api.makeMove()` e aggiornano `memory.moveCount`.
````

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
