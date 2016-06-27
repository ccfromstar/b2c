$(function(){
    var url = window.location.href;
    


    for(var i=0;i<500;i++){
        if($("#cx"+i).html()){
            var ht =  $("#cx"+i).html();
            ht = ht.replace(/&lt;/g,"<");
            ht = ht.replace(/&gt;/g,">");
            $("#cx"+i).html(ht);
        }
    }

    for(var i=0;i<500;i++){
        if($("#cxa"+i).html()){
            var ht =  $("#cxa"+i).html();
            ht = ht.replace(/&lt;/g,"<");
            ht = ht.replace(/&gt;/g,">");
            $("#cxa"+i).html(ht);
        }
    }

    var l1 = Number($("#divlen").val());
    if(l1<6){
        $("#jianpd").attr("src","images/right_1.png");
    }

    for(var i=5;i<100;i++){
        if($("#ppp"+i)){
            $("#ppp"+i).css("display","none");
        }
    }

    for(var i=6;i<1000;i++){
        if($("#tableid"+i)){
            $("#tableid"+i).css("display","none");
        }
    }

    if($("#txtPlace").html()){
        var comno = $("#txtPlace").val();

        var txth = "<option value='*'>全部</option>";
        var tmp1 = $("#x1").val().split(";");
        var tmp2 = $("#x2").val().split(";");
        var tmp3 = $("#x3").val().split(";");
        var tmp4 = $("#x4").val().split(";");

        for(var i=0;i<tmp2.length;i++){
            if(tmp2[i]==comno){
                for(var j=0;j<tmp3.length;j++){
                    if(tmp3[j]==tmp1[i]){
                        txth = txth + "<option value='"+tmp4[j]+"'>"+tmp4[j]+"</option>";
                    }
                }
            }
        }
        $("#txtPort").html(txth);
    }

    document.onselectstart = function(e) {
        //return false;
    }
    document.oncontextmenu = function(e) {
        //return false;
    }

    $("#pse1").change(function(){
          var pl = $("#pl").val();
          var u = 0;
          var tmpp = pl.split(";");
          var html1 = $("#plist1").html();
          var tmph =  html1.split("@");
          var newh = "";
          if($(this).val()=="1"){
              for(var i=1;i<tmpp.length;i++){
                  if(tmpp[i]!="电询"){
                      newh = newh + tmph[i-1];
                      u = u + 1;
                  }
              }
              $("#plist").html(newh);
          }else{
              for(var i=1;i<tmpp.length;i++){
                  if(tmpp[i]=="电询"){
                      newh = newh + tmph[i-1];
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
    for(var i=0;i<100;i++){
        if($("#dat"+i)){
            if($("#dat"+i).html()==tmpq[1]){
                //changetab('2');
                //alert(i);
                if(i>4 && i<10){

                    pageDown();
                }else if(i>9 && i<15){

                    pageDown();pageDown();
                }else if(i>14 && i<20){
                    pageDown();pageDown();pageDown();

                }else if(i>19){

                    pageDown();pageDown();pageDown();pageDown();
                }
                changeprice($("#aca"+i).html(),$("#acb"+i).html(),$("#acc"+i).html(),$("#acd"+i).html(),i,$("#ace"+i).html());
            }
        }
    }
    if(url.indexOf("&r=cx")>0){
        //changetab('6');
    }

	if(url.indexOf("mycurise")>0){$("#m1").css("color","#41AFD2"); }
	else if(url.indexOf("destination")>0){$("#m2").css("color","#41AFD2"); }
	else if(url.indexOf("curisecompany")>0){$("#m3").css("color","#41AFD2"); }
    else if(url.indexOf("share")>0){$("#m5").css("color","#41AFD2"); }
	else if(url.indexOf("theme")>0){$("#m4").css("color","#41AFD2"); }
	else if(url.indexOf("sales")>0){$("#m6").css("color","#41AFD2"); }
	else if(url.indexOf("help")>0){$("#m7").css("color","#41AFD2"); }
	
  if(url.indexOf("sales")!=-1){                                        //动态切换微信
     $("#wx_code").attr("src","images/secondCode/sales.png");
  }else if(url.indexOf("destination")!=-1){
     $("#wx_code").attr("src","images/secondCode/destination.png");
  }else if(url.indexOf("curisecompany")!=-1){
     $("#wx_code").attr("src","images/secondCode/curisecompany.png");
  }else if(url.indexOf("theme")!=-1){
     $("#wx_code").attr("src","images/secondCode/theme.png");
  }else if(url.indexOf("share")!=-1){
     $("#wx_code").attr("src","images/secondCode/share.png");
  }                                                              //动态切换微信 结束


	if(h_1){
		$("#myfoot").css("background-color","#FFFFFF");
		$("#myfoot_1").attr("src","images/homepage_footer_2.png");
		$("#myfoot_2").attr("src","images/homepage_footer_1.png");
	}
	$("#menu").css("display","none");
	$(".tdfooter_1").click(function(){
			if($(this).html()=="海外出发"){window.location="/loading?page=mycuriseresult";}
			else if($(this).html()=="邮轮度假目的地"){window.location="/loading?page=destination";}
			else if($(this).html()=="邮轮公司荟萃"){window.location="/loading?page=curisecompany";}
			else if($(this).html()=="邮轮度假主题"){window.location="/loading?page=theme";}
			else if($(this).html()=="邮轮生活分享"){window.location="/loading?page=share";}
			else if($(this).html()=="国内出发"){window.open("/cds-agent/index.html");}
			else if($(this).html()=="帮助"){window.location="/loading?page=help?p=a1";}
	});
    $(".port").hover(function(){
        $(this).css("color","#41AFD2");
    },function(){
        $(this).css("color","#F15A24");
    });

    $("#p13").hover(function(){
        $(this).css("background-image","url('/images/p13.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p12").hover(function(){
        $(this).css("background-image","url('/images/p12.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p11").hover(function(){
        $(this).css("background-image","url('/images/p11.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p10").hover(function(){
        $(this).css("background-image","url('/images/p10.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p9").hover(function(){
        $(this).css("background-image","url('/images/p9.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p8").hover(function(){
        $(this).css("background-image","url('/images/p8.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p7").hover(function(){
        $(this).css("background-image","url('/images/p7.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p6").hover(function(){
        $(this).css("background-image","url('/images/p6.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p3").hover(function(){
        $(this).css("background-image","url('/images/p3.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p4").hover(function(){
        $(this).css("background-image","url('/images/p4.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p5").hover(function(){
        $(this).css("background-image","url('/images/p5.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p2").hover(function(){
        $(this).css("background-image","url('/images/p2.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $(".cx").hover(function(){
        $(this).css("color","#C6D92C");
    },function(){
        $(this).css("color","#DFDFDF");
    });

    $(".tohq").hover(function(){
        $(this).css("font-weight","bold");
    },function(){
        $(this).css("font-weight","normal");
    });
     
   
      $("#singleShipTicket").click(function(){          //搜索框 开始
           $(this).css("color","#C1D157");
           $(this).css("fontWeight","bold");
           $("#setMealTicket").css("color","#FFFFFF");
           $("#setMealTicket").css("fontWeight","100");
           $("#port").css("display","inline-block");
           $("#city").css("display","none");
      });
 
       $("#setMealTicket").click(function(){         
           $(this).css("color","#C1D157");
           $(this).css("fontWeight","bold");
           $("#singleShipTicket").css("color","#FFFFFF");
           $("#singleShipTicket").css("fontWeight","100");
           $("#city").css("display","inline-block");
           $("#port").css("display","none");
      });                                                //搜索框 结束


    $(".totop").hover(function(){                      //移到最顶端按钮  开始
          $(".totop1").attr("src","images/to top_2.png");
    },function(){
          $(".totop1").attr("src","images/to top_1.png");
    });


    $("#totop").click(function(){
         $(".topHeader").scrollIntoView();
    });                                            //移到最顶端按钮  结束


    $("#wxtp").hover(function(){                  //微信的图片按钮  开始
          $("#wxtp1").attr("src","images/style/ask_0.png");
    },function(){
          $("#wxtp1").attr("src","images/style/ask.png");
    });  
                                               //微信的图片按钮  结束


                                  

                                                //我要咨询 按钮 开始
    var wxtp1=document.getElementById("wxtp1"); 
    var strut_button1=document.getElementById("strut_button1");
    var strut_button2=document.getElementById("strut_button2");
    var myForm=document.getElementById("myForm");

    addEvent(wxtp1,'click',function(evt){
       var struts=document.getElementById("struts");
       var black=document.getElementById("black");
       struts.style.display='block';
       black.style.display='block';
    });                                       
    
     addEvent(strut_button1,'click',function(evt){   //提交
       //myForm.submit();
       struts.style.display='none';
       black.style.display='none';
    });   
     addEvent(strut_button2,'click',function(evt){  //关闭
       struts.style.display='none';
       black.style.display='none';
    });     
                                                 //我要咨询 按钮 结束



     
     if($("#product_title01").height()>38){         //产品字数限高度

     }


    for(var i=1;i<100;i++){
       if($("#cxtableid"+i)){
           $("#cxtableid"+i).hover(function(){
               $(this).css("border-color","#F15A24");
           },function(){
               $(this).css("border-color","#DFDFDF");
           });
       }
    }

	$(".tdfooter_1").hover(function(){
            $(this).css("color","#41AFD2"); 
			if($(this).html()=="海外出发")
                {
                    $("#menu").fadeOut();
                }
            else if($(this).html()=="国内出发")
                {
                    $("#menu").fadeOut();
                }
			else{
				
				$("#menu").fadeIn();
				txt = "<div style='margin:0 auto;width:864px;background-image:url(/images/head_2.png);'><table height='25' border='0'><tr>";
				if($(this).html()=="邮轮度假目的地"){
					menulist = "地中海;欧洲;加勒比海;阿拉斯加;澳洲新西兰;日韩;东南亚;台湾;夏威夷;更多";
					sid = "hq";
					parentid = "destination";
				}else if($(this).html()=="邮轮公司荟萃"){
					menulist = "皇家加勒比;歌诗达邮轮;丽星邮轮;公主邮轮;NCL挪威邮轮;MSC地中海;水晶邮轮;更多";
					sid = "V0";
					parentid = "curisecompany";
				}else if($(this).html()=="邮轮度假主题"){
					menulist = "家庭邮轮;老年邮轮;奢华邮轮;会议邮轮;探险邮轮;环球邮轮;更多";
					sid = "the";
					parentid = "theme";
				}else if($(this).html()=="邮轮生活分享"){
					menulist = "邮轮入门;邮轮资讯;邮轮游记;邮轮视频";
					sid = "sha";
					parentid = "share";
				}else if($(this).html()=="帮助"){
					menulist = "关于我们;如何预订;常见问题;联系我们";
					sid = "hel";
					parentid = "help";
				}
				var tmp = menulist.split(";");
                if(sid=="sha"){
                    for(var i=0;i<tmp.length;i++){
                       txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=sharetheme_sec?id=S000"+(i+1)+"\"'>"+tmp[i]+"</td>";
                    }
                }else if(sid=="hel"){
                    for(var i=0;i<tmp.length;i++){
                        if(i==0){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a1\"'>"+tmp[i]+"</td>";
                        }else if(i==1){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a2\"'>"+tmp[i]+"</td>";
                        }else if(i==2){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a3\"'>"+tmp[i]+"</td>";
                        }else if(i==3){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a4\"'>"+tmp[i]+"</td>";
                        }

                    }
                }else if(sid=="the"){
                    for(var i=0;i<tmp.length;i++){
                        if(i == tmp.length-1){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page="+parentid+"\"'>"+tmp[i]+"</td>";
                        }else{
                       txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=theme_sec?id=T000"+(i+1)+"\"'>"+tmp[i]+"</td>";
                        }
                    }
                }else{
                    for(var i=0;i<tmp.length;i++){
                        if(i == tmp.length-1){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page="+parentid+"\"'>"+tmp[i]+"</td>";
                        }else{
                            txt = txt + "<td class='menu_2' onclick='clickmenu_2(\""+parentid+"\",\""+sid+(i+1)+"\")'>"+tmp[i]+"</td>";
                        }
                    }
                }
				txt = txt + "</tr></table></div>";
				$("#menu").html(txt);
			}
    },function(){
            $(this).css("color","#1A1A1A");  
			if(url.indexOf("mycurise")>0){$("#m1").css("color","#41AFD2"); }
	else if(url.indexOf("destination")>0){$("#m2").css("color","#41AFD2"); }
	else if(url.indexOf("curisecompany")>0){$("#m3").css("color","#41AFD2"); }
	else if(url.indexOf("theme")>0){$("#m4").css("color","#41AFD2"); }
	else if(url.indexOf("share")>0){$("#m5").css("color","#41AFD2"); }
	else if(url.indexOf("sales")>0){$("#m6").css("color","#41AFD2"); }
	else if(url.indexOf("help")>0){$("#m7").css("color","#41AFD2"); }
    });

    $("#txtCuriseCompany").change(function(){
        var comno = this.value;
        var txth = "<option value='*'>全部</option>";
        var tmp1 = $("#shipNo").val().split(";");
        var tmp2 = $("#shipName").val().split(";");
        var tmp3 = $("#shipComNo").val().split(";");
        for(var i=0;i<tmp3.length;i++){
             if(tmp3[i]==comno){
                 txth = txth + "<option value='"+tmp1[i]+"'>"+tmp2[i]+"</option>";
             }
        }
        $("#txtCurise").html(txth);
    });

    $("#txtPlace").change(function(){
        var comno = this.value;

        var txth = "<option value='*'>全部</option>";
        var tmp1 = $("#x1").val().split(";");
        var tmp2 = $("#x2").val().split(";");
        var tmp3 = $("#x3").val().split(";");
        var tmp4 = $("#x4").val().split(";");

        for(var i=0;i<tmp2.length;i++){
            if(tmp2[i]==comno){
                for(var j=0;j<tmp3.length;j++){
                    if(tmp3[j]==tmp1[i]){
                        txth = txth + "<option value='"+tmp4[j]+"'>"+tmp4[j]+"</option>";
                    }
                }
            }
        }
        $("#txtPort").html(txth);
    });

    $("#pse2").change(function(){
        if($(this).val()=="1"){
             $("#orderby1").val("1");
        }else{
             $("#orderby1").val("2");
        }
        document.forms[0].submit();
    });

	
	$("#btn_search").click(function(){
		$(this).attr("src","/images/searchbutton_2.png");
		document.forms[0].submit();
	});
	
	$("#btn_search_r").click(function(){
        document.all.numStart.value = "0";
		document.forms[0].submit();
	});
	
	$("#tohome").click(function(){
		window.location="/";
	});

    $("#login").click(function(){
        //if($("#txtUserName").val()=="huiyou" && $("#txtPwd").val()=="youlunshidai123"){
        //    window.location="admin";
        //}else{
        //    alert("用户名密码错误！");$("#txtUserName").val("");$("#txtPwd").val("");
        //}
    });
	
	$("#btn_search").hover(function(){
		   $(this).attr("src","/images/searchbutton_2.png");
	},function(){
           $(this).attr("src","/images/searchbutton_1.png");
    });

    var png1 = "images/map_location_shinning.png";
    var png2 = "images/map_location.png";


        $("#pointDZH1").hover(function(){
            $("#pd1").attr("src",png1);
            //$(this).css("color","#FFFFFF");
            $("#pointDZH1").addClass("pointmap1");
        },function(){
            $("#pd1").attr("src",png2);
            $("#pointDZH1").removeClass("pointmap1");
        });

    $("#pointDZH2").hover(function(){
        $("#pd2").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH2").addClass("pointmap1");
    },function(){
        $("#pd2").attr("src",png2);
        $("#pointDZH2").removeClass("pointmap1");
    });

    $("#pointDZH3").hover(function(){
        $("#pd3").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH3").addClass("pointmap1");
    },function(){
        $("#pd3").attr("src",png2);
        $("#pointDZH3").removeClass("pointmap1");
    });

    $("#pointDZH4").hover(function(){
        $("#pd4").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH4").addClass("pointmap1");
    },function(){
        $("#pd4").attr("src",png2);
        $("#pointDZH4").removeClass("pointmap1");
    });

    $("#pointDZH5").hover(function(){
        $("#pd5").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH5").addClass("pointmap1");
    },function(){
        $("#pd5").attr("src",png2);
        $("#pointDZH5").removeClass("pointmap1");
    });

    $("#pointDZH6").hover(function(){
        $("#pd6").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH6").addClass("pointmap1");
    },function(){
        $("#pd6").attr("src",png2);
        $("#pointDZH6").removeClass("pointmap1");
    });

    $("#pointDZH7").hover(function(){
        $("#pd7").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH7").addClass("pointmap1");
    },function(){
        $("#pd7").attr("src",png2);
        $("#pointDZH7").removeClass("pointmap1");
    });

    $("#pointDZH8").hover(function(){
        $("#pd8").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH8").addClass("pointmap1");
    },function(){
        $("#pd8").attr("src",png2);
        $("#pointDZH8").removeClass("pointmap1");
    });

    $("#pointDZH9").hover(function(){
        $("#pd9").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH9").addClass("pointmap1");
    },function(){
        $("#pd9").attr("src",png2);
        $("#pointDZH9").removeClass("pointmap1");
    });


	
	$("#changetab_1").click(function(){
		$("#form_szq").css("background-image","url(/images/searchbox_china.png)");
	});
	
	$("#changetab_2").click(function(){
		$("#form_szq").css("background-image","url(/images/searchbox_global.png)");
	});


	var winlen = $(window).width();
    if(url.indexOf("curiseship")>0){
        $("#focus ul li img").css("width",650).css("height",366);
        $("#focus").css("width",650).css("height",366);
        $(".preNext next").css("top",150);
    }else if(url.indexOf("curisecship_sec")>0){
        $("#focus ul li img").css("width",864).css("height",380);
        $("#focus").css("width",864).css("height",380);
        $(".preNext next").css("top",150);
    }else{
	    $("#focus").css("width",winlen);
	    $("#focus ul li img").css("width",winlen);
    }
	$("#destion").css("width",winlen);
	$("#show_1").css("left",(winlen-950)/2);
	$("#form_1").css("left",(winlen-950)/2+5+28);
	$("#menu_path").css("left",(winlen-950)/2+50);
	$("#form_2").css("left",(winlen-318)/2);
	
	
	var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; //获取焦点图个数
    var lengthd =  len/50;
	var index = 0;
    var indexd = 25;
	var picTimer;



    //$("#focus ul").css("left",-indexd*sWidth);

    setCookie("indexd",25);
    setCookie("label",0);

    if(url.indexOf("destination")>0){
        lengthd = len/100;
        indexd = 50;
        setCookie("indexd",50);
    }else if(url.indexOf("curisecompany")>0){
        lengthd = len/40;
        indexd = 20;
        setCookie("indexd",20);
    }else if(url.indexOf("theme")>0){
        lengthd = len/40;
        indexd = 20;
        setCookie("indexd",20);
    }

	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	//var btn = "<div class='btnBg'></div>";
	var btn = "<div class='btn'>";
	for(var i=0; i < lengthd; i++) {
		btn += "<span></span>";
	}
	btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
	$("#focus").append(btn);
	$("#focus .btnBg").css("opacity",0.5);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").css("opacity",0.4).mouseover(function() {
		index = $("#focus .btn span").index(this);
        //indexd = $("#focus .btn span").index(this);
       //if(getCookie("indexd")){
        indexd = index + Number(getCookie("indexd"))*lengthd;
        //}else{
        //    indexd = index;
        //}
        if(Number(getCookie("label")) == 0){
            showPics1(index,indexd,lengthd,sWidth);
        }else{
            showPics(index,indexd,lengthd,sWidth);
        }


	}).eq(0).trigger("mouseover");

	//上一页、下一页按钮透明度处理
	$("#focus .preNext").css("opacity",0.4).hover(function() {
		$(this).stop(true,false).animate({"opacity":"0.5"},300);
	},function() {
		$(this).stop(true,false).animate({"opacity":"0.4"},300);
	});

	//上一页按钮
	$("#focus .pre").click(function() {
		index -= 1;
        indexd -= 1;
		if(index == -1) {index = lengthd - 1;}
        if(index == 499) {index = lengthd - 1;}

        //if(indexd < 0){alert("已经是第一张图片!");return false;}
		showPics(index,indexd,lengthd,sWidth);
	});

	//下一页按钮
	$("#focus .next").click(function() {
		index += 1;
        indexd += 1;
		if(index == lengthd) {index = 0;}
		showPics(index,indexd,lengthd,sWidth);
	});

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width",sWidth * (len));


    var picTimer = setInterval(function() {
        if(indexd ==len){
            window.location.reload();
        }
        showPics(index,indexd,lengthd,sWidth);
        index++;
        indexd++;
        if(index == lengthd) {index = 0;}
    },5000); //此5000代表自动播放的间隔，单位：毫秒


    $(".wxdtb,#divWX").mouseenter(function(){     //微信图标
        $(".wxxtb").show();
    });
    $(".wxdtb,#divWX").mouseleave(function(){
        $(".wxxtb").hide();
    });

    $(".wxdtb1,.wxxtb01").mouseenter(function(){     //微信图标
        $(".wxxtb01").show();
    });
    $(".wxdtb1,.wxxtb01").mouseleave(function(){
        $(".wxxtb01").hide();
    });


    $("#menu").mouseleave(function(){     //二级菜单
        $("#menu").hide();
    });


    $("#button1").mouseover(function(){    //特区航线推荐 鼠标悬停事件
        $("#button1").css("opacity","0.7");
        
    });
    $("#button1").mouseout(function(){
        $("#button1").css("opacity","1.0");
       
    });
    $("#button2").mouseover(function(){
        $("#button2").css("opacity","0.7");
        
    });
    $("#button2").mouseout(function(){
        $("#button2").css("opacity","1.0");
       
    });

     $("#button3").mouseover(function(){    //邮轮游记 鼠标悬停事件
        $("#button3").css("opacity","0.7");
        
    });
    $("#button3").mouseout(function(){
        $("#button3").css("opacity","1.0");
       
    });
    $("#button4").mouseover(function(){
        $("#button4").css("opacity","0.7");
        
    });
    $("#button4").mouseout(function(){
        $("#button4").css("opacity","1.0");
       
    });


      $("#button5").mouseover(function(){    //邮轮目的港口 鼠标悬停事件
        $("#button5").css("opacity","0.7");
        
    });
    $("#button5").mouseout(function(){
        $("#button5").css("opacity","1.0");
       
    });
    $("#button6").mouseover(function(){
        $("#button6").css("opacity","0.7");
        
    });
    $("#button6").mouseout(function(){
        $("#button6").css("opacity","1.0");
       
    });

    $(".hodometer_button").click(function(){                                       //行程表按钮触发 开始
       if($(this).find(".hodometer_image").attr("src")=="images/tp25.png"){
         $(this).find(".hodometer_image").attr("src","images/tp24.png");
         $(this).prev().children(".hodometerImage").attr("src","images/style/des_gray.png");
         $(this).css("borderLeftColor","#666666");
         $(this).find(".hodometer_text").slideUp(400);
         $(this).find(".img_hodometer_text").slideUp(400);
       }else
       {
         $(this).find(".hodometer_image").attr("src","images/tp25.png");
         $(this).prev().children(".hodometerImage").attr("src","images/style/des_orange.png");
         $(this).css("borderLeftColor","#FF8900");
         $(this).find(".hodometer_text").slideDown(400);
         $(this).find(".img_hodometer_text").slideDown(400);
       }
    });                                                                                 //行程表按钮触发 结束


    $("#toggle_context1").click(function(){  //舱房预定第2步 资料填写 开始
        $("#context1").slideToggle(400);
        if($(this).attr("src")=="images/style/input.png"){
            $(this).attr("src","images/style/input_0.png");
        }else{
             $(this).attr("src","images/style/input.png");
        }    
    });
    $("#toggle_context2").click(function(){
        $("#context2").slideToggle(400); 
        if($(this).attr("src")=="images/style/input.png"){
            $(this).attr("src","images/style/input_0.png");
        }else{
             $(this).attr("src","images/style/input.png");
        }    
    });                                       //舱房预定第2步 资料填写 结束
                                       


    $(".buttom_2").click(function(){                                        //舱房预定第2步 其他费用 开始
        if($(this).find(".image_2").attr("src")=="images/style/tp25.png"){
             $(this).parent().nextAll(".text_2").slideUp(400);
             $(this).find(".image_2").attr("src","images/style/tp24.png");
        }else {   
             $(this).find(".image_2").attr("src","images/style/tp25.png");
             $(this).parent().nextAll(".text_2").slideDown(400);
            
        }
    });                                                                    //舱房预定第2步 其他费用 结束
   
   

                                  



         //最新三条产品变化 product里 start
       var product_imgList=[
                       {
                        product_img:"<img id='p1' class='product_left' src='images/tp.png'/>",
                        product_title1:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;1皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price1:"￥599起",
                        product_day1:"【上海出发】 1出发日期:2015-12-19",
                        product_position1:"1深圳-香港-奥兰多-落得带包-那马。。",
                        product_title2:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;1皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price2:"￥599起",
                        product_day2:"【上海出发】 1出发日期:2015-12-19",
                        product_position2:"1深圳-香港-奥兰多-落得带包-那马。。",
                        product_title3:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;1皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price3:"￥599起",
                        product_day3:"【上海出发】 1出发日期:2015-12-19 &nbsp; &nbsp;<img src='images/style/earlybooking.png' style='vertical-align:bottom'/>",
                        product_position3:"1深圳-香港-奥兰多-落得带包-那马。。"
                       },
                        {
                        product_img:"<img id='p2' class='product_left' src='images/map1.jpg'/>",
                        product_title1:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;2皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price1:"￥699起",
                        product_day1:"【上海出发】 2出发日期:2015-12-19 &nbsp; &nbsp;<img src='images/style/earlybooking.png' style='vertical-align:bottom'/>",
                        product_position1:"2深圳-香港-奥兰多-落得带包-那马。。",
                        product_title2:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;2皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price2:"￥699起",
                        product_day2:"【上海出发】 2出发日期:2015-12-19",
                        product_position2:"2深圳-香港-奥兰多-落得带包-那马。。",
                        product_title3:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;2皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price3:"￥699起",
                        product_day3:"【上海出发】 2出发日期:2015-12-19",
                        product_position3:"2深圳-香港-奥兰多-落得带包-那马。。"
                       },
                        {
                        product_img:"<img id='p3' class='product_left' src='images/map1.jpg'/>",
                        product_title1:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;3皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price1:"￥799起",
                        product_day1:"【上海出发】 3出发日期:2015-12-19",
                        product_position1:"3深圳-香港-奥兰多-落得带包-那马。。",
                        product_title2:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;3皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price2:"￥799起",
                        product_day2:"【上海出发】 3出发日期:2015-12-19 &nbsp; &nbsp;<img src='images/style/earlybooking.png' style='vertical-align:bottom'/>",
                        product_position2:"3深圳-香港-奥兰多-落得带包-那马。。",
                        product_title3:"<img src='images/tp2.png' style='vertical-align:bottom'/>&nbsp; &nbsp;3皇家加勒比邮轮-海洋绿洲号11晚12天澳洲新西兰游",
                        product_price3:"￥799起",
                        product_day3:"【上海出发】 3出发日期:2015-12-19",
                        product_position3:"3深圳-香港-奥兰多-落得带包-那马。。"
                       }
                           ]

                        var product_img_page_ALL=0;    //代表下标
                  $("#product_img").html(product_imgList[product_img_page_ALL].product_img);
                  $("#product_title1").html(product_imgList[product_img_page_ALL].product_title1);
                  $("#product_price1").html(product_imgList[product_img_page_ALL].product_price1);
                  $("#product_day1").html(product_imgList[product_img_page_ALL].product_day1);
                  $("#product_position1").html(product_imgList[product_img_page_ALL].product_position1);
                  $("#product_title2").html(product_imgList[product_img_page_ALL].product_title2);
                  $("#product_price2").html(product_imgList[product_img_page_ALL].product_price2);
                  $("#product_day2").html(product_imgList[product_img_page_ALL].product_day2);
                  $("#product_position2").html(product_imgList[product_img_page_ALL].product_position2);
                  $("#product_title3").html(product_imgList[product_img_page_ALL].product_title3);
                  $("#product_price3").html(product_imgList[product_img_page_ALL].product_price3);
                  $("#product_day3").html(product_imgList[product_img_page_ALL].product_day3);
                  $("#product_position3").html(product_imgList[product_img_page_ALL].product_position3);

                  $("#button1").click(function(){
                    $("#product_main2").fadeOut(1);
                     
                     product_img_page_ALL+=1;
                     if(product_img_page_ALL>product_imgList.length-1){
                        product_img_page_ALL=0;
                     }
                      $("#product_img").html(product_imgList[product_img_page_ALL].product_img);
                      $("#product_title1").html(product_imgList[product_img_page_ALL].product_title1);
                      $("#product_price1").html(product_imgList[product_img_page_ALL].product_price1);
                      $("#product_day1").html(product_imgList[product_img_page_ALL].product_day1);
                      $("#product_position1").html(product_imgList[product_img_page_ALL].product_position1);
                      $("#product_title2").html(product_imgList[product_img_page_ALL].product_title2);
                      $("#product_price2").html(product_imgList[product_img_page_ALL].product_price2);
                      $("#product_day2").html(product_imgList[product_img_page_ALL].product_day2);
                      $("#product_position2").html(product_imgList[product_img_page_ALL].product_position2);
                      $("#product_title3").html(product_imgList[product_img_page_ALL].product_title3);
                      $("#product_price3").html(product_imgList[product_img_page_ALL].product_price3);
                      $("#product_day3").html(product_imgList[product_img_page_ALL].product_day3);
                      $("#product_position3").html(product_imgList[product_img_page_ALL].product_position3);
                      $("#product_main2").fadeIn(1200);
                      
                  });

                
                    $("#button2").click(function(){
                        $("#product_main2").fadeOut(1);
                          
                     product_img_page_ALL-=1;
                     if(product_img_page_ALL<0){
                        product_img_page_ALL=product_imgList.length-1;
                     }
                      $("#product_img").html(product_imgList[product_img_page_ALL].product_img);
                      $("#product_title1").html(product_imgList[product_img_page_ALL].product_title1);
                      $("#product_price1").html(product_imgList[product_img_page_ALL].product_price1);
                      $("#product_day1").html(product_imgList[product_img_page_ALL].product_day1);
                      $("#product_position1").html(product_imgList[product_img_page_ALL].product_position1);
                      $("#product_title2").html(product_imgList[product_img_page_ALL].product_title2);
                      $("#product_price2").html(product_imgList[product_img_page_ALL].product_price2);
                      $("#product_day2").html(product_imgList[product_img_page_ALL].product_day2);
                      $("#product_position2").html(product_imgList[product_img_page_ALL].product_position2);
                      $("#product_title3").html(product_imgList[product_img_page_ALL].product_title3);
                      $("#product_price3").html(product_imgList[product_img_page_ALL].product_price3);
                      $("#product_day3").html(product_imgList[product_img_page_ALL].product_day3);
                      $("#product_position3").html(product_imgList[product_img_page_ALL].product_position3);
                      $("#product_main2").fadeIn(1200);
                      
                  });
         //最新三条产品变化 product里 end




         //三张图片一起滚啊滚 record里 start
     var record_imgList=[
              {
                record_img:"<img id='r1' class='record_imgq' src='images/CAB_lauder_lg.jpg'/>",
                record_title:"游记标题1",
                record_main:"1游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍"
              },
              {
                record_img:"<img id='r2' class='record_imgq' src='images/cc1.jpg' />",
                record_title:"游记标题2",
                record_main:"2游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍"
              },
              {
                record_img:"<img id='r3' class='record_imgq' src='images/cc2.jpg'/>",
                record_title:"游记标题3",
                record_main:"3游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍"
              },
              {
                record_img:"<img id='r4' class='record_imgq' src='images/cruiseline_1.jpg' />",
                record_title:"游记标题4",
                record_main:"4游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍"
              },
              {
                record_img:"<img id='r5' class='record_imgq' src='images/cruiseline_2.jpg' />",
                record_title:"游记标题5",
                record_main:"5游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍"
              },
              {
                record_img:"<img id='r6' class='record_imgq' src='images/cruiseline_3.jpg' />",
                record_title:"游记标题6",
                record_main:"6游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍"
              },
              {
                record_img:"<img id='r7' class='record_imgq' src='images/cruiseline_4.jpg' />",
                record_title:"游记标题7",
                record_main:"7游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍游记介绍"
              },
        ];            

                var record_img_page_ALL0=0;record_img_page_ALL1=1;record_img_page_ALL2=2;  //代表下标

                  $("#record_img_a1").html(record_imgList[record_img_page_ALL0].record_img);
                  $("#record_title1").html(record_imgList[record_img_page_ALL0].record_title);
                  $("#record_Main1").html(record_imgList[record_img_page_ALL0].record_main);

                  $("#record_img_b1").html(record_imgList[record_img_page_ALL1].record_img);
                  $("#record_title2").html(record_imgList[record_img_page_ALL1].record_title);
                  $("#record_Main2").html(record_imgList[record_img_page_ALL1].record_main);

                  $("#record_img_c1").html(record_imgList[record_img_page_ALL2].record_img);
                  $("#record_title3").html(record_imgList[record_img_page_ALL2].record_title);
                  $("#record_Main3").html(record_imgList[record_img_page_ALL2].record_main);

                $("#button3").click(function(){
                  /*
                    record_img_page_ALL0+=3;record_img_page_ALL1+=3;record_img_page_ALL2+=3;

                    if(record_img_page_ALL0==(record_imgList.length)) record_img_page_ALL0=0;
                    if(record_img_page_ALL0==(record_imgList.length+1)) record_img_page_ALL0=1;
                    if(record_img_page_ALL0==(record_imgList.length+2)) record_img_page_ALL0=2;
                    if(record_img_page_ALL1==(record_imgList.length)) record_img_page_ALL1=0;
                    if(record_img_page_ALL1==(record_imgList.length+1)) record_img_page_ALL1=1;
                    if(record_img_page_ALL1==(record_imgList.length+2)) record_img_page_ALL1=2;
                    if(record_img_page_ALL2==(record_imgList.length)) record_img_page_ALL2=0;
                    if(record_img_page_ALL2==(record_imgList.length+1)) record_img_page_ALL2=1;
                    if(record_img_page_ALL2==(record_imgList.length+2)) record_img_page_ALL2=2;

                  
                  $("#record_img_a1").html(record_imgList[record_img_page_ALL0].record_img);
                  $("#record_img_a1").html(record_imgList[record_img_page_ALL0].record_img);
                  $("#record_title1").html(record_imgList[record_img_page_ALL0].record_title);
                  $("#record_Main1").html(record_imgList[record_img_page_ALL0].record_main);

                  $("#record_img_b1").html(record_imgList[record_img_page_ALL1].record_img);
                  $("#record_title2").html(record_imgList[record_img_page_ALL1].record_title);
                  $("#record_Main2").html(record_imgList[record_img_page_ALL1].record_main);

                  $("#record_img_c1").html(record_imgList[record_img_page_ALL2].record_img);
                  $("#record_title3").html(record_imgList[record_img_page_ALL2].record_title);
                  $("#record_Main3").html(record_imgList[record_img_page_ALL2].record_main);
                  */
                    var n = $("#_n1").val();
                    var cn = Number($("#_cn1").val());
                    if(cn == 0){
                     // alert("已到最前页");
                     return false;
                    }
                    for(var i=0;i<n;i++){
                      $("#yj"+i).css("display","none");
                    }
                    cn = cn - 1;
                    $("#yj"+cn*3).removeAttr("style");
                    $("#yj"+(cn*3+1)).removeAttr("style");
                    $("#yj"+(cn*3+2)).removeAttr("style");
                    $("#_cn1").val(cn);
                });

                
                $("#button4").click(function(){
                    var n = $("#_n1").val();
                    var cn = Number($("#_cn1").val());
                    if((cn*3+2) == (n-1)){
                     // alert("已到最后页");
                     return false;
                    }
                    for(var i=0;i<n;i++){
                      $("#yj"+i).css("display","none");
                    }
                    cn = cn + 1;
                    $("#yj"+cn*3).removeAttr("style");
                    $("#yj"+(cn*3+1)).removeAttr("style");
                    $("#yj"+(cn*3+2)).removeAttr("style");
                    $("#_cn1").val(cn);
                  /*
                    record_img_page_ALL0-=3;record_img_page_ALL1-=3;record_img_page_ALL2-=3;

                    if(record_img_page_ALL0==(-1)) record_img_page_ALL0=(record_imgList.length-1);
                    if(record_img_page_ALL0==(-2)) record_img_page_ALL0=(record_imgList.length-2);
                    if(record_img_page_ALL0==(-3)) record_img_page_ALL0=(record_imgList.length-3);
                    if(record_img_page_ALL1==(-1)) record_img_page_ALL1=(record_imgList.length-1);
                    if(record_img_page_ALL1==(-2)) record_img_page_ALL1=(record_imgList.length-2);
                    if(record_img_page_ALL1==(-3)) record_img_page_ALL1=(record_imgList.length-3);
                    if(record_img_page_ALL2==(-1)) record_img_page_ALL2=(record_imgList.length-1);
                    if(record_img_page_ALL2==(-2)) record_img_page_ALL2=(record_imgList.length-2);
                    if(record_img_page_ALL2==(-3)) record_img_page_ALL2=(record_imgList.length-3);

                  
                  $("#record_img_a1").html(record_imgList[record_img_page_ALL0].record_img);
                  $("#record_img_a1").html(record_imgList[record_img_page_ALL0].record_img);
                  $("#record_title1").html(record_imgList[record_img_page_ALL0].record_title);
                  $("#record_Main1").html(record_imgList[record_img_page_ALL0].record_main);

                  $("#record_img_b1").html(record_imgList[record_img_page_ALL1].record_img);
                  $("#record_title2").html(record_imgList[record_img_page_ALL1].record_title);
                  $("#record_Main2").html(record_imgList[record_img_page_ALL1].record_main);

                  $("#record_img_c1").html(record_imgList[record_img_page_ALL2].record_img);
                  $("#record_title3").html(record_imgList[record_img_page_ALL2].record_title);
                  $("#record_Main3").html(record_imgList[record_img_page_ALL2].record_main);
 */
                });
                
                // ↑ 三张图片一起滚啊滚 record里 end

         var tmp = url.split("/");
          if(tmp[3]==""|tmp[3]=="#"){
         // 三张图片旋转滚动 target里 start
         var _w = $("#_p1").html();

         /*
    var target_imgList=[
              {
                target_img:"<img id='s1' class='target_img' src='images/CAB_lauder_lg.jpg' style='top:120px;left:400px;z-index:99'/>",
                target_title:"港口标题1",
                target_main:"1港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍"
              },
              {
                target_img:"<img id='s2' class='target_img' src='images/cc1.jpg' style='top:70px;left:485px;width:350px;height:250px;z-index:999' />",
                target_title:"港口标题2",
                target_main:"2港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍"
              },
              {
                target_img:"<img id='s3' class='target_img' src='images/cc2.jpg' style='top:120px;left:620px;z-index:99'/>",
                target_title:"港口标题3",
                target_main:"3港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍港口介绍"
              }
        ]; */
        var target_imgList = eval("(" + _w + ")");

                          var target_imgAll="";
                        for(var i=0;i<target_imgList.length;i++){
                         target_imgAll+="<img id='s"+(i+1)+"' class='target_img' src='"+target_imgList[i].target_img+"' style='top:70px;left:65px;z-index:99'/>";
                        }
                      $("#target_img_a").html(target_imgAll); 

                      var q=1,w=2,e=3,r=4;                  //表示target_img id的变量
                      var targetTitle=1,targetMain=1;      //表示target_title 和 target_main的变量

                      $("#button5").click(function(){       //左按钮
                        if(q>target_imgList.length) q=1;
                        if(w>target_imgList.length) w=1;
                        if(e>target_imgList.length) e=1;
                        if(r>target_imgList.length) r=1;
                       

                        $("#s"+q).animate({
                            width:"150px",
                            height:"75px",
                            left:"285px",
                            top:"70px"
                        });
                       $("#s"+q).css("z-index","0");

                       $("#s"+w).animate({
                            width:"300px",
                            height:"150px",
                            left:"65px",
                            top:"70px"
                        });
                       $("#s"+w).css("z-index","99");

                       $("#s"+e).animate({
                            width:"350px",
                            height:"250px",
                            left:"150px",
                            top:"20px"
                        });
                       $("#s"+e).css("z-index","999");

                       $("#s"+r).animate({
                            width:"300px",
                            height:"150px",
                            left:"285px",
                            top:"70px"
                        });
                       $("#s"+r).css("z-index","99");
                          
                          q+=1;w+=1;e+=1;r+=1;targetTitle+=1;targetMain+=1;

                        if(targetTitle>target_imgList.length-1) targetTitle=0;
                        if(targetMain>target_imgList.length-1) targetMain=0;

                        $("#target_title").html(target_imgList[targetTitle].target_title); //表示target_title数据
                        $("#target_Main").html(target_imgList[targetMain].target_main);    //表示target_main数据
                        $("#target_Url").attr("src",target_imgList[targetMain].target_Url); 
                      }); 

                    
                      $("#button6").click(function(){                      //右按钮

                    q-=1;w-=1;e-=1;r-=1;targetTitle-=1;targetMain-=1;
                        if(q<1) q=target_imgList.length;
                        if(w<1) w=target_imgList.length;
                        if(e<1) e=target_imgList.length;
                        if(r<1) r=target_imgList.length;
                        if(targetTitle<0) targetTitle=target_imgList.length-1;
                        if(targetMain<0) targetMain=target_imgList.length-1;

                        $("#s"+q).animate({ 
                             width:"300px",
                            height:"150px",
                            left:"65px",
                            top:"70px"
                        });
                       $("#s"+q).css("z-index","99");

                       $("#s"+w).animate({    
                             width:"350px",
                            height:"250px",
                            left:"150px",
                            top:"20px"  
                        });
                       $("#s"+w).css("z-index","999");

                       $("#s"+e).animate({ 
                            width:"300px",
                            height:"150px",
                            left:"285px",
                            top:"70px"
                        });
                       $("#s"+e).css("z-index","99");

                       $("#s"+r).animate({
                            width:"150px",
                            height:"75px",
                            left:"285px",
                            top:"70px"
                        });
                       $("#s"+r).css("z-index","0");
                          
                        $("#target_title").html(target_imgList[targetTitle].target_title); //表示target_title数据
                        $("#target_Main").html(target_imgList[targetMain].target_main);    //表示target_main数据
                        $("#target_Url").attr("href",target_imgList[targetMain].target_Url);
                      }); 

                 // ↑ 三张图片旋转滚动 target里 结束

               }
          
//整体 开始
                 //  邮轮图集循环滚动  开始

                 var cruiseImgList=[
                   {
                    cruiseImg:"<img src='images/theme_1.jpg' id='xx1'/>"
                   },
                   {
                    cruiseImg:"<img src='images/theme_2.jpg' id='xx2'/>"
                   },
                   {
                    cruiseImg:"<img src='images/theme_3.jpg' id='xx3'/>"
                   },
                   {
                    cruiseImg:"<img src='images/theme_4.jpg' id='xx4'/>"
                   },
                   {
                    cruiseImg:"<img src='images/theme_5.jpg' id='xx5'/>"
                   }
                 ];
                      
                      var cruiseImgAll="";
                for(var vv=0;vv<cruiseImgList.length;vv++){
                     cruiseImgAll+=cruiseImgList[vv].cruiseImg;
                }
               
                  $("#cruiseImg").html(cruiseImgAll);

                  $("#cruiseImg").children().css({'opacity':'0',width:'864px',height:'419px',position:'absolute',left:'150px'});
                   $("#cruiseImg").children('#xx1').css({'opacity':'0.9',left:'0px'});
                    var cruiseImgListNumber1=1;
                    var cruiseImgListNumber2=2;
             
                    setInterval(function(){   
                      if(cruiseImgListNumber1>$("#cruiseImg").children().length){
                         cruiseImgListNumber1=1;
                      }
                      if(cruiseImgListNumber2>$("#cruiseImg").children().length){
                         cruiseImgListNumber2=1;
                      }
                         

                     $('#xx'+cruiseImgListNumber1).animate({
                        left:'-865px'
                     },1000);
                      $('#xx'+cruiseImgListNumber1).animate({
                        opacity:'0'
                     },100);
                     $('#xx'+cruiseImgListNumber1).animate({
                        //left:'1110px'
                          left:'0px'
                     },100);
                       $('#xx'+cruiseImgListNumber2).animate({
                        left:'1100px'
                     },100); 
                      $('#xx'+cruiseImgListNumber2).animate({
                         opacity:'1'
                     },100); 
                     $('#xx'+cruiseImgListNumber2).animate({
                        left:'0px'
                     },1000); 
                      
                      cruiseImgListNumber1+=1;
                      cruiseImgListNumber2+=1;
                    },7000);

                   //  邮轮图集循环滚动  结束

                   //  邮轮图集按钮滚动  开始
                       
                       $("#you_button").click(function(){
                           
                           if(cruiseImgListNumber1>$("#cruiseImg").children().length){
                              cruiseImgListNumber1=1;
                           }
                           if(cruiseImgListNumber2>$("#cruiseImg").children().length){
                           cruiseImgListNumber2=1;
                           }
                           $('#xx'+cruiseImgListNumber1).animate({
                                 left:'-865px'
                           },1000);
                           $('#xx'+cruiseImgListNumber1).animate({
                                 opacity:'0'
                           },100);
                           $('#xx'+cruiseImgListNumber1).animate({
                              //left:'1110px'
                                 left:'0px'
                           },100);
                           $('#xx'+cruiseImgListNumber2).animate({
                                  left:'1100px'
                           },100); 
                           $('#xx'+cruiseImgListNumber2).animate({
                                  opacity:'1'
                           },100); 
                           $('#xx'+cruiseImgListNumber2).animate({
                                  left:'0px'
                           },1000); 
                                  cruiseImgListNumber1+=1;
                                  cruiseImgListNumber2+=1;
                          });

                         $("#zuo_button").click(function(){
                               cruiseImgListNumber1-=1;
                               cruiseImgListNumber2-=1;
                           if(cruiseImgListNumber1<1){
                              cruiseImgListNumber1=$("#cruiseImg").children().length;
                           }
                           if(cruiseImgListNumber2<1){
                              cruiseImgListNumber2=$("#cruiseImg").children().length;
                           }

                           $('#xx'+cruiseImgListNumber2).animate({
                                  left:'1100px'
                           },1000); 
                           $('#xx'+cruiseImgListNumber2).animate({
                                  opacity:'0'
                           },100); 
                           $('#xx'+cruiseImgListNumber2).animate({
                                  left:'0px'
                           },100); 
                             $('#xx'+cruiseImgListNumber1).animate({
                                   left:'-865px'
                           },100);
                           $('#xx'+cruiseImgListNumber1).animate({
                                   opacity:'1'
                           },100);
                           $('#xx'+cruiseImgListNumber1).animate({
                                   left:'0px'
                           },1000);
                             
                        });
                   //  邮轮图按钮环滚动  结束
//整体 结束

                          //alert($("#content1").);
                         //var content11=document.getElementById("content11");
                         //alert(content11.offsetHeight);
                         //var aa=window.getComputedStyle(content1,null);
                        // alert(aa.height);
                        // alert($("#content11").css("height"));
                         //alert($("#content1").attr("height"));


	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    /*
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
            if(indexd ==len){
                window.location.reload();
            }
			showPics(index,indexd,lengthd,sWidth);
			index++;
            indexd++;
			if(index == lengthd) {index = 0;}
		},5000); //此5000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	*/


	
	$(".btn").css("left",(winlen)/2-50);
	
	
	if(url.indexOf("destination")>0){
				menulist = "地中海;欧洲;加勒比海;阿拉斯加;澳洲新西兰;日韩;东南亚;台湾;夏威夷;更多";
				var sid = "hq";
				parentid = "destination";
				var tmp = menulist.split(";");
				txt = "<div style='margin:0 auto;width:864px;background-image:url(/images/head_2.png);'><table height='25' border='0'><tr>";
				for(var i=0;i<tmp.length;i++){
                    if(i == tmp.length-1){
                        txt = txt + "<td class='menu_2' onclick='window.location=\""+parentid+"\"'>"+tmp[i]+"</td>";
                    }else{
                        txt = txt + "<td class='menu_2' onclick='clickmenu_2(\""+parentid+"\",\""+sid+(i+1)+"\")'>"+tmp[i]+"</td>";
                    }

				}
				txt = txt + "</tr></table></div>";
				$("#menu").html(txt);
				$("#menu").fadeIn();
	}else if(url.indexOf("curisecompany")>0|url.indexOf("curisecship")>0){
        menulist = "皇家加勒比;歌诗达邮轮;丽星邮轮;公主邮轮;NCL挪威邮轮;MSC地中海;水晶邮轮;更多";
        var sid = "V0";
        parentid = "curisecompany";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:864px;background-image:url(/images/head_2.png);'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
            if(i == tmp.length-1){
                txt = txt + "<td class='menu_2' onclick='window.location=\""+parentid+"\"'>"+tmp[i]+"</td>";
            }else{
                txt = txt + "<td class='menu_2' onclick='clickmenu_2(\""+parentid+"\",\""+sid+(i+1)+"\")'>"+tmp[i]+"</td>";
            }

        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
    }else if(url.indexOf("share")>0){
        menulist = "邮轮入门;邮轮资讯;邮轮游记;邮轮视频";
        var sid = "sha";
        parentid = "share";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:864px;background-image:url(/images/head_2.png);'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
            for(var i=0;i<tmp.length;i++){
                txt = txt + "<td class='menu_2' onclick='window.location=\"sharetheme_sec?id=S000"+(i+1)+"\"'>"+tmp[i]+"</td>";
            }
        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
    }else if(url.indexOf("theme")>0){
        menulist = "家庭邮轮;老年邮轮;奢华邮轮;会议邮轮;探险邮轮;环球邮轮;更多";
        var sid = "the";
        parentid = "theme";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:880px;background-image:url(/images/head_2.png);'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
            if(i == tmp.length-1){
                txt = txt + "<td class='menu_2' onclick='window.location=\""+parentid+"\"'>"+tmp[i]+"</td>";
            }else{
                txt = txt + "<td class='menu_2' onclick='window.location=\"theme_sec?id=T000"+(i+1)+"\"'>"+tmp[i]+"</td>";
            }
        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
    }else if(url.indexOf("help")>0){
        menulist = "关于我们;如何预订;常见问题;联系我们";
        var sid = "hel";
        parentid = "help";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:864px;background-image:url(/images/head_2.png);'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
            if(i==0){
                txt = txt + "<td class='menu_2' onclick='window.location=\"help?p=a1\"'>"+tmp[i]+"</td>";
            }else if(i==1){
                txt = txt + "<td class='menu_2' onclick='window.location=\"help?p=a2\"'>"+tmp[i]+"</td>";
            }else if(i==2){
                txt = txt + "<td class='menu_2' onclick='window.location=\"help?p=a3\"'>"+tmp[i]+"</td>";
            }else if(i==3){
                txt = txt + "<td class='menu_2' onclick='window.location=\"help?p=a4\"'>"+tmp[i]+"</td>";
            }

        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
    }

    if($(".myp1").html()){
        var ht =  $(".myp1").html();
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        ht = ht.replace(/@/g,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;");

        $(".myp1").html(ht);
    }

    if($(".myp2").html()){
        var ht =  $(".myp2").html();
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        ht = ht.replace(/@/g,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;");

        $(".myp2").html(ht);
    }

    for(var i=0;i<500;i++){
        if($("#yjS000"+i).html()){
            var ht =  $("#yjS000"+i).html();
            ht = ht.replace(/&lt;/g,"<");
            ht = ht.replace(/&gt;/g,">");
            $("#yjS000"+i).html(ht);
        }
    }


    for(var k=0;k<3;k++){
    if($("#txtText_"+k).html()){
        var ht =  $("#txtText_"+k).html();
        //alert(ht);
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        $("#txtText_"+k).html(ht);
    }
    }



    if(url.indexOf("curiseship")>0){
        $(".preNext").css("top",150);
        $(".btn").css("left",275).css("top",15);
    }else if(url.indexOf("curisecship_sec")>0){
        $(".preNext").css("top",140);
        $(".btn").css("left",400);
    }

    for(var i=1;i<5;i++){
        if(url.indexOf("a"+i)>0){
            changetab(i);
        }
    }

    if($("#info").val()){
        if($("#info").val()!="null" && $("#info").val()!="undefined"){
            alert($("#info").val());
        }
    }
    if($("#infor").val()){
        if($("#infor").val()!="null" && $("#infor").val()!="undefined"){
            alert($("#infor").val());
            window.parent.closeAndReloadWin();
        }
    }
    if($("#userid").val()){
        if($("#userid").val()=="null" || $("#userid").val()=="undefined"){
            alert("用户身份验证失败，请重新登录！");
            window.location = "/";
        }
    }



    var ua=navigator.userAgent;       //兼容 谷歌28.XXXX 版本  微信图标
    //var hh="Chrome/28.0.1500.72";
    if(/Chrome\/28(\S+)/.test(ua))
    {
       var divWX=document.getElementById("divWX");
       divWX.style.left="605px";
       
    }

    $(".input_box").keyup(function(){               //想输入非数字 想都别想版
       if(!RegExp(/^[0-9]*$/g).test($(this).val())){
          $(this).val('');
       }
    });
    $(".input_box").change(function(){
       if(!RegExp(/^[0-9]*$/g).test($(this).val())){
          $(this).val('');
       }
    });
     $(".input_box").mouseout(function(){
       if(!RegExp(/^[0-9]*$/g).test($(this).val())){
          $(this).val('');
       }
    });
     $("#next").mouseenter(function(){
       if(!RegExp(/^[0-9]*$/g).test($(".input_box").val())){
          $(".input_box").val('');
       }
    });                                        //想输入非数字 想都别想版结束      



              
   

    $(".minus").click(function(){               //加减按钮改良版
        var par=parseInt($(this).next().val())-1;
        if(par>0){
            $(this).next().val(par);
            $(this).attr("src","images/style/minus.png");
            $(".plus").attr("src","images/style/plus.png");
         }else if(par==0){
             $(this).next().val(par);
             $(this).attr("src","images/style/minus_0.png");
             $(".plus").attr("src","images/style/plus.png");
         }
    });

     $(".plus").click(function(){
        var par=parseInt($(this).prev().val())+1;
        if(par<4){
             $(this).prev().val(par);
             $(this).attr("src","images/style/plus.png");
             $(".minus").attr("src","images/style/minus.png");
        }else if(par==4){
            $(this).prev().val(par);
            $(this).attr("src","images/style/plus_0.png");
             $(".minus").attr("src","images/style/minus.png");
        }
        
    });                                        //加减按钮改良版 结束


  // if($(document).scrollTop()>100){
  //   alert("aa");
  // }
  //window.scroll(0,200);
  //alert($(document).scrollTop());
     //  window.onload=function(){
    // window.scroll(0,100);
    // }

  // addEvent("document");
 // window.scroll(0,document.body.scrollHeight);alert(document.body.scrollHeight);


  addEvent(document,'mousewheel',function(evt){    //鼠标滚轮事件 开始
      if(getwheel()>100){
          $(".totop").css("display","block");
      }else if($(document).scrollTop()<100){
          $(".totop").css("display","none");
      }
  });
  addEvent(document,'BOMMouseScroll',function(evt){   
      if(getwheel()>100){
          $(".totop").css("display","block");
      }else if($(document).scrollTop()<100){
          $(".totop").css("display","none");
      }
  });                                             //鼠标滚轮事件 结束

  var tmp = url.split("/");
  if(tmp[3]==""|tmp[3]=="#"){
    $("#button5").click();
  }

  //限时特价 早定优惠 特色航次  开始
  $("#home_button1").click(function(){   
     $(this).css({'color':'#FFFFFF','background':'#853e63','fontWeight':'none'});
     $("#home_button2,#home_button3,#home_button4").css({'color':'black','background':'#F3F3F3','fontWeight':'bold'});
     $("#home1").show();
     $("#home2,#home3,#home4").hide();
   });

  $("#home_button2").click(function(){   
     $(this).css({'color':'#FFFFFF','background':'#853e63','fontWeight':'none'});
     $("#home_button1,#home_button3,#home_button4").css({'color':'black','background':'#F3F3F3','fontWeight':'bold'});
     $("#home2").show();
     $("#home1,#home3,#home4").hide();
   });

  $("#home_button3").click(function(){   
     $(this).css({'color':'#FFFFFF','background':'#853e63','fontWeight':'none'});
     $("#home_button1,#home_button2,#home_button4").css({'color':'black','background':'#F3F3F3','fontWeight':'bold'});
     $("#home3").show();
     $("#home1,#home2,#home4").hide();
   });  

   $("#home_button4").click(function(){   
     $(this).css({'color':'#FFFFFF','background':'#853e63','fontWeight':'none'});
     $("#home_button1,#home_button2,#home_button3").css({'color':'black','background':'#F3F3F3','fontWeight':'bold'});
     $("#home4").show();
     $("#home1,#home2,#home3").hide();
   });                 
  //限时特价 早定优惠 特色航次  结束

  
//var aa=HQuery('.height_img');
   //alert(aa);
});  //JQ结束

   function HQuery(tags){
     return new Base(tags);
   }
   function Base(tags){
     this.elements=[];
     if(typeof tags=='string'){
         switch(tags.charAt(0)){
           case '#':
           case '.':
              this.elements=this.getClass(tags.substring(1));
              break;
           default:
         }
     }else{

     }
   }

   Base.prototype.getClass=function(claName,parentNode){
        var node=null;
        var childrenNode=[];
       if(parentNode!=undefined){
           node=parentNode;
       }else{
         node=document;
       }
        var tag=node.getElementsByTagName('*');
       for(var i=0;i<tag.length;i++){
        if(tag[i].className==claName){
           childrenNode.push(tag[i]);
        }
       }
       return childrenNode;
   }

  Base.prototype.css=function(attr,value){                   //设置css
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==1){                           //获取css
      if(typeof window.getComputedStyle!='undefined'){
        return window.getComputedStyle(this.elements[i],null)[attr];
      }else if(typeof this.elements[i].currentStyle!=='undefined'){
         return this.elements[i].currentStyle[attr];
      }
    }else{
      this.elements[i].style[attr]=value;                
    }
  }
  return this;
}


//显示图片函数，根据接收的index值显示相应的内容
function showPics(index,indexd,lengthd,sWidth) { //普通切换
    //alert(Math.floor(indexd/lengthd));
    setCookie("indexd",Math.floor(indexd/lengthd));
    if($("#namelist").html()){
        //setCookie("indexd",indexd);
        var txt_dzh_cn = $("#namelist").html();
        var txt_dzh = $("#ennamelist").html();
        var tmp = txt_dzh.split(";");
        var tmp1 = txt_dzh_cn.split(";");
        //$("#pname").html(tmp1[index]+"<br/><div class='pname_en'>"+tmp[index]+"</div>");
    }
    var nowLeft = -indexd*sWidth; //根据index值计算ul元素的left值
    $("#focus ul").stop(true,false).animate({"left":nowLeft},1500); //通过animate()调整ul元素滚动到计算出的position
    //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
    $("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},1500); //为当前的按钮切换到选中的效果
}

function showPics1(index,indexd,lengthd,sWidth) { //普通切换
    //alert(Math.floor(indexd/lengthd));
    setCookie("indexd",Math.floor(indexd/lengthd));
    setCookie("label",1);
    if($("#namelist").html()){
        //setCookie("indexd",indexd);
        var txt_dzh_cn = $("#namelist").html();
        var txt_dzh = $("#ennamelist").html();
        var tmp = txt_dzh.split(";");
        var tmp1 = txt_dzh_cn.split(";");
        //$("#pname").html(tmp1[index]+"<br/><div class='pname_en'>"+tmp[index]+"</div>");
    }
    var nowLeft = -indexd*sWidth; //根据index值计算ul元素的left值
    $("#focus ul").stop(true,false).animate({"left":nowLeft},100); //通过animate()调整ul元素滚动到计算出的position
    //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
    $("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},1500); //为当前的按钮切换到选中的效果
}

function clickmenu_2(parent,id) {
	window.location = "loading?page="+parent+"/"+id;
}

function changetab(i){
	if(i=="1"){
		$("#tabl1").attr("class","tb1");$("#tab1").css("display","inline");
		$("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
		$("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
	}else if(i=="2"){
		$("#tabl2").attr("class","tb1");$("#tab2").css("display","inline");
		$("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
		$("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
        
             var next=document.getElementById("next");
             var trueConfirm=document.getElementById("trueConfirm");
             var falseConfirm=document.getElementById("falseConfirm");
             var textReturn=document.getElementById("textReturn");
             var booking_first=document.getElementById("booking_first");
             var booking_second=document.getElementById("booking_second");
             var booking_third=document.getElementById("booking_third");
             addEvent(next,"click",function(){                    //舱房预定跳转第 1 2 3步  开始
                  booking_first.style.display="none";
                  booking_second.style.display="block";

                  booking_third.style.display="none";
             });
             addEvent(trueConfirm,"click",function(){
                  booking_first.style.display="none";
                  booking_second.style.display="none";
                  booking_third.style.display="block";
                 var content1=document.getElementById("content1"); //左右对齐
                 var content2=document.getElementById("content2");
                if(content1.offsetHeight>content2.offsetHeight){         
                   content2.style.height=content1.offsetHeight-20+"px";
                }else if(content1.offsetHeight<content2.offsetHeight){
                   content1.style.height=content2.offsetHeight-20+"px";
                }
            });
             addEvent(falseConfirm,"click",function(){
                  booking_first.style.display="block";
                  booking_second.style.display="none";
                  booking_third.style.display="none";
             });  
               addEvent(textReturn,"click",function(){
                  booking_first.style.display="block";
                  booking_second.style.display="none";
                  booking_third.style.display="none";
             });                                                                  
             //舱房预定跳转第 1 2 3步 结束
                         
	}else if(i=="3"){
		$("#tabl3").attr("class","tb1");$("#tab3").css("display","inline");
		$("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
		$("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
	}else if(i=="4"){
        $("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
        $("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
        $("#tabl4").attr("class","tb1");$("#tab4").css("display","inline");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
    }else if(i=="5"){
        $("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
        $("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
        $("#tabl5").attr("class","tb1");$("#tab5").css("display","inline");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
    }else if(i=="6"){
        $("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
        $("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl6").attr("class","tb1");$("#tab6").css("display","inline");
    }
}

function CenterImgPlay() {
    this.list = $(".imgbox").children(":first").children();
    this.indexs = [];
    this.length = this.list.length;
    //图片显示时间
    this.timer = 3000;
    this.showTitle = $(".title");

    var index = 0, self = this, pre = 0, handid, isPlay = false, isPagerClick = false;

    this.Start = function () {
        this.Init();
        //计时器，用于定时轮播图片
        handid = setInterval(self.Play, this.timer);
    };
    //初始化
    this.Init = function () {
        var o = $(".pager ul li"), _i;

        for (var i = o.length - 1, n = 0; i >= 0; i--, n++) {
            this.indexs[n] = o.eq(i).click(self.PagerClick);
        }
    };
    this.Play = function () {
        isPlay = true;
        index++;
        if (index == self.length) {
            index = 0;
        }
        //先淡出，在回调函数中执行下一张淡入
        self.list.eq(pre).fadeOut(300, "linear", function () {
            var info = self.list.eq(index).fadeIn(500, "linear", function () {
                isPlay = false;
                if (isPagerClick) { handid = setInterval(self.Play, self.timer); isPagerClick = false; }
            }).attr("title");
            //显示标题
            self.showTitle.text(info);
            //图片序号背景更换
            self.indexs[index].css("background-color", "#FF70Ad");
            self.indexs[pre].css("background-color", "#6f4f67");

            pre = index;
        });
    };
    //图片序号点击
    this.PagerClick = function () {
        if (isPlay) { return; }
        isPagerClick = true;

        clearInterval(handid);

        var oPager = $(this), i = parseInt(oPager.text()) - 1;

        if (i != pre) {
            index = i - 1;
            self.Play();
        }
    };
};

function changeprice(p1,p2,p3,p4,p5,p6){
    //changetab('2');
    for(var i=0;i<4;i++){
        $("#un"+i).html(p6);
        $("#unt"+i).html("/人起");
    }

    $("#jg0").html(p1);
    $("#jg1").html(p2);
    $("#jg2").html(p3);
    $("#jg3").html(p4);
    if(p1=="99999" || p1=="null" || p1=="0"){
        $("#jg0").html("电询");
        $("#un0").html("");
        $("#unt0").html("");
    }
    if(p2=="99999" || p2=="null" || p2=="0"){
        $("#jg1").html("电询");
        $("#un1").html("");
        $("#unt1").html("");
    }
    if(p3=="99999" || p3=="null" || p3=="0"){
        $("#jg2").html("电询");
        $("#un2").html("");
        $("#unt2").html("");
    }
    if(p4=="99999" || p4=="null" || p4=="0"){
        $("#jg3").html("电询");
        $("#un3").html("");
        $("#unt3").html("");
    }
    if(p1=="-1"){
        $("#jg0").html("售罄");
        $("#un0").html("");
        $("#unt0").html("");
    }
    if(p2=="-1"){
        $("#jg1").html("售罄");
        $("#un1").html("");
        $("#unt1").html("");
    }
    if(p3=="-1"){
        $("#jg2").html("售罄");
        $("#un2").html("");
        $("#unt2").html("");
    }
    if(p4=="-1"){
        $("#jg3").html("售罄");
        $("#un3").html("");
        $("#unt3").html("");
    }
    for(var i=0;i<100;i++){
        if($("#ppp"+i)){
            $("#ppp"+i).css("background-image","url('images/datebg_1.png')");
        }
    }
    $("#ppp"+p5).css("background-image","url('images/datebg_2.png')");
}

function pageDown(){
    var l1 = Number($("#divlen").val());
    var nowpage = Number($("#nowpage").val());
    nowpage = nowpage + 5;
    if(nowpage>=l1){
        $("#jianpd").attr("src","images/right_1.png");
        //alert("已到最前页!");
        return false;
    }
    $("#nowpage").val(nowpage);
    for(var i=0;i<100;i++){
        if($("#ppp"+i)){
            if(i>nowpage-1 && i<nowpage+5){
                $("#ppp"+i).css("display","inline-block");
            }else{
                $("#ppp"+i).css("display","none");
            }
        }
    }

    $("#jianpl").attr("src","images/left_2.png");
    $("#jianpd").attr("src","images/right_2.png");

    if(nowpage+5>=l1){
        $("#jianpd").attr("src","images/right_1.png");
    }
}

function pageUp(){
    var nowpage = Number($("#nowpage").val());
    $("#jianpl").attr("src","images/left_2.png");
    $("#jianpd").attr("src","images/right_2.png");
    var l1 = Number($("#divlen").val());
    if(nowpage == 0){
        $("#jianpl").attr("src","images/left_1.png");
        //alert("已到最前页!");
        if(nowpage+5>=l1){
            $("#jianpd").attr("src","images/right_1.png");
        }
        return false;
    }

    if(nowpage+5>=l1){
        $("#jianpd").attr("src","images/right_1.png");
    }
    nowpage = nowpage - 5;
    if(nowpage == 0){
        $("#jianpl").attr("src","images/left_1.png");
    }
    $("#nowpage").val(nowpage);
    for(var i=0;i<100;i++){
        if($("#ppp"+i)){
            if(i>nowpage-1 && i<nowpage+5){
                $("#ppp"+i).css("display","inline-block");
            }else{
                $("#ppp"+i).css("display","none");
            }
        }
    }

}

function loadNextsix(){
    var nowpage = Number($("#nowpage").val());
    nowpage = nowpage + 6;
    for(var i=0;i<nowpage+6;i++){
        if($("#tableid"+i)){
            $("#tableid"+i).css("display","inline");
        }
    }
    for(var i=nowpage+6;i<1000;i++){
        if($("#tableid"+i)){
            $("#tableid"+i).css("display","none");
        }
    }
    $("#nowpage").val(nowpage);
    var total1 = Number($("#pronum1").val());
    if(nowpage+6>total1){
         $("#loadings").css("display","none");
    }
}

function jt(i){
    if($("#jt"+i).attr("src")== "/images/04up.gif"){
        $("#jtb"+i).css("display","none");
        $("#jt"+i).attr("src","/images/03down.gif");
    }else{
        $("#jtb"+i).css("display","inline");
        $("#jt"+i).attr("src","/images/04up.gif");
        for(var j=0;j<200;j++){
            if(j!=i){
                $("#jt"+j).attr("src","/images/02.png");
                $("#jtb"+j).css("display","none");
            }
        }
    }

}

function submitYD(){
    if($("input[name='input1']").val()==""){
        alert('姓名不能为空！');return false;
    }
    if($("input[name='input2']").val()==""){
        alert('联系电话不能为空！');return false;
    }
    if($("input[name='input3']").val()==""){
        alert('E-Mail不能为空！');return false;
    }
    if($("textarea[name='input4']").val()==""){
        alert('内容不能为空！');return false;
    }
    alert('信息递交成功，我们会尽快与您联系！');
    document.forms[0].submit();
}

function login(){
    if($("#name").val()==""|$("#pwd").val()==""){
        alert("请填写用户名及密码！");
        return false;
    }
    document.forms[0].submit();
}

function listpageDown(){
    var num1 = Number(document.all.numStart.value);
    num1 = num1+6;
    if(num1>Number($("#pronum1").val())){
        //alert("没有下一页，已经到底！");return false;
    }
    document.all.numStart.value = num1;
    document.forms[0].submit();
}

function listpageUp(){
    var num1 = Number(document.all.numStart.value);
    if(num1 == 1){
        //alert("没有上一页，已经到头！");return false;
    }
    num1 = num1-6;
    document.all.numStart.value = num1;
    document.forms[0].submit();
}

function retferto(){
    var num1 = Number($("#numNo1").val());
    num1 = (num1-1)*6;
    document.all.numStart.value = num1;
    document.forms[0].submit();
}

function addEvent(obj,type,fn){             
  if(typeof obj.addEventListener!='undefined'){
     obj.addEventListener(type,fn,false);
  }else{
     if(!obj.events)obj.events={};
     if(!obj.events[type])obj.events[type]=[];
   obj.events[type][addEvent.ID++]=fn;
   obj['on'+type]=function(){
      for(var i in obj.events[type]){
           obj.events[type][i].call(this,e);
    }
   };
  }
}
addEvent.ID=0;


function preventDefault(evt){      //禁用方法
    var e=evt || window.event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue=false;
    }
}

function getcharCode(evt){       //字符键
    var e=evt || window.event;
    if(typeof e.charCode=="number"){
    return e.charCode;
    }else{
        return e.keyCode;
    }
}

function getwheel(evt){      //滚轮事件计算
  var e=evt || window.event;
  if(e.wheelDelta){
   return -e.wheelDelta;
  }else if(e.detail){
    return e.detail*30;
  }
}
 