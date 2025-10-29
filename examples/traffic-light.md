# 🚦 2WHAV Prompt: Sistema Semaforo Intelligente v2.0 (XState)

## 1. WHAT: Introduzione e Indice

### 1.1. What First: Scopo e Risultato Atteso

Sei un programmatore esperto di sistemi a stati finiti. Il tuo compito è creare una **State Machine XState** per un semaforo stradale intelligente che gestisce:

- **Ciclo normale:** Verde (30s) → Giallo (5s) → Rosso (30s) → loop
- **Modalità emergenza:** Lampeggio giallo (override per veicoli di emergenza)
- **Modalità manutenzione:** Tutte le luci spente (override per operazioni di manutenzione)

**Output Richiesto:** Codice JavaScript completo utilizzando `createMachine()` di XState v5.

### 1.2. Indice

| Sezione                 | Logica | Scopo                                 |
| ----------------------- | ------ | ------------------------------------- |
| **V: Virtualizzazione** | WHERE  | Framework target e architettura stati |
| **G: Generazione**      | HOW    | Schema XState e regole                |
| **I: Interfaccia**      | HOW    | API di controllo hardware             |
| **Verification**        | VERIFY | Checklist di conformità               |

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

| Ordine | Priorità    | Target             | Guard               | Descrizione                        |
| ------ | ----------- | ------------------ | ------------------- | ---------------------------------- |
| 1      | **MASSIMA** | `maintenance`      | `isMaintenanceMode` | Override assoluto per manutenzione |
| 2      | **ALTA**    | `emergency`        | `isEmergency`       | Override per veicoli emergenza     |
| 3      | **NORMALE** | (stato successivo) | timeout `after`     | Transizione temporizzata normale   |

**REGOLA FONDAMENTALE:** Le transizioni `always` hanno priorità sulle transizioni `after`. L'ordine nell'array `always` determina la priorità di valutazione.

---

## 3. HOW: Generazione (Schema XState e Regole)

### 3.1. Regole di Generazione

> **⚠️ NOTA:** Le regole seguenti derivano dalle convenzioni di XState v5.

- **Struttura Output:** Usa `createMachine()` da XState
- **Stati:** Definiti nell'oggetto `states`, nomi in lowercase (es. `green`, `emergency`)
- **Actions:** Definite nell'oggetto `actions` (secondo parametro di `createMachine`)
- **Guards:** Definite nell'oggetto `guards` (secondo parametro di `createMachine`)
- **Entry Actions:** Ogni stato del ciclo deve avere `entry: 'nomeAction'` per chiamare l'API hardware
- **Transizioni Temporali:** Usa `after: { millisecondi: 'targetState' }`
- **Transizioni Condizionali:** Usa `always: [{ target: '...', guard: '...' }]`

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

| Funzione                           | Input                                             | Output    | Descrizione                                                        | Nota Critica                                   |
| ---------------------------------- | ------------------------------------------------- | --------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| `api.setLight(color)`              | `string`: `'GREEN'`, `'YELLOW'`, `'RED'`, `'OFF'` | `void`    | Imposta il colore del semaforo fisico                              | Chiamata **obbligatoria** in ogni entry action |
| `api.blinkYellow()`                | `void`                                            | `void`    | Attiva modalità lampeggio giallo (gestito dal controller hardware) | Solo per stato `emergency`                     |
| `api.isEmergencyVehicleDetected()` | `void`                                            | `boolean` | Verifica se sensore rileva veicolo di emergenza                    | Può cambiare in tempo reale                    |
| `api.isMaintenanceModeActive()`    | `void`                                            | `boolean` | Verifica se manutenzione è attiva                                  | Impostato manualmente da operatore             |

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
