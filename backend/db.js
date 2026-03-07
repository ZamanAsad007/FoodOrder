import mongoose from "mongoose";

const mongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/goFood");  

    console.log("Connected to MongoDB ✅");

   
    const fetched_data = mongoose.connection.db.collection("foodData");
    const data = await fetched_data.find({}).toArray();  
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    global.food_category = foodCategory;
    global.food_items = data;
     

  } catch (error) {
    console.error("Connection failed ❌", error);
  }
};

export default mongo;