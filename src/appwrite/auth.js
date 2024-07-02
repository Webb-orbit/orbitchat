import appwritedata from "./appwrite.config";
import { ID, Account, Client } from "appwrite";

class author {
    client = new Client()
    account
    constructor() {
        this.client
            .setEndpoint(appwritedata.appwriteapiurl)
            .setProject(appwritedata.projectid);

        this.account = new Account(this.client)
    }

    async getcurrentuser() {
        return await this.account.get()
    }

    async firstcreate(email, password, name) {
        let creation = await this.account.create(ID.unique(), email, password, name)
        if (creation) {
            return await this.login(email, password)
        }
    }

    async login(email, password) {
        return await this.account.createEmailPasswordSession(email, password)
    }

    async appwritelogout() {
        return await this.account.deleteSession("current")
    }

    async updateemail(email, password) {
        return await this.account.updateEmail(email, password)
    }

}

const AuthClient = new author()
export default AuthClient