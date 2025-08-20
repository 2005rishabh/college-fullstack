const buyService = require('../../services/buyProductServices');

const buyProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.params.userId; // Get userId from URL params instead of req.user

        if (!productId || !userId) {
            return res.status(400).json({ message: 'Product ID and User ID are required' });
        }

        // Call the service and wait for it to complete
        await buyService(productId, userId);

        // Send success response
        res.status(200).json({
            success: true,
            message: `Product ${productId} purchased successfully by user ${userId}`
        });

    } catch (error) {
        console.error("Error in buyProduct:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = { buyProduct };
