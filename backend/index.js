import express from 'express'
import mongo from './db.js';
import createUserRouter from './routes/createUser.js';

const app = express()
mongo(); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader(                                        // ✅ setHeader
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'                   // ✅ fixed values too
  );
  res.setHeader(
    'Access-Control-Allow-Headers',                     // ✅ recommended to add
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use(express.json());
app.use('/api', createUserRouter);

app.listen(3000, () => {
  console.log('Server is running on 3000')
})