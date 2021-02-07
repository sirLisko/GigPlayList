import { getAggregatedSetlists, Setlists } from "./setlists";

const fakeData: Setlists = {
  setlist: [
    {
      artist: { name: "best_artist" },
      sets: {
        set: [
          { song: [{ name: "fOo" }, { name: "bar" }, { name: "foobar" }] },
          { "@encore": "1", song: [{ name: "foo" }, { name: "barfoo" }] },
        ],
      },
    },
    { sets: "" },
    { sets: { set: { song: { name: "bar" } } } },
    {
      sets: {
        set: [
          { song: [{ name: "foo" }, { name: "bar" }] },
          { "@encore": "1", song: [{ name: "BAR" }] },
          { "@encore": "2", song: [{ name: "bar" }, { name: "foobar" }] },
        ],
      },
    },
  ],
};

describe("setlists util", () => {
  describe("getAggregatedSetlists", () => {
    it("should return nomalized and aggregated data", () => {
      expect(getAggregatedSetlists(fakeData)).toStrictEqual([
        { title: "bar", count: 5 },
        { title: "foo", count: 3 },
        { title: "foobar", count: 2 },
        { title: "barfoo", count: 1 },
      ]);
    });
  });
});
