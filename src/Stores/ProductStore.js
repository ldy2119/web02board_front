import {observable, action} from "mobx";
import axios from "axios";


class ProductStore {

    static __instance = null;

    static getInstance() {
        if (ProductStore.__instance === null) {
            ProductStore.__instance = new ProductStore();
        }
        return ProductStore.__instance;
    }

    constructor()
    {
        ProductStore.__instance = this;
    }

    @observable categories = null;
    @action getProduct = async (id) =>{

        try {
            let response = await axios({
                url : "http://localhost:8080/api/product/find/" + id,
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            // console.log(response);
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                // alert("전송 실패");
            }
        }
        catch (e) {

        }
    }
}

export default ProductStore.getInstance();