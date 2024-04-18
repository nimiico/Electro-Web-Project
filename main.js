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

// number of cart
function addCart() {
  var cartNumber = document.getElementById("number-cart").textContent;
  cartNumber = parseInt(cartNumber);
  var qty = document.getElementById("qty").textContent;
  qty = qty.substring(5);
  qty = parseInt(qty);
  var productNumber = document.getElementById("product-number").textContent;
  productNumber = parseInt(productNumber);
  cartNumber += productNumber;
  qty += productNumber;
  document.getElementById("number-cart").innerHTML = cartNumber;
  document.getElementById("qty").innerHTML = `QTY: ${qty}`;
}

//remove from cart
function removeCart(i) {
  // remove = document.getElementsByClassName("remove-cart")[i];
  let cartItem = document.getElementsByClassName("cart-item")[i];

  cartItem.style.display = "none";
  var cartNumber = document.getElementById("number-cart").textContent;
  cartNumber = parseInt(cartNumber);
  var qty = document.getElementById("qty").textContent;
  qty = qty.substring(5);
  qty = parseInt(qty);
  cartNumber -= qty;
  document.getElementById("number-cart").innerHTML = cartNumber;
  let itemsNum = document.getElementById("items-num").textContent;
  itemsNum = itemsNum.substring(0, 1);
  itemsNum = parseInt(itemsNum);
  itemsNum -= 1;
  document.getElementById("items-num").innerHTML = `${itemsNum} items`;
}

// rating
let rate = 0;
function getStar(i) {
  rate = i + 1;
  let starBox = document.getElementsByClassName("star-box")[i];
  let star = starBox.getElementsByTagName("img");
  let yourRate = document.getElementById("your-rate");
  let offStar = yourRate.getElementsByTagName("img");

  for (let j = 0; j < offStar.length; j++) {
    offStar[j].src = "img/star.png";
  }
  for (let j = 0; j < i + 1; j++) {
    star[j].src = "img/Star2.png";
  }
}

function reviewSubmit() {
  let firstName = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  console.log(`${firstName} | ${email}: ${rate} star`);
}
