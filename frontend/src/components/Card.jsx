import React, { useEffect, useRef } from "react";
import { useCart, useDispatchCart } from "./ContextReducer.jsx"
import { useState } from "react";


function Card(props) {
  let options = props.options || {};
  let priceOptions = Object.keys(options);
  const priceRef= useRef();
  let item = props.foodItem || {};
  let dispatch = useDispatchCart();
  let data = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  async function handleCart(){
    const existing = data.find(
      (cartItem) => cartItem.id === item._id && cartItem.size === size
    );

    if (existing) {
      const updatedQuantity = (existing.quantity || 0) + quantity;
      const unitPrice = Number.parseInt(options[size], 10) || 0;
      await dispatch({
        type: "UPDATE",
        id: item._id,
        size,
        quantity: updatedQuantity,
        price: unitPrice * updatedQuantity,
      });
      return;
    }

    await dispatch({
      type: "ADD",
      id: item._id,
      name: item.name,
      price: finalPrice,
      quantity,
      size,
    });
  }

  const unitPrice = Number.parseInt(options[size], 10) || 0;
  let finalPrice = quantity * unitPrice;
  useEffect(()=>{
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, [])

  return (
    <div className="card premium-card h-100">
      <img
        src={item.img || ""}
        className="card-img-top"
        alt={item.name || "Food item"}
        loading="lazy"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>

        <div className="d-flex align-items-center gap-2 flex-wrap mt-auto">
          <select
            className="form-select form-select-sm premium-select w-auto"
            onChange={(e) => setQuantity(Number(e.target.value))}
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
            className="form-select form-select-sm premium-select w-auto"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>

          <div className="ms-auto fw-semibold">৳{finalPrice}/-</div>
        </div>

        <button
          type="button"
          className="btn btn-accent w-100 mt-3"
          onClick={handleCart}
          disabled={!size}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
