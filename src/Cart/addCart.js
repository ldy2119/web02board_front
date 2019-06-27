import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

@inject("stores")
@observer
class addCart extends Component {

    state = {
        goToList : false
    }

    u = this.props.stores.ProfileStore;

    async componentDidMount() {
        if(this.u.user)
        {
            let check = await this.u.addCart(this.props.userId, this.props.count);
            console.log(check);
            // if(check && check > 0)
                this.props.history.replace("/");
        }
    }

    render()
    {
        if(this.state.goToList)
            this.props.history.replace("/cart");
        return (
            <div>

            </div>
        )
    }

}

export default addCart;