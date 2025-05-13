import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

let formik;
const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [filterByExist, setFilterByExist] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, [filterByExist, pageNumber]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://eventifybook-sys.runasp.net/api/categories", config);
      setCategories(res.data);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `http://eventifybook-sys.runasp.net/api/Events/?PageNumber=${pageNumber}&PageSize=5&FilterByAlreadyExsit=${filterByExist}`,
        config
      );
      setEvents(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      toast.error("Error fetching events");
      setEvents([]);
    }
  };

  const validationSchema = Yup.object().shape({
    EventName: Yup.string().required("Required"),
    Description: Yup.string().required("Required"),
    CategoryId: Yup.string().required("Required"),
    Date: Yup.date().required("Required"),
    Price: Yup.number().required("Required"),
    Location: Yup.string().required("Required"),
    Image: Yup.mixed().required("Required"),
  });

  const handleCreate = async (values, { resetForm }) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, key === "Date" ? values[key].toISOString() : values[key]);
    }

    try {
      await axios.post("http://eventifybook-sys.runasp.net/api/events", formData, config);
      toast.success("Event created");
      fetchEvents();
      resetForm();
    } catch (error) {
      toast.error("Failed to create event");
    }
  };



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://eventifybook-sys.runasp.net/api/events/${id}`, config);
      toast.success("Event deleted");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };


  return (
    <div className="container py-4">
      <h2> Create Event</h2>

      <Formik
        initialValues={{
          EventName: "",
          Description: "",
          CategoryId: "",
          Date: new Date(),
          Price: "",
          Location: "",
          Image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={ handleCreate}
        innerRef={(el) => (formik = el)}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="mb-3">
              <label>Name</label>
              <Field name="EventName" className="form-control" />
              <ErrorMessage name="EventName" className="text-danger" component="div" />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <Field name="Description" as="textarea" className="form-control" />
              <ErrorMessage name="Description" className="text-danger" component="div" />
            </div>
            <div className="mb-3">
              <label>Category</label>
              <Field name="CategoryId" as="select" className="form-control">
                <option value="">Select</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.categoryName}</option>)}
              </Field>
              <ErrorMessage name="CategoryId" className="text-danger" component="div" />
            </div>
            <div className="mb-3">
              <label>Date</label>
              <DatePicker
                selected={values.Date}
                onChange={val => setFieldValue("Date", val)}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
              />
              <ErrorMessage name="Date" className="text-danger" component="div" />
            </div>
            <div className="mb-3">
              <label>Price</label>
              <Field name="Price" type="number" className="form-control" />
              <ErrorMessage name="Price" className="text-danger" component="div" />
            </div>
            <div className="mb-3">
              <label>Location</label>
              <Field name="Location" className="form-control" />
              <ErrorMessage name="Location" className="text-danger" component="div" />
            </div>
            <div className="mb-3">
              <label>Image</label>
              <input type="file" name="Image" className="form-control" onChange={e => setFieldValue("Image", e.target.files[0])} />
              <ErrorMessage name="Image" className="text-danger" component="div" />
            </div>
            <div className="mb-3 text-end">
              <button type="submit" className="btn btn-custom">
                <i className="fas fa-save "></i>
                { " Add Event"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <button
            className={`btn me-2 ${filterByExist ? "btn-success" : "btn-outline-success"}`}
            onClick={() => {
              setFilterByExist(true);
              setPageNumber(1);
            }}
          >
            Already Exist
          </button>
          <button
            className={`btn ${!filterByExist ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => {
              setFilterByExist(false);
              setPageNumber(1);
            }}
          >
            Not Exist
          </button>
        </div>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h3 className="mt-4">All Events</h3>
      {Array.isArray(events) && events.length > 0 ? (
        <>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Price</th>
                <th>Location</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events
                .filter(ev => ev.eventName.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(ev => (
                  <tr key={ev.id}>
                    <td>{ev.eventName}</td>
                    <td>{new Date(ev.date).toLocaleString()}</td>
                    <td>{ev.price}</td>
                    <td>{ev.location}</td>
                    <td>{ev.categoryName}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ev.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-secondary"
              onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <span>Page {pageNumber} of {totalPages}</span>
            <button
              className="btn btn-secondary"
              onClick={() => setPageNumber(prev => Math.min(prev + 1, totalPages))}
              disabled={pageNumber === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : <p>No events found.</p>}
    </div>
  );
};

export default Admin;
