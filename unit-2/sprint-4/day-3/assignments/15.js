// Factory function to create a Book
function Book(title, author) {
    return {
      title,
      author,
      details() {
        console.log(`Title: ${this.title}, Author: ${this.author}`);
      }
    };
  }
  
  // Factory function to create a Library
  function createLibrary() {
    const books = []; // Internal array to store books
  
    return {
      addBook(book) {
        books.push(book);
      },
      removeBook(title) {
        const index = books.findIndex(book => book.title === title);
        if (index !== -1) {
          books.splice(index, 1);
        }
      },
      listBooks() {
        books.forEach(book => book.details());
      }
    };
  }
  
  