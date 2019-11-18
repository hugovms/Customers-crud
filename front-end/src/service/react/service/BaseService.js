import axios from "axios";

const apiUrl = process.env.API_URL;

export default class BaseService {
    constructor(config) {
        this.config = config;
    }

    GetToken() {
        return new Promise((resolve, reject) => {
            try {
                if(localStorage) {
                    var token = localStorage.getItem("token");
                    resolve(token);
                } else {
                    var ReactNative = require("react-native");
                    ReactNative.AsyncStorage.getItem("token", (err, result) => err ? reject(err) : resolve(result));
                }
            }
            catch(e) {
                reject(e);
            }
        });
    }

    CreateRequest(tipo, url, data = null, params) {
        return new Promise((resolve, reject) => {
            this.GetToken()
            .then(token => {
                
                axios({
                        method: tipo,
                        url: apiUrl + '/api/' + url,
                        data: data,
                        params: params,
                        headers: {
                            "Content-Type":"application/json",
                            "Authorization": "Bearer " + token
                        }
                    })
                    .then(resolve)
                    .catch(reject);

                });
        });
    }

    CreateBlobRequest(tipo, url, data = null) {
        return new Promise((resolve, reject) => {
            this.GetToken()
                .then(token => {

                    axios({
                        method: tipo,
                        url: apiUrl + url,
                        data: data,
                        headers: {
                            "Authorization": "Bearer " + token
                        },
                        responseType: 'blob'
                    })
                    .then(resolve)
                    .catch(reject);

                });
        });
    }

    FormatDate(date) {
        return date.replace(new RegExp('/', 'g'), '.');
    }
}