import React from "react";

import { Event } from "types";

interface EventsProps {
  events: Event[];
}

const Events = ({ events }: EventsProps) => (
  <div className="result__events">
    {events.map(({ date, venueName, location, buyUrl }) => {
      const eventDate = new Date(date);
      return (
        <a
          key={buyUrl}
          className="event"
          href={buyUrl}
          target="_blank"
          rel="noreferrer"
        >
          <div className="event__date">
            <p className="event__month">
              {eventDate.toLocaleDateString("en-gb", { month: "short" })}
            </p>
            <p className="event__day">{eventDate.getDate()}</p>
          </div>
          <div className="event__details">
            <p className="event__venue">{venueName}</p>
            <p className="event__location">{location}</p>
          </div>
        </a>
      );
    })}
  </div>
);
export default Events;
