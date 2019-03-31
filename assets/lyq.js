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
  $(".masthead").css("width", $("main").width());
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
    title: ''
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
  $(".masthead").css("z-index", "99");
  $(".masthead").css("background-color", "white");
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
