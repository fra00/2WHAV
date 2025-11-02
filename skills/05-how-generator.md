# Skill: HOW Phase Generator

**Generates HOW phase: syntax rules, API contract, and scaffolding.**

---

## Metadata

- **Name:** `generate_how_phase`
- **Required:** Always (all modes)
- **Position:** After WHERE (if present), before AUGMENT
- **Purpose:** Define exact code structure and interface

---

## Output Template

````markdown
## HOW: Generation (Syntax and Scaffolding)

### Mandatory Rules

> ⚠️ Use: MANDATORY, FORBIDDEN, MUST, MUST NOT

| Rule            | Requirement | ✅ Correct | ❌ Incorrect |
| --------------- | ----------- | ---------- | ------------ |
| Function Syntax | [Rule]      | [Example]  | [Counter]    |
| Output Format   | [Rule]      | [Example]  | [Counter]    |
| [Domain Rule]   | [Rule]      | [Example]  | [Counter]    |

### Forbidden Patterns

- ❌ [Pattern 1]
- ❌ [Pattern 2]

### Scaffolding

```[LANGUAGE]
[EXACT TEMPLATE - copy-pasteable]
```
````

---

## HOW: Interface (API Contract)

### Available Functions

The code interacts EXCLUSIVELY through [object/interface]:

| Function    | Input  | Output | Behavior       | Notes           |
| ----------- | ------ | ------ | -------------- | --------------- |
| [function1] | [type] | [type] | [what it does] | [critical info] |

### API Rules

- ✅ [Availability: sync/async, always available, etc.]
- ❌ NO [forbidden functions/patterns]

````

---

## Part A: Syntax Rules

### Rule Format
**Always provide:**
1. **Category:** What aspect (syntax, format, etc.)
2. **Requirement:** MANDATORY or FORBIDDEN
3. **Correct example:** ✅
4. **Incorrect example:** ❌

### Example Rules

```markdown
| Rule | Requirement | ✅ Correct | ❌ Incorrect |
|------|-------------|-----------|-------------|
| Function Syntax | MANDATORY: `function() {}` | `function foo() {}` | `const foo = () => {}` |
| Variable Naming | MANDATORY: camelCase | `myVariable` | `my_variable` |
| Output Format | MANDATORY: Object literal | `const x = {}` | `class X {}` |
````

### Language-Specific Patterns

**For ES5:**

```
- ❌ Arrow functions (=>)
- ❌ let/const keywords
- ❌ Template literals
```

**For TypeScript:**

```
- ✅ Explicit type annotations
- ✅ Interface definitions
- ✅ Strict null checks
```

---

## Part B: Scaffolding

### Scaffolding Rules

1. **Complete:** No placeholders, no TODOs
2. **Copy-pasteable:** Can be used as-is
3. **Structured:** Clear sections (A, B, C, D)
4. **Commented:** Section purposes marked

### Example Scaffolding

```javascript
const systemName = {
  // ===== SECTION A: CONFIGURATION =====
  initialState: 'INITIAL',
  constants: {
    /* immutable values */
  },

  // ===== SECTION B: CONTEXT BUILDER =====
  buildContext: function (api, data) {
    return {
      // All context fields
    };
  },

  // ===== SECTION C: MAIN LOGIC =====
  mainFunction: function (api, data) {
    const context = systemName.buildContext(api, data);
    // Implementation
  },

  // ===== SECTION D: HELPERS =====
  _helperMethod: function (params) {
    // Helper implementation
    return result;
  },
};
```

---

## Part C: API Contract

### API Documentation Pattern

```markdown
| Function     | Input    | Output       | Behavior     | Notes       |
| ------------ | -------- | ------------ | ------------ | ----------- |
| `api.get()`  | `string` | `Promise<T>` | Fetches data | Can reject  |
| `api.set(v)` | `T`      | `void`       | Saves data   | Synchronous |
```

### Critical Info to Include

- **Type:** Input and output types exactly
- **Behavior:** What it does in one sentence
- **Sync/Async:** Explicitly state
- **Failure modes:** Can fail? How?
- **Side effects:** State changes? I/O?

### API Rules Section

```markdown
### API Contract Rules

- ✅ All functions are synchronous
- ✅ `api` object is globally available
- ❌ NO other functions exist (no fetch, console, etc.)
- ❌ NO direct DOM access
```

---

## Example

**Input:**

```
Task: "CSV parser"
Language: JavaScript
```

**Output:**

````markdown
## HOW: Generation (Syntax and Scaffolding)

### Mandatory Rules

| Rule            | Requirement                 | ✅ Correct               | ❌ Incorrect             |
| --------------- | --------------------------- | ------------------------ | ------------------------ |
| Function Syntax | MANDATORY: `function() {}`  | `function parse() {}`    | `const parse = () => {}` |
| Return Type     | MANDATORY: Array of objects | `[{col1: 'val'}]`        | `"col1,val"`             |
| Error Handling  | MANDATORY: try/catch        | `try { parse } catch(e)` | `parse without handling` |

### Forbidden Patterns

- ❌ Arrow functions (=>)
- ❌ Implicit returns
- ❌ Unhandled errors

### Scaffolding

```javascript
function parseCSV(csvString, options = {}) {
  // Validate input
  if (!csvString || typeof csvString !== 'string') {
    throw new Error('Input must be a non-empty string');
  }

  // Parse logic
  const delimiter = options.delimiter || ',';
  const lines = csvString.split('\n').filter((line) => line.trim());
  const headers = lines[0].split(delimiter);

  // Build result
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter);
    const row = {};
    headers.forEach((header, index) => {
      row[header.trim()] = values[index] ? values[index].trim() : '';
    });
    result.push(row);
  }

  return result;
}
```
````

## HOW: Interface (API Contract)

### Available Functions

The function uses ONLY standard JavaScript:

| Function         | Input      | Output          | Behavior           | Notes    |
| ---------------- | ---------- | --------------- | ------------------ | -------- |
| `String.split()` | `string`   | `Array<string>` | Splits string      | Built-in |
| `Array.filter()` | `function` | `Array`         | Filters array      | Built-in |
| `String.trim()`  | -          | `string`        | Removes whitespace | Built-in |

### API Contract Rules

- ✅ Only standard ES5+ methods allowed
- ❌ NO external libraries
- ❌ NO Node.js specific APIs
- ❌ NO browser-specific APIs

```

---

## Related Skills

- **Called by:** Controller (always)
- **Previous:** `04-where-generator.md` (if WHERE included)
- **Next:** `06-augment-generator.md` (if AUGMENT included) or `07-verify-generator.md`

```
