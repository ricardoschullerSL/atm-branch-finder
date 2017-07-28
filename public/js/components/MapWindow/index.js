import React from "react";
import { GOOGLE_API_KEY } from "../GoogleApiWrapper/googleapikey.js";
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
    apiKey:process.env.GOOGLE_API_KEY || GOOGLE_API_KEY
})(MapWindow);