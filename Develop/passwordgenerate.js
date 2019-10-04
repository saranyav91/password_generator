function lpCreatePass(length, upper, lower, digits, special, mindigits, ambig, reqevery) {
    if (typeof (length) == "undefined") {
        length = 8 + get_random(0, 1);
    }
    if (length > 256) {
        length = 256;
    }
    if (mindigits > 256) {
        mindigits = 256;
    }
    if (typeof (upper) == "undefined") {
        upper = true;
    }
    if (typeof (lower) == "undefined") {
        lower = true;
    }
    if (typeof (digits) == "undefined") {
        digits = true;
    }
    if (typeof (special) == "undefined") {
        special = false;
    }
    if (typeof (mindigits) == "undefined") {
        mindigits = 0;
    }
    if (typeof (ambig) == "undefined") {
        ambig = false;
    }
    if (typeof (reqevery) == "undefined") {
        reqevery = true;
    }
    var minlower = 0;
    var minupper = 0;
    var minspecial = 0;
    if (reqevery) {
        minlower = minupper = minspecial = 1;
    }
    var positions = new Array();
    if (lower && minlower > 0) {
        for (var i = 0; i < minlower; i++) {
            positions[positions.length] = "L";
        }
    }
    if (upper && minupper > 0) {
        for (var i = 0; i < minupper; i++) {
            positions[positions.length] = "U";
        }
    }
    if (digits && mindigits > 0) {
        for (var i = 0; i < mindigits; i++) {
            positions[positions.length] = "D";
        }
    }
    if (special && minspecial > 0) {
        for (var i = 0; i < minspecial; i++) {
            positions[positions.length] = "S";
        }
    }
    while (positions.length < length) {
        positions[positions.length] = "A";
    }
    positions.sort(function () {
        return get_random(0, 1) * 2 - 1;
    });
    var chars = "";
    var lowerchars = "abcdefghjkmnpqrstuvwxyz";
    if (!ambig) {
        lowerchars += "ilo";
    }
    if (lower) {
        chars += lowerchars;
    }
    var upperchars = "ABCDEFGHJKMNPQRSTUVWXYZ";
    if (!ambig) {
        upperchars += "ILO";
    }
    if (upper) {
        chars += upperchars;
    }
    var digitchars = "23456789";
    if (!ambig) {
        digitchars += "10";
    }
    if (digits) {
        chars += digitchars;
    }
    var specialchars = "!@#$%^&*";
    if (special) {
        chars += specialchars;
    }
    var pass = "";
    for (var x = 0; x < length; x++) {
        var usechars;
        switch (positions[x]) {
            case "L":
                usechars = lowerchars;
                break;
            case "U":
                usechars = upperchars;
                break;
            case "D":
                usechars = digitchars;
                break;
            case "S":
                usechars = specialchars;
                break;
            case "A":
                usechars = chars;
                break;
        }
        var i = get_random(0, usechars.length - 1);
        pass += usechars.charAt(i);
    }
    return pass;
}

function get_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doCopy(event) {

    var copyText = password;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied the password: " + copyText.value);

}
var submit1 = document.querySelector("#generate");
var copy1 = document.querySelector("#copy");
var password = document.querySelector("#password");

submit1.addEventListener("click", function (event) {
    event.preventDefault();
    var length = prompt("Enter password length");
    if (length < 8 || length > 128) {
        alert("Length must be between 8 and 128 characters");
    }
    else {
        var uppercase = confirm("Do you want uppercase letters?");
        var lowercase = confirm("Do you want lowercase letters?");
        var digits = confirm("Do you want digits?")
        var specialchar = confirm("Do you want special characters?")

        if (!uppercase && !lowercase && !digits && !specialchar) {
            alert("Please select atlease one character type");
        }
        else {
            var pass = lpCreatePass(length, uppercase, lowercase, digits, specialchar, true, true, true);
            password.textContent = pass;
        }
    }
});

copy1.addEventListener("click", doCopy);

