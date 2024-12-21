// Book constructor
function Book(title, author, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
}

// Member constructor
function Member(name) {
    this.name = name;
    this.borrowedBooks = [];
}

Member.prototype.borrowBook = function(book) {
    if (book.isAvailable) {
        book.isAvailable = false;
        this.borrowedBooks.push(book.title);
        return `${this.name} borrowed "${book.title}".`;
    } else {
        return `"${book.title}" is not available.`;
    }
};

// PremiumMember constructor
function PremiumMember(name) {
    Member.call(this, name);
    this.specialCollectionAccess = true;
}

PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

PremiumMember.prototype.borrowBook = function(book) {
    if (this.borrowedBooks.length < 5) {
        return Member.prototype.borrowBook.call(this, book);
    } else {
        return `Premium members can only borrow up to 5 books.`;
    }
};


