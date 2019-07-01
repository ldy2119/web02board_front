import {action} from "mobx";
import axios from "axios";

class AdStore {

    static __instance = null;

    static getInstance() {
        if (AdStore.__instance === null) {
            AdStore.__instance = new AdStore();
        }
        return AdStore.__instance;
    }

    constructor()
    {
        AdStore.__instance = this;
    }

    @action getAds = async () =>{

        try {
            let response = await axios({
                url : "http://localhost:8080/api/advertisement",
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if(response.status === 200)
            {
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
        return null;
    }
}

export default AdStore.getInstance();