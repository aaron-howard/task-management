import { getTask } from "../store";
import { navigate } from "../router";

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function mountTaskDetail(outlet: HTMLElement, id: string) {
  const task = getTask(id);
  if (!task) {
    navigate({ name: "board" });
    return () => {};
  }

  const pri =
    task.priority === "high"
      ? "bg-tertiary-fixed text-on-tertiary-fixed"
      : task.priority === "strategic"
        ? "bg-primary-fixed/50 text-primary"
        : "bg-surface-container-highest text-on-surface-variant";

  const status =
    task.column === "done"
      ? "bg-surface-container text-on-surface-variant"
      : task.column === "progress"
        ? "bg-surface-container-highest text-primary"
        : "bg-secondary-container text-on-secondary-container";

  const statusLabel =
    task.column === "done"
      ? "Done"
      : task.column === "progress"
        ? "In Progress"
        : task.column === "review"
          ? "Review"
          : "To Do";

  outlet.innerHTML = `
<div class="mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-12 md:pt-8">
  <div class="mb-6 flex items-center gap-3">
    <button type="button" id="task-back" class="rounded-md p-2 text-outline transition-colors hover:bg-surface-container" aria-label="Back">
      <span class="material-symbols-outlined">arrow_back</span>
    </button>
    <nav class="flex flex-wrap items-center gap-2 text-sm text-secondary">
      <span>Projects</span>
      <span class="material-symbols-outlined text-xs">chevron_right</span>
      <span>Skyline Tower Redesign</span>
      <span class="material-symbols-outlined text-xs">chevron_right</span>
      <span class="font-semibold text-on-surface">${escapeHtml(task.id.toUpperCase())}</span>
    </nav>
  </div>

  <div class="flex flex-col gap-12 lg:flex-row">
    <div class="min-w-0 flex-1 space-y-10">
      <section>
        <div class="mb-4 flex flex-wrap gap-3">
          <span class="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${pri}">${
            task.priority === "high" ? "High Priority" : task.priority === "strategic" ? "Strategic" : "Standard"
          }</span>
          <span class="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${status}">${statusLabel}</span>
        </div>
        <h1 class="font-headline mb-4 text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">${escapeHtml(task.title)}</h1>
        <div class="flex flex-wrap gap-6 text-sm text-secondary">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">calendar_today</span>
            <span>Due ${escapeHtml(task.due ?? "TBD")}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble_outline</span>
            <span>${task.comments ?? 8} Comments</span>
          </div>
        </div>
      </section>

      <section>
        <p class="text-lg font-normal leading-relaxed text-on-surface/80">${escapeHtml(task.description)}</p>
        <div class="mt-8 space-y-4 rounded-xl bg-surface-container-low p-8">
          <h4 class="font-headline text-lg font-bold text-on-surface">Key Deliverables</h4>
          <ul class="m-0 list-none space-y-3 p-0 text-secondary">
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-xl text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span>Verify cross-team dependencies and owners.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-xl text-outline/40">radio_button_unchecked</span>
              <span>Attach latest drawings to the workspace record.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-xl text-outline/40">radio_button_unchecked</span>
              <span>Schedule review with project director.</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div class="mb-6 flex items-center justify-between">
          <h3 class="font-headline text-xl font-bold">Attached Files</h3>
          <button type="button" class="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
            <span class="material-symbols-outlined text-lg">add</span> Add File
          </button>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="flex items-center gap-4 rounded-xl bg-surface-container-lowest p-4 outline outline-1 outline-outline-variant/10 transition-all hover:shadow-ambientSoft">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-error-container/30 text-error">
              <span class="material-symbols-outlined">picture_as_pdf</span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-bold text-on-surface">blueprint_package.pdf</p>
              <p class="text-[11px] font-bold uppercase tracking-wider text-outline">Demo asset</p>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <h3 class="font-headline text-xl font-bold">Discussion</h3>
        <div class="rounded-xl bg-surface-container-low p-4">
          <textarea rows="3" class="w-full resize-none border-0 bg-transparent text-sm placeholder:text-outline focus:ring-0" placeholder="Write a comment or mention @team…"></textarea>
          <div class="mt-3 flex justify-end border-t border-outline-variant/20 pt-3">
            <button type="button" class="rounded-md bg-primary px-5 py-2 text-xs font-bold text-on-primary">Post Comment</button>
          </div>
        </div>
      </section>
    </div>

    <aside class="w-full shrink-0 space-y-8 lg:w-80">
      <div class="space-y-6 rounded-2xl bg-surface-container p-6">
        <p class="text-[11px] font-bold uppercase tracking-widest text-secondary">Task Details</p>
        <div class="flex items-center justify-between gap-2">
          <span class="text-sm text-secondary">Assignee</span>
          <div class="flex items-center gap-2 rounded-full bg-surface-container-lowest px-2 py-1">
            <div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary-fixed text-[9px] font-bold text-on-primary-fixed">${escapeHtml(task.assigneeInitials ?? "?")}</div>
            <span class="text-xs font-bold text-on-surface">Team Member</span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-secondary">Column</span>
          <span class="text-xs font-bold uppercase tracking-wider text-on-surface">${statusLabel}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-secondary">Due</span>
          <span class="text-xs font-bold text-on-surface">${escapeHtml(task.due ?? "TBD")}</span>
        </div>
      </div>

      <div class="space-y-4 rounded-2xl bg-surface-container-low p-6">
        <p class="text-[11px] font-bold uppercase tracking-widest text-secondary">Manage Task</p>
        <button type="button" class="flex w-full items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 text-sm font-bold text-on-surface-variant transition-colors hover:bg-primary hover:text-on-primary">
          <span class="material-symbols-outlined text-lg">share</span> Share Task
        </button>
        <button type="button" id="task-goto-board" class="flex w-full items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 text-sm font-bold text-on-surface-variant transition-colors hover:bg-primary hover:text-on-primary">
          <span class="material-symbols-outlined text-lg">grid_view</span> View on Board
        </button>
      </div>

      <div class="rounded-2xl bg-gradient-to-br from-primary to-primary-container p-6 text-on-primary shadow-ambient">
        <p class="mb-4 text-[11px] font-bold uppercase tracking-widest text-white/70">Milestone Progress</p>
        <div class="mb-2 flex items-end gap-2">
          <span class="font-headline text-4xl font-black tracking-tighter">68%</span>
          <span class="mb-1 text-sm font-bold opacity-70">Completed</span>
        </div>
        <div class="h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div class="h-full w-[68%] rounded-full bg-white"></div>
        </div>
        <p class="mt-4 text-[10px] font-bold uppercase leading-relaxed tracking-wider text-white/60">Demo milestone — drag this card on the board to update status.</p>
      </div>
    </aside>
  </div>
</div>`;

  outlet.querySelector("#task-back")?.addEventListener("click", () => {
    navigate({ name: "board" });
  });
  outlet.querySelector("#task-goto-board")?.addEventListener("click", () => {
    navigate({ name: "board" });
  });

  return () => {};
}
