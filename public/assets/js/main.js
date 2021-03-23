/**
* Template Name: Medilab - v2.0.0
* Template URL: https://bootstrapmade.com/medilab-free-medical-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('#welcome').append($mobile_nav);
    $('#welcome').prepend('<button type="button" id="mobile-nav-toogle-id" class="mobile-nav-toggle d-lg-none mt-2"><i class="icofont-navigation-menu"></i></button>');
    $('#welcome').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('#welcome').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }
  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('.wp-float').css("bottom", 60);
    } else {
      $('.back-to-top').fadeOut('slow');
      $('.wp-float').css("bottom", 10);
    }
  });



  // jQuery counterUp
  /* $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  }); */

  // Testimonials carousel (uses the Owl Carousel library)
  /* $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  }); */

  // Initiate the venobox plugin
  $(document).ready(function() {
    $('.venobox').venobox();

    $('.venobox_map').venobox({
      framewidth : $( window ).width(),                        // default: ''
      frameheight: $( window ).height(),                           // default: ''
      border     : '5px',                             // default: '0'
      bgcolor    : '#2A072B',                          // default: '#fff'
      titleattr  : 'data-title',                       // default: 'title'
      share      : ['facebook', 'twitter', 'download'] // default: []
    });
  });

  // Initiate the datepicker plugin
  /* $(document).ready(function() {
    $('.datepicker').datepicker({
      autoclose: true
    });
  }); */

})(jQuery);