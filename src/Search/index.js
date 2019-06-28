import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject("stores")
@observer
class Product extends Component {

    state = {
        product : null
    }

    s = this.props.stores.SearchStore;
    
    cartUrl = "";

    updateProduct = async (search) => {
        let result = await this.s.getSearch(search);
        if(result)
        {
            this.setState({
                product : result
            });
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params.command === "search" && this.props.match.params.search)
        {
            await this.updateProduct(this.props.match.params.search);
        }
    }

    render()
    {
        if(this.state.product)
        {
            return(
                <div>
                    <h1>
                        검색 결과
                    </h1>
                    <ul>
                        {this.state.product.map((p) => {
                            return (
                                <Link to={`/product/${p.id}`}>
                                    <li>

                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <h1>
                        검색 결과
                    </h1>
                </div>
            )
        }

    }

}

export default Product;