import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_WIDTH, MAIN_CONTENT_WIDTH } from "../../utils/Constants";

const NewExpense = () => {
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState({
    details: "",
    category: "",
    amount: "",
    status: "Pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      ...expenseData,
      id: Date.now(),
      date: new Date().toISOString(),
    };

    // Get existing expenses
    const existingExpenses = JSON.parse(
      localStorage.getItem("expenses") || "[]"
    );

    // Add new expense
    const updatedExpenses = [...existingExpenses, newExpense];

    // Save to localStorage
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    // Navigate back to expenses page
    navigate("/expenses");
  };

  const handleChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className={`w-[${MAIN_CONTENT_WIDTH}] ml-[${SIDEBAR_WIDTH}]`}>
        <div className="flex justify-center items-center min-h-screen p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-sky-600 mb-6">
              Create New Expense
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Details</label>
                  <input
                    type="text"
                    name="details"
                    value={expenseData.details}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={expenseData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={expenseData.amount}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate("/expenses")}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                  >
                    Create Expense
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

export default NewExpense;
