import React from "react";
import Button from "../Button/";

//#############################################################################
// Parent Component for end point selector buttons. 
//#############################################################################

export default class EndPointSelector extends React.Component {

    render() {
        return (
            <div className="endPointSelector">
                {this.props.endpoints.map((endpoint, key) => 
                    <Button innerText={endpoint.buttonText} id={endpoint.id + "Selector"} 
                        onClick={() => {
                            this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:endpoint.id});
                        }} className={this.props.activeEndPoint === endpoint.id ? "selectorButton active" : "selectorButton" } key={key}/>
                )}
            </div>);
    }
}