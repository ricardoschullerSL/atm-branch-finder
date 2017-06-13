import React from "react";
import InfoWindow from "../../components/InfoWindow";
import { connect } from "react-redux";

@connect((store) => {
    return {
        atm: store.infoWindow.atm,
        infoItems: store.infoWindow.infoItems,
        banks: store.bankWindow.banks,
        activeBankId: store.bankWindow.activeBankId,
        currentAtmId: store.bankWindow.currentAtmId
        
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