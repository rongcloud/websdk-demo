function login(id){
	var data = {
		"region": 86,
		"phone": $(".name input").eq(0).val()/1,
		"password": $(".password input").eq(0).val()
	};

	$.post("login.json", function(data){
		if(data.code == 200){
			var result = data.result;
			var token = result.token;
			
			alert(token);

			//use token+appKey connect
		}
	});
}