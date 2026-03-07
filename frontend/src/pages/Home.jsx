import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setsearch] = useState("");
  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:3000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfooditem(response[0]);
    setfoodcat(response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
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
                  value={search}
                  onChange={(e)=>{
                    setsearch(e.target.value)
                  }}
                />
                {/* <button className="btn btn-accent" type="submit">
                  Search
                </button> */}
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
      <div className="container py-4">
        {foodcat.length > 0
          ? foodcat.map((data, categoryIndex) => {
              return (
                <section
                  className="mb-5"
                  key={data._id ?? data.id ?? `${data.CategoryName}-${categoryIndex}`}
                >
                  <h4 className="category-title mb-2">{data.CategoryName}</h4>
                  <hr className="category-divider" />

                  <div className="row g-4">
                    {fooditem.length > 0
                      ? fooditem
                          .filter(
                            (item) =>
                              item.CategoryName === data.CategoryName &&
                              item.name
                                .toLowerCase()
                                .includes(search.toLocaleLowerCase())
                          )
                          .map((item, itemIndex) => (
                            <div
                              className="col-12 col-sm-6 col-md-4 col-lg-3"
                              key={item._id ?? item.id ?? `${item.name}-${itemIndex}`}
                            >
                              <Card foodItem={item} options={item.options[0]} />
                            </div>
                          ))
                      : null}
                  </div>
                </section>
              );
            })
          : ""}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
