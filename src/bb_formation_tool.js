function changeBuildName(clicked_id){
	var build_link = document.getElementById(clicked_id).value;
	var build_name = document.getElementById(clicked_id+"-name");
	
	try{
		const build_url = new URL(build_link);
		
		build_name.value =  build_url.searchParams.get('name');
		
		// Construct URLSearchParams object instance from current URL querystring.
		var queryParams = new URLSearchParams(window.location.search);
		 
		// Set new or modify existing parameter value. 
		queryParams.set(clicked_id+"-name", build_url.searchParams.get('name'));//name
		queryParams.set(clicked_id+"-perks", build_url.searchParams.get('perks'));//perks
		queryParams.set(clicked_id+"-gear", build_url.searchParams.get('gear'));//gear
		 
		// Replace current querystring with the new one.
		history.replaceState(null, null, "?"+queryParams.toString());
		
		//change build link
		document.getElementById(clicked_id+"-link").href = build_link;
		document.getElementById(clicked_id+"-link").style = "pointer-events: auto";
		document.getElementById(clicked_id+"-goto").src = "./img/goto.png";
		
		document.getElementById(clicked_id+"-trash").src = "./img/trash.png";
		document.getElementById(clicked_id+"-trash").style = "cursor: pointer";
		
		//save the company if there are changes in the hex grid and the company was saved beforehand
		var name = document.getElementById("company-name").value;
		if (localStorage[name]!=undefined){
			
			var company = window.location.search;
			
			//save on the storage
			window.localStorage.setItem(name, company);
		}
		
	} catch (err) {
		console.log(err);
		build_name.value =  "";
		document.getElementById(clicked_id+"-link").href = "";
		document.getElementById(clicked_id+"-link").style = "pointer-events: none";
		document.getElementById(clicked_id+"-goto").src = "./img/goto-gray.png";
		
		document.getElementById(clicked_id+"-trash").src = "./img/trash-gray.png";
		document.getElementById(clicked_id+"-trash").style = "cursor: default";
		
		document.getElementById(clicked_id).value = "";
		
		var queryParams = new URLSearchParams(window.location.search);
		 
		// Set new or modify existing parameter value. 
		queryParams.set(clicked_id+"-name", "null");//name
		queryParams.set(clicked_id+"-perks", "null");//perks
		queryParams.set(clicked_id+"-gear", "null");//gear
		
		//console.log(queryParams.toString());
		var ret = queryParams.toString();
		ret = ret.replace(clicked_id+"-name=null",'');
		ret = ret.replace(clicked_id+"-perks=null",'');
		ret = ret.replace(clicked_id+"-gear=null",'');
		
		while(ret.charAt(0) === '&')
		{
			ret = ret.substring(1);
		}
		
		history.replaceState(null, null, "?"+ret);
	}
}

function changeCompanyName(){
	checkIfCompanySaved(document.getElementById("company-name").value);
	
	try{		
		// Construct URLSearchParams object instance from current URL querystring.
		var queryParams = new URLSearchParams(window.location.search);
		 
		// Set new or modify existing parameter value. 
		queryParams.set("company-name", document.getElementById("company-name").value);//name
		 
		// Replace current querystring with the new one.
		history.replaceState(null, null, "?"+queryParams.toString());
		
	} catch (err) {
		build_name.value =  "";
	}
	
	try{		
		var cname = document.getElementById("company-name").value;
		
		if (cname == ""){		
			// Construct URLSearchParams object instance from current URL querystring.
			var queryParams2 = new URLSearchParams(window.location.search);
			 
			 var ret = queryParams2.toString();
			ret = ret.replace("company-name=",'');
			
			while(ret.charAt(0) === '&')
			{
				ret = ret.substring(1);
			}
			 
			// Replace current querystring with the new one.
			history.replaceState(null, null, "?"+ret);
		}
		
	} catch (err) {
		build_name.value =  "";
	}
}

function load_company_name(){
	var queryParams = new URLSearchParams(window.location.search);
	try{
		var name = queryParams.get('company-name');
		document.getElementById("company-name").value = name;
	} catch(err){
		console.log();
	}
}

