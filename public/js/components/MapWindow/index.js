import React from "react";



export default class MapWindow extends React.Component {
    
    render () {
        const mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCoqvtBOBRsDVQBSOdGZik-ABuVWg_xeZ4&q=" + this.props.latitude + ", " + this.props.longitude;
        return (
            <div className="mapWindow">
                <div>
                    <iframe
                    className="mapView"
                      frameBorder="0" 
                      src={mapSrc} allowFullScreen>
                    </iframe>
                </div>
            </div>
        )
    }
}