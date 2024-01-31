// Count the occurrences of .directory-collection-item.w-dyn-item within .w-tab-pane.w--tab-active
const count = $(".w-tab-pane.w--tab-active .w-dyn-item").length;
console.log(count);

$(document).ready(function () {
  var count = $(".w-tab-pane.w--tab-active .card-roaster-number").length;
  $(".card-roaster-number").each(function (index) {
    $(this).append(
      '<div class="card-roaster-number-count">' + (index + 1) + "</div>"
    );
  });
});
