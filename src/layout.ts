import type { Route } from "./types";

function navClass(active: boolean): string {
  const base =
    "mx-2 flex items-center gap-3 rounded-md px-4 py-2.5 transition-all duration-200 ease-out";
  if (active) {
    return `${base} bg-surface-container text-primary font-bold`;
  }
  return `${base} text-on-surface-variant hover:bg-surface-container/80 font-semibold`;
}

function iconFill(active: boolean): string {
  return active ? ` style="font-variation-settings: 'FILL' 1;"` : "";
}

export function shellHtml(route: Route): string {
  const dash = route.name === "dashboard";
  const board = route.name === "board" || route.name === "task";
  const team = route.name === "team";

  return `
<aside class="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col bg-surface-container-low py-6 lg:flex">
  <div class="mb-8 px-6">
    <div class="flex items-center gap-3">
      <div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-on-primary">
        <span class="material-symbols-outlined text-lg"${iconFill(true)}>architecture</span>
      </div>
      <div>
        <h2 class="font-headline text-lg font-bold leading-none text-on-surface">Studio Design</h2>
        <span class="text-[10px] font-bold uppercase tracking-widest text-secondary">Enterprise Plan</span>
      </div>
    </div>
  </div>
  <nav class="flex-1 space-y-1">
    <div class="mb-2 px-4 py-2">
      <span class="font-label text-[11px] font-bold uppercase tracking-[0.05rem] text-outline">Main Menu</span>
    </div>
    <a href="#/" data-nav class="${navClass(dash)}">
      <span class="material-symbols-outlined text-[20px]"${iconFill(dash)}>dashboard</span>
      <span class="text-sm">Dashboard</span>
    </a>
    <a href="#/board" data-nav class="${navClass(board)}">
      <span class="material-symbols-outlined text-[20px]"${iconFill(board)}>check_circle</span>
      <span class="text-sm">My Tasks</span>
    </a>
    <a href="#/board" data-nav class="${navClass(board)}">
      <span class="material-symbols-outlined text-[20px]"${iconFill(board)}>grid_view</span>
      <span class="text-sm">Projects</span>
    </a>
    <a href="#/team" data-nav class="${navClass(team)}">
      <span class="material-symbols-outlined text-[20px]"${iconFill(team)}>group</span>
      <span class="text-sm">Team</span>
    </a>
    <span class="${navClass(false)} pointer-events-none opacity-50">
      <span class="material-symbols-outlined text-[20px]">insights</span>
      <span class="text-sm">Analytics</span>
    </span>
  </nav>
  <div class="mx-2 mt-auto px-2">
    <button type="button" id="btn-new-project" class="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-primary-container py-2.5 text-sm font-bold text-on-primary shadow-ambientSoft">
      <span class="material-symbols-outlined text-sm">add</span>
      New Project
    </button>
    <div class="space-y-1 rounded-md bg-surface-container/50 py-2">
      <a href="#" class="flex items-center gap-3 px-4 py-2 text-on-surface-variant transition-colors hover:text-primary">
        <span class="material-symbols-outlined text-[20px]">settings</span>
        <span class="text-sm font-semibold">Settings</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-2 text-on-surface-variant transition-colors hover:text-primary">
        <span class="material-symbols-outlined text-[20px]">contact_support</span>
        <span class="text-sm font-semibold">Support</span>
      </a>
    </div>
  </div>
</aside>

<header class="glass-header fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between px-4 lg:left-64 lg:px-8">
  <div class="flex items-center gap-4">
    <span class="font-headline text-xl font-extrabold tracking-tight text-primary lg:hidden">Architect</span>
    <span class="hidden font-headline text-xl font-extrabold tracking-tight text-primary lg:inline">Architect</span>
    <div class="hidden items-center rounded-md bg-surface-container px-3 py-2 md:flex">
      <span class="material-symbols-outlined mr-2 text-sm text-outline">search</span>
      <input type="search" placeholder="Search workspace…" class="w-48 border-0 bg-transparent text-sm placeholder:text-outline focus:ring-0" />
    </div>
  </div>
  <div class="flex items-center gap-2 sm:gap-4">
    <div class="hidden items-center gap-1 sm:flex">
      <button type="button" class="rounded-md p-2 text-outline transition-colors hover:bg-surface-container" aria-label="Notifications">
        <span class="material-symbols-outlined">notifications</span>
      </button>
      <button type="button" class="rounded-md p-2 text-outline transition-colors hover:bg-surface-container" aria-label="Help">
        <span class="material-symbols-outlined">help</span>
      </button>
    </div>
    <button type="button" class="hidden scale-95 rounded-md bg-gradient-to-r from-primary to-primary-container px-4 py-2 text-sm font-bold text-on-primary transition-transform active:scale-90 sm:inline">
      Invite
    </button>
    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-xs font-bold text-on-primary-fixed" title="Demo user">AR</div>
  </div>
</header>

<nav class="fixed left-0 right-0 top-16 z-30 flex items-center justify-around gap-1 border-0 bg-surface-container-low/95 py-2 backdrop-blur-md lg:hidden">
  <a href="#/" class="rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Home</a>
  <a href="#/board" class="rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Board</a>
  <a href="#/team" class="rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Team</a>
</nav>

<main class="min-h-screen pt-16 lg:pl-64">
  <div id="outlet" class="min-h-[calc(100vh-4rem)] pt-12 lg:pt-0"></div>
</main>

<div class="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">
  <button type="button" id="fab-add-task" class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-ambient transition-transform hover:scale-105 active:scale-95" aria-label="Add task">
    <span class="material-symbols-outlined text-2xl">add</span>
  </button>
</div>
`;
}
