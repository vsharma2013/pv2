import React, { Component } from "react";
import ReactDOM from "react-dom";
import Downshift from "downshift";
import axios from "axios";
import Building from "../../assets/icons/building.png";
import Pin from "../../assets/icons/location.png";
import searchIcon from "../../assets/icons/search.png";
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [],
      location: [],
    };

    this.fetchProject = this.fetchProject.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
  }

  inputOnChange(event) {
    if (!event.target.value) {
      return;
    }
    this.fetchProject(event.target.value);
  }

  downshiftOnChange(selectedProject) {
    console.log("!!!!!!");
    console.log(selectedProject);
    // alert(`your favourite project is ${selectedProject.project_id}`);
    // href={'/projects/'+project_id1}
    if (selectedProject.project_id) {
      console.log("!!!!ddddd!!");
      console.log(selectedProject);
      let id = selectedProject.project_id;
      window.location.href = "/projects/" + id;
    } else {
      console.log("LOCATION PAGE");
      let id = selectedProject.Location;
      window.location.href = "/Location/" + id;
    }
  }

  fetchProject(project) {
    //dev
    // const projectURL = `http://localhost:8081/projects`;
    //aws
    const projectURL = `https://www.propviewz.com/be/projects`;
    axios.get(projectURL).then((response) => {
      this.setState({ project: response.data });
    });
    const locationURL = `https://www.propviewz.com/be/fetch_search`;
    axios.post(locationURL).then((response2) => {
      this.setState({ location: response2.data });
    });
  }

  render() {
    console.log("SEARCH");
    var stringSimilarity = require("string-similarity");

    var similarity;
    console.log(this.state);
    console.log(this.props);
    // console.log(similarity)
    return (
      <div>
        <Downshift
          className="downmenu"
          onChange={this.downshiftOnChange}
          itemToString={(item) => (item ? item.project_name : "")}
          itemToString={(item) => (item ? item.Location : "")}
        >
          {({
            selectedItem,
            getInputProps,
            getItemProps,
            highlightedIndex,
            isOpen,
            inputValue,
            getLabelProps,
          }) => (
            <div>
              <label style={{ display: "block" }} {...getLabelProps()}></label>
              {""}

              <input
                className="searchinput"
                {...getInputProps({
                  placeholder: "Search projects, locations",
                  onChange: this.inputOnChange,
                })}
              />
              <div className="search-result-wrapper">
                {!this.state.location.Location && isOpen ? (
                  <div className="downshift-dropdown">
                    Projects
                    {this.state.project
                      .filter(
                        (item) =>
                          !inputValue ||
                          item.project_name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())

                        //   ||
                        //  ( similarity = stringSimilarity.compareTwoStrings(item.project_name.toLowerCase(), inputValue.toLowerCase()) )
                        //  ||item.project_name
                        // .toLowerCase()
                        // .includes(inputValue.toLowerCase())
                      )
                      .slice(0, 10)
                      .map((item, index) => (
                        <div
                          className="dropdown-item"
                          {...getItemProps({ key: index, index, item })}
                          // style={{
                          //   backgroundColor:
                          //     highlightedIndex === index ? "lightgray" : "white",
                          //   fontWeight: selectedItem === item ? "bold": "normal"
                          // }}
                        >
                          <img
                            style={{ marginRight: "3%", width: "1vw" }}
                            src={Building}
                          />
                          {item.project_name}
                        </div>
                      ))}
                  </div>
                ) : null}
                {!this.state.project.project_name && isOpen ? (
                  <div className="downshift-dropdown1">
                    Locations
                    {this.state.location
                      .filter(
                        (item) =>
                          !inputValue ||
                          item.Location.toLowerCase().includes(
                            inputValue.toLowerCase()
                          )
                      )
                      .slice(0, 10)
                      .map((item, index1) => (
                        <div
                          className="dropdown-item1"
                          {...getItemProps({ key: index1, index1, item })}
                          // style={{
                          //   backgroundColor: 'white'
                          //   //   highlightedIndex === index1 ? "lightgray" : "white",
                          //   // fontWeight: selectedItem === item ? "bold" : "normal"
                          // }}
                        >
                          <img
                            style={{ marginRight: "3%", width: "1vw" }}
                            src={Pin}
                          />
                          {item.Location}
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default Search;
