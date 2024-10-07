import { isSameSong } from "./matchSongs";

describe("isSameSong", () => {
  it("should match same songs", () => {
    expect(isSameSong("freedom", "freedom")).toBeTruthy();
    expect(isSameSong("FREEDOM", "freedom")).toBeTruthy();
    expect(
      isSameSong("freedom (feat. kendrick lamar)", "freedom"),
    ).toBeTruthy();
    expect(
      isSameSong("frEEdom (feat. kendrick lamar)", "freedom"),
    ).toBeTruthy();
    expect(isSameSong("me gustas tú", "me gustas tu")).toBeTruthy();
    expect(
      isSameSong("now and then - remostered", "now and then"),
    ).toBeTruthy();
  });
});
