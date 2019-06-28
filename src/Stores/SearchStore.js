import {action} from "mobx";
import axios from "axios";

class SearchStore {

    static __instance = null;

    static getInstance() {
        if (SearchStore.__instance === null) {
            SearchStore.__instance = new SearchStore();
        }
        return SearchStore.__instance;
    }

    constructor()
    {
        SearchStore.__instance = this;
    }

    @action getSearch = async(search) => {
        try
        {
            // console.log(user);
            let response = await axios({
                url : "http://localhost:8080/api/product/findByContainName/" + search,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
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
                return null;
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            return null;
        }
    }
}

export default SearchStore.getInstance();