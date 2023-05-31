// Definice konstant pro rozměry plátna
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

const canvases = document.querySelectorAll("canvas");
const copy = document.getElementById("copyExample");

const frameCount = 50;

const currentFrame = (index, folder) =>
  `./${folder}/${index.toString().padStart(4, "0")}.jpg`;

// Nová funkce pro načítání obrázku
const loadImage = (src, callback) => {
  const img = new Image();
  img.onload = function () {
    callback(img);
  };
  img.src = src;
};

const setupCanvas = (canvas, folder) => {
  const context = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  loadImage(currentFrame(1, folder), function (img) {
    context.drawImage(img, 0, 0);
  });
  return { context };
};

const canvasInfo = [
  setupCanvas(canvases[0], "img1"),
  setupCanvas(canvases[1], "img2"),
  setupCanvas(canvases[2], "img3"),
];

const imageCache = {};

const updateImage = (context, index, folder) => {
  const src = currentFrame(index, folder);
  if (imageCache[src]) {
    context.drawImage(imageCache[src], 0, 0);
  } else {
    loadImage(src, function (img) {
      imageCache[src] = img;
      context.drawImage(img, 0, 0);
    });
  }
};

const sections = document.querySelectorAll(".canvas-section");

let lastScrollTop = 0;
let ticking = false;

// Přidaná funkce pro lineární interpolaci
const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const updateScroll = (scrollTop) => {
  if (Math.abs(scrollTop - lastScrollTop) < 50) {
    ticking = false;
    return;
  }
  lastScrollTop = scrollTop;
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const scrollFraction =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      const targetFrameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      const { context } = canvasInfo[index];
      const currentFrameIndex = index; // index je zde nahrazen aktuálním indexem snímku

      const frameIndex = Math.floor(
        lerp(currentFrameIndex, targetFrameIndex, 0.9)
      );

      updateImage(context, frameIndex + 1, `img${index + 1}`);
    }
  });
  ticking = false;
};

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScroll(window.pageYOffset);
    });
    ticking = true;
  }
});

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
document.addEventListener("DOMContentLoaded", function () {
  var quantities = Array.from(document.querySelectorAll(".quantity"));
  var prices = Array.from(document.querySelectorAll(".prices"));
  var checkboxes = Array.from(document.querySelectorAll(".check-box"));
  var subtotals = Array.from(document.querySelectorAll(".subtotal"));
  var total = document.querySelector(".sum-total");

  checkboxes.forEach(function (checkbox, i) {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        quantities[i].disabled = false;
        subtotals[i].value = quantities[i].value * prices[i].value;
      } else {
        quantities[i].disabled = true;
        subtotals[i].value = 0;
      }

      var sum = subtotals.reduce(function (acc, curr) {
        return acc + parseInt(curr.value);
      }, 0);

      total.value = "CZK " + sum;
    });

    quantities[i].addEventListener("input", function () {
      if (checkboxes[i].checked) {
        subtotals[i].value = this.value * prices[i].value;
        var sum = subtotals.reduce(function (acc, curr) {
          return acc + parseInt(curr.value);
        }, 0);

        total.value = "CZK " + sum;
      }
    });
  });

  document.querySelector(".reset-btn").addEventListener("click", function () {
    quantities.forEach(function (quantity) {
      quantity.disabled = true;
    });
    subtotals.forEach(function (subtotal) {
      subtotal.value = 0;
    });
    total.value = "CZK 0";
  });
});
