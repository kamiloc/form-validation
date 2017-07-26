var formValid = false;

var rawTemplate = document.getElementById('alertTemplate').innerHTML;
var alertTemplate = Handlebars.compile(rawTemplate);

var rawPostTemplate = document.getElementById('postCard').innerHTML;
var postTemplate = Handlebars.compile(rawPostTemplate);


function validateField(field) {
    field.style.border = '1px solid green';
    $('#' + field.id).popover('hide');
    formValid = true;
}

function invalidateField(field) {
    field.style.border = '1px solid red';
    $('#' + field.id).popover('show');
    formValid = false;
}

function resetField(field) {
    field.style.border = '1px solid grey';
    $('#' + field.id).popover('hide');
}

window.onload = function () {

    document.getElementById('reset').addEventListener('click', reset);
    document.getElementById('submit').addEventListener('click', submitForm);

    var gender = document.getElementById('gender'), password = document.getElementById('password'),
        confirmPassword = document.getElementById('confirmPassword');

    confirmPassword.addEventListener('blur', function () {
        if (password.value === this.value) {
            validateField(this);
        } else {
            invalidateField(this);
        }
    }.bind(confirmPassword))


    gender.addEventListener('blur', function () {
        if (this.value != 'none') {
            this.style.fontWeight = 'bolder';
            validateField(this);
        } else {
            this.style.fontWeight = 'lighter';
            invalidateField(this);
        }
    }.bind(gender));



    var inputs = Array.from(document.querySelectorAll('input'));

    inputs.forEach(function (input) {
        var regex = null;

        switch (input.type) {
            case 'text':
                regex = /[a-zA-Z]+/;
                if (input.id == 'phone') {
                    regex = /(([2-9]\d{2}-\d{3}-\d{4})|(\([2-9]\d{2}\)-\d{3}-\d{4})|([2-9]\d{2}\.\d{3}\.\d{4}))([xX]\d{1,4})?/;
                }
                break;

            case 'email':
                regex = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
                break;

            case 'password':
                regex = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
                break;

            default:
                regex = /[a-zA-Z]+/;
                break;
        }

        if (input.id != 'confirmPassword') {
            input.addEventListener('blur', function () {
                if (!regex.test(input.value)) {
                    invalidateField(input);
                } else {
                    validateField(input);
                }
            });
        }
    });
}




function submitForm() {

    var messageSelector = document.getElementById('message'), inputs = Array.from(document.querySelectorAll('input')),
        gender = document.getElementById('gender');

    inputs.forEach(function (input) {
        if (input.value == '') {
            invalidateField(input);
            formValid = false;
        }
    });

    if (gender.value == 'none') {
        invalidateField(gender);
        formValid = false;
    }

    if (!formValid) {
        messageSelector.innerHTML = alertTemplate({ type: 'danger', head: 'Somenthing is wrong', body: 'Check all fields are correct ?' });
    } else {
        messageSelector.innerHTML = alertTemplate({ type: 'success', head: 'All good', body: 'All fields are correct' });
        drawPosts();
    }

}

function reset() {
    var inputs = Array.from(document.querySelectorAll('input')), select = document.querySelector('select');

    inputs.forEach(function (input) {
        resetField(input);
        input.value = '';
    });

    resetField(select);
    select.value = 'none';

    formValid = false;
}




function drawPosts() {

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts/',
        method: 'GET'
    })
        .then(function (data) {
            document.getElementById('postsContainer').innerHTML = postTemplate({ items: data });
        })
        .catch(function (err) {
            document.getElementById('postsContainer').innerHTML = alertTemplate({ type: 'danger', head: 'Post no loaded', body: err.statusText });
        });
}