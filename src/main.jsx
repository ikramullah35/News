import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from './News';
import Article from './Article';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<News />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
  </BrowserRouter>
);