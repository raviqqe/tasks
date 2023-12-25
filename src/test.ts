import { beforeAll, vi } from "vitest";

beforeAll(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      takeRecords: vi.fn(),
      unobserve: vi.fn(),
    })),
  );
});
