import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ExternalLink } from 'lucide-react';

const Article = () => {
  const { state } = useLocation();
  const article = state?.article;

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Article Not Found</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to News
        </Link>

        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-96 object-cover rounded-3xl shadow-lg mb-8"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-96 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center rounded-3xl shadow-lg mb-8">
            <p className="text-gray-500 text-lg font-medium">No Image Available</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            {article.title || 'Untitled Article'}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6">
            {article.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{getReadingTime(article.content)}</span>
            </div>
            {article.author && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {getSourceName(article.url)}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {article.description || 'No description available.'}
          </p>

          <div className="prose prose-lg text-gray-700 mb-8">
            {article.content ? <p>{article.content}</p> : <p>No content available for this article.</p>}
          </div>

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Read More on {getSourceName(article.url)}
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;