$(document).ready( function() {

  $('#openNav').click(function() {
    $('#mainNav').addClass('c-nav__main--open');
    $('#openNav').addClass('c-nav__burger--remove');
  });

  $('#closeNav').click(function() {
    $('#mainNav').removeClass('c-nav__main--open');
    $('#openNav').removeClass('c-nav__burger--remove');
  });

  $(".nav-links").click(function(e) {
    let $link = $(this);
    let sectionId = $link.data('section-id');

    $('html, body').animate({
      scrollTop: $(`#${sectionId}`).offset().top
    }, 1000);
  });

  $('#photographyBtn').click(function() {
    $('html, body').animate({
      scrollTop: $('#photography').offset().top
    }, 1000);
  });

  $('.parallax-window').parallax();
});
