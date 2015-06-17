(function() { this.JST || (this.JST = {}); this.JST["conversations/header"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<span class="prefix">',  (conversation.get('privacy_state') == 0 ) ? "@" : "#" ,'</span>\n<span class="conv-name">',  conversation.escape('title') ,'</span>\n');}return __p.join('');};
}).call(this);
