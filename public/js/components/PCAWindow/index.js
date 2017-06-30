import React from "react";

import PCAView from "../PCAView";

export default class PCAWindow extends React.Component {

    
    render() {
        
        return (<div className="pcaWindow">
            This is the Personal Current Account Window.
            {this.props.banks[this.props.activeBankId].pca ? ListPCA(this.props.banks[this.props.activeBankId].pca) :"No PCAs yet"}
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