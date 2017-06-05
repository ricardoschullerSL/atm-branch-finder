import React from "react";
import styles from "./mapwindow.css";

export default class MapWindow extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render () {
        return (<div className="mapWindow">This is the map window.
        <div>
            <iframe
  width="600"
  height="450"
  frameBorder="0" style={{border:0}}
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCoqvtBOBRsDVQBSOdGZik-ABuVWg_xeZ4
    &q=52.3880669, 4.6386508" allowFullScreen>
</iframe>
        </div>
        </div>
        )
    }
}