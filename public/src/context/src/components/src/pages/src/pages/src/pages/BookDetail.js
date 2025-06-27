import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, "books", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setBook({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  const handleDownload = () => {
    if (!currentUser) {
      navigate('/signin', { state: { from: `/book/${id}` } });
      return;
    }
    
    if (book.price === 0) {
      // Free download logic
      window.open(book.downloadUrl, '_blank');
    } else {
      // Paid book purchase flow
      navigate(`/checkout/${id}`);
    }
  };

  if (loading) return <div className="text-center py-20">Loading book details...</div>;
  if (!book) return <div className="text-center py-20">Book not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 flex items-center justify-center bg-gray-50">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="h-80 w-auto object-contain rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3 p-8">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">
              {book.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-4">by {book.author}</p>
            
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  book.price === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {book.price === 0 ? 'Free' : `₹${book.price}`}
                </span>
              </div>
              <div className="text-yellow-500">
                {'★'.repeat(book.rating || 5)}{'☆'.repeat(5 - (book.rating || 5))}
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">{book.description}</p>
            
            <div className="mb-8">
              <button 
                onClick={() => setShowPreview(!showPreview)}
                className="mr-4 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
              >
                {showPreview ? 'Hide Preview' : 'Read Preview'}
              </button>
              
              <button 
                onClick={handleDownload}
                className={`px-6 py-2 rounded font-semibold ${
                  book.price === 0 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-primary hover:bg-primary-dark text-white'
                } transition`}
              >
                {book.price === 0 ? 'Download Now' : 'Buy Now'}
              </button>
            </div>
            
            {showPreview && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Book Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto">
                  {book.previewContent || "Preview not available for this book."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
