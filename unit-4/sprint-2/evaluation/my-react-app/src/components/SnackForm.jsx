import { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/SnackForm.css";

function SnackForm({ snack, onClose, refreshSnacks }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    rating: ""
  });

  useEffect(() => {
    if (snack) {
      setFormData({
        title: snack.title,
        category: snack.category,
        price: snack.price,
        rating: snack.rating
      });
    }
  }, [snack]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "rating" ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (snack) {
        await updateDoc(doc(db, "snacks", snack.id), {
          ...formData,
          createdAt: snack.createdAt
        });
      } else {
        await addDoc(collection(db, "snacks"), {
          ...formData,
          createdAt: Date.now()
        });
      }
      
      refreshSnacks();
      onClose();
    } catch (error) {
      console.error("Error saving snack:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{snack ? "Edit Snack" : "Add New Snack"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Sweet">Sweet</option>
              <option value="Savory">Savory</option>
              <option value="Beverage">Beverage</option>
              <option value="Baked">Baked</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SnackForm;
