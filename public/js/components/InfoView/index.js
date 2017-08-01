import React from "react";

//#############################################################################
// InfoView lists properties of an 'infoObject', which possibly has an array of
// 'infoItems' and 'openingTimes'. The objects must have a key and value property. 
//#############################################################################

export default class InfoView extends React.Component {
    
    listItems(items) {
        return (
            <div>
                <ul className="infoItemList">
                    {items.map((item, key) =>
                        <li key={key}>{item.key} : {item.value}</li>
                    )}    
                </ul>
            </div>
        );
    }
    
    listOpeningTimes(times) {
        return (
            <div>
                <ul className="openingTimes">Opening times
                    {times.map((time, key) =>
                        <li key={key}>{time.OpeningDay} : {time.OpeningTime.slice(0,5)} - {time.ClosingTime.slice(0,5)}</li>
                    )}
                </ul>
            </div>
        );
    }
    
    
    render() {
        return (
            <div>
                <h3>INFO</h3>
                {this.props.infoObject && this.props.infoObject.infoViewItems ? this.listItems(this.props.infoObject.infoViewItems) : null}
                {this.props.infoObject && this.props.infoObject.OpeningTimes ? this.listOpeningTimes(this.props.infoObject.OpeningTimes) : null}
            </div>
        );    
    }
}
