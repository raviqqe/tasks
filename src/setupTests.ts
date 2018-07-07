import indexedDB = require("fake-indexeddb");
import IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");
import matchMediaMock = require("match-media-mock");

const matchMedia = matchMediaMock.create();
matchMedia.setConfig({ type: "screen", width: 1200 });
window.matchMedia = matchMedia;

(window as any).indexedDB = indexedDB;
(window as any).IDBKeyRange = IDBKeyRange;

(window as any).Notification = class {
  public static permission: NotificationPermission = "granted";

  public static async requestPermission(): Promise<NotificationPermission> {
    return "granted";
  }
};

(window.navigator as any).permissions = {
  query: () => ({})
};
