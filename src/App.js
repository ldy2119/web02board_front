import React from 'react';

import Home from "./Home";

import "./App.scss";

import {BrowserRouter, Route, Link} from "react-router-dom";

import {Provider} from 'mobx-react';
import Stores from "./Stores";
import Profile from "./Profile/index";
import CategoryList from "./Category/Category"
import Category from "./Category/index"

const App = ()=>(
    <Provider stores={Stores}>
        <BrowserRouter>
            <header className="app-header">
                <div style={{"textAlign" : 'right'}}>
                    <Link to="/">HOME</Link> / 회원정보변경 / 고객센터 / 장바구니 / 배송조회 / 마일리지 / 이용안내
                </div>
                <div>
                </div>
                <div>
                    <div style={{float : "left"}}>
                        00 0000 0000 쇼핑몰
                    </div>
                    <div style={{float : "right"}}>
                        <input/> <button>GO</button>
                    </div>
                </div>
                <div>
                    <CategoryList/>
                </div>
            </header>
            <section className="app-body">

                <Route path = "/" exact component={Home}/>
                <Route path = "/user/:command?" exact component={Profile}/>
                <Route path = "/category/:command?/:id?" exact component={Category}/>
            </section>
            <footer className="footer">

                <div>
                    <Link to="/">HOME</Link> / 회원정보변경 / 고객센터 / 장바구니 / 배송조회 / 마일리지 / 이용안내
                </div>
                <div>
                    <div style={{float : "left"}}>
                        00 0000 0000 쇼핑몰
                    </div>
                    <div style={{float : "left"}}>
                        문의 전화 : 053)0000-0000/000)0000-0000/Fax 053)0000-0000<br/>
                        구입문의 : 053)0000-0000(일반), 000-0000~0(군)<br/>
                        Copyright 2018 0000000000, All rights reserved.
                    </div>
                </div>
            </footer>

        </BrowserRouter>
    </Provider>
)

// function App() {
//   return (
//     <div className="App">
//       <Home/>
//       <Page1/>
//       <Page2/>
//       <Page3/>
//     </div>
//   );
// }

export default App;
