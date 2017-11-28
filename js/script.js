$(document).ready(function(){
	
    var numberOfQuestions = 0;
    var questions = [];
    var answers = new Array();
    
    
	$("#frageSpeichernBtn").click(function(e){

		var question = $("#nameTxtField").val();
	    if(question!==""){
	    	if(!checkIfQuestionExists(question)){
               $("#nameTxtField").removeClass("textfeld-error");
                appendQuestion(question);
                $("#nameTxtField").val("");
            }else{
                alert("Frage existiert schon")
            }
            
	    }else {
	    	$("#nameTxtField").addClass("textfeld-error");
	    }
	});
    
    
    function appendQuestion(question){
        
        var append = "<div class='row' id='neueFrageZeile"+numberOfQuestions+"' >"+
                            '<div class="well" id="well'+numberOfQuestions+'" >'+
                                "<div class='row'>"+
                                    '<div class="col-xs-6">'+question+'</div>'+
                                    '<div class="col-xs-2" style="text-align:right;"><button type="button" class="btn btn-default neueAntwortBtnCl" id="neueAntwortBtn'+numberOfQuestions+'"  >Antwort hinzufügen</button> </div>'+
                                    '<div class="col-xs-2" style="text-align:center;"><button type="button" class="btn btn-default frageEditBtnCl" id="frageEditBtn'+numberOfQuestions+'" >Frage Editieren</button> </div>'+ 
                                    '<div class="col-xs-2" style="text-align:left;"><button type="button" class="btn btn-danger frageDelBtnCl"  id="frageDelBtn'+numberOfQuestions+'"  >Frage Löschen</button> </div>'+
                                '</div>'+
                            '</div>'+
    	              "</div>";
        $("#hook").append(append);
        
        questions.push(createQuestionObject(question, numberOfQuestions));
        numberOfQuestions++;
        printQuestions();
        //$.getScript("js/script2.js");
    }
    
    function checkIfQuestionExists(question){
        for(var i = 0; i < questions.length; i++){
            if(questions[i].question===question){
               return true;
            }
        }
        return false;
    }
    
    function checkIfQuestionExistsV2(question){
        return questions.indexOf(questionObj.question===question);
    }
    
    function createQuestionObject(frage, id){
        var questionObj = {
            id : id,
            question: frage,
            answers : {}
        };
        return questionObj; 
    }
    
    
    
    
    /* events for dynamic created content */
    $(document).on("click", ".neueAntwortBtnCl" , function() {
        
        var idNr = this.id.replace("neueAntwortBtn", "");
        
        // check if content has been appended
        if( $("#neue-antwort"+idNr).length == 0 ){

            var content = "<div class='row neue-antwort' id='neue-antwort"+idNr+"'   style='margin-top: 20px;'>"+
                              '<div class="col-lg-6"><input type="text" class="form-control" id="txtNeueAntwort'+idNr+'"></div>'+
                              '<div class="col-lg-3" style="text-align:right;">'+
                                  '<button type="button" class="btn btn-default btn-sm anwortSpeichernBtnCl" id="anwortSpeichernBtn'+idNr+'" >'+
                                      '<span class="glyphicon glyphicon-ok"></span> Speichern'+
                                  '</button>'+
                              '</div>'+
                              '<div class="col-lg-3" style="text-align:left;">'+
                                  '<button type="button" class="close" id="close'+idNr+'"  aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                              '</div>'+
                          "</div>";

            $("#well"+idNr).append(content);
            $("#neue-antwort"+idNr).hide().slideDown();//fadeIn("slow");   
        }
    });
    
    $(document).on("click", ".frageEditBtnCl" , function() {
        var id = this.id;
        alert("ID: "+id+" editiere Frage");
    });
    
    $(document).on("click", ".frageDelBtnCl" , function() {
        var id = this.id;
        alert("ID: "+id+" loesche Frage");
    });
    
    
    
    /* events for dynamic created "new answer" content  */
    
    $(document).on("click", ".close" , function() {
        var id = this.id;
        
        var idNr = this.id.replace("close", "");
        
        $("#neue-antwort"+idNr).slideUp(500, function(){
            $(this).remove();    
        });
        
    });
    
    
    $(document).on("click", ".anwortSpeichernBtnCl" , function() {
        var id = this.id;
        
        var idNr = this.id.replace("anwortSpeichernBtn", "");
        
        alert("Speichern Kollege "+idNr);
        
    });
    
    
    
    /*********************************
     *        HELPER FUNCTIONS       *
     *********************************/
    
    function printQuestions(){
        console.log("***____printQuestions()___***");
        for(var i = 0; i < questions.length; i++){
            console.log(questions[i].id+" : "+questions[i].question);
        }
    }
    
    
    
    
});