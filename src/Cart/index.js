import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import "./cart.scss";

@inject("stores")
@observer
class Cart extends Component {

    state = {
        cartList : null
    }

    u = this.props.stores.ProfileStore;

    p = this.props.stores.ProductStore;

    getCart = async () => {
        let list = await this.u.getCart();
        let cartList = [];
        for(let i = 0; i < list.length; i++)
        {
            let cart = await this.p.getProduct(list[i].productId);
            cart.count = list[i].productCount;
            cart.cartId = list[i].id;
            cartList.push(cart);
            this.setState({
                ...this.state,
                [cart.cartId] : cart.count
            })
        }

        this.setState({
            ...this.state,
            cartList : cartList
        });
    }

    async componentDidMount() {
        if(this.props.match && !this.props.match.params.command)
        {
            if(this.u.user)
            {
                await this.getCart(this.u.user.id);
            }
        }
        else if(this.props.match && this.props.match.params.command && this.props.match.params.command === "add" && this.props.match.params.id && this.props.match.params.count) {
            if(this.u.user)
            {
                let result = await this.u.addCart(this.props.match.params.id, this.props.match.params.count);
                if (result && result > 0)
                {
                    this.props.history.replace("/cart");
                    await this.getCart(this.u.user.id);
                }
            }
        }
    }

    // async componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.match && !this.props.match.params.command)
    //     {
    //         if(this.u.user)
    //         {
    //             await this.getCart(this.u.user.id);
    //         }
    //     }
    // }

    updateCount = (id, e) => {
        this.setState({
            ...this.state,
            [id] : e.target.value
        });
    };

    updateChecked = (id, e) => {
        id = "check" + id;
        this.setState({
            ...this.state,
            [id] : e.target.checked
        });
    };

    adjustCount = async (cartid, productId, count) => {
        try
        {
            count = parseInt(count);
            if(count < 0 || !count)
            {
                this.props.window.alert("수량을 바르게 입력해주세요.");
                return;
            }
            let result = await this.u.modifyCart(cartid, productId, count);
            if(result && result > 0)
            {
                await this.getCart();
            }
        }
        catch (e)
        {

        }
    }

    deleteCart = async () => {
        let list = Object.keys(this.state);
        for(let i = 0; i < list.length; i++)
        {
            if(list[i].includes("check") && this.state[list[i]])
            {
                await this.u.deleteCart(list[i].slice(5));
            }
        }
        await this.getCart();
    }

    render()
    {
        if(!this.u.user)
        {
            return(
                <div>
                    <Redirect to="/"/>
                </div>
            )
        }
        if(this.props.match && this.props.match.params.command && this.props.match.params.command === "add" && this.props.match.params.id && this.props.match.params.count)
        {
            return (<div>

            </div>)
        }
        else if(this.state.cartList)
        {
            return(
                <div>
                    <h1>
                        장바구니
                    </h1>
                    <ul>
                        <li>
                            고객님께서 주문하신 상품내역을 변경하시거나 삭제하실 수가 있습니다.
                        </li>
                        <li>
                            계속주문을 원하시면 [쇼핑하기]을 클릭하세요.
                        </li>
                        <li>
                            주문하신 상품에 대해 마일리지가 계속적으로 누적됩니다.
                        </li>
                        <li>
                            마일리지의 누적점수에 따라 사은품이 적용되며 추후 주문 시 동봉하여 발송됩니다.
                        </li>
                    </ul>
                    <div>
                        주문단계: 장바구니 >> 배송지 및 결제정보 >> 주문완료
                    </div>
                    <div className="head">
                        <div className="cell">상품 이름</div><div className="cell">가격</div><div className="cell">갯수</div><div className="cell">합계</div><div className="cell">삭제</div>
                    </div>
                    <ul>
                        {this.state.cartList.map((cart) => {
                            return(
                                <li key={cart.cartId}>
                                    <div className="cell">
                                        {cart.productName}
                                    </div>
                                    <div className="cell">
                                        {cart.cost}
                                    </div>
                                    <div className="cell">
                                        <input id={cart.cartId} type="number" onChange={(e) => this.updateCount(cart.cartId, e)} value={this.state[cart.cartId]} style={{"width" : "50px"}}/>
                                        <button onClick={(e) => {this.adjustCount(cart.cartId, cart.id, this.state[cart.cartId])}}>다시 계산</button>
                                    </div>
                                    <div className="cell">
                                        {cart.cost * cart.count}
                                    </div>
                                    <div className="cell">
                                        <input type="checkbox" onClick={(e) => this.updateChecked(cart.cartId, e)} value="삭제"/>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="bottom">
                        <button onClick={this.deleteCart}>삭제하기</button>
                    </div>
                    <h3>
                        개수를 수정하실 때는 수량을 정확히 입력해주세요.<br/>
                    </h3>
                </div>
            )
        }
        return (
            <div>
                장바구니
            </div>
        )
    }

}

export default Cart;