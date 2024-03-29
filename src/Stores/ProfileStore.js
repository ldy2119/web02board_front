import {observable, action} from "mobx";
import axios from "axios";

class ProfileStore {

    static __instance = null;

    static getInstance() {
        if (ProfileStore.__instance === null) {
            ProfileStore.__instance = new ProfileStore();
        }
        return ProfileStore.__instance;
    }

    constructor()
    {
        ProfileStore.__instance = this;
    }

    @observable user = null;
    @action Login = async (u) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/login",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(u)
            });
            // console.log(response);
            if(response.status === 200)
            {
                this.user = response.data;
                // console.log(this.user);
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            this.user = null;
        }
    }

    @action Logout = async () => {
        this.user = null;
    }

    @action EditProfile = async(user) => {
        try
        {
            // console.log(user);
            let response = await axios({
                url : "http://localhost:8080/api/modifyUser",
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(user)
            });
            // console.log(response);
            if(response.status === 200)
            {
                // console.log(response.data);
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return 0;
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            this.user = null;
        }
    }
    @action Register = async(user) => {
        try
        {
            let request = {
                account : user.account,
                password : user.password,
                userName : user.name,
                phoneNumber : user.phone,
                telNumber : user.tel,
                postNumber : user.post,
                address : user.address,
                detailAddress : user.detailAddress,
                email : user.email,
                mileage : 0
            };
            // console.log(request);

            let response = await axios({
                url : "http://localhost:8080/api/user/add",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(request)
            });
            // console.log(response);
            if(response.status === 200)
            {
                // console.log(response.data);
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return 0;
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
        }
    }

    @action checkAccount = async (account) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/user/checkAccount/" + account,
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            // console.log(response);
            if(response.status === 200)
            {
                // console.log(response.data);
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return false;
            }
        }
        catch (e) {
            console.log(e);
            alert(e.toLocaleString());
            return false;
        }
    }

    @action addCart = async (id, count) => {
        try
        {
            let data = {
                userId : this.user.id,
                productId : id,
                productCount : count
            }
            console.log(JSON.stringify(data));
            let response = await axios({
                url : "http://localhost:8080/api/cart/add",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(data)
            });
            console.log(response);
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
        catch (e)
        {
            alert(e.toLocaleString());
            return null;
        }
    }

    @action modifyCart = async (cartId, productId, count) => {
        try
        {
            let data = {
                id : cartId,
                userId : this.user.id,
                productId : productId,
                productCount : count
            }
            let response = await axios({
                url : "http://localhost:8080/api/cart/modify",
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(data)
            });
            console.log(response);
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
        catch (e)
        {
            alert(e.toLocaleString());
            return null;
        }
    }

    @action deleteCart = async (cartId) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/cart/delete/" + cartId,
                method: 'delete',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            console.log(response);
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
        catch (e)
        {
            alert(e.toLocaleString());
            return null;
        }
    }

    @action getCart = async () => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/cart/findByUser/" + this.user.id,
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            // console.log(response);
            if(response.status === 200)
            {
                // console.log(response.data);
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return null;
            }
        }
        catch (e) {
            console.log(e);
            alert(e.toLocaleString());
            return null;
        }
    }
}

export default ProfileStore.getInstance();