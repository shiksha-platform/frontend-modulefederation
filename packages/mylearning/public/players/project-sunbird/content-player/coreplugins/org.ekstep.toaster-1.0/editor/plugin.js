org.ekstep.contenteditor.basePlugin.extend({
    initialize: function(config) {
        var _default = {
            resetOnHover: true,
            icon: 'material-icons',            
            onOpening: function() {                
            },
            onClosing: function() {                
            }
        };
        config = config || _default;
        iziToast.settings(config);
        ecEditor.addEventListener('org.ekstep.toaster:show', this.show, this);
        ecEditor.addEventListener('org.ekstep.toaster:warning', this.warning, this);
        ecEditor.addEventListener('org.ekstep.toaster:error', this.error, this);
        ecEditor.addEventListener('org.ekstep.toaster:info', this.info, this);
        ecEditor.addEventListener('org.ekstep.toaster:success', this.success, this);
    },
    show: function(event, data) {
    	if(!data) return false;
    	iziToast.show(data);
    },
    warning: function(event, data) {
    	if(!data) return false;
    	iziToast.warning(data);	
    },
    info: function(event, data) {
    	if(!data) return false;
    	iziToast.info(data);	
    },
    success: function(event, data) {
    	if(!data) return false;
    	iziToast.success(data);	
    },
    error: function(event, data) {
    	if(!data) return false;
    	iziToast.error(data);	
    }
});

//# sourceURL=toasterplugin.js
