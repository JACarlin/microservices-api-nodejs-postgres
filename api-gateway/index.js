require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();
app.use(cors());
app.use(express.json());

// Definir las rutas de proxy
app.use('/api/auth', proxy(process.env.AUTH_SERVICE_URL));
app.use('/api/users', proxy(process.env.USERS_SERVICE_URL));
app.use('/api/reports', proxy(process.env.REPORTS_SERVICE_URL));

app.get('/', (req, res) => res.send('API Gateway is running.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway listening on port ${PORT}`));