import React from "react";
import PropTypes from "prop-types";

const Events = ({ events }) => (
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

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      venueName: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      buyUrl: PropTypes.string.isRequired,
    })
  ),
};

export default Events;
