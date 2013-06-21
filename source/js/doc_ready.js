
$(document).ready(function() {
  
  var wac_artworks,selected_artwork,current_edit_slide,list_vid,list_thumb;
  
  $.get("http://10.1.6.75/media/",function(data,status){
      var d = $.parseHTML( data );
      $(d[5]).find('li').each(function( index ) {
        if($(this).text() == ' Parent Directory'){
          
        }else{
          $('#vid_pick').append('<option>'+$(this).text()+'</option>');
        }
      });
      $('.selectpicker_vid').selectpicker();
    });
    
    $.get("http://10.1.6.75/thumbnails/",function(data,status){
        var d = $.parseHTML( data );
        $(d[5]).find('li').each(function( index ) {
          if($(this).text() == ' Parent Directory'){
          
          }else{
            $('#thum_pick').append('<option>'+$(this).text()+'</option>');
          }
        });
        $('.selectpicker_thumb').selectpicker();
      });

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
  
  
  //this is the autocomplete stuff
  $.getJSON('js/garden.json', function(data) {
    wac_artworks = data.slides;
    wac_artworks = removeEmptyArrayElements(wac_artworks);
  });
  
  $('#typeaheadsearch').typeahead([
    {
        name: 'collections',
        remote: {
            url: 'http://www.walkerart.org/collections/api/search?q=%QUERY',
            dataType: 'json'
        },
        template: ['<p><strong>{{artist}}</strong>, {{title}} – {{year}}</p>'].join(''),
        engine: Hogan
    }
  ]);
  
  
  
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
  
  send_json.on_doc_ready();
  
  //download json
    $('body').on('click', '.save_json .download', function (event) {
      screen_viz.send_to_json();
      download_json.save(screen_json.make_json(), 'screen.json');
    });
  //end
  
  //load json from file
    $('body').on('click', '#json_load', function (event) {
      $('#json_Modal').modal('hide');
      var new_slide_set = $.parseJSON(import_json.imported_json);
      var arr = new_slide_set.slides;
      //arr.reverse();
      var last = arr.shift();
      arr.push(last);
      $.each( arr, function( key, value ) {
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
    
    if($('#optionsCheckbox').prop('checked')){
      new_slide.type = 'autoplay';
    }else{
      new_slide.type = 'video';
    }
    $('#optionsCheckbox').attr('checked', false);
    
    new_slide.title = $('.artwork_title').val();
    new_slide.artist = $('.artwork_artist').val();
    new_slide.year = $('.artwork_year').val();
    new_slide.artwork_text = $('#video_Modal .wmd-preview').html();
    if($('#thum_pick').val()){
      new_slide.video_poster = 'http://10.1.6.75/thumbnails/'+$('#thum_pick').val() ;
      new_slide.thumbnail = 'http://10.1.6.75/thumbnails/'+$('#thum_pick').val() ;
    }
    if($('#vid_pick').val()){
      new_slide.video_src = 'http://10.1.6.75/media/'+$('#vid_pick').val() ;
    }
    screen_viz.append_slide_list(new_slide);
    
    $('.artwork_title').val('');
    $('.artwork_artist').val('');
    $('.artwork_year').val('');
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
    
    new_slide.type = 'zoomer';
    new_slide.title = "THIS IS MY SLIDE TEST";
    new_slide.artist = "Anthony Warnick";
    new_slide.year = "2013";
    new_slide.artwork_text = "<p>Proin quis tortor orci.</p>";
    new_slide.zoomer_url = "http://cdn{s}.walkerart.org/wac_786/{z}_{x}_{y}.jpg";
    new_slide.zoomer_width = 4000;
    new_slide.zoomer_height = 3187;
    screen_viz.append_slide_list(new_slide);
  });
  
  //edit_slide
    $('.list_of_slides').on('click', '.slide_item', function (event) {
      current_edit_slide = "#"+$(event.currentTarget).attr('id');
      var markdown_html = $(event.currentTarget).data().artwork_text;
      var markdown = reMarker.render(markdown_html);
      $('#edit_Modal').modal('show');
      $('#edit_Modal .artwork_artist').val($(this).data().artist);
      $('#edit_Modal .artwork_title').val($(this).data().title);
      $('#edit_Modal .artwork_year').val($(this).data().year);
      $('#edit_Modal #wmd-input-second').val(markdown);
      //$('#edit_Modal #wmd-preview-second').html($(current_edit_slide).data().artwork_text);
      //$('#edit_Modal .artwork_thumb').val($(this).data().artwork_artist);
      //$('#edit_Modal .artwork_video').val($(this).data().artwork_artist);    
    });
  
  
    $('body').on('click', '#edit_save', function (event) {
      $('#edit_Modal').modal('hide');
      var new_meta = "<span>"+$('#edit_Modal .artwork_title').val()+"</span><span>"+$('#edit_Modal .artwork_artist').val()+"</span>";
      $(current_edit_slide).find('.slide_meta').html(new_meta);
      $(current_edit_slide).data('title', $('#edit_Modal .artwork_title').val());
      $(current_edit_slide).data('artist', $('#edit_Modal .artwork_artist').val());
      $(current_edit_slide).data('year', $('#edit_Modal .artwork_year').val());
      var text_string = $('#edit_Modal #wmd-preview-second').html();
      $(current_edit_slide).data('artwork_text', String(text_string));
    });
  //end

  
});



