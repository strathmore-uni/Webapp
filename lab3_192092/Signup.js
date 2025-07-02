// Strong password regex: min 8 chars, upper, lower, number, special char
function isStrongPassword(pw) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pw);
}
// Kenyan phone: +2547XXXXXXXX or 07XXXXXXXX
function isValidPhone(phone) {
    return /^(\+254|0)7\d{8}$/.test(phone);
}
// Simple email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.getElementById('regForm').onsubmit = function(e) {
    let valid = true;  
    // Username validation

    const username = document.getElementById('username').value;
    if (!/^[A-Za-z]+$/.test(username)) {
        document.getElementById('userError').textContent = "Only alphabets allowed, no spaces or numbers.";
        valid = false;
    } else {
        document.getElementById('userError').textContent = "";
    }
    // Password validation
    const password = document.getElementById('password').value;
    if (!isStrongPassword(password)) {
        document.getElementById('passError').textContent = "Password must be 8+ chars, upper, lower, number, special char.";
        valid = false;
    } else {
        document.getElementById('passError').textContent = "";
    }
    // Confirm password
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmError').textContent = "Passwords do not match.";
        valid = false;
    } else {
        document.getElementById('confirmError').textContent = "";
    }
    // Phone number validation
    const phone = document.getElementsByName('number')[0].value;
    if (!isValidPhone(phone)) {
        if (!document.getElementById('phoneError')) {
            const phoneInput = document.getElementsByName('number')[0];
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error';
            errorSpan.id = 'phoneError';
            phoneInput.parentNode.insertBefore(errorSpan, phoneInput.nextSibling);
        }
        document.getElementById('phoneError').textContent = "Enter a valid Kenyan phone number.";
        valid = false;
    } else if (document.getElementById('phoneError')) {
        document.getElementById('phoneError').textContent = "";
    }
    // Email validation
    const email = document.getElementsByName('email')[0].value;
    if (!isValidEmail(email)) {
        if (!document.getElementById('emailError')) {
            const emailInput = document.getElementsByName('email')[0];
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error';
            errorSpan.id = 'emailError';
            emailInput.parentNode.insertBefore(errorSpan, emailInput.nextSibling);
        }
        document.getElementById('emailError').textContent = "Enter a valid email address.";
        valid = false;
    } else if (document.getElementById('emailError')) {
        document.getElementById('emailError').textContent = "";
    }
    // Gender validation
    const genderRadios = document.getElementsByName('gender');
    let genderSelected = false;
    let genderValue = "";
    for (let i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            genderSelected = true;
            genderValue = genderRadios[i].value;
            break;
        }
    }
    if (!genderSelected) {
        // Show error below the last gender radio button
        if (!document.getElementById('genderError')) {
            const lastGender = genderRadios[genderRadios.length - 1];
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error';
            errorSpan.id = 'genderError';
            lastGender.parentNode.insertBefore(errorSpan, lastGender.nextSibling);
        }
        document.getElementById('genderError').textContent = "Please select your gender.";
        valid = false;
    } else if (document.getElementById('genderError')) {
        document.getElementById('genderError').textContent = "";
    }
    // Account type
    const accountTypeSelect = document.getElementById('accountType');
    const accountType = accountTypeSelect.value;
    const accountTypeText = accountTypeSelect.options[accountTypeSelect.selectedIndex].text;
    if (!accountType) {
        document.getElementById('accountError').textContent = "Please select an account type.";
        valid = false;
    } else {
        document.getElementById('accountError').textContent = "";
    }
    if (!valid) {
        e.preventDefault();
        return false;
    }

    // Show success message
    alert(`You, ${username}, have successfully registered as ${accountTypeText}.`);

    // Ask if the user wants to save the information
    if (confirm("Do you want to save this information?")) {
        // If OK, redirect to Shoe purchase
        this.reset();
        window.location.href = "Shoe purchase.html";
    } else {
        // If Cancel, stay on the page (do nothing)
        alert("Information was not saved.");
    }
    return false;
}

// Real-time username validation
document.getElementById('username').addEventListener('input', function() {
    if (!/^[A-Za-z]+$/.test(this.value)) {
        document.getElementById('userError').
        textContent = "  Alphabets only, no spaces or numbers.";
    } else {
        document.getElementById('userError').textContent = "";
    }
});

// Real-time password validation
document.getElementById('password').addEventListener('input', function() {
    if (!isStrongPassword(this.value)) {
        document.getElementById('passError').textContent = "Password must be 8+ chars, upper, lower, number, special char.";
    } else {
        document.getElementById('passError').textContent = "";
    }
});

// Real-time confirm password validation
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    if (this.value !== password) {
        document.getElementById('confirmError').textContent = "Passwords do not match.";
    } else {
        document.getElementById('confirmError').textContent = "";
    }
});

// Real-time phone validation
document.getElementsByName('number')[0].addEventListener('input', function() {
    if (!isValidPhone(this.value)) {
        if (!document.getElementById('phoneError')) {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error';
            errorSpan.id = 'phoneError';
            this.parentNode.insertBefore(errorSpan, this.nextSibling);
        }
        document.getElementById('phoneError').textContent = "Enter a valid Kenyan phone number.";
    } else if (document.getElementById('phoneError')) {
        document.getElementById('phoneError').textContent = "";
    }
});

// Real-time email validation
document.getElementsByName('email')[0].addEventListener('input', function() {
    if (!isValidEmail(this.value)) {
        if (!document.getElementById('emailError')) {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error';
            errorSpan.id = 'emailError';
            this.parentNode.insertBefore(errorSpan, this.nextSibling);
        }
        document.getElementById('emailError').textContent = "Enter a valid email address.";
    } else if (document.getElementById('emailError')) {
        document.getElementById('emailError').textContent = "";
    }
});

// Real-time gender validation (on change)
const genderRadios = document.getElementsByName('gender');
for (let i = 0; i < genderRadios.length; i++) {
    genderRadios[i].addEventListener('change', function() {
        if (document.getElementById('genderError')) {
            document.getElementById('genderError').textContent = "";
        }
    });
}