// Your JavaScript goes here...
parse = function() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var myArr = JSON.parse(this.responseText);
	        document.getElementById("messages").innerHTML = "<mark>" + myArr[0].username + ": " + myArr[0].content + "</mark><br><br><mark>" + myArr[1].username + ": " + myArr[1].content + "</mark>";
	    }
	};
	xmlhttp.open("GET", "data.json", true);
	xmlhttp.send();
}