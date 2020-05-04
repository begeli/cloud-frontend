import React, { useState } from 'react';
import axios from "axios";

export default function RedirectionPage({ match, location }) {
    const [hash, setHash] = useState(match.params.hash);
    const apiUrl = "http://3.120.199.92:8080/Urls/";

    const onFinish = () =>  {
        //console.log("here ", props.email);
        //const data = {_id: null, URL:originalUrl, hash:"", userMail:props.email, date:moment().format("YYYY-MM-DD")};
        console.log("Called it");
        /*axios.post("http://18.197.151.94:8080/Urls/" + hash)    
        .then(res => {
          console.log(res);
          if (res.status === 200) {        
            //setAuthorization(true);
            //props.handleSuccessfulAuth(email);
            //history.push("/home")
            //setShortenedUrl(redirectionUrl + res.data.hash);
          } else {
            console.log(res)
          }
        })
        .catch(res => console.log("Error"));   */
      }
    window.open(apiUrl + hash);
    return(
    <div>
        <h1>Redirecting</h1>
    </div>
    );    
}