/**
 * @module fsm-engine
 * @description Un motore generico e riutilizzabile per Macchine a Stati Finiti (FSM).
 * Questo modulo esporta una factory function `createFSM` per creare istanze FSM
 * autocontenute, con gestione interna della memoria e un'architettura a 3 livelli di priorità.
 */

/**
 * Factory function per creare un'istanza di una Macchina a Stati Finiti.
 *
 * @param {object} fsmDefinition - L'oggetto che definisce la logica e la struttura della FSM.
 * @param {string} [fsmDefinition.initialState='IDLE'] - Il nome dello stato iniziale.
 * @param {object} [fsmDefinition.initialMemory={}] - Un oggetto che rappresenta lo stato iniziale della memoria.
 * @param {object} [fsmDefinition.constants={}] - Un oggetto per costanti e configurazioni statiche.
 * @param {Array<object>} [fsmDefinition.emergencyTransitions=[]] - Transizioni con priorità massima.
 * @param {Array<object>} [fsmDefinition.tacticalTransitions=[]] - Transizioni con priorità media.
 * @param {object} fsmDefinition.states - Un oggetto contenente le definizioni di tutti gli stati.
 * @param {Function} [fsmDefinition.buildContext] - Funzione opzionale `(api, memory, events, externalData) => context` per creare un oggetto di contesto ad ogni tick.
 * @returns {object} Un'istanza FSM con un unico metodo pubblico: `run(api)`.
 *
 * @example
 * // 1. Definisci la tua FSM
 * const myFSMDefinition = {
 *   initialState: 'PATROLLING',
 *   initialMemory: { patrolPoints: 0 },
 *   buildContext: function(api, memory, events, externalData) {
 *     // Pre-calcola i dati per questo tick per evitare chiamate multiple
 *     return {
 *       elapsedTime: externalData.elapsedTime || 0,
 *       enemy: api.scan(), // Il risultato di scan() sarà disponibile in context.enemy
 *     };
 *   },
 *   states: {
 *     PATROLLING: {
 *       onExecute: function(api, memory, context) {
 *         if (api.isQueueEmpty()) {
 *           api.moveTo(api.getRandomPoint());
 *           memory.patrolPoints++;
 *         }
 *       },
 *       transitions: [
 *         {
 *           target: 'ATTACKING',
 *           // La condizione ora usa il context che abbiamo costruito
 *           condition: function(api, memory, context, events) {
 *             return !!context.enemy;
 *           },
 *         }
 *       ]
 *     },
 *     ATTACKING: { ... }
 *   }
 * };
 *
 * // 2. Crea un'istanza
 * const myFSM = createFSM(myFSMDefinition);
 *
 * // 3. Nel tuo loop di gioco, esegui la FSM
 * function gameTick() {
 *   const gameApi = { ... }; // L'API specifica del tuo gioco
 *   const externalData = { elapsedTime: Date.now() - startTime };
 *   myFSM.run(gameApi, externalData);
 * }
 */
