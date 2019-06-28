import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject("stores")
@observer
class SearchInput extends Component {

    state = {
        search : ""
    }

    updateSearch = (e) => {
        this.setState({
            ...this.state,
            search : e.target.value
        });
    }

    render()
    {
        return(
            <div>
                <input value={this.state.search} onChange={this.updateSearch}/> <button><Link to = {`/search/${this.state.search}`}>GO!</Link></button>
            </div>
        )
    }

}

export default SearchInput;