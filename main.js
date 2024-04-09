///////////////////////////
//***** MODAL *****///////
/////////////////////////

var modalBack = document.getElementById("modal");
var cartModal = document.getElementById("cart-modal");
var loginView = document.getElementById("login-view");
var signupView = document.getElementById("signup-view");
var otpView = document.getElementById("otp-view");
var successView = document.getElementById("success-view");

function popups(modal, button) {
  var modal = document.getElementById(modal);
  if (button == "cart-btn") {
    modalBack.style.display = "block";
    modal.style.display = "flex";
  }

  if (button == "login-btn-icon") {
    modalBack.style.display = "block";
    modal.style.display = "flex";
  }

  if (button == "header-login-btn") {
    modalBack.style.display = "block";
    modal.style.display = "flex";
  }

  if (button == "header-login-btn") {
    modalBack.style.display = "block";
    modal.style.display = "flex";
  }

  if (button == "log-register-btn") {
    loginView.style.display = "none";
    modalBack.style.display = "block";
    modal.style.display = "flex";
  }

  if (button == "reg-register-btn") {
    signupView.style.display = "none";
    modalBack.style.display = "block";
    modal.style.display = "block";
  }

  if (button == "forget-btn") {
    loginView.style.display = "none";
    modalBack.style.display = "block";
    modal.style.display = "block";
  }

  if (button == "success-Change-pass-btn") {
    successView.style.display = "none";
    modalBack.style.display = "block";
    modal.style.display = "block";
  }

  if (button == "close-btn") {
    modal.style.display = "none";
    modalBack.style.display = "none";
  }

  if (button == "s-close-btn") {
    modal.style.display = "none";
    modalBack.style.display = "none";
  }

  if (button == "otp-close-btn") {
    modal.style.display = "none";
    modalBack.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modalBack) {
      modalBack.style.display = "none";
      modal.style.display = "none";
    }
  };
}

///////////////////////////
//***** OTP *****//
/////////////////////////

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

// /////////////////////////////////////////
// // MOBILE NAVIGATION MENU //////////////
// ////////////////////////////////////////

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// ///////////////////////////////////
// //***** TABS *****//
// /////////////////////////////////

const tabHeadingAll = document.querySelectorAll(".tab-heading");

const tabContentAll = document.querySelectorAll(".tab-content");

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

const topsellerTabHeadingAll = document.querySelectorAll(
  ".topseller-tab-heading"
);

const topsellerTabContentAll = document.querySelectorAll(
  ".topseller-tab-content"
);

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
