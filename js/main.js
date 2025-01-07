if (document.querySelectorAll('[data-pid]').length > 0) {
    ajax_param.items = document.querySelectorAll('[data-pid]');
}

function send_ajax_custom(ajax_url, method, action, param, calbackasucsess, calbackaerror) {
    if (!action) {
        return false
    }
    var url = (ajax_url) ? ajax_url : ajaxactionurl;
    if (method == 'GET' || method == 'get') {
        var senddata = [];
        for (key in param) {
            senddata.push(key + '=' + param[key]);
        }
        if (senddata.length > 0) {
            url += '?action=' + action + '&' + senddata.join('&');
        } else {
            url += '?action=' + action;
        }
    } else {
        var formData = new FormData();
        if (formData.hasOwnProperty('set')) {
            formData.set('action', action);
            for (key in param) {
                formData.set(key, param[key]);
            }
        } else {
            formData.append('action', action);
            for (key in param) {
                formData.append(key, param[key]);
            }
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (method == 'POST' || method == 'post') {
        xhr.send(formData);
    } else {
        xhr.send();
    }
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            var resp = xhr.responseText;
            if (resp) {
                if (calbackasucsess) {
                    calbackasucsess(resp);
                }
            }
        } else {
            if (calbackaerror) {
                calbackaerror(resp);
            }
        }
    }
}

if (ajax_param.items) {
    for (var i = 0; i < ajax_param.items.length; i++) {
        ajax_param.items[i].addEventListener('click', get_ref_custom);
    }
}
var win = false;

function get_ref_custom() {
    var pid = this.getAttribute('data-pid');
    if (pid == '') {
        return;
    }

    if (this.getAttribute('data-self') == '1') {
        window.win = window.open('', '_self');
    } else {
        window.win = window.open('', '_blank');
    }
    send_ajax_custom(
        ajax_param.url + '?action=get_ref',
        'POST',
        'get_ref',
        {
            nonce: ajax_param.nonce,
            pid: pid,
            site_id: ajax_param.site_id
        },
        init_ection
    ); // приклад виклику
}


function init_ection(data) {
    if (window.win) {
        if (data) {
            var response = JSON.parse(data);
            if (response.status) {
                window.win.document.write('<div>Redirecting ...</div>');
                window.win.location.href = response.link;
            } else {
                window.win.close();
            }
        } else {
            window.win.close();
        }
    }
}
