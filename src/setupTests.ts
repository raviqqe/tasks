import matchMediaMock = require("match-media-mock");

const matchMedia = matchMediaMock.create();
matchMedia.setConfig({ type: "screen", width: 1200 });
window.matchMedia = matchMedia;
