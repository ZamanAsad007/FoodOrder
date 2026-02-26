import mongoose from 'mongoose'

const mongo = () => {
  mongoose.connect("mongodb://localhost:27017/goFood")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Connection failed:", err))
}

export default mongo;