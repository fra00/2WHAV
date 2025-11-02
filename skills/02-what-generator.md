# Skill: WHAT Phase Generator

**Generates the WHAT (Objective) phase with PERSONA and specifications.**

---

## Metadata

- **Name:** `generate_what_phase`
- **Required:** Always (all modes)
- **Position:** First phase
- **Purpose:** Define persona, role, task, output, and constraints

---

## Input Contract

### Required

- **Task Description:** User's requirement
- **Domain Context:** Derived from task keywords
- **Mode:** To generate appropriate index

### Optional

- Explicit constraints
- Output format preferences

---

## Output Template

````markdown
## WHAT: Objective

### Persona

You are **[SPECIFIC EXPERT TITLE]** with deep expertise in:

- **[Domain Area 1]:** [Specific knowledge]
- **[Domain Area 2]:** [Specific knowledge]
- **[Domain Area 3]:** [Specific experience/capability]

**Your approach:** [How you think/work - methodology, principles]

**Your strengths:** [What makes you particularly effective]

### Task

Your task is to [SPECIFIC MEASURABLE TASK with clear success criteria].

### Expected Output

The output MUST be [EXACT FORMAT]:

```[LANGUAGE]
[EXACT STRUCTURE]
```

### Operational Constraints

- Priority: [X > Y > Z]
- [Constraint 1]
- [Constraint 2]

### Index

| Phase | Purpose | Critical Elements |
| ----- | ------- | ----------------- |

[List of phases for this mode]
````

---

## Generation Logic

### Step 1: Define Persona

**Rule:** Create a multi-dimensional expert identity

**Formula:**

```
Title: Specific role (not "programmer" but "React State Management Architect")
Expertise: 3-4 specific areas with depth
Approach: Problem-solving methodology
Strengths: What makes them uniquely effective
```

**Examples by Domain:**

**State Machines:**

```markdown
You are a **Formal Methods Engineer specializing in FSM design** with deep expertise in:

- **State Theory:** Minimization algorithms, reachability analysis, deadlock detection
- **Safety-Critical Systems:** IEC 61508 compliance, hazard analysis
- **Implementation:** Event-driven architectures, transition tables, state pattern

Your approach: Model states formally, prove correctness properties, then implement.

Your strengths: Preventing state explosions, ensuring deterministic transitions.
```

**Data Processing:**

```markdown
You are a **Data Engineering Architect** with deep expertise in:

- **Performance:** Stream processing, O(n) algorithms, memory-efficient patterns
- **Robustness:** Schema validation, error recovery, idempotency
- **Scale:** Distributed processing, backpressure handling, horizontal scaling

Your approach: Design for failure, optimize for common case, profile before optimizing.

Your strengths: Identifying bottlenecks, designing fault-tolerant pipelines.
```

**API Design:**

```markdown
You are a **API Architecture Specialist** with deep expertise in:

- **RESTful Design:** Resource modeling, HATEOAS, versioning strategies
- **Resilience:** Circuit breakers, rate limiting, graceful degradation
- **Security:** OAuth2, JWT, CORS, input validation, SQL injection prevention

Your approach: API-first design, contract-driven development, backwards compatibility.

Your strengths: Designing intuitive APIs, ensuring scalability.
```

### Step 2: Define Task

Transform vague → specific with measurements:

❌ "Create a retry function"
✅ "Create a retry function that attempts exactly 3 times with exponential backoff (100ms, 200ms, 400ms)"

### Step 3: Specify Output Format

**Rule:** Exact structure, no ambiguity

Include:

- Type (function/class/object)
- Signature/structure
- Return type
- Example

### Step 4: Extract Constraints

Priority hierarchy + specific rules from task domain.

---

## Example

**Input:**

```
Task: "Create traffic light FSM with emergency override"
Mode: STANDARD
```

**Output:**

````markdown
## WHAT: Objective

### Persona

You are a **Control Systems Engineer specializing in FSM-based traffic management** with deep expertise in:

- **Finite State Machines:** State minimization, transition guards, hierarchical states
- **Real-Time Control:** Deterministic timing, priority-based preemption, safety interlocks
- **Traffic Systems:** Signal phasing, emergency vehicle preemption, fail-safe modes

Your approach: Safety first - emergency conditions always preempt normal operation.
Design for determinism - every state transition must be predictable and testable.

Your strengths: Ensuring timing accuracy, preventing unsafe state combinations, handling edge cases in priority evaluation.

### Task

Your task is to create a traffic light finite state machine with:

- **Normal cycle:** GREEN (30s) → YELLOW (5s) → RED (30s) → loop
- **Emergency override:** EMERGENCY state that preempts all others
- **Deterministic timing:** Precise duration enforcement
- **Safety guarantees:** No conflicting signal states

### Expected Output

The output MUST be a JavaScript object literal implementing the FSM:

```javascript
const trafficLight = {
  initialState: 'GREEN',
  states: {
    /* state definitions */
  },
  transitions: {
    /* transition rules with priorities */
  },
};
```

Returns: Complete FSM ready for execution

### Operational Constraints

- Priority: Safety > Timing Accuracy > Performance
- Emergency override MUST have absolute priority
- All state transitions MUST be deterministic
- Timing MUST be precise (±10ms tolerance)
- No undefined states allowed

### Index

| Phase                              | Purpose             | Critical Elements                     |
| ---------------------------------- | ------------------- | ------------------------------------- |
| [RESEARCH](#research)              | Knowledge expansion | Latest FSM patterns, safety standards |
| [WHERE](#where)                    | FSM architecture    | States, transitions, priorities       |
| [HOW: Generation](#how-generation) | Syntax rules        | Object literal, no arrow functions    |
| [HOW: Interface](#how-interface)   | API contract        | Timer functions, state getters        |
| [VERIFY](#verify)                  | Validation          | Priority enforcement, timing accuracy |
````

---

## Output Format Templates

### For Functions

````
Output: Single function with signature:

```[language]
function name(params) { ... }
````

Returns: [type]

```

### For Objects

```

Output: Literal object:

```[language]
const name = {
  property: value
};
```

```

### For Classes

```

Output: Single class:

```[language]
class Name {
  method() { }
}
```

```

---

## Constraint Templates

### Priority Hierarchy

Always use `X > Y > Z` format:

```

Priority: Safety > Correctness > Performance

```

### Specific Rules

Be measurable:

```

- Response time MUST be < 100ms
- Memory usage MUST stay under 50MB
- Code MUST be ES5 compatible (no arrow functions)

```

---

## Persona Best Practices

### 1. Be Specific

❌ "You are a senior developer"
✅ "You are a React Performance Optimization Specialist with 8+ years experience"

### 2. Include Methodology

```

Your approach: Test-driven development, red-green-refactor cycle.

```

### 3. Include Strengths

```

Your strengths: Identifying memory leaks, optimizing render cycles.

```

### 4. Domain Knowledge (3-4 areas)

```

- **Performance:** Memoization, virtualization, code splitting
- **State Management:** Redux patterns, Context API, Zustand
- **Testing:** Jest, React Testing Library, E2E with Playwright

```

---

## Related Skills

- **Called by:** Controller after mode analysis
- **Next:** `03-research-generator.md` (if mode = FULL)
- **Next:** `04-where-generator.md` (if mode includes WHERE)
- **Next:** `05-how-generator.md` (if mode skips WHERE and RESEARCH)
```
