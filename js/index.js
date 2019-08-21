$(document).on("pageinit", function () {
    FastClick.attach(document.body);
    setTimeout(a(), 10);

    function a() {
        var d = ["rgba(0, 168, 236,0.2)", "rgba(107, 107, 107,0.2)", "rgba(67, 181, 31,0.2)", "rgba(245, 141, 0,0.2)", "rgba(100, 15, 108,0.2)", "rgba(211, 44, 44,0.2)", "rgba(60, 91, 155,0.2)", "rgba(255, 200, 8,0.2)"];
        $(".chunk:nth-of-type(2n+1)").css("background-color", d[0]);
        $(".chunk:nth-of-type(2n+2)").css("background-color", d[1]);
        $(".chunk:nth-of-type(2n)").css("background-color", d[2]);
        $(".chunk:nth-of-type(3n+2)").css("background-color", d[3]);
        $(".chunk:nth-of-type(5n+2)").css("background-color", d[4]);
        $(".chunk:nth-of-type(6n+2)").css("background-color", d[5]);
        $(".chunk:nth-of-type(7n+2)").css("background-color", d[6]);
        $(".chunk:nth-of-type(8n+2)").css("background-color", d[7])
    }
    $(".btn-group a").on("click", function () {
        var d = $(".search-text input").val();
        if (null == d || "" == $.trim(d)) {
            return false
        } else {
            $(this).each(function () {
                var e = $(this).attr("dataURL");
                e = e.replace("GitNavi", d);
                window.open(e, "_blank");
                return false
            })
        }
    });
    $(".list-header").click(function () {
        $(this).siblings(".ul-list").toggleClass("h-auto ");
        c($(this).siblings(".triangle"))
    });
    $(".triangle").click(function () {
        $(this).siblings(".ul-list").toggleClass("h-auto ");
        c(this)
    });

    function c(d) {
        if ($(d).hasClass("btn-rotate1")) {
            $(d).removeClass("btn-rotate1");
            $(d).addClass("btn-rotate2")
        } else {
            $(d).addClass("btn-rotate1");
            $(d).removeClass("btn-rotate2")
        }
    }
    $(".youmeek-nav").click(function () {
        $(".user-introduce").toggleClass("display")
    });
    b();

    function b() {
        var d = $(".main-nav-li");
        var e = $(".main-list");
        d.on("click", function () {
            var f = $(this).index();
            $(this).append('<span class="before">◇</span>');
            $(this).siblings("li").children("span").remove();
            e.eq(f).addClass("show").siblings().removeClass("show")
        })
    }
    $(".chunk").on("click", function () {
        var d = $(this).children("a").attr("href");
        window.open(d, "_blank")
    })
});