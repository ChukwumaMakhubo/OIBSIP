"use strict"

// I just took user data from local storage and did a console.log() just to check if my data is being stored and encrypted
let userData = JSON.parse(localStorage.getItem('userData')) || [];
console.log("User data:", userData);


// Function to sign up
function signUp() {
    let username = document.getElementById("signUsername").value; 
    let password = document.getElementById("signPass").value;

    let userData = JSON.parse(localStorage.getItem('userData')) || []; //Here I get existing user data from local storage or initialize an empty array

    // Here I check if the username already exists in my array thats in the local storage
    let existingUser = userData.find(user => user.username === username);
    if (existingUser) {
        alert("Username already exists. Please choose a different username.");
        return; // Exit the function if the username already exists
    }

    let encryptedPassword = CryptoJS.AES.encrypt(password, 'secret key').toString();// Here I encrypt password before storing them in the local storage

    userData.push({ username: username, password: encryptedPassword }); // I store new user credentials into the array

    localStorage.setItem('userData', JSON.stringify(userData));// Here I store the user data with encrypted passwords in the local storage


    alert("You have successfully signed up");
}

//Function to login
function login(event) {

    event.preventDefault();

    let username = document.getElementById("loginUserName").value;
    let password = document.getElementById("loginPassword").value;

    let userInfo = JSON.parse(localStorage.getItem('userData')) || []; //Here I get user info from the localStorage

    let user = userInfo.find(ui => ui.username === username);// Find user by username

    if (user) {
        let decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret key').toString(CryptoJS.enc.Utf8);// I decrypt the user's stored password so i can use it in the if statement


        if (decryptedPassword === password) {
            window.location.href="loggedIn.html";
        } else {
            alert("Invalid username or password");
        }
    } else {
        alert("User not found");
    }
}

window.onload = function(){
    login()
    signUp()
}

