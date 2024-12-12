import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("projects", "./routes/projects.tsx"),
] satisfies RouteConfig;
