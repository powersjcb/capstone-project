(function() { this.JST || (this.JST = {}); this.JST["groups/form"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="modal-form">\n  <header>\n    <button class="close" type="button" name="close">&times</button>\n    <h3>Create a group</h3>\n  </header>\n\n  <form method="post">\n    <div class="input-section">\n      <div "input-field">\n        <input id="group-name" type="text" name="group[name]" value="" placeholder="Organization">\n      </div>\n      <div class="input-field">\n        <textarea id="group-description" type="input" name="group[description]" value="" placeholder="description"></textarea>\n      </div>\n    </div>\n\n    <div class="form-footer">\n      <button type="submit" class="submit create-account-button" name="create channel">Create Group</button>\n    </div>\n  </form>\n</div>\n');}return __p.join('');};
}).call(this);
