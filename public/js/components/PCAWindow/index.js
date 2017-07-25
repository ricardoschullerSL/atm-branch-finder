import React from "react";

import PCAView from "../PCAView";

export default class PCAWindow extends React.Component {

    render() {
        
        return (<div className="pcaWindow">
            {this.props.banks[this.props.activeBankId].pca.data.length > 0 ? ListPCA(this.props.banks[this.props.activeBankId].pca.data) :"No Personal Current Accounts found yet."}
        </div>)
    }
}

function ListPCA(pcaList) {
    const pcas = pcaList.map((pca, index) => {
        return <li key={index}><PCAView pca={pca} /></li>
    })
    
    return (<div>
        <ul className="pcaList">
        {pcas}</ul>
    </div>)
}