import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject("stores")
@observer
class ProductInfo extends Component {

    state = {
        img : null,
        name : null,
        cost : null
    }
    c = this.props.stores.CatetoryStore;

    productInfo = null;
    async componentDidMount() {
        if(this.props.product)
        {
            this.setState({
                ...this.state,
                img : this.props.product.imagePath,
                name : this.props.product.productName,
                cost : this.props.product.cost
            })
        }
    }

    render()
    {
        return(
            <div>
                <div>
                    <img src={this.state.img} width="50px" height="50px"></img>
                </div>
                <div>
                    {this.state.name}
                </div>
                <div>
                    {this.state.cost}원
                </div>
            </div>
        )
    }

}

export default ProductInfo;