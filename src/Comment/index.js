import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
// import AddComment from "../Product";
import "./Comment.scss";

@inject("stores")
@observer
class Comment extends Component {

    state = {
        comment : "",
        commentList : null
    }

    c = this.props.stores.CommentStore;

    u = this.props.stores.ProfileStore;

    productId = null;

    date = new Date();

    async componentDidMount() {
        this.productId = this.props.id;
        await this.updateCommentList();
    }

    onAddComment = async () => {
        await this.c.addComment(this.u.user.userName, this.productId, this.state.comment);
        this.setState({
            ...this.state,
            comment : ""
        })
        await this.updateCommentList();
    }

    updateCommentList = async () => {
        let result = await this.c.getComment(this.productId);
        this.setState({
            commentList : result
        });
    }

    updateComment = (e) => {
        this.setState({
            ...this.state,
            comment : e.target.value
        });
    }

    render()
    {
        return(
            <div>
                {this.u.user ? (
                    <div className="CommentBox">
                        <div>
                            고객의 상품 평
                        </div>
                        <div>
                            ※고객의 상품평은 추후 쇼핑몰의 제품선정에 중요한 역할을 합니다.<br/>
                            ※쇼핑몰의 더 나은 상품선정과 고객 분들의 쇼핑문화의 질을 높이고자 좋은 평은<br/>
                            매월 심사 후 쇼핑몰 메인에 올려드리고 선물을 증정하고 있습니다.<br/>
                            아이디 : {this.u.user.userName} 등록날짜 :
                            {this.date.getFullYear()}년 {this.date.getMonth() + 1}월 {this.date.getDate()}일 {this.date.getHours()}:{this.date.getMinutes()}
                            <br/>
                            제목 : <input onChange={this.updateComment} value={this.state.comment}/><button onClick={this.onAddComment}>전송</button>
                        </div>
                    </div>) : (<div></div>)}

                <ul style={{"margin" : "20px"}}>
                    {this.state.commentList && this.state.commentList.map((comment) => {
                        let date = new Date(comment.updated);
                        return (
                            <li key={comment.id} className="commentContent">
                                {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 {date.getHours()}:{date.getMinutes()}<br/>
                                작성자 : {comment.filteredUserName}<br/>
                                {comment.commentContent}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

}

export default Comment;