import { useState, useEffect } from "react";
import { getFoodMenu } from "../../api/api";
import { LuUtensilsCrossed } from "react-icons/lu";
import "./StudentPages.css";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StudentFoodMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFoodMenu()
      .then((data) => {
        const sorted = data.sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));
        setMenu(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Food Menu</h2>
        <p>Weekly mess schedule — Today is <strong>{today}</strong></p>
      </div>

      {menu.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <LuUtensilsCrossed size={64} />
            <p>No food menu has been set yet. Please check back later.</p>
          </div>
        </div>
      ) : (
        <div className="food-grid">
          {menu.map((item) => (
            <div
              key={item._id}
              className="food-day-card"
              style={item.day === today ? { border: '2px solid var(--primary)', boxShadow: 'var(--shadow-lg)' } : {}}
            >
              <div className="food-day-header" style={item.day === today ? {} : { background: 'var(--bg-sidebar)' }}>
                {item.day} {item.day === today && "— Today"}
              </div>
              <div className="food-day-meals">
                <div className="food-meal-row">
                  <span className="food-meal-label">🍳 Breakfast</span>
                  <span className="food-meal-value">{item.breakfast || "Not set"}</span>
                </div>
                <div className="food-meal-row">
                  <span className="food-meal-label">🍛 Lunch</span>
                  <span className="food-meal-value">{item.lunch || "Not set"}</span>
                </div>
                <div className="food-meal-row">
                  <span className="food-meal-label">🍽️ Dinner</span>
                  <span className="food-meal-value">{item.dinner || "Not set"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
