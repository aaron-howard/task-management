import type { Route } from "./types";

function parseHash(): Route {
  const h = window.location.hash.replace(/^#/, "") || "/";
  const parts = h.split("/").filter(Boolean);
  if (parts[0] === "board") return { name: "board" };
  if (parts[0] === "team") return { name: "team" };
  if (parts[0] === "task" && parts[1]) return { name: "task", id: parts[1] };
  return { name: "dashboard" };
}

let route: Route = parseHash();
const subs = new Set<() => void>();

export function getRoute(): Route {
  return route;
}

export function navigate(r: Route) {
  if (r.name === "dashboard") window.location.hash = "#/";
  else if (r.name === "board") window.location.hash = "#/board";
  else if (r.name === "team") window.location.hash = "#/team";
  else window.location.hash = `#/task/${r.id}`;
}

export function subscribeRoute(fn: () => void): () => void {
  subs.add(fn);
  return () => subs.delete(fn);
}

function onHash() {
  route = parseHash();
  subs.forEach((s) => s());
}

window.addEventListener("hashchange", onHash);
onHash();
