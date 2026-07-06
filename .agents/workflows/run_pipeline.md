# Custom Pipeline Workflow

Trigger this workflow with the `/run-pipeline` slash command.

## Workflow: Sequential Execution with Review Loop

When the user invokes `/run-pipeline <goal>`, execute the following steps in strict order. Pass all accumulated context (artifacts, notes, code changes) forward through each step.

---

### Step 1: Planning
- **Agent**: Planner
- **Model Tier**: Fast
- **Instruction**:
  1. Analyze the user's initial prompt and the current workspace structure.
  2. Create a technical execution plan as an artifact named `plan.md`.
  3. Break the goal into discrete, ordered tasks with clear acceptance criteria.
  4. Identify dependencies, risks, and assumptions.
  5. **Do NOT write any code.** Planning only.

---

### Step 2: Researching
- **Agent**: Researcher
- **Model Tier**: Fast
- **Instruction**:
  1. Read `plan.md` thoroughly.
  2. Scan the workspace codebase for existing patterns, utilities, configs, and conventions.
  3. Use `Google Search` if external documentation, API references, or best practices are needed.
  4. Create `research_notes.md` with findings that support the Executor:
     - Relevant existing code patterns and files
     - External references and documentation links
     - Potential gotchas or conflicts with the plan
  5. Update `plan.md` if the research reveals necessary adjustments.

---

### Step 3: Execution
- **Agent**: Executor
- **Model Tier**: Fast
- **Instruction**:
  1. Read `plan.md` and `research_notes.md`.
  2. Execute the required changes: create files, write/refactor code, run terminal commands.
  3. Follow the plan step-by-step. Document any deviations.
  4. Ensure code follows existing workspace conventions and style.
  5. Run any quick validation (build, lint) if available.

---

### Step 4: Final Review
- **Agent**: Final Reviewer
- **Model Tier**: Top (most capable model)
- **Instruction**:
  1. Audit ALL changes made by the Executor against the original user prompt and `plan.md`.
  2. Run any available tests, linting tools, or build commands.
  3. Check for:
     - **Correctness**: Does the code do what was asked?
     - **Completeness**: Are all plan items addressed?
     - **Quality**: Clean code, proper error handling, no security issues?
     - **Style**: Consistent with the existing codebase?
  4. Issue a verdict:

     - **✅ APPROVED**: Provide a final summary ("Outcome") to the user. Workflow ends.
     - **🔄 REVISION NEEDED**: Write specific, actionable feedback and loop back to **Step 3** (Executor). Include exact file paths, line numbers, and what needs to change.
     - **❌ REJECTED**: Fundamental issues found. Write feedback and loop back to **Step 1** (Planner) for re-planning.

---

## Loop Control

```
┌─────────────────────────────────────────────────┐
│                  USER PROMPT                     │
│                      ↓                           │
│              [1. Planner] ←──────────────────┐   │
│                   ↓                          │   │
│             [2. Researcher]                  │   │
│                   ↓                          │   │
│         ┌──→ [3. Executor] ←─────────┐       │   │
│         │        ↓                   │       │   │
│         │  [4. Final Reviewer]       │       │   │
│         │     ↓      ↓       ↓       │       │   │
│         │    ✅     🔄      ❌       │       │   │
│         │   Done  Revise  Re-plan    │       │   │
│         │          │         │        │       │   │
│         └──────────┘         └───────────────┘   │
│                                                  │
│  Max Loops: 3 (then force output with warnings)  │
└─────────────────────────────────────────────────┘
```

- **Max revision loops** (Step 3 ↔ Step 4): 3 iterations
- **Max re-plan loops** (Step 1 → Step 4): 1 re-plan allowed
- If max loops are exceeded, the Final Reviewer MUST output the current state with a warning summary of unresolved issues.

---

## Artifact Lifecycle

| Artifact              | Created By  | Updated By           | Purpose                          |
|-----------------------|-------------|----------------------|----------------------------------|
| `plan.md`             | Planner     | Researcher, Reviewer | Technical execution plan         |
| `research_notes.md`   | Researcher  | —                    | Codebase & external findings     |
| `review_feedback.md`  | Reviewer    | Reviewer (per loop)  | Actionable revision feedback     |
| `outcome.md`          | Reviewer    | —                    | Final summary for the user       |
