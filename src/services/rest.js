let pendingRequests = 0;

function toQueryString(obj) {
    let parts = [],
        i;
    for (i in obj) {
        if (obj.hasOwnProperty(i) && obj[i]) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return parts.join("&");
}

function request(obj) {

    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                pendingRequests--;
                if (pendingRequests === 0) {
                    document.dispatchEvent(new Event('stopWaiting'));
                }
                if (xhr.status > 199 && xhr.status < 300) {
                    resolve(xhr.responseText ? JSON.parse(xhr.responseText) : undefined);
                } else {
                    reject(xhr.responseText);
                }
            }
        };

        xhr.open(obj.method, obj.url, true);
        if(obj.contentType)
            xhr.setRequestHeader("Content-Type", obj.contentType);
        if(obj.needToken) {
            if(sessionStorage.getItem("token")) {
                xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
            }
        }
        xhr.send(obj.data ? JSON.stringify(obj.data) : undefined);
        pendingRequests++;
        if (pendingRequests === 1) {
            document.dispatchEvent(new Event('startWaiting'));
        }
    });

}

export let get = (url, needToken) => request({method: "GET", url, needToken});

export let post = (url, data) => request({method: "POST", contentType: "application/json", url, data});

export let put = (url, data) => request({method: "PUT", contentType: "application/json", url, data});

export let del = (url) => request({method: "DELETE", url});
