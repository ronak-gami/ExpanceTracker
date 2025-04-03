import React, { useState, useEffect } from "react";
import { SIDEBAR_WIDTH, MAIN_CONTENT_WIDTH } from "../../utils/Constants";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(savedExpenses);
  }, []);

  const handleDelete = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className={`w-[${MAIN_CONTENT_WIDTH}] ml-[${SIDEBAR_WIDTH}] pt-14`}>
        <div className="flex justify-center items-center min-h-[calc(100vh-56px)] p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-sky-600">Expenses</h1>
              <a
                href="/newexpense"
                className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
              >
                <i className="fas fa-plus"></i> New Expense
              </a>
            </div>

            <div className="grid grid-cols-6 gap-4 text-gray-700">
              <p className="font-bold">DATE</p>
              <p className="font-bold">DETAILS</p>
              <p className="font-bold">CATEGORY</p>
              <p className="font-bold">AMOUNT</p>
              <p className="font-bold">STATUS</p>
              <p className="font-bold">ACTION</p>
            </div>

            {expenses.length === 0 ? (
              <div className="bg-sky-100 p-4 rounded-lg mt-4 shadow-md text-center">
                <p className="text-gray-600">
                  No expenses yet. Add your first expense!
                </p>
              </div>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="grid grid-cols-6 gap-4 items-center border-b py-4"
                >
                  <p>{new Date(expense.date).toLocaleDateString()}</p>
                  <p>{expense.details}</p>
                  <p>{expense.category}</p>
                  <p>${expense.amount}</p>
                  <p>{expense.status}</p>
                  <button
                    onClick={() => handleDelete(expense.id)}
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

export default Expenses;
