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
					<h4>" + party["association"] + " <small>" + party["datetimeStart"].toString("dd-MM-yyyy ") + " - " + party["datetimeEnd"].toString("dd-MM-yyyy") + "</small></h4>\
					<p>\
					</p>\
					<a class='btn btn-primary' href='" + party["url"] + "'>View Party <span class='glyphicon glyphicon-chevron-right'></span></a>\
				</div>\
			</div>\
			<!-- /.row -->\
			<hr>\
	";
}

function compareAss(a, b) {
	if (a.association < b.association)
		return -1;
	if (a.association > b.association)
		return 1;
	return 0;
}

function compareDT(a, b) {
	if (a.datetimeStart < b.datetimeStart)
		return -1;
	if (a.datetimeStart > b.datetimeStart)
		return 1;
	return 0;
}

var parties = {};

function fetchParties() {
	$.get( "parties.json", function( data ) {
		parties = $.map(data.parties, function(value, index) {
			return [value];
		});
		
		parties.sort(compareDT);
		
		for(id in parties){
			parties[id]["datetimeStart"] = Date.parse(parties[id]["datetimeStart"]);
			parties[id]["datetimeEnd"] = Date.parse(parties[id]["datetimeEnd"]);
			
			$( partyHTML(parties[id]) ).appendTo(".partyContainer");
		}

	}, "json" );
}

function partyResort(sortBy) {
	switch(sortBy) {
		case "Association":
			parties.sort(compareAss);
			$("#sortText").text("Association");
			break;
		case "datetimeStart":
			parties.sort(compareDT);
			$("#sortText").text("Date/time");
			break;
		default:
			parties.sort(compareDT);
	}
	
	$(".partyContainer").empty();
	
	for(id in parties){
		$( partyHTML(parties[id]) ).appendTo(".partyContainer");
	}
}

fetchParties()

$("#ddAss").click(function() {
	partyResort("Association");
});

$("#ddDT").click(function() {
	partyResort("datetimeStart");
});





















