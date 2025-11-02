# Skill: EVOLUTION Phase Generator

**Generates EVOLUTION phase: iterative prompt refinement through LLM-based genetic operations.**

---

## Metadata

- **Name:** `generate_evolution_phase`
- **Required:** FULL mode only
- **Position:** After VERIFY (meta-process)
- **Purpose:** Evolve the complete 2WHAV prompt through iterative improvement

---

## When to Include

✅ **Include EVOLUTION when:**

- Mode = FULL
- Production-ready system requires optimized prompt
- Task complexity benefits from exploration of variations
- Quality improvement over baseline is critical

❌ **Skip EVOLUTION when:**

- Mode = MINIMAL or STANDARD
- Baseline prompt is sufficient
- Time/token budget is constrained

---

## Output Template

```markdown
## EVOLUTION: Iterative Refinement

**EVOLUTION DIRECTIVE:**
The baseline 2WHAV prompt will undergo iterative improvement through LLM-based evolutionary operations.

### Evolution Configuration

- **Population Size:** 5 prompts per generation
- **Generations:** 3-5 iterations
- **Elite Count:** Top 1 always survives
- **Mutation Rate:** 40% of population
- **Crossover Rate:** 40% of population

### Genetic Operations (LLM-Driven)

#### Mutation Strategies

The LLM will be prompted to apply these mutations while preserving 2WHAV structure:

1. **Specificity Enhancement**

   - Prompt: "Make constraints more measurable by adding specific thresholds, formats, or examples"
   - Target: WHAT objectives, HOW rules

2. **Edge Case Addition**

   - Prompt: "Identify one missing edge case and add it to the VERIFY checklist"
   - Target: VERIFY phase

3. **Persona Expansion**

   - Prompt: "Add one relevant expertise area to the persona that strengthens domain knowledge"
   - Target: WHAT persona

4. **Example Augmentation**
   - Prompt: "Add a concrete example demonstrating a critical requirement"
   - Target: HOW scaffolding, VERIFY criteria

#### Crossover Strategy

- **Phase Recombination**: Combine compatible phases from two high-performing prompts
- **Semantic Blending**: Merge similar sections (e.g., two API contracts) into unified version

### Fitness Evaluation (Pairwise Comparison)

Each generation evaluates prompts using LLM-as-a-Judge with pairwise comparison:

**Evaluation Prompt Template:**
```

Given these two 2WHAV prompts for [TASK], which produces better results?

Criteria:

1. Specificity: More measurable requirements (numbers, formats, thresholds)
2. Completeness: Covers more edge cases and scenarios
3. Clarity: Less ambiguous, more prescriptive language
4. Executability: Would produce working code/output more reliably

Compare on each criterion:

- Prompt A is better
- Prompt B is better
- Tie

Winner: [Count votes per criterion]

```

**Tournament Selection:**
- Pick random pairs from population
- Evaluate using criteria above
- Track wins/losses
- Rank by win rate

### Constitutional Validation

Before accepting any mutation or crossover, validate against 2WHAV constitution:

**Validation Prompt:**
```

Does this evolved prompt preserve all essential requirements?

Check:

- [ ] All WHAT objectives maintained
- [ ] WHERE architecture unchanged (if present)
- [ ] HOW mandatory rules preserved
- [ ] HOW forbidden patterns still absent
- [ ] AUGMENT requirements maintained (if present)
- [ ] VERIFY checklist comprehensive

Result: ACCEPT or REJECT (with reason)

```

**CRITICAL:** Only ACCEPT mutations that pass all checks. Rejected mutations are discarded.

### Convergence Criteria

Evolution stops when:

1. **Quality Threshold:** Best prompt wins against baseline on 4/5 criteria
2. **Generation Limit:** Reached maximum generations (3-5)
3. **Stagnation:** No improvement for 2 consecutive generations

### Diversity Maintenance

To prevent premature convergence:

- **Semantic Distance:** Reject mutations too similar to existing population (embedding distance < 0.1)
- **Adaptive Mutation:** If population diversity drops, increase mutation rate by 25%
- **Forced Variation:** Ensure mutations target different phases each generation

### Evolution Execution Flow

```

1. BASELINE: Generate standard 2WHAV prompt (Generation 0)

2. INITIALIZE POPULATION:

   - Keep baseline
   - Generate 4 variations via mutation prompts
   - Validate all against constitution

