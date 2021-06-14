
// Function to check Whether both passwords is same or not.
const submitButton = document.querySelector('#submit_button');

function validateMatch() {
    let newPassword = document.getElementById("new_password").value;
    let confirmPassword = document.getElementById("confirm_new_password").value;
    if (newPassword != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    } else {
        alert("Password saved succesfully!");
        return true;
    }
}

submitButton.addEventListener('click', validateMatch);

