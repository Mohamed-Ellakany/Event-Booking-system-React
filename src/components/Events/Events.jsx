import React, { useEffect, useState } from 'react';
import Cover from '../Cover/Cover';
import image from '../../Assets/photo-1531058020387-3be344556be6.jpeg';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 4;

  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  useEffect(() => {
    fetchBookedEvents();
  }, []);

  const fetchEvents = async (pageNum) => {
    try {
      const res = await axios.get(
        `http://eventifybook-sys.runasp.net/api/events?PageNumber=${pageNum}&PageSize=${pageSize}&FilterByAlreadyExsit=true`,
        config
      );
      setEvents(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast.error("Failed to load events");
    }
  };

  const fetchBookedEvents = async () => {
    try {
      const res = await axios.get(`http://eventifybook-sys.runasp.net/api/Events/booked`, config);
      setBookedEvents(res.data.value || []);
    } catch (err) {
      toast.error("Failed to load booked events");
    }
  };

  const handleBookNow = async (eventId) => {
    try {
      await axios.post(
        `http://eventifybook-sys.runasp.net/api/Events/book?EventId=${eventId}`,
        null,
        config
      );
      toast.success("Successfully booked the event!");
      fetchBookedEvents(); 
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <>
      <Cover />
      <section id="tickets" className="py-5 container">
        <h2 className="mb-5 text-center">Available Events</h2>
        <div className="row justify-content-center">
          {events.length > 0 ? (
            events.map((event) => (
              <div className="col-md-6 mb-4" key={event.id}>
                <div className="card flex-row bg-dark text-white shadow">
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="card-title">{event.eventName}</h5>
                    <p className="card-text text-secondary">
                      {event.location} - ${event.price}
                    </p>
                    <button
                      className="btn btn-custom mt-2"
                      onClick={() => handleBookNow(event.id)}
                      disabled={bookedEvents.includes(event.id)}
                    >
                      <i className="fas fa-calendar-check"></i>{" "}
                      {bookedEvents.includes(event.id)
                        ? "Already Booked"
                        : "Book Now"}
                    </button>
                  </div>
                  <img
                    src={event.imageUrl || image}
                    className="img-fluid"
                    alt={event.eventName}
                    style={{
                      width: "150px",
                      objectFit: "cover",
                      borderTopRightRadius: ".25rem",
                      borderBottomRightRadius: ".25rem",
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No events found.</p>
          )}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-secondary mx-2"
            disabled={page === 1}
            onClick={handlePrev}
          >
            Previous
          </button>
          <span className="mx-2 align-self-center">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary mx-2"
            disabled={page === totalPages}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
