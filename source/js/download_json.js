function utf8_to_b64( str ) {
    return window.btoa(unescape( encodeURIComponent( str ) ));
}

function b64_to_utf8( str ) {
    return decodeURIComponent(window.atob( str ));
}

var download_json = {
    click : function(node) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return node.dispatchEvent(ev);
    },
    encode : function(data) {
            return 'data:application/octet-stream;base64,' + utf8_to_b64( data );
    },
    link : function(data, name){
        var a = document.createElement('a');
        a.download = name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/')+1);
        a.href = data || self.location.href;
        return a;
    },
    save: function(data, name){
        this.click(
            this.link(
                this.encode( data ),
                name
            )
        );
    }
};
  



