var send_json = {
    slides: [],
    slide1: new slide(),
    
    send: function() {
      console.log(screen_json.make_json());
      $.ajax({
        type: "POST",
        url: "http://10.1.6.80:8000/api/infolounge",
        data: {user: "test",info: screen_json.make_json()}
        //data: screen_json.make_json()
      }).done(function( msg ) {
        console.log( "Data Saved:");
        console.log(msg);
      }).success(function( msg ){
        $('.alert_holder').append(send_json.msg('success',msg));
      }).error(function( msg ){
        $('.alert_holder').append(send_json.msg('error',msg));
      });
      
    },
    
    msg: function(type, msg){
      var toshow = msg.status;
      var to_return = '';
      if(type === "error" || msg.status === "FAILURE, please authenticate with Walker admin"){
        to_return = '<div class="alert alert-block alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Warning!</h4><span class="message">'+toshow+'</span></div>';
      }else if(type === "success"){
        to_return = '<div class="alert alert-block alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Congratulations!</h4><span class="message">Status: '+toshow+'</span></div>';
      }else{
        to_return = '<div class="alert alert-block"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Warning!</h4><span class="message">'+msg+'</span></div>';
      }
      return to_return;
    },
    
    on_doc_ready: function(){
      //save json to server
        $('body').on('click', '.save_json .export', function (event) {
          send_json.send();
        });
      //end
    }
};


  
