// lyq.js: formatting the laoyin quotes and controlling the page functions

function setCookie(key, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (1 * 365 * 24 * 60 * 60 * 1000));
  document.cookie = key + '=' + value +';path=/'+ ';expires=' + expires.toUTCString();
}

function getCookie(key) {
  var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}

/* Automatically resize every parameter for .masthead when something resizes */
function resizeTitleBar() {
  /* The width, left and right margins are the same as the container */
  $("#notmoving").css("width", $(".container").innerWidth());
  $("#notmoving").css("margin-left", $(".container").css("margin-left"));
  $("#notmoving").css("margin-right", $(".container").css("margin-right"));
  /* This box should be adjacent to #notmoving */
  /* $.css() returns "npx", so we parseInt */
  $("#dropdown").css("width", $(".container").innerWidth() - 2 * parseInt($(".container").css("padding-right")));
  $("#dropdown").css("margin-left", $(".container").css("margin-left"));
  /* Due to some reasons, css max-height needs to be dynamically set */
  $("#dropdown").css("max-height", $(window).outerHeight(true) * 0.3);
  /* Make sure .masthead can cover all of #notmoving and #dropdown */
  $(".masthead").css("height", $("#notmoving").outerHeight(true) +
  $("#dropdown").outerHeight(true) + parseInt($(".masthead").css("padding-top")) +
  parseInt($(".masthead").css("padding-bottom")));
  /* Inherit all margins from .container */
  $(".masthead").css("width", $(".container").innerWidth());
  $(".masthead").css("margin-left", $(".container").css("margin-left"));
  $(".masthead").css("margin-right", $(".container").css("margin-right"));
  /* Move main and footer down */
  $("main").css("top", $(".masthead").outerHeight(true));
  $("footer").css("top", $(".masthead").outerHeight(true));
  /* Extend $(document) so that moved contents won't be cropped */
  $("#adjustheight").height($(".masthead").outerHeight(true));
}

/* Display a thicker bar under selected tab */
function checkVisibility() {
  if ($("#toc").is(":visible")) {
    $("#toggletoc").css("border-bottom", "3px #313131 solid");
  } else {
    $("#toggletoc").css("border-bottom", "1px #e5e5e5 solid");
  }
  if ($("#sitemenu").is(":visible")) {
    $("#togglemenu").css("border-bottom", "3px #313131 solid");
  } else {
    $("#togglemenu").css("border-bottom", "1px #e5e5e5 solid");
  }
  if ($("#options").is(":visible")) {
    $("#toggleoptions").css("border-bottom", "3px #313131 solid");
  } else {
    $("#toggleoptions").css("border-bottom", "1px #e5e5e5 solid");
  }
  /* The size of .masthead must have changed */
  resizeTitleBar();
}
/* Control the tabs */
function toggleToc() {
  $('#sitemenu').hide();
  $('#options').hide();
  $('#toc').toggle(checkVisibility);
}
function toggleMenu() {
  $('#toc').hide();
  $('#options').hide();
  $('#sitemenu').toggle(checkVisibility);
}
function toggleOptions() {
  $('#toc').hide();
  $('#sitemenu').hide();
  $('#options').toggle(checkVisibility);
}
$(document).ready(function() {
  $('#toc').toc({
    listType: 'ul',
    title: '',
    minimumHeaders: 1,
    headers: 'h1',
    classes: {
      list: "toc_ul",
      item: "toc_li"
    }
  });
  /* Collape the toc when an anchor is clicked */
  $(".toc_li").each(function(i) {
    $(this).mouseup(function() {
      toggleToc();
      /* Scroll down a bit */
      setTimeout(function() {
        $(document).scrollTop($(document).scrollTop() -
        $("#adjustheight").outerHeight(true));
      }, 100);
    });
  })
  $('#toc').hide();
  $('#sitemenu').hide();
  $('#options').hide();
  /* Restore defaults */
  if (getCookie("showlyq") == "false") {
    $("#showlyq").click();
  }
  if (getCookie("showexam") == "false") {
    $("#showexam").click();
  }
  if (getCookie("showorig") == "true") {
    $("#showorig").click();
  }
  if (getCookie("onlylyq") == "true") {
    $("#onlylyq").click();
  }
  if (getCookie("showfinal") == "true") {
    $("#showfinal").click();
  }
  /* Set .masthead to be fixed to the top */
  $(".masthead").css("position", "fixed");
  $(".masthead").css("top", "0px");
  $(".masthead").css("left", "0px");
  $(".masthead").css("z-index", "98");
  /* Set #notmoving to be fixed to the top */
  $("#notmoving").css("position", "fixed");
  /* Moe it down a little bit so that it doesn't stick at the very top */
  $("#notmoving").css("top", $(".masthead").css("padding-top"));
  /* It has padding-left */
  $("#notmoving").css("left", "0px");
  /* Higher than .masthead */
  $("#notmoving").css("z-index", "100");
  $("#dropdown").css("position", "fixed");
  /* Lower than #notmoving */
  /* It the screen width change across $large-breakpoint, the behavoir is still
  weird, but it doesn't matter */
  $("#dropdown").css("top", parseInt($(".masthead").css("padding-top")) + $("#notmoving").outerHeight(true) + 1.24/* magic */);
  $("#dropdown").css("left", $(".container").css("padding-left"));
  /* A bit lower, so that the borders don't run into each other */
  $("#dropdown").css("z-index", "99");
  /* These values don't change */
  $("#notmoving").css("padding-left", $(".container").css("padding-left"));
  $("#notmoving").css("padding-right", $(".container").css("padding-right"));
  $(".masthead").css("padding-left", $(".container").css("padding-left"));
  $(".masthead").css("padding-right", $(".container").css("padding-right"));
  /* Move down other contents */
  $("main").css("position", "relative");
  $("footer").css("position", "relative");
  resizeTitleBar();
  /* Append date and to whom data to lyq */
  $("ly-q").each(function(i) {
    var towhom = "", date="", strToAdd="";
    var original = $(this).html();
    if ($(this).attr("towhom") != undefined) {
      towhom = "与" + $(this).attr("towhom");
    }
    if ($(this).attr("date") != undefined) {
      date = "<br />——" + $(this).attr("date");
    }
    strToAdd = original + "”" + date + towhom;
    $(this).html(strToAdd);
  });
  /* After it's done, remove the old close quote */
  $("head").append("<style>ly-q:after{content:''}</style>");
  /* Use png alternatives for browsers that does not support SVG */
  if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") == false) {
    $("img").attr("src", function(i, val) {
      return val + ".png";
    });
  }
});
