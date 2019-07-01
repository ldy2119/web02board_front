import {action} from "mobx";
import axios from "axios";

class CommentStore {

    static __instance = null;

    static getInstance() {
        if (CommentStore.__instance === null) {
            CommentStore.__instance = new CommentStore();
        }
        return CommentStore.__instance;
    }

    constructor()
    {
        CommentStore.__instance = this;
    }

   @action getComment = async (id) => {
       try {
           let response = await axios({
               url : "http://localhost:8080/api/comment/findByProduct/" + id,
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
           return null;
       }
   }

   @action addComment = async (userName, productId, comment) => {
       try {
           let data = {
               filteredUserName : userName,
               productId : productId,
               commentContent : comment
           };
           let response = await axios({
               url : "http://localhost:8080/api/comment/add",
               method: 'post',
               data : JSON.stringify(data),
               headers: {
                   "Content-type" : "application/json; charset=UTF-8"
               },
               timeout: 3000
           });
           console.log(response);
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
           return null;
       }
   }
}

export default CommentStore.getInstance();