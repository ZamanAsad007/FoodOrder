import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [signin, setsignin] = useState({
    email: "",
    password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signin.email,
        password: signin.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      console.log(localStorage.getItem("token"));
      navigate("/");
    } else {
      alert("Login Failed!");
    }
  }
  function onchange(e) {
    setsignin({ ...signin, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container py-5">
        <div className="card premium-card p-4 mx-auto auth-card">
          <h3 className="auth-title mb-4">Sign in</h3>
          <form onSubmit={handleSubmit}>
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
                value={signin.email}
                onChange={onchange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control premium-input"
                id="password"
                placeholder="Password"
                name="password"
                value={signin.password}
                onChange={onchange}
              />
            </div>

            <div className="d-flex gap-2 align-items-center">
              <button type="submit" className="btn btn-accent">
                Login
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <Link to="/signup" className="auth-link ms-auto">
                New user?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
