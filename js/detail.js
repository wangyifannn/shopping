$(function() {

	var goodId = location.search.slice(1).split("=");

	$.ajax({
		"type": "get",
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"data": {
			"goods_id": goodId[1]
		},
		"success": function(response) {
			var good_number = 0;
			addDetail($(".list"), response);

			var Demo = document.getElementsByClassName("item-product-thumb")[0];
			var SmallBox = document.getElementsByClassName("small-box")[0];
			var Mark = document.getElementsByClassName("mark")[0];
			var FloatBox = document.getElementsByClassName("float-box")[0];
			var BigBox = document.getElementsByClassName("big-box")[0];
			var BigBoxImage = document.getElementsByClassName("bigimg")[0];

			fangda(Demo, SmallBox, Mark, FloatBox, BigBox, BigBoxImage)
			$(".addCart").click(function() {
				good_number = $(".numb").val();

				console.log(good_number);
				addCartFun($(this), goodId[1], good_number);
			});
		}
	});

});

function addDetail(element, response) {
	var obj = response.data;
	var html = '';
	html += `<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
						<div class="item-product item-product-list">
							<div class="item-product-thumb sp_img">								
								<div class="small-box">
									<a class="mark" href="#"><img src="${obj[0].goods_thumb}" /></a>
									<div class="float-box"></div>
								</div>
								<div class="big-box">
									<img class="bigimg" src="${obj[0].goods_thumb}" />
								</div>
							</div>
							<div class="item-product-info2">
								<h3><a href="#">${obj[0].goods_name}</a></h3>
								<div class="ratting-review">
									<div class="info-rating">
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
									</div>
									<div class="order-number">
										<span>（5颗星）</span>
									</div>
									<div class="review-add">
										<a href="#">
																	添加您的评论
																</a>
									</div>
								</div>
								<div class="info-product-price">
									<label class="persale">10％</label>
									<span>$ ${obj[0].price}</span>
									<del>$ 69.71</del>
								</div>
								<div class="list-item-des">
									<span>${obj[0].goods_desc}</span>
								</div>
								<div class="list-item-number">
									<label >数量:</label>
									<input class="numb" type="number" value="1" min="1" >
								</div>
								
								<div class="product-extra-link">
									<span class="collection btn" goodId=${obj[0].goods_id} data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="收藏">
																<i class="glyphicon glyphicon-heart"></i>
															</span>
									<span class="addCart btn" goodId=${obj[0].goods_id} data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="添加到购物车">
																<i class="glyphicon glyphicon-shopping-cart"></i>
															</span>
									<span class="qSearch btn" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="快速浏览">
																<i class="glyphicon glyphicon-search"></i>
															</span>
								</div>
								<div class="item-bought">
									<span class="btn">11买了</span>
								</div>
							</div>
						</div>`;

	element.append(html);

}

function fangda(Demo, SmallBox, Mark, FloatBox, BigBox, BigBoxImage) {

	SmallBox.onmouseover = function(event) {
		console.log(event)
		FloatBox.style.display = "block";
		BigBox.style.display = "block";
	}
	console.log(FloatBox)
	SmallBox.onmouseout = function() {
		FloatBox.style.display = "none";
		BigBox.style.display = "none";
	}
	SmallBox.onmousemove = function(e) {
		var _event = e || window.event
		var left = _event.clientX - Demo.offsetLeft - SmallBox.offsetLeft - FloatBox.offsetWidth / 2;
		var top = _event.clientY - Demo.offsetTop - SmallBox.offsetTop - FloatBox.offsetHeight / 2;
		if (left < 0) {
			left = 0;
		} else if (left > Mark.offsetWidth - FloatBox.offsetWidth) {
			left = Mark.offsetWidth - FloatBox.offsetWidth;
		}
		if (top < 0) {
			top = 0;
		} else if (top > Mark.offsetHeight - FloatBox.offsetHeight) {
			top = Mark.offsetHeight - FloatBox.offsetHeight;
		}
		FloatBox.style.left = left + 'px';
		FloatBox.style.top = top + 'px';
		var percentX = left / (Mark.offsetWidth - FloatBox.offsetWidth);
		var percentY = top / (Mark.offsetHeight - FloatBox.offsetHeight);
		BigBoxImage.style.left = -percentX * (BigBoxImage.offsetWidth - BigBox.offsetWidth) + 'px';
		BigBoxImage.style.top = -percentY * (BigBoxImage.offsetHeight - BigBox.offsetHeight) + 'px';
	}
}