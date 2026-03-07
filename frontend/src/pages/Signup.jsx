import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signup.name,
        email: signup.email,
        password: signup.password,
        location: signup.location,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      alert("User Created Successfully");
    } else {
      alert("Error creating user!");
    }
  }
  function onchange(e) {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container py-5">
        <div className="card premium-card p-4 mx-auto auth-card">
          <h3 className="auth-title mb-4">Create account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control premium-input"
                id="name"
                placeholder="Enter Your Name"
                name="name"
                value={signup.name}
                onChange={onchange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control premium-input"
                id="email"
                placeholder="Enter Your Email"
                name="email"
                value={signup.email}
                onChange={onchange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control premium-input"
                id="password"
                placeholder="Password"
                name="password"
                value={signup.password}
                onChange={onchange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                className="form-control premium-input"
                id="location"
                placeholder="Enter Your Location"
                name="location"
                value={signup.location}
                onChange={onchange}
              />
            </div>

            <div className="d-flex gap-2 align-items-center">
              <button type="submit" className="btn btn-accent">
                Sign up
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <Link to="/login" className="auth-link ms-auto">
                Already a user?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
