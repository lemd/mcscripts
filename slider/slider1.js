function slider1() {
  let splides = $(".slider1");
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    new Splide(splides[i], {
      // Desktop on down
      perPage: 5,
      perMove: 1,
      focus: 0, // 0 = left and 'center' = center
      type: "slide", // 'loop' or 'slide'
      lazyLoad: "nearby",
      gap: "40px", // space between slides
      arrows: "slider", // 'slider' or false
      pagination: true, // 'slider' or false
      speed: 600, // transition speed in miliseconds
      dragAngleThreshold: 30, // default is 30
      autoWidth: false, // for cards with differing widths
      rewind: false, // go back to beginning when reach end
      rewindSpeed: 400,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: "move", // true removes empty space from end of list
      padding: { left: 0, right: 0 },
      omitEnd: true,
      breakpoints: {
        991: {
          // Tablet
          perPage: 3,
          gap: "10px",
          padding: { left: 0, right: 0 },
          pagination: "slider", // 'slider' or false
        },
        767: {
          // Mobile Landscape
          perPage: 2,
          gap: "10px",
          padding: { left: 0, right: 0 },
          pagination: "slider", // 'slider' or false
        },
        479: {
          // Mobile Portrait
          perPage: 2,
          gap: "10px",
          padding: { left: 0, right: 0 },
          pagination: "slider", // 'slider' or false
        },
      },
    }).mount();
  }
}
slider1();
