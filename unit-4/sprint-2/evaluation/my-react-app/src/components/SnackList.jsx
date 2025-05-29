import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/SnackList.css";

function SnackList({ snacks, onEdit, refreshSnacks }) {
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "snacks", id));
      refreshSnacks();
    } catch (error) {
      console.error("Error deleting snack:", error);
    }
  };

  return (
    <div className="snack-grid">
      {snacks.length === 0 ? (
        <p className="no-snacks">No snacks found.</p>
      ) : (
        snacks.map(snack => (
          <div key={snack.id} className="snack-card">
            <h3>{snack.title}</h3>
            <p>Category: {snack.category}</p>
            <p>Price: ${snack.price}</p>
            <p>Rating: {snack.rating}/5</p>
            <div className="card-actions">
              <button onClick={() => onEdit(snack)}>Edit</button>
              <button onClick={() => handleDelete(snack.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SnackList;
