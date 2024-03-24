const tabHeadingAll = document.querySelectorAll(
  ".section-bestseller .tab-heading"
);

const tabContentAll = document.querySelectorAll(
  ".section-bestseller .tab-content"
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
