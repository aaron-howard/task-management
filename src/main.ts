import "./style.css";
import { shellHtml } from "./layout";
import { getRoute, subscribeRoute } from "./router";
import { mountDashboard } from "./pages/dashboard";
import { mountBoard } from "./pages/board";
import { mountTaskDetail } from "./pages/taskDetail";
import { mountTeam } from "./pages/team";
import { addTask } from "./store";

const root = document.getElementById("app");
if (!root) throw new Error("#app missing");
const app: HTMLElement = root;

let cleanup: (() => void) | undefined;

function bindGlobal(root: HTMLElement) {
  root.querySelector("#fab-add-task")?.addEventListener("click", () => {
    const title = window.prompt("Task title", "New design checkpoint");
    if (!title?.trim()) return;
    addTask({
      title: title.trim(),
      description:
        "Added from the demo — drag this card across columns on the board.",
      column: "todo",
      priority: "standard",
      label: "New",
      labelTone: "primary",
      due: "TBD",
      assigneeInitials: "ME",
    });
    window.location.hash = "#/board";
  });

  root.querySelector("#btn-new-project")?.addEventListener("click", () => {
    window.alert("Demo: saved project templates are on the roadmap.");
  });
}

function mount() {
  cleanup?.();
  cleanup = undefined;

  const route = getRoute();
  app.innerHTML = shellHtml(route);
  bindGlobal(app);

  const outlet = document.getElementById("outlet");
  if (!outlet) return;

  if (route.name === "dashboard") cleanup = mountDashboard(outlet);
  else if (route.name === "board") cleanup = mountBoard(outlet);
  else if (route.name === "team") cleanup = mountTeam(outlet);
  else cleanup = mountTaskDetail(outlet, route.id);
}

mount();
subscribeRoute(mount);
