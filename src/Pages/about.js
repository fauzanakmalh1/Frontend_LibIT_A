import React, {} from "react";

export default function About() {
  
  return (
    <div className="super_container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="header_content d-flex flex-row align-items-center justify-content-center">
                {/* Logo */}
                <div className="logo mr-auto">
                  <div className="d-flex flex-row align-items-end justify-content-start">
                    <span className="logo_text logo_text_style">
                      <a href="/">LibIT!</a>
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                <div className="d-flex flex-row align-items-end justify-content-end">
                    <span className="nav_about_text">
                      <a href="/Advanced">Advanced</a>
                    </span>
                    <span className="nav_about_text active ml-4">
                      <a href="/About">About</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* About */}
      <div className="about" id="about">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title">
                <h1>About</h1>
              </div>
            </div>
          </div>
          <div className="row about_row">
            {/* About Post */}
            <div className="col-xl-4 col-md-6">
              <div className="about_post image_top">
                <div className="about_post_image">
                  <img src="images/img-semantic-web.png" alt="" />
                </div>
                <div className="about_post_content">
                  <div className="about_post_title">
                    <span>Semantic Web?</span>
                  </div>
                  <div className="about_post_text">
                    <p>
                      The Semantic Web is an extension of the World Wide Web
                      through standards set by the World Wide Web Consortium
                      (W3C). The goal of the Semantic Web is to make Internet
                      data machine-readable. To enable the encoding of semantics
                      with the data, technologies such as Resource Description
                      Framework (RDF) and Web Ontology Language (OWL) are used.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* About Post */}
            <div className="col-xl-4 col-md-6">
              <div className="about_post image_bottom d-flex flex-column align-items-start justify-content-start">
                <div className="about_post_content order-md-1 order-2">
                  <div className="about_post_title">
                    <span>What is LibIT?</span>
                  </div>
                  <div className="about_post_text">
                    <p>
                      LibIT! is a website that you can help you to find project
                      references with many programming language and framework
                      development, we had choosen the best repositories from
                      github and other sources only for you. This website build
                      with ExpressJS, ReactJS and SPARQL.
                    </p>
                  </div>
                </div>
                <div className="about_post_image order-md-2 order-1">
                  <img src="images/img-about-lib-it.jpg" alt="" />
                </div>
              </div>
            </div>
            {/* about Post */}
            <div className="col-xl-4 col-md-6 margin-top-style">
              <div className="about_post image_top">
                <div className="about_post_image">
                  <img src="images/img-about-developer.png" alt="" />
                </div>
                <div className="about_post_content">
                  <div className="about_post_title">
                    <span>Developer?</span>
                  </div>
                  <div className="about_post_text">
                    <p>
                      140810180005 - Fauzan Akmal Hariz <br />
                      140810180013 - Alvin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div
          className="background_image"
          style={{ backgroundImage: "url(images/img-footer.png)" }}
        />
        <div className="footer_content">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                {/* Logo */}
                <div className="logo">
                  <div className="d-flex flex-row align-items-end justify-content-start">
                    <p className="logo_text">LibIT!</p>
                  </div>
                </div>
                {/* Footer Social */}
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bar">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="copyright text-center">
                  Copyright &copy; All rights reserved - LibIT!
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
