import React from "react";
import styles from "./maincontainer.css";
import MapContainer from "../MapContainer";
import BranchContainer from "../BranchContainer";
import PCAContainer from "../PCAContainer";
import BankContainer from "../BankContainer/";
import FilterWindow from "../../components/FilterWindow/";
import InfoContainer from "../InfoContainer/";


export default class MainContainer extends React.Component {
    
    render() {
        return (
            
            <div className="mainContainer">
                <div className="header">
                    <BankContainer />
                    <FilterWindow />
                </div>
                <div className="main">
                    <InfoContainer />
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
            </div>
        );
    }
}