import {
  layout,
  index,
  route,
  type RouteConfig,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  ...prefix("tasks", [
    layout("./routes/tasks/layout.tsx", [
      route("/", "./routes/tasks/index.tsx"),
      route("done", "./routes/tasks/done.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
