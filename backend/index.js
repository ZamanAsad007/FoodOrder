import express from 'express'
import mongo from './db.js';
import createUserRouter from './routes/createUser.js';

const app = express()
mongo(); 
app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use(express.json());
app.use('/api', createUserRouter);

app.listen(3000, () => {
  console.log('Server is running on 3000')
})