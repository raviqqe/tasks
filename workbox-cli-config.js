module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{json,png,html,js,css}"],
  swDest: "build/service-worker.js",
  globIgnores: ["../workbox-cli-config.js"]
};
