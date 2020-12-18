import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
//components
import Bloglist from '../components/blogList';
import Layout from '../components/layout';
import Carouselhome from '../components/carouselHome';
//styles
import '../styles/styles.css';
//media-imgs
import autoLogo from '../media-imgs/autocad.png';
import redLogo from '../media-imgs/red-hat-linux.png';
import niagaLogo from '../media-imgs/niagara-framework.svg';
import tridiumLogo from '../media-imgs/tridium.svg';

const Index = () => {
    return (
        <Layout>
           <div className="homeContainer">
               <div className="carouselContainer">
                    <Carouselhome />
               </div>
               <div className="blogListCont">
                   <div className="contDiv40">
                        <p className="titleHome">Lastest Articles</p>
                        <Bloglist />
                    </div>
                    <div className="contDiv60">
                        <p className="titleHome rightAlign">Some technologies We work with:</p>
                        <ul className="ulTechListHome">
                            <li>
                                <img src={autoLogo} alt="AutoCAD professional Ana Echeverria" className="logoHome"/>
                            </li>
                            <li>
                                <img src={redLogo} alt="RedHat professional Ana Echeverria"  className="logoHome" />
                            </li>
                            <li>
                                <img src={tridiumLogo} alt="Tridium professional Ana Echeverria"  className="logoHome"/>
                            </li>
                            <li>
                                <img src={niagaLogo} alt="Niagara professional Ana Echeverria"  className="logoHome" />
                            </li>
                        </ul>
                    </div>
               </div>
           </div>
        </Layout>
    )
}

export default Index;