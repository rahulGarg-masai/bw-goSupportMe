function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

Book.prototype.getSummary = function() {
    return `"${this.title}" by ${this.author}, published in ${this.year}.`;
};

const books = [
    new Book("JavaScript Essentials", "John Doe", 2020),
    new Book("Advanced JS", "Jane Smith", 2019),
    new Book("Web Development", "Alice Johnson", 2021)
];

export { Book, books };
