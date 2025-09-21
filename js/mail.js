//update this with your js_form selector
var form_id_js = "javascript_form";

var data_js = {
    "access_token": "4z3tl4tthp116xujdhqaa5g6"
};

var recaptcha_response = '';

var sendButton = document.getElementById("js_send");

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

function js_send() {
    sendButton.disabled=true;
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
                `<div class="alert alert-success alert-dismissible" role="alert">`,
                `   <div>'Your message has been sent!'</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
            ].join('')

            if (alertPlaceholder) {
                alertPlaceholder.append(wrapper)
            } else {
                alert('Your message has been sent!')
            }
            if (sendButton) sendButton.disabled = false;
        } else
        if(request.readyState == 4) {
            alert("Message could not be sent, try contacting on LinkedIn")
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
                `<div class="alert alert-danger alert-dismissible" role="alert">`,
                `   <div>'Message could not be sent, try contacting on LinkedIn'</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
            ].join('')

            if (alertPlaceholder) {
                alertPlaceholder.append(wrapper)
            }
            if (sendButton) sendButton.disabled = false;
        }
    };

    var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
    var message = document.querySelector("#" + form_id_js + " [name='text']").value;
    data_js['subject'] = subject;
    data_js['text'] = message;

    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

function submitUserForm(){
    if(recaptcha_response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
    }
    else{
        js_send(); 
    }
}

function verifyCaptcha(token) {
    recaptcha_response = token;
    document.getElementById('g-recaptcha-error').innerHTML = '';
}

function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);

if (js_form) {
    js_form.addEventListener("submit", function (e) {
        e.preventDefault();
        submitUserForm();
    });
}

if (sendButton) {
    sendButton.addEventListener("click", function (e) {
        e.preventDefault();
        submitUserForm();
    });
}