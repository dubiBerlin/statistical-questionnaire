$(document).ready(function(){
	
    
    
	$("#frageSpeichernBtn").click(function(e){
		
		var textFieldContent = $("#nameTxtField").val();
	    if(textFieldContent!==""){
	    	$("#nameTxtField").removeClass("textfeld-error");
            appendQuestion(textFieldContent);
            $("#nameTxtField").val("");
	    }else {
	    	$("#nameTxtField").addClass("textfeld-error");
	    }
	});
    
    
    function appendQuestion(question){
        
        var append = "<div class='row'>"+
                            '<div class="well">'+
                                "<div class='row'>"+
                                    '<div class="col-xs-6">'+question+'</div>'+
                                    '<div class="col-xs-2" style="text-align:right;"><button type="button" class="btn btn-primary" >Antwort hinzufügen</button> </div>'+
                                    '<div class="col-xs-2" style="text-align:center;"><button type="button" class="btn btn-default" >Frage Editieren</button> </div>'+
                                    '<div class="col-xs-2" style="text-align:left;"><button type="button" class="btn btn-danger" >Frage Löschen</button> </div>'+
                                '</div>'+
                                "<div class='row neue-antwort'   style='margin-top: 20px;'>"+
                                    '<div class="col-lg-6"><input type="text" class="form-control" id="txtNeueAntwort"></div>'+
                                    '<div class="col-lg-3" style="text-align:right;">'+
                                        '<button type="button" class="btn btn-default btn-sm" id="anwortSpeichernBtn" >'+
                                            '<span class="glyphicon glyphicon-ok"></span> Speichern'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="col-lg-3" style="text-align:left;">'+
                                        '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                    '</div>'+
                                "</div>"+
                            '</div>'+
    	              "</div>";
        
        $("#hook").append(append);
    }
});