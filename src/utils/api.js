
const ResultType = {
    JSON: "JSON",
    BINARY: "BINARY",
    TEXT: "TEXT",
};

export const ABORT_ERROR = "AbortError";
const NOT_AUTH_STATUS = 401;

class Api {
    backendUrl = "https://api.telegra.ph/";

    constructor(options) {
        this._options = options;
    }

    _fetchData(url, requestBody, args, resultType = ResultType.JSON) {
        return fetch(url, requestBody)
            .then((response) => {
                
                return this._processResponse(response, resultType);
            })
            .then((result) => {
              
                args?.resolveCallback?.(result);
                return result;
            })
            .catch((err) => {
                this._processError(err, url.toString().split("/").at(-1));
                args?.errorCallback?.(err);
                return err;
            })
            .finally(() => {
                args?.finalCallback?.();
            });
    }

    _processError(err, url) {
        console.log(err, url);
    }

    async _processResponse(response, resultType) {
        if (response.ok) {
            switch (resultType) {
                case ResultType.JSON: {
                    return response.json();
                }
                case ResultType.BINARY: {
                    return response.blob();
                }
                case ResultType.TEXT:
                default: {
                    return response.text();
                }
            }
        } else {
            let errJson = {};
            let errorObj = {};
            let errorInfo = await response.text();

            try {
                errJson = JSON.parse(errorInfo);
            } catch (error) { }

            switch (response.status) {
                case NOT_AUTH_STATUS: {
                    errorObj = {
                        code: NOT_AUTH_STATUS,
                        message: errJson.errorMessage,
                        callStack: errJson.stackTrace,
                    };
                    break;
                }
                case 400:
                case 404:
                case 500: {
                    errorObj = {
                        code: response.status,
                        message: errJson.errorMessage,
                        callStack: errJson.stackTrace,
                        innerMessage: errJson.causeMessage,
                        innerCallStack: errJson.causeStackTrace,
                    };
                    break;
                }
                default: {
                    errorObj = {
                        code: response.status,
                        message: "uknown error",
                    };
                    break;
                }
            }
            return Promise.reject(errorObj);
        }
    }

    getToken(args) {
        //https://api.telegra.ph/createAccount?short_name=Maksim&author_name=Holiday
        const url = this.backendUrl + `createAccount?short_name=${args.body.short_name}&author_name=${args.body.author_name}`;
        const body = {
            method: "POST",
            // body: JSON.stringify({
            //     short_name: "Maksim",
            //     author_name: "Maksim"
            // })
        };
        return this._fetchData(url, body, args);
    }

    getAccount(args) {
        const url = this.backendUrl + `getAccountInfo?access_token=${args.body}`;
        const body = {
            method: "GET",
            // body: JSON.stringify({
            //     access_token : "",
            //     
            // })
        };
        return this._fetchData(url, body, args);
    }

    editAccountInfo(args) {
        const url = this.backendUrl + `editAccountInfo?access_token=${args.body.token}&short_name=${args.body.profole.short_name}&author_name=${args.body.profole.author_name}&author_url=${args.body.profole.author_url}`;
        console.log(args.body.profole.author_url)
        const body = {
            method: "POST",
        };
        return this._fetchData(url, body, args);
    }

    getPageList(args) {
        const url = this.backendUrl + `getPageList?access_token=${args.body}`;
        const body = {
            method: "GET",
        };
        return this._fetchData(url, body, args);
    }

    createPage(args) {
        const url = this.backendUrl + `createPage?access_token=${args.body.token}&
        title=${args.body.body.title}&
        author_name=${args.body.body.author_name}&
        content=${args.body.content}&
        return_content=${args.body.return}`;
        const body = {
            method: "POST",
        };
        return this._fetchData(url, body, args);
    }
}

const api = new Api({
    baseUrl: process.env.REACT_APP_HOST_API,
});

export { api };
