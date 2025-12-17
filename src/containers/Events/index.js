import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const totalFilteredEvents = (data?.events ?? []).filter(
    (event) => !type || event.type === type
  );

  const pageNumber = Math.ceil(totalFilteredEvents.length / PER_PAGE);

  const filteredEvents = totalFilteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>

          {/* Pagination */}
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => {
              const page = n + 1;
              const isActive = page === currentPage;

              return (
                <a
                  key={page}
                  href="#events"
                  onClick={() => !isActive && setCurrentPage(page)}
                  className={`Pagination__link ${
                    isActive ? "Pagination__link--active" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {page}
                </a>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
