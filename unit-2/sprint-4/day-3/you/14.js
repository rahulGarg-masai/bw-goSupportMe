function createBook(title, author) {
    return {
      title: title,
      author: author,
      printInfo() {
        console.log(`Book: ${this.title}, Author: ${this.author}`);
      }
    };
  }
  
