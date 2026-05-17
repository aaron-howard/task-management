# innerHTML usage (Phase 1D)

This demo app renders views with `innerHTML` and template literals. User-facing
task fields from `localStorage` / prompts are escaped via `escapeHtml()` before
interpolation. Shell layout (`layout.ts`, `main.ts`) uses static markup only;
route names are enum-checked, not pasted into HTML as raw strings.

Do not interpolate unescaped user strings into these templates.
