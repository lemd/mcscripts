$(document).ready(function () {
  var messageMap = {
    "product-gpt-error":
      "Error returned from ChatGPT, product text is probably too long (or using too quickly).",
    "product-added-amazon": "Amazon product added.",
    "product-image-url-error":
      "Product image URL could not be grabbed, please try another.",
    "product-added-etsy": "Etsy product added.",
    "product-cleaned":
      "Unicorn has updated the description, specs, pros and cons. 🦄",
    "product-deleted": "Product has been deleted.",
  };

  var fragment = window.location.hash.substring(1); // Get the URL fragment without the '#'

  if (fragment in messageMap) {
    var message = messageMap[fragment];
    $("#Admin-Status").attr("id", fragment).append(message);
  } else {
    $("#Admin-Status").remove();
  }
});

$(document).ready(function () {
  $(".admin-product-clean").each(function () {
    var textFieldId = $(this).attr("id");
    $(this).val(textFieldId);
  });
});

$(document).ready(function () {
  // Function to check if the URL is an Etsy URL
  function isEtsyUrl(url) {
    var regex = /https?:\/\/(?:www\.)?etsy\.(com|ca)/i;
    return regex.test(url);
  }

  // Function to check if the URL is an Amazon URL
  function isAmazonUrl(url) {
    var regex = /https?:\/\/(?:www\.)?amazon\.(com|ca)/i;
    return regex.test(url);
  }

  // Function to extract the product ID from an Etsy URL
  function extractEtsyProductId(url) {
    var regex = /\/listing\/([^/?]+)/;
    var match = regex.exec(url);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  // Event handler for the product URL input field
  $("#Product2-URL").on("input", function () {
    var productUrl = $(this).val();

    // Check if it's an Etsy URL
    if (isEtsyUrl(productUrl)) {
      var productId = extractEtsyProductId(productUrl);
      if (productId) {
        var affiliateUrl =
          "https://www.awin1.com/cread.php?awinmid=6939&awinaffid=1012129&platform=dl&ued=https%3A%2F%2Fwww.etsy.com%2Flisting%2F" +
          productId +
          "&campaign=guide";
        $("#Product2-Affiliate-URL").val(affiliateUrl);
      }
    }

    // Check if it's an Amazon URL
    if (isAmazonUrl(productUrl)) {
      $("#Product2-Affiliate-URL").val("");
    }
  });
});