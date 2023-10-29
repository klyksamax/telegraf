import { titleProfile } from "../components/const"

export const getListInputProfile = (appStore) => {
    const arr = []
    for (let key in appStore.profile) {
        arr.push({
            id: key,
            title: getTitleProfile(key),
            value: appStore.profile[key]
        })     
      }
   //appStore.setInputProfile(arr)
    return arr

}

export function getTitleProfile (title) {
    return titleProfile[title.toUpperCase()]
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function getObjectRegister(arr) {
    const obj = arr.reduce(
        (acc, object) => {
          const id = object.id;
          acc[id] ??= "";
          acc[id] = object.value;
          return acc;
        },
        {},
      );
      return obj
}

export function getContet (content) {
    const newContent = [
        {
            tag: "p",
            children: [content]
        }
    ]
    return JSON.stringify(newContent)
}