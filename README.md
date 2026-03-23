# Architect (demo)

**Architect** is a customer-demo task and project workspace. The UI follows the **Editorial Architect** design system: tonal surfaces (minimal hard borders), **Manrope** headlines and **Inter** body text, navy primary with a restrained gold/amber accent, and gradient primary actions.

This repository is the **runnable MVP**: Vite + TypeScript + Tailwind, hash-based routing, localStorage-backed tasks, drag-and-drop Kanban, dashboard and team views, and a shared shell.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`). On large screens use the sidebar; on small screens use the **Home / Board / Team** strip.

**Production:**

```bash
npm run build
npm run preview
```

## Behavior

- **Routes:** `#/` (dashboard), `#/board`, `#/team`, `#/task/<id>`
- **Tasks** persist in the browser as `architect-mvp-tasks-v1` (localStorage)
- **+** (floating action) prompts for a title and adds a card on the board
- **Kanban:** drag cards between columns; click a card for detail

## Layout

| Path | Purpose |
|------|---------|
| `src/main.ts` | Bootstrap, global FAB / “New Project” handlers |
| `src/layout.ts` | Shell: sidebar, header, mobile nav |
| `src/router.ts` | Hash routing |
| `src/store.ts` | Task seed data, moves, persistence |
| `src/pages/` | Dashboard, board, task detail, team |
| `tailwind.config.js` | Extended palette aligned with design tokens |

## Design references (optional monorepo)

If you keep a parent folder with Stitch exports and `DESIGN.md`, they typically live beside this app as:

- `../stitch_task/stitch/blueprint_tactical/DESIGN.md` — written system (“The Editorial Architect”)
- `../stitch_task/stitch/*/code.html` — static HTML references for each screen

Those paths are not part of this Git root unless you add them in a wider repository.

## Stack

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Status

**Demonstration prototype only:** no backend, no authentication; some actions are placeholders (for example, “New Project”). For **UI/UX walkthroughs** and stakeholder demos, not production operations.
