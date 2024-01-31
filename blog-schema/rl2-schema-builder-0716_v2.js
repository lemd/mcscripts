$(document).ready(function () {
  // Remove empty content function
  function removeEmptyContent() {
    // Hide Top Picks if Webflow empty class
    if ($("#post-top-picks.w-dyn-list .w-dyn-empty").length) {
      $("#post-top-picks").css("display", "none");
      $("#post-top-picks-divider").css("display", "none");
      console.log("hide top picks");
    }
  }

  // Create 'How To' schema function
  function generateHowToSchema() {
    var $postMainArticleContainer = $("#post-main-article");
    var $stepElements = $postMainArticleContainer.find("h3");
    var steps = [];

    // Extract total time value from HTML string
    var totalTime = "";
    var $totalTimeElement = $postMainArticleContainer.find(
      "p:contains('Total Time:')"
    );

    if ($totalTimeElement.length) {
      var totalTimeText = $totalTimeElement.text().trim();

      var totalTimeMatch = totalTimeText.match(/Total Time:\s*(\d+)/i);
      if (totalTimeMatch) {
        totalTime = totalTimeMatch[1];
      }
      console.log(totalTime);
    }

    // Go through each h3 and p element to create the steps
    $stepElements.each(function () {
      var $stepElement = $(this);
      var $textElements = $stepElement.nextUntil("h3", "p");
      var stepText = $textElements
        .map(function () {
          return $(this).text().trim();
        })
        .get()
        .join(" ");
      var stepUrl = window.location.href + "#" + $stepElement.attr("id"); // Use the ID of the h3 element itself as the stepUrl
      var $imageElement = $stepElement.next("figure").find("img");
      var imageUrl = $imageElement.length
        ? $imageElement.attr("src")
        : undefined;

      steps.push({
        "@type": "HowToStep",
        name: $stepElement.text().trim(),
        url: stepUrl,
        text: stepText.trim(),
        image: {
          "@type": "ImageObject",
          url: imageUrl,
        },
      });
    });

    var howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: $postMainArticleContainer.find("h2").text(),
      url: window.location.href,
      step: steps,
    };

    // Add totalTime to the existing schema if it exists
    if (totalTime !== "") {
      howToSchema.totalTime = "PT" + totalTime + "M";
    }

    return howToSchema;
  }

  // Create 'Product' schema function
  function generateProductSchema() {
    var $postMainArticleHeadline = $("h1");
    var steps = [];

    var reviewSchema = {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 4,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: "Fred Benson",
      },
    };

    var aggregateRatingSchema = {
      "@type": "AggregateRating",
      ratingValue: 4.4,
      reviewCount: 89,
    };

    var productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: $postMainArticleHeadline.text(),
      url: window.location.href,
      review: reviewSchema,
      aggregateRating: aggregateRatingSchema,
    };

    return productSchema;
  }

  // Create Table of Contents function
  function createTableOfContents() {
    // Check if FAQ section exists and has no questions
    var faqSection = $("#faq .w-dyn-list .w-dyn-empty");
    var hasNoQuestions = faqSection.length > 0;

    // Hide FAQ section if there are no questions
    if (hasNoQuestions) {
      $("#faq").hide();
    }

    // Table of Contents
    $(".blog-post-article")
      .find("h2, h3")
      .filter(function () {
        return !$(this).closest(".w-condition-invisible").length;
      })
      .each(function (i) {
        var heading = $(this);
        var str = heading
          .text()
          .replace(/\s+/g, "-")
          .replace(/[°&\/\\#,+()$~%.'":!;*?<>{}]/g, "")
          .toLowerCase();
        heading.attr("id", str);
        var item = $("<a>").html(heading.html());
        ["h2", "h3"].forEach(function (x) {
          if (heading.is(x)) {
            item.addClass("tocitem toc-" + x);
          }
        });
        item.attr("href", "#" + str);

        // Exclude FAQ section if there are no questions
        if (!(hasNoQuestions && heading.closest("#faq").length > 0)) {
          $("#toc").append(item);
        }
      });
  }

  // Create schema function
  function createSchema() {
    console.log("Create schema");
    // Get the ID of the div with the class .blog-post-article
    var divId = $(".blog-post-article").attr("id");

    // Initialize the schema variable
    var schema = "";
    var additionalProperties = {}; // Additional properties for each schema type

    // Determine the schema based on the div ID
    switch (divId) {
      case "Product-Review":
        schema = "Product";
        additionalProperties = generateProductSchema();
        break;
      case "News":
        schema = "NewsArticle";
        additionalProperties = {
          // Additional properties specific to 'NewsArticle' schema type
          // "property3": "value2"
        };
        break;
      case "Regular":
      case "Product-List":
      case "Product-Gallery":
      case "Places":
        schema = "BlogPosting";
        additionalProperties = {
          // Additional properties specific to 'BlogPosting' schema type
          // "property5": "value3"
        };
        break;
      case "Recipe":
        schema = "Recipe";
        additionalProperties = {
          // Additional properties specific to 'Recipe' schema type
          // "property7": "value4"
        };
        break;
      case "How-To":
        schema = "HowTo";
        additionalProperties = generateHowToSchema();
        break;

      default:
        schema = "";
        break;
    }

    // console.log(divId);

    // Function to exclude fields for the 'Product' schema type
    function excludeProductFields(schemaType, schemaObj) {
      if (schemaType === "Product") {
        delete schemaObj.headline;
        delete schemaObj.datePublished;
        delete schemaObj.dateModified;
        delete schemaObj.author;
        delete schemaObj.publisher;
      }
    }

    // Generate the complete schema
    var completeSchema = {
      "@context": "https://schema.org",
      "@type": schema,
      "@id": window.location.href,
      headline:
        "{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}",
      name: "{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}",
      description:
        "{{wf {&quot;path&quot;:&quot;post-summary&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}",
      datePublished:
        "{{wf {&quot;path&quot;:&quot;published-on&quot;,&quot;transformers&quot;:[{&quot;name&quot;:&quot;date&quot;,&quot;arguments&quot;:[&quot;MMM DD, YYYY&quot;]}],&quot;type&quot;:&quot;Date&quot;} }}",
      dateModified:
        "{{wf {&quot;path&quot;:&quot;updated-on&quot;,&quot;transformers&quot;:[{&quot;name&quot;:&quot;date&quot;,&quot;arguments&quot;:[&quot;MMM DD, YYYY&quot;]}],&quot;type&quot;:&quot;Date&quot;} }}",
      image: [
        "{{wf {&quot;path&quot;:&quot;main-image&quot;,&quot;type&quot;:&quot;ImageRef&quot;} }}",
      ],
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id":
          "https://roast.love/blog/{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}",
      },
      author: {
        "@type": "Person",
        name: "{{wf {&quot;path&quot;:&quot;author:name&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}",
        url: "{{wf {&quot;path&quot;:&quot;author:linkedin&quot;,&quot;type&quot;:&quot;Link&quot;} }}",
      },
      publisher: {
        "@type": "Organization",
        name: "Roast Love",
        url: "https://www.roast.love/company/about",
        logo: {
          "@type": "ImageObject",
          url: "https://uploads-ssl.webflow.com/5eb0f3d2e436566757ace906/62f935070c74fd5692b6d23a_roast-love-icon-300.jpg",
        },
      },
      // Spread the additional properties into the schema object
      ...additionalProperties,
    };

    // Exclude fields for the 'Product' schema type
    excludeProductFields(schema, completeSchema);

    // Convert the complete schema to a JSON string
    var schemaJSON = JSON.stringify(completeSchema);

    // Output the generated schema
    console.log(schemaJSON);

    // Output the generated schema
    // console.log(schemaJSON);

    // Create a <script> tag to output the schema
    var scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.text = schemaJSON;

    // Append the <script> tag to the <head> or <body> element
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
  }

  // Load the functions
  removeEmptyContent();
  createSchema();

  // Window load after DOM ready functions fire
  $(window).on("load", function () {
    createTableOfContents();
    // createSchema();
  });
});
