var import_json = {
  imported_json: {},
  //import the json stuff
  handleFileSelect: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
                  
      //now lets load the file
      var reader = new FileReader();
      reader.onload = function() {
        import_json.imported_json = this.result;
      };
      reader.readAsText(files[i]);
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  },

  handleDragOver: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  
};