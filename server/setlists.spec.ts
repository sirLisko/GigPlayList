import { getAggregatedSetlists, Setlists } from "./setlists";

const fakeData: Setlists = {
  setlist: [
    {
      artist: { name: "best_artist" },
      eventDate: "2000-01-01",
      sets: {
        set: [
          {
            song: [
              { name: "fOo" },
              { name: "bar", cover: { name: "coverBand" } },
              { name: "foobar" },
              { name: "" },
            ],
          },
          { "@encore": "1", song: [{ name: "foo" }, { name: "barfoo" }] },
        ],
      },
    },
    { sets: "" },
    { sets: { set: { song: { name: "bar" } } }, eventDate: "1999-09-09" },
    {
      eventDate: "2000-01-01",
      sets: {
        set: [
          {
            song: [
              { name: "foo" },
              { name: "bar", cover: { name: "coverBand" } },
            ],
          },
          {
            "@encore": "1",
            song: [{ name: "BAR" }],
          },
          {
            encore: "2",
            song: [{ name: "bar" }, { name: "foobar" }],
          },
        ],
      },
    },
  ],
};

describe("setlists util", () => {
  describe("getAggregatedSetlists", () => {
    it("should return nomalized and aggregated data", () => {
      expect(getAggregatedSetlists(fakeData)).toStrictEqual({
        encores: { "1": 2, "2": 1 },
        from: "2000-01-01",
        to: "2000-01-01",
        totalSetLists: 3,
        totalTracks: 8,
        tracks: [
          { title: "bar", count: 3, cover: "coverBand" },
          { title: "foo", count: 2, cover: undefined },
          { title: "foobar", count: 2, cover: undefined },
          { title: "barfoo", count: 1, cover: undefined },
        ],
      });
    });
  });
});
