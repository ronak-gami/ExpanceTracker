import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_WIDTH, MAIN_CONTENT_WIDTH } from "../../utils/Constants";

const NewTrip = () => {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    source: "",
    destination: "",
    fromDate: "",
    toDate: "",
    details: "",
    status: "Pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = {
      ...tripData,
      id: Date.now(),
    };

    const existingTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    const updatedTrips = [...existingTrips, newTrip];
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    navigate("/trips");
  };

  const handleChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className={`w-[${MAIN_CONTENT_WIDTH}] ml-[${SIDEBAR_WIDTH}]`}>
        <div className="flex justify-center items-center min-h-screen p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-sky-600 mb-6">
              Create New Trip
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Source</label>
                    <input
                      type="text"
                      name="source"
                      value={tripData.source}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Enter source location"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={tripData.destination}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Enter destination"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      From Date
                    </label>
                    <input
                      type="date"
                      name="fromDate"
                      value={tripData.fromDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">To Date</label>
                    <input
                      type="date"
                      name="toDate"
                      value={tripData.toDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Details</label>
                  <textarea
                    name="details"
                    value={tripData.details}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="4"
                    placeholder="Enter trip details"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/trips")}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                  >
                    Create Trip
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrip;
