require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reportRoutes = require('./src/routes/report.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Reports Service running on port ${PORT}`);
});