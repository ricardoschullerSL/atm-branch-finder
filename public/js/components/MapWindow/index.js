import React from "react";
import {connect} from "react-redux";
import styles from "./mapwindow.css";

@connect((store) => {
    return {
        latitude: store.mapWindow.latitude,
        longitude: store.mapWindow.longitude
    }
})
export default class MapWindow extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render () {
        const mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCoqvtBOBRsDVQBSOdGZik-ABuVWg_xeZ4&q=" + this.props.latitude + ", " + this.props.longitude;
        return (
            <div className="mapWindow">This is the map window.
                <div>
                    <iframe
                      width="600"
                      height="450"
                      frameBorder="0" style={{border:0}}
                      src={mapSrc} allowFullScreen>
                    </iframe>
                </div>
            </div>
        )
    }
}