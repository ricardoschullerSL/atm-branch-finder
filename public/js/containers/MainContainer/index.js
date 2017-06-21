import React from "react";
import {connect} from "react-redux";
import MapContainer from "../MapContainer";
import BranchContainer from "../BranchContainer";
import PCAContainer from "../PCAContainer";

@connect((store) => {
    return {
        activeEndPoint: store.bankWindow.activeEndPoint
    }
})
export default class MainWindow extends React.Component {
    constructor(props) {
        super(props) 
    }
    
    render() {
        return (
            <div className="mainContainer">
                {{atms: (
                    <MapContainer />
                ),
                branches: (
                    <BranchContainer />
                ),
                pca: (
                    <PCAContainer />
                )
            }[this.props.activeEndPoint || "atms"]}
            </div>
        )
    }
}