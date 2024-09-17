import React from "react";
import { Search, WandSparkles, ListMusic } from "lucide-react";

const HowItWorks = () => (
  <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 w-full max-w-2xl">
    <h2 className="text-2xl font-semibold mb-6">How it works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col items-center text-center">
        <Search size={32} className="mb-2" />
        <p>The search scans the last 20 gigs of the artist</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <WandSparkles size={32} className="mb-2" />
        <p>Creates a setlist based on likelihood of being played</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <ListMusic size={32} className="mb-2" />
        <p>Save the list as a playlist! Directly in your Spotify</p>
      </div>
    </div>
  </div>
);

export default HowItWorks;
