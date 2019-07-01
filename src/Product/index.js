import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import Comment from "../Comment/index";
// import AddComment from "../Comment/AddComment";

@inject("stores")
@observer
class Product extends Component {

    state = {
        product : null,
        buyNumber : 1
    }

    date = new Date().toDateString();

    p = this.props.stores.ProductStore;

    u = this.props.stores.ProfileStore;

    cartUrl = "";

    updateBuyNumber = (e) => {
        if(e.target.value <= 0)
        {
            window.alert("1개 이상의 상품을 주문해주세요");
            return;
        }
        this.setState({
            ...this.state,
            buyNumber : e.target.value
        })
    }

    product = null;

    async componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            this.product = await this.p.getProduct(this.props.match.params.id);
            this.cartUrl = "/cart/" + this.product.id;
            this.setState({
                ...this.state,
                product : this.product
            });
        }
    }

    render()
    {
        if(this.state.product)
        {
            return(
                <div>
                    <div>
                        <div>
                            {this.state.product.productName}
                        </div>
                        <img src={`http://localhost:8080/attachment/${this.state.product.imagePath}`} width="200px" height="200px" alt=""/><br/>
                        제조사 : {this.state.product.companyName}<br/>
                        마일리지 : {this.state.product.mileage}<br/>
                        {this.u.user ? (<span>주문수량 : <input type="number" value={this.state.buyNumber} onChange={this.updateBuyNumber}/> <button><Link to={`/cart/add/${this.product.id}/${this.state.buyNumber}`}>장바구니에 담기</Link></button><br/></span>) : (<span></span>)}
                        시중가격 : {this.state.product.cost}<br/>
                        판매가격 : {this.state.product.cost}<br/>
                    </div>
                    <div>
                        <div>
                            제품상세정보
                        </div>
                        <div>
                            {this.state.product.detailDescription}
                        </div>
                    </div>
                    <div>
                        <div>
                            구매 정보
                        </div>
                        <div>
                            OOO님의 쇼핑 도우미 OOO입니다.<br/>
                            OOO님의 상품에 대한 문의나 배송문의는 저에게 바로 연락을 주세요<br/>
                            고객 한 분 한 분을 소중히 여기며 최고의 서비스를 약속드립니다.<br/>
                            직통전화번호:080-0000-0000 이나 MD전용게시판을 이용해주세요<br/>
                        </div>
                    </div>
                    <div>
                        <Comment id={this.state.product.id}/>
                    </div>

                </div>
            )
        }
        else
        {
            return (
                <div></div>
            )
        }

    }

}

export default Product;