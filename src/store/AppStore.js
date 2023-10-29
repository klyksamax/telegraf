import { makeAutoObservable } from "mobx";
import { api } from "../utils/api";
import { getObjectRegister } from "../utils/basic";


export default class AppStore {
    id = "";
    inputRegister = []
    inputProfile = []
    token = ""
    openPopup = true
    profile = []

    constructor() {
        makeAutoObservable(this);
        this.inputRegister = [
            {
                id: "short_name",
                title: "Введите свое имя",
                value: ""
            },
            {
                id: "author_name",
                title: "Введите свое полное имя",
                value: ""
            },
        ];
    }

    setId(id) {
        this.id = id
    }

    setInputRegister(inputRegister){
        this.inputRegister = inputRegister
    }

    setInputProfile(inputProfile){
        this.inputProfile = inputProfile
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

    onApplyPopup(){
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
                        }
                    })
                }
                this.setInputToken(data.result)
            },
        });
    }

}

const appStore = new AppStore();

export { appStore };
