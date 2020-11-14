let product = (productId = 0, categoryId = 0, productName = 0, productDescription = 0, productStock = 0, producPrice = 0) => {
    this.productId = productId;
    this.categoryId = categoryId;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productStock = productStock;
    this.producPrice = producPrice;
};

module.exports = product;