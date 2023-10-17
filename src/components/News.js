import React, { useEffect, useState, useRef} from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const defaultTitle = "This article does not have a title. This is likely an API problem. Click on the button to read more anyway.";
  const defaultDescription = "This article does not have a description. This is likely an API problem. Click on the button to read more anyway.";

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const mounted = useRef(false);

  const fetchData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      let parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    }
    catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  useEffect(() => {
    if(!mounted.current)
    {
      fetchData();
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (mounted.current) {
      setPage(1);
      fetchData();
    }
  }, [props.category]);
  



  const fetchMoreData = async () => {
    try {
      console.log(page+", no nextPage yet");
      let nextPage = page + 1;
      console.log(page+", "+nextPage);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      let parsedData = await response.json();
      setPage(page + 1);
      console.log(page+", "+nextPage);
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
       // Update the page after a successful fetch
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }
  
  
  return (
    <>
      <h1 style={{ fontFamily: "serif", textAlign: "center", marginTop: "30px" }}> <strong>TOP HEADLINES</strong> </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 60) : defaultTitle.slice(0, 60)}
                    description={element.description ? element.description.slice(0, 80) : defaultDescription.slice(0, 80)}
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

export default News;

News.defaultProps = {
  country: "in",
  pageSize: 24,
  category: "general",
  apiKey: process.env.REACT_APP_NEWS_API,
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
}
