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
  $("footer").css("top", $(".masthead").height()*0.85);
  $(".container").css("height", $(".masthead").outerHeight(true) + $("main").outerHeight(true) + $("footer").outerHeight(true));
}
function toggleToc() {
  $('#sitemenu').hide();
  $('#options').hide();
  $('#toc').slideToggle();
}
function toggleMenu() {
  $('#toc').hide();
  $('#options').hide();
  $('#sitemenu').slideToggle();
}
function toggleOptions() {
  $('#toc').hide();
  $('#sitemenu').hide();
  $('#options').slideToggle();
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
});
$("#showlyq").click(function() {
  if ($(this).prop("checked")) {
    setCookie("showlyq", "true");
    $("ly-q").show();
  } else {
    setCookie("showlyq", "false");
    $("ly-q").hide();
    if ($("#onlylyq").is(":checked")) {
      $("#onlylyq").click();
    }
  }
});
$(window).resize(resizeTitleBar);
$("#showexam").click(function() {
  if ($(this).prop("checked")) {
    setCookie("showexam", "true");
    $("ly-e").show();
    if ($("#onlylyq").is(":checked")) {
      $("#onlylyq").click();
    }
  } else {
    setCookie("showexam", "false");
    $("ly-e").hide();
  }
});
$("#onlylyq").click(function() {
  if ($(this).prop("checked")) {
    setCookie("onlylyq", "true");
    if (!$("#showlyq").is(":checked")) {
      $("#showlyq").click();
    }
    $("main").find("*").hide();
    $("main").find("ly-q").show();
    $("main").find("ly-q").parents().show();
    $("main").find("br").show();
    if ($("#showexam").is(":checked")) {
      $("#showexam").click();
    }
    if ($("#showorig").is(":checked")) {
      $("#showorig").click();
    }
  } else {
    setCookie("onlylyq", "false");
    $("main").find("*").show();
    $("main").find("ly-r").hide();
    $("main").find("ly-old").hide();
    $("main").find(".hidden").hide();
    if (!$("#showexam").is(":checked")) {
      $("ly-e").hide();
    }
    $("script[type*='math/tex']").hide();
  }
});
$("#showorig").click(function() {
  if ($(this).prop("checked")) {
    setCookie("showorig", "true");
    $("ly-r").css("display", "inline");
    $("ly-a").css("display", "none");
    if ($("#onlylyq").is(":checked")) {
      $("#onlylyq").click();
    }
  } else {
    setCookie("showorig", "false");
    $("ly-a").css("display", "inline");
    $("ly-r").css("display", "none");
  }
});
