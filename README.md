## 2WHAV

Il 2WHAV è una struttura di Prompt Engineering rigorosa, progettata per massimizzare l'aderenza degli output alle specifiche. Il framework segue il flusso logico "What → Where → How → Augment → Verify".

**Schema del Framework:**

```
flowchart LR
    U["Utente"] --> FW["Framework 2WHAV"]
    FW --> L["LLM"]
    L --> FW
    FW --> U

    subgraph FW ["Framework 2WHAV"]
        V1["Virtualization"]
        G1["Generation"]
        I1["Interface"]
        A1["Augmentation"]
        V2["Verification"]
        V1 --> G1 --> I1 --> A1 --> V2
    end
```

### Nota di Generalizzazione ⚠️

*Gli esempi di codice (Motori Decisionali, API, o *scaffolding*) forniti in questa guida sono **puramente illustrativi**. L'architettura di controllo (**Motore Decisionale** o **Modello Comportamentale**) e le **API effettive** devono essere definite in base al **dominio specifico** (es. Logistica, Trading, Giochi) richiesto nel prompt. Per coerenza, gli esempi concreti utilizzano **JavaScript**.*

### 🚀 Esempio Rapido: Il Problema che 2WHAV Risolve

**Obiettivo:** Creare una funzione che validi un'email tramite API esterna, con retry automatico in caso di errore.

#### ❌ Prompt Tradizionale (Ambiguo)

```
Scrivi una funzione JavaScript che validi un'email chiamando un'API.
Deve riprovare se fallisce.
```

**Cosa manca?**

- Quante volte riprovare? (2? 3? 10?)
- Con quale strategia? (backoff esponenziale? delay fisso?)
- Cosa restituire se fallisce del tutto?
- Quale sintassi? (async/await? Promises? callback?)

**Risultato:** L'LLM deve indovinare, producendo codice che probabilmente non rispetta le tue aspettative.

#### ✅ Con 2WHAV (Contratto Chiaro)

```
# Validatore Email con Retry

## WHAT: Obiettivo
Crea una funzione async `validateEmail(email)` che validi un indirizzo
email tramite API esterna. In caso di errore, deve riprovare fino a 3 volte
con backoff esponenziale (100ms, 200ms, 400ms).

Output: Oggetto `{ valid: boolean, attempts: number, error?: string }`

## HOW: Regole
- OBBLIGATORIO: Sintassi `async function validateEmail(email) { ... }`
- OBBLIGATORIO: Usa try/catch per ogni tentativo
- VIETATO: Usare setTimeout (usa solo delay sincrono per semplicità)

## HOW: API
Puoi chiamare SOLO:
- `api.checkEmail(email)` → Promise<boolean> (può rigettare con Error)

## AUGMENT: Intelligenza Extra
Oltre al retry base, implementa:
1. Log di ogni tentativo fallito con `console.warn()`
2. Se tutti i tentativi falliscono, includi il messaggio d'errore nell'output

## VERIFY: Checklist
- [ ] Funzione async?
- [ ] Esattamente 3 tentativi?
- [ ] Backoff esponenziale (100ms, 200ms, 400ms)?
- [ ] Restituisce `{ valid, attempts, error? }`?
- [ ] Log dei fallimenti implementato?
```

**Risultato:** Zero ambiguità. L'LLM genera codice preciso, conforme e senza bisogno di iterazioni correttive.

## 1. WHAT: Introduzione e Obiettivo (WHAT)

Questa fase costituisce la **dichiarazione di intenti** e stabilisce lo scopo. Definisce **cosa vuoi**, il **risultato finale esatto** che deve essere prodotto e lo **scopo principale del prompt**.

Il **WHAT** specifica cosa l'LLM dovrà fare utilizzando tutte le fasi successive come manuale tecnico (HOW, Augmentation e Verification). Per questo motivo, questa sezione deve essere **la più specifica possibile**, includendo:

- **Ruolo e Competenza:** L'assegnazione del ruolo esatto all'LLM (es. "Sei un Ingegnere Senior in JavaScript").
- **Vincoli di Flusso:** Se esistono vincoli operativi o un flusso principale (ad esempio, "Il sistema deve prioritizzare la lettura dati prima di qualsiasi scrittura").
- **Regole e Vincoli Iniziali:** Qualsiasi regola o vincolo sul funzionamento generale necessario per raggiungere il risultato finale.
- **Formato di Output:** La specifica del formato richiesto (es. "SOLO codice JavaScript in un oggetto letterale unico").

