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
    
    listOpeningTimes(times) {
        return (
            <div>
                <ul className="openingTimes">Opening times
                    {times.map((time, key) =>
                        <li key={key}>{time.OpeningDay} : {time.OpeningTime.slice(0,5)} - {time.ClosingTime.slice(0,5)}</li>
                        )}
                </ul>
            </div>
        )
    }
    
    
    render() {
        if (this.props.infoObject) {
            return (
                <div>
                    <h3>INFO</h3><br></br>
                    {this.listItems(this.props.infoObject.infoViewItems)}
                    {this.props.infoObject.OpeningTimes ? this.listOpeningTimes(this.props.infoObject.OpeningTimes) : null}
                    
                </div>
            )
        } else {
            return (
                <div>
                    <h3>INFO</h3><br></br>
                    No info items
                </div>
            )
        }
    }
}
