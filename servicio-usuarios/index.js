require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Users Service running on port ${PORT}`);
});