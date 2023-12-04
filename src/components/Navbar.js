import React from "react";
import { Link } from 'react-router-dom';
import "../index.css";


const Navbar = () => {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary" id="navbar">
          <div className="container-fluid">
            <Link className="navbar-brand" to ="/">
              NewsBloom
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to ="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to ="/">
                    About
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to ="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to ="/business">Business</Link> </li>
                  <li><Link className="dropdown-item" to ="/entertainment">Entertainment</Link> </li>
                  <li><Link className="dropdown-item" to ="/">General</Link> </li>
                  <li><Link className="dropdown-item" to ="/health">Health</Link> </li>
                  <li><Link className="dropdown-item" to ="/science">Science</Link> </li>
                  <li><Link className="dropdown-item" to ="/sports">Sports</Link> </li>
                  <li><Link className="dropdown-item" to ="/technology">Technology</Link> </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
}

export default Navbar;
