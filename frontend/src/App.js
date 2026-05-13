import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import "./App.css";
import Home from "./Home";
import EditUser from "./EditUser";

function App() {
  return (
    <BrowserRouter>
 <Routes>
  <Route path="/" element={<Signup />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/edit-user" element={<EditUser />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;