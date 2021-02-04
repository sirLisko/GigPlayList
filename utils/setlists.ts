export const getAggregatedSetlists = (data) =>
  Object.entries(
    data.setlist
      .filter(({ sets }) => sets !== "")
      .flatMap(({ sets: { set } }) =>
        Array.isArray(set)
          ? set.flatMap(({ song }) =>
              song.map(({ name }) => name.toLowerCase())
            )
          : [set.song && set.song.name]
      )
      .reduce((acc, song) => ({ ...acc, [song]: (acc[song] || 0) + 1 }), {})
  )
    .sort((a, b) => b[1] - a[1])
    .map(([title, count]) => ({ title, count }));
