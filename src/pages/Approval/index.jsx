import React, { useState, useEffect } from "react";
import { SIDEBAR_WIDTH, MAIN_CONTENT_WIDTH } from "../../utils/Constants";
import { Tab, Tabs } from "@mui/material";

const Approval = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const savedTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    
    // Filter for pending items only
    setExpenses(savedExpenses.filter(exp => exp.status === "Pending"));
    setTrips(savedTrips.filter(trip => trip.status === "Pending"));
  }, []);

  const handleApprove = (type, id) => {
    if (type === 'expense') {
      const allExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
      const updatedExpenses = allExpenses.map(exp => 
        exp.id === id ? { ...exp, status: "Approved" } : exp
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setExpenses(expenses.filter(exp => exp.id !== id));
    } else {
      const allTrips = JSON.parse(localStorage.getItem("trips") || "[]");
      const updatedTrips = allTrips.map(trip => 
        trip.id === id ? { ...trip, status: "Approved" } : trip
      );
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      setTrips(trips.filter(trip => trip.id !== id));
    }
  };

  const handleReject = (type, id) => {
    if (type === 'expense') {
      const allExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
      const updatedExpenses = allExpenses.map(exp => 
        exp.id === id ? { ...exp, status: "Rejected" } : exp
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setExpenses(expenses.filter(exp => exp.id !== id));
    } else {
      const allTrips = JSON.parse(localStorage.getItem("trips") || "[]");
      const updatedTrips = allTrips.map(trip => 
        trip.id === id ? { ...trip, status: "Rejected" } : trip
      );
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      setTrips(trips.filter(trip => trip.id !== id));
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className={`w-[${MAIN_CONTENT_WIDTH}] ml-[${SIDEBAR_WIDTH}]`}>
        <div className="flex justify-center items-center min-h-screen p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
            <h1 className="text-2xl font-bold text-sky-600 mb-6">Approvals</h1>
            
            <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
              <Tab label="Expenses" />
              <Tab label="Trips" />
            </Tabs>

            {activeTab === 0 && (
              <div className="mt-6">
                <div className="grid grid-cols-7 gap-4 text-gray-700 mb-4">
                  <p className="font-bold">DATE</p>
                  <p className="font-bold">DETAILS</p>
                  <p className="font-bold">CATEGORY</p>
                  <p className="font-bold">AMOUNT</p>
                  <p className="font-bold">STATUS</p>
                  <p className="font-bold col-span-2">ACTIONS</p>
                </div>

                {expenses.length === 0 ? (
                  <div className="bg-sky-100 p-4 rounded-lg text-center">
                    <p className="text-gray-600">No pending expenses for approval</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div key={expense.id} className="grid grid-cols-7 gap-4 items-center border-b py-4">
                      <p>{new Date(expense.date).toLocaleDateString()}</p>
                      <p>{expense.details}</p>
                      <p>{expense.category}</p>
                      <p>${expense.amount}</p>
                      <p>{expense.status}</p>
                      <button
                        onClick={() => handleApprove('expense', expense.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject('expense', expense.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 1 && (
              <div className="mt-6">
                <div className="grid grid-cols-7 gap-4 text-gray-700 mb-4">
                  <p className="font-bold">SOURCE</p>
                  <p className="font-bold">DESTINATION</p>
                  <p className="font-bold">FROM</p>
                  <p className="font-bold">TO</p>
                  <p className="font-bold">DETAILS</p>
                  <p className="font-bold col-span-2">ACTIONS</p>
                </div>

                {trips.length === 0 ? (
                  <div className="bg-sky-100 p-4 rounded-lg text-center">
                    <p className="text-gray-600">No pending trips for approval</p>
                  </div>
                ) : (
                  trips.map((trip) => (
                    <div key={trip.id} className="grid grid-cols-7 gap-4 items-center border-b py-4">
                      <p>{trip.source}</p>
                      <p>{trip.destination}</p>
                      <p>{new Date(trip.fromDate).toLocaleDateString()}</p>
                      <p>{new Date(trip.toDate).toLocaleDateString()}</p>
                      <p>{trip.details}</p>
                      <button
                        onClick={() => handleApprove('trip', trip.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject('trip', trip.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approval;
