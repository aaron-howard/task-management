import type { ColumnId, Task, TeamMember } from "./types";

const STORAGE_KEY = "architect-mvp-tasks-v1";

function seedTasks(): Task[] {
  return [
    {
      id: "t1",
      title: "Finalize Architectural Draft for Studio A",
      description: "Complete structural notes and circulation diagrams for client review.",
      column: "todo",
      priority: "standard",
      label: "Concept",
      labelTone: "secondary",
      due: "Oct 24",
      assigneeInitials: "EM",
    },
    {
      id: "t2",
      title: "Procurement of high-end slate materials",
      description: "Source vendors and confirm lead times for facade package.",
      column: "todo",
      priority: "high",
      label: "High Priority",
      labelTone: "tertiary",
      due: "Oct 26",
      assigneeInitials: "JD",
    },
    {
      id: "t3",
      title: "3D Rendering for North-East elevation",
      description: "Deliver updated renders with revised curtain wall mullions.",
      column: "progress",
      priority: "strategic",
      label: "Development",
      labelTone: "secondary",
      due: "Oct 28",
      assigneeInitials: "MB",
      comments: 14,
    },
    {
      id: "t4",
      title: "Structural integrity report approval",
      description: "Director sign-off on load paths and dampener schedule.",
      column: "review",
      priority: "high",
      label: "Director Check",
      labelTone: "tertiary",
      due: "Oct 25",
      assigneeInitials: "DR",
    },
    {
      id: "t5",
      title: "Client onboarding - Phase 1",
      description: "Wrapped discovery workshops and success criteria.",
      column: "done",
      priority: "standard",
      label: "Completed",
      labelTone: "secondary",
      due: "Oct 18",
      assigneeInitials: "SC",
    },
  ];
}

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedTasks();
    const parsed = JSON.parse(raw) as Task[];
    if (!Array.isArray(parsed) || parsed.length === 0) return seedTasks();
    return parsed;
  } catch {
    return seedTasks();
  }
}

let tasks: Task[] = loadTasks();

const listeners = new Set<() => void>();

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* ignore quota */
  }
  listeners.forEach((l) => l());
}

export function getTasks(): Task[] {
  return tasks;
}

export function getTask(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function moveTask(taskId: string, column: ColumnId) {
  tasks = tasks.map((t) => (t.id === taskId ? { ...t, column } : t));
  notify();
}

export function addTask(partial: Omit<Task, "id">) {
  const id = `t${Date.now().toString(36)}`;
  tasks = [...tasks, { ...partial, id }];
  notify();
  return id;
}

export function tasksByColumn(column: ColumnId): Task[] {
  return tasks.filter((t) => t.column === column);
}

export function taskCounts() {
  const open = tasks.filter((t) => t.column !== "done").length;
  const blocked = tasks.filter((t) => t.column === "review").length;
  return { open, blocked, total: tasks.length };
}

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Alex Morgan",
    role: "Senior Architect",
    workloadPct: 112,
    status: "critical",
    tasks: 14,
    highPriority: 3,
  },
  {
    id: "m2",
    name: "Sarah Chen",
    role: "Visual Designer",
    workloadPct: 65,
    status: "optimal",
    tasks: 6,
    highPriority: 0,
  },
  {
    id: "m3",
    name: "Julian Kosta",
    role: "Draftsman",
    workloadPct: 20,
    status: "low",
    tasks: 2,
    highPriority: 0,
  },
  {
    id: "m4",
    name: "Maya Roslin",
    role: "BIM Specialist",
    workloadPct: 80,
    status: "optimal",
    tasks: 9,
    highPriority: 1,
  },
];
