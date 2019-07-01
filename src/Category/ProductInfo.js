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
        // console.log(this.props.product);
        if(this.props.product)
        {
            this.setState({
                ...this.state,
                img : this.props.product.imagePath,
                name : this.props.product.productName,
                cost : this.props.product.cost
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.product !== this.props.product)
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
        if(this.props.product)
        {
            return(
                <Link to={`/product/${this.props.product.id}`}>
                    <div>
                        <div>
                            <img src={`http://localhost:8080/attachment/${this.state.img}`} width="50px" height="50px" alt=""/>
                        </div>
                        <div>
                            {this.state.name}
                        </div>
                        <div>
                            {this.state.cost}원
                        </div>
                    </div>
                </Link>
            )
        }
        return(
            <div>

            </div>
        )
    }

}

export default ProductInfo;