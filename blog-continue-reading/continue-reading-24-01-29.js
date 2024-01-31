$(document).ready(function () {
  var paragraphOverflow = $('.paragraph-overflow');
  var gradientElement = $('.paragraph-overflow-gradient');
  var buttonOverflowRead = $('#overflow-read');

  updateOverflowVisibility(); // Initial check

  buttonOverflowRead.on('click', function () {
    // Remove max-height on button click
    paragraphOverflow.css('max-height', 'none');
    updateOverflowVisibility(); // Update visibility after removing max-height
    buttonOverflowRead.hide(); // Hide the button after clicking
    console.log('Max-height removed. Full content is visible.');
  });

  function updateOverflowVisibility() {
    var maxOverflowHeight = parseInt(paragraphOverflow.css('max-height').replace('px', ''));
    var actualParagraphHeight = paragraphOverflow.find('.paragraph').height();
    var containerHeight = paragraphOverflow.height();

    console.log('Container Height:', containerHeight);
    console.log('Paragraph Height:', actualParagraphHeight);

    if (actualParagraphHeight > maxOverflowHeight) {
      gradientElement.show(); // Show gradient if the content is taller
      buttonOverflowRead.show(); // Show button if content is taller
    } else {
      gradientElement.hide(); // Hide gradient if the content fits within max-height
      buttonOverflowRead.hide(); // Hide button if content fits within max-height
    }
  }
});