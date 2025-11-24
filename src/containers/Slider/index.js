import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc =
    data?.focus?.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    ) || []; // fallback à tableau vide si data.focus undefined

  const nextCard = () => {
    if (byDateDesc.length === 0) return; // protection
    setTimeout(
      () => setIndex(index + 1 < byDateDesc.length ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id ?? `fallback-${idx}`}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, idx) => (
            <input
              key={event.id ?? `radio-${idx}`} // unique et stable → linter content
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
