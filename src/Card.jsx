import React from 'react';
import { Calendar, Clock, User, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom'; // Added for routing

const Card = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getReadingTime = (content) => {
    if (!content) return '2 min';
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min`;
  };

  const getSourceName = (url) => {
    if (!url) return 'Unknown Source';
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'Unknown Source';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest News & Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest stories and insights from around the world
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data?.map((item, index) => (
            <article
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 flex flex-col overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              <div className="relative overflow-hidden">
                {item.urlToImage ? (
                  <>
                    <img
                      src={item.urlToImage}
                      alt={item.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-56 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center p-6">
                      <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm font-medium">No Image Available</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    {getSourceName(item.url)}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                  {item.title || 'Untitled Article'}
                </h2>
                <p className="text-gray-600 text-sm mb-6 line-clamp-4 flex-grow leading-relaxed">
                  {item.description || 'No description available for this article.'}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    {item.publishedAt && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(item.publishedAt)}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{getReadingTime(item.content)}</span>
                    </div>
                  </div>
                  {item.author && (
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span className="truncate max-w-20">{item.author}</span>
                    </div>
                  )}
                </div>
                <Link
                  to={`/article/${index}`}
                  state={{ article: item }}
                  className="group/btn relative mt-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Read Full Article</span>
                  <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out"></div>
                </Link>
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
              </div>
            </article>
          ))}
        </div>

        {(!data || data.length === 0) && (
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-4">No Articles Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any articles to display right now. Please check back later or try refreshing the page.
            </p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="text-center mt-16">
            <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;