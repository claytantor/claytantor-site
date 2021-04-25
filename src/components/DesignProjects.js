import React from 'react';

//portfolio
import imgWearableSculpture from '../img/portfolio/wearable.png';
import imgVirarch from '../img/portfolio/virarch.png';
import imgDigitalArt from '../img/portfolio/digital_art.png';
import img3dDesign from '../img/portfolio/3d_design.png';
import imgHandwork from '../img/portfolio/handwork_art.png';

let DesignProjects = () => { 
    let projects = [
      {
        name: "Wearable Sculpture",
        image: imgWearableSculpture,
        link: "https://claytantor.wordpress.com/category/wearable-sculpture/"
      },
      {
        name: "Virtual Architecture",
        image: imgVirarch,
        link: "https://claytantor.wordpress.com/category/virtual-architecture/"
      }, 
      {
        name: "Digital Art",
        image: imgDigitalArt,
        link: "https://claytantor.wordpress.com/category/digital-art/"
      }, 
      {
        name: "3D Design",
        image: img3dDesign,
        link: "https://claytantor.wordpress.com/category/3d-design/"
      }, 
      {
        name: "Handwork",
        image: imgHandwork,
        link: "https://claytantor.wordpress.com/category/handwork/"
      },         
      
    ];
    const listItems = projects.map((item) =>
        <div className="project-list-li">
          <a href={item.link} target="new">
            <img className="project-img" src={item.image} alt={item.name} />
            <h5 className="mt-1">{item.name}</h5>
          </a>
        </div>
    );
    return(<>
      <div className="d-flex flex-wrap justify-content-center">{listItems}</div> 
    </>);
  };

  export default DesignProjects
  