import { makeAutoObservable } from "mobx";


export default class AppStore {
    id = "";


    constructor() {
        makeAutoObservable(this);
    }

    setId(id) {
        this.id = id
    }

}

const appStore = new AppStore();

export { appStore };
