import React from 'react';
import NewsArticle from './NewsArticle';
import './NewsFeed.css';


const NEWS_TYPE = {
  MOST_RECENT: 'MOST_RECENT',
  ALL_STORIES: 'ALL_STORIES',
  BY_URL: 'BY_URL'
}

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsArticles: [], 
    }
  }
  
  updateSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value
    }) 
  }

  fetchArticles = (newsType) => {
    let url;

    if (NEWS_TYPE.MOST_RECENT === newsType) {
      // construct the url for getting top news for the search input in state
    url = `http://hn.algolia.com/api/v1/search_by_date?tags=story&query=${this.state.searchInput}`
    } else if (NEWS_TYPE.ALL_STORIES === newsType) {
      // construct the url for getting newest news for the search input in state
    url = `http://hn.algolia.com/api/v1/search?query=foo&tags=story&query=${this.state.searchInput}`
    } else if (NEWS_TYPE.BY_URL === newsType) {
    url = `http://hn.algolia.com/api/v1/search?query=bar&restrictSearchableAttributes=url&query=${this.state.searchInput}`
    } else {
      return;
    }
  
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        newsArticles: responseJson.hits
      });
    })}
  
  render() {
    const newsArticlesComponents = this.state.newsArticles.map((newsArticle, idx) => {
      return (
      <NewsArticle 
        key={idx}
        headline={newsArticle.title}
        author={newsArticle.author}
        time={newsArticle.created_at}
        url={newsArticle.url}
      />
      )
    }); 

    return (
      <div id="news">
        <div id="header-div">
          <div>
          <h1>Browse the News</h1>
          </div>
        </div>
        <div id="search-component">
        <label for="search" id="search-for-label">Search for : </label>
        <input type="text" id="search-for-label" onChange={this.updateSearchInput} placeholder="Topic..."></input>
        <br></br>
        <br></br>
        <label for="search-options-label">Filter by :</label>
          <div id="filter-options">
            <button id="buttons" onClick={() => this.fetchArticles(NEWS_TYPE.MOST_RECENT)} className="stories-by-date">
              Most Recent 
            </button>
            <button id="buttons" onClick={() => this.fetchArticles(NEWS_TYPE.ALL_STORIES)} className="stories-by-date">
              All Stories 
            </button>
            <button id="buttons" onClick={() => this.fetchArticles(NEWS_TYPE.BY_URL)} className="stories-by-search">
              Matching URL's
            </button>
        </div>
        </div>
        <div id="news-component">
          <div id="news-article-info">
          {newsArticlesComponents}
          </div>
        </div>
      </div>
        )
  }
}

export default NewsFeed;
