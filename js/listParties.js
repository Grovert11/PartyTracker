
var parties = {};

function partyHTML(party) {
	return "\
			<div class='row'>\
				<div class='col-md-4'>\
					<a href='#'>\
						<img class='party img-responsive' src='" + party["img"] + "' alt=''>\
					</a>\
				</div>\
				<div class='col-md-8'>\
					<h3>" + party["title"] + "</h3>\
					<h4>" + party["association"] + " <small>" + party["datetimeStart"].toString("dd-MM-yyyy") + " - " + party["datetimeEnd"].toString("dd-MM-yyyy") + "</small></h4>\
					<p>\
					</p>\
					<a class='btn btn-primary' href='" + party["url"] + "'>View Party <span class='glyphicon glyphicon-chevron-right'></span></a>\
				</div>\
			</div>\
			<!-- /.row -->\
			<hr>\
	";
}

$.get( "parties.json", function( data ) {
	parties = data.parties;
	for(id in parties){
		parties[id]["datetimeStart"] = Date.parse(parties[id]["datetimeStart"]);
		parties[id]["datetimeEnd"] = Date.parse(parties[id]["datetimeEnd"]);
		
		$( partyHTML(parties[id]) ).appendTo(".partyContainer");
	}

}, "json" );
