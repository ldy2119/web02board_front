import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

@inject("stores")
@observer
class Profile extends Component {

    state = {
        account : "",
        password : "",
        checkPassword : "",
        name : "",
        tel : "",
        phone : "",
        post : "",
        email : "",
        address : "",
        detailAddress : "",
        goToMain : false,
        checkAccount : -1,
        agree : false
    }

    u = this.props.stores.ProfileStore;

    updateAccount = (event) => {
        this.setState({
            ...this.state,
            account : event.target.value,
            checkAccount : -1
        });
    };
    updatePassword = (event) => {

        this.setState({
            ...this.state,
            password : event.target.value
        });
    };
    updateName = (event) => {

        this.setState({
            ...this.state,
            name : event.target.value
        });
    };
    updateCheckPassword = (event) => {

        this.setState({
            ...this.state,
            checkPassword : event.target.value
        });
    };
    updateTel = (event) => {

        this.setState({
            ...this.state,
            tel : event.target.value
        });
    };
    updatePhone = (event) => {

        this.setState({
            ...this.state,
            phone : event.target.value
        });
    };
    updatePost = (event) => {

        this.setState({
            ...this.state,
            post : event.target.value
        });
    };
    updateEmail = (event) => {

        this.setState({
            ...this.state,
            email : event.target.value
        });
    };
    updateAddress = (event) => {

        this.setState({
            ...this.state,
            address : event.target.value
        });
    };
    updateDetailAddress = (event) => {

        this.setState({
            ...this.state,
            detailAddress : event.target.value
        });
    };
    Register = async () =>
    {
        if(this.state.account && this.state.password &&
           this.state.checkPassword && this.state.name &&
           this.state.tel && this.state.phone &&
           this.state.post && this.state.email &&
           this.state.address && this.state.detailAddress)
        {
            if(this.state.checkPassword !== this.state.password)
            {
                window.alert("패스워드와 패스워드확인이 같지 않습니다.");
                return;
            }
            if(this.state.checkAccount === -1)
            {
                window.alert("중복확인을 해주세요");
                return;
            }
            if(!this.state.agree)
            {
                window.alert("회원약관에 동의해주세요.");
                return;
            }
            if(await this.u.Register(this.state) > 0)
            {
                window.alert("회원가입 성공");
                this.setState({
                    account : "",
                    password : "",
                    checkPassword : "",
                    name : "",
                    tel : "",
                    phone : "",
                    post : "",
                    email : "",
                    address : "",
                    detailAddress : "",
                    goToMain : true
                });
            }
            else
            {
                window.alert("회원가입 실패");
            }
        }
    }

    checkAccount = async () =>
    {
        if(!await this.u.checkAccount(this.state.account))
        {
            this.setState({

                ...this.state,
                checkAccount : 1
            });
        }
        else
        {
            this.setState({
                ...this.state,
                checkAccount : 0
            })
        }
    }

    agreeRules = (e) => {
        this.setState({
            ...this.state,
            agree : e.target.checked
        });
    };

    accountText = "(6~10자의 영문 및 숫자 가능하며 여백은 사용할 수 없습니다)";

    render()
    {
        if(this.state.goToMain)
        {
            return <Redirect to="/"/>
        }
        if(this.state.checkAccount === 1)
        {
            this.accountText = "가능한 아이디입니다."
        }
        else if(this.state.checkAccount === 0)
        {
            this.accountText = "이미 존재하는 아이디입니다.";
        }
        else if(this.state.checkAccount === -1)
        {
            this.accountText = "(6~10자의 영문 및 숫자 가능하며 여백은 사용할 수 없습니다)";
        }
        return(
            <div>
                희망아이디 : <input value={this.state.account} onChange={this.updateAccount}/> {this.accountText} <button onClick={this.checkAccount}>중복확인</button><br/>
                희망패스워드 : <input type="password" value={this.state.password} onChange={this.updatePassword}/> (6~10자 이내로 영문과 숫자의 조합으로 만드세요)<br/>
                희망패스워드확인 : <input type="password" value={this.state.checkPassword} onChange={this.updateCheckPassword}/><br/>
                성명 : <input value={this.state.name} onChange={this.updateName}/><br/>
                전화번호 : <input value={this.state.tel} onChange={this.updateTel}/><br/>
                핸드폰 : <input value={this.state.phone} onChange={this.updatePhone}/><br/>
                우편번호 : <input value={this.state.post} onChange={this.updatePost}/><br/>
                주소 : <input value={this.state.address} onChange={this.updateAddress}/><br/>
                <input value={this.state.detailAddress} onChange={this.updateDetailAddress}/><br/>
                이메일 : <input value={this.state.email} onChange={this.updateEmail}/><br/>
                회원약관<br/>
                <div></div>
                회원약관에
                <div className="cell">
                    <input type="checkbox" onClick={this.agreeRules} value="동의"/>동의
                </div><br/>
                <button onClick={this.Register}>확인</button>
                <button><Link to="/">취소</Link></button>
            </div>
        );
    }

}
export default Profile;