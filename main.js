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

const btnOPenLoginEl = document.querySelector(".login-btn");
const btnCloseLoginEl = document.querySelector(".close-box");

const btnLoginEl = document.querySelector(".log-login-btn");
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

const btnOPenSignupEl = document.querySelector(".log-register-btn");
const btnClosesignupEl = document.querySelector(".s-close-box");
btnOPenSignupEl.addEventListener("click", function () {
  herorEl.classList.remove("login-open");
  herorEl.classList.add("signup-open");
});

btnClosesignupEl.addEventListener("click", function () {
  herorEl.classList.remove("signup-open");
});
