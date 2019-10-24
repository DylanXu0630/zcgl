$(function () {
    var padlength = (window.innerHeight - 106 - 106 - $(".login-mid").height()) / 2;
    $(".login-mid").css("padding-top", padlength).css("padding-bottom", padlength);

    var logDivLength = ($(".login-mid").height() - $(".login-div").height()-110)/2
    $(".login-div").css("margin-top",logDivLength)

    $(window).resize(function () {
        var padlength = (window.innerHeight - 106 - 106 - $(".login-mid").height()) / 2;
        $(".login-mid").css("padding-top", padlength).css("padding-bottom", padlength);
    });
})