import React from 'react';

//social
import imgTwitter from '../img/twitter-256.png';
import imgOpenSea from '../img/opensea-256.png';
import imgLinkedIn from '../img/in-logo-256.png';
import imgGithub from '../img/octocat-256.png';
import imgInsta from '../img/insta-256.png';
import imgMedium from '../img/medium-256.png';


let SocialLinks = () => { 
    let items = [
      {
        name: "Twitter",
        image: imgTwitter,
        link: "https://twitter.com/claytantor"
      },
      {
        name: "Medium",
        image: imgMedium,
        link: "https://claytantor.medium.com"
      },
      {
        name: "OpenSea",
        image: imgOpenSea,
        link: "https://opensea.io/accounts/claytantor"
      }, 
      {
        name: "LinkedIn",
        image: imgLinkedIn,
        link: "https://www.linkedin.com/in/claygraham"
      }, 
      {
        name: "Github",
        image: imgGithub,
        link: "https://github.com/claytantor"
      }, 
      // {
      //   name: "Instagram",
      //   image: imgInsta,
      //   link: "https://www.instagram.com/claytantor"
      // },         
      
    ];
    const listItems = items.map((item) =>
        <div className="social-list-li">
          <a href={item.link} target="_new">
            <img className="social-img" src={item.image} alt={item.name} />
            <span>{item.name}</span>
          </a>
        </div>
    );
    return(<>
      <div className="d-flex flex-wrap justify-content-center mb-3">{listItems}</div> 
    </>);
  };

export default SocialLinks