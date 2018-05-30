
$(function() {
	var NebPay = require("nebpay"); 
	var nebpay = new NebPay();
$("#GETYIYAN").click(function() {
	
	var to = "n1gM6wbcKSm988gECJXyNJFNofqtVVNbT9g";
	var value = "0";
	var callFunction = "WordList";
	var callArgs = "[]";
	nebpay.simulateCall(to, value, callFunction, callArgs, {
		listener: function(resp) {
			//console.log(JSON.stringify(resp.result));
			if(resp.result == ""){
				$("#searchresult").html('<div class="panel-body">无记录</div>');
				return;
			}
			var res = JSON.parse(resp.result);
			if(res.length == 0){
				$("#searchresult").html('<div class="panel-body">无记录</div>');
				return;
			}

			var tempStr = "";

			for (var i = 0; i < res.length; i++) {
				if (i % 2 == 0) {
					tempStr += '<div class="panel-body">';
				} else {
					tempStr += '<div class="panel-footer">';
				}

				//					
				tempStr += '<p>';
				tempStr += res[i].Data;
				tempStr += '</p>';
				tempStr += '<p>';
				tempStr += '<small><cite>' + '时间戳:' + res[i].createdDate + '</cite></small>';
				tempStr += '</p> </div> ';
			}
			console.log(tempStr);
			$("#searchresult").html(tempStr);
		}
	});

});
$("#GETYIYAN").click();

$("#NEWYIYAN").click(function() {
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();
	var to = "n1gM6wbcKSm988gECJXyNJFNofqtVVNbT9g";
	var value = "0";
	var callFunction = "SaveData";
	var text = document.getElementById('hitokoto').innerHTML
	var callArgs = "[\"" + text +"\"]";
	nebpay.call(to, value, callFunction, callArgs, {
		listener: function Push(resp) {
			console.log("response of push: " + JSON.stringify(resp))
			var respString = JSON.stringify(resp);
			if(respString.search("rejected by user") !== -1){
				alert("关闭交易,取消上传你的一言")
			}else if(respString.search("txhash") !== -1){
				alert("上传Hash: " + resp.txhash+"请等待交易确认")
			}
		}
	});
});
});
