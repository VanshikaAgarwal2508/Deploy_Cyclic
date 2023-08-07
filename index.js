require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/olx_classifieds", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const classifiedsRoutes = require('./routes/classifieds');
app.use('/api/classifieds', classifiedsRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
