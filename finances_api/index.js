const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.static('public'));

const HelloWordRoutes = require('./Routes/HelloWordRoutes');
const UserRoutes = require('./Routes/UserRoutes');
const StoreRoutes = require('./Routes/StoreRoutes');
const AddressRoutes = require('./Routes/AddressRoutes');

app.use('/check-connectios', HelloWordRoutes);
app.use('/user', UserRoutes);
app.use('/store', StoreRoutes);
app.use('/address', AddressRoutes);

app.listen(5000, () => {
    console.log('Server is runnin on http://localhost:5000');
});
