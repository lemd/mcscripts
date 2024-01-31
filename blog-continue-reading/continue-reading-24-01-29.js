$(document).ready(function () {
  var paragraphContent = $('.paragraph-overflow');
  var bioContent = paragraphContent.children('.paragraph');
  var overflowButton = paragraphContent.children('.button.is-outline');
  var gradientOverlay = paragraphContent.children('.paragraph-overflow-gradient');

  // Set initial max-height value
  var maxHeight = '100px'; // Set your desired initial height

  // Check if the bio content is too long
  if (bioContent[0].scrollHeight > bioContent[0].clientHeight) {
    // Show the "Continue Reading" button
    overflowButton.show();

    // Hide the gradient overlay
    gradientOverlay.hide();

    // Set the initial max-height to 'auto'
    bioContent.css('max-height', 'auto');

    // Toggle the content when the button is clicked
    overflowButton.click(function () {
      if (bioContent.css('max-height') === 'none') {
        // If content is fully expanded, collapse it
        bioContent.css('max-height', maxHeight);
        overflowButton.text('Continue Reading');
        gradientOverlay.hide();
      } else {
        // If content is collapsed, expand it
        bioContent.css('max-height', 'none');
        overflowButton.text('Show Less');
        gradientOverlay.show();
      }
    });
  } else {
    // If the content does not exceed the container's height, hide the button and gradient
    overflowButton.hide();
    gradientOverlay.hide();
  }
});