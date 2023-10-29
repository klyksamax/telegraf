
const ResultType = {
    JSON: "JSON",
    BINARY: "BINARY",
    TEXT: "TEXT",
};

export const ABORT_ERROR = "AbortError";
const NOT_AUTH_STATUS = 401;

class Api {
    backendUrl = "https://api.telegra.ph/createAccount";

    constructor(options) {
        this._options = options;
    }

    _fetchData(url, requestBody, args, resultType = ResultType.JSON) {
        // console.log(url)
        return fetch(url, requestBody)
            .then((response) => {
                console.log(response)
                return this._processResponse(response, resultType);
            })
            .then((result) => {
                console.log(result)
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

    getAccount(args) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const url = this.backendUrl;//sdfaasdfasdf
        const body = {
            method: "POST",
            body: JSON.stringify({
                short_name: "Maksim",
                author_name: "Maksim Holiday"
            })
        };
        return this._fetchData(url, body, args);
    }
}

const api = new Api({
    baseUrl: process.env.REACT_APP_HOST_API,
});

export { api };
