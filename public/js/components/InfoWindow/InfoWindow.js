import React from "react";
import styles from "./infowindow.css";
import store from "../../store";
import { connect } from "react-redux";


@connect((store) => {
    return {
        atm: store.infoWindow.atm
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
        console.log(this.props.atm);
    }
    render() {
        
        if (this.props.atm) {
            return (
                <div className="infoWindow">This is the InfoWindow
                    <ul className="infoItems">
                        <li>City: {this.props.atm.location.city}</li>
                        
                    </ul>
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