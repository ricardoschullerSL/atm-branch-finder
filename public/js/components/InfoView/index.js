import React from "react";

export default class InfoView extends React.Component {
    constructor(props) {
        super(props);
    }
    
    listItems(items) {
        return (
            <div>
                <ul className="infoItemList">
                    {items.map((item, key) =>
                        <li key={key}>{item.key} : {item.value}</li>
                    )}    
                </ul>
            </div>
        )
    }
    
    render() {
        return (
            <div>
                <h3>INFO</h3><br></br>
                {this.props.infoObject ? 
                    this.listItems(this.props.infoObject.infoViewItems) : "No info items" }
            </div>
        )
    }
}
