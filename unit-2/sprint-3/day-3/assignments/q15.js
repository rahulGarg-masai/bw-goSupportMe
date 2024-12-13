let library = [];

function addBook(book) {
    library.push(book);
    console.log(library);
}

function removeBook(book) {
    const index = library.indexOf(book);
    if (index !== -1) library.splice(index, 1);
    console.log(library);
}

function searchBook(book) {
    console.log(library.includes(book));
}

function findFirstLast(book) {
    console.log(library.indexOf(book), library.lastIndexOf(book));
}

function extractBooks(start, end) {
    console.log(library.slice(start, end));
}

function sortBooks() {
    library.sort((a, b) => a.localeCompare(b));
    console.log(library);
}

function replaceBook(index, newBook) {
    if (index >= 0 && index < library.length) {
        library.splice(index, 1, newBook);
    }
    console.log(library);
}

function joinBooks() {
    console.log(library.join(", "));
}