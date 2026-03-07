import React from "react";

function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  function handleCart(){
    
  }
  return (
    <div>
      <div
        className="card premium-card mx-auto my-4"
        style={{ width: "18rem" }}
      >
        <img src={props.imgsrc} className="card-img-top" alt={props.foodname} />
        <div className="card-body">
          <h5 className="card-title">{props.foodname}</h5>
          <p className="card-text">{props.description}</p>
          <div className="container w-100">
            <select
              className="form-select form-select-sm premium-select w-auto d-inline-block me-2"
              name=""
              id=""
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="form-select form-select-sm premium-select w-auto d-inline-block me-2"
              id=""
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100, fs-5">total price</div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
