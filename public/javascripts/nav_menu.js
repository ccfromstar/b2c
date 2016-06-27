/**
 * Created by teng on 30.01.2015.
 */
$(function() {
    var url = window.location.href;

    for (var i = 0; i < 500; i++) {
        if ($("#cx" + i).html()) {
            var ht = $("#cx" + i).html();
            ht = ht.replace(/&lt;/g, "<");
            ht = ht.replace(/&gt;/g, ">");
            $("#cx" + i).html(ht);
        }
    }

    for (var i = 0; i < 500; i++) {
        if ($("#cxa" + i).html()) {
            var ht = $("#cxa" + i).html();
            ht = ht.replace(/&lt;/g, "<");
            ht = ht.replace(/&gt;/g, ">");
            $("#cxa" + i).html(ht);
        }
    }

    var l1 = Number($("#divlen").val());
    if (l1 < 6) {
        $("#jianpd").attr("src", "images/right_1.png");
    }

    for (var i = 5; i < 100; i++) {
        if ($("#ppp" + i)) {
            $("#ppp" + i).css("display", "none");
        }
    }

    for (var i = 6; i < 1000; i++) {
        if ($("#tableid" + i)) {
            $("#tableid" + i).css("display", "none");
        }
    }

    if ($("#txtPlace").html()) {
        var comno = $("#txtPlace").val();

        var txth = "<option value='*'>全部</option>";
        var tmp1 = $("#x1").val().split(";");
        var tmp2 = $("#x2").val().split(";");
        var tmp3 = $("#x3").val().split(";");
        var tmp4 = $("#x4").val().split(";");

        for (var i = 0; i < tmp2.length; i++) {
            if (tmp2[i] == comno) {
                for (var j = 0; j < tmp3.length; j++) {
                    if (tmp3[j] == tmp1[i]) {
                        txth = txth + "<option value='" + tmp4[j] + "'>" + tmp4[j] + "</option>";
                    }
                }
            }
        }
        $("#txtPort").html(txth);
    }

    document.onselectstart = function (e) {
        //return false;
    }
    document.oncontextmenu = function (e) {
        //return false;
    }

    $("#pse1").change(function () {
        var pl = $("#pl").val();
        var u = 0;
        var tmpp = pl.split(";");
        var html1 = $("#plist1").html();
        var tmph = html1.split("@");
        var newh = "";
        if ($(this).val() == "1") {
            for (var i = 1; i < tmpp.length; i++) {
                if (tmpp[i] != "电询") {
                    newh = newh + tmph[i - 1];
                    u = u + 1;
                }
            }
            $("#plist").html(newh);
        } else {
            for (var i = 1; i < tmpp.length; i++) {
                if (tmpp[i] == "电询") {
                    newh = newh + tmph[i - 1];
                    u = u + 1;
                }
            }
            $("#plist").html(newh);
        }
        $("#totals").html(u);

    });

    var menulist = "";
    var txt = "";
    var h_1 = $("#homepage_div").css("height");

    var sid = "";
    var parentid = "";


    var tmpq = url.split("&q=");
    //for (var i = 0; i < 100; i++) {
    //    if ($("#dat" + i)) {
    //        if ($("#dat" + i).html() == tmpq[1]) {
    //            changetab('2');
    //            //alert(i);
    //            if (i > 4 && i < 10) {
    //
    //                pageDown();
    //            } else if (i > 9 && i < 15) {
    //
    //                pageDown();
    //                pageDown();
    //            } else if (i > 14 && i < 20) {
    //                pageDown();
    //                pageDown();
    //                pageDown();
    //
    //            } else if (i > 19) {
    //
    //                pageDown();
    //                pageDown();
    //                pageDown();
    //                pageDown();
    //            }
    //            changeprice($("#aca" + i).html(), $("#acb" + i).html(), $("#acc" + i).html(), $("#acd" + i).html(), i, $("#ace" + i).html());
    //        }
    //    }
    //}
    if (url.indexOf("&r=cx") > 0) {
        changetab('6');
    }

    if (url.indexOf("mycurise") > 0) {
        $("#m1").css("color", "#41AFD2");
    }
    else if (url.indexOf("destination") > 0) {
        $("#m2").css("color", "#41AFD2");
    }
    else if (url.indexOf("curisecompany") > 0) {
        $("#m3").css("color", "#41AFD2");
    }
    else if (url.indexOf("share") > 0) {
        $("#m5").css("color", "#41AFD2");
    }
    else if (url.indexOf("theme") > 0) {
        $("#m4").css("color", "#41AFD2");
    }
    else if (url.indexOf("sales") > 0) {
        $("#m6").css("color", "#41AFD2");
    }
    else if (url.indexOf("help") > 0) {
        $("#m7").css("color", "#41AFD2");
    }

    if (h_1) {
        $("#myfoot").css("background-color", "#FFFFFF");
        $("#myfoot_1").attr("src", "images/homepage_footer_2.png");
        $("#myfoot_2").attr("src", "images/homepage_footer_1.png");
    }
    $("#menu").css("display", "none");
    $(".tdfooter_1").click(function () {
        if ($(this).html() == "我的度假邮轮") {
            window.location = "/cds-agent/youlunshidai.html";
        }
        else if ($(this).html() == "邮轮度假目的地") {
            window.location = "/loading?page=destination";
        }
        else if ($(this).html() == "邮轮公司荟萃") {
            window.location = "/loading?page=curisecompany";
        }
        else if ($(this).html() == "邮轮度假主题") {
            window.location = "/loading?page=theme";
        }
        else if ($(this).html() == "邮轮生活分享") {
            window.location = "/loading?page=share";
        }
        else if ($(this).html() == "邮轮促销信息") {
            window.location = "/loading?page=sales";
        }
        else if ($(this).html() == "帮助") {
            window.location = "/loading?page=help?p=a1";
        }
    });
    $(".port").hover(function () {
        $(this).css("color", "#41AFD2");
    }, function () {
        $(this).css("color", "#F15A24");
    });

    $("#p13").hover(function () {
        $(this).css("background-image", "url('/images/p13.png')").css("width", "175px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "158px").css("height", "154px");
    });

    $("#p12").hover(function () {
        $(this).css("background-image", "url('/images/p12.png')").css("width", "175px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "158px").css("height", "154px");
    });

    $("#p11").hover(function () {
        $(this).css("background-image", "url('/images/p11.png')").css("width", "343px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "316px").css("height", "154px");
    });

    $("#p10").hover(function () {
        $(this).css("background-image", "url('/images/p10.png')").css("width", "343px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "316px").css("height", "154px");
    });

    $("#p9").hover(function () {
        $(this).css("background-image", "url('/images/p9.png')").css("width", "175px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "158px").css("height", "154px");
    });

    $("#p8").hover(function () {
        $(this).css("background-image", "url('/images/p8.png')").css("width", "175px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "158px").css("height", "154px");
    });

    $("#p7").hover(function () {
        $(this).css("background-image", "url('/images/p7.png')").css("width", "175px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "158px").css("height", "154px");
    });

    $("#p6").hover(function () {
        $(this).css("background-image", "url('/images/p6.png')").css("width", "343px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "316px").css("height", "154px");
    });

    $("#p3").hover(function () {
        $(this).css("background-image", "url('/images/p3.png')").css("width", "343px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "316px").css("height", "154px");
    });

    $("#p4").hover(function () {
        $(this).css("background-image", "url('/images/p4.png')").css("width", "343px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "316px").css("height", "154px");
    });

    $("#p5").hover(function () {
        $(this).css("background-image", "url('/images/p5.png')").css("width", "175px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "158px").css("height", "154px");
    });

    $("#p2").hover(function () {
        $(this).css("background-image", "url('/images/p2.png')").css("width", "175px").css("height", "170px");
    }, function () {
        $(this).css("background-image", "none").css("width", "158px").css("height", "154px");
    });

    $(".cx").hover(function () {
        $(this).css("color", "#C6D92C");
    }, function () {
        $(this).css("color", "#DFDFDF");
    });

    $(".tohq").hover(function () {
        $(this).css("font-weight", "bold");
    }, function () {
        $(this).css("font-weight", "normal");
    });

    $("#totop").hover(function () {
        $("#totop1").attr("src", "images/to top_2.png");
    }, function () {
        $("#totop1").attr("src", "images/to top_1.png");
    });

    for (var i = 1; i < 100; i++) {
        if ($("#cxtableid" + i)) {
            $("#cxtableid" + i).hover(function () {
                $(this).css("border-color", "#F15A24");
            }, function () {
                $(this).css("border-color", "#DFDFDF");
            });
        }
    }

    $(".tdfooter_1").hover(function () {
        $(this).css("color", "#41AFD2");
        if ($(this).html() == "我的度假邮轮") {
            $("#menu").fadeOut();
        }
        else if ($(this).html() == "邮轮促销信息") {
            $("#menu").fadeOut();
        }
        else {

            $("#menu").fadeIn();
            txt = "<div style='margin:0 auto;width:864px;background-image:url(/images/head_2.png);'><table height='25' border='0'><tr>";
            if ($(this).html() == "邮轮度假目的地") {
                menulist = "地中海;欧洲;加勒比海;阿拉斯加;澳洲新西兰;日韩;东南亚;台湾;夏威夷;更多";
                sid = "hq";
                parentid = "destination";
            } else if ($(this).html() == "邮轮公司荟萃") {
                menulist = "皇家加勒比;歌诗达邮轮;丽星邮轮;公主邮轮;NCL挪威邮轮;MSC地中海;水晶邮轮;更多";
                sid = "V0";
                parentid = "curisecompany";
            } else if ($(this).html() == "邮轮度假主题") {
                menulist = "家庭邮轮;老年邮轮;奢华邮轮;会议邮轮;探险邮轮;环球邮轮;更多";
                sid = "the";
                parentid = "theme";
            } else if ($(this).html() == "邮轮生活分享") {
                menulist = "邮轮入门;邮轮资讯;邮轮游记;邮轮视频";
                sid = "sha";
                parentid = "share";
            } else if ($(this).html() == "帮助") {
                menulist = "关于我们;如何预订;常见问题;联系我们";
                sid = "hel";
                parentid = "help";
            }
            var tmp = menulist.split(";");
            if (sid == "sha") {
                for (var i = 0; i < tmp.length; i++) {
                    txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=sharetheme_sec?id=S000" + (i + 1) + "\"'>" + tmp[i] + "</td>";
                }
            } else if (sid == "hel") {
                for (var i = 0; i < tmp.length; i++) {
                    if (i == 0) {
                        txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a1\"'>" + tmp[i] + "</td>";
                    } else if (i == 1) {
                        txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a2\"'>" + tmp[i] + "</td>";
                    } else if (i == 2) {
                        txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a3\"'>" + tmp[i] + "</td>";
                    } else if (i == 3) {
                        txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a4\"'>" + tmp[i] + "</td>";
                    }

                }
            } else if (sid == "the") {
                for (var i = 0; i < tmp.length; i++) {
                    if (i == tmp.length - 1) {
                        txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=" + parentid + "\"'>" + tmp[i] + "</td>";
                    } else {
                        txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=theme_sec?id=T000" + (i + 1) + "\"'>" + tmp[i] + "</td>";
                    }
                }
            } else {
                for (var i = 0; i < tmp.length; i++) {
                    if (i == tmp.length - 1) {
                        txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=" + parentid + "\"'>" + tmp[i] + "</td>";
                    } else {
                        txt = txt + "<td class='menu_2' onclick='clickmenu_2(\"" + parentid + "\",\"" + sid + (i + 1) + "\")'>" + tmp[i] + "</td>";
                    }
                }
            }
            txt = txt + "</tr></table></div>";
            $("#menu").html(txt);
        }
    }, function () {
        $(this).css("color", "#1A1A1A");
        if (url.indexOf("mycurise") > 0) {
            $("#m1").css("color", "#41AFD2");
        }
        else if (url.indexOf("destination") > 0) {
            $("#m2").css("color", "#41AFD2");
        }
        else if (url.indexOf("curisecompany") > 0) {
            $("#m3").css("color", "#41AFD2");
        }
        else if (url.indexOf("theme") > 0) {
            $("#m4").css("color", "#41AFD2");
        }
        else if (url.indexOf("share") > 0) {
            $("#m5").css("color", "#41AFD2");
        }
        else if (url.indexOf("sales") > 0) {
            $("#m6").css("color", "#41AFD2");
        }
        else if (url.indexOf("help") > 0) {
            $("#m7").css("color", "#41AFD2");
        }
    });
});