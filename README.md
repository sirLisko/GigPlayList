# GigPlayList

> **Get ready for your next gig with a personalized playlist.**

Check out a live demo: [https://gigplaylist.sirlisko.com/the%20strokes](http://gigplaylist.sirlisko.com/the%20strokes)

---

## Overview

GigPlayList is a web app that curates playlists for upcoming gigs based on setlists and artist data. Powered by [Next.js](https://nextjs.org/) and hosted on [Vercel](https://vercel.com/), it integrates with external APIs like MusicBrainz, SetListFM, Songkick, and Spotify to create tailored music experiences.

## Getting Started

### Prerequisites

- **Node.js 20+**
  Make sure you have Node.js version 20 or higher installed. You can easily manage your Node versions using [NVM](https://github.com/nvm-sh/nvm).
  Run `nvm use` to switch to the correct version.

- [**pnpm**](https://pnpm.io/)
  is used as the package manager. You can install it globally using:

  ```bash
  npm install -g pnpm
  ```

### Installation

1. Install project dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file by copying the `.env.sample` file:

   ```bash
   cp .env.sample .env
   ```

3. Obtain API keys from the services listed below and add them to your `.env` file.

### Running the Development Server

To start the app in development mode, run:

```bash
pnpm dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## API Keys Setup

The following API keys are required to enable full functionality:

- **[SetListFM API](https://api.setlist.fm/docs/1.0/index.html)**

  ```bash
  export SETLISTFMAPIKEY={your_token}
  ```

- **[Songkick API](https://www.songkick.com/api_key_requests/new)**

  ```bash
  export SKAPI={your_token}
  ```

- **[Spotify API](https://developer.spotify.com)**

  ```bash
  export NEXT_PUBLIC_SPOTIFY_CLIENT_ID={your_client_id} # needs NEXT_PUBLIC as it needs to be accessed to the client
  export SPOTIFY_SECRET={your_client_secret}
  ```
