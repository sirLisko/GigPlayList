import React from "react";

import { Event } from "types";

import styles from "./Events.module.scss";

interface EventsProps {
  events: Event[];
}

const Events = ({ events }: EventsProps) => (
  <div className={styles.container}>
    {events.map(({ date, venueName, location, buyUrl }) => {
      const eventDate = new Date(date);
      return (
        <a
          key={buyUrl}
          className={styles.event}
          href={buyUrl}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.date}>
            <p className={styles.dateMonth}>
              {eventDate.toLocaleDateString("en-gb", { month: "short" })}
            </p>
            <p className={styles.dateDay}>{eventDate.getDate()}</p>
          </div>
          <div className={styles.details}>
            <p>{venueName}</p>
            <p className={styles.venue}>{location}</p>
          </div>
        </a>
      );
    })}
  </div>
);
export default Events;
