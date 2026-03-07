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
      <div className="container">
        {foodcat.length > 0
          ? foodcat.map((data) => {
              return (
                <div>
                  <div key={data.id}>{data.CategoryName}</div>
                  <hr />
                  {fooditem.length > 0
                    ? fooditem
                        .filter(
                          (item) => (item.CategoryName === data.CategoryName)
                          && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                        ) 
                        .map((item) => (
                          <div key={item.id}>
                            <Card
                              foodname={item.name}
                              description={item.description}
                              options={item.options[0]}
                              imgsrc={item.img}
                            />
                          </div>
                        ))
                    : null}
                </div>
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
