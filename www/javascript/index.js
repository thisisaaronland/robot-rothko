function fetch_rothko(cb){

	var onload = function(rsp){

		var target = rsp.target;
		
		if (target.readyState != 4){
			return;
		}

		var raw = target['responseText'];
		console.log(raw);
		
		var status_code = target['status'];
		var status_text = target['statusText'];
		
		try {
			data = JSON.parse(raw);
		}
		
		catch (e){
			console.log(e);
			return false;
		}
		
		cb(data['rothko']);
	};
	
	var req = new XMLHttpRequest();
	req.addEventListener("load", onload);

	var url = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.play.robotRothko&access_token=' + access_token;
	
	req.open("GET", url, true);
	req.send();		
}

function draw_rothko(data){

	var height = window.innerHeight;
	
	var palette = data['palette'];
	var canvas = data['canvas'];
	var bg = data['background'];		

	var top_h = parseInt(height / 100) * canvas[0];
	var mid_h = parseInt(height / 100) * canvas[1];
	var bottom_h = parseInt(height / 100) * canvas[2];	

	var top = document.getElementById("top");
	var mid = document.getElementById("middle");
	var bottom = document.getElementById("bottom");	

	top.setAttribute("style", "background-color:" + palette[0]["colour"] + "; height:" + top_h + "px;");
	mid.setAttribute("style", "background-color:" + palette[1]["colour"] + "; height:" + mid_h + "px;");
	bottom.setAttribute("style", "background-color:" + palette[2]["colour"] + "; height:" + bottom_h + "px;");		

	setTimeout(make_rothko, 60000);
		
	console.log(data);
}

function make_rothko(){

	if (! navigator.onLine){
		return;
	}
	
	fetch_rothko(draw_rothko);
}

window.addEventListener("load", function load(event){

	make_rothko();
});
