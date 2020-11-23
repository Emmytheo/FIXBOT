/**
* 
* 
*/
(function($) {
  "use strict";

  // Preloader (if the #preloader div exists)
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled ');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled ');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }

  // Smooth scroll for the navigation and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.main-nav a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.main-nav, .mobile-nav').length) {
          $('.main-nav .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });





  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

const spinner = $("#spinner")
const success = $("#check")
const failed = $("#failed")

function getContactInfo(form){
  return {
    email: form.find("#email").val(),
    name: form.find("#name").val(),
    jobTitle: form.find("#job-title").val(),
    businessName: form.find("#business-name").val(),
    projectType: form.find("#project-type").val(),
    projectDescription: form.find("#project-description").val(),
  }
}

async function submitPreorder(email){
  try {
    const response = await $.post("/preorder", {email: email})
      return response.status
  } catch (error) {
    return false
  }
}

async function preorder(email, form){
  const btn = form.find("button[type=submit]")
  const originalBtnContent = btn.contents()
  originalBtnContent.detach()
  const originalBtnColor = btn.css("background-color")
  btn.css("background-color", "#5D667F")
  btn.append(spinner)
  const status = await submitPreorder(email)
  if(status){
    btn.contents().detach()
    btn.append(success)
  }else{
    btn.contents().detach()
    btn.append(failed)
  }
  setTimeout(() => {
      btn.contents().detach()
      btn.append(originalBtnContent)
      btn.css("background-color", originalBtnColor)
    }, 4000);
}
$(".preorder-form").submit(function(e){
  e.preventDefault()
  const email = $(this).find('.email').val()
  if (!email) return
  preorder(email, $(this))
})

$(".contact-form").submit( function(e){
  e.preventDefault()
  const contactInfo = getContactInfo($(this))
  if (!contactInfo.email) return
  preorder(contactInfo.email, $(this))
})