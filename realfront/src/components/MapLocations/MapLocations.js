import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MapLocations.css';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import StarRatingComponent from 'react-star-rating-component';

import mapStyles from "./mapStyles";

function Map(props) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  var points = props.locations
  console.log(points,"pontssssssssssssssssssssss")
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedLocation(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="custom-map-container">
      <script src="https://maps.googleapis.com/maps/api/js"></script>
     <div style={{position: "relative",width: "100%"}}>
    <GoogleMap
      defaultZoom={points[0].zoomlevel?points[0].zoomlevel:14}
      defaultCenter={{ lat: points[0].lat?points[0].lat:12.972442, lng: points[0].lng?points[0].lng:77.580643 }}
      // defaultOptions={{ styles: mapStyles }}
    >
      {points.map(Location => (
        <Marker
          key={Location.id}
          position={{
            lat: Location.lat,
            lng: Location.lng
          }}
          onClick={() => {
            setSelectedLocation(Location);
          }}
          // icon={{
          //   url: `https://commons.wikimedia.org/wiki/File:Breezeicons-actions-22-im-user-online.svg`,
          //   scaledSize: new window.google.maps.Size(25, 25)
          // }}
        />
      ))}

      {selectedLocation && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedLocation(null);
          }}
          position={{
            lat: selectedLocation.lat,
            lng: selectedLocation.lng
          }}
        >
          <div>
           

            <div className="cardinfowindow">
            <div className="container-mapinfowindow">
              
              <a href={'/projects/'+selectedLocation.id} className="mapprojectlink" target="_blank">
              <img src={selectedLocation.image} alt="" className="sideprojectimagestyleinfowindow"/>
              </a>
              
              <p class="top-left-mapinfowindow">{selectedLocation.status === "Ready Possession" ? "READY": "UNDER CONSTRUCTION"}</p>
              <p class="bottom-left-mapinfowindow">{selectedLocation.area}</p>
              </div>
              
              
              <div className="containerinfowindow">
                <div className="row">

                <div className="col-12" style={{textAlign:"left"}}>
                
                <a href={'/projects/'+selectedLocation.id} className="mapprojectlink" target="_blank">
                <div style={{color:"white",fontWeight:"bold"}}>{selectedLocation.project_name}</div>
                </a>
                </div>
               


                </div>

                <div className="row">
                  <div className="col-6" style={{textAlign:"left"}}>
                  <StarRatingComponent
                    name='projectrating' 
                    value={Math.round(selectedLocation.overallrating*100)/100} 
                    starCount={5} 
                    starColor='white' 
                    emptyStarColor='#696969'
                    editing={false} 
                />
                  </div>
                  
                  <div className="col-6" style={{textAlign:"right"}}>
                <div className="sideprojectreviewrowinfowindow">{Math.round(selectedLocation.overallrating*100)/100} ({selectedLocation.no_of_review} reviews)</div>
                
                
                  </div>
                </div>


              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    </div>
    </div>  
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapLocations(props) {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <MapWrapped
        locations={props.locations}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAWuh3j8uE0OrhRkqenhQFP696-Xy0ecMQ`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}






























// import React from 'react';
// import PropTypes from 'prop-types';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// const MapLocations = (props) => {
//   let [mapConfigurations, setMapConfigurations] = React.useState({
//     showingInfoWindow: true,
//     activeMarker: {},
//     selectedPlace: {}
//   });

//   var points = props.locations
//   const onMarkerClick = (newProps, marker) => {
//     console.log("you have clicked marker", marker.name);
//     mapConfigurations.selectedPlace = marker.name;
//   };

//   if (!props.google) {
//     return <div>Loading...</div>;
//   }
  

//   return (
//     <div className="custom-map-container">
//       <div style={{position: "relative",width: "100%",height: "400px"}}>
//       <Map
//         style={{
//           minWidth: '200px',
//           minHeight: '140px',
//           width: '100%',
//           height: '100%',
//           position: 'relative'
//         }}
//         initialCenter={{
//           lat: 12.972442, 
//           lng: 77.580643
//         }}
//         google={props.google}
//         zoom={14}
//       >
//         {points.map(coordinates => (
//           <Marker
//             position={{ lat: coordinates.lat, lng: coordinates.lng }}
//             onClick={onMarkerClick}
//             // icon={{
//             //   url: 'https://res.cloudinary.com/mybukka/image/upload/c_scale,r_50,w_30,h_30/v1580550858/yaiwq492u1lwuy2lb9ua.png',
//             // anchor: new google.maps.Point(32, 32), // eslint-disable-line
//             // scaledSize: new google.maps.Size(30, 30)  // eslint-disable-line
//             // }}
//             name={coordinates.title}
//           />))}
//         <InfoWindow
//           marker={mapConfigurations.activeMarker}
//           visible={mapConfigurations.showingInfoWindow}
//         >
//           <div>
//             <h1>{mapConfigurations.selectedPlace.name}</h1>
//           </div>
//         </InfoWindow>
//       </Map>
//       </div>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyAWuh3j8uE0OrhRkqenhQFP696-Xy0ecMQ"),
//   v: '3'
// })(MapLocations);

// MapLocations.propTypes = {
//   google: PropTypes.shape({}).isRequired,
// };