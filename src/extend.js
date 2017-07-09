let rootPath = 'http://localhost:8028/pc';
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.info(document.cookie);
}
//获取cookie
function getCookie(cname) {
    var value = window.document.cookie.match('(^|;) ?' + cname + '=([^;]*)(;|$)');

    return value ? value[2] : null;
}
//清除cookie
function delCookie(cname) {
    this.setCookie(cname, "", -1);

}
export default {
    rootPath,
    setCookie,
    getCookie,
    delCookie,
}