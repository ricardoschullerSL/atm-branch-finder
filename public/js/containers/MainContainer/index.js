import React from "react";
import styles from "./maincontainer.css";
import MapContainer from "../MapContainer";
import BranchContainer from "../BranchContainer";
import PCAContainer from "../PCAContainer";


export default class MainWindow extends React.Component {
    
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