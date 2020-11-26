function Product(id = 0, cat = 0, name, desc, stock, price) {

    this.ProductId = id;
    this.CategoryId = cat;
    this.ProductName = name;
    this.ProductDescription = desc;
    this.ProductStock = stock;
    this.ProductPrice = price;
}

module.exports = Product;