export function createFSM(fsmDefinition) {
  // Stato interno dell'istanza FSM. Non è accessibile dall'esterno.
  const _internalState = {
    current: fsmDefinition.initialState || "IDLE",
    memory: { ...(fsmDefinition.initialMemory || {}) },
    isInitialized: false,
  };

  /**
   * @private
   * Cambia lo stato corrente della FSM, gestendo i cicli di vita onExit e onEnter.
   * Questo è un metodo interno del motore.
   * @param {string} newState - Il nome del nuovo stato.
   * @param {object} api - L'API del motore di gioco.
   * @param {object} context - Il contesto del tick corrente.
   */
  function _setCurrentState(newState, api, context = {}) {
    const oldState = _internalState.current;

    if (oldState !== newState) {
      const oldStateDefinition = fsmDefinition.states[oldState];
      const newStateDefinition = fsmDefinition.states[newState];

      // Esegue onExit dello stato precedente, se esiste
      if (oldStateDefinition?.onExit) {
        oldStateDefinition.onExit.call(
          fsmDefinition,
          api,
          _internalState.memory,
          context
        );
      }

      // Un'API generica potrebbe avere un metodo per pulire le azioni.
      if (api.stop) {
        api.stop("STATE_TRANSITION");
      }

      if (api.log) {
        api.log(`Stato: ${oldState || "N/A"} -> ${newState}`);
      }

      _internalState.current = newState;

      // Esegue onEnter del nuovo stato, se esiste
      if (newStateDefinition?.onEnter) {
        newStateDefinition.onEnter.call(
          fsmDefinition,
          api,
          _internalState.memory,
          context
        );
      }
    }
  }

  // L'istanza FSM che verrà restituita. Espone solo il metodo `run`.
  const fsmInstance = {
    /**
     * Il ciclo di esecuzione principale della FSM, da chiamare ad ogni tick del gioco.
     * @param {object} api - L'API del bot per interagire con il mondo di gioco.
     * @param {object} [externalData={}] - Un oggetto opzionale per passare dati esterni (es. tempo di gioco).
     */
    run: function (api, externalData = {}) {
      // Inizializzazione al primo avvio
      if (!_internalState.isInitialized) {
        const initialStateDefinition =
          fsmDefinition.states[_internalState.current];
        if (initialStateDefinition?.onEnter) {
          initialStateDefinition.onEnter.call(
            fsmDefinition,
            api,
            _internalState.memory,
            {}
          );
        }
        _internalState.isInitialized = true;
        return;
      }

      const memory = _internalState.memory;
      const events = api.getEvents ? api.getEvents() : [];

      // --- Preparazione del Contesto per il Tick Corrente ---
      // L'utente può fornire una funzione per costruire un contesto specifico del gioco.
      const context = fsmDefinition.buildContext
        ? fsmDefinition.buildContext(api, memory, events, externalData)
        : {};
      context.constants = fsmDefinition.constants || {};
      context.currentStateName = _internalState.current;
      context.currentState = fsmDefinition.states[context.currentStateName];

      // --- Gerarchia delle Decisioni ---
      const callParams = [api, memory, context, events];

      // 1. Transizioni di Emergenza (Priorità Massima)
      if (fsmDefinition.emergencyTransitions) {
        for (const transition of fsmDefinition.emergencyTransitions) {
          if (transition.condition.call(fsmDefinition, ...callParams)) {
            _setCurrentState(transition.target, api, context);
            return; // Fine del tick
          }
        }
      }

      // 2. Transizioni Tattiche (Priorità Media)
      const canBeInterruptedBy = context.currentState?.interruptibleBy;
      if (fsmDefinition.tacticalTransitions) {
        for (const transition of fsmDefinition.tacticalTransitions) {
          const isInterruptible =
            canBeInterruptedBy === undefined ||
            (Array.isArray(canBeInterruptedBy) &&
              canBeInterruptedBy.includes(transition.target));

          if (
            isInterruptible &&
            transition.condition.call(fsmDefinition, ...callParams)
          ) {
            _setCurrentState(transition.target, api, context);
            return; // Fine del tick
          }
        }
      }

      // 3. Transizioni Locali dello Stato (Priorità Bassa)
      if (context.currentState?.transitions) {
        for (const transition of context.currentState.transitions) {
          if (typeof transition.condition !== "function") {
            throw new Error(
              `FSM Error: La transizione verso lo stato "${transition.target}" dallo stato "${context.currentStateName}" non ha una funzione 'condition' valida.`
            );
          }

          if (transition.condition.call(fsmDefinition, ...callParams)) {
            _setCurrentState(transition.target, api, context);
            return; // Fine del tick
          }
        }
      }

      // 4. Esecuzione della Logica dello Stato Corrente
      if (context.currentState?.onExecute) {
        const nextStateName = context.currentState.onExecute.call(
          fsmDefinition, // `this` context
          ...callParams
        );
        // Permette a onExecute di forzare un cambio di stato ritornando un nome di stato
        if (nextStateName && nextStateName !== context.currentStateName) {
          _setCurrentState(nextStateName, api, context);
        }
      }
    },
  };

  return fsmInstance;
}

/**
 * @typedef {object} FSMState
 * @property {function(object, object, object): void} [onEnter] - Funzione eseguita all'ingresso nello stato. Firma: `(api, memory, context)`
 * @property {function(object, object, object, Array): (string|void)} [onExecute] - Funzione eseguita ad ogni tick. Firma: `(api, memory, context, events)`. Può restituire una stringa per forzare una transizione.
 * @property {function(object, object, object): void} [onExit] - Funzione eseguita all'uscita dallo stato. Firma: `(api, memory, context)`
 * @property {Array<FSMTransition>} [transitions] - Array di transizioni locali a questo stato.
 * @property {Array<string>} [interruptibleBy] - Array di nomi di stati che possono interrompere questo stato tramite transizioni tattiche. Se non definito, è sempre interrompibile. Se `[]`, non è mai interrompibile.
 */

/**
 * @typedef {object} FSMTransition
 * @property {string} target - Il nome dello stato di destinazione.
 * @property {function(object, object, object, Array): boolean} condition - Funzione che deve restituire `true` per attivare la transizione. Firma: `(api, memory, context, events)`.
 * @property {string} [description] - Una descrizione opzionale della transizione.
 */
