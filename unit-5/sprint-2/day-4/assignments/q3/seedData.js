const mongoose = require('mongoose');
const Book = require('./models/Book');
const Member = require('./models/Member');

mongoose.connect('mongodb://localhost:27017/librarymanagement')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const sampleBooks = [
  {
    _id: 'BOOK001',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publishedYear: 1925,
    genres: ['Fiction', 'Classic'],
    status: 'available'
  },
  {
    _id: 'BOOK002',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publishedYear: 1960,
    genres: ['Fiction', 'Drama'],
    status: 'available'
  },
  {
    _id: 'BOOK003',
    title: '1984',
    author: 'George Orwell',
    publishedYear: 1949,
    genres: ['Fiction', 'Dystopian'],
    status: 'available'
  },
  {
    _id: 'BOOK004',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publishedYear: 1813,
    genres: ['Fiction', 'Romance'],
    status: 'available'
  },
  {
    _id: 'BOOK005',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publishedYear: 1951,
    genres: ['Fiction', 'Coming-of-age'],
    status: 'available'
  }
];

const sampleMembers = [
  {
    _id: 'MEM001',
    name: 'John Doe',
    borrowedBooks: []
  },
  {
    _id: 'MEM002',
    name: 'Jane Smith',
    borrowedBooks: []
  },
  {
    _id: 'MEM003',
    name: 'Bob Johnson',
    borrowedBooks: []
  },
  {
    _id: 'MEM004',
    name: 'Alice Brown',
    borrowedBooks: []
  },
  {
    _id: 'MEM005',
    name: 'Charlie Wilson',
    borrowedBooks: []
  }
];

async function seedData() {
  try {
    await Book.deleteMany({});
    await Member.deleteMany({});
    
    console.log('Inserting sample books...');
    await Book.insertMany(sampleBooks);
    console.log('Books inserted successfully');
    
    console.log('Inserting sample members...');
    await Member.insertMany(sampleMembers);
    console.log('Members inserted successfully');
    
    console.log('Sample data insertion completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting sample data:', error);
    process.exit(1);
  }
}

seedData();