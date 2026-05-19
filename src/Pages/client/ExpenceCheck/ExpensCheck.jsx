import React, { useState, useEffect } from "react";
import "./ExpenseCheck.css";
import Footer from "../../../components/Footer/Footer";

const catIcons = {
  food: "🍽️",
  transport: "🚗",
  accommodation: "🏨",
  activity: "🎡",
  shopping: "🛍️",
  other: "💼",
};

function ExpensCheck() {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState(50000);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const addExpense = () => {
    if (!desc || !amount || !date) {
      alert("Fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      desc,
      amount: Number(amount),
      category,
      date,
    };

    setExpenses([newExpense, ...expenses]);
    setDesc("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const filteredExpenses = filter
    ? expenses.filter((e) => e.category === filter)
    : expenses;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const percent = Math.min(100, (total / budget) * 100);

  return (

    
    <div className="xpns-root">
      
      {/* HEADER */}
      <div className="xpns-hero">
        <h1>Expense Tracker</h1>
        <p>Monitor your travel spending in real-time</p>
      </div>

      <div className="xpns-grid-layout">

        {/* LEFT PANEL */}
        <div className="xpns-left-panel">

          {/* ADD EXPENSE */}
          <div className="xpns-card-box">
            <h3>Add Expense</h3>

            <div className="xpns-input-grid">
              <input
                type="text"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {Object.keys(catIcons).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="xpns-action-row">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <button onClick={addExpense}>+ Add</button>
            </div>
          </div>

          {/* EXPENSE LIST */}
          <div className="xpns-card-box">
            <div className="xpns-list-head">
              <h3>Expense History</h3>

              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">All</option>
                {Object.keys(catIcons).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {filteredExpenses.length === 0 ? (
              <p className="xpns-empty">No expenses yet</p>
            ) : (
              filteredExpenses.map((e) => (
                <div key={e.id} className="xpns-item">
                  <span className="xpns-icon">
                    {catIcons[e.category]}
                  </span>

                  <div className="xpns-item-info">
                    <strong>{e.desc}</strong>
                    <small>{e.date}</small>
                  </div>

                  <span className="xpns-amount">₹{e.amount}</span>

                  <button onClick={() => deleteExpense(e.id)}>✕</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="xpns-right-panel">
          <div className="xpns-card-box">
            <h3>Budget</h3>

            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />

            <div className="xpns-progress-bar">
              <div style={{ width: `${percent}%` }}></div>
            </div>

            <p>Spent: ₹{total}</p>
            <p>Remaining: ₹{budget - total}</p>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  );
}

export default ExpensCheck;