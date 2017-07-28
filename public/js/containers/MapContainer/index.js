import React from "react";
import { connect } from "react-redux";
import MapWindow from "../../components/MapWindow";
import styles from "./mapwindow.css";

@connect((store) => {
    return {
        locations:store.infoWindow.locations
    };
})
export default class MapContainer extends React.Component {
    
    render() {
        return (<MapWindow {...this.props} />);
    }
}