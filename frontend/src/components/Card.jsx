import React from 'react'

function Card() {
    return (
        <div>
            <div className="card premium-card mx-auto my-4" style={{ width: '18rem' }}>
                <img
                    src="https://loremflickr.com/600/400/pasta"
                    className="card-img-top"
                    alt="Pasta"
                />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example  </p>
                    <div className='container w-100'>
                        <select className='form-select form-select-sm premium-select w-auto d-inline-block me-2' name="" id="">
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='form-select form-select-sm premium-select w-auto d-inline-block me-2' id="">
                            <option value="half">Half </option>
                            <option value="half">Full </option>
                        </select>
                        <div className='d-inline h-100, fs-5'>
                            total price
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Card
