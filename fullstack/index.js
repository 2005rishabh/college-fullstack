const exp = require('express');
const app = exp();
const cors = require('cors');

// Import controllers
const { buyProduct } = require('./controllers/m/buyProduct');

// Middleware
app.use(cors());
app.use(exp.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Ecommerce BE');
});

// Product routes
app.post('/buyProduct/:id/:userid', buyProduct);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
