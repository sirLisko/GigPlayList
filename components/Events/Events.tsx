import React from "react";

import { Event } from "types";

import { Calendar } from "lucide-react";

interface EventsProps {
  events: Event[];
}

const Events = ({ events }: EventsProps) => (
  <div>
    {events.map(({ date, venueName, location, buyUrl }) => {
      const eventDate = new Date(date);
      return (
        <a key={buyUrl} href={buyUrl} target="_blank" rel="noreferrer">
          <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Next Gig</h2>
            <div className="flex items-center">
              <Calendar className="mr-2" size={18} />
              <p>
                {eventDate.toLocaleDateString("en-gb", { month: "short" })}{" "}
                {eventDate.getDate()} - {venueName}, {location}
              </p>
            </div>
          </div>
        </a>
      );
    })}
  </div>
);
export default Events;
