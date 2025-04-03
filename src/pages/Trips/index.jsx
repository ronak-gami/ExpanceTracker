import React, { useState, useEffect } from "react";
import { SIDEBAR_WIDTH, MAIN_CONTENT_WIDTH } from "../../utils/Constants";

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(savedTrips);
  }, []);

  const handleDelete = (tripId) => {
    const updatedTrips = trips.filter((trip) => trip.id !== tripId);
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className={`w-[${MAIN_CONTENT_WIDTH}] ml-[${SIDEBAR_WIDTH}]`}>
        <div className="flex justify-center items-center min-h-screen p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-sky-600">Trips</h1>
              <a
                href="/newtrips"
                className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
              >
                <i className="fas fa-plus"></i> New Trip
              </a>
            </div>

            <div className="grid grid-cols-6 gap-4 text-gray-700">
              <p className="font-bold">SOURCE</p>
              <p className="font-bold">DESTINATION</p>
              <p className="font-bold">FROM DATE</p>
              <p className="font-bold">TO DATE</p>
              <p className="font-bold">DETAILS</p>
              <p className="font-bold">STATUS</p>
            </div>

            {trips.length === 0 ? (
              <div className="bg-sky-100 p-4 rounded-lg mt-4 shadow-md text-center">
                <p className="text-gray-600">No trips found. Add a new trip!</p>
              </div>
            ) : (
              trips.map((trip) => (
                <div
                  key={trip.id}
                  className="grid grid-cols-6 gap-4 items-center border-b py-4"
                >
                  <p>{trip.source}</p>
                  <p>{trip.destination}</p>
                  <p>{new Date(trip.fromDate).toLocaleDateString()}</p>
                  <p>{new Date(trip.toDate).toLocaleDateString()}</p>
                  <p>{trip.details}</p>
                  <button
                    onClick={() => handleDelete(trip.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    <i className="fas fa-trash mr-1"></i> Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trips;
