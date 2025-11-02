# Skill: RESEARCH Phase Generator

**Generates RESEARCH phase for knowledge expansion and best practices.**

---

## Metadata

- **Name:** `generate_research_phase`
- **Required:** FULL mode only
- **Position:** After WHAT, before WHERE
- **Purpose:** Expand knowledge, discover latest patterns, identify pitfalls

---

## When to Include

✅ **Include RESEARCH when:**

- Mode = FULL
- Production-ready system needed
- Domain has rapidly evolving best practices
- Critical to avoid known pitfalls

❌ **Skip RESEARCH when:**

- Mode = MINIMAL or STANDARD
- Well-understood, stable domain

---

## Output Template

```markdown
## RESEARCH: Knowledge Expansion

**RESEARCH DIRECTIVE:**
Before designing the solution, research current best practices and proven patterns.

### Research Focus Areas

#### 1. Current Best Practices

**Query:** "Latest [DOMAIN] best practices for [SPECIFIC TASK] in [YEAR]"

**Investigate:**

- Industry-standard approaches and patterns
- Performance benchmarks and metrics
- Security considerations and compliance

#### 2. Common Pitfalls

**Query:** "[DOMAIN] common mistakes and antipatterns for [TASK]"

**Investigate:**

- Frequently encountered errors
- Performance bottlenecks
- Edge cases that cause failures

#### 3. Production Considerations

**Query:** "Production-ready [TASK] implementation considerations"

**Investigate:**

- Scalability and resource management
- Monitoring and observability
- Error handling and resilience

#### 4. Recent Developments

**Query:** "Recent improvements in [DOMAIN] (last 1-2 years)"

**Investigate:**

- New algorithms or techniques
- Library/framework updates
- Performance and security enhancements

### Research Integration

**Use research findings to inform:**

- Architecture decisions (WHERE phase)
- Implementation patterns (HOW phase)
- Optimization strategies (AUGMENT phase)

**Document key findings:**

- Critical patterns discovered
- Must-avoid antipatterns
- Specific techniques to incorporate
```

---

## Generation Logic

### Step 1: Identify Research Domains

Extract from WHAT phase task description:

```javascript
function extractResearchDomains(task) {
  const domain = extractDomain(task); // e.g., "state machines"
  const specificArea = extractArea(task); // e.g., "traffic control"
  const tech = extractTech(task); // e.g., "JavaScript"
  return { domain, specificArea, tech };
}
```

### Step 2: Generate Research Queries

Create specific, searchable queries:

❌ "Research state machines"
✅ "Latest FSM best practices for real-time control systems in JavaScript 2025"

### Step 3: Define Focus Areas

Always include these 4:

1. **Best Practices:** Current industry standards
2. **Pitfalls:** What to avoid
3. **Production:** Scalability, monitoring
4. **Developments:** Recent improvements

---

## Research Query Templates

### For Performance-Critical Systems

```markdown
#### 1. Current Best Practices

**Query:** "High-performance [TASK] implementation benchmarks 2025"

**Investigate:**

- Algorithm complexity (O(n) vs O(n²))
- Memory efficiency and caching
- Profiling and optimization techniques

#### 2. Common Pitfalls

**Query:** "Performance antipatterns in [DOMAIN]"

**Investigate:**

- Memory leaks and prevention
- Blocking operations to avoid
- Resource contention issues
```

### For Security-Critical Systems

```markdown
#### 1. Current Best Practices

**Query:** "Secure [TASK] implementation OWASP 2025"

**Investigate:**

- OWASP Top 10 relevant vulnerabilities
- Input validation and sanitization
- Authentication and authorization patterns

#### 2. Common Pitfalls

**Query:** "Security vulnerabilities in [DOMAIN]"

**Investigate:**

- Injection attacks (SQL, XSS, CSRF)
- Authentication bypass techniques
- Data exposure risks
```

### For Distributed Systems

```markdown
#### 1. Current Best Practices

**Query:** "Distributed [TASK] patterns CAP theorem 2025"

**Investigate:**

- Consensus algorithms (Raft, Paxos)
- Event sourcing and CQRS
- Transaction patterns (Saga, 2PC)

#### 2. Common Pitfalls

**Query:** "Distributed systems antipatterns [TASK]"

**Investigate:**

- Split-brain scenarios
- Network partition handling
- Cascading failures
```

---

## Example

**Input:**

```
Task: "Production-ready rate limiter with sliding window"
Domain: "API/Network"
Mode: FULL
```

**Output:**

```markdown
## RESEARCH: Knowledge Expansion

**RESEARCH DIRECTIVE:**
Before designing the rate limiter, research current best practices.

### Research Focus Areas

#### 1. Current Best Practices

**Query:** "Production rate limiting sliding window vs token bucket 2025"

**Investigate:**

- Sliding window counter vs log trade-offs
- Redis vs in-memory implementations
- Distributed rate limiting patterns
- Performance benchmarks (req/sec)

**Expected findings:**

- Algorithm choice for accuracy vs performance
- Industry-standard implementations (Nginx, Kong)
- Key configuration parameters

#### 2. Common Pitfalls

**Query:** "Rate limiter common mistakes and edge cases"

**Investigate:**

- Race conditions in distributed scenarios
- Clock synchronization issues
- Memory leaks from unbounded storage
- Thundering herd after limit reset

**Expected findings:**

- Prevent double-counting requests
- Handle clock skew properly
- Cleanup expired entries

#### 3. Production Considerations

**Query:** "Production rate limiter monitoring and observability"

**Investigate:**

- Essential metrics (rejection rate, usage, latency)
- Alert thresholds for DoS detection
- Performance under high load (>10k req/sec)

**Expected findings:**

- Monitoring metrics to expose
- Circuit breaker integration
- Load shedding strategies

#### 4. Recent Developments

**Query:** "Rate limiting adaptive algorithms 2024-2025"

**Investigate:**

- Adaptive rate limiting based on system load
- Token bucket variations
- Redis 7+ features for rate limiting

**Expected findings:**

- Adaptive algorithms for dynamic limits
- Modern Redis data structures
- Zero-downtime configuration updates

### Research Integration

**Use research findings to inform:**

- **WHERE:** Choose sliding window log for accuracy, define state management
- **HOW:** Use Redis sorted sets, implement atomic operations, handle clock skew
- **AUGMENT:** Apply memory-efficient techniques, add adaptive algorithms
- **VERIFY:** Test against edge cases, validate performance benchmarks

**Document key findings:**

- Sliding window log: 100% accuracy vs ~99% for counter
- Redis ZREMRANGEBYSCORE for efficient cleanup
- Per-key locks prevent race conditions
- Monitor: req/sec, rejection rate, p99 latency, memory
```

---

## Integration Notes

**Research phase output should be:**

1. **Actionable:** Specific findings that influence design
2. **Relevant:** Directly applicable to the task
3. **Current:** Focus on 2024-2025 practices
4. **Practical:** Industry-proven, not theoretical

---

## Related Skills

- **Called by:** Controller (if mode = FULL)
- **Previous:** `02-what-generator.md`
- **Next:** `04-where-generator.md` (if WHERE included) or `05-how-generator.md`
- **Informs:** All subsequent phases with research-backed decisions
