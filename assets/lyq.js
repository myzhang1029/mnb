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
function resizeTitleBar() {
  /* The width, left and right margin and padding are the same as the container */
  $("#notmoving").css("width", $(".container").innerWidth());
  $("#notmoving").css("margin-left", $(".container").css("margin-left"));
  $("#notmoving").css("padding-left", $(".container").css("padding-left"));
  $("#notmoving").css("margin-right", $(".container").css("margin-right"));
  $("#notmoving").css("padding-right", $(".container").css("padding-right"));
  $("#dropdown").css("width", $(".container").innerWidth() - 2 * parseInt($(".container").css("padding-right")));
  $("#dropdown").css("left", $(".container").css("padding-left"));
  $("#dropdown").css("margin-left", $(".container").css("margin-left"));
  $(".masthead").css("height", $("#notmoving").outerHeight(true) + $("#dropdown").outerHeight(true) + 2 * parseInt($(".masthead").css("padding-top")));
  $(".masthead").css("width", $(".container").innerWidth());
  $(".masthead").css("margin-left", $(".container").css("margin-left"));
  $(".masthead").css("padding-left", $(".container").css("padding-left"));
  $(".masthead").css("margin-right", $(".container").css("margin-right"));
  $(".masthead").css("padding-right", $(".container").css("padding-right"));
  $("main").css("top", $(".masthead").outerHeight(true));
  $("footer").css("top", $(".masthead").outerHeight(true));
  $("#adjustheight").height($(".masthead").outerHeight(true));
}
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
function toggleToc() {
  $('#sitemenu').hide();
  $('#options').hide();
  $('#toc').slideToggle(checkVisibility);
}
function toggleMenu() {
  $('#toc').hide();
  $('#options').hide();
  $('#sitemenu').slideToggle(checkVisibility);
}
function toggleOptions() {
  $('#toc').hide();
  $('#sitemenu').hide();
  $('#options').slideToggle(checkVisibility);
}
$(document).ready(function() {
  $('#toc').toc({
    listType: 'ul',
    title: '',
    headers: 'h1'
  });
  $('#toc').hide();
  $('#sitemenu').hide();
  $('#options').hide();
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
  /* Set the .masthead to be fixed to the top */
  $(".masthead").css("position", "fixed");
  $(".masthead").css("top", "0px");
  $(".masthead").css("left", "0px");
  $(".masthead").css("z-index", "98");
  $("#notmoving").css("position", "fixed");
  $("#notmoving").css("top", $(".masthead").css("padding-top"));
  $("#notmoving").css("left", "0px");
  $("#notmoving").css("z-index", "99");
  $("#dropdown").css("position", "fixed");
  $("#dropdown").css("top", parseInt($(".masthead").css("padding-top")) + $("#notmoving").outerHeight(true) + 1.24);
  $("#dropdown").css("left", "0px");
  $("#dropdown").css("z-index", "99");
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
