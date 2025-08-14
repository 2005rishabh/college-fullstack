const buyServices = require("../services,buyProductServices")

const buyProduct = async(req, res) => {
    try {
        const productId = req.params.id;
        buyServices(id);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({message : 'message'});
        
    }
}
