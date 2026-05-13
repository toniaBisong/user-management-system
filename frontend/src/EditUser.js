import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState(user.password);

  const updateUser = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/users/${user.id}`, {
      name,
      email,
      phone,
      password
    });

    alert("User updated successfully");
    navigate("/home");
  };

  return (
    <div className="container">
      <h1>Edit User</h1>

      <form onSubmit={updateUser}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUser;