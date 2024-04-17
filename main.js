///////////////////////////
//***** MODAL *****///////
/////////////////////////
"use strict";

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

// ///////////////////////////////////
// //***** COLORS PRICE *****//
// /////////////////////////////////

function colorPrice(colorIcon) {
  if (colorIcon == "color1") {
    document.getElementById("spec-price").innerHTML = "$1999";
  }
  if (colorIcon == "color2") {
    document.getElementById("spec-price").innerHTML = "$1949";
  }
  if (colorIcon == "color3") {
    document.getElementById("spec-price").innerHTML = "$2049";
  }
  if (colorIcon == "color4") {
    document.getElementById("spec-price").innerHTML = "$2099";
  }
}

// ///////////////////////////////////
// //***** ADD TO CART *****//
// /////////////////////////////////

class CartProduct {
  constructor(name, price, rate, rateCount, description, color, img, number) {
    this.name = name;
    this.price = price;
    this.rate = rate;
    this.rateCount = rateCount;
    this.description = description;
    this.color = color;
    this.img = img;
  }
}

// Default Items

const cp1 = new CartProduct(
  "Apple iPhone 14 Pro",
  1999.0,
  5.0,
  121,
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
  "#bebec6",
  "img/image 16 (2).png",
  1
);

const cp2 = new CartProduct(
  "Asus ROG Delta S",
  250.0,
  5.0,
  121,
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
  "#bebec6",
  "img/image 25 (2).png",
  1
);

//Cart Product List
var cartProductList = [];
cartProductList.push(cp1);
cartProductList.push(cp2);

// Add to cart UI

function changeProductNumber(btn) {
  let num = document.getElementById("product-number").textContent;
  num = parseInt(num);
  if (btn == "product-num-plus") {
    document.getElementById("product-number").innerHTML = `${num + 1}`;
  }

  if (btn == "product-num-minus") {
    if (num != 0) {
      document.getElementById("product-number").innerHTML = `${num - 1}`;
    }
  }
}

// function addCart() {
//   productName = document.getElementById("product-name");
//   productPrice = document.getElementById("spec-price");
//   productNumber = document.getElementById("product-number");
//   cart0 = document.getElementById("cart-item-0");
//   cart1 = document.getElementById("cart-item-1");

//   product = new CartProduct(
//     productName,
//     productPrice,
//     0.0,
//     0,
//     null,
//     null,
//     "img/image 16 (2).png"
//   );

//   for (let i = 0; i < cartProductList.length; i++) {
//     if (JSON.stringify(cartProductList[i]) === JSON.stringify(product)) {
//     }
//   }
// }

function addCart() {
  var cartNumber = document.getElementById("number-cart").textContent;
  cartNumber = parseInt(cartNumber);
  var productNumber = document.getElementById("product-number").textContent;
  productNumber = parseInt(productNumber);
  cartNumber += productNumber;
  document.getElementById("number-cart").innerHTML = cartNumber;
}

let rate = 0;
function getStar(star) {
  const star1 = document.createElement("img");
  star1.style.margin = "0 1.7px 0 0";
  star1.src = "img/Star2.png";

  const star2 = document.createElement("img");
  star2.style.margin = "0 1.7px 0 0";
  star2.src = "img/Star2.png";

  const star3 = document.createElement("img");
  star3.style.margin = "0 1.7px 0 0";
  star3.src = "img/Star2.png";

  const star4 = document.createElement("img");
  star4.style.margin = "0 1.7px 0 0";
  star4.src = "img/Star2.png";

  const star5 = document.createElement("img");
  star5.src = "img/Star2.png";

  if (star == "star-1") {
    const parent = document.getElementById("star-1-box");
    parent.replaceChildren(star1);
    rate = 1;
  } else if (star == "star-2") {
    const parent = document.getElementById("star-2-box");
    parent.replaceChildren(star1, star2);
    rate = 2;
  } else if (star == "star-3") {
    const parent = document.getElementById("star-3-box");
    parent.replaceChildren(star1, star2, star3);
    rate = 3;
  } else if (star == "star-4") {
    const parent = document.getElementById("star-4-box");
    parent.replaceChildren(star1, star2, star3, star4);
    rate = 4;
  } else if (star == "star-5") {
    const parent = document.getElementById("star-5-box");
    parent.replaceChildren(star1, star2, star3, star4, star5);
    rate = 5;
  }
}

function reviewSubmit() {
  let firstName = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  console.log(`${firstName} | ${email}: ${rate} star`);
}
