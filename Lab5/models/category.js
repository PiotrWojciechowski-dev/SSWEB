// Category model
let category = (categoryID = 0, categoryName = 0, categoryDescription = 0) => {
    this.categoryID = categoryID;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
};

module.exports = category;