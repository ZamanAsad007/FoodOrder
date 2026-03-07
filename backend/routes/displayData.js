import express from "express";
const router = express.Router();

router.post('/foodData',(req, res)=>{
    try{
        res.send([global.food_items, global.food_category]);
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})
export default router;