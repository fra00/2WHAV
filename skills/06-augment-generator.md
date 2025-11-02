# Skill: AUGMENT Phase Generator

**Generates AUGMENT phase: optimization, resilience, and strategic intelligence.**

---

## Metadata

- **Name:** `generate_augment_phase`
- **Required:** FULL mode only
- **Position:** After HOW, before VERIFY
- **Purpose:** Add advanced logic beyond minimum requirements

---

## When to Include

✅ **Include AUGMENT if:**

- Production-ready system needed
- User requests "optimized" or "robust"
- Performance critical
- Error resilience required
- Strategic intelligence needed

❌ **Skip AUGMENT if:**

- Prototype or proof-of-concept
- Educational example
- Simple utility function

---

## Output Template

```markdown
## AUGMENT: Strategic Intelligence

**CREATIVITY DIRECTIVE:**
The implementation MUST include logic beyond basic requirements.

### Required Augmentations

#### 1. OPTIMIZATION

**Directive:** [Specific optimization for domain]

**Implementation:** [Concrete technique]

#### 2. RESILIENCE

**Directive:** Comprehensive error handling.

MANDATORY mechanisms:

- **Retry Logic:** [Specify strategy]
- **Fallback:** [Specify what happens on failure]
- **Timeout:** [Specify duration and behavior]

#### 3. INTELLIGENCE

**Directive:** Strategic decision-making.

**Implementation:** [Specific heuristic or algorithm]
```

---

## Augmentation Categories

### 1. OPTIMIZATION

**Focus:** Efficiency, speed, memory

**Techniques:**

- **Caching:** Store computed results
- **Lookup Tables:** Pre-compute values
- **Lazy Evaluation:** Compute only when needed
- **Algorithms:** Use O(n log n) instead of O(n²)

**Example:**

```markdown
#### OPTIMIZATION

**Directive:** Implement memoization for expensive calculations.

**Implementation:**

- Cache results in `memory.cache` object
- Use `key = hash(input)` for lookups
- Clear cache when it exceeds 100 entries
```

### 2. RESILIENCE

**Focus:** Error handling, recovery

**Techniques:**

- **Retry Logic:** Exponential backoff
- **Circuit Breaker:** Stop after N failures
- **Fallback:** Alternative when primary fails
- **Timeout:** Prevent hanging

**Example:**

```markdown
#### RESILIENCE

**Directive:** Implement retry with exponential backoff.

MANDATORY mechanisms:

- **Retry Logic:** Max 3 attempts, delays: 100ms, 200ms, 400ms
- **Fallback:** Return cached value if all retries fail
- **Timeout:** Abort request after 5 seconds
```

### 3. INTELLIGENCE

**Focus:** Decision quality, adaptability

**Techniques:**

- **Heuristics:** Rules of thumb for decisions
- **Risk Assessment:** Evaluate danger before acting
- **Opportunity Cost:** Compare alternatives
- **Adaptation:** Learn from history

**Example:**

```markdown
#### INTELLIGENCE

**Directive:** Evaluate opportunity cost before decisions.

**Implementation:**

- Helper method `_calculateCost(option)` returns score
- Compare all options: `scores = options.map(calculateCost)`
- Choose minimum: `best = options[scores.indexOf(min(scores))]`
```

---

## Domain-Specific Patterns

### For Game AI

```markdown
**INTELLIGENCE:** Implement minimax with alpha-beta pruning

- Search depth: 5 levels
- Pruning when score outside [-100, +100]
- Memoize evaluated positions
```

### For Network Code

```markdown
**RESILIENCE:** Implement circuit breaker pattern

- Open after 5 consecutive failures
- Half-open after 30 seconds
- Close after 1 successful call
```

### For Data Processing

```markdown
**OPTIMIZATION:** Implement streaming for large datasets

- Process chunks of 1000 records
- Release memory after each chunk
- Use generators instead of arrays
```

---

## Example

**Input:**

```
Task: "Rate limiter"
Domain: "Network/API"
```

**Output:**

```markdown
## AUGMENT: Strategic Intelligence

**CREATIVITY DIRECTIVE:**
The rate limiter MUST include production-grade features beyond basic counting.

### Required Augmentations

#### 1. OPTIMIZATION

**Directive:** Use sliding window algorithm for accurate rate limiting.

**Implementation:**

- Use circular buffer of size `limit`
- Store timestamp of each request
- O(1) check: compare oldest timestamp with current time
- O(1) cleanup: overwrite oldest entry

#### 2. RESILIENCE

**Directive:** Handle edge cases and concurrent access.

MANDATORY mechanisms:

- **Concurrency:** Use locks/semaphores for thread safety
- **Clock Skew:** Handle system time adjustments
- **Overflow:** Cap stored timestamps at 2× limit
- **Validation:** Reject negative/infinite time values

#### 3. INTELLIGENCE

**Directive:** Adaptive rate adjustment based on load.

**Implementation:**

- Helper method `_calculateBackpressure(queueLength)`
- Reduce limit by 20% if queue > 100
- Restore limit gradually: +5% every 10 seconds
- Log adjustment events for monitoring
```

---

## Writing Augmentations

### Be Specific

❌ "Optimize the algorithm"
✅ "Use hash table for O(1) lookup instead of O(n) array search"

### Be Concrete

❌ "Handle errors gracefully"
✅ "Retry 3 times with exponential backoff (100ms, 200ms, 400ms), then return cached value"

### Be Measurable

❌ "Make it fast"
✅ "Reduce average lookup time from O(n) to O(log n) using binary search"

---

## Related Skills

- **Called by:** Controller (if mode = FULL)
- **Previous:** `05-how-generator.md`
- **Next:** `07-verify-generator.md`
