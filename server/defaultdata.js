const Products = require("./models/productSchema");
const productsdata = require("./constant/productsdata");


const DefaultData = async () => {
    try {
        await Products.deleteMany({});
        const stroreData = await Products.insertMany(productsdata);
        // console.log(stroreData);
    } catch (error) {
      console.log(error.message);
    }
}

module.exports = DefaultData;