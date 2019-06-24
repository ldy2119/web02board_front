import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import ProductInfo from "./ProductInfo";

@inject("stores")
@observer
class Category extends Component {

    state = {
        current1 : null,
        current2 : null,
        current3 : null
    };

    c = this.props.stores.CatetoryStore;

    currentProduct = null;

    async componentDidMount() {
        if(this.props.match && this.props.match.params.command === "find" && this.props.match.params.id)
        {
            await this.updateProduct();
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match && this.props.match.params.command === "find" && this.props.match.params.id)
        {
            if(this.props.match.params.id !== prevProps.match.params.id)
            {
                await this.updateProduct();
            }
        }
    }


    updateProduct = async () => {
        this.currentProduct = null;
        this.currentProduct = await this.c.getCurrentProducts();
        this.setState({
            ...this.state,
            current1 : this.currentProduct[0],
            current2 : this.currentProduct[1],
            current3 : this.currentProduct[2]
        });
    }

    render()
    {
        if(this.currentProduct)
        {
            return (
                <div>
                    신상품코너<br/>
                    <ul>
                        <li><ProductInfo product={this.state.current1}/></li>
                        <li><ProductInfo product={this.state.current2}/></li>
                        <li><ProductInfo product={this.state.current3}/></li>
                    </ul>
                </div>
            )
        }
        else
        {
            return(
                <div>
                    신상품코너<br/>
                </div>
            )
        }

    }

}

export default Category;