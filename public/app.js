
$.getJSON("/articles", function(data) {
  
    for (var i = 0; i < data.length; i++) {
  ge
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  
  
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
   
    var thisId = $(this).attr("data-id");
  
 
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    
      .then(function(data) {
        console.log(data);
       // title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
     
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
       
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
      
        if (data.note) {
          // e title of the note in the title input
          $("#titleinput").val(data.note.title);
          
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
 
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // request to change the note
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        
        title: $("#titleinput").val(),
        
        body: $("#bodyinput").val()
      }
    })
    
      .then(function(data) {
        
        console.log(data);
        
        $("#notes").empty();
      });
  
   
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });