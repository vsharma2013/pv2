import React, { Component } from "react";
import ReactDOM from "react-dom";
import Downshift from "downshift";
import axios from "axios";
import Building from '../../assets/icons/building.png';
import Pin from '../../assets/icons/location.png'
import "./projectsearch.css";
import searchIcon from '../../assets/icons/search.png';

class ProjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [],
      search_id:0,
      search_name:" ",
      location:[]
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



  fetchProject(project) {
    
            //dev
        // const projectURL = `http://localhost:8081/projects`;
        //aws
        const projectURL =`https://www.propviewz.com/be/projects`; 
    axios.get(projectURL).then(response => {
      this.setState({ project: response.data });
    });
    // const locationURL =`https://www.propviewz.com/be/fetch_search`; 
    // axios.post(locationURL).then(response2 => {
    //   this.setState({ location: response2.data });
    // });
  }

  render() {
      console.log("SEARCH")
      var stringSimilarity = require('string-similarity')
 
      var similarity; 
      console.log(this.state)
      console.log(this.props)
      // console.log(similarity)
      return (
 <div>
      <Downshift className="downmenu"
        onChange={this.props.downshiftOnChange}
        itemToString={item => (item ? item.project_name :"")}
        // itemToString={item => (item ? item.Location : "")}
      > 
      
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          getLabelProps
        }) => (
          <div>
            <label
              style={{ marginTop: "1rem", display: "block" }}
              {...getLabelProps()}
            >
            </label>
            {""}
            <br />
            <input className="project_searchinput"
              {...getInputProps({
                placeholder: "Search projects",
                onChange: this.inputOnChange
              })}
            /><img className="project_search_icon" src={searchIcon}/>
            {!this.state.location.Location && isOpen ? (
              <div className="downshift-project-dropdown">
                Projects
                {this.state.project
                  .filter(
                    item =>
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
                      className="dropdown-project-item"
                      {...getItemProps({ key: index, index, item })}
                      // style={{
                      //   backgroundColor:
                      //     highlightedIndex === index ? "lightgray" : "white",
                      //   fontWeight: selectedItem === item ? "bold": "normal"
                      // }}
                    >
                      <img style={{'marginRight': '3%', 'width': '1vw'}} src={Building}/>
                      {item.project_name}
                      
                  
                    </div>
                  ))}
              </div>
            ) : null}

          </div>
        )}

      </Downshift>
  </div>

    );
  }
}

export default ProjectSearch;