function on_load_builds(){
	load_build("red-hex");
	load_build("blue-hex");
	load_build("yellow-hex");
	load_build("orange-hex");
	load_build("pink-hex");
	load_build("purple-hex");
	load_build("green-hex");
}

function load_build(loaded_id){
	var queryParams = new URLSearchParams(window.location.search);
	try{
		var name = queryParams.get(loaded_id+'-name');
		var perks = queryParams.get(loaded_id+'-perks');
		var gear = queryParams.get(loaded_id+'-gear');
		
		if (name!="null" & name!=null){
			var queryParams2 = new URLSearchParams();
			
			// Set new or modify existing parameter value. 
			queryParams2.set("name", name);//name
			if (perks!="null")
				queryParams2.set("perks", perks);//perks
			if (gear!="null"){
				queryParams2.set("gear", gear);//gear
			}
			document.getElementById(loaded_id).value = "https://www.bbplanner.xyz/?"+queryParams2.toString();
			
			var element = document.getElementById(loaded_id);
			var event = new Event('change');
			element.dispatchEvent(event);
		}
		
	} catch (err){
		console.log(err);
	}
}

function eraseCompany(){
	window.localStorage.removeItem(document.getElementById("company-name").value);
	window.history.replaceState(null, null, window.location.pathname);
	location.reload();
}

function newCompany(){
	window.history.replaceState(null, null, window.location.pathname);
	location.reload();
}

function saveCompany(){
	
	var name = document.getElementById("company-name").value;
	var company = window.location.search;
	
	//save on the storage
	window.localStorage.setItem(name, company);
	
	//add to the vault menu
	loadMenu();
	
	//update menu
	checkIfCompanySaved(name);
}

function loadMenu(){
	var vault = document.getElementById("vault-companies");
	vault.innerHTML = '';
	
	
	var typeofKey = null;
	
	var keys = [];
	for (var key in localStorage) {
		typeofKey = (typeof localStorage[key]);
		if (typeofKey=="string" && key!="bundle-urls"){
			//console.log(key, typeofKey);
			keys.push(key);
		}
	}
	
	keys = keys.sort(function (a, b) {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});
	
	for (var i in keys){
		var node = document.createElement("a");
		node.innerHTML = keys[i];
		node.href = localStorage[keys[i]];
		vault.appendChild(node);
	}
}

function eraseLink(link_id){
	var link_id = link_id;
	link_id = link_id.replace("-trash",'');
	
	var element = document.getElementById(link_id);
	element.value = "";
	var event = new Event('change');
	element.dispatchEvent(event);
	
}

function checkIfCompanySaved(company_name){
	try{
		 if (localStorage[company_name]!=undefined){
			 //if saved, enable menu icons
			document.getElementById("trash-icon").style = "pointer-events: auto; cursor: pointer";
			document.getElementById("trash-icon").src = "./img/trash.png";
			document.getElementById("heart-icon").style = "pointer-events: auto; cursor: pointer";
			document.getElementById("heart-icon").src = "./img/heart-full.png";
			document.getElementById("share-icon").style = "pointer-events: auto; cursor: pointer";
			document.getElementById("share-icon").src = "./img/share.png";
			return true;
			
			
		 } else {
			 document.getElementById("trash-icon").style = "pointer-events: none; cursor: pointer";
			 document.getElementById("trash-icon").src = "./img/trash-gray.png";
			 if (document.getElementById("company-name").value!=""){
				document.getElementById("heart-icon").style = "pointer-events: auto; cursor: pointer";
				document.getElementById("heart-icon").src = "./img/heart-empty.png";
				document.getElementById("share-icon").style = "pointer-events: auto; cursor: pointer";
				document.getElementById("share-icon").src = "./img/share.png";
			} else {
				document.getElementById("heart-icon").style = "pointer-events: none; cursor: pointer";
				document.getElementById("heart-icon").src = "./img/heart-gray.png";
				document.getElementById("share-icon").style = "pointer-events: none; cursor: pointer";
				document.getElementById("share-icon").src = "./img/share-gray.png";
			}
			return false;
		 }
	}
	catch (err) {
		console.log(err);
	}
}