function initialSetup() {
  if (window.innerWidth < 700) {
    document.getElementById("menu").classList.add("hide")
    console.log(`hide, inner width: ${window.innerWidth}`);
  }

  const images = document.querySelectorAll(".gallery img");
  const modal = document.getElementById("viewer");

  document.getElementById("menu_button").addEventListener("click", toggleMenu);
  window.addEventListener("resize", handleResize);
  images.forEach(image => {
    image.addEventListener("click", openViewer);
  });
  document.getElementById("close-viewer").addEventListener("click", closeViewer);
  modal.addEventListener("click", closeViewer);

  
  console.log("Done with initialSetup");
  handleResize();
}

function handleResize() {
  console.log(`resize, inner width: ${window.innerWidth}`);
  if (window.innerWidth > 1000) {
    document.getElementById("menu").classList.remove("hide");
  } else {
    document.getElementById("menu").classList.add("hide");
  }
}

function toggleMenu() {
  console.log(`toggle, inner width: ${window.innerWidth}`);
  if (window.innerWidth < 700) {
    document.getElementById("menu").classList.toggle("hide");
  }
}

function openViewer(event) {
  const image = event.target;

  // safety check (prevents clicking container accidentally)
  if (image.tagName !== "IMG") return;

  const modal = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewer-image");

  viewerImg.src = image.src;
  viewerImg.alt = image.alt;

  modal.showModal();
}

function closeViewer() {
   document.getElementById("viewer").close();
 }

 initialSetup();
