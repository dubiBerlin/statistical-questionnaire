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
                
                localStorage.setItem("","");
                
                $("#nameTxtField").val("");
                
                
                //
                îf(localStorage){
                    if(localStorage.getItem("idCount")!==null){
                        var idCount = localStorage.getItem("idCount");
                    }else{
                        
                    }
                }
                
                
                
            }else{
                alert("Frage existiert schon")
            }
            
	    }else {
	    	$("#nameTxtField").addClass("textfeld-error");
	    }
	});
    
    
    function appendQuestion(question){
        
        var append = "<div class='row well' id='neueFrageZeile"+numberOfQuestions+"' style='margin-top:50px;background-color:white'  >"+
                            '<div class="well" id="well'+numberOfQuestions+'"  style="background-color:white; border-style:none;"  >'+
                                "<div class='row'><div class='col-lg-12'  style='text-align:left;' >Frage:</div></div> "+
                                "<div class='row'>"+
                                    '<div class="col-xs-6" style="font-weight:bold">'+question+'</div>'+
                                    '<div class="col-xs-2" style="text-align:right;"><button type="button" class="btn btn-default neueAntwortBtnCl" id="neueAntwortBtn'+numberOfQuestions+'"  >Antwort hinzufügen</button> </div>'+
                                    '<div class="col-xs-2" style="text-align:center;"><button type="button" class="btn btn-default frageEditBtnCl" id="frageEditBtn'+numberOfQuestions+'" >Frage Editieren</button> </div>'+ 
                                    '<div class="col-xs-2" style="text-align:left;"><button type="button" class="btn btn-danger frageDelBtnCl"  id="frageDelBtn'+numberOfQuestions+'"  >Frage Löschen</button> </div>'+
                                '</div>'+
                            '</div>'+
                           "<table class='table'> "+    
                                "<thead>"+
                                    "<tr>"+
                                        "<th>Antwort</th>"+
                                        "<th>Eingabe</th>"+
                                        "<th>Gesamt</th>"+
                                        "<th>Löschen</th>"+
                                    "</tr>"+
                                "</thead>"+
                                "<tbody id='tabelle"+numberOfQuestions+"' >"+
                                "</tbody>"+
                            "</table>"+
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
            answers : []
        };
        return questionObj; 
    }
    
    
    
    
    /* events for dynamic created content */
    $(document).on("click", ".neueAntwortBtnCl" , function() {
        
        var idNr = this.id.replace("neueAntwortBtn", "");
        
        // check if content has been appended
        if( $("#neue-antwort"+idNr).length == 0 ){

            var content = "<div id='neue-antwort"+idNr+"'   style='margin-top: 20px;'>"+
                              "<div class='row' >"+
                                  '<div class="col-lg-10"><input type="text" class="form-control" id="txtNeueAntwort'+idNr+'"></div>'+
                                  '<div class="col-lg-2" style="text-align:left;">'+
                                      '<button type="button" class="close" id="close'+idNr+'"  aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                  '</div>'+
                              "</div>"+
                              "<div class='row' style='margin-top:5px' >"+
                                '<div class="col-lg-12" style="text-align:left;">'+
                                      '<button type="button" class="btn btn-default btn-sm anwortSpeichernBtnCl" id="anwortSpeichernBtn'+idNr+'" >Antwort speichern</button>'+
                                '</div>'+
                              "</div>"+        
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
    
    /*
     * Fügt neue Antwort für die Frage hinzu
     *
     */ 
    $(document).on("click", ".anwortSpeichernBtnCl" , function() {
        var id = this.id;
        
        var idNr = this.id.replace("anwortSpeichernBtn", "");
        
        
        var newAnswer = $("#txtNeueAntwort"+idNr).val();
        
        
        if(newAnswer!==""){
            
            // We check if answer exists for the answer
            var pos = answerExists(newAnswer, idNr); 
            
            if( pos === -1 ){
               questions[idNr].answers.push(newAnswer);
                
                
                
                /*var content = "<div id='antwortenblock"+idNr+"'>"+
                                "<div class='row'>"+
                                    "<div class='col-lg-2'>"+
                                        newAnswer+
                                    "</div>"+
                                    "<div class='col-lg-2'>"+
                                        ""+
                                    "</div>"+
                                "</div>"+
                              "</div>";*/
                
                var content = "<tr>"+
                                "<td>"+newAnswer+"</td>"+
                                "<td>"+"<textarea rows='1' id='"+pos+"' style='resize:none; width:70px; height:30px;'  class=\"form-control\"  ></textarea></td>"+
                                "<td>"+"<textarea rows='1' id='"+pos+"'   style='resize:none; width:150px; height:30px;'  class=\"form-control\"  ></textarea></td>"+
                                '<td> <button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove"></span></button></td>'+
                              "</tr>";
                
                $("#tabelle"+idNr).append(content);
                
            }else{
                alert("Antwort wurde schon hinzugefügt");
            }   
        }
        
        
        
        
        
    });
     
    
    /*
     * checks if answer exists for question
     */
    function answerExists(answer, id){
        for(var i = 0; i < questions.length; i++){
            if(questions[i].id==id){
                for(var j = 0; j < questions[i].answers.length; j++){
                    if(questions[i].answers[j]==answer){
                       return i;    
                    }
                }
            }
        }
        return -1;
    }
        
    
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