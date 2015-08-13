jQuery(function($) {

  // Define Theme specific functions
  var Theme = {
    // Swiping mobile galleries wwith Hammer.js
    swipeGallery: function() {
      setTimeout(function() {
        var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          Theme.swipeGallery();
        });
      }, 500);
    },
    swipeInit: function() {
      if ('ontouchstart' in window) {
        $("body").on("click", "a.w-fancybox", function() {
          Theme.swipeGallery();
        });
      }
    },
    // Mobile Accordion
    accordion: function(menu) {
      $(menu).each(function(){
        var submenu = $(this);
        submenu.addClass("accordion");
        submenu.prepend(submenu.prev("a"));
        submenu.children('.wsite-menu').prepend('<li>');
        var clickable = submenu.children("a").clone();
        clickable.appendTo(submenu.children('.wsite-menu').children('li').first());
        $('<span class="expand"></span>').appendTo(submenu.children("a"));
        submenu.children("a").click(function(e){
          e.preventDefault();
          submenu.toggleClass('open');
          submenu.find('.accordion').removeClass('open');
        });
      });      
    },
    // Hide minicart better on mobile
    hideCart: function(){
      if ('ontouchstart' in window) {
        $('#banner, #main, #footer').on('click', function () {
            $('#wsite-mini-cart').fadeOut("fast");
        });
      }
    },
    topButton: function(container, offset) {
      $(container).after('<a class="scrolltop" href="#">^</a>');
      var display = $(window).scrollTop() > offset ? true : false;
      $(window).scroll(function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > 20 && !display) {
              $(".scrolltop").css({"right" : $("#wrapper").offset().left + 7 + "px" });
              $(".scrolltop").fadeIn("fast");
              display = true;
          } else if (scrollTop <= 20 && display) {
              $(".scrolltop").css({"right" : $("#wrapper").offset().left + 7 + "px" });
              $(".scrolltop").fadeOut("fast");
              display = false;
          }
      });
      $(".scrolltop").click(function(e){
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 900);
      })
    },
    interval: function(condition, action, duration, limit) {
      var counter = 0;
      var looper = setInterval(function(){
        if (counter >= limit || condition()) {
          clearInterval(looper);
        } else {
          action();
          counter++;
        }
      }, duration);
    },
    checkCart: function() {
      return $("#nav-wrapper > .wsite-nav-cart").length;
    },
    moveCart: function() {
      if ($("#wsite-nav-cart-num").text() != "-") {
        var cart = $('.wsite-nav-cart').detach();
        $("#menu-button").before(cart);
      }
    },
    bgHeight: function(background){
      $(background).css({"min-height" : $(window).height() + 50 + "px"});
    }
  }

  $(document).ready(function() {
    $('body').addClass('postload');
    Theme.swipeInit();
    Theme.accordion('#mobile-nav .wsite-menu-wrap');
    Theme.hideCart();
    Theme.bgHeight(".background");
    Theme.topButton("#wrapper", $("#nav-wrapper").height());
    if ($(window).width() <= 992) {
      Theme.interval(Theme.checkCart, Theme.moveCart, 800, 5);
    }
  });

});