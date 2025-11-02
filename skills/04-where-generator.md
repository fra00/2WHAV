# Skill: WHERE Phase Generator

**Generates the WHERE (Virtualization) phase defining control architecture and priorities.**

---

## Metadata

- **Name:** `generate_where_phase`
- **Required:** STANDARD, FULL modes only
- **Position:** After WHAT, before HOW
- **Purpose:** Define decision flow and state management

---

## When to Include

✅ **Include WHERE if task has:**

- States and transitions
- Conditional logic with priorities
- Decision trees
- Event-driven behavior
- Phrases: "when X", "if X then Y", "prioritize"

❌ **Skip WHERE if task is:**

- Pure functional (input → output)
- Linear flow (no branching)
- Single responsibility, no state

---

## Output Template

```markdown
## WHERE: Virtualization

### Control Architecture

The system implements a [FSM | BEHAVIOR TREE | RULESET].

### States and Transitions

| State | Triggers | Transitions To | Priority |
| ----- | -------- | -------------- | -------- |

[List all states]

### Priority Hierarchy (INVIOLABLE)

The system MUST evaluate in this order:

1. **[LEVEL 1]:** [Description] (e.g., EMERGENCY: safety checks)
2. **[LEVEL 2]:** [Description] (e.g., TACTICAL: optimization)
3. **[LEVEL 3]:** [Description] (e.g., STANDARD: normal operation)

### Execution Cycle

1. `buildContext()` → Construct decision context
2. `evaluateTransitions()` → Check in priority order
3. `executeAction()` → Perform state action
4. [Repeat]
```

---

## Architecture Types

### Finite State Machine (FSM)

**Use for:** Systems with clear states and transitions

**Pattern:**

```
States: IDLE, RUNNING, PAUSED, STOPPED
Transitions: start, pause, resume, stop
Priority: Always check emergency conditions first
```

### Behavior Tree

**Use for:** AI with hierarchical decision making

**Pattern:**

```
Root → Sequence/Selector nodes → Action leaves
Priority: Evaluation order = tree traversal order
```

### Ruleset

**Use for:** Business logic with conditions

**Pattern:**

```
Rules evaluated in priority order
First matching rule wins
Fallback rule for unmatched cases
```

---

## Priority Hierarchy Rules

### Format

**Always numbered, always explicit:**

```
1. **EMERGENCY:** (Highest priority)
   - Game termination
   - Safety violations
   - Critical errors

2. **TACTICAL:**
   - Block opponent
   - Optimize path
   - Strategic decisions

3. **STANDARD:** (Lowest priority)
   - Default behavior
   - Idle actions
```

### Critical Rule

> "Transitions at higher priority MUST be evaluated BEFORE lower priority. This order is INVIOLABLE."

---

## Example

**Input:**

```
Task: "Tic-tac-toe AI that never loses"
Architecture: FSM
```

**Output:**

```markdown
## WHERE: Virtualization

### Control Architecture

The system implements a Finite State Machine (FSM) with priority-based transition evaluation.

### States and Transitions

| State     | Purpose        | Transitions To             | Priority    |
| --------- | -------------- | -------------------------- | ----------- |
| IDLE      | Wait for turn  | ANALYZE                    | -           |
| ANALYZE   | Evaluate board | BLOCK / ATTACK / STRATEGIC | By priority |
| BLOCK     | Defensive move | IDLE                       | HIGH        |
| ATTACK    | Winning move   | IDLE                       | MEDIUM      |
| STRATEGIC | Optimal move   | IDLE                       | LOW         |
| GAME_OVER | Terminal state | -                          | -           |

### Priority Hierarchy (INVIOLABLE)

The system MUST evaluate moves in this order:

1. **EMERGENCY:** (Check first)

   - Game ended (win/loss/tie)
   - Opponent has winning move next turn → BLOCK

2. **TACTICAL:** (Check second)

   - We have winning move → ATTACK
   - Create double threat opportunity

3. **STANDARD:** (Check last)
   - Take center
   - Take corner
   - Take side

**CRITICAL:** Defense (block) is evaluated BEFORE offense (attack).

### Execution Cycle

1. `buildContext(board)` → Analyze current position
2. `evaluateTransitions(context)` → Check moves in priority order (1→2→3)
3. `executeMove(position)` → Place piece
4. Transition to IDLE, wait for opponent
```

---

## Data Flow Pattern

Always specify how context flows:

```markdown
### Data Flow

- **Input:** External state (board, sensors, etc.)
- **Context:** `buildContext()` aggregates all needed data
- **Evaluation:** Transitions receive context as input
- **Action:** State handlers use context to execute
```

---

## Common Architectures

### FSM Pattern

```
- Define all states explicitly
- Define transitions with triggers
- Specify priority for competing transitions
- Include terminal states
```

### Event-Driven Pattern

```
- Define events that trigger transitions
- Define handlers for each event
- Specify event priority if multiple fire simultaneously
```

### Polling Pattern

```
- Define evaluation cycle (how often to check)
- Define conditions checked each cycle
- Define priority order for condition evaluation
```

---

## Related Skills

- **Called by:** Controller (if mode includes WHERE)
- **Previous:** `02-what-generator.md` or `03-research-generator.md`
- **Next:** `05-how-generator.md`
