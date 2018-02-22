import matchMediaMock = require("match-media-mock");

const matchMedia = matchMediaMock.create();
matchMedia.setConfig({ type: "screen", width: 1200 });
window.matchMedia = matchMedia;

class LocalStorageMock {
    // https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests

    private store: { [key: string]: any } = {};

    public clear() {
        this.store = {};
    }

    public getItem(key) {
        return this.store[key] || null;
    }

    public setItem(key, value) {
        this.store[key] = value.toString();
    }

    public removeItem(key) {
        delete this.store[key];
    }
}

(window as any).localStorage = new LocalStorageMock();

(window as any).Notification = class {
    public static permission: NotificationPermission = "granted";

    public static async requestPermission(): Promise<NotificationPermission> {
        return "granted";
    }
};
