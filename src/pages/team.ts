import { teamMembers } from "../store";

export function mountTeam(outlet: HTMLElement) {
  outlet.innerHTML = `
<div class="space-y-12 px-4 pb-16 pt-6 md:px-12 md:pt-8">
  <section class="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
    <div class="max-w-2xl">
      <span class="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-tertiary">Resource Management</span>
      <h1 class="font-headline mt-2 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">Team Bandwidth</h1>
      <p class="mt-4 text-lg font-light leading-relaxed text-secondary">Optimization starts with visibility. Monitor leads and contributors to keep delivery calm and predictable.</p>
    </div>
    <div class="flex gap-4">
      <div class="min-w-[120px] rounded-xl bg-surface-container-low p-6 text-center md:min-w-[140px]">
        <p class="mb-1 text-[10px] font-bold uppercase tracking-widest text-secondary">Active Staff</p>
        <p class="font-headline text-3xl font-black text-primary">24</p>
      </div>
      <div class="min-w-[120px] rounded-xl bg-tertiary-fixed p-6 text-center text-on-tertiary-fixed md:min-w-[140px]">
        <p class="mb-1 text-[10px] font-bold uppercase tracking-widest opacity-70">Over Capacity</p>
        <p class="font-headline text-3xl font-black">3</p>
      </div>
    </div>
  </section>

  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 space-y-8 rounded-xl bg-surface-container-low p-8 lg:col-span-8">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 class="font-headline text-xl font-bold">Weekly Forecast</h3>
        <div class="flex rounded-md bg-surface-container-lowest p-1 shadow-ambientSoft outline outline-1 outline-outline-variant/10">
          <button type="button" class="rounded px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">Weekly</button>
          <button type="button" class="rounded px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-outline">Monthly</button>
        </div>
      </div>
      <div class="relative flex h-56 items-end justify-between gap-2 px-2 pt-8 md:gap-4 md:px-4">
        ${["Mon", "Tue", "Wed", "Thu", "Fri"]
          .map((d, i) => {
            const cap = 40 + i * 5;
            const use = 55 + i * 7;
            const col = i === 2 ? "bg-tertiary" : "bg-primary";
            return `
        <div class="flex flex-1 flex-col items-center gap-2">
          <div class="flex h-44 w-full items-end gap-1">
            <div class="w-1/2 rounded-t-sm bg-primary/20" style="height:${cap}%"></div>
            <div class="w-1/2 rounded-t-sm ${col}" style="height:${use}%"></div>
          </div>
          <span class="text-[10px] font-bold uppercase text-outline">${d}</span>
        </div>`;
          })
          .join("")}
      </div>
      <div class="flex flex-wrap items-center gap-6 border-t border-outline-variant/20 pt-4">
        <div class="flex items-center gap-2">
          <div class="h-3 w-3 rounded-sm bg-primary"></div>
          <span class="text-xs font-semibold text-secondary">Assigned Hours</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-3 w-3 rounded-sm bg-primary/20"></div>
          <span class="text-xs font-semibold text-secondary">Capacity</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-3 w-3 rounded-sm bg-tertiary"></div>
          <span class="text-xs font-semibold text-secondary">Warning</span>
        </div>
      </div>
    </div>

    <div class="col-span-12 grid grid-rows-2 gap-6 lg:col-span-4">
      <div class="flex flex-col justify-between rounded-xl bg-primary p-8 text-on-primary">
        <div>
          <span class="material-symbols-outlined mb-4 text-3xl opacity-50">bolt</span>
          <h4 class="font-headline text-xl font-bold">High Performance</h4>
        </div>
        <div class="mt-4">
          <p class="mb-2 text-xs opacity-70">Next available sprint slot</p>
          <p class="text-2xl font-black">This week</p>
        </div>
      </div>
      <div class="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-8 shadow-ambientSoft outline outline-1 outline-outline-variant/10">
        <div class="flex items-start justify-between gap-2">
          <h4 class="font-headline text-xl font-bold text-on-surface">Skill Gap</h4>
          <span class="rounded bg-tertiary-fixed px-2 py-1 text-[9px] font-black uppercase text-on-tertiary-fixed">Watch</span>
        </div>
        <p class="mt-2 text-sm text-secondary">Demo data — align hiring and training plans with upcoming phases.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h3 class="font-headline text-2xl font-bold tracking-tight">Active Workloads</h3>
      <div class="relative w-full sm:w-72">
        <span class="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-outline">search</span>
        <input type="search" placeholder="Filter by name…" class="w-full rounded-md border-0 bg-surface-container-low py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary" />
      </div>
    </div>
    <div class="space-y-4">
      ${teamMembers
        .map((m) => {
          const bar =
            m.status === "critical"
              ? "bg-tertiary w-[95%]"
              : m.status === "low"
                ? "bg-secondary w-[25%]"
                : "bg-primary w-[70%]";
          const label =
            m.status === "critical"
              ? "text-tertiary"
              : m.status === "low"
                ? "text-secondary"
                : "text-primary";
          const statusText =
            m.status === "critical" ? "Critical" : m.status === "low" ? "Under-utilized" : "Optimal";
          return `
      <div class="group flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-6 transition-all hover:bg-surface-bright md:flex-row md:items-center md:justify-between outline outline-1 outline-transparent hover:outline-outline-variant/15">
        <div class="flex items-center gap-4 md:w-1/4">
          <div class="relative flex h-12 w-12 items-center justify-center rounded-full bg-surface-container font-headline text-sm font-bold text-primary ${
            m.status === "critical" ? "ring-2 ring-tertiary/25" : ""
          }">${initials(m.name)}</div>
          <div>
            <h5 class="font-headline font-bold text-on-surface">${escapeHtml(m.name)}</h5>
            <p class="text-xs font-medium text-secondary">${escapeHtml(m.role)}</p>
          </div>
        </div>
        <div class="min-w-0 flex-1 px-0 md:px-8">
          <div class="mb-2 flex justify-between">
            <span class="text-[10px] font-bold uppercase tracking-widest text-secondary">Workload: ${m.workloadPct}%</span>
            <span class="text-[10px] font-bold ${label}">${statusText}</span>
          </div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div class="h-full rounded-full ${bar}"></div>
          </div>
        </div>
        <div class="flex flex-row items-center justify-between gap-4 md:w-auto">
          <div class="text-center md:text-right">
            <p class="text-xs font-bold text-on-surface">${m.tasks} Tasks</p>
            <p class="text-[10px] font-medium text-secondary">${m.highPriority} High priority</p>
          </div>
          <button type="button" class="rounded-md bg-surface-container-low px-4 py-2 text-[10px] font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-on-primary">Assign</button>
        </div>
      </div>`;
        })
        .join("")}
    </div>
  </div>
</div>`;

  return () => {};
}

function initials(name: string): string {
  const p = name.split(" ");
  return (p[0]?.[0] ?? "") + (p[1]?.[0] ?? "");
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
