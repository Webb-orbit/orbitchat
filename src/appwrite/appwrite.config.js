const appwritedata = {
    projectid: String(import.meta.env.VITE_PROJECT_ID),
    appwriteapiurl: String(import.meta.env.VITE_APPWRITE_URL),
    orbitbaseid: String(import.meta.env.VITE_ORBITCHATBASE_ID),
    chatcollid: String(import.meta.env.VITE_CHATSCOLL_ID),
}

export default appwritedata