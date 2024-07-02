import { Client, Databases, ID, Query } from "appwrite"
import appwritedata from "./appwrite.config"

class chat {
    client = new Client()
    database

    constructor() {
        this.client
            .setEndpoint(appwritedata.appwriteapiurl)
            .setProject(appwritedata.projectid);

        this.database = new Databases(this.client)
    }

    async listchatbars(id){
        return await this.database.listDocuments(appwritedata.orbitbaseid, appwritedata.chatcollid, [Query.equal("userid", id)])
    }

    async createchatbar(title, id){
        return await this.database.createDocument(appwritedata.orbitbaseid, appwritedata.chatcollid, ID.unique(), {title:title, userid:id})
    }

    async getchatbar(docid){
        return await this.database.getDocument(appwritedata.orbitbaseid, appwritedata.chatcollid, docid)
    }

    async updatechat(docid,{chatsarr, lastvisited}){
        return await this.database.updateDocument(appwritedata.orbitbaseid, appwritedata.chatcollid, docid,{chatsarr, lastvisited})
    }

    async deletechat(id){
        return await this.database.deleteDocument(appwritedata.orbitbaseid, appwritedata.chatcollid, id)
    }

}

const Chatbase = new chat()
export default Chatbase