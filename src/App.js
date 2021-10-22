import React from 'react';

import SocialLinks from './components/SocialLinks'
import PayBitcoin from './components/PayBitcoin'
import DesignProjects from './components/DesignProjects'
import TechnologyAreas from './components/TechnologyAreas'
import CopyClipboard from './components/CopyClipboard'

import './App.css';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}


let Home = () => {

  let currentYear = () => {
    let d = new Date(); 
    return d.getFullYear(); 
  };

  return (
    <>

      <section className="container">
        <div className="bg-dark text-white d-flex flex-wrap justify-content-between py-3">
          <a href="/" className="d-flex align-items-left mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span className="text-white word-logo">@claytantor</span>
          </a>

          <ul className="nav nav-pills mr-2">
            <li className="nav-item"><a href="/" className="nav-link active">Home</a></li>
            <li className="nav-item"><a href="https://claytantor.wordpress.com" className="nav-link">Blog</a></li>
          </ul>
        </div>
      </section>


      <header>
        <div className="header-content container d-inline-flex p-2 justify-content-end bd-highlight">
          <div className="p-2">
            <h1>Technology, Design, Doing</h1>
            <p>Clay Graham is a software architect, designer of virtual and real things, artist, and lifelong maker. He is self motivated, passionate and driven towards seeing possibilities become realities. Doing is essential to Clay's ethos, to him it is what differentiates those who make a difference in the world from those who dream.</p>
          </div>
        </div>
      </header>

      <section className="section-about text-white" id="about">
        <div className="container container-section">
          <div className="row">
            <div className="text-center p-3">
              <h2 className="section-heading">Actions speak louder than words.</h2>
              <p className="text-faded about-quote"><em>"It is important for me to lead by doing. You can't really make something happen unless you are willing to understand it authentically, capable of going beyond the surface and into the intimate. Only by comprehending the truth in the details can something be transformed from an idea into a reality."</em></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-skills text-white" id="skills">
        <div className="row">
          <div className="col-lg-12 text-center p-3">
            <h2 className="section-heading">Technology</h2>

            <TechnologyAreas/>

          
          </div>   
        </div>     
        
      
      </section>

      <section className="section-design text-white" id="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center p-3">
              <h2 className="section-heading">Design</h2>
              <DesignProjects/>
            </div>
          </div>
        </div>
      </section>

      <section className="section-social text-white" id="social">
        <div className="container container-section">
          <div className="row">
            <div className="col-lg-12 text-center p-3 ">
              <h2 className="section-heading">Doing</h2>
              <p>If you are trying to figure out if my words match my deeds, some of this may help you. If you don't care about me and came here for another reason, then I hope this helps you anyway.</p>
            </div>
            <div className="col-lg-12 text-center">
              <SocialLinks/>
            </div>
          </div>
        </div>
      </section>

      <section className="section-bitcoin text-white" id="bitcoin">
        <div className="container container-section">
          <div className="row">
            {/* <div className="col-lg-12 text-center p-3 ">
              <CopyClipboard/>
            </div> */}
            <div className="col-lg-12 text-center">
              <PayBitcoin/>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer mt-auto py-3 bg-dark text-white">
        <div className="container">
          <span className="text-white">&copy; Copyright {currentYear()}, Clay Graham (aka @claytantor)</span>
        </div>
      </footer>
    </>)
};


export default App;
