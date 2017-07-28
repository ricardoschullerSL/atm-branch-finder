import React from "react";
import EndPointButton from "../EndPointButton/";


export default class EndPointSelector extends React.Component {

    render() {
        return (
            <div className="endPointSelector">
                {this.props.endpoints.map((endpoint, key) => 
                    <EndPointButton endpoint={endpoint} onClick={() => {
                        this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:endpoint.id});
                    }} className={this.props.activeEndPoint === endpoint.id ? "selectorButton active" : "selectorButton" } key={key}/>
                )}
            </div>);
    }
}