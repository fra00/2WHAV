# Skill: VERIFY Phase Generator

**Generates VERIFY phase: validation checklist for all requirements.**

---

## Metadata

- **Name:** `generate_verify_phase`
- **Required:** Always (all modes)
- **Position:** Last phase
- **Purpose:** Final quality checklist before code execution

---

## Output Template

```markdown
## VERIFY: Validation Checklist

Before providing output, verify ALL requirements:

### ✅ Structural Compliance (WHAT)

- [ ] Output format matches WHAT exactly?
- [ ] All constraints satisfied?
- [ ] Scaffolding complete (no TODOs)?

### ✅ Architectural Compliance (WHERE) [if applicable]

- [ ] All states implemented?
- [ ] Transitions follow priority hierarchy?
- [ ] Execution cycle matches specification?

### ✅ Syntactic Compliance (HOW)

- [ ] All MANDATORY rules followed?
- [ ] All FORBIDDEN patterns absent?
- [ ] Scaffolding sections populated?

### ✅ Interface Compliance (HOW)

- [ ] Only documented functions used?
- [ ] No undocumented API calls?
- [ ] Error handling for "Can fail" functions?

### ✅ Augmentation Compliance (AUGMENT) [if applicable]

- [ ] Optimization implemented?
- [ ] Resilience mechanisms present?
- [ ] Intelligence/heuristics added?

### ✅ Final Assertion

- [ ] Code is immediately executable?
```

---

## Generation Logic

### Step 1: Include Phase Checks

Only add sections for phases that were generated:

```javascript
const sections = {
  what: true, // Always
  where: mode !== 'MINIMAL',
  how: true, // Always
  augment: mode === 'FULL',
  verify: true, // Always (this phase)
};
```

### Step 2: Add Specific Checks

For each phase, add **testable** criteria:

❌ "Is code quality good?"
✅ "Are all MANDATORY rules followed?"

### Step 3: Add Domain Checks

Include domain-specific validation:

**For FSM:**

```markdown
### ✅ Domain-Specific (FSM)

- [ ] Terminal states have no outgoing transitions?
- [ ] All states are reachable from initial state?
```

**For Async Code:**

```markdown
### ✅ Domain-Specific (Async)

- [ ] All Promises properly awaited?
- [ ] Error handlers for all async calls?
```

---

## Check Categories

### Structural Checks (WHAT)

Verify basic structure:

```markdown
- [ ] Output format matches WHAT specification?
- [ ] Role-appropriate complexity level?
- [ ] All constraints from WHAT satisfied?
```

### Architectural Checks (WHERE)

If WHERE phase included:

```markdown
- [ ] All states from WHERE implemented?
- [ ] Transitions follow specified triggers?
- [ ] Priority hierarchy: [Priority 1] → [Priority 2] → [Priority 3]?
- [ ] Execution cycle matches WHERE?
```

### Syntactic Checks (HOW)

Verify code syntax:

```markdown
- [ ] All MANDATORY syntax rules followed?
- [ ] All FORBIDDEN patterns absent?
- [ ] Naming conventions consistent?
- [ ] Scaffolding sections (A, B, C, D) populated?
```

### Interface Checks (HOW)

Verify API usage:

```markdown
- [ ] Code uses ONLY documented functions?
- [ ] No undocumented API calls?
- [ ] Error handling for functions marked "Can fail"?
- [ ] Context construction populates required fields?
```

### Augmentation Checks (AUGMENT)

If AUGMENT phase included:

```markdown
- [ ] Optimization logic implemented as specified?
- [ ] Resilience mechanisms (retry/fallback/timeout) present?
- [ ] Intelligence/heuristics added as required?
```

---

## Example

**Input:**

```
Mode: STANDARD
Task: Traffic light FSM
Phases: WHAT, WHERE, HOW, VERIFY
```

**Output:**

```markdown
## VERIFY: Validation Checklist

Before providing output, verify ALL requirements:

### ✅ Structural Compliance (WHAT)

- [ ] Output is JavaScript object literal?
- [ ] Has FSM structure with states and transitions?
- [ ] All constraints satisfied: Safety > Functionality > Performance?

### ✅ Architectural Compliance (WHERE)

- [ ] States implemented: GREEN, YELLOW, RED, EMERGENCY?
- [ ] Transitions follow priority: Emergency > Normal cycle?
- [ ] Timing correct: GREEN (30s), YELLOW (5s), RED (30s)?
- [ ] Execution cycle: buildContext → evaluate → execute?

### ✅ Syntactic Compliance (HOW)

- [ ] Only `function() {}` syntax used (no `=>`)?
- [ ] Object literal format: `const trafficLight = {}`?
- [ ] Helper methods prefixed with `_`?
- [ ] All scaffolding sections present?

### ✅ Interface Compliance (HOW)

- [ ] Only documented API functions used?
- [ ] No calls to undocumented functions?
- [ ] Timer functions used correctly?

### ✅ Domain-Specific Validation (FSM)

- [ ] Terminal states have no outgoing transitions?
- [ ] All states reachable from initial state?
- [ ] Emergency override preempts all other transitions?

### ✅ Final Assertion

- [ ] Code can be executed immediately with no modifications?
- [ ] All transitions are deterministic?
- [ ] No placeholders or TODOs remain?
```

---

## Checklist Rules

### Make Checks Testable

Each check must be **objectively verifiable:**

❌ "Is the code good?"
✅ "Does output match WHAT specification exactly?"

### Use Checkbox Format

Always use `- [ ]` for each check:

```markdown
- [ ] Check item 1
- [ ] Check item 2
```

### Be Specific

Reference exact requirements:

```markdown
- [ ] Priority hierarchy respected: Safety > Correctness > Performance?
```

Not vague:

```markdown
- [ ] Priorities correct?
```

### Include Final Assertion

Always end with executability check:

```markdown
### ✅ Final Assertion

- [ ] The code can be executed immediately with no modifications?
```

---

## Domain-Specific Additions

### For FSM

```markdown
- [ ] Terminal states have no outgoing transitions?
- [ ] All states reachable from initial state?
- [ ] No deadlock conditions?
```

### For Async Code

```markdown
- [ ] All Promises properly awaited?
- [ ] Error handlers for all async operations?
- [ ] No unhandled Promise rejections?
```

### For Game AI

```markdown
- [ ] Defense prioritized over offense as specified?
- [ ] All winning conditions checked?
- [ ] Fork detection implemented?
```

---

## Related Skills

- **Called by:** Controller (always, last phase)
- **Previous:** `06-augment-generator.md` (if AUGMENT) or `05-how-generator.md`
- **Completes:** 2WHAV prompt generation