3. FOR each generation (1 to N):

   a. EVALUATE:

   - Run pairwise tournaments
   - Rank by win rate

   b. CHECK CONVERGENCE:

   - If criteria met → RETURN best prompt

   c. SELECT:

   - Elite: Top 1 survives
   - Parents: Top 2-3 for breeding

   d. BREED:

   - Mutation: Apply to 2 prompts (different strategies)
   - Crossover: Combine 2 parents

   e. VALIDATE:

   - Constitutional check on all offspring
   - Reject violations, regenerate

   f. REPLACE:

   - New population = Elite + Valid offspring

4. RETURN: Highest-ranked prompt after convergence

```

### Output Format

The evolved prompt replaces the baseline, maintaining exact 2WHAV structure but with refined content.

---

## Integration with 2WHAV Phases

### Phase-Specific Evolution Targets

**WHAT Phase Mutations:**
- Add measurable success criteria
- Expand persona expertise areas
- Sharpen operational constraints
- Add concrete output format examples

**WHERE Phase Mutations:**
- Add edge states to FSM
- Clarify transition priorities
- Add execution cycle validation steps

**HOW Phase Mutations:**
- Convert vague rules to specific patterns
- Add correct/incorrect examples to each rule
- Document API edge cases
- Expand scaffolding with helper sections

**AUGMENT Phase Mutations:**
- Add optimization techniques
- Strengthen resilience mechanisms
- Introduce domain-specific heuristics

**VERIFY Phase Mutations:**
- Add domain-specific checks
- Make criteria more testable
- Add integration verification steps

---

## Example Evolution Cycle

**Generation 0 (Baseline):**
```

WHAT: "Create a retry function with exponential backoff"
Priority: Correctness > Performance

```

**Mutation Applied (Specificity Enhancement):**
```

WHAT: "Create a retry function with exponential backoff (100ms, 200ms, 400ms)
for exactly 3 attempts, returning null after final failure"
Priority: Correctness > Performance > Memory Usage

```

**Validation:**
- ✅ Objectives maintained
- ✅ More specific (added exact timings)
- ✅ More measurable (3 attempts, null return)
- **ACCEPT**

**Pairwise Evaluation vs Baseline:**
- Specificity: Mutation > Baseline ✓
- Completeness: Mutation > Baseline ✓
- Clarity: Mutation > Baseline ✓
- Executability: Mutation > Baseline ✓

**Result:** Mutation becomes new elite for Generation 1

---

## Token Efficiency Considerations

### Lightweight Evolution (Default)

- **Generations:** 3
- **Population:** 5
- **Total LLM Calls:** ~45 (15 per generation)
- **Token Cost:** ~5-7k tokens total

### Standard Evolution

- **Generations:** 5
- **Population:** 5
- **Total LLM Calls:** ~75
- **Token Cost:** ~8-12k tokens total

### Optimization Strategies

1. **Batched Evaluation:** Group pairwise comparisons in single prompt
2. **Cached Comparisons:** Reuse evaluation results for identical pairs
3. **Early Stopping:** Halt when clear winner emerges (>80% win rate)
4. **Incremental Evolution:** Evolve one phase at a time (reduce search space)

---

## Safeguards

### Quality Degradation Prevention

- **Baseline Comparison:** Final prompt must beat baseline on 3+/5 criteria
- **Rollback Mechanism:** If all mutations rejected, return to previous generation
- **Never Worse:** Minimum acceptable prompt is always the baseline

### Constraint Preservation

- **Pre-Mutation Check:** Identify inviolable elements before mutation
- **Post-Mutation Validation:** Constitutional check catches violations
- **Automatic Rejection:** Invalid mutations never enter population

### Diversity Collapse Prevention

- **Similarity Threshold:** Embeddings must differ by >0.1
- **Forced Exploration:** Each generation explores different mutation types
- **Parent Selection:** Avoid breeding too-similar individuals

---

## Domain-Specific Evolution Patterns

### For Game AI Tasks

**Priority Mutations:**
- Add tactical evaluation criteria
- Expand state transition edge cases
- Strengthen priority hierarchy clarity

### For API/Network Tasks

**Priority Mutations:**
- Add error handling edge cases
- Document timeout behaviors
- Specify retry strategies explicitly

### For Data Processing Tasks

**Priority Mutations:**
- Add schema validation requirements
- Specify memory bounds
- Document batch size parameters

---

## Related Skills

- **Called by:** Controller (if mode = FULL)
- **Previous:** `07-verify-generator.md`
- **Operates on:** Complete assembled 2WHAV prompt
- **Returns:** Evolved prompt maintaining 2WHAV structure

```
