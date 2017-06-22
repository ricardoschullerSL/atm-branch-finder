import React from "react";


export default class PCAView extends React.Component {
    
    render() {
        return (<div className="pcaView">
            <ul className="pcaPropertyList">
                <li>Product name: {this.props.pca.ProductName}</li>
                <li>Card Withdrawel Limit: {this.props.pca.CardWithdrawalLimit}</li>
                <li>Product description: {this.props.pca.ProductDescription}</li>
            </ul>
        </div>)
    }
}