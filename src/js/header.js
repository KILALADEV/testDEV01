export default function header() {
  const element = document.querySelector(".header");
  addEventListener("scroll", (event) => {
    if (window.scrollY > 50) {
      element.classList.add("mini");
    }
    else {
      element.classList.remove("mini");
    }
  });
}