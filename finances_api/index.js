const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.static('public'));

const HelloWordRoutes = require('./Routes/HelloWordRoutes');
const UserRoutes = require('./Routes/UserRoutes');

app.use('/check-connectios', HelloWordRoutes);
app.use('/user', UserRoutes);

app.listen(5000, () => {
    console.log('Servidor rodando em http://localhost:5000');
});
