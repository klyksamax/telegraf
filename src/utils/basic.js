export const getListInputProfile = (profile) => {

    const map = profile.map((el) => {
        return new Map(Object.entries(el));
    })
    const arr = Array.from(map[0])
    return arr
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}