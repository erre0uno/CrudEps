
function saveLocal(key,value) {
    localStorage.setItem(key, JSON.stringify(value));    
}
function getLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}

