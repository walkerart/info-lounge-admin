var reMarker, slide;

slide = function() {
  this.type = "";
  this.url = "";
  this.title = "";
  this.artist = "";
  this.year = "";
  this.text = "";
  this.text=new Object();
    this.text.author_string = "";
    this.text.publish_state_string = "";
    this.text.citation = "";
    this.text.rights = "";
    this.text.body = "";
  this.fullsize_image = "";
  this.thumbnail = "";
  this.zoomer_width = 0;
  this.zoomer_height = 0;
  this.video_poster = "";
  this.video_poster = "";
  this.video_src = "";
};

reMarker = new reMarked({
  link_list: false,
  h1_setext: true,
  h2_setext: true,
  h_atx_suf: false,
  gfm_code: false,
  li_bullet: "*",
  hr_char: "-",
  indnt_str: "    ",
  bold_char: "*",
  emph_char: "_",
  gfm_del: true,
  gfm_tbls: true,
  tbl_edges: false,
  hash_lnks: false,
  br_only: false
});



function removeEmptyArrayElements(arr) { 
  if (!Object.prototype.toString.call( arr ) === '[object Array]' ) {
    return arr;
  } else {
    var newArray = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== "" && arr[i] !== null) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
  }
}

function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}