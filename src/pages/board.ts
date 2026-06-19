import type { ColumnId } from "../types";
import { getTasks, moveTask, subscribe } from "../store";
import { navigate } from "../router";

const COLUMNS: { id: ColumnId; title: string; accent: string }[] = [
  { id: "todo", title: "To Do", accent: "text-outline" },
  { id: "progress", title: "In Progress", accent: "text-primary" },
  { id: "review", title: "Review", accent: "text-outline" },
  { id: "done", title: "Done", accent: "text-outline" },
];

function chipClass(tone: "secondary" | "tertiary" | "primary"): string {
  if (tone === "tertiary") return "bg-tertiary-container/10 text-tertiary-container";
  if (tone === "primary") return "bg-primary-fixed/40 text-primary";
  return "bg-secondary-container text-on-secondary-container";
}

export function mountBoard(outlet: HTMLElement) {
  let dragTaskId: string | null = null;

  function render() {
    const byCol = (c: ColumnId) => getTasks().filter((t) => t.column === c);

    outlet.innerHTML = `
<section class="flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
  <div>
    <nav class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-outline">
      <span>Projects</span>
      <span class="material-symbols-outlined text-[10px]">chevron_right</span>
      <span class="text-primary">Editorial Architecture Board</span>
    </nav>
    <h1 class="font-headline text-3xl font-black tracking-tighter text-on-surface md:text-4xl">Project Workflow</h1>
  </div>
  <div class="flex items-center gap-3">
    <div class="flex -space-x-2">
      <div class="h-10 w-10 rounded-full border-2 border-surface bg-primary-fixed text-center text-xs font-bold leading-10 text-on-primary-fixed ring-2 ring-primary-fixed-dim/20">A</div>
      <div class="h-10 w-10 rounded-full border-2 border-surface bg-secondary-container text-center text-xs font-bold leading-10 text-on-secondary-container ring-2 ring-primary-fixed-dim/20">B</div>
      <div class="h-10 w-10 rounded-full border-2 border-surface bg-tertiary-fixed text-center text-xs font-bold leading-10 text-on-tertiary-fixed ring-2 ring-primary-fixed-dim/20">C</div>
    </div>
    <button type="button" class="rounded-md bg-surface-container-highest p-2 text-on-surface-variant hover:bg-surface-container-high" aria-label="Filter">
      <span class="material-symbols-outlined">filter_list</span>
    </button>
  </div>
</section>
<div class="flex gap-4 overflow-x-auto px-4 pb-24 md:px-8 md:pb-8">
  ${COLUMNS.map(
    (col) => `
  <div class="kanban-column flex max-h-[calc(100vh-12rem)] flex-col rounded-xl bg-surface-container-low p-4" data-column="${col.id}">
    <div class="mb-6 flex items-center justify-between px-1">
      <div class="flex items-center gap-2">
        <span class="text-xs font-black uppercase tracking-[0.2em] ${col.accent}">${col.title}</span>
        <span class="flex h-5 w-5 items-center justify-center rounded-full bg-surface-container-high text-[10px] font-bold text-on-surface">${byCol(col.id).length}</span>
      </div>
    </div>
    <div class="flex flex-col gap-4 overflow-y-auto pr-1" data-drop-zone="${col.id}">
      ${byCol(col.id)
        .map(
          (t) => `
      <article draggable="true" data-task-id="${t.id}" class="task-card-drag cursor-grab rounded-xl bg-surface-container-lowest p-5 active:cursor-grabbing ${col.id === "done" ? "opacity-70 grayscale-[0.35]" : ""} ${t.column === "review" && t.priority === "high" ? "border-l-4 border-tertiary" : ""}">
        <div class="mb-3 flex items-start justify-between">
          <span class="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${chipClass(t.labelTone)}">${escapeHtml(t.label)}</span>
          ${col.id !== "done" ? `<span class="material-symbols-outlined text-sm text-outline-variant">drag_indicator</span>` : `<span class="material-symbols-outlined text-sm text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>`}
        </div>
        <h3 class="mb-4 font-bold leading-snug text-on-surface ${col.id === "done" ? "line-through text-outline" : ""}">${escapeHtml(t.title)}</h3>
        <div class="flex items-center justify-between text-outline">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">calendar_today</span>
            <span class="text-[11px] font-medium">${escapeHtml(t.due ?? "—")}</span>
          </div>
          <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-fixed text-[10px] font-bold text-on-primary-fixed">${escapeHtml(t.assigneeInitials ?? "—")}</div>
        </div>
      </article>`
        )
        .join("")}
      <div class="pointer-events-none rounded-xl border border-dashed border-outline-variant/50 p-4 text-center text-[11px] font-bold uppercase tracking-widest text-outline opacity-70">
        Drop here
      </div>
    </div>
  </div>`
  ).join("")}
</div>`;

    outlet.querySelectorAll("[draggable=true]").forEach((el) => {
      el.addEventListener("dragstart", (e) => {
        dragTaskId = (el as HTMLElement).dataset.taskId ?? null;
        (e as DragEvent).dataTransfer?.setData("text/plain", dragTaskId ?? "");
        (e as DragEvent).dataTransfer!.effectAllowed = "move";
      });
      el.addEventListener("dragend", () => {
        dragTaskId = null;
      });
      el.addEventListener("click", () => {
        const id = (el as HTMLElement).dataset.taskId;
        if (id) navigate({ name: "task", id });
      });
    });

    outlet.querySelectorAll("[data-drop-zone]").forEach((zone) => {
      const z = zone as HTMLElement;
      const col = z.dataset.dropZone;
      if (!col || col.endsWith("-hint")) return;
      z.addEventListener("dragover", (e) => {
        e.preventDefault();
        (e as DragEvent).dataTransfer!.dropEffect = "move";
        z.classList.add("bg-surface-container/50");
      });
      z.addEventListener("dragleave", () => {
        z.classList.remove("bg-surface-container/50");
      });
      z.addEventListener("drop", (e) => {
        e.preventDefault();
        z.classList.remove("bg-surface-container/50");
        const id = dragTaskId || (e as DragEvent).dataTransfer?.getData("text/plain");
        if (id && col) moveTask(id, col as ColumnId);
      });
    });
  }

  render();
  return subscribe(render);
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
