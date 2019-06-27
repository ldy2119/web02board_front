import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject("stores")
@observer
class Category extends Component {

    state = {
        current1 : "",
        current2 : "",
        current3 : ""
    };

    c = this.props.stores.CatetoryStore;

    currentProduct = null;

    async componentDidMount() {
        if(this.props.match && this.props.match.params.command === "find" && this.props.match.params.id)
        {
            await this.updateProduct(this.props.match.params.id);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match && this.props.match.params.command === "find" && this.props.match.params.id)
        {
            if(this.props.match.params.id !== prevProps.match.params.id)
            {
                await this.updateProduct(this.props.match.params.id);
            }
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
                            <Link to={`/product/${this.state.current1.id}`}>
                                <li>
                                    <div>
                                        <div>

                                            <img src={this.state.current1.imagePath} width="50px" height="50px" alt=""></img>
                                        </div>
                                        <div>
                                            {this.state.current1.productName}
                                        </div>
                                        <div>
                                            {this.state.current1.cost}
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ) : (<li></li>)}
                        {this.state.current2 ? (
                            <Link to={`/product/${this.state.current2.id}`}>
                                <li>
                                    <div>
                                        <div>

                                            <img src={this.state.current2.imagePath} width="50px" height="50px" alt=""></img>
                                        </div>
                                        <div>
                                            {this.state.current2.productName}
                                        </div>
                                        <div>
                                            {this.state.current2.cost}
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ) : (<li></li>)}
                        {this.state.current3 ? (
                            <Link to={`/product/${this.state.current3.id}`}>
                                <li>
                                    <div>
                                        <div>

                                            <img src={this.state.current3.imagePath} width="50px" height="50px" alt=""></img>
                                        </div>
                                        <div>
                                            {this.state.current3.productName}
                                        </div>
                                        <div>
                                            {this.state.current3.cost}
                                        </div>
                                    </div>
                                </li>
                            </Link>
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

export default Category;