import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import SubCategory from "./SubCategory";
import {Link} from "react-router-dom";

@inject("stores")
@observer
class Category extends Component {

    isMount = false;

    state = {
        current1 : "",
        current2 : "",
        current3 : "",
        subCategory : null
    };

    c = this.props.stores.CatetoryStore;

    currentProduct = null;

    currentSubCategoryId = null;
    currentCategoryId = null;

    async componentDidMount() {
        this.isMount = true;
        if(this.props.match && this.props.match.params.command === "find" && this.props.match.params.id)
        {
            if(this.props.match.params.subId)
            {
                this.currentSubCategoryId = this.props.match.params.subId;
                this.currentCategoryId = this.props.match.params.id;
                await this.updateSubCategory(this.props.match.params.id);
            }
            else
            {
                this.currentCategoryId = this.props.match.params.id;
                await this.updateSubCategory(this.props.match.params.id);
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match && this.props.match.params.command === "find" && this.props.match.params.id)
        {
            if(this.props.match.params.id !== prevProps.match.params.id)
            {
                console.log("EE");
                this.currentCategoryId = this.props.match.params.id;
                this.currentSubCategoryId = null;
                await this.updateSubCategory(this.props.match.params.id);
            }
            else if(this.props.match.params.subId !== prevProps.match.params.subId)
            {
                this.currentSubCategoryId = this.props.match.params.subId;
                this.currentCategoryId = this.props.match.params.id;
                await this.updateSubCategory(this.props.match.params.id);
            }
        }
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    updateSubCategory = async (id) => {
        if(this.isMount)
        {
            let result = await this.c.getSubCategory(id);
            if(!this.currentSubCategoryId)
            {
                this.currentSubCategoryId = result[0].id;
            }
            this.setState((prev) => ({
                ...this.state,
                subCategory : result
            }));
        }
    }

    render()
    {
        if(this.state.subCategory)
        {
            return (
                <div>
                    <ul>
                        {this.state.subCategory.map(sub => {
                            if(parseInt(this.currentSubCategoryId) === sub.id)
                            {
                                return (
                                    <li key={sub.id}>
                                        <Link to={`/category/find/${this.currentCategoryId}/${this.currentSubCategoryId}`}>
                                            <b>{sub.categoryName}</b>
                                        </Link>
                                    </li>
                                );
                            }
                            return (
                                <li key={sub.id}>
                                    <Link to={`/category/find/${this.currentCategoryId}/${sub.id}`}>
                                        {sub.categoryName}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div>
                        <SubCategory subCategoryId={this.currentSubCategoryId}/>
                    </div>
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