import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Film, HeartPulse, Wallet, Search } from 'lucide-react';
import Card from './Card';

const News = () => {
  const [search, setSearch] = useState('');
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const API_KEY = '611473ca95dd44e08705eaac12620037';

  const getData = async (query = search, category = null) => {
    setLoading(true);
    try {
      let url;
      if (category) {
        url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`;
      } else {
        url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
      }
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData.articles);
      setNewsData(jsonData.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setSelectedCategory(null);
    getData(search);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName.toLowerCase());
    getData(null, categoryName.toLowerCase());
  };

  useEffect(() => {
    getData();
  }, []);

  const categories = [
    { name: 'Sports', icon: <Activity size={18} />, color: 'from-green-400 to-green-600' },
    { name: 'Business', icon: <TrendingUp size={18} />, color: 'from-blue-400 to-blue-600' },
    { name: 'Entertainment', icon: <Film size={18} />, color: 'from-pink-400 to-pink-600' },
    { name: 'Health', icon: <HeartPulse size={18} />, color: 'from-purple-400 to-purple-600' },
    { name: 'Technology', icon: <Wallet size={18} />, color: 'from-yellow-400 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 space-y-3 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-sky-500 font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-md">Trendy News</h1>
          </div>
          <ul className="flex space-x-6 font-medium text-white">
            <li>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  getData(search);
                }}
                className="hover:text-yellow-200 transition-colors duration-200 px-3 py-1 rounded-md hover:bg-white/10"
              >
                All News
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('general');
                  getData(null, 'general');
                }}
                className="hover:text-yellow-200 transition-colors duration-200 px-3 py-1 rounded-md hover:bg-white/10"
              >
                Top Headlines
              </button>
            </li>
          </ul>
          <div className="flex w-full md:w-auto max-w-md">
            <input
              onChange={handleInput}
              onKeyPress={handleKeyPress}
              value={search}
              type="text"
              placeholder="Search news..."
              className="flex-grow md:flex-grow-0 md:w-64 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-yellow-500 text-white px-6 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50 flex items-center"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-white text-center py-8 shadow-sm">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Stay updated with <span className="text-sky-500 font-bold">Trendy News</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your daily dose of news across categories — fast, reliable & stylish.
        </p>
      </div>

      <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-8 shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Browse by Category</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex items-center gap-3 px-6 py-3 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all transform bg-gradient-to-r ${cat.color} ${
                  selectedCategory === cat.name.toLowerCase() ? 'ring-4 ring-white/50' : ''
                }`}
              >
                {cat.icon}
                <span className="font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-500 mb-4"></div>
            <p className="text-xl text-gray-600">Loading latest news...</p>
          </div>
        </div>
      )}

      {!loading && (
        <div className="py-8">
          <Card data={newsData} />
        </div>
      )}

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h3 className="text-2xl font-bold">Trendy News</h3>
          </div>
          <p className="text-gray-400 mb-4">Stay informed with the latest news from around the world</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-sky-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-sky-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-sky-400 transition-colors">
              Contact Us
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-sm">© 2024 Trendy News. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default News;