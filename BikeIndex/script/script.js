$(document).ready(function() {
	//Mostrar URL en la que s'ha fet la consulta
	$("#ACTI_UF4").append("<br/><a href='"+"https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=IP&distance=10&stolenness=stolen"+"'>ACTI_UF4</a>");
	
   $("#searchBikes").click(function() {
	   //Guardar en variable el valor de "inputBikesNumber" que definex el numero de bicicletes el qual es vol buscar
	   var num = document.getElementById("inputBikesNumber").value;
	   
	   //Borrar resultat búsqueda anterior
	   $("#ACTI_UF4 > p").remove();
	   $("#ACTI_UF4 > li").remove();
	   $("#headerImg").remove();
	   $("#bikeImage > img").remove();
	   $("#bikefeed").html("");
       $("#bikefeed li").remove();
	   
	   //Botó
       $(this).toggleClass("btn-primary");
       $(this).html("Searching");
	   
	   //Funcio AJAX
       $.ajax({
            url: "https://bikeindex.org:443/api/v3/search?page=1&per_page="+num+"&location=IP&distance=10&stolenness=stolen",
            dataType: "json",
            complete: function(jqXHR, textStatus) {
                console.log("Completed: "+textStatus);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#bikefeed").html("Error: "+textStatus+" "+errorThrown);
				$("#searchBikes").html("Search Again");
            },
            success: function(data, textStatus, jqXHR) {
                //console.log("Success: "+textStatus);
                listBikes(data);
				$("#searchBikes").html("Search Again");
				//Mostrar resultat consulta
				$("#ACTI_UF4").append("<p><b>Resultat consulta: </b><br/><br/>"+JSON.stringify(data.bikes)+"</p>");
				$("#ACTI_UF4").append("<p><b>Resultat consulta format llista:</b></p>");
				//Cridar funcio per mostrar resultat format "bonic"
				listarConsulta(data);
            }
       });
        // Change back text of button
       $(this).toggleClass("btn-primary");
   });
   
   $("#searchBrand").click(function() {
	   //Guardar en variable el valor de inputBrand que definex la marca el qual es vol buscar
	   var val = document.getElementById("inputBrand").value;
	   
	   //Borrar resultat búsqueda anterior
	   $("#ACTI_UF4 > p").remove();
	   $("#ACTI_UF4 > li").remove();
	   $("#headerImg").remove();
	   $("#bikebrand li").remove();
	   
	   //Botó
       $(this).toggleClass("btn-primary");
       $(this).html("Searching");
	   
	   //Funcio AJAX
	   $.ajax({
            url: "https://bikeindex.org:443/api/v3/search?page=1&per_page=10&manufacturer="+val+"&location=IP&distance=10&stolenness=stolen",
            dataType: "json",
            complete: function(jqXHR, textStatus) {
                console.log("Completed: "+textStatus);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#bikebrand").html("Error: "+textStatus+" "+errorThrown);
				$("#searchBikes").html("Search Brand");
            },
            success: function(data, textStatus, jqXHR) {
                //console.log("Success: "+textStatus);
                listBrand(data);
				loadImage(data);
				$("#searchBrand").html("Search Brand");
            }
       });
	   
       // Change back text of button
       $(this).toggleClass("btn-primary");
   });
});

function listBikes(response) {
	//Recorrer biciletes
    $.each(response.bikes, function(i,bike) {
		//Mostrar Model i marca de cada bicicleta
        $("#bikefeed").append("<li>Model: "+bike.title+", Brand: "+bike.manufacturer_name+"</li>");
    });
}

function listBrand(response) {
	//Recorrer biciletes
    $.each(response.bikes, function(i,bike) {
		//Mostrar el titol de la bicicleta trobada sengons el fabricant escollit previament
        $("#bikebrand").append("<li>Model: "+bike.title+"</li>");
    });
}

function loadImage(response) {
	//Afegir un text per a indicar d'on provenen les imatges a continuació
	$("#bikeImage").append("<div id='headerImg'><strong>Below you can find all the images that has been found by the chosen brand:</strong></div>");
	
	//Eliminar les imatges (si n'hi ha) resultat de la búsqueda anterior
	$("#bikeImage > img").remove();
	
	//Per a cada bicicleta trobada, si té imatge, cridar funcio "callImage"
	$.each(response.bikes, function(i,bike) {
		if(bike.thumb != null) {
			//Agafar thumb de bike
			callImage(bike.thumb);
		}
	});
}

function callImage(response) {
	//Afegir etiqueta img amb la url de la imatge de la bicicleta corresponent
	$("#bikeImage").append("<img src=\""+response+"\"></img>");
}

function listarConsulta(response) {
	//Mostrar en format bonic
	$.each(response.bikes, function(i,bike) {
		$("#ACTI_UF4").append("<li>"+JSON.stringify(bike)+"</li>");
	});
}
