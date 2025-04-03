import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const { user } = useAuth();
  const [pendingTrips, setPendingTrips] = useState([]);
  const [pendingExpenses, setPendingExpenses] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch pending trips and expenses for the logged-in user
      fetch(`/api/trips?status=pending&userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => setPendingTrips(data))
        .catch((error) => console.error('Error fetching trips:', error));

      fetch(`/api/expenses?status=pending&userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => setPendingExpenses(data))
        .catch((error) => console.error('Error fetching expenses:', error));
    }
  }, [user]);

  return (
    <div className="container">
      <h1 className="welcome-header">Welcome, {user?.name || 'Guest'}</h1>
      <div className="dashboard">
        <section className="dashboard-section">
          <h2>Pending Trips</h2>
          <div className="list-container">
            {pendingTrips.length > 0 ? (
              <ul className="item-list">
                {pendingTrips.map((trip) => (
                  <li key={trip.id} className="item-card">
                    <h3>{trip.destination}</h3>
                    <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-items">No pending trips.</p>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Pending Expenses</h2>
          <div className="list-container">
            {pendingExpenses.length > 0 ? (
              <ul className="item-list">
                {pendingExpenses.map((expense) => (
                  <li key={expense.id} className="item-card">
                    <h3>{expense.description}</h3>
                    <p>Amount: ${expense.amount.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-items">No pending expenses.</p>
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .welcome-header {
          color: #333;
          margin-bottom: 30px;
        }
        .dashboard {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .dashboard-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .list-container {
          margin-top: 15px;
        }
        .item-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .item-card {
          padding: 15px;
          margin-bottom: 10px;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #f9f9f9;
        }
        .item-card h3 {
          margin: 0 0 8px 0;
          color: #2c3e50;
        }
        .item-card p {
          margin: 0;
          color: #666;
        }
        .no-items {
          color: #666;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;
