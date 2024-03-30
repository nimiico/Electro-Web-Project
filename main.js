///////////////////////////
//***** MODAL *****///////
/////////////////////////

var modal = document.getElementById("modal");
var cartModal = document.getElementById("cart-modal");
var cartBtn = document.getElementById("cart-btn");

var loginView = document.getElementById("login-view");
var headerLoginBtn = document.getElementById("header-login-btn");
var loginBtnIcon = document.getElementById("login-btn-icon");
var closeBtn = document.getElementById("close-btn");
var logLoginBtn = document.getElementById("log-login-btn");
var logRegisterBtn = document.getElementById("log-register-btn");
var forgetBtn = document.getElementById("forget-btn");

var signupView = document.getElementById("signup-view");
var sCloseBtn = document.getElementById("s-close-btn");
var regRegisterBtn = document.getElementById("reg-register-btn");

var otpView = document.getElementById("otp-view");
var otpCloseBtn = document.getElementById("otp-close-btn");
var sendOtp = document.getElementById("send-otp");

var successView = document.getElementById("success-view");
var successChangePassBtn = document.getElementById("success-Change-pass-btn");

///////////////////////////
//***** CART MODAL *****//
/////////////////////////

cartBtn.onclick = function () {
  modal.style.display = "block";

  cartModal.style.display = "flex";
};

///////////////////////////
//***** LOGIN MODAL *****//
/////////////////////////

headerLoginBtn.onclick = function () {
  modal.style.display = "block";
  loginView.style.display = "flex";
};

loginBtnIcon.onclick = function () {
  modal.style.display = "block";
  loginView.style.display = "flex";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
  loginView.style.display = "none";
};

logLoginBtn.onclick = function () {
  modal.style.display = "none";
  loginView.style.display = "none";
};

logRegisterBtn.onclick = function () {
  loginView.style.display = "none";
  signupView.style.display = "block";
};

forgetBtn.onclick = function () {
  loginView.style.display = "none";
  successView.style.display = "block";
};
/////////////////////////////
//***** SIGNUP MODAL *****//
///////////////////////////

sCloseBtn.onclick = function () {
  modal.style.display = "none";
  signupView.style.display = "none";
};

regRegisterBtn.onclick = function () {
  signupView.style.display = "none";
  otpView.style.display = "block";
};

/////////////////////////////
//***** OTP MODAL *****//
///////////////////////////

otpCloseBtn.onclick = function () {
  modal.style.display = "none";
  otpView.style.display = "none";
};

sendOtp.onclick = function () {
  modal.style.display = "none";
  otpView.style.display = "none";
};

const input = document.querySelectorAll(".input");
const inputField = document.querySelector(".inputfield");
let inputCount = 0,
  finalInput = "";

//Update input
const updateInputConfig = (element, disabledStatus) => {
  element.disabled = disabledStatus;
  if (!disabledStatus) {
    element.focus();
  } else {
    element.blur();
  }
};

input.forEach((element) => {
  element.addEventListener("keyup", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    let { value } = e.target;

    if (value.length == 1) {
      updateInputConfig(e.target, true);
      if (inputCount <= 4 && e.key != "Backspace") {
        finalInput += value;
        if (inputCount < 4) {
          updateInputConfig(e.target.nextElementSibling, false);
        }
      }
      inputCount += 1;
    } else if (value.length == 0 && e.key == "Backspace") {
      finalInput = finalInput.substring(0, finalInput.length - 1);
      if (inputCount == 0) {
        updateInputConfig(e.target, false);
        return false;
      }
      updateInputConfig(e.target, true);
      e.target.previousElementSibling.value = "";
      updateInputConfig(e.target.previousElementSibling, false);
      inputCount -= 1;
    } else if (value.length > 1) {
      e.target.value = value.split("")[0];
    }
  });
});

window.addEventListener("keyup", (e) => {
  if (inputCount > 4) {
    if (e.key == "Backspace") {
      finalInput = finalInput.substring(0, finalInput.length - 1);
      updateInputConfig(inputField.lastElementChild, false);
      inputField.lastElementChild.value = "";
      inputCount -= 1;
    }
  }
});

const validateOTP = () => {
  alert("Success");
};

//Start
const startInput = () => {
  inputCount = 0;
  finalInput = "";
  input.forEach((element) => {
    element.value = "";
  });
  updateInputConfig(inputField.firstElementChild, false);
};

window.onload = startInput();

///////////////////////////////////////////////
//***** SUCCESS PASSWORD CHANGED MODAL *****//
/////////////////////////////////////////////

successChangePassBtn.onclick = function () {
  successView.style.display = "none";
  loginView.style.display = "block";
};

///////////////////////////////////
//***** WINDOW CLOSE MODAL *****//
/////////////////////////////////

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    cartModal.style.display = "none";
    loginView.style.display = "none";
    signupView.style.display = "none";
    otpView.style.display = "none";
    successView.style.display = "none";
  }
};

/////////////////////////////////////////
// MOBILE NAVIGATION MENU //////////////
////////////////////////////////////////

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////
//***** TABS *****//
/////////////////////////////////

const tabHeadingAll = document.querySelectorAll(".tab-heading");

const tabContentAll = document.querySelectorAll(".tab-content");

const topsellerTabHeadingAll = document.querySelectorAll(
  ".topseller-tab-heading"
);

const topsellerTabContentAll = document.querySelectorAll(
  ".topseller-tab-content"
);

const removeAllActive = () => {
  tabContentAll.forEach((c) => {
    c.classList.remove("active");
  });

  tabHeadingAll.forEach((h) => {
    h.classList.remove("active");
  });
};
tabHeadingAll.forEach((h, i) => {
  h.addEventListener("click", () => {
    removeAllActive();
    tabContentAll[i].classList.add("active");
    h.classList.add("active");
  });
});

const topsellerRemoveAllActive = () => {
  topsellerTabContentAll.forEach((c) => {
    c.classList.remove("active");
  });

  topsellerTabHeadingAll.forEach((h) => {
    h.classList.remove("active");
  });
};
topsellerTabHeadingAll.forEach((h, i) => {
  h.addEventListener("click", () => {
    topsellerRemoveAllActive();
    topsellerTabContentAll[i].classList.add("active");
    h.classList.add("active");
  });
});

const productTabHeadingAll = document.querySelectorAll(".product-tab-heading");

const productTabContentAll = document.querySelectorAll(".product-tab-content ");

const productRemoveAllActive = () => {
  productTabContentAll.forEach((c) => {
    c.classList.remove("active");
  });

  productTabHeadingAll.forEach((h) => {
    h.classList.remove("active");
  });
};
productTabHeadingAll.forEach((h, i) => {
  h.addEventListener("click", () => {
    productRemoveAllActive();
    productTabContentAll[i].classList.add("active");
    h.classList.add("active");
  });
});
