# Development Workflow Guide

This guide is for you (the maintainer/contributor) to follow when building new features or fixing bugs.

## 1. Pick a Task (Issue)
- **Idea:** Have an idea for a new component?
- **Action:** Create a GitHub Issue for it.
    - Title: `feat: Add [Component Name]`
    - Description: Briefly describe what it should do.
- **Why:** This tracks *what* you are building and lets others see roadmap items they might want to help with.

## 2. Create a Branch
- **Command:** `git checkout -b feat/my-new-component`
    - Use `feat/` for new features.
    - Use `fix/` for bug fixes.
    - Use `docs/` for documentation changes.
- **Why:** Keeps `main` stable. If you break something in your branch, `main` is still safe for others to use.

## 3. Develop & Manual Test
- **Action:** Write your code!
- **Playground:**
    - We have a shared playground at `src/app/playground/page.tsx`.
    - Import your component there and test it in the "Preview Area".
    - Visit `http://localhost:3000/playground` to see it.
    - *Note: Please keep the playground clean. Revert changes to `src/app/playground/page.tsx` before committing, unless you are improving the playground itself.*
- **Test:**
    - Verify it looks good on different screen sizes (mobile/desktop).
    - check console for errors.

## 4. Commit Often
- **Command:** `git add .` -> `git commit -m "feat: implement basic structure"`
- **Why:** strict save points. If you mess up, you can revert.

## 5. Documentation (Crucial!)
- **Action:** Before you finish, ensure:
    - The component has JSDoc comments (hover tooltips).
    - You've added a usage example in the docs/website.

## 6. Pull Request (PR)
- **Command:** `git push origin feat/my-new-component`
- **Action:** Go to GitHub and click "Compare & pull request".
- **Review:**
    - Read your own code in the "Files changed" tab.
    - Did you leave any `console.log`?
    - Is the code clean?
- **Merge:** If happy, click "Squash and merge".

## 7. Back to Main
- **Command:**
    - `git checkout main`
    - `git pull origin main`
- **Result:** You are ready for the next feature!
