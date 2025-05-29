import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/Analytics.css";

function Analytics() {
  const [snacks, setSnacks] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalSnacks: 0,
    avgPrice: 0,
    avgRating: 0,
    mostCommonCategory: "",
    highestPricedSnack: null,
    lowestPricedSnack: null
  });

  useEffect(() => {
    fetchSnacks();
  }, []);

  useEffect(() => {
    calculateAnalytics();
  }, [snacks]);

  const fetchSnacks = async () => {
    try {
      const snacksCollection = collection(db, "snacks");
      const snacksSnapshot = await getDocs(snacksCollection);
      const snacksList = snacksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSnacks(snacksList);
    } catch (error) {
      console.error("Error fetching snacks:", error);
    }
  };

  const calculateAnalytics = () => {
    if (snacks.length === 0) return;

    const totalSnacks = snacks.length;
    
    const sumPrice = snacks.reduce((sum, snack) => sum + snack.price, 0);
    const avgPrice = (sumPrice / totalSnacks).toFixed(2);
    
    const sumRating = snacks.reduce((sum, snack) => sum + snack.rating, 0);
    const avgRating = (sumRating / totalSnacks).toFixed(1);
    
    const categoryCount = {};
    snacks.forEach(snack => {
      categoryCount[snack.category] = (categoryCount[snack.category] || 0) + 1;
    });
    
    let mostCommonCategory = "";
    let maxCount = 0;
    for (const category in categoryCount) {
      if (categoryCount[category] > maxCount) {
        maxCount = categoryCount[category];
        mostCommonCategory = category;
      }
    }
    
    const highestPricedSnack = [...snacks].sort((a, b) => b.price - a.price)[0];
    const lowestPricedSnack = [...snacks].sort((a, b) => a.price - b.price)[0];
    
    setAnalytics({
      totalSnacks,
      avgPrice,
      avgRating,
      mostCommonCategory,
      highestPricedSnack,
      lowestPricedSnack
    });
  };

  return (
    <div className="analytics">
      <h2>Analytics Dashboard</h2>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Snacks</h3>
          <p className="analytics-value">{analytics.totalSnacks}</p>
        </div>
        
        <div className="analytics-card">
          <h3>Average Price</h3>
          <p className="analytics-value">${analytics.avgPrice}</p>
        </div>
        
        <div className="analytics-card">
          <h3>Average Rating</h3>
          <p className="analytics-value">{analytics.avgRating}/5</p>
        </div>
        
        <div className="analytics-card">
          <h3>Most Common Category</h3>
          <p className="analytics-value">{analytics.mostCommonCategory || "N/A"}</p>
        </div>
        
        <div className="analytics-card">
          <h3>Highest Priced Snack</h3>
          {analytics.highestPricedSnack ? (
            <div>
              <p>{analytics.highestPricedSnack.title}</p>
              <p>${analytics.highestPricedSnack.price}</p>
            </div>
          ) : (
            <p>N/A</p>
          )}
        </div>
        
        <div className="analytics-card">
          <h3>Lowest Priced Snack</h3>
          {analytics.lowestPricedSnack ? (
            <div>
              <p>{analytics.lowestPricedSnack.title}</p>
              <p>${analytics.lowestPricedSnack.price}</p>
            </div>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
