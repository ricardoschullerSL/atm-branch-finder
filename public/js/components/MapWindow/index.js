import React from "react";
import GoogleApiWrapper from "../GoogleApiWrapper/index.js";
import Map from "../Map/";
import Marker from "../Marker/";

export class MapWindow extends React.Component {
    render () {
        return (
            <Map google={this.props.google} zoom={14} >
                {this.props.locations.map((location, key) => {
                    return (<Marker key={key} position={location} /> );
                })}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey:"AIzaSyD5S_Y4geQ7mB8wkGu9JkQtbIP9gqda-ns"
})(MapWindow);