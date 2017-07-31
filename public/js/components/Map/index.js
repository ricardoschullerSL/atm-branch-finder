import React from "react";

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        
        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.google) {
            this.loadMap();
        }
        
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }
    
    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
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
    renderChildren() {
        const {children} = this.props;
        if (!children) return;
        
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.props.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }
    
    render() {
        return (
            <div ref={this.props.mapRef} className="mapWindow" id="googleMap">
                Loading map...
                {this.renderChildren()}
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
