$(document).ready(function() {
    var postCollectionListItems = $('.post-collection-list-item');
    var ul = $('<ul>').addClass('post-sticky-list');
  
    postCollectionListItems.each(function(index) {
      var listItem = $(this);
      var sequenceNumber = index + 1;
      var uniqueId = 'item-' + sequenceNumber;
  
      listItem.attr('id', uniqueId);
  
      var heading = listItem.find('.post-list-heading').first();
      heading.prepend(sequenceNumber + '. ');
  
      var li = $('<li>').addClass('post-sticky-list-item').append(
        $('<a>').attr('href', '#' + uniqueId).text(heading.text())
      );
      ul.append(li);
    });
  
    $('#toc').append(ul);
  
    var listItems = postCollectionListItems.map(function() {
      return this;
    }).get();
  
    function highlightCurrentHeading() {
      var fromTop = $(window).scrollTop();
      var currentHeading;
  
      for (var i = listItems.length - 1; i >= 0; i--) {
        var listItem = listItems[i];
        if ($(listItem).offset().top < fromTop + 400) {
          currentHeading = listItem;
          break;
        }
      }
  
      ul.find('a').css('color', '#878682');
  
      if (currentHeading) {
        var id = $(currentHeading).attr('id');
        ul.find('a[href="#' + id + '"]').css('color', '#3B3A38');
      }
    }
  
    // Listen for scroll events to update the highlighted item
    $(window).on('scroll', function() {
      highlightCurrentHeading();
    });
  
    // Highlight the first item in the TOC by default
    var firstListItem = listItems[0];
    if (firstListItem) {
      var firstId = $(firstListItem).attr('id');
      ul.find('a[href="#' + firstId + '"]').css('color', '#3B3A38');
    }
  });
  