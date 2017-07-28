import React from "react";
import ReactDOM from "react-dom";

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
        if (prevProps.google !== this.props.google) {
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
            
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            
            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            });
            this.map = new maps.Map(node, mapConfig);
            this.map.addListener("dragend", (event) => {
                this.props.onMove(this.map);
            });
        }
    }
    
    recenterMap() {
        const map = this.map;
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
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }
    
    render() {
        return (
            <div ref='map' id="googlemap">
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
