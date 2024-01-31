$(document).ready(function () {
  $('.blog-post-block p:contains("[youtube=")').each(function () {
    var divText = $(this).text();
    var regex = /\[youtube="([\w\-?=]+)"\]/g;
    var match = regex.exec(divText);
    if (match) {
      var videoId = match[1];
      var newCode =
        '<div class="youtube-player rl-youtube-player" data-id="' +
        videoId +
        '" data-related="0" data-control="1" data-info="0" data-fullscreen="0"><img class="rl-youtube-player-image" src="//i.ytimg.com/vi/' +
        videoId +
        '/hqdefault.jpg" alt="YouTube video embed" width="480" height="360" loading="lazy"><div class="rl-youtube-player-button"><div class="rl-youtube-player-triangle triangle"></div></div></div>';
      $(this).replaceWith(newCode);
    }
  });
});
