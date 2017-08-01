import React from "react";
import { GOOGLE_API_KEY } from "../GoogleApiWrapper/googleapikey.js";
import GoogleApiWrapper from "../GoogleApiWrapper/index.js";
import Map from "../Map/";
import Marker from "../Marker/";

export class MapWindow extends React.Component {
    render () {
        return (
            <Map google={this.props.google} zoom={14} mapRef={this.props.mapRef} 
                map={this.props.map} locations={this.props.locations} >
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey:GOOGLE_API_KEY
})(MapWindow);