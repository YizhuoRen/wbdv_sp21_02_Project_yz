import React from 'react'
import {Link} from "react-router-dom";

export default () =>
    <div className="container-fluid">
        <h1 className="yz-home-title">Home Screen</h1>
         <Link to="/search/">
           Search
         </Link>
        <br/>
        <Link to="/details">
           Details
        </Link>
        <div>
          <img className="yz-home-page-image" alt=""
               src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/webcarmine-s-amaretto-sidecar-1571169801.jpg"/>
        </div>
    </div>