import React from "react":
import BranchWindow from "../components/BranchWindow/";

@connect(state = {
    
})
export default class BranchContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (<BranchWindow {...this.props} />)
    }
}