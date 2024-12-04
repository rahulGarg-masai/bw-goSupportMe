const library = {
    books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],
    
    addBook(book) {
        if (!book.title || !book.author || !book.year) {
            console.log("Book information is incomplete.");
            return;
        }
        this.books.push(book);
    },

    findBookByTitle(title) {
        return this.books.find(book => book.title === title);
    },

    removeBook(title) {
        const index = this.books.findIndex(book => book.title === title);
        if (index !== -1) {
            this.books.splice(index, 1);
        } else {
            console.log("Book not found.");
        }
    }
};

// Test cases
library.addBook({ title: "1984", author: "George Orwell", year: 1949 });
console.log(library.books.length); // Output: 2
console.log(library.findBookByTitle("The Hobbit")); // Output: { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }
library.removeBook("1984");
console.log(library.books.length); // Output: 1
