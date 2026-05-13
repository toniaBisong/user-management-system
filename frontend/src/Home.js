import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);
const deleteUser = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");

  if (confirmDelete) {
    await axios.delete(`http://localhost:5000/users/${id}`);
    getUsers();
  }
};

  return (
    <div className="container">
      <h1>User List</h1>

      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.phone}</p>

        <div className="button-group">
  <button
    onClick={() => navigate("/edit-user", { state: { user } })}
  >
    Edit
  </button>

  <button onClick={() => deleteUser(user.id)}>
    Delete
  </button>
</div>

        </div>
      ))}
    </div>
  );
}

export default Home;