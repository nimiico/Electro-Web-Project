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

/////////////////////////////////////////
// MOBILE NAVIGATION MENU //
////////////////////////////////////////

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

/////////////////////////////////////////
// LOGIN & SIGNUP //
////////////////////////////////////////
const btnLoginEl = document.querySelector(".log-login-btn");
const btnOPenLoginEl = document.querySelector(".login-btn");
const btnOPenSignupEl = document.querySelector(".log-register-btn");
const btnOPenOTPEl = document.querySelector(".reg-register-btn");
const btnSendOTPEl = document.querySelector(".send-otp");
const btnOpenSuccessEl = document.querySelector(".forget-btn");

const btnSuccessBackLoginEl = document.querySelector(
  ".success-Change-pass-btn"
);

const btnCloseLoginEl = document.querySelector(".close-box");
const btnClosesignupEl = document.querySelector(".s-close-box");
const btnCloseOTPEl = document.querySelector(".otp-close-box");

const herorEl = document.querySelector(".section-hero");

btnOPenLoginEl.addEventListener("click", function () {
  herorEl.classList.add("login-open");
});

btnCloseLoginEl.addEventListener("click", function () {
  herorEl.classList.remove("login-open");
});

btnLoginEl.addEventListener("click", function () {
  herorEl.classList.remove("login-open");
});

btnOpenSuccessEl.addEventListener("click", function () {
  herorEl.classList.remove("login-open");
  herorEl.classList.add("success-open");
});

btnSuccessBackLoginEl.addEventListener("click", function () {
  herorEl.classList.remove("success-open");
  herorEl.classList.add("login-open");
});

btnOPenSignupEl.addEventListener("click", function () {
  herorEl.classList.remove("login-open");
  herorEl.classList.add("signup-open");
});

btnClosesignupEl.addEventListener("click", function () {
  herorEl.classList.remove("signup-open");
});

btnOPenOTPEl.addEventListener("click", function () {
  herorEl.classList.remove("signup-open");
  herorEl.classList.add("otp-open");
});

btnCloseOTPEl.addEventListener("click", function () {
  herorEl.classList.remove("otp-open");
});

btnSendOTPEl.addEventListener("click", function () {
  herorEl.classList.remove("otp-open");
});

/////////////////////////////////////////
// OTP //
////////////////////////////////////////

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
