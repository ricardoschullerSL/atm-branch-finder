import React from "react";
import InfoWindow from "../../components/InfoWindow";
import { connect } from "react-redux";
import styles from "./infowindow.css";

@connect((store) => {
    return {
        infoViewItems: store.infoWindow.infoViewItems,
        infoId: store.infoWindow.infoId,
        infoObjects: store.infoWindow.infoObjects,
        filteredInfoObjects: store.infoWindow.filteredInfoObjects,
        userGeoLocation: {
            Latitude: store.mapWindow.userLatitude,
            Longitude: store.mapWindow.userLongitude
        }
    }
})
export default class InfoContainer extends React.Component {
        
    render() {
        return (<div className="infoContainer"><InfoWindow {...this.props}/></div>)
    }
}