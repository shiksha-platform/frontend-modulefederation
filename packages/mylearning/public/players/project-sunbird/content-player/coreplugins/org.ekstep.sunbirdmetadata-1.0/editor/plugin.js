/**
 * @description sunbird metada plugin
 * @extends org.ekstep.collectioneditor.basePlugin
 * @since 1.0
 * @author Kartheek Palla And Manjunath Davanam
 */

org.ekstep.contenteditor.metadataPlugin.extend({
    /**
     * @property    - Form object which contains field details with framework and resource bundle
     */
    form: {},

    /**
     * @property    - Resource Bundle object.
     */
    resourceBundle: {},

    /**
     * @property     - Framwork association object which is used to map the relationship between fields. eg:(Grade, class)
     */
    framework: {},

    /**
     * @property     - Form configuration object
     */
    config: {},

    /**
     * @property     - map the response
     */
    mappedResponse: {},

    /**
     * @property      - List of are event are mapped with the action
     */
    eventMap: { savemeta: 'org.ekstep.contenteditor:save:meta', review: 'org.ekstep.contenteditor:review', save: 'org.ekstep.contenteditor:save', close: 'org.ekstep.collectioneditor:content:notfound' },

    /**
     * 
     */
    options: {
        savingPopup: false,
        successPopup: true,
        failPopup: true,
        contentMeta: {},
        showNotification: true,
        callback: undefined
    },

    /**
     * @description    - Initialization of the plugin.
     */
    initialize: function() {
        var instance = this
        ecEditor.addEventListener('editor:form:cancel', this.cancelAction, this)
        ecEditor.addEventListener('editor:form:success', this.successAction, this)
        ecEditor.addEventListener('editor:form:change', this.onConfigChange, this)
        ecEditor.addEventListener('editor:form:reset', this.resetFields, this)
        ecEditor.addEventListener('org.ekstep.editcontentmeta:showpopup', this.invoke, this)
        ecEditor.addEventListener('editor:form:getconfig', this.returnConfigs, this)

    },

    /**
     * @description   - to render metadata form
     */
    invoke: function(event, config) {
        var instance = this;
        instance.model = config.metadata;
        instance.editMode = config.editMode;
        if (!this.isConfigurationsExists(config.subType, config.action)) {
            this.getConfigurations(config, function(error, res) {
                if (res) {
                    instance.mapResponse(config.subType, config.action, { resourceBundle: res.resourceBundle, framework: res.framework.data.result.framework, formConfig: res.config.data.result.form.data })
                    instance.renderForm(config.popup, { resourceBundle: res.resourceBundle, framework: res.framework.data.result.framework, formConfig: res.config.data.result.form.data })
                } else {
                    console.error('Fails to render', error)
                }

            })
        } else {
            var mappedRes = instance.getMappedResponse(config.subType, config.action)
            instance.renderForm(config.popup, { resourceBundle: mappedRes.resourceBundle, framework: mappedRes.framework, formConfig: mappedRes.formConfig })
        }
    },


    /**
     * @description         - When field value changes. Currenlty, Event is dispatching
     *                        only when drop down value changes
     */
    onConfigChange: function(event, object) {},

    /**
     * @event           -'editor:form:success'
     *
     * @description     - Which is used to perform the save/review actions when form is submitted.
     *                    Which is currently handles 'review` and `save' action
     */
    successAction: function(event, data) {
        var instance = this
        if (data.isValid) {
            if (data.formData.metaData.mimeType === 'application/vnd.ekstep.content-collection') this.updateState(data.formData)
                // Callback function
            var callbackFn = function(err, res) {
                if (res && res.data && res.data.responseCode == 'OK') {
                    data.callback && data.callback(undefined, res)
                } else {
                    data.callback && data.callback(err, undefined)
                }
            }
            switch (this.config.action) {
                case 'review':
                    this.reviewContent(data.formData.metaData, callbackFn)
                    break
                case 'save':
                    this.saveMeta(data.formData.metaData, callbackFn)
                    break
                default:
                    ecEditor.dispatchEvent("editor:form:data", data);
            }
        } else {
            throw 'Invalid form data'
        }
    },

    /**
     * @description                 - Which is used send the content to review status
     *                                Before sending the content it will update the content
     * @param {Object} options      - which should have properties related to notification.
     *
     * @param {Fn} callbackFn       - Callback function
     */
    reviewContent: function(data, callbackFn) {
        var instance = this
        var saveCallBackFn = function(err, res) {
            if (!err) {
                ecEditor.dispatchEvent(instance.eventMap[instance.config.action], reviewCallBackFn)
            } else {
                throw 'Unable to update the fields value before sending to review status'
                callbackFn(err)
            }
        }
        var reviewCallBackFn = function(err, res) {
            if (!err) {
                ecEditor.dispatchEvent(instance.eventMap['close']);
            }
            callbackFn()
        }
        this.saveContent(data, saveCallBackFn)
    },

    /**
     * @description              - Which is used to update the content
     *
     * @param {Object} options      - which should have properties related to notification.
     *
     * @param {Fn} callbackFn       - Callback function
     */
    saveMeta: function(contentMeta, callbackFn) {
        this.options.contentMeta = contentMeta
        this.options.callback = callbackFn
        ecEditor.dispatchEvent(this.eventMap['savemeta'], this.options)
    },

    /**
     * @description     - save meta data
     */
    saveContent: function(contentMeta, callbackFn) {
        switch (contentMeta.mimeType) {
            case 'application/vnd.ekstep.content-collection':
            case 'application/vnd.ekstep.ecml-archive':
                this.options.contentMeta = contentMeta
                this.options.callback = callbackFn
                ecEditor.dispatchEvent(this.eventMap['save'], this.options)
                break
            default:
                this.options = contentMeta
                this.options.callback = callbackFn
                ecEditor.dispatchEvent(this.eventMap['save'], this.options);
        }
    },

    /**
     * @description              - When cancel action is invoked
     *
     * @event                    - 'editor:form:cancel'
     *
     * @param {Object} data      - Which contains a callback method and other options
     */
    cancelAction: function(event, data) {
        data.callback && data.callback()
    },

    /**
     * @description             - Which get the form configurations, framework and resource bundle data
     *                            Which makes async parallel call.
     */
    getConfigurations: function(request, callback) {
        var instance = this
        async.parallel({
            config: function(callback) {
                // get the formConfigurations data
                org.ekstep.services.configuration.getFormConfigurations({ request: request }, function(error, response) {
                    if (!error) callback(undefined, response)
                    else callback(error, undefined)
                        //callback(undefined, window.formConfigurations)
                })
            },
            framework: function(callback) {
                // get the framworkData
                var metaData = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId'))
                var frameworkId = request.framework || metaData.framework;
                ecEditor.getService(ServiceConstants.META_SERVICE).getCategorys(frameworkId, function(error, response) {
                    if (!error) callback(undefined, response)
                    else callback(error, undefined)
                })
            },
            resourceBundle: function(callback) {
                // get the resource bundle data
                callback(undefined, {})
            }
        }, function(error, response) {
            // results is now equals to: {config: {}, framework: {}, resourceBundle:{}}
            if (error) {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: 'Unable to open form!',
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
            }
            callback(error, response)
        })
    },

    /**
     * @description             - Which returns the current form object.
     *
     * @returns {Object}
     */
    getFields: function() {
        return this.form
    },

    /**
     *
     *
     */
    getTemplate: function() {
        return this.config.templateName
    },

    /**
     * @description             - Which is used to render the form with the configurations.
     *
     * @param {Object} formObj  - Form object it should have configurations, resourceBundle, framework object
     *
     * @example                 - {resourceBundle:{},framework:{},config:{}}
     */
    renderForm: function(isPopup, config) {
        var instance = this;
        this.resourceBundle = config.resourceBundle
        this.framework = config.framework
        this.config = config.formConfig
        this.form = this.mapObject(this.config.fields, this.framework.categories)
        this.loadTemplate(this.config.templateName, function(templatePath) {
            isPopup ? instance.showForm() : ecEditor.dispatchEvent("editor:template:loaded", { "templatePath": templatePath, "formAction": instance.config.action })
        })

    },

    /**
     * @description             - Which is used to set the state of form object.
     *
     * @param {Object} stateObj - It should contain the {isRoot, isNew, and form metaData information}
     */
    updateState: function(object) {
        var isNew = true
        var contentMeta = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId'))
        if (!_.isEmpty(contentMeta) && _.has(contentMeta, ['name'])) {
            isNew = false
        }
        var key = object.nodeId
        var value = {}
        value.root = object.isRoot || true // Currently, Supporting oly for root node
        value.isNew = object.isNew || isNew
        value.metadata = object.metaData
        org.ekstep.services.stateService.create('nodesModified')
        org.ekstep.services.stateService.setState('nodesModified', key, value)
    },

    /**
     * @description             - which is used to map the response
     * @param {String} type     - Should be subType @example(Textbook,course, assesment)
     * @param {String} action   - Defines the name of the action @example(review, save)
     */
    mapResponse: function(type, action, value) {
        this.mappedResponse[type + '_' + action] = value;
    },

    /**
     * @description            - Which defines is configuration is already mapped in the local object or not    
     * @return     {Boolean}
     */
    isConfigurationsExists: function(type, action) {
        return this.mappedResponse[type + '_' + action] ? true : false
    },

    /**
     * @description            - Which returns the mapped response object
     * @param {String} type     - Should be subType @example(Textbook,course, assesment)
     * @param {String} action   - Defines the name of the action @example(review, save)       -
     */
    getMappedResponse: function(type, action) {
        return this.mappedResponse[type + '_' + action]
    },


    getModel: function() {
        return this.model || ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId'));
    },

    returnConfigs: function(event, callbackFn) {
        callbackFn({ model: this.getModel(), template: this.config.templateName || this.DEFAULT_TEMPLATE_NAME, fields: this.form, editMode: this.editMode })
    }
})

//# sourceURL=sunbirdMetadata.js