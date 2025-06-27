import React from 'react';
import { Link } from 'react-router-dom';
import featuredBooks from '../data/featuredBooks'; // Sample data

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Your Next Favorite Book</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            PrimeXBook offers the best collection of eBooks. Read anytime, anywhere.
          </p>
          <Link 
            to="/books" 
            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-lg text-lg transition"
          >
            Browse Books
          </Link>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <Link to={`/book/${book.id}`}>
                <img src={book.cover} alt={book.title} className="w-full h-64 object-cover"/>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4">by {book.author}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    book.price === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {book.price === 0 ? 'Free' : `$${book.price}`}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
