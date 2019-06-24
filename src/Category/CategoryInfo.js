import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CategoryInfo extends Component {

    url = "/category/find/" + this.props.id;
    render(){
        return(
            <li style={{"display" : "inline", "margin" : "10px"}}>
                <button><Link to={this.url}>{this.props.name}</Link></button>
            </li>
        );
    }
}

export default CategoryInfo;