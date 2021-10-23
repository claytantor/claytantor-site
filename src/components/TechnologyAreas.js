import React from 'react';
import { MapPin, Mail, Box, UploadCloud, CloudLightning, Link } from 'react-feather';


let TechnologyAreas = () => { 


    return (<>
    
        <div class="d-flex flex-wrap justify-content-center">
                

            <div className="p-2 m-2 border-white technology-list-li">
                <a href="https://claytantor.wordpress.com/category/cloud-applications/" target="new">
                    <div className="mt-3"><UploadCloud color="white" size={48}/></div>
                    <h4 className="section-tech">Cloud Applications</h4>
                    <p className="text-white">Creating cloud native applications means getting the value out quickly.</p>  
                </a>        
            </div>

            <div className="p-2 m-2 border-white technology-list-li">
                <a href="https://claytantor.wordpress.com/category/cloud-devops/" target="new">
                    <div className="mt-3"><CloudLightning color="white" size={48}/></div>
                    <h4 className="section-tech">Cloud DevOps</h4>
                    <p className="text-white">Empower the people who wrote the software to help it to have a healthy life.</p> 
                </a>                
            </div>

            <div className="p-2 m-2 border-white technology-list-li">
                <a href="https://claytantor.wordpress.com/category/ai-and-big-data/" target="new">
                    <div className="mt-3"><Box color="white" size={48}/></div>
                    <h4 className="section-tech">Artificial Intelligence and Big Data</h4>
                    <p className="text-white">When problems are large we break them down so many hands can make the work lighter.</p>   
                </a>             
            </div>

            <div className="p-2 m-2 border-white technology-list-li">           
                <a href="https://claytantor.wordpress.com/category/blockchain/" target="new">
                    <div className="mt-3"><Link color="white" size={48}/></div>
                    <h4 className="section-tech">Blockchain</h4>
                    <p className="text-white">Blockchain technology has the potential to revolutionise distributed truth by enabling faster, more transparent and cost-effective cross-border state.</p>                
                </a>
            </div>

        </div>    
    
    
    </>);

};

export default TechnologyAreas;




      
      