Nota: Sii chiaro e dettagliato nello specificare lo scopo , più specifico è il dettaglio del tuo scopo e migliori saranno i risultati

- **Componenti del WHAT:**

  - **What First** - Scopo: Definisce l'obiettivo finale e il ruolo dell'LLM (Logica: WHAT)

  - **Indice** - Scopo: Fornisce la mappa di navigazione e valida la struttura del prompt (Logica: WHAT)

Nota: L'indice nei prompt lunghi è importante perchè facilita l' LLM a orientarsi e stabilire una **mappa mentale** chiara del documento

### Esempio Pratico (Inizio del Prompt - JS)

```
# 🚀 2WHAV Prompt: Agente Decisionale Logistico v1.0 (JavaScript) 🚀

## 1. WHAT: Introduzione e Indice

### What First: Scopo e Risultato Atteso
Sei un esperto di sistemi decisionali. Il tuo compito è creare il **Motore Decisionale** per un agente che ottimizza la logistica di magazzino.
L'output **DEVE** essere **SOLO** codice **JavaScript** formattato in un **Oggetto Letterale Unico** (es. `const agentLogic = { ... }`).

### # Indice
| Sezione | Logica | Scopo |
| :--- | :--- | :--- |
| **\# 1. Virtualizzazione** | WHERE | Modello Comportamentale e Priorità del Flusso. |
| **\# 2. Generazione** | HOW | Regole di sintassi e scaffolding. |
| **\# 3. Interfaccia** | HOW | Documentazione API. |
| **\# 4. Augmentation** | AUGMENTATION | Direttive strategiche e creative. |
| **\# 5. Verification** | VERIFY | Checklist di conformità finale. |
```

## Virtualizzazione, Generazione, Interfaccia, Augmentation (HOW)

Questa fase definisce tutte le regole operative per l'esecuzione del compito.

### 2. (WHERE): Virtualizzazione (Modello Comportamentale)

Definisce il **modello logico che il codice deve implementare**. Questa fase è dove l'LLM viene istruito non solo sul _tipo_ di codice, ma sulla sua **architettura interna di controllo**. Invece di fornire all'LLM l'intero codice dell'ambiente di destinazione, la **virtualizzazione ne descrive il contesto di esecuzione e le regole astratte**. Ad esempio, si specifica chiaramente che il codice deve essere una **Macchina a Stati Finiti (FSM)**, un **Albero Comportamentale (Behaviour Tree)** o un set di regole, definendo la **struttura** che l'LLM dovrà popolare. Questo permette all'LLM di comprendere a fondo **come il codice generato verrà utilizzato**, ottimizzando il resto delle nozioni fornite nel prompt. Qui si stabilisce l'**ordine gerarchico** e la **priorità assoluta** delle sue decisioni. **Indica qui la descrizione completa del modello operativo: non solo l'architettura (es. FSM), ma anche il ciclo di esecuzione, il flusso dei dati e le priorità decisionali.**

**Componente della Virtualizzazione:**

**Specifica del Flusso**

- Scopo: Stabilisce l'architettura di controllo (es. FSM, Behaviour Tree, ecc.) e la priorità delle decisioni.
- Requisito Critico: Il modello è un Motore Decisionale con priorità di valutazione (es. Urgenza -> Pianificazione).

#### Esempio Pratico (Motore Decisionale FSM Illustrativo - JS)

```
## 2. WHERE: Virtualizzazione (Modello Comportamentale)

### Specifica del Motore Decisionale
- Il Motore Decisionale (qui illustrato come FSM per chiarezza) deve valutare le sue logiche in **questo ordine di priorità inviolabile**:
    1.  **URGENZA (Max Priority):** Logiche di sicurezza o critiche (es. 'Evita Collisione').
    2.  **PIANIFICAZIONE (High Priority):** Sequenze di azioni per completare un compito (es. 'Movimento Verso Area').
    3.  **STANDARD (Normal Priority):** Logiche di attesa o monitoraggio.
- buildContext() viene chiamato prima di ogni ciclo decisionale
- buildContext() valorizza context.x, context.y, context.z
- Gli stati ricevono context.delta e context.gamma come input
- Le transizioni valutano prima le condizioni di livello superiore
```

### 3. (HOW): Generazione (Regole e Scaffolding COMPLETO)

Questa fase stabilisce le **regole inderogabili per la scrittura del codice**. Il suo obiettivo è duplice: imporre standard per un **codice pulito e robusto** e definire i **flussi obbligatori** e le **limitazioni tecniche** necessarie per l'integrazione. L'LLM riceve qui lo **scaffolding esatto** che deve popolare e le regole sintattiche che deve rispettare, come l'obbligo di usare una specifica convenzione di denominazione o il divieto di usare funzioni moderne non supportate.

**⚠️ Nota Critica:**

**Questa fase contiene le regole più critiche per la generazione del codice. Nel prompt, queste regole devono essere comunicate con linguaggio prescrittivo forte (OBBLIGATORIO, VIETATO) per massimizzare l'aderenza dell'LLM. La non conformità a queste regole compromette significativamente l'integrazione del codice generato.**

**Componenti della Generazione:**

- **Regole Generali**

  - Scopo: Impone standard di stile e compatibilità tecnica.
  - Requisito Critico: Es: OBBLIGATORIO: Solo function(...) {} (vietate =>). Accesso Helper SOLO tramite agentLogic.helper().

- **Scaffolding**
  - Scopo: Fornisce lo scheletro esatto e i formati obbligatori per le strutture del Motore Decisionale.
  - Requisito Critico: Es: Deve essere compatibile con l'architettura scelta (Oggetto, FSM, BT, ecc.).

#### Esempio Pratico (Scaffolding JavaScript)

⚠️ **NOTA:** Le regole seguenti (es. divieto di arrow functions) sono specifiche per questo esempio di sistema embedded. Nel TUO prompt, definisci SOLO le regole necessarie al TUO ambiente/standard.

```
## 3. HOW: Generazione (Regole e Scaffolding COMPLETO)

### Regole Generali di Generazione del Codice
* **Sintassi delle Funzioni:** È **OBBLIGATORIO** utilizzare `function(...) { ... }`. **VIETATO UTILIZZARE FUNZIONI LAMBDA (`=>`)**.

### Scaffolding del Codice (Template Obbligatorio)
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

### 4. (HOW): Interfaccia (Protocollo di Interazione)

Questa fase definisce gli **unici mezzi con cui il codice può interagire con il sistema** esterno. Lo scopo non è solo elencare le funzioni, ma documentarle con precisione assoluta: **tipi di input e output, eccezioni gestite e comportamenti specifici**. L'LLM deve trattare questo **Protocollo di Interazione** come un contratto API inviolabile e non può in alcun modo invocare funzioni o metodi non esplicitamente definiti in questa sezione.

**Componente dell'Interfaccia:**

- **API Table**

  - Scopo: Documenta ogni funzione di interazione.
  - Output: Il codice generato NON DEVE usare chiamate API non documentate.
  - Requisito Critico: [specificato nelle API documentate]

#### Esempio Pratico

```
## 4. HOW: Interfaccia (API di Interazione)
Il codice interagisce SOLO tramite l'oggetto `api`:

| Funzione | Input | Output | Nota Critica |
|----------|-------|--------|--------------|
| `api.getLocation()` | void | `object` {x, y} | Posizione corrente dell'agente. |
| `api.requestPath(target)` | `object` {x, y} | `boolean` | Richiede un percorso; **FALLIBILE**. |
| `api.loadItem(item_id)` | `string` | `boolean` | Tenta di caricare un oggetto. |
```

### 5. (Augment): Augmentation (Direttive Strategiche)

Questa fase richiede all'LLM di implementare **logiche avanzate oltre il requisito minimo** specificato nel WHAT. L'obiettivo è ottenere codice non solo funzionale, ma **ottimizzato, resiliente e strategicamente robusto**.

L'Augmentation specifica esplicitamente:

- Meccanismi di ottimizzazione (es. costo opportunità, caching)
- Logiche di resilienza (es. retry, fallback, validazione)
- Funzionalità preventive (es. risk assessment, anomaly detection)

Queste logiche devono essere **richieste esplicitamente** in questa sezione, anche se non erano menzionate nel WHAT iniziale.

**Componente dell'Augmentation:**

• **Creativity Directive**

- Scopo: Inietta intelligenza e complessità tattica.
- Direttiva Strategica: Richiede l'implementazione di logiche avanzate non esplicitate nello scaffolding.

#### Esempio Pratico

```
## 5. HOW: Augmentation (Direttive Strategiche)

**CREATIVITY DIRECTIVE:**
L'LLM DEVE implementare logiche che vanno oltre la risoluzione del compito base ("vai a X e carica Y"):

