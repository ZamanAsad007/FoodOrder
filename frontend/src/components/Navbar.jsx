import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../modal";
import Cart from "../pages/Cart";
import { useState } from "react";
import { useCart } from "./ContextReducer";

function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  let data= useCart();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-premium">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link className="btn btn-ghost nav-btn mx-1" to="/login">
                  Login
                </Link>

                <Link
                  className="btn btn-accent nav-btn mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-ghost nav-btn mx-2"
                  onClick={() => setCartView(true)}
                >
                  My Cart{" "}
                  <Badge pill bg="danger" className="cart-badge">
                    {data.length}
                  </Badge>
                </button>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <button
                  type="button"
                  className="btn btn-ghost nav-btn nav-btn-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
