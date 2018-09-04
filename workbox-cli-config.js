module.exports = {
  globDirectory: "build/",
  globIgnores: ["../workbox-cli-config.js"],
  globPatterns: ["**/*.{json,png,html,js,css}"],
  maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
  swDest: "build/service-worker.js"
};
