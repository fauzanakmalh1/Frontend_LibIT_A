import React, { useState } from "react";
import axios from "axios";
import qs from "qs";

export default function Home() {
  const [value, setValue] = useState({
    codes: [],
    title: "",
    description: "",
    author: "",
    url: "",
    download: "",
    language: "",
    framework: "",
    year: "",
  });

  const getData = async () => {
    // const BASE_URL = "http://localhost:3030/repo-code/query";
    // const BASE_URL = "https://qrary-fuseki-service.herokuapp.com/repo-code/query";
    const BASE_URL = " https://cb8873c5f19f.ngrok.io/repo-code/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX data: <https://github.com/repo#>
      PREFIX id: <https://github.com/akun#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT ?title ?description ?author ?url ?download ?language ?framework ?year
      WHERE
      {
        ?id data:title ?title ;
            data:description ?description ;
            data:author ?author ;
            data:url ?url ;
            data:download ?download ;
            data:hasLanguage ?nameLanguage ;
            data:hasFramework ?nameFramework ;
            data:hasYear ?nameYear .
            
            ?nameLanguage data:language ?language .
            ?nameFramework data:framework ?framework .
            ?nameYear data:year ?year .
            
            FILTER (
              regex(?id, "^${value.input}", "i") ||
              regex(?title, "^${value.input}", "i") ||
              regex(?description, "^${value.input}", "i") ||
              regex(?author, "^${value.input}", "i") ||
              regex(?url, "^${value.input}", "i") ||
              regex(?download, "^${value.input}", "i") ||
              regex(?language, "^${value.input}", "i") ||
              regex(?framework, "^${value.input}", "i") ||
              regex(?year, "^${value.input}", "i")
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
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
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

  const getAllData = async () => {
    // const BASE_URL = "http://localhost:3030/repo-code/query";
    const BASE_URL = " https://cb8873c5f19f.ngrok.io/repo-code/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX data: <https://github.com/repo#>
      PREFIX id: <https://github.com/akun#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT ?title ?description ?author ?url ?download ?language ?framework ?year
      WHERE
      {
        ?id data:title ?title ;
            data:description ?description ;
            data:author ?author ;
            data:url ?url ;
            data:download ?download ;
            data:hasLanguage ?nameLanguage ;
            data:hasFramework ?nameFramework ;
            data:hasYear ?nameYear .
            
            ?nameLanguage data:language ?language .
            ?nameFramework data:framework ?framework .
            ?nameYear data:year ?year .
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
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
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
      id: index,
      title: codes.title.value,
      description: codes.description.value,
      author: codes.author.value,
      url: codes.url.value,
      download: codes.download.value,
      language: codes.language.value,
      framework: codes.framework.value,
      year: codes.year.value,
    };
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      input: event.target.value,
    });
  };

  const content = value.codes.map((code) => (
    <div className="codes_list_container text-justify">
      <ul>
        <li key={code.id}>
          <div className="d-flex flex-row align-items-start justify-content-start"></div>
          <div className="code_info"></div>
          <div className="code_title">
            {code.title}
            <br />
          </div>
          <div className="code_language">
            Language : {code.language}
            <br />
          </div>
          Framework : {code.framework}
          <br />
          Year : {code.year}
          <br />
          Description : {code.description}
          <br />
          Author : {code.author}
          <br />
          URL :{" "}
          <a href={code.url} target="_blank" rel="noreferrer">
            {code.url}
          </a>
          <br />
          <a href={code.download} rel="noreferrer">
            <button type="button" className="code_form_button button mt-2">
              <span>
                <img
                  src="/images/img-download.svg"
                  className="img-download mr-2"
                  alt="Download"
                />
                Download Here
              </span>
            </button>
          </a>
          <br />
          <hr className="line-style"></hr>
          <div className="margin-style"></div>
        </li>
      </ul>
      <ul className="codes_list"></ul>
    </div>
  ));

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
                    <span className="nav_about_text ml-4">
                      <a href="/About">About</a>
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
                          <form
                            className="code_form"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <div className="align-items-center justify-content-center">
                              <div className="row">
                                <div className="col-md-8">
                                  <div className="code_form_inputs align-items-center justify-content-center">
                                    <input
                                      type="text"
                                      className="code_form_input code_form_input_repo"
                                      placeholder="Search Repository"
                                      setvalue={value.input}
                                      onChange={handleChange}
                                      required="required"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <button
                                    type="button"
                                    className="code_form_button button"
                                    value="Search"
                                    onClick={getData}
                                  >
                                    <span>Search</span>
                                  </button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 mt-4">
                                  <button
                                    type="button"
                                    className="code_form_button button-get-all"
                                    value="Search"
                                    onClick={getAllData}
                                  >
                                    <span>Show All Data</span>
                                  </button>
                                </div>
                              </div>
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

      {/* Codes */}
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
                  <h1 className="result-text">Result</h1>
                  <div className="margin-style"></div>
                </div>
                <div>
                  {(() => {
                    if (content.length === 0) {
                      return (
                        <div>
                          <img
                            src="/images/img-notfound.svg"
                            className="img-notfound mb-4"
                            alt="Not Found"
                          />
                          <p className="text-notfound">
                            Sorry we can’t find what are you looking for
                          </p>
                          <p className="text-notfound">
                            Please check your keyword
                          </p>
                        </div>
                      );
                    } else {
                      return <div>{content}</div>;
                    }
                  })()}
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
