import React from "react";

function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade premium-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://loremflickr.com/900/700/burger"
              className="d-block w-100"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://loremflickr.com/900/700/pastry"
              className="d-block w-100"
              alt="Pastry"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://loremflickr.com/900/700/barbecue"
              className="d-block w-100"
              alt="Barbecue"
            />
          </div>
          <div
            className="carousel-search"
            style={{
              zIndex: "10",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <form className="d-flex gap-2">
              <input
                className="form-control premium-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-accent" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
