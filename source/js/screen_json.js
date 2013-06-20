var screen_json = {
    slides: [],
    slide1: new slide(),
    
    make_json: function() {
      var whole_json = { "name":"info"};
      var array = [];
      screen_viz.send_to_json();
      array = this.slides;
      if(array.length >= 2){
        array.unshift(array.pop());
      }
      whole_json.slides = array;
      //console.log(whole_json);
      var json_to_return = JSON.stringify(whole_json);
      return json_to_return;
    },
    
    clear_json: function(){
      //not really working
      delete this.slides;
      this.slides = [];
    },
    
    /*
    //depricated in favor of making the slides on the dom elements
    make_slide: function(slide) {
      var ttl_sld = this.slides.length + 1;
      var slidename = "slide" + ttl_sld;
      this[slidename] = slide;
      this.add_to_slides(this[slidename]);
    },
    */
    
    add_to_slides: function(sld){
      this.slides.push(sld);
    },
    
    post_json: function(){
      //this is where we need to send the json to some thing like s3
    }
};


  
