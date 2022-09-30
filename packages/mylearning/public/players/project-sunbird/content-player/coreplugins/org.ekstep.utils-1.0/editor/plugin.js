/**
 * 
 * plugin to add utilities to other plugins
 * @class Utils
 * @extends org.ekstep.contenteditor.basePlugin
 *
 * @author Harish Kumar Gangula <harishg@ilimi.in>
 * @listens copy:copyItem
 * @listens copy:copyItem
 * @listens reorder:bringforward
 * @listens reorder:sendbackward
 * @listens delete:invoke
 * @listens object:selected
 * @listens object:unselected
 *
 */
org.ekstep.contenteditor.basePlugin.extend({
    type: "utils",
    picker: undefined,
    /**
     *   @member clipboard {Object}
     *   @memberof Utils
     *
     */
    clipboard: undefined,
    activeGroup: undefined,
    initialize: function() {
        var instance = this;
        ecEditor.addEventListener("reorder:bringforward", this.bringforward, this);
        ecEditor.addEventListener("reorder:bringfront", this.bringfront, this);
        ecEditor.addEventListener("reorder:sendbackward", this.sendbackward, this);
        ecEditor.addEventListener("reorder:sendback", this.sendback, this);
        ecEditor.addEventListener('copy:copyItem', this.copyItem, this);
        ecEditor.addEventListener('paste:pasteItem', this.pasteItem, this);
        ecEditor.addEventListener("delete:invoke", this.deleteObject, this);
        ecEditor.addEventListener("object:selected", this.objectSelected, this);
        ecEditor.addEventListener("object:unselected", this.objectUnSelected, this);
    },
    /**
     *
     *   send the object to front in the canvas
     *   fires the object:modified event to update stage and renders
     *   @memberof Utils
     */
    bringfront: function(event, data) {
        ecEditor.getCanvas().bringToFront(ecEditor.getEditorObject());
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', { id: ecEditor.getEditorObject().id });
    },
    /**
     *
     *   send the object to last in the canvas
     *   fires the object:modified event to update stage and renders
     *   @memberof Utils
     */
    sendback: function(event, data) {
        ecEditor.getCanvas().sendToBack(ecEditor.getEditorObject());
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', { id: ecEditor.getEditorObject().id });
    },
    /**
     *
     *   send the object to one step front in the canvas
     *   fires the object:modified event to update stage and renders
     *   @memberof Utils
     */
    bringforward: function(event, data) {
        ecEditor.getCanvas().bringForward(ecEditor.getEditorObject());
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', { id: ecEditor.getEditorObject().id });
    },
    /**
     *
     *   send the object to one step back in the canvas
     *   fires the object:modified event to update stage and renders
     *   @memberof Utils
     */
    sendbackward: function(event, data) {
        ecEditor.getCanvas().sendBackwards(ecEditor.getEditorObject());
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', { id: ecEditor.getEditorObject().id });
    },
    /**
     *
     *   get current active plugin instance from stage to copy
     *   update context menu to show paste icon
     *   @memberof Utils
     */
    copyItem: function() {
        this.clipboard = _.cloneDeep(ecEditor.getCurrentObject() ? ecEditor.getCurrentObject() : ecEditor.getCurrentGroup());
        this.activeGroup = ecEditor.getCanvas().getActiveGroup() && ecEditor.getCanvas().getActiveGroup().getObjects();
        if (this.clipboard) {
            ecEditor.updateContextMenu({ id: 'paste', state: 'SHOW', data: {} });
        }
    },
    /**
     *
     *   get copied plugin instance from clipboard and instantiate.
     *   update context menu to hide paste icon
     *   @memberof Utils
     */
    pasteItem: function() {
        var instance = this;
        if (this.clipboard) {
            if (_.isArray(this.clipboard)) {
                ecEditor.getCanvas().discardActiveGroup();
                this.clipboard.forEach(function(plugin, index) {
                    plugin.editorObj.top = instance.activeGroup[index].top + 10;
                    plugin.editorObj.left = instance.activeGroup[index].left + 10;
                    ecEditor.cloneInstance(plugin);
                });

            } else ecEditor.cloneInstance(this.clipboard);
            this.clipboard = undefined;
            ecEditor.updateContextMenu({ id: 'paste', state: 'HIDE', data: {} });
        }
    },
    /**
     *
     *   deletes the object or group from the canvas
     *   invokes remove method
     *   @memberof Utils
     */
    deleteObject: function(event, data) {
        var activeGroup = ecEditor.getEditorGroup(),
            activeObject = ecEditor.getEditorObject(),
            id, instance = this;

        if (activeGroup) {
            ecEditor.getCanvas().discardActiveGroup();
            activeGroup.getObjects().forEach(function(object) {
                instance.remove(object);
            });
        } else if (activeObject) {
            instance.remove(activeObject);
        }
    },
    /**
     *
     *   it is invoked on object delete
     *   @memberof Utils
     */
    remove: function(object) {
        ecEditor.dispatchEvent('delete:invoked', { 'editorObj': ecEditor.getPluginInstance(object.id).attributes });
        ecEditor.getCanvas().remove(object);
        ecEditor.dispatchEvent('stage:modified', { id: object.id });
    },
    /**
     *
     *   on selection of the object it is invoked and updates the context menu
     *   @memberof Utils
     */
    objectSelected: function(event, data) {
        ecEditor.updateContextMenus([{ id: 'reorder', state: 'SHOW', data: {} },
            { id: 'copy', state: 'SHOW', data: {} },
            { id: 'delete', state: 'SHOW', data: {} }
        ]);
    },
    /**
     *
     *   on Unselection of the object it is invoked and updates the context menu
     *   @memberof Utils
     */
    objectUnSelected: function(event, data) {
        ecEditor.updateContextMenus([{ id: 'reorder', state: 'HIDE', data: {} },
            { id: 'copy', state: 'HIDE', data: {} },
            { id: 'delete', state: 'HIDE', data: {} }
        ]);
    }
});
//# sourceURL=utilsplugin.js