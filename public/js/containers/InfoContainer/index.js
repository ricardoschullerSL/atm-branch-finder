import React from "react";
import InfoWindow from "../../components/InfoWindow";
import { connect } from "react-redux";

@connect((store) => {
    return {
        atm: store.infoWindow.atm,
        infoItems: store.infoWindow.infoItems,
        activeATMIndex: store.infoWindow.activeATMIndex,
        filteredATMS: store.infoWindow.filteredATMS
        
    }
})
export default class InfoContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (<InfoWindow {...this.props}/>)
    }
}