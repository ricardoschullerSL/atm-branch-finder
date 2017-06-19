import React from "react";
import InfoWindow from "../../components/InfoWindow";
import { connect } from "react-redux";

@connect((store) => {
    return {
        infoViewItems: store.infoWindow.infoViewItems,
        infoId: store.infoWindow.infoId,
        infoObjects: store.infoWindow.InfoObjects,
        filteredInfoObjects: store.infoWindow.filteredInfoObjects
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