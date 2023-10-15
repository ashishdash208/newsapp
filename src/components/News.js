import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  defaultTitle = "This article does not have a title. This is likely an API problem. Click on the button to read more anyway.";
  defaultDescription = "This article does not have a description. This is likely an API problem. Click on the button to read more anyway.";

  //* CLASS-BASED COMPONENTS; Not there in function-based branch

  static defaultProps = {
    country: "in",
    pageSize: 24,
    category: "general",
    setProgress: 20,
    apiKey: process.env.REACT_APP_NEWS_API,
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
  }

  constructor() {
    super();
    // console.log("hello, me a constructor of News!");
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
    };
  }

  async fetchData(){
    try{
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      const response = await fetch(url);
      let parsedData = await response.json();        
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
      this.filterArray(this.state.articles, this.state.articles.title, "[Removed]")
    }
    catch(error)
    {
      console.error("Error fetching articles:", error);
    }
  }

  async componentDidMount(){
    this.setState({ page: 1 });
    this.fetchData();
  }

  async componentDidUpdate(prevProps){
    if(prevProps.category !== this.props.category)
    {
      this.setState({page: 1}, () => { // The callback function ensures that the state is updated before making the API request
        this.fetchData(this.props.category);
      });
    }
  }

  handleNextClick = async () => {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      const response = await fetch(url);
      let parsedData = await response.json();        
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
      })
    }
  }

  handlePreviousClick = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    const response = await fetch(url);
    let parsedData = await response.json();        
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    })
  }

  filterArray = (array, field, target) => {
    array.filter((field) => array.field !== target);
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1},
      async ()=> {    
    try{
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      const response = await fetch(url);
      let parsedData = await response.json();        
      this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
    }
    catch(error)
    {
      console.error("Error fetching articles:", error);
    }
  });
  }

  render() {
    return (
      <>
        <h1 style={{fontFamily: "serif", textAlign: "center", marginTop: "30px"}}> <strong>TOP HEADLINES</strong> </h1>
        {/* <div className="container my-2 d-flex justify-content-between">
        <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick = {this.handlePreviousClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick = {this.handleNextClick}>Next &rarr;</button>
        </div> */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title? element.title.slice(0, 60):this.defaultTitle.slice(0, 60)}
                      description={element.description? element.description.slice(0, 80):this.defaultDescription.slice(0, 80)}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
