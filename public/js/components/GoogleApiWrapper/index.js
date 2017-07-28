import React from "react";
import ReactDOM from "react-dom";

import cache from "./ScriptCache.js";

const GoogleApi = function(opts) {
    opts = opts || {};
    
    const apiKey = opts.apiKey;
    const libraries = opts.libraries || [];
    const client = opts.client;
    const URL = "https://maps.googleapis.com/maps/api/js";
    const googleVersion = "3.27";
    
    let script = null;
    if (window.google === "undefined") {let google = window.google = null;}
    let channel = null;
    let language = null;
    let region = null;
    
    let onLoadEvents = [];
    
    const url = () => {
        let url = URL;
        let params = {
            key:apiKey,
            callback: "CALLBACK_NAME",
            libraries: libraries.join(","),
            client: client,
            v: googleVersion,
            channel: channel,
            language: language,
            region: region
        };
        let paramStr = Object.keys(params)
            .filter(k => !!params[k])
            .map(k => `${k}=${params[k]}`).join("&");
        
        return `${url}?${paramStr}`;
    };
    
    return url();
};

const defaultMapConfig = {};
const wrapper = (options) => (WrappedComponent) => {
    const apiKey = options.apiKey;
    const libraries = options.libraries || ["places"];
    
    class Wrapper extends React.Component {
        constructor(props, context) {
            super(props, context);
            
            this.state = {
                loaded: false,
                map: null,
                google: null
            };
        }
        
        componentDidMount() {
            const refs = this.refs;
            this.scriptCache.google.onLoad((err, tag) => {
                const maps = window.google.maps;
                const props = Object.assign({}, this.props, {
                    loaded: this.state.loaded
                });
                
                const mapRef = refs.map;
                
                const node = ReactDOM.findDOMNode(mapRef);
                let center = new maps.LatLng(this.props.lat, this.props.lng);
                
                let mapConfig = Object.assign({}, defaultMapConfig, {
                    center, zoom: this.props.zoom
                });
                
                this.map = new maps.Map(node, mapConfig);
                
                this.setState({
                    loaded: true,
                    map:this.map,
                    google: window.google
                });
            });
        }
        
        componentWillMount() {
            this.scriptCache = cache({
                google: GoogleApi({
                    apiKey: apiKey,
                    libraries: libraries
                })
            });
        }
        
        render() {
            const props = Object.assign({}, this.props, {
                loaded: this.state.loaded,
                map:this.state.map,
                google: this.state.google,
                mapComponent: this.refs.map
            });
            return (
                <div>
                    <WrappedComponent {...props} />
                    <div ref="map" />
                </div>
            );
        }
    }
    
    return Wrapper;
};

export default wrapper;