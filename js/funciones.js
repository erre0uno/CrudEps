
function saveLocal(key,value) {
    localStorage.setItem(key, JSON.stringify(value));    
}
function getLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saludar(){
    var toastLiveExample = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
}