$(document).ready( function() {
  $(".nav-links").click(function(e) {
    let $link = $(this);
    let sectionId = $link.data('section-id');

    $("html, body").animate({
      scrollTop: $(`#${sectionId}`).offset().top
    }, 1000);
  });
});
