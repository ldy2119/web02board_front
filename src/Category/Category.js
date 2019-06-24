import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import CategoryInfo from "./CategoryInfo";

@inject("stores")
@observer
class Category extends Component {

    c = this.props.stores.CatetoryStore;

    categories = null;
    async componentDidMount() {
        await this.c.getCategory();
        this.categories = this.c.categories;
    }

    render()
    {
        return(
            <ul style={{"margin" : "20px"}}>
                {this.c.categories && this.c.categories.map((category) => {
                    return(
                        <CategoryInfo id={category.id} name={category.categoryName} key={category.id}/>
                    );
                })}
            </ul>
        )
    }

}

export default Category;