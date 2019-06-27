import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import Register from "./Register";

@inject("stores")
@observer
class Profile extends Component {

    state = {
        account : "",
        password : ""
    }

    u = this.props.stores.ProfileStore;

    async componentDidMount() {
        this.setState({
            account : "zzzz",
            password : "zzzzzz"
        });
        await this.AutoLogin();
    }

    updateAccount = (event) => {
        this.setState({
            ...this.state,
            account : event.target.value
        });
    };
    updatePassword = (event) => {

        this.setState({
            ...this.state,
            password : event.target.value
        });
    };

    AutoLogin = async () => {
        await this.u.Login({
            account : "zzzz",
            password : "zzzzzz"
        });
    }

    Login = async () =>
    {
        if(this.state.account && this.state.password)
        {
            await this.u.Login(this.state);
            if(!this.u.user)
            {
                alert("로그인 실패");
            }
            this.setState({
                ...this.state,
                account : "",
                password : ""
            });
        }
    }

    Logout = async () =>
    {
        await this.u.Logout();
    }

    render()
    {
        if(this.u.user)
        {
            return(
                <div>
                    <div>
                        {this.u.user.username}님 환영합니다.
                        <button onClick={this.Logout}>로그아웃</button>
                    </div>
                </div>
            );
        }
        else
        {

            if(this.props.match && this.props.match.params.command === "register")
                return <Register/>
            return(
                <div>
                    아이디 : <input value={this.state.account} onChange={this.updateAccount}/><br/>
                    비밀번호 : <input type="password" value={this.state.password} onChange={this.updatePassword}/><br/>
                    <button onClick={this.Login}>로그인</button>
                    <button onClick={this.Login}><Link to="/user/register">회원가입</Link></button>
                </div>
            );
        }
    }

}

export default Profile;