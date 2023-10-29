import { api } from "./api";

class ApiAuth {
  constructor(options) {
    this._options = options;
  }

  // авторизация
  getAuthorization(args) {
    const url = `${this._options.baseUrl}/login`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        login: args.body.login,
        password: args.body.password,
      }),
    })
      .then((response) => {
      //  return api._processResponse(response, ResultType.JSON);
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          args?.resolveCallback?.(res);
        }
      })
      .catch((err) => {
        api._processError(err, url);
        args?.errorCallback?.(err);
      })
      .finally(() => args?.finalCallback?.());
  }
}

const apiAuth = new ApiAuth({
  baseUrl: process.env.REACT_APP_HOST_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiAuth };
