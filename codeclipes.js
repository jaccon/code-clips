document.addEventListener("DOMContentLoaded", function() {
  if (typeof slides === 'undefined' || !Array.isArray(slides)) {
      console.error('Slides data is not defined or is not an array.');
      return;
  }

  const style = document.createElement('style');
  style.innerHTML = `
      body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background-color: #000;
      }
      .slideshow-container {
          position: relative;
          max-width: 100%;
          height: 100vh;
          overflow: hidden;
      }
      .slide {
          display: none;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
      }
      .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: zoomIn 10s infinite;
      }
      @keyframes zoomIn {
          0% {
              transform: scale(1);
          }
          100% {
              transform: scale(1.1);
          }
      }
      .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1;
      }
      .prev, .next {
          cursor: pointer;
          position: absolute;
          top: 50%;
          width: auto;
          padding: 16px;
          margin-top: -22px;
          color: white;
          font-weight: bold;
          font-size: 18px;
          transition: 0.6s ease;
          border-radius: 0 3px 3px 0;
          user-select: none;
          z-index: 10;
      }
      .next {
          right: 0;
          border-radius: 3px 0 0 3px;
      }
      .prev:hover, .next:hover {
          background-color: rgba(0,0,0,0.8);
      }
      .dots-container {
          text-align: center;
          padding: 20px;
          background: rgba(0,0,0,0.5);
      }
      .dot {
          cursor: pointer;
          height: 15px;
          width: 15px;
          margin: 0 2px;
          background-color: #bbb;
          border-radius: 50%;
          display: inline-block;
          transition: background-color 0.6s ease;
      }
      .active, .dot:hover {
          background-color: #717171;
      }
      .fade {
          animation-name: fade;
          animation-duration: 1.5s;
      }
      @keyframes fade {
          from {opacity: .4} 
          to {opacity: 1}
      }
      .content {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          text-align: center;
          padding: 20px;
          z-index: 2;
      }
      .content.left {
          left: 20px;
          text-align: left;
      }
      .content.center {
          left: 50%;
          transform: translate(-50%, -50%);
      }
      .content.right {
          right: 20px;
          text-align: right;
      }
      .btn {
          display: inline-block;
          padding: 10px 20px;
          color: white;
          background-color: #007BFF;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
      }
      .btn:hover {
          background-color: #0056b3;
      }
  `;
  document.head.appendChild(style);

  // Inject HTML
  const slideshowContainer = document.createElement('div');
  slideshowContainer.className = 'slideshow-container';

  slides.forEach((slide, index) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide fade';

      const img = document.createElement('img');
      img.src = slide.src;
      img.className = 'slide-image';
      slideDiv.appendChild(img);

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      slideDiv.appendChild(overlay);

      const contentDiv = document.createElement('div');
      contentDiv.className = `content ${slide.position}`;
      contentDiv.innerHTML = `
          <h2>${slide.title}</h2>
          <p>${slide.description}</p>
          <a href="${slide.link}" class="btn">Learn More</a>
      `;
      slideDiv.appendChild(contentDiv);

      slideshowContainer.appendChild(slideDiv);
  });

  const prev = document.createElement('a');
  prev.className = 'prev';
  prev.innerHTML = '&#10094;';
  prev.onclick = () => changeSlide(-1);
  slideshowContainer.appendChild(prev);

  const next = document.createElement('a');
  next.className = 'next';
  next.innerHTML = '&#10095;';
  next.onclick = () => changeSlide(1);
  slideshowContainer.appendChild(next);

  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'dots-container';
  slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.onclick = () => currentSlide(index + 1);
      dotsContainer.appendChild(dot);
  });

  document.body.appendChild(slideshowContainer);
  document.body.appendChild(dotsContainer);

  let slideIndex = 1;
  let slideWidth = 100;  // width in percentage
  let slideHeight = 800; // max height in pixels

  showSlides(slideIndex);

  function changeSlide(n) {
      showSlides(slideIndex += n);
  }

  function currentSlide(n) {
      showSlides(slideIndex = n);
  }

  function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("slide");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
  }

  document.querySelector('.slideshow-container').style.maxWidth = slideWidth + '%';
  document.querySelector('.slideshow-container').style.height = slideHeight + 'px';

  let slideInterval = setInterval(() => {
      changeSlide(1);
  }, 5000);
});
