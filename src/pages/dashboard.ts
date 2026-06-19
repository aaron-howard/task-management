import { getTasks, subscribe, taskCounts } from "../store";
import { navigate } from "../router";

function labelToneClass(tone: "secondary" | "tertiary" | "primary"): string {
  if (tone === "tertiary") return "text-[10px] font-black uppercase tracking-widest text-tertiary";
  if (tone === "primary") return "text-[10px] font-black uppercase tracking-widest text-primary";
  return "text-[10px] font-black uppercase tracking-widest text-secondary";
}

function priorityDot(tone: "secondary" | "tertiary" | "primary"): string {
  if (tone === "tertiary") return "bg-tertiary";
  if (tone === "primary") return "bg-primary";
  return "bg-error";
}

export function mountDashboard(outlet: HTMLElement) {
  function render() {
    const { open, blocked } = taskCounts();
    const tasks = getTasks().filter((t) => t.column !== "done").slice(0, 3);

    outlet.innerHTML = `
<div class="mx-auto max-w-[1400px] p-6 md:p-8">
  <div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
    <div>
      <h1 class="font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">Morning, Director.</h1>
      <p class="mt-2 font-medium text-secondary">You have <span class="font-bold text-primary">${open}</span> active items on the board; <span class="font-bold text-tertiary">${blocked}</span> awaiting review.</p>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed text-xs font-bold text-on-primary-fixed ring-2 ring-surface">SC</div>
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container ring-2 ring-surface">MB</div>
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed text-xs font-bold text-on-tertiary-fixed ring-2 ring-surface">LR</div>
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-xs font-bold text-primary ring-2 ring-surface">+8</div>
      <span class="text-xs font-bold uppercase tracking-widest text-outline">Presence active</span>
    </div>
  </div>

  <div class="bento-grid">
    <div class="col-span-12 flex flex-col justify-between rounded-xl bg-surface-container-low p-6 md:col-span-8">
      <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <span class="font-label mb-2 block text-[11px] font-bold uppercase tracking-[0.05rem] text-primary">Project Evolution</span>
          <h3 class="font-headline text-2xl font-bold">Horizon Redesign</h3>
        </div>
        <span class="self-start rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase text-on-primary-fixed">In Progress</span>
      </div>
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
        <div class="min-w-0 flex-1">
          <div class="mb-2 flex justify-between">
            <span class="text-sm font-semibold text-secondary">Task Completion</span>
            <span class="text-sm font-bold text-on-surface">64%</span>
          </div>
          <div class="h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div class="h-full w-[64%] rounded-full bg-primary"></div>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="text-center">
            <span class="block text-2xl font-black text-on-surface">${open}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-outline">Open</span>
          </div>
          <div class="text-center">
            <span class="block text-2xl font-black text-on-surface">${blocked}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-outline">In review</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 rounded-xl bg-surface-container-lowest p-6 shadow-ambientSoft md:col-span-4 outline outline-1 outline-outline-variant/10">
      <span class="material-symbols-outlined mb-4 text-tertiary" style="font-variation-settings: 'FILL' 1;">bolt</span>
      <h4 class="font-headline mb-1 text-xl font-bold">Efficiency</h4>
      <p class="mb-4 text-sm text-secondary">Throughput is up versus the last sprint cycle — keep focus on review queue.</p>
      <div class="flex h-16 w-full items-end gap-1">
        <div class="h-[40%] flex-1 rounded-sm bg-surface-container-high"></div>
        <div class="h-[60%] flex-1 rounded-sm bg-surface-container-high"></div>
        <div class="h-[50%] flex-1 rounded-sm bg-surface-container-high"></div>
        <div class="h-[85%] flex-1 rounded-sm bg-primary"></div>
        <div class="h-[70%] flex-1 rounded-sm bg-surface-container-high"></div>
      </div>
    </div>

    <div class="col-span-12 rounded-xl bg-surface-container-low p-6 md:col-span-4">
      <div class="mb-6 flex items-center justify-between">
        <h3 class="font-headline text-lg font-bold">Team Activity</h3>
        <button type="button" class="text-xs font-bold uppercase text-primary" data-go-board>View board</button>
      </div>
      <div class="space-y-6">
        <div class="flex gap-4">
          <div class="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">SC</div>
          <div>
            <p class="text-sm font-medium leading-snug"><span class="font-bold">Sarah Chen</span> updated <span class="font-semibold text-primary-container">User Personas</span></p>
            <span class="text-[10px] font-bold uppercase text-outline">2m ago</span>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="relative flex h-10 w-10 items-center justify-center rounded-full bg-tertiary text-xs font-bold text-on-tertiary">MB</div>
          <div>
            <p class="text-sm font-medium leading-snug"><span class="font-bold">Marcus Bell</span> flagged <span class="font-semibold text-tertiary">API Auth</span></p>
            <span class="text-[10px] font-bold uppercase text-outline">14m ago</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambientSoft outline outline-1 outline-outline-variant/10 md:col-span-8">
      <div class="flex items-center justify-between bg-surface-container-low/80 p-6">
        <h3 class="font-headline text-lg font-bold">Upcoming Deadlines</h3>
      </div>
      <div class="p-2">
        <div class="group flex items-center rounded-lg p-4 transition-colors hover:bg-surface-container-low">
          <div class="mr-6 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-surface-container transition-colors group-hover:bg-primary-container group-hover:text-on-primary">
            <span class="text-[10px] font-bold uppercase">Oct</span>
            <span class="text-lg font-black leading-none">24</span>
          </div>
          <div class="min-w-0 flex-1">
            <h5 class="font-semibold text-on-surface">Design System Documentation</h5>
            <p class="text-xs text-secondary">Phase 1 Delivery • 3 Assignees</p>
          </div>
          <span class="hidden shrink-0 rounded-full bg-tertiary-fixed/30 px-3 py-1 text-xs font-bold uppercase text-tertiary sm:inline">High Priority</span>
        </div>
        <div class="group flex items-center rounded-lg p-4 transition-colors hover:bg-surface-container-low">
          <div class="mr-6 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-surface-container transition-colors group-hover:bg-primary-container group-hover:text-on-primary">
            <span class="text-[10px] font-bold uppercase">Oct</span>
            <span class="text-lg font-black leading-none">27</span>
          </div>
          <div class="min-w-0 flex-1">
            <h5 class="font-semibold text-on-surface">Stakeholder Review Call</h5>
            <p class="text-xs text-secondary">Q4 Budget Approval • Studio Team</p>
          </div>
          <span class="hidden shrink-0 rounded-full bg-surface-container px-3 py-1 text-xs font-bold uppercase text-secondary sm:inline">Standard</span>
        </div>
      </div>
    </div>

    <div class="col-span-12 rounded-xl bg-surface-container-low p-6 md:p-8">
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 class="font-headline mb-1 text-2xl font-bold">Active Tasks</h3>
          <p class="text-sm text-secondary">Open the board to move work across columns.</p>
        </div>
        <div class="flex gap-2">
          <button type="button" class="rounded-md bg-surface-container-highest px-4 py-2 text-xs font-bold uppercase text-on-surface-variant transition-colors hover:bg-surface-variant">Filter</button>
          <button type="button" data-go-board class="rounded-md bg-gradient-to-r from-primary to-primary-container px-4 py-2 text-xs font-bold uppercase text-on-primary">Open board</button>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        ${tasks
          .map(
            (t) => `
        <article class="rounded-lg bg-surface-container-lowest p-5 shadow-ambientSoft outline outline-1 outline-outline-variant/5">
          <div class="mb-4 flex items-start justify-between">
            <span class="${labelToneClass(t.labelTone)}">${escapeHtml(t.label)}</span>
            <div class="h-2 w-2 rounded-full ${priorityDot(t.labelTone)}"></div>
          </div>
          <h6 class="mb-2 font-bold text-on-surface">${escapeHtml(t.title)}</h6>
          <p class="mb-6 line-clamp-2 text-xs text-secondary">${escapeHtml(t.description)}</p>
          <div class="flex items-center justify-between">
            <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-fixed text-[10px] font-bold text-on-primary-fixed">${escapeHtml(t.assigneeInitials ?? "—")}</div>
            <button type="button" class="text-[10px] font-bold uppercase text-primary" data-open-task="${t.id}">Open</button>
          </div>
        </article>`
          )
          .join("")}
        <button type="button" id="dash-add-task" class="flex min-h-[180px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-outline-variant/40 bg-surface-container-lowest/50 p-5 transition-colors hover:border-primary hover:bg-surface-container-low">
          <div class="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low transition-all hover:bg-primary-container hover:text-on-primary">
            <span class="material-symbols-outlined">add</span>
          </div>
          <span class="text-xs font-bold uppercase text-outline">Create Task</span>
        </button>
      </div>
    </div>
  </div>
</div>`;

    outlet.querySelectorAll("[data-open-task]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = (el as HTMLElement).dataset.openTask;
        if (id) navigate({ name: "task", id });
      });
    });
    outlet.querySelectorAll("[data-go-board]").forEach((el) => {
      el.addEventListener("click", () => navigate({ name: "board" }));
    });
    const add = outlet.querySelector("#dash-add-task");
    add?.addEventListener("click", () => navigate({ name: "board" }));
  }

  render();
  const unsub = subscribe(render);
  return () => unsub();
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