1.  **OTTIMIZZAZIONE STRATEGICA:** Non calcolare solo il percorso più breve, ma implementare un sistema che valuti il **costo opportunità** per ogni compito disponibile (tempo di percorrenza + priorità dell'oggetto) prima di prendere una decisione.
2.  **RESILIENZA:** Il Motore Decisionale deve includere meccanismi di **prevenzione degli errori**, come un sistema di **caching della memoria** per le posizioni critiche o un meccanismo di *timeout* e *retry* avanzato non richiesto esplicitamente nel WHAT.
3.  **PENSIERO CRITICO:** Aggiungi un metodo helper (`agentLogic._calculateRisk`) che valuti il rischio di collisione basato sui dati storici.
```

### 6. VERIFY: Verification (Verifica)

L'ultima fase richiede all'LLM l'autoverifica del rispetto di tutti i requisiti contrattuali.

#### (You Did Well): Verification (Controllo Qualità Finale)

Questa fase serve come **reminder finale** dei requisiti più critici. La checklist viene inclusa alla fine del prompt per: - Rafforzare le regole chiave prima della generazione dell'output - Fornire un riferimento rapido per la validazione manuale - Aumentare la probabilità che l'LLM consideri questi vincoli durante la generazione **Nota:** Gli LLM non eseguono verifica post-generazione autonoma. La checklist influenza il processo generativo, ma la validazione finale rimane responsabilità dell'utente.

**Componente della Verification:**

**Checklist**

- Scopo: Un riassunto dei requisiti più critici di Virtualization e Generation.
- Requisito di Verifica: Reminder per l'LLM + strumento di validazione manuale per l'utente

#### Esempio Pratico

Questa è l'**ultima fase** e funge da **reminder finale** dei requisiti critici. La checklist rafforza le regole chiave durante la generazione dell'output e fornisce uno strumento di validazione per l'utente. Includi questa sezione alla fine del prompt per massimizzare la probabilità che l'LLM consideri questi vincoli durante la generazione del codice.

```
## 6. VERIFY: Verification (Checklist di Conformità)

Prima di fornire l'output, verifica che il codice rispetti:
* [ ] L'output è un singolo oggetto letterale JavaScript?
* [ ] Sono state usate SOLO `function(...) {}` (no `=>`)?
* [ ] La logica aderisce alla priorità **Urgenza** $\rightarrow$ **Pianificazione** $\rightarrow$ **Standard**?
* [ ] È stata implementata la logica di **caching della memoria** e **costo opportunità**?
```

## 🧩 Modularità e Flessibilità del Framework 2WHAV

Sebbene il framework **2WHAV** sia stato progettato per affrontare la massima complessità, la sua architettura è **intrinsecamente modulare**. Non tutte le fasi sono obbligatorie in ogni scenario, permettendo di adattare il livello di rigore al compito specifico.

### Flessibilità delle Fasi:

- **Virtualizzazione** (Where)

  - Flessibilità: Condensabile/Omettibile
  - Condizione per l'Omissione: Se si utilizza un'architettura o una libreria altamente nota all'LLM (es. XState o Redux), la sua definizione può essere spostata nella fase Generazione (HOW), usando lo scaffolding come base. Tuttavia, la Gerarchia di Priorità deve essere definita altrove.

- **Augmentation** (Augment?)

  - Flessibilità: Facoltativa
  - Condizione per l'Omissione: È la fase del valore aggiunto strategico. Può essere omessa se l'obiettivo è solo un codice funzionale e conforme ai requisiti minimi, senza bisogno di intelligenza tattica o prevenzione degli errori complessi.

Le fasi **WHAT (Scopo), HOW (Generazione/Interfaccia),** e **VERIFY (You Did Well?)** costituiscono invece il **fondamento ineliminabile** del framework e devono sempre essere presenti per garantire la coerenza e la qualità dell'output.

## 🎯 Quando Usare 2WHAV?

Il framework è modulare: adatta le fasi alle tue esigenze. Questi esempi sono indicativi, non vincolanti.

**Livelli di Complessità e Fasi Suggerite:**

- **❌BASSA COMPLESSITÀ**

  - Fasi suggerite: Prompt classico
  - Esempio di applicazione: Funzione di utilità, helper semplici

- **MEDIA COMPLESSITÀ - LINEARE**

  - Fasi suggerite: WHAT + HOW + VERIFY
  - Esempio di applicazione: Client API, parser, validator, data transformer

- **MEDIA COMPLESSITÀ - DECISIONALE**

  - Fasi suggerite: WHAT + WHERE + HOW + VERIFY
  - Esempio di applicazione: Retry logic con stati, workflow con branch condizionali

- **ALTA COMPLESSITÀ - STRATEGICA**

  - Fasi suggerite: WHAT + WHERE + HOW + AUGMENT + VERIFY(completo)
  - Esempio di applicazione: Bot con FSM, sistema multi-priorità, agente decisionale

\*Nota: WHAT è sempre implicito. WHERE (Virtualizzazione) è utile solo per sistemi con logiche decisionali complesse.

## 🎯 Esempio di Prompt Completo Unificato 2WHAV (JavaScript)

Questo blocco di testo è il prompt finale coeso che unisce tutte le sezioni di cui sopra.

**⚠️ Direttiva Importante per l'LLM:**

**ATTENZIONE:** IL seguente esempio è scritto **esclusivamente come materiale esplicativo e dimostrativo** del framework **2WHAV** e delle sue regole di applicazione. **Non implementare questo codice** a meno che non ti venga esplicitamente richiesto di analizzare o riassumere l'esempio specifico. Focus: valutare la struttura non i dettagli.

```
# 🚀 2WHAV Prompt: Agente Decisionale Logistico v1.0 (JavaScript) 🚀

## I. Nota di Generalizzazione ⚠️
Nota: Il Motore Decisionale FSM è qui usato come esempio astratto. Il codice finale deve essere un oggetto JavaScript.

## 1. WHAT: Introduzione e Indice

### # What First: Scopo e Risultato Atteso
Sei un esperto di sistemi decisionali. Il tuo compito è creare il **Motore Decisionale** per un agente che ottimizza la logistica di magazzino.
L'output **DEVE** essere **SOLO** codice **JavaScript** formattato in un oggetto letterale `const agentLogic = { ... }`.

### # Indice
| Sezione | Logica | Scopo |
| :--- | :--- | :--- |
| **\# Virtualizzazione** | HOW | Modello Comportamentale e Priorità del Flusso. |
| **\# Generazione** | HOW | Regole di sintassi e scaffolding. |
| **\# Interfaccia** | HOW | Documentazione API. |
| **\# Augmentation** | HOW | Direttive strategiche e creative. |
| **\# Verification** | VERIFY | Checklist di conformità finale. |

## 2. HOW: Virtualizzazione (Modello Comportamentale)

### Contratto del Motore Decisionale
Il Motore Decisionale (che può essere FSM, Behaviour Tree o Ruleset) deve valutare le sue logiche in **questo ordine di priorità inviolabile**:
1.  **URGENZA (Max Priority):** Logiche di sicurezza o critiche.
2.  **PIANIFICAZIONE (High Priority):** Sequenze di azioni per completare un compito.
3.  **STANDARD (Normal Priority):** Logiche di attesa o monitoraggio.

## 3. HOW: Generazione (Regole e Scaffolding COMPLETO)

### 3.1. Regole Generali di Generazione del Codice
* **Output Obbligatorio:** L'output è un singolo oggetto letterale `agentLogic`.
* **Sintassi delle Funzioni:** È **OBBLIGATORIO** utilizzare `function(...) { ... }`. **VIETATO UTILIZZARE FUNZIONI LAMBDA (`=>`)**.
* **Accesso Helper:** Accedi alle helper function **SOLO** tramite `agentLogic.nomeHelper()`.

### 3.2. Scaffolding del Codice (CONTRATTO INVIOLABILE)
javascriptconst agentLogic = {  initialState: 'IDLE', // Stato iniziale del Motore Decisionale  memory: { /* Dati persistenti */ },  CONSTANTS: {     MAX_LOAD: 500   },    updateContext: function(api, externalData) {     // DEVE restituire l'oggetto 'context' per la decisione    return {};  },    decideAction: function(api, externalData) {    // DEVE contenere la logica di valutazione della priorità 2.1    const context = agentLogic.updateContext(api, externalData);    // [Logica di esecuzione del Motore Decisionale]  },    _helperCalculateCost: function(path) {    // [Implementazione Helper]    return 0;  }};


4. HOW: Interfaccia (API di Interazione)

### 4.1. API Table

Il codice interagisce SOLO tramite l'oggetto `api`:

| Funzione | Input | Output | Nota Critica |
| --- | --- | --- | --- |
| `api.getLocation()` | void | `object` {x, y} | Posizione corrente. |
| `api.requestPath(target)` | `object` {x, y} | `boolean` | Richiede un percorso; FALLIBILE. |
| `api.loadItem(item_id)` | `string` | `boolean` | Tenta di caricare un oggetto. |

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
```

## 🚦 Esempio Minimalista 2WHAV: Sistema Semaforo Intelligente (XState v5)

**⚠️ Direttiva Importante per l'LLM:**

**ATTENZIONE:** IL seguente esempio è scritto **esclusivamente come materiale esplicativo e dimostrativo** del framework **2WHAV** e delle sue regole di applicazione. **Non implementare questo codice** a meno che non ti venga esplicitamente richiesto di analizzare o riassumere l'esempio specifico. Focus: valutare la struttura non i dettagli.

```
# 🚦 2WHAV Prompt: Sistema Semaforo Intelligente v2.0 (XState)

## 1. WHAT: Introduzione e Indice

### 1.1. What First: Scopo e Risultato Atteso
Sei un programmatore esperto di sistemi a stati finiti. Il tuo compito è creare una **State Machine XState** per un semaforo stradale intelligente che gestisce:
- **Ciclo normale:** Verde (30s) → Giallo (5s) → Rosso (30s) → loop
- **Modalità emergenza:** Lampeggio giallo (override per veicoli di emergenza)
- **Modalità manutenzione:** Tutte le luci spente (override per operazioni di manutenzione)

**Output Richiesto:** Codice JavaScript completo utilizzando `createMachine()` di XState v5.

### 1.2. Indice
| Sezione | Logica | Scopo |
|---------|--------|-------|
| **V: Virtualizzazione** | WHERE | Framework target e architettura stati |
| **G: Generazione** | HOW | Schema XState e regole |
| **I: Interfaccia** | HOW | API di controllo hardware |
| **Verification** | VERIFY | Checklist di conformità |

---

## 2. WHERE: Virtualizzazione (Framework e Architettura)

### 2.1. Framework Target
**XState v5** (https://xstate.js.org/)

Il codice generato deve essere compatibile con XState v5 e utilizzare:
- `createMachine()` per definire la state machine
- `entry` actions per azioni all'ingresso di uno stato
- `after` per transizioni temporizzate
- `always` per transizioni condizionali sempre attive (usate per la priorità)
- `guards` per condizioni di transizione

### 2.2. Architettura Stati


Ciclo Normale:
GREEN (30s) → YELLOW (5s) → RED (30s) → loop

Stati Override (priorità superiore):
EMERGENCY (lampeggio giallo - priorità alta)
MAINTENANCE (luci spente - priorità massima)

### 2.3. Gerarchia di Priorità (INVIOLABILE)

La priorità viene implementata tramite **ordine di valutazione delle transizioni `always`** in XState.

**In ogni stato del ciclo normale (green, yellow, red), le transizioni `always` devono essere in questo ordine:**

| Ordine | Priorità | Target | Guard | Descrizione |
|--------|----------|--------|-------|-------------|
| 1 | **MASSIMA** | `maintenance` | `isMaintenanceMode` | Override assoluto per manutenzione |
| 2 | **ALTA** | `emergency` | `isEmergency` | Override per veicoli emergenza |
| 3 | **NORMALE** | (stato successivo) | timeout `after` | Transizione temporizzata normale |

**REGOLA FONDAMENTALE:** Le transizioni `always` hanno priorità sulle transizioni `after`. L'ordine nell'array `always` determina la priorità di valutazione.

---

## 3. HOW: Generazione (Schema XState e Regole)

### 3.1. Regole di Generazione

> **⚠️ NOTA:** Le regole seguenti derivano dalle convenzioni di XState v5.

* **Struttura Output:** Usa `createMachine()` da XState
* **Stati:** Definiti nell'oggetto `states`, nomi in lowercase (es. `green`, `emergency`)
* **Actions:** Definite nell'oggetto `actions` (secondo parametro di `createMachine`)
* **Guards:** Definite nell'oggetto `guards` (secondo parametro di `createMachine`)
* **Entry Actions:** Ogni stato del ciclo deve avere `entry: 'nomeAction'` per chiamare l'API hardware
* **Transizioni Temporali:** Usa `after: { millisecondi: 'targetState' }`
* **Transizioni Condizionali:** Usa `always: [{ target: '...', guard: '...' }]`

### 3.2. Scaffolding XState

import { createMachine, interpret } from 'xstate';

const trafficLightMachine = createMachine({
  id: 'trafficLight',
  initial: 'green',

  context: {
    // Context (opzionale, può essere usato per stato interno)
  },

  states: {
    green: {
      entry: 'activateGreenLight',

      // Transizioni prioritarie (SEMPRE IN QUESTO ORDINE)
      always: [
        { target: 'maintenance', guard: 'isMaintenanceMode' },
        { target: 'emergency', guard: 'isEmergency' }
      ],

      // Transizione temporizzata normale
      after: {
        30000: 'yellow'  // 30 secondi
      }
    },

    yellow: {
      entry: 'activateYellowLight',

      always: [
        { target: 'maintenance', guard: 'isMaintenanceMode' },
        { target: 'emergency', guard: 'isEmergency' }
      ],

      after: {
        5000: 'red'  // 5 secondi
      }
    },

    red: {
      entry: 'activateRedLight',

      always: [
        { target: 'maintenance', guard: 'isMaintenanceMode' },
        { target: 'emergency', guard: 'isEmergency' }
      ],

      after: {
        30000: 'green'  // 30 secondi
      }
    },

    emergency: {
      entry: 'activateEmergencyBlink',

      always: [
        { target: 'maintenance', guard: 'isMaintenanceMode' },
        // Ritorna a green quando emergenza termina
        { target: 'green', guard: ({ context }) => !context.isEmergency }
      ]
    },

    maintenance: {
      entry: 'deactivateAllLights',

      always: [
        // Ritorna a green quando manutenzione termina
        { target: 'green', guard: ({ context }) => !context.maintenanceMode }
      ]
    }
  }
}, {
  // ===== ACTIONS =====
  actions: {
    activateGreenLight: () => {
      api.setLight('GREEN');
    },

    activateYellowLight: () => {
      api.setLight('YELLOW');
    },

    activateRedLight: () => {
      api.setLight('RED');
    },

    activateEmergencyBlink: () => {
      api.blinkYellow();
    },

    deactivateAllLights: () => {
      api.setLight('OFF');
    }
  },

  // ===== GUARDS =====
  guards: {
    isMaintenanceMode: () => {
      return api.isMaintenanceModeActive();
    },

    isEmergency: () => {
      return api.isEmergencyVehicleDetected();
    }
  }
});

// Creazione dell'interprete (opzionale, per eseguire la macchina)
const service = interpret(trafficLightMachine).start();


---

## 4. HOW: Interfaccia (API di Controllo Hardware)

### 4.1. Tabella API

Il codice interagisce **ESCLUSIVAMENTE** tramite l'oggetto globale `api`. Ogni altra interazione è **VIETATA**.

| Funzione | Input | Output | Descrizione | Nota Critica |
| --- | --- | --- | --- | --- |
| `api.setLight(color)` | `string`: `'GREEN'`, `'YELLOW'`, `'RED'`, `'OFF'` | `void` | Imposta il colore del semaforo fisico | Chiamata **obbligatoria** in ogni entry action |
| `api.blinkYellow()` | `void` | `void` | Attiva modalità lampeggio giallo (gestito dal controller hardware) | Solo per stato `emergency` |
| `api.isEmergencyVehicleDetected()` | `void` | `boolean` | Verifica se sensore rileva veicolo di emergenza | Può cambiare in tempo reale |
| `api.isMaintenanceModeActive()` | `void` | `boolean` | Verifica se manutenzione è attiva | Impostato manualmente da operatore |

### 4.2. Note sull'API

- **Sincronicità:** Tutte le chiamate API sono sincrone
- **Disponibilità:** L'oggetto `api` è globale e sempre disponibile
- **Gestione Errori:** Le API non sollevano eccezioni (sono fail-safe)

---

## 5. VERIFY: Verification (Checklist di Conformità)

### 5.1. Checklist Obbligatoria

L'LLM **DEVE** autocontrollare questi requisiti prima di fornire l'output:

#### Struttura XState

- [ ] Il codice usa `createMachine()` da XState v5?
- [ ] La macchina ha `id: 'trafficLight'` e `initial: 'green'`?
- [ ] Ci sono esattamente 5 stati: `green`, `yellow`, `red`, `emergency`, `maintenance`?

#### Entry Actions

- [ ] Ogni stato ha un `entry` action definito?
- [ ] Gli entry actions sono definiti nell'oggetto `actions` (secondo parametro di `createMachine`)?
- [ ] Ogni entry action chiama la funzione API appropriata (`api.setLight()` o `api.blinkYellow()`)?

#### Gerarchia di Priorità (CRITICO)

- [ ] Lo stato `green` ha un array `always` con 2 transizioni nell'ordine: `maintenance`, `emergency`?
- [ ] Lo stato `yellow` ha un array `always` con 2 transizioni nell'ordine: `maintenance`, `emergency`?
- [ ] Lo stato `red` ha un array `always` con 2 transizioni nell'ordine: `maintenance`, `emergency`?
- [ ] La priorità è implementata tramite **ordine di valutazione** nell'array `always`?

#### Guards

- [ ] Le guards sono definite nell'oggetto `guards` (secondo parametro di `createMachine`)?
- [ ] Esiste una guard `isMaintenanceMode` che chiama `api.isMaintenanceModeActive()`?
- [ ] Esiste una guard `isEmergency` che chiama `api.isEmergencyVehicleDetected()`?

#### Transizioni Temporizzate

- [ ] Lo stato `green` ha `after: { 30000: 'yellow' }`?
- [ ] Lo stato `yellow` ha `after: { 5000: 'red' }`?
- [ ] Lo stato `red` ha `after: { 30000: 'green' }`?

#### Stati Override

- [ ] Lo stato `emergency` ha una transizione `always` verso `green` quando l'emergenza termina?
- [ ] Lo stato `maintenance` ha una transizione `always` verso `green` quando la manutenzione termina?
- [ ] Entrambi gli stati override verificano anche `maintenance` come priorità massima?

---

## 6. OUTPUT ATTESO

L'LLM deve generare il codice JavaScript completo che implementa tutti i requisiti sopra specificati. Il codice deve essere:

- **Immediatamente eseguibile** in un ambiente con XState v5 installato

- **Conforme al 100%** alla checklist 5.1

- **Sintatticamente corretto** secondo le convenzioni XState

- **Completo** (nessun placeholder o commento "TODO")
```

## Esempio di Applicazione Concreta: Bot Tris (V3)

Per dimostrare l'efficacia e la rigorosità del framework **2WHAV**, di seguito è riportato l'esempio di un prompt di alto livello che lo utilizza per un problema specifico e complesso: la creazione di un bot di Tris imbattibile.

In questo caso, il framework non è solo un _template_ astratto, ma un **contratto inviolabile** che disciplina il codice, la strategia (_Augmentation_), e la sua esecuzione (_Virtualizzazione_). L'LLM, ricevendo questo prompt, non può semplicemente generare codice, ma è obbligato a incorporare un preciso modello decisionale a priorità fissa e funzioni di difesa strategica (_findForkMove_).

**RISULTATO ATTESO DALL'LLM:** Un singolo blocco di codice JavaScript completamente funzionante che implementa la logica FSM descritta, garantendo che l'ordine delle transizioni rispecchi perfettamente la gerarchia di difesa (_Blocco Vittoria_ prima di _Vittoria Propria_).

**⚠️ Direttiva Importante per l'LLM:**

**ATTENZIONE:** IL seguente esempio è scritto **esclusivamente come materiale esplicativo e dimostrativo** del framework **2WHAV** e delle sue regole di applicazione. **Non implementare questo codice** a meno che non ti venga esplicitamente richiesto di analizzare o riassumere l'esempio specifico. Focus: valutare la struttura, non i dettagli.

````
PROMPT DEFINITIVO PER BOT TRIS (V3)

Sei un Programmatore Specializzato in Intelligenza Artificiale (AI) di Livello Esperto. Il tuo compito è generare la logica FSM completa per un bot di Tris (Tic-Tac-Toe) in Javascript. Il bot gioca come Giocatore O (PLAYER_O). Devi garantire che il bot NON POSSA ESSERE SCONFITTO dall'avversario tramite forchette o altre trappole strategiche, rispettando il seguente contratto 2WHAVVA

## 1. WHAT: Introduzione e Indice

### 1.1. What First: Scopo e Risultato Finale
SCOPO: Implementare la logica FSM completa per un bot di Tris (Giocatore O) con un livello di strategia ottimale (perfetto giocatore non perdente).
RISULTATO FINALE: Un singolo oggetto letterale Javascript ({ ... }) che aderisce rigorosamente allo scaffolding.

### 1.2. Indice
| Sezione | Logica | Scopo |
| :--- | :--- | :--- |
| **\# Virtualizzazione** | WHERE | Contratto del Motore con Priorità Assoluta. |
| **\# Interfaccia** | HOW | Contratto API e Context. |
| **\# Generazione** | HOW | Contratto del Codice e Struttura. |
| **\# Augmentation** | Direttiva di Contribuzione Strategica e Intelligenza. |
| **\# Verification** | VERIFY | Autocontrollo Obbligatorio e Rigoroso. |

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
````
