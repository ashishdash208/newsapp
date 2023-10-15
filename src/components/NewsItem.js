import React, { Component } from 'react'
import "../index.css"

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, date, source} = this.props;
    const d = new Date(date);
    const s = d.toLocaleTimeString()+", "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
    return (
      <div className="card my-3"  id='newsCard'>
        <span className="position-absolute top-0 start-30 translate-middle badge rounded-pill bg-success" id="sourceBadge" >{source}</span>
        <img src={imageUrl? imageUrl:"https://guwahatiplus.com/public/web/images/default-news.png"} className="card-img-top" alt="ALTERNATE" height={250} width={300} />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsUrl} target="" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
          <p className="card-text">
            <small className="text-body-secondary">Last Updated at {s}</small>
          </p>
        </div>
      </div>
    )
  }
}

export default NewsItem