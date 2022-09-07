# Should I Listen It

> Set you up for your next Gig.

Check a live example @ [https://shouldilisten.it/the%20strokes](http://shouldilisten.it/the%20strokes)

---

The Website is powered by [Next.JS](https://nextjs.org/) and hosted in [Vercel](https://vercel.com/).

## Getting Started

The app needs Node 16, if you have [NVM](https://github.com/nvm-sh/nvm) installed just run `nvm use` in your terminal.

Install the dependencies:

```bash
npm install
```

Create your `.env` file from `.env.sample`. You will need to grab some API keys (see below for more info).

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### API keys

The following API keys are needed in order to have everything up and running:

- [SetListFM](https://api.setlist.fm/docs/1.0/index.html)

```bash
export SETLISTFMAPIKEY={token}
```

- [Songkick](https://www.songkick.com/api_key_requests/new)

```bash
export SKAPI={token}
```

- [Spotify Auth Token](https://developer.spotify.com)

```bash
export NEXT_PUBLIC_SPOTIFY_CLIENT_ID={clientId} // needs NEXT_PUBLIC as it needs to be accessed to the client
export SPOTIFY_SECRET={clientSecret}
```
