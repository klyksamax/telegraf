import { makeAutoObservable } from "mobx";
import { api } from "../utils/api";
import { getContet, getObjectRegister } from "../utils/basic";
import { pageInput } from "../components/const";


export default class AppStore {
    id = "";
    inputRegister = []
    inputProfile = []
    inputPage = []
    pageList = {}
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
        this.inputPage = pageInput
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

}

const appStore = new AppStore();

export { appStore };
