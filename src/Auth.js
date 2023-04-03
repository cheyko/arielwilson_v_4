
function getAuth(){
    let token = localStorage.getItem("token");
    //let token = getCookie("token");
    return token;
}

function setAuth(val){
    localStorage.setItem("token", val);
    //setCookie("token", val, 365);
}

function removeAuth(){
    localStorage.removeItem("token");
    //document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user-context");
    localStorage.removeItem("aic123");
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*async function getDetails(){
    let token = localStorage.getItem("token");
    const user_details = await axios.post(process.env.REACT_APP_PROXY+"/api/get-details",{token});
    return user_details;
}*/

export {getAuth, setAuth, removeAuth};