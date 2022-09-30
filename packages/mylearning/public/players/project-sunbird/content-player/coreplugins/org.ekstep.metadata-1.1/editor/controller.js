'use strict';
/**
 * @description     - Metadata form controller
 * @module          - 'org.ekstep.metadataform'
 */

angular.module('org.ekstep.metadataform', []).controller('metadataForm', ['$scope', function($scope) {


    /**
     * @property        - Which defines is form is submitted or not.
     */
    $scope.isSubmit = false;

    /**
     * @property        - Which holds the category List values 
     * @example         -{subject:{name:"English"},{name:"Kannada"}}
     */
    $scope.categoryList = {}


    /**
     * 
     */
    $scope.validation = {};

    /**
     * @property       - Default error message for the fields
     */
    $scope.DEFAULT_ERROR_MESSAGE = 'Invalid Input'

    /**
     * @property        - Form configurations which should contains the 'framework, config, resourceBundle' information
     */
    $scope.fields = undefined;

    /**
     * @property  - template name
     */
    $scope.tempalteName = undefined;

    /**
     * 
     */
    $scope.manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");


    /**
     * 
     */
    $scope.isNew = true;


    /**
     * 
     */
    $scope.editMode = true;


    /**
     * 
     */
    $scope.headerMessage = 'Edit Details'

    /**
     * 
     */
    $scope.validationErrorMessage = 'Please provide all required details';

    /**
     * @description          - Which is used to dispatch an event.
     * 
     * @param {String} event - Name of the event.
     * 
     * @param {Object} data  - Data which is need to pass.  
     */
    $scope.dispatchEvent = function(event, data) {
        ecEditor.dispatchEvent(event, data)
    };



    /**
     * @description     - It Initialize the dropdown with selected values
     */
    $scope.initDropdown = function(object) {
        const DROPDOWN_INPUT_TYPES = ['select', 'multiSelect'];
        _.forEach($scope.fields, function(field) {
            if (_.includes(DROPDOWN_INPUT_TYPES, field.inputType)) {
                if (field.depends && field.depends.length) {
                    $scope.getAssociations($scope.contentMeta[field.code], field.range, function(associations) {
                        var target = (object && object.target) ?  object.target : undefined;
                        $scope.applyDependencyRules(field, associations, false, target);
                    });
                }
            }
        });
        $scope.configureDropdowns(false, false);
    }

    /**
     * @description            - Which is used to update the form when vlaues is get changes
     * 
     * @param {String} event  - Name of the event.
     * 
     * @param {Object} object - Field information
     */
    $scope.onConfigChange = function(object) {
        if (object.field) {
            var type = (object.field.inputType == 'select' || object.field.inputType == 'multiselect') ? 'change' : 'click'
            object.field && logTelemetry({ type: type, subtype: object.field.inputType, target: {id: object.field.code, type:"field", ver:"" }}, $scope.manifest);
        };
        if(object.target) {
            object.target = $(object.target).find('#content-meta-form').scope();
        } else {
            object.target = $('#content-meta-form').scope();
        }
        if(object.target.isSubmit){
            var validationStatus = $scope.isValidInputs(object);
            !validationStatus && $scope.updateErrorMessage(object);
        }
        $scope.updateForm(object);
        
    }

    /**
     * @description            - Which is used to update the form when vlaues is get changes
     * 
     * @param {Object} object  - Field information
     */
    $scope.updateForm = function(object) {
        if (object.field && object.field.range) {
            $scope.getAssociations(object.value, object.field.range, function(associations) {
                $scope.applyDependencyRules(object.field, associations, true, '#'+object.target.tempalteName);
            });
        }
    };

    /** 
     * @description                    - Which is used to get the association object by mapping key and range object
     * 
     * @param {String | Array} keys    - To the associactio object for particular key's
     * 
     * @param {Object} range           - Which refers to framework terms/range object
     */
    $scope.getAssociations = function(keys, range, callback) {
        var names = [];
        var associations = [];
        var filteredAssociations = [];
        if (_.isString(keys)) {
            names.push(keys);
        } else {
            names = keys
        }
        _.filter(range, function(res) {
            _.forEach(names, function(value, key) {
                if (res.name === value) {
                    filteredAssociations.push(res)
                }
            });
        });
        _.forEach(filteredAssociations, function(val, index) {
            if (val.associations) {
                _.forEach(val.associations, function(key, value) {
                    associations.push(key);
                })
            }
        });
        callback && callback(associations);
    }

    /**
     * @description                    - Which is used to resolve the dependency. 
     * 
     * @param {Object} field           - Which field need need to get change.
     * 
     * @param {Object} associations    - Association values of the respective field.
     * 
     * @param {Boolean} resetSelected  - @default true Which defines while resolving the dependency dropdown
     *                                   Should reset the selected values of the field or not
     */
    $scope.applyDependencyRules = function(field, associations, resetSelected, target) {
        //reset the depended field first
        // Update the depended field with associated value
        // Currently, supported only for the dropdown values
        ecEditor.dispatchEvent("editor:field:association", {'field': field, 'resetSelected': resetSelected, 'target': target});
        var dependedValues, groupdFields;
        if (field.depends && field.depends.length) {
            _.forEach(field.depends, function(id) {
                resetSelected && $scope.resetSelectedField(id);
                dependedValues = _.map(associations, i => _.pick(i, ['name', 'category']))
                groupdFields = _.chain(dependedValues)
                    .groupBy('category')
                    .map((name, category) => ({ name, category }))
                    .value();
                if (groupdFields.length) {
                    _.forEach(groupdFields, function(value, key) {
                        $scope.updateDropDownList(value.category, _.map(value.name, i => _.pick(i, 'name')));
                        $scope.$safeApply();
                    })
                } else {
                    $scope.updateDropDownList(id, [])
                    $scope.$safeApply();
                }
            });
        }


    }


    /**
     * @description            - Which updates the drop down value list 
     *                           If the specified values are empty then drop down will get update with master list
     * @param {Object} field   - Field which is need to update.
     * 
     * @param {Object} values  - Values for the field
     */
    $scope.updateDropDownList = function(fieldCode, values) {
        if (values.length) {
            $scope.categoryList[fieldCode] = _.unionBy(values, 'name');
        } else {
            $scope.mapMasterCategoryList($scope.fields, fieldCode);
        }
    }

    /**
     * @description             - Which is used to get fixedLayout section and Dynamic section layout fields
     * 
     * @returns {Object}        - Which returns object which contains both fixedLayout and dynamicLayout configurations
     */
    $scope.getLayoutConfigurations = function() {
        var FIXED_FIELDS_CODE = this.getFixedFieldCode($scope.tempalteName);
        var fixedLayout = [];
        var dynamicLayout = [];
        _.map($scope.fields, function(field) {
            if (field.validation) {
                _.forEach(field.validation, function(value, key) {
                    if (value.type === 'regex') {
                        value.value = new RegExp(value.value);
                    }
                    field.validation[value.type] = value;
                })
            }
            if (_.includes(FIXED_FIELDS_CODE, field.code)) {
                fixedLayout.push(field)
            } else {
                dynamicLayout.push(field);
            }
        });
        return { fixedLayout: fixedLayout, dynamicLayout: dynamicLayout };
    };

    $scope.submit = function(form) {
        $scope.success(undefined, { form: form, scope: $scope });
    };

    /** 
     * @description - Which is used to invoke an action on click of the submit button.
     * 
     * @fires       - 'editor:form:success'
     */
    $scope.success = function(event, object) {
        logTelemetry({
            id: "save",
            type: 'click',
            subtype: 'button',
            target: {id:'save',type:"button",ver:""}
        }, $scope.manifest);
        $scope.isSubmit = true;
        if(object.target) {
            object.target = $(object.target).find('#content-meta-form').scope();
        } else {
            object.target = $('#content-meta-form').scope();
        }
        var validationStatus = $scope.isValidInputs(object);
        if(!validationStatus){
            $scope.updateErrorMessage(object);
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: $scope.messages.validationError || $scope.validationErrorMessage,
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
        }
        var successCB = function(err, res) {
                if (res) {
                    // success toast message which is already handled by content editor function plugin
                    console.info("Data is saved successfully.", res)
                } else {
                    console.error("Fails to save the data", err);
                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        message: 'Unable to update the content, Please try again!',
                        position: 'topCenter',
                        icon: 'fa fa-warning'
                    });
                }
                $scope.closeThisDialog();
            }
            // TODO: Scope of metaform was not lossing  when state was changing
            // Need to check the below logic
        var form = {};
        form.metaData = getUpdatedMetadata(object.target.contentMeta, $scope.originalContentMeta, $scope.fields);
        form.nodeId = org.ekstep.contenteditor.api.getContext('contentId');
        form.target = object.target;
        ecEditor.dispatchEvent('editor:form:success', {
            isValid: validationStatus,
            formData: form,
            callback: successCB
        })
    };

    /**
     * 
     * @description             - Which is used to show an error message to resepective field 
     */
    $scope.updateErrorMessage = function(formObj) {
        var form = formObj.form;
        var errorKeys = undefined;

        var scope = formObj.target;
        scope.isSubmit = true;
        _.forEach(scope.fields, function(value, key) {
            if (form[value.code] && form[value.code].$invalid) {
                scope.validation[value.code] = {}
                switch (_.keys(form[value.code].$error)[0]) {
                    case 'pattern': // When input validation of type is regex
                        scope.validation[value.code]["errorMessage"] = value.validation.regex.message;
                        break;
                    case 'required': // When input validation of type is required
                        scope.validation[value.code]["errorMessage"] = 'Please Input a value';
                        break;
                    case "maxlength": // When input validation of type is max
                        scope.validation[value.code]["errorMessage"] = value.validation.max.message;
                        break;
                    default:
                        scope.validation[value.code]["errorMessage"] = "Invalid Input";
                }
            }
        });
    }

    /** 
     * @description      -   Which is used take a action on click of the cancel button.
     * 
     * @fires            -   'editor:form:cancel'
     */
    $scope.cancel = function() {
        // Note: Reset the all selected fields (If required)
        logTelemetry({ id: "cancel", type:'click', subtype: 'button', target:{id:'close',type:"button", ver:"" }}, $scope.manifest);
        ecEditor.dispatchEvent('editor:form:cancel', { callback: $scope.closeThisDialog })
    }

    /** 
     * @description         - Which is used to restore the dropdown slected value.
     * 
     * @param {String} id   - To restore the specific dropdown field value 
     */
    $scope.resetSelectedField = function(id) {
        setTimeout(function() {
            $('#_select' + id).dropdown('clear');
            _.forEach($scope.fields, function(field, value) {
                if (field.code === id && field.dataType === 'list'){
                    $scope.contentMeta[id] = [];
                }else if(field.code === id){
                    $scope.contentMeta[id] = undefined;
                }
            });
            $scope.$safeApply();
        }, 0)
    }


    /**
     * 
     * @description                     - Which is used to map with the master framework list
     * 
     * @param {Object} configurations   - Field configurations
     * 
     * @param {String} key              - Field uniq code value
     */
    $scope.mapMasterCategoryList = function(configurations, key) {
        _.forEach($scope.fields, function(field, value) {
            if (key) {
                if (field.code === key) {
                    $scope.categoryList[field.code] = field.range
                }
            } else {
                field.range && ($scope.categoryList[field.code] = field.range);
            }
        })
    }

    /**
     * @description                      - Which is used to configure the symantic ui drop down
     *                                     to enable/disable the force selection field and multiSelect fields with tags format 
     *
     * @param {Boolean} labels           - @default false Which defines the MultiSelect should be tag format design or not
     * 
     * @param {Boolean} forceSelection   - @default false Which defines the force selection should enalbe or not
     */
    $scope.configureDropdowns = function(labels, forceSelection) {
        // TODO: Need to remove the timeout
        setTimeout(function() {
            $(".ui.dropdown").dropdown({
                useLabels: labels,
                forceSelection: forceSelection
            });
            _.find($scope.fields, ['code', "dialcode"]) && invokeDialCode();
            $scope.$safeApply();
        }, 0)
    }

    /** 
     * @description - Initialization of the controller
     *              - Which partions the fixedLayout and dynamic layout section fields
     */
    $scope.init = function() {
        !EventBus.hasEventListener('metadata:form:onsuccess') && ecEditor.addEventListener('metadata:form:onsuccess', $scope.success, $scope);
        !EventBus.hasEventListener('metadata:form:oncancel') && ecEditor.addEventListener('metadata:form:oncancel', $scope.cancel, $scope);
        !EventBus.hasEventListener('metadata:form:getdata') && ecEditor.addEventListener('metadata:form:getdata', $scope.getScopeMeta, $scope);
        var callbackFn = function(config) {
            $scope.fields = config.fields;
            $scope.messages = config.messages || {};
            $scope.tempalteName = config.template;
            if (_.isUndefined(config.editMode)) {
                config.editMode = true
            }
            $scope.editMode = config.editMode;
            if (!$scope.editMode) {
                $scope.headerMessage = 'View Details'
            }
            var field = undefined;
            _.forEach($scope.fields, function(value, key) {
                value.editable = $scope.editMode;
            });
            // Currently, Dropdown value is coming as array of string ex: Audience: ["Learner"]
            // this fails to show the value in the dropdown hence converting value to string format
            _.forEach(config.model, function(value, key) {
                field = _.find($scope.fields, ['code', key]);
                if (field && field.inputType == 'select') {
                    // converting array of value to string format only for the case of `SELECT` inputType dropdown
                    config.model[key] = convertToDataType('TEXT', value);
                }
            });
            $scope.contentMeta = config.model;
            $scope.originalContentMeta = _.clone($scope.contentMeta);
            var layoutConfigurations = $scope.getLayoutConfigurations();
            $scope.fixedLayoutConfigurations = _.uniqBy(layoutConfigurations.fixedLayout, 'code');
            $scope.dynamicLayoutConfigurations = _.sortBy(_.uniqBy(layoutConfigurations.dynamicLayout, 'code'), 'index');
            $scope.mapMasterCategoryList($scope.fields);
        }
        ecEditor.dispatchEvent("editor:form:getconfig", callbackFn);
    };

    $scope.getFixedFieldCode = function(tempalteName) {
        var map = { 'defaultTemplate': ["name", "description", "keywords", "appicon"] }
        return map[$scope.tempalteName] || {}
    }

    $scope.isValidInputs = function(object) {
        var scope = object.target;
        var isValid = true;
        var appIconConfig = _.filter(scope.fields, { 'code': 'appicon' })[0];
        var conceptSelector = _.filter(scope.fields, { 'code': 'concepts' })[0]
        var topicSelector = _.filter(scope.fields, { 'code': 'topic' })[0];
        if (appIconConfig && appIconConfig.visible && appIconConfig.required && !scope.contentMeta['appIcon']) {
            isValid = false;
        };
        if (conceptSelector && conceptSelector.required && !_.size(scope.contentMeta['concepts'])) {
            isValid = false
        }
        if (topicSelector && topicSelector.required && !_.size(scope.contentMeta['topic'])) {
            isValid = false
        }
        return (object.form.$valid && isValid) ? true : false
    };

    $scope.getScopeMeta = function(event, object) {
        
        if(object.target) {
            object.target = $(object.target).find('#content-meta-form').scope();
        } else {
            object.target = $('#content-meta-form').scope();
        }
        
        var returnData = object.target.contentMeta || {};
        object.callback && object.callback(returnData);
        return returnData;
    };

    $scope.resetAllFilters = function(){  
        _.forEach($scope.dynamicLayoutConfigurations, function(field) {
            $scope.contentMeta[field.code] = [];
            if(field.code === 'topic')
                ecEditor.dispatchEvent('editor.topic.change', {key: 'topic', value: []});
            if(field.code === 'concepts')
                ecEditor.dispatchEvent('editor.concept.change', {key: 'concepts', value: []});
            $scope.$safeApply();
        });
    }
    $scope.init()

}]);

//# sourceURL=metadataController.js