function isNotificationSupported() {
  return "Notification" in window;
}

function permissionToBoolean(
  permission: NotificationPermission
): boolean | null {
  switch (permission) {
    case "granted":
      return true;
    case "denied":
      return false;
  }

  return null;
}

export function permission(): boolean | null {
  return permissionToBoolean((Notification as any).permission);
}

export async function requestPermission(): Promise<boolean | null> {
  if (!isNotificationSupported()) {
    return null;
  }

  return permissionToBoolean(await Notification.requestPermission());
}

export function notify(message: string): void {
  if (isNotificationSupported() && permission()) {
    const notification = new Notification(message, { icon: "/icon128.png" });
    setTimeout(() => notification.close(), 6000);
  }
}

export async function onPermissionChange(
  callback: (permission: boolean | null) => void
) {
  (await (navigator as any).permissions.query(
    { name: "notifications" }
  )).onchange = () => callback(permission());
}
