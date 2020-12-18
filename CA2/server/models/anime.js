function Anime(id = 0, cat = 0, name, desc, stock, price) {

    this.AnimeId = id;
    this.CategoryId = cat;
    this.AnimeName = name;
    this.AnimeDescription = desc;
    this.AnimeStock = stock;
    this.AnimePrice = price;
}

module.exports = Anime;