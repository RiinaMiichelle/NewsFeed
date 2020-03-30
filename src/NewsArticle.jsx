import React from 'react';
import './NewsArticle.css';

const NewsArticle = (props) => {
  const { headline, author, time, url } = props;

  return (
    <div className="news-article">
      <div className="news-article-title">
        Headline: {headline} 
      </div> 
      <div className="news-article-author">
        Author: {author}
      </div>
      <div className="news-article-time">
        Time Created: {time}
      </div>
      <div className="news-article-url">
        URL: {url}
      </div> 
      <br></br>
    </div>
  );
};

export default NewsArticle;