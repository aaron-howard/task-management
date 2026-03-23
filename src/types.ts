export type ColumnId = "todo" | "progress" | "review" | "done";

export type TaskPriority = "high" | "standard" | "strategic";

export interface Task {
  id: string;
  title: string;
  description: string;
  column: ColumnId;
  priority: TaskPriority;
  label: string;
  labelTone: "secondary" | "tertiary" | "primary";
  due?: string;
  assigneeInitials?: string;
  comments?: number;
  checklistDone?: number;
  checklistTotal?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  workloadPct: number;
  status: "critical" | "optimal" | "low";
  tasks: number;
  highPriority: number;
}

export type Route =
  | { name: "dashboard" }
  | { name: "board" }
  | { name: "task"; id: string }
  | { name: "team" };
