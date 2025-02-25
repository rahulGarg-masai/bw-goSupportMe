function Book(title,author){
    let book={};
    book.title = title;
    book.author = author;
    book.details = function(){
    console.log(this.title+ this.author);
    }
    return book;
}

function createLibrary(){
    let books =[];
    return {
        addBook:function(book){
            books.push(book);
        },
        removeBook:function(title){
            
                
                   books = books.filter(a=>a.title!==title);
                
            
        },
        listBooks:function(){
             books.forEach(ele=>ele.details());
        }
    }
}

const library = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);

library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee
// Title: 1984, Author: George Orwell

library.removeBook("1984");
library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee

