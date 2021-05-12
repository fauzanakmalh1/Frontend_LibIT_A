import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import "./App.css";
import "./styles/main_styles.css";
import "./styles/responsive.css";

function App() {
  const [value, setValue] = useState({
    codes: [],
    input: "",
  });

  const getDataRepo = async () => {
    const BASE_URL = "http://localhost:3030/code/query";
    // API server : https://lib-it.herokuapp.com/code/query
    // API local : http://localhost:3030/code/query

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX data:<https://github.com/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
      SELECT ?id ?title ?language ?framework ?date ?description ?author ?url
      WHERE{
          ?sub rdf:type data:code ;
          OPTIONAL {?sub data:id ?id ;}
          OPTIONAL {?sub data:title ?title ;}
          OPTIONAL {?sub data:language ?language ;}
          OPTIONAL {?sub data:framework ?framework ;}
          OPTIONAL {?sub data:date ?date ;}
          OPTIONAL {?sub data:description ?description ;}
          OPTIONAL {?sub data:author ?author ;}
          OPTIONAL {?sub data:url ?url .}
          
          FILTER (
            regex(?id, "^${value.input}", "i") ||
            regex(?title, "^${value.input}", "i") ||
            regex(?language, "^${value.input}", "i") ||
            regex(?framework, "^${value.input}", "i") ||
            regex(?date, "^${value.input}", "i") ||
            regex(?description, "^${value.input}", "i") ||
            regex(?author, "^${value.input}", "i") ||
            regex(?url, "^${value.input}", "i")
          )
      }`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((codes, index) =>
        formatter(codes, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getDataSorting = async () => {
    const BASE_URL = "http://localhost:3030/code/query";
    // API server : https://test.herokuapp.com/code/query
    // API local : http://localhost:3030/code/query

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX data:<https://github.com/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
      SELECT ?id ?title ?language ?framework ?date ?description ?author ?url
      WHERE{
          ?sub rdf:type data:code ;
          OPTIONAL {?sub data:id ?id ;}
          OPTIONAL {?sub data:title ?title ;}
          OPTIONAL {?sub data:language ?language ;}
          OPTIONAL {?sub data:framework ?framework ;}
          OPTIONAL {?sub data:date ?date ;}
          OPTIONAL {?sub data:description ?description ;}
          OPTIONAL {?sub data:author ?author ;}
          OPTIONAL {?sub data:url ?url .}
          
      }
      ORDER BY (?framework)`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((codes, index) =>
        formatter(codes, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatter = (codes, index) => {
    return {
      d: index,
      title: codes.title.value,
      language: codes.language.value,
      framework: codes.framework.value,
      date: codes.date.value,
      description: codes.description.value,
      author: codes.author.value,
      url: codes.url.value,
    };
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      input: event.target.value,
    });
  };

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
                    <span className="logo_text">
                      <a href="/">LibIT!</a>
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="d-flex flex-row align-items-end justify-content-end">
                    <span className="nav_about_text">
                      <a href="#about">About</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Home */}
      <div className="home" id="home">
        {/* Home Slider */}
        <div className="home_slider_container">
          <div className="owl-carousel owl-theme home_slider">
            {/* Slide */}
            <div className="slide">
              <div
                className="background_image"
                style={{ backgroundImage: "url(images/img-home.jpg)" }}
              />
              <div className="home_container">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="home_content">
                        <div className="home_title_container text-center">
                          <div className="home_title islive text-center">
                            <h1>
                              Lib <span>IT!</span>
                            </h1>
                          </div>
                        </div>
                        <div className="code_form_container">
                          <form className="code_form" onSubmit={e => e.preventDefault()}>
                            <div className="d-flex flex-md-row flex-column align-items-start justify-content-md-between justify-content-start">
                              <div className="code_form_inputs d-flex flex-row align-items-start justify-content-between">
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  className="code_form_input"
                                  placeholder="Search title, language, or framework of source code"
                                  required="required"
                                />
                              </div>
                              <button
                                type="button"
                                className="code_form_button button"
                                onClick={getDataRepo}
                              >
                                <span>Search</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* codes */}
      <div className="codes">
        <div className="container">
          <div className="row row-lg-eq-height">
            {/* Add */}
            <div className="col-lg-4 order-lg-1 order-2 codes_col">
              <div className="extra d-flex flex-column align-items-center justify-content-between">
                <div
                  className="background_image"
                  style={{ backgroundImage: "url(images/img-result.jpg)" }}
                />
                <div className="extra_frame" />
                <div className="extra_text">Source Code</div>
                <div className="extra_title_container">
                  <div className="extra_year">2021</div>
                  <div className="extra_title">Result</div>
                  <div className="extra_subtitle">Repositories</div>
                </div>
              </div>
            </div>
            {/* Codes Content */}
            <div className="col-lg-8 order-lg-2 order-1">
              <div className="codes_content">
                <div className="section_title">
                  <h1>Result</h1>
                  <div className="margin-style"></div>
                  <button
                    className="code_form_button button"
                    onClick={getDataSorting}
                  >
                    <span>Show Sort Framework</span>
                  </button>
                  <div className="margin-style"></div>
                </div>
                <div className="codes_list_container">
                  <ol>
                    {value.codes.map((item, i) => (
                      <li key={i}>
                        <div className="d-flex flex-row align-items-start justify-content-start"></div>
                        <div className="code_info"></div>
                        <div className="code_title">
                          {item.title}
                          <br />
                        </div>
                        <div className="code_language">
                          Language : {item.language}
                          <br />
                        </div>
                        Framework : {item.framework}
                        <br />
                        Date : {item.date}
                        <br />
                        Description : {item.description}
                        <br />
                        Author : {item.author}
                        <br />
                        URL : <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
                        <br />
                        <div className="margin-style"></div>
                      </li>
                    ))}
                  </ol>
                  <ul className="codes_list"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    The Semantic Web is an extension of the World Wide Web through standards set by the World Wide Web Consortium (W3C). The goal of the Semantic Web is to make Internet data machine-readable. To enable the encoding of semantics with the data, technologies such as Resource Description Framework (RDF) and Web Ontology Language (OWL) are used.
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
                    LibIT! is a website that you can help you to find project references with many programming language and framework development, we had choosen the best repositories from github and other sources only for you. This website build with ExpressJS, ReactJS and SPARQL.
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
                      140810180005 - Fauzan Akmal Hariz <br/>
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
                  Copyright © All rights reserved | This template is made by Colorlib
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
