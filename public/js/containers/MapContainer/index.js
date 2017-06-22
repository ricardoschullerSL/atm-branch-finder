import React from "react";
import {connect} from "react-redux";
import MapWindow from "../../components/MapWindow";


@connect((store) => {
        return {
            latitude: store.mapWindow.latitude,
            longitude: store.mapWindow.longitude
        }
})
export default class MapContainer extends React.Component {
    
    render() {
        return (<MapWindow {...this.props} />)
    }
}