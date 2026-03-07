import React from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-body-secondary'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:3000/api/auth/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-4 cart-panel table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover cart-table'>
          <thead className='cart-table-head'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={`${food.id}-${food.size}-${index}`}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                    aria-label="Remove item"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3'>
          <h1 className='fs-4 m-0'>Total: ৳{totalPrice}/-</h1>
          <button className='btn btn-accent' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>



    </div>
  )
}