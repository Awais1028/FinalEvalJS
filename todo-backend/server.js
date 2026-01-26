const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const apiRoutes = require('./api/index');

const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173' // Only allow this specific origin
}));

app.use('/api', apiRoutes);
mongoose.connect(process.env.mongodb)
    .then(()=>console.log('mongoDb Connected'))
    .catch((error)=>console.log(error.message))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
