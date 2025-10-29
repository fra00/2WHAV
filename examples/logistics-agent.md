# 🚀 2WHAV Prompt: Agente Decisionale Logistico v1.0 (JavaScript) 🚀

## I. Nota di Generalizzazione ⚠️

Nota: Il Motore Decisionale FSM è qui usato come esempio astratto. Il codice finale deve essere un oggetto JavaScript.

## 1. WHAT: Introduzione e Indice

### # What First: Scopo e Risultato Atteso

Sei un esperto di sistemi decisionali. Il tuo compito è creare il **Motore Decisionale** per un agente che ottimizza la logistica di magazzino.
L'output **DEVE** essere **SOLO** codice **JavaScript** formattato in un oggetto letterale `const agentLogic = { ... }`.

### # Indice

| Sezione                 | Logica | Scopo                                          |
| :---------------------- | :----- | :--------------------------------------------- |
| **\# Virtualizzazione** | HOW    | Modello Comportamentale e Priorità del Flusso. |
| **\# Generazione**      | HOW    | Regole di sintassi e scaffolding.              |
| **\# Interfaccia**      | HOW    | Documentazione API.                            |
| **\# Augmentation**     | HOW    | Direttive strategiche e creative.              |
| **\# Verification**     | VERIFY | Checklist di conformità finale.                |

## 2. HOW: Virtualizzazione (Modello Comportamentale)

### Contratto del Motore Decisionale

Il Motore Decisionale (che può essere FSM, Behaviour Tree o Ruleset) deve valutare le sue logiche in **questo ordine di priorità inviolabile**:

1.  **URGENZA (Max Priority):** Logiche di sicurezza o critiche.
2.  **PIANIFICAZIONE (High Priority):** Sequenze di azioni per completare un compito.
3.  **STANDARD (Normal Priority):** Logiche di attesa o monitoraggio.

## 3. HOW: Generazione (Regole e Scaffolding COMPLETO)

### 3.1. Regole Generali di Generazione del Codice

- **Output Obbligatorio:** L'output è un singolo oggetto letterale `agentLogic`.
- **Sintassi delle Funzioni:** È **OBBLIGATORIO** utilizzare `function(...) { ... }`. **VIETATO UTILIZZARE FUNZIONI LAMBDA (`=>`)**.
- **Accesso Helper:** Accedi alle helper function **SOLO** tramite `agentLogic.nomeHelper()`.

### 3.2. Scaffolding del Codice (CONTRATTO INVIOLABILE)

javascriptconst agentLogic = { initialState: 'IDLE', // Stato iniziale del Motore Decisionale memory: { /_ Dati persistenti _/ }, CONSTANTS: { MAX_LOAD: 500 }, updateContext: function(api, externalData) { // DEVE restituire l'oggetto 'context' per la decisione return {}; }, decideAction: function(api, externalData) { // DEVE contenere la logica di valutazione della priorità 2.1 const context = agentLogic.updateContext(api, externalData); // [Logica di esecuzione del Motore Decisionale] }, \_helperCalculateCost: function(path) { // [Implementazione Helper] return 0; }};

4. HOW: Interfaccia (API di Interazione)

### 4.1. API Table

Il codice interagisce SOLO tramite l'oggetto `api`:

| Funzione                  | Input           | Output          | Nota Critica                     |
| ------------------------- | --------------- | --------------- | -------------------------------- |
| `api.getLocation()`       | void            | `object` {x, y} | Posizione corrente.              |
| `api.requestPath(target)` | `object` {x, y} | `boolean`       | Richiede un percorso; FALLIBILE. |
| `api.loadItem(item_id)`   | `string`        | `boolean`       | Tenta di caricare un oggetto.    |

## 5. HOW: Augmentation (Direttive Strategiche)

### 5.1. Creativity Directive

L'LLM deve implementare un sistema di **caching della memoria** per le posizioni critiche e deve calcolare un **costo opportunità** per ogni compito, non solo il percorso più breve.

## 6. VERIFY: Verification (Controllo Finale)

### 6.1. Checklist di Conformità Finale

L'LLM **DEVE** verificare:

- [ ] L'output è un singolo oggetto letterale JavaScript?

- [ ] Sono state usate SOLO `function(...) {}` (no `=>`)?

- [ ] La logica aderisce alla priorità **Urgenza** **Pianificazione** **Standard**?

- [ ] È stata implementata la logica di **caching della memoria** e **costo opportunità**?
