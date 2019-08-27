import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import matchMediaMock from "match-media-mock";

configure({ adapter: new Adapter() });

const matchMedia = matchMediaMock.create();
matchMedia.setConfig({ type: "screen", width: 1200 });
window.matchMedia = matchMedia;

(window as any).Notification = class {
  public static permission: NotificationPermission = "granted";

  public static async requestPermission(): Promise<NotificationPermission> {
    return "granted";
  }
};

(window.navigator as any).permissions = {
  query: () => ({})
};
