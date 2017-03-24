var formValid = false;

function validateField(field) {
    field.style.border = "1px solid green";
    $('#' + field.id).popover('hide');
    formValid = true;
}

function invalidateField(field) {
    field.style.border = "1px solid red";
    $('#'+field.id).popover('show');
    formValid = false;
}

window.onload = function () {

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

    var messageSelector = document.getElementById('message'),  inputs = Array.from(document.querySelectorAll('input')),
    gender = document.getElementById('gender');

    inputs.forEach(function(input){
        if(input.value == ''){
            invalidateField(input);
            formValid = false;
        }
    });

    if(gender.value == 'none') {
        invalidateField(gender);
        formValid = false;
    }

    if(!formValid) {
        messageSelector.innerHTML = 
        '<div class="alert alert-danger" role="alert">'+
            '<strong>Somenthing is wrong:</strong> Check all fields are correct ?'+
        '</div>';
    } else {
       messageSelector.innerHTML = 
        '<div class="alert alert-success" role="alert">'+
            '<strong>All good:</strong> All fields are correct'+
        '</div>';
    }

}

