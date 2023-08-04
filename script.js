// Definice konstant pro rozměry plátna
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

const canvases = document.querySelectorAll("canvas");
const frameCount = 50;

const currentFrame = (index, folder) =>
  `./${folder}/${index.toString().padStart(4, "0")}.jpg`;

// Nová funkce pro načítání obrázku
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
};

const setupCanvas = async (canvas, folder) => {
  const context = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const img = await loadImage(currentFrame(1, folder));
  context.drawImage(img, 0, 0);

  return { context };
};

const canvasInfo = [
  setupCanvas(canvases[0], "img1"),
  setupCanvas(canvases[1], "img2"),
  setupCanvas(canvases[2], "img3"),
];

const imageCache = {};

const updateImage = async (context, index, folder) => {
  const src = currentFrame(index, folder);
  if (imageCache[src]) {
    context.drawImage(imageCache[src], 0, 0);
  } else {
    const img = await loadImage(src);
    imageCache[src] = img;
    context.drawImage(img, 0, 0);
  }
};

const sections = document.querySelectorAll(".canvas-section");

let ticking = false;

// Přidaná funkce pro lineární interpolaci
const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const updateScroll = async () => {
  for (const [index, section] of sections.entries()) {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollFraction =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      const targetFrameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      const { context } = await canvasInfo[index];
      const currentFrameIndex = index; // index je zde nahrazen aktuálním indexem snímku

      const frameIndex = Math.floor(
        lerp(currentFrameIndex, targetFrameIndex, 1)
      );

      await updateImage(context, frameIndex + 1, `img${index + 1}`);
    }
  }
  ticking = false;
};

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScroll);
    ticking = true;
  }
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);
handleScroll();

// Navbar vytáhnutí nahoru

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-200px";
  }
  prevScrollpos = currentScrollPos;
};

// Carousel

$(function () {
  $(".carousel-item").eq(0).addClass("active");
  var total = $(".carousel-item").length;
  var current = 0;
  $("#moveRight").on("click", function () {
    var next = current;
    current = current + 1;
    setSlide(next, current);
  });
  $("#moveLeft").on("click", function () {
    var prev = current;
    current = current - 1;
    setSlide(prev, current);
  });
  function setSlide(prev, next) {
    var slide = current;
    if (next > total - 1) {
      slide = 0;
      current = 0;
    }
    if (next < 0) {
      slide = total - 1;
      current = total - 1;
    }
    $(".carousel-item").eq(prev).removeClass("active");
    $(".carousel-item").eq(slide).addClass("active");
    setTimeout(function () {}, 800);

    console.log("current " + current);
    console.log("prev " + prev);
  }
});

// References

const sliderElm = document.querySelector(".slider-container .slider");
const btnLeft = document.querySelector(".slider-container .btn-left");
const btnRight = document.querySelector(".slider-container .btn-right");

const numberSliderBoxs = sliderElm.children.length;
let idxCurrentSlide = 0;

// Functions:
function moveSlider() {
  let leftMargin = (sliderElm.clientWidth / numberSliderBoxs) * idxCurrentSlide;
  sliderElm.style.marginLeft = -leftMargin + "px";
  console.log(sliderElm.clientWidth, leftMargin);
}
function moveLeft() {
  if (idxCurrentSlide === 0) idxCurrentSlide = numberSliderBoxs - 1;
  else idxCurrentSlide--;

  moveSlider();
}
function moveRight() {
  if (idxCurrentSlide === numberSliderBoxs - 1) idxCurrentSlide = 0;
  else idxCurrentSlide++;

  moveSlider();
}

// Event Listeners:
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
window.addEventListener("resize", moveSlider);

// Event Listenerssadfaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff:
function calculate() {
  var squareMeters = document.getElementById("squareMeters").value;
  var errorElement = document.getElementById("error");
  var resultElement = document.getElementById("result");

  if (squareMeters < 1) {
    errorElement.style.display = "block";
    resultElement.style.display = "none";
    return;
  }

  errorElement.style.display = "none";
  resultElement.style.display = "block"; // Tento řádek zobrazí výsledkový element

  var pricePerDay = 10;
  var daysInMonth = 30;
  var result = squareMeters * pricePerDay * daysInMonth;

  resultElement.innerHTML =
    "Odhadovaná cena za měsíc (montáž, pronájem, demontáž): " + result + " Kč";
  resultElement.classList.add("show", "calculation");
}

//jméno a příjmení v contactformu

function validateForm() {
  var jmenoInput = document.getElementById("jmeno");
  var jmenoValue = jmenoInput.value.trim();
  var jmenoArray = jmenoValue.split(" ");

  if (jmenoArray.length < 2) {
    alert("Prosím, zadejte jak jméno, tak příjmení.");
    return false;
  }

  return true;
}

//cookies
window.onload = function () {
  var acceptButton = document.getElementById("accept-cookies");
  var banner = document.getElementById("cookie-banner");

  if (!localStorage.getItem("cookiesAccepted")) {
    banner.style.display = "flex";
  }

  acceptButton.onclick = function () {
    localStorage.setItem("cookiesAccepted", "true");
    banner.style.display = "none";
  };
};

//////////////////////////////////////////////////////////////
// Získáme odkaz na obrázek
const imgElement = document.querySelector(".MainPageImg");

// Počkáme, až se stránka načte
window.onload = () => {
  // Počkáme  (500 ms) a spustíme animaci
  setTimeout(() => {
    // Přidáme třídu 'hide', která začne animaci
    imgElement.classList.add("hide");
  }, 500);
};
