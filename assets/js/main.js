// Formspree code
const form = document.getElementById("contact-form");

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

const splitRGB = (rgb) => {
  let colorArr = rgb.slice(
    rgb.indexOf("(") + 1,
    rgb.indexOf(")")
  ).split(", ");
  return colorArr;
}

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("alert");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      status.innerHTML = "Thank You! Your message has been sent.";
      document.querySelector(".alert_style").style.display = "block";

      // hide alert after 3 seconds
      setTimeout(function () {
        document.querySelector(".alert_style").style.display = "none";
      }, 4000);
      form.reset();
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem delivering your message, please contact via other means.";
      document.querySelector(".alert_style").style.display = "block";

      // hide alert after 3 seconds
      setTimeout(function () {
        document.querySelector(".alert_style").style.display = "none";
      }, 4000);
    });
}
form.addEventListener("submit", handleSubmit);

// NAVIGATION PANEL
let navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// MENU SHOW
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// MENU HIDDEN
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// REMOVE MENU MOBILE
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// SKILLS
const skillContent = document.querySelectorAll(".skill");
const skillHeader = document.querySelectorAll(".skills_header");
const skillContentArr = Array.from(skillContent);
const skillHeaderArr = Array.from(skillHeader);

skillHeaderArr.forEach((element, idx) => {
  element.addEventListener("click", function () {
    skillContentArr[idx].classList.toggle("skills_open");
  });
});

// QUALIFICATION TABS
let education = document.getElementById("education");
let work = document.getElementById("work");
let educationheader = document.getElementById("educationheader");

educationheader.addEventListener("click", () => {
  let condition1 = work.classList.contains("qualification-inactive");
  if (!condition1) {
    var titleColorRGB = splitRGB(titleColor);
    var titleColorHex = rgbToHex(parseInt(titleColorRGB[0]), parseInt(titleColorRGB[1]), parseInt(titleColorRGB[2]));
    var textColor = window.getComputedStyle(educationheader).getPropertyValue("color");
    var textColorRGB = splitRGB(textColor);
    var textColorHex = rgbToHex(parseInt(textColorRGB[0]), parseInt(textColorRGB[1]), parseInt(textColorRGB[2]));
    education.classList.remove("qualification-inactive");
    work.classList.add("qualification-inactive");
    educationheader.style.color = titleColorHex;
  }
});

// PORTFOLIO SWIPER
let swiper = new Swiper(".mySwiper", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

// SCROLL SECTIONS ACTIVE LINK
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// HEADER SHADOW
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// SHOW SCROLL UP BUTTON
function scrollUpfunc() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUpfunc);

// DARK/LIGHT THEME
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// obtain the current theme
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate/Deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark icon/theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

const redHueButton = document.getElementById("hue-button-red");
const purpleHueButton = document.getElementById("hue-button-purple");
const greenHueButton = document.getElementById("hue-button-green");
const blueHueButton = document.getElementById("hue-button-black");

redHueButton.addEventListener("click", () => {
  let root = document.documentElement;
  root.style.setProperty('--hue-color', 0);
  redHueButton.classList.add('uil-check-circle');
  redHueButton.classList.remove('uil-circle');
  purpleHueButton.classList.remove('uil-check-circle');
  purpleHueButton.classList.add('uil-circle');
  greenHueButton.classList.remove('uil-check-circle');
  greenHueButton.classList.add('uil-circle');
  blueHueButton.classList.remove('uil-check-circle');
  blueHueButton.classList.add('uil-circle');
});


purpleHueButton.addEventListener("click", () => {
  let root = document.documentElement;
  root.style.setProperty('--hue-color', 250);
  purpleHueButton.classList.add('uil-check-circle');
  purpleHueButton.classList.remove('uil-circle');
  redHueButton.classList.remove('uil-check-circle');
  redHueButton.classList.add('uil-circle');
  greenHueButton.classList.remove('uil-check-circle');
  greenHueButton.classList.add('uil-circle');
  blueHueButton.classList.remove('uil-check-circle');
  blueHueButton.classList.add('uil-circle');
});


greenHueButton.addEventListener("click", () => {
  let root = document.documentElement;
  root.style.setProperty('--hue-color', 160);
  greenHueButton.classList.add('uil-check-circle');
  greenHueButton.classList.remove('uil-circle');
  purpleHueButton.classList.remove('uil-check-circle');
  purpleHueButton.classList.add('uil-circle');
  redHueButton.classList.remove('uil-check-circle');
  redHueButton.classList.add('uil-circle');
  blueHueButton.classList.remove('uil-check-circle');
  blueHueButton.classList.add('uil-circle');
});

blueHueButton.addEventListener("click", () => {
  let root = document.documentElement;
  root.style.setProperty('--hue-color', 200);
  blueHueButton.classList.add('uil-check-circle');
  blueHueButton.classList.remove('uil-circle');
  purpleHueButton.classList.remove('uil-check-circle');
  purpleHueButton.classList.add('uil-circle');
  greenHueButton.classList.remove('uil-check-circle');
  greenHueButton.classList.add('uil-circle');
  redHueButton.classList.remove('uil-check-circle');
  redHueButton.classList.add('uil-circle');
});
