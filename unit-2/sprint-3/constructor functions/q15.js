function Book(title,author){
    return {
        title:title,
        author:author,
        details: function(){
            console.log(title+author);
        }
    }
}
function createLibrary(){
    let books =[];
return {
    addBook: function(item){
books.push(item);
    },
    removeBook: function(title){
        books = books.filter((ele)=> ele.title!==title)
    },
    listBooks: function(){
          books.forEach((ele)=>console.log(ele.title+ele.author));
    }
}
}
const library = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);

//library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee
// Title: 1984, Author: George Orwell

library.removeBook("1984");
library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee

