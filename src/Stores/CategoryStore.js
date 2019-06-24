import {observable, action} from "mobx";
import axios from "axios";

class CategoryStore {

    static __instance = null;

    static getInstance() {
        if (CategoryStore.__instance === null) {
            CategoryStore.__instance = new CategoryStore();
        }
        return CategoryStore.__instance;
    }

    constructor()
    {
        CategoryStore.__instance = this;
    }

    @observable categories = null;
    @action getCategory = async () =>{

        try {
            let response = await axios({
                url : "http://localhost:8080/api/category",
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if(response.status === 200)
            {
                this.categories = response.data;
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e) {

        }
    }

    @action getCategoryItems = async (categoryId) => {
        try {
            let response = await axios({
                url : "http://localhost:8080/api/product/findByCategory/" + categoryId,
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            // console.log(response);
            if(response.status === 200)
            {
                console.log(response.data);
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return null;
            }
        }
        catch (e) {

        }
    }

    @action getCurrentProducts = async () => {
        try {
            let response = await axios({
                url : "http://localhost:8080/api/product/findByCurrentDate",
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            // console.log(response);
            if(response.status === 200)
            {
                console.log(response.data);
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return null;
            }
        }
        catch (e) {

        }
    }

    @action addCategory = async (category) => {
        try {
            let response = await axios({
                url : "http://localhost:8080/api/category/add",
                method: 'post',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000,
                data : JSON.stringify(category)
            });
            console.log(response);
            if(response.status === 200)
            {
                console.log(response.data);
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return false;
            }
        }
        catch (e) {

        }
    }
}

export default CategoryStore.getInstance();