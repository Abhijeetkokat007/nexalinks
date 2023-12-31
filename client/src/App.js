import React, { useState, useEffect } from 'react';
import './App.css';
import copyicon from './copyicon.png';
import axios from 'axios';

function App() {
  const [user, setUser] = useState("");
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [name, setName] = useState("");

  const generateLink = async () => {
    try {
      const response = await axios.post('/link', {user, url, slug });
      const shortlink = response?.data?.data?.shortUrl;
      setShortUrl(shortlink);
    } catch (error) {
      console.error("Error generating link:", error);
    }
  }

  const copyShorturl = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("URL copied");
  }
  const localStoragedata = JSON.parse(localStorage.getItem("nexalinkcustomer") || "{}");
  const loadurl = async () => {
    console.log(localStoragedata._id)
    try {
      const response = await axios.get(`/api/links`);
      setLinks(response?.data?.data);
    } catch (error) {
      console.error("Error loading links:", error);
    }
    
 setName(localStoragedata.name);
 setUser(localStoragedata?._id);
  }

  useEffect(() => {
    loadurl();
    const storageUser = JSON.parse(localStorage.getItem("nexalinkcustomer") || "{}");
    console.log(storageUser);

    if (!storageUser?.email) {
      // showToast('please Account login !', 'alert', 6000);
      alert("Please Account login !");
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <div className=' main-heading'>
      <h1 ><span className='colour-dark'>NEXA</span>LINKS</h1>
      <span>Hello 👋🏻, {name}</span>
      </div>
      <div className='app-container'>
        <div className='link-generation-card'>
          <h2 >Link Generation</h2>
         
          <input
            type='text'
            placeholder='URL'
            className='url-input'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type='text'
            placeholder='Slug (optional)'
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
                <div className='all-link-card'>
                 
                  <p>URL : {url}</p>
                 <p>SLUG : http://AK/nexalinks/{slug}</p>
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
