import React from "react";

//#############################################################################
// Personal Current Account View. Single PCA that shows some basic info.
//#############################################################################

export default class PCAView extends React.Component {
    
    render() {
        return (<div className="pcaView">
            <h4><center>{this.props.pca.ProductName}</center></h4>
            <ul className="pcaPropertyList">
                <li>Card Withdrawel Limit: {this.props.pca.CardWithdrawalLimit}</li>
                <li>Product description: {this.props.pca.ProductDescription}</li>
                <li><a href={this.props.pca.ProductURL[0]}>Click here for more info.</a></li>
            </ul>
        </div>);
    }
}