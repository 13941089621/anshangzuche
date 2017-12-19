  //获取价格 弹窗   获取值 
    $(function() {
        var goods = [];
        var mbc = "img/mbc.png";
        var arf = "img/arf.png"
        //	初始化数据  
        $(".middle").each(function(i, v) {
            var n1 = 0;
            var n2 = 1;
            if(parseInt($($(v).find(".type")[0]).html()) == 1) {
                n1 = 1;
                n2 = 0;
            }
           
//          console.log($(v).find(".type"), n1, n2)
            var g = {
                name: $(v).find(".span_p").html(),
                count: 0,
                price: 0,
                id: parseInt($(v).find(".mid").html()),
                goods: [{
                    price: parseInt($($(v).find(".p1")[n1]).html()),
                    cid: parseInt($($(v).find(".pid")[n1]).html()),
                    type: parseInt($($(v).find(".type")[n1]).html()),             
//                    name: $($(v).find(".name1")[n1]).html(),
					img: parseInt($($(v).find(".type")[n1]).html()) == 0 ? arf : mbc,
                    
//             		img :$($(v).find(".imga")[n1]).attr("src","img/arf.png"),
                    name: parseInt($($(v).find(".type")[n1]).html()) == 0 ? "7座 埃尔法" : "10座 海狮商务车",
                    count: 0
                },
                    {
                        price: parseInt($($(v).find(".p1")[n2]).html()),                   
                        cid: parseInt($($(v).find(".pid")[n2]).html()),
                        type: parseInt($($(v).find(".type")[n2]).html()),
                        
//                      img :$($(v).find(".imga")[n2]).attr("background","img/arf.png"),
						img: parseInt($($(v).find(".type")[n2]).html()) == 0 ? arf : mbc,
//                        name: $($(v).find(".name1")[n2]).html(),
                        name: parseInt($($(v).find(".type")[n2]).html()) == 0 ? "7座 埃尔法" : "10座 海狮商务车",
                        count: 0
                    }
                ]

            }
//          console.log(g.goods)
            //goods储存数据
            goods.push(g)
        })


        var num = 0;
        var price_num = 0;

        init();
        //  初始化函数
        function init() {
            for(var i = 0; i < goods.length; i++) {
                var middle = $(".middle")[i];
                $(middle).find(".span_p").html(goods[i].name);
                $(middle).find(".shu").html(0);
                $(middle).attr("index", i);
                goods[i].count = 0;
                goods[i].goods[0].count = 0;
                goods[i].goods[1].count = 0;
            }

            num = 0;
            price_num = 0;
            $(".jian").hide();
            $(".elastic_bor").html("")
            $(".button_right").addClass("button_disabled");
            $(".car").addClass("car_img_active");
            $(".number_index").html(num);
            $(".price_num").html(price_num);
            $(".price_num").html(price_num);
        }

//      var pic = "img/arf.png";
        //  点击商品后
        $(".btn_jia").on("click", function() {        
            var parent = $(this).parents(".middle");
            var index = parent.attr("index");
            var good = goods[index].goods;
            //弹窗弹出并设置价格等
            $(".none").show().attr("index", index)
            $(".price_money1").html(good[0].price)
            $(".car_amount1").html(good[0].price)
            $(".car_amount2").html(good[1].price)
            $(".car_span1").html(good[0].name)
            $(".car_span2").html(good[1].name)
            $(".place_name").html(goods[index].name)

            $(".imga").attr("src", good[0].img)
            $(".imgb").attr("src", good[1].img)
        })
        //点击动态添加里的       加+++
        $(".elastic_bor").on("click", ".btn_jia", function() {
            var parent = $(this).parents(".button_middle");
            var index = parent.attr("index");
            var subIndex = parent.attr("sub_index");
            var count = ++goods[index].goods[subIndex].count;
            var sumCount = ++goods[index].count;
            var good = goods[index].goods[subIndex];
            num++;
            $(".number_index").html(num);
            $(".button_right").removeClass("button_disabled");
            $(".car").removeClass("car_img_active");

            parent.find(".btn_right_m").html(good.count * good.price);

            price_num += goods[index].goods[subIndex].price;
            $(".price_num").html(price_num);

            parent.find(".shu").html(count);
            parent.find(".count_id").val(count);
            $(".middle[index=" + index + "]").find(".shu").html(sumCount);
        })
        
        //点击动态添加里的     点击减----
        $(".elastic_bor").on("click", ".btn_jian", function() {
            var parent = $(this).parents(".button_middle");
            var index = parent.attr("index");
            var subIndex = parent.attr("sub_index");
            var good = goods[index].goods[subIndex];

            num--;
            $(".number_index").html(num);

            price_num -= goods[index].goods[subIndex].price;
            $(".price_num").html(price_num);

            if(num == 0) {
                $(".button_right").addClass("button_disabled");
                $(".car").addClass("car_img_active");

            }
            var count = --goods[index].goods[subIndex].count;
            var sumCount = --goods[index].count;

            parent.find(".btn_right_m").html(good.count * good.price);
            var middle = $(".middle[index=" + index + "]");
            if(count < 1) {
                parent.remove();
            }
            if(sumCount < 1) {
                middle.find(".jian").hide();
            }
            parent.find(".shu").html(count);
            parent.find(".count_id").val(count);
            middle.find(".shu").html(sumCount);
        })

        //弹窗 选择车型号
        $(".car_click").on("click", function() {
            $(".car_click").removeClass("car_active");
            $(this).addClass("car_active");
            var index = $(this).parents(".none").attr("index");
            $(".price_money1").html(goods[index].goods[$(".car_click").index($(".car_active"))].price)

        })
        //点击关闭
        $(".btn_jian").on("click", function() {
            $(".bottom_pop").show()
            $(".tan_none").show()
        })
        //点击关闭
        $(".close").on("click", function() {
            $(".none").hide()
        })
        //弹窗  点击确定
        $(".popup_btn").on("click", function() {
            var subIndex = $(".car_click").index($(".car_active"));
            var index = $(this).parents(".none").attr("index");
            var parent = $(".middle[index='" + index + "']");
            var good = goods[index].goods;
            var count = ++good[subIndex].count;
            var sumCount = ++goods[index].count;

            num++;
            $(parent).find(".span_j").html(
                '<span style="margin-right: 40px;">' + "¥" + good[0].price + "（辆）" +
                '</span>' +
                '<span>' + "¥" + good[1].price + "（辆）" +
                '</span>'
            )

            $(".number_index").html(num);
            $(".button_right").removeClass("button_disabled");
            $(".car").removeClass("car_img_active");

            price_num += good[subIndex].price;
            $(".price_num").html(price_num);

            var button_middle = $(".button_middle[index='" + index + "'][sub_index='" + subIndex + "']");

            if(button_middle.length == 0) {
                var aIndex = index.toString() + subIndex.toString();
                parent.find(".jian").show();
                //动态添加  
                var appendHtml = '<div class="button_middle" sub_index="' + subIndex + '" index="' +
                    index + '">' +
                    '<div class="button_one">' +
                    '<div class="button_one_left">' +
                    '<div class="button_span_p">' +
                    goods[index].name +
                    '</div>' +
                    '<div class="button_span_j span_color">' +
                    '<span style="margin-right:20px">' +
                    good[subIndex].name +
                    '</span>' +
                    '¥' +
                    good[subIndex].price +
                    '（辆）</div>' +
                    '</div>' +
                    '<div class="button_one_right">' +
                    '<div class="jian" style="display: block">' +
                    '<div class="btn_jian">-</div>' +
                    '<div class="shu">' +
                    count +
                    '</div>' +
                    '</div>' +
                    '<div class="btn_jia">+</div>' +
                    '<div class="btn_right_f">' +
                    '<span class="btn_right_m">¥' +
                    count * good[subIndex].price +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
             
                	'<input class ="mid_id" type="hidden" name="id' +
					aIndex +
					'" value="' +
                	goods[index].id +
                	'">' +
                	'<input class ="count_id" type="hidden" name="count' +
                    aIndex +
					'" value="' +
                	count +
                	'">' +
                	'<input class ="name_id" type="hidden" name="name' +
                    aIndex +
					'" value="' +
                	good[subIndex].name +
                	'">' +
                	'<input class ="price_id" type="hidden" name="price' +
                    aIndex +
					'" value="' +
                	good[subIndex].price +
                	'">' +
                	'</div>';

                $(".elastic_bor").append(appendHtml);
            } else {
                button_middle.find(".shu").html(count);
                button_middle.find(".count_id").val(count);
            }

            parent.find(".shu").html(sumCount);

            $(".car_click").removeClass("car_active")
            $($(".car_click")[0]).addClass("car_active")

            $(".none").hide()
        })
		//点击小车（购物车）显隐 和点击与不能点击
        $(".car").on("click", function() {
            if(num == 0 || $(".none").css('display') == "block") {
                return false;
            }

            var dis = $(".tan_none").css("display");
            if(dis == "block") {
                $(".bottom_pop").hide()
                $(".tan_none").hide()
            } else {
                $(".bottom_pop").show()
                $(".tan_none").show()
            }

        })
		//模版    膜层 显示与隐藏
        $(".bottom_pop_none").on("click", function() {
            $(".bottom_pop").hide();
            $(".tan_none").hide();
        })
		//点击清除所有
        $(".eliminate").on("click", function() {
            init();
        })



		//点击下单按钮  
        $(".button_right").on("click", function() {
        	        
//            var mid =$(".mid_id").val()
//            var count_id =$(".count_id").val()
//            var name_id =$(".name_id").val()
//            var price_id =$(".price_id").val()
//            alert(mid)
//            alert(count_id)
//            alert(name_id)
//            alert(price_id)

			//获取数据 给后台用   放在数组里 
			var arr = [];
			$(".elastic_bor .button_middle").each(function (i, v) {
                var index = $(v).attr("index")
                var subIndex = $(v).attr("sub_index");
                
                var good = goods[index].goods[subIndex];
                good.wid = goods[index].id;
                good.w_name =goods[index].name;
				arr.push(good);
            })
			//点击下单的数组 
			console.log(arr)
			var a =$(".count_id")
			a.each(function (i,v){
				console.log($(v).val())
			})
			console.log(num);
			
			return false;


			
//			提交 表单
            $(".form").submit(

            );
            //跳页面
//			window.location.href = "确定订单.html"

        })
    })