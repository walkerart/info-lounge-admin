var screen_viz = {
    slides: [],
    slide1: new slide(),
    
    append_slide_list: function(slide){
      var slide_num = $('.list_of_slides li').length + 1;
      var slide_name = "slide"+slide_num;
      $('.list_of_slides').append('<li class="slide_item clearfix" id="'+slide_name+'"><img class="img-circle" src="'+slide.thumbnail+'"><a class="delete_slide btn"><i class="icon-remove"></i></a><div class="slide_meta"><span>'+slide.title+'</span><span>'+slide.artist+'</span></div></li>');      
      slide_name = '#'+slide_name;
      $(slide_name).data("wac",slide);
    },
    
    send_to_json: function(){
      screen_json.clear_json();
      $('.list_of_slides li').each(function( index ) {
        screen_json.add_to_slides($(this).data('wac'));
      });
    },
    
    make_slide: function(obj){
      var sl = new slide();
      if(obj != null){
        sl.type = obj.type;
        sl.title = obj.title;
        sl.artist = obj.artist;
        sl.year = obj.year;
        if(obj.text != undefined){
          sl.artwork_text = obj.text.body;
          sl.text = obj.text;
        }
        if(obj.thumbnail == undefined){
          sl.thumbnail = "http://placekitten.com/g/200/300";
        }else{
          sl.thumbnail = obj.thumbnail;
        }
        sl.zoomer_url = obj.zoomer_url;
        sl.zoomer_width = obj.zoomer_width;
        sl.zoomer_height = obj.zoomer_height;
        sl.video_poster = obj.video_poster;
        sl.video_src = obj.video_src;
        return sl;
      }
    }
};

