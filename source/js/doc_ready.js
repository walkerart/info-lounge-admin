
$(document).ready(function() {
  //this is the autocomplete stuff
  var wac_artworks,selected_artwork,current_edit_slide;
  
  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', import_json.handleDragOver, false);
  dropZone.addEventListener('drop', import_json.handleFileSelect, false);

  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();

  //markdown editor
  var converter1 = Markdown.getSanitizingConverter();
  var editor1 = new Markdown.Editor(converter1);
  editor1.run();
  
  
  var converter2 = Markdown.getSanitizingConverter();
  var editor2 = new Markdown.Editor(converter2,"-second");
  editor2.run();
  
  $.getJSON('js/garden.json', function(data) {
    console.log(data);
    wac_artworks = data.slides;
    wac_artworks = removeEmptyArrayElements(wac_artworks);
    console.log(wac_artworks);
  });
  
  $('#typeaheadsearch').typeahead({
    source: function(query, process) {
      var results = _.map(wac_artworks, function(artwork) {
         return artwork.title;
      });
      process(results);
    },
    updater: function(id) {
      var artwk = _.find(wac_artworks, function(p) {
          return p.title == id;
      });
      selected_artwork = artwk;
      return artwk.title;
    }
  });
  
  
  
  ////////my break 
  
  
  
  
  
  //this is the add new slide stuff
  $('.new_slide').popover({ 
    html : true, 
    content: function() {
      return $('#mypop').html();
    }
  });
  
  //delete slide
    $('.list_of_slides').on('click','.delete_slide',function(event){
      $(this).parent('li.slide_item').remove()
    });
  //end
  
  $('#wac_Modal').on('hidden', function () {
    // do something…
  })
  
  //save json to server
    $('body').on('click', '.save_json .export', function (event) {
      screen_viz.send_to_json();
      console.log('send to post');
      console.log(screen_json.make_json());
    });
  //end
  
  //download json
    $('body').on('click', '.save_json .download', function (event) {
      screen_viz.send_to_json()
      download_json.save(screen_json.make_json(), 'screen.json');
    });
  //end
  
  //load json from file
    $('body').on('click', '#json_load', function (event) {
      $('#json_Modal').modal('hide');
      var new_slide_set =$.parseJSON(import_json.imported_json);
      $.each( new_slide_set.slides, function( key, value ) {
        if(value != null){
          screen_viz.append_slide_list(screen_viz.make_slide(value));      
        }
      });
    });
  //end
  
  
  //clear all slides
    $('body').on('click', '.clear_list', function (event) {
      screen_json.clear_json();
      $('.list_of_slides li').remove();
    });
  //
  
  //the functions to make slides when modal is saved
  $('body').on('click', '#video_save', function (event) {
    $('#video_Modal').modal('hide');
    $('.new_slide').popover('hide');
    var $el = $(this).parents('#video_Modal');
    var new_slide = new slide();
    new_slide.slide_type = 'video';
    new_slide.artwork_title = $('.artwork_title').val();
    new_slide.artwork_artist = $('.artwork_artist').val();
    new_slide.artwork_year = $('.artwork_year').val();
    new_slide.artwork_text = $('.artwork_text').val();
    new_slide.video_poster = "http://video-js.zencoder.com/oceans-clip.jpg";
    new_slide.video_src = "http://video-js.zencoder.com/oceans-clip.mp4" ;
    screen_viz.append_slide_list(new_slide);
  });
  
  $('body').on('click', '#wac_save', function (event) {
    $('#wac_Modal').modal('hide');
    $('.new_slide').popover('hide');
    $('#typeaheadsearch').val('');

    selected_artwork.type = "zoomer";
    screen_viz.append_slide_list(screen_viz.make_slide(selected_artwork));
  });
  
  $('body').on('click', '#img_save', function (event) {
    $('#img_Modal').modal('hide');
    $('.new_slide').popover('hide');
    var $el = $(this).parents('#img_Modal');
    var new_slide = new slide();
    
    new_slide.slide_type = 'zoomer';
    new_slide.artwork_title = "THIS IS MY SLIDE TEST";
    new_slide.artwork_artist = "Anthony Warnick";
    new_slide.artwork_year = "2013";
    new_slide.artwork_text = "<p>Proin quis tortor orci.</p>";
    new_slide.zoomer_url = "http://cdn{s}.walkerart.org/wac_786/{z}_{x}_{y}.jpg";
    new_slide.zoomer_width = 4000;
    new_slide.zoomer_height = 3187;
    screen_viz.append_slide_list(new_slide);
  });
  
  //edit_slide
    $('.list_of_slides').on('click', '.slide_item', function (event) {
      current_edit_slide = "#"+$(event.currentTarget).attr('id');
      console.log(current_edit_slide);
      var markdown_html = $(current_edit_slide).data().artwork_text;
      console.log(markdown_html);
      var markdown = reMarker.render(markdown_html);
      $('#edit_Modal').modal();
      $('#edit_Modal .artwork_artist').val($(this).data().artwork_artist);
      $('#edit_Modal .artwork_title').val($(this).data().artwork_title);
      $('#edit_Modal .artwork_year').val($(this).data().artwork_year);
      $('#edit_Modal #wmd-input-second').val(markdown);
      $('#edit_Modal #wmd-preview-second').html($(current_edit_slide).data().artwork_text);
      //$('#edit_Modal .artwork_thumb').val($(this).data().artwork_artist);
      //$('#edit_Modal .artwork_video').val($(this).data().artwork_artist);    
    });
  
  
    $('body').on('click', '#edit_save', function (event) {
      $('#edit_Modal').modal('hide');
      var new_meta = "<span>"+$('#edit_Modal .artwork_title').val()+"</span><span>"+$('#edit_Modal .artwork_artist').val()+"</span>";
      $(current_edit_slide).find('.slide_meta').html(new_meta);
      $(current_edit_slide).data().artwork_title = $('#edit_Modal .artwork_title').val();
      $(current_edit_slide).data().artwork_artist = $('#edit_Modal .artwork_artist').val();
      $(current_edit_slide).data().artwork_year = $('#edit_Modal .artwork_year').val();
      $(current_edit_slide).data().artwork_text = $('#edit_Modal #wmd-preview-second').html();
      //$current_edit_slide.data().video_poster = "http://video-js.zencoder.com/oceans-clip.jpg";
      //$current_edit_slide.data().video_src = "http://video-js.zencoder.com/oceans-clip.mp4";
      //$current_edit_slide.data().artwork_artist = "test";
    });
  //end

  
});



