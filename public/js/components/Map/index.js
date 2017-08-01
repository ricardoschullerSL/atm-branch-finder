import React from "react";

//#############################################################################
// Map component. It receives an array of locations and put markers on the map
// for them. We can't use redux here because we need to be able to tell the
// markers to delete themselves, which can't happen with redux because we'll
// lose the reference to them.
//#############################################################################


export default class Map extends React.Component {
    constructor(props) {
        super(props);
        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
        };
        this._markers = [];
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        
        if (prevProps.locations !== this.props.locations) {
            this.clearMarkers();
            this.renderMarkers(); 
        }
        
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }
    
    loadMap() {
        if (this.props && this.props.google) {
            let {initialCenter, zoom} = this.props;
            const map = this.props.map;
            map.setCenter(initialCenter);
            map.setZoom(zoom);
        }
    }
    
    recenterMap() {
        const map = this.props.map;
        const curr = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
        }
    }
    
    //  Sets the map on all markers to null, then sets markers to empty list.
    clearMarkers() {
        for (var i = 0; i < this._markers.length; i++) {
            this._markers[i].setMap(null);
        }
        this._markers = [];
    }
    
    renderMarkers() {
        const { locations, google } = this.props;
        if (!locations) return;
        locations.map((location) => {
            let position = new google.maps.LatLng(location.lat, location.lng);
            let marker = new google.maps.Marker({
                position: position,
                map: this.props.map,
                title: "Hello World!"
            });
            this._markers.push(marker);
        });
    }
    
    render() {
        return (
            <div ref={this.props.mapRef} className="mapWindow" id="googleMap">
                Loading map...
            </div>
        );
    }
}

Map.defaultProps = {
    zoom: 14,
    //Bristol by default
    initialCenter: {
        lat:51.4518419,
        lng: -2.5959820
    },
    onMove: function() {}
};

