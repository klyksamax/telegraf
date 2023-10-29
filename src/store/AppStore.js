import { makeAutoObservable } from "mobx";
import { api } from "../utils/api";
import { getContet, getObjectRegister } from "../utils/basic";
import { inputRegister, loginInput, pageInput } from "../components/const";


export default class AppStore {
    id = "";
    auth = false;
    inputRegister = [];
    inputLogin = [];
    inputProfile = [];
    inputPage = [];
    pageList = {};
    token = "";
    openPopup = true;
    profile = [];

    constructor() {
        makeAutoObservable(this);
        this.inputRegister = inputRegister;
        this.inputPage = pageInput
        this.inputLogin = loginInput;
    }

    setId(id) {
        this.id = id
    }

    setAuth(auth){
        this.auth = auth
    }

    setInputLogin(inputLogin){
        this.inputLogin = inputLogin
    }

    setInputRegister(inputRegister){
        this.inputRegister = inputRegister
    }

    setInputProfile(inputProfile){
        this.inputProfile = inputProfile
    }

    setInputPage(inputPage){
        this.inputPage = inputPage
    }

    setInputToken(inpuToken){
     this.inpuToken = inpuToken
    }

    setOpenPopup(openPopup){
        this.openPopup = openPopup
    }

    setProfile(profile){
        this.profile = profile
    }

    setToken(token){
        this.token = token
    }

    setPageList(pageList){
        this.pageList = pageList
    }

    onApplyLogin(){
        api.getAccount({
            body: getObjectRegister(this.inputLogin).token,
            resolveCallback: (data) => {
                if(data.ok){
                    localStorage.setItem("userTelegraf", getObjectRegister(this.inputLogin).token);
                    this.setToken(getObjectRegister(this.inputLogin).token)
                    this.setProfile(data.result)
                    this.setOpenPopup(false)
                    this.setInputToken(data.result)
                    this.setAuth(true)
                }
            },
        });
}

    onApplyRegister(){
            api.getToken({
                body: getObjectRegister(this.inputRegister),
                resolveCallback: (data) => {
                    if(data.result?.access_token){
                        localStorage.setItem("userTelegraf", data.result.access_token);
                        this.setToken(data.result.access_token)
                        api.getAccount({
                            body: data.result.access_token,
                            resolveCallback: (data) => {
                                this.setProfile(data.result)
                                this.setOpenPopup(false)
                                this.setAuth(true)
                            }
                        })
                    }
                    this.setInputToken(data.result)
                },
            });
    }

    onApplyPage(){
        api.createPage({
            body: {
                body: getObjectRegister(this.inputPage),
                content: getContet(getObjectRegister(this.inputPage).content),
                token: this.token,
                return: true
            },
            resolveCallback: (data) => {
                this.setPageList(data.result)
            }
        })
    }


    closeModul(){
        this.setOpenPopup(true)
        this.token = ""
        localStorage.removeItem("userTelegraf");
        this.profile=[]
        this.inputRegister = inputRegister;
        this.inputPage = pageInput
        this.inputLogin = loginInput;
        this.auth = false
    }
}

const appStore = new AppStore();

export { appStore };
