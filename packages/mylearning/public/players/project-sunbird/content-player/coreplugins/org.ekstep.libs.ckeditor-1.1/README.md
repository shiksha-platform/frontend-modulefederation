## org.ekstep.libs.ckeditor

---

### Usage:

##### 1. Include the plugin as a dependency in the `manifest.json` file:

```json
{
    "dependencies": [
        {
            "type": "plugin",
            "plugin": "org.esktep.libs.ckeditor",
            "ver": "1.0"
        }
    ]
} 
```

##### 2. Create a `config.js` file from `config.sample.js` in `org.ekstep.ckeditor-1.0/ckeditor/` folder.

Customize the `config.js` file to modify the settings, and include/exclude the plugins needed for your implementation.

##### 3. Finally, instantiate the CKEditor on a textarea using:

```js
CKEDITOR.replace('myTextarea', {
    customConfig: ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/config.js"),
    skin: 'moono-lisa,' + CKEDITOR.basePath + "skins/moono-lisa/",
    contentsCss: CKEDITOR.basePath + "contents.css"
});
```