export function numberWithCommas(x) {
    if(x === null || x === '') return '0'
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function isJsonString(str) {
    if (str === null) return false;
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}