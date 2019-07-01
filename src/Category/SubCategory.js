import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import ProductInfo from "./ProductInfo";

@inject("stores")
@observer
class SubCategory extends Component {

    state = {
        current1 : "",
        current2 : "",
        current3 : ""
    };

    c = this.props.stores.CatetoryStore;

    currentProduct = null;
    subCategoryId = null;

    async componentDidMount() {
        if(this.props.subCategoryId)
        {
            await this.updateProduct(this.props.subCategoryId);
            this.subCategoryId = this.props.subCategoryId;
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.subCategoryId !== this.subCategoryId)
        {
            this.subCategoryId = this.props.subCategoryId;
            await this.updateProduct(this.subCategoryId);
        }
    }

    updateProduct = async (id) => {
        this.currentProduct = null;
        this.currentProduct = await this.c.getCurrentProducts(id);
        if(this.currentProduct)
        {

            this.setState({
                ...this.state,
                current1 : this.currentProduct[0],
                current2 : this.currentProduct[1],
                current3 : this.currentProduct[2]
            });
        }
        else
        {
            this.setState({
                ...this.state,
                current1 : "",
                current2 : "",
                current3 : ""
            })
        }
    }

    render()
    {
        if(this.currentProduct && this.currentProduct.length !== 0)
        {
            return (
                <div>
                    신상품코너<br/>
                    <ul>
                        {this.state.current1 ? (
                            <li>
                                <div>
                                    <ProductInfo product={this.state.current1}/>
                                </div>
                            </li>
                        ) : (<li></li>)}
                        {this.state.current2 ? (
                            <li>
                                <div>
                                    <ProductInfo product={this.state.current2}/>
                                </div>
                            </li>
                        ) : (<li></li>)}
                        {this.state.current3 ? (
                            <li>
                                <div>
                                    <ProductInfo product={this.state.current3}/>
                                </div>
                            </li>
                        ) : (<li></li>)}
                    </ul>
                </div>
            );
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

export default SubCategory;