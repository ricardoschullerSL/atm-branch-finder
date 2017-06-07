import React from "react";
import styles from "./infowindow.css";
import store from "../../store";
import { connect } from "react-redux";
import { getBankData } from "../../actions/bankActions";
import AtmSelector from "./AtmSelector";


@connect((store) => {
    return {
        atm: store.infoWindow.atm,
        infoItems: store.infoWindow.infoItems,
        banks: store.bankWindow.banks,
        activeBank: store.bankWindow.activeBank,
        currentAtmId: store.bankWindow.currentAtmId
        
    }
})
export default class InfoWindow extends React.Component{
    constructor(props) {
        super(props);
        this.props.dispatch({type:"SET_DEFAULT_LOCATION_INFO",
        payload:{
            city:"Haarlem",
            street:"Grote Houtstraat",
            postcode:"2022NA",
            latitude:"52.379034",
            longitude:"4.4633018"
        }})
    }
    render() {
        
        if (this.props.atm) {
            return (
                <div className="infoWindow">This is the InfoWindow <br></br>
                <button onClick={getBankData}>Click to get data</button>
                <AtmSelector atmId={this.props.currentAtmId} 
                            activeBank={this.props.banks[this.props.activeBank]}/>
                    {(this.props.infoItems) ? ListInfoItems(this.props.infoItems): "No Info found."}
                </div>
            )
        }
        else {
            return (
                <div className="infoWindow">No Info Yet</div>
            )
        }    
    }
}

function ListInfoItems(items) {
    const listItems = (
        <ul className="infoItems">
            {items.map((item, key) => 
            <li key={key}>{item.id}:{item.value}</li>)}
        </ul>
    )
    return (
        <div>
            {listItems}
        </div>
    )
}