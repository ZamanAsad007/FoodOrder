import express from 'express'
const router= express.Router();
import User from '../models/User.js';

router.post('/createuser', async (req, res) =>{
    try{
        await User.create({
            name: req.body.name,
            location: req.body.location,
            password: req.body.password,
            email: req.body.email
        })
        res.json({ success: true });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;