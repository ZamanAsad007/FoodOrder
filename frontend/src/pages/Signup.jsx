import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [signup, setSignup] =  useState({
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
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-name"
              id="name"
              placeholder="Enter Your Name"
              name="name"
              value={signup.name}
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-email"
              id="email"
              placeholder="Enter Your Email"
              name="email"
              value={signup.email}
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              className="form-password"
              id="password"
              placeholder="Password"
              name="password"
              value={signup.password}
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-location"
              id="location"
              placeholder="Enter Your Location"
              name="location"
              value={signup.location}
              onChange={onchange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="">
            Aready a User?
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
