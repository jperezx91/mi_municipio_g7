import axios from "axios"
import * as SecureStore from 'expo-secure-store';

const client_auth = axios.create(
    {
        baseURL: "http://10.0.2.2:5000/api",
        headers: {
            Authorization: ''
        }
    }
)

const client = axios.create(
    {
        baseURL: "http://10.0.2.2:5000/api"
    }
)

client_auth.interceptors.request.use( async config => {
    try{
        //const bearerToken = await EncryptedStorage.getItem('bearerToken')
        const bearerToken = await SecureStore.getItemAsync('bearerToken')
        if(bearerToken)
        {
            config.headers.Authorization = `Bearer ${bearerToken}`

        }else{
            // hay que crear un storage.
        }
        return config
    }catch(e)
    {
        console.log(e)
    }
}, (e) => { console.error(e)})

export default {client, client_auth}
