import Home from "./pages/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { CartProvider } from "./components/ContextReducer";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
