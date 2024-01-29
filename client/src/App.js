import React, { useState, useEffect } from 'react';
import './App.css';
import copyicon from './copyicon.png';
import axios from 'axios';

function App() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [links, setLinks] = useState([]);
  

  const generateLink = async () => {
    try {
      const response = await axios.post('/api/link', {user, url, slug });
      const shortlink = response?.data?.data?.shortUrl;
      setShortUrl(response?.data?.data?.shortUrl);
    } catch (error) {
      console.error("Error generating link:", error);
    }
  }

 

  const copyShorturl = () => {
    window.navigator.clipboard.writeText(shortUrl);
    alert("URL copied");
  }
  const localStoragedata = JSON.parse(localStorage.getItem("nexalinkcustomer") || "{}");

  const loadurl = async () => {
    console.log(localStoragedata._id)
    try {
      const response = await axios.get(`/api/fetch/links`);
      setLinks(response?.data?.data);
    } catch (error) {
      console.error("Error loading links:", error);
    }

    localStoragedata? setName(localStoragedata.name) : setName("asdfghjk");
    localStoragedata? setUser(localStoragedata?._id) : setUser('1234567890');
 
  }

  useEffect(() => {
    loadurl();
    alert("all Links loaded")
    const storageUser = JSON.parse(localStorage.getItem("nexalinkcustomer") || "{}");
    console.log(storageUser);

    // if (!storageUser?.email) {
    //   // showToast('please Account login !', 'alert', 6000);
    //   alert("Please Account login !");
    //   window.location.href = "/login";
    // }
  }, []);

  console.log("user:", user) ;

  return (
    <>
      <div className=' main-heading'>
      <h1 ><span className='colour-dark'>NEXA</span>LINKS</h1>
      <span>Hello 👋🏻, user {name}</span>
      </div>
      <div className='app-container'>
        <div className='link-generation-card'>
          <h2 >Link Generation</h2>
         
          <input
            type='text'
            placeholder='Enter URL'
            className='url-input'
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type='text'
            placeholder='Enter Short Slug (optional)'
            className='url-input'
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <div className='shorturl-container'>
            <input
              type='text'
              placeholder='Short URL'
              className='short-url-input'
              value={shortUrl}
              disabled
            />
            <img src={copyicon} onClick={copyShorturl} className='coyp-icon' alt='Copy Icon' />
          </div>
          <button className='btn url-input' onClick={generateLink}>Generate Short URL</button>
        </div>
        <div>

        <h2>All Links</h2>
        <div className='all-link-container'>
          
          {
            links?.map((linkdata, i) => {
               const { url, slug, click} = linkdata;
               return(
                <div className='all-link-card' key='i'>
                 <p>URL : {url}</p>
                 <p >SLUG : https://nexalinks.onrender.com/ak/{slug}</p>
                 <p>Clicks : {click}</p>
                </div>
               )
            })
          }
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
