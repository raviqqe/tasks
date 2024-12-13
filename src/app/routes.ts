import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("/projects", "./routes/projects.tsx"),
  ...prefix("tasks", [
    layout("./routes/tasks/layout.tsx", [
      route("/", "./routes/tasks/index.tsx"),
      route("done", "./routes/tasks/done.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
