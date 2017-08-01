import React from "react";

export default class Marker extends React.Component {
    constructor(props) {
        super(props);
                
    }
    componentDidUpdate(prevProps) {
        if ((this.props.map === prevProps.map) &&
        (this.props.position !== prevProps.position)) {
            this.renderMarker();
            console.log("marker rendered");
        }
    }
    
    componentWillUnmount() {
        this.marker.setMap(null);
        this.marker = null;
        console.log("marker deleted");
    }
    
    renderMarker() {
        let {map, google, position, mapCenter} = this.props;
        let pos = position || mapCenter;
        let LatLng = new google.maps.LatLng(pos.lat, pos.lng);
        
        const pref = {
            map: map,
            position: LatLng
        };
        this.marker = new google.maps.Marker(pref);
    }
    render() {
        return null;
    }
}