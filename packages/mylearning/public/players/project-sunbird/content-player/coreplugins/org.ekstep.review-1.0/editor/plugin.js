/**
 *
 * plugin to send content for review
 * @class reviewContent
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Gourav More <gourav_m@tekditechnologies.com>
 * @listens org.ekstep.review:show
 */

org.ekstep.contenteditor.basePlugin.extend({
    /**
     * This explains the type of the plugin
     * @member {String} type
     * @memberof review
     */
    type: "review",
    /**
     *   registers events
     *   @memberof review
     */
    initialize: function() {
        /**Add event listeners**/
        ecEditor.addEventListener(this.manifest.id + ":review", this.review, this);
        ecEditor.addEventListener(this.manifest.id + ":show", this.loadHtml, this);
        ecEditor.addEventListener(this.manifest.id + ":showDialog", this.showDialog, this);
        ecEditor.addEventListener(this.manifest.id + ":showConflictDialog", this.showConflictDialog, this);

        /**load html templates**/
        var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/review.html");
        var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/reviewapp.js");
        var conflictNgModuleTemplatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/reviewConflictDialog.html");
        var ngModuleTemplatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/editMetaDialog.html");

        /**get ngModule service**/
        ecEditor.getService('popup').loadNgModules(templatePath, controllerPath);
        ecEditor.getService('popup').loadNgModules(ngModuleTemplatePath);
        ecEditor.getService('popup').loadNgModules(conflictNgModuleTemplatePath);
    },
    /**
     *   load html template to show the popup
     *   @param event {Object} event
     *   @memberof review
     */
    loadHtml: function(event) {
        var instance = this;
        instance.contentObj = ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId'));
        ecEditor.getService('popup').open({
            template: 'org.ekstep.review.html',
            controller: 'reviewcontroller',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return instance;
                },
            },
            width: 900,
            showClose: false,
            className: 'ngdialog-theme-default'
        });
    },
    /**
     *   Function to validate to reivew content
     *   @param event {Object} event
     *   @memberof review
     */
    review: function(event) {
        var instance = this;
        var isValid = 1,
            fieldsToFill = [],
            mandatoryFields = {
                "appIcon": "Lesson Icon",
                "name": "Title",
                "description": "Description",
                "contentType": "Lesson Type",
                "language": "Language",
                "domain": "Domain",
                "owner": "Author",
                "ageGroup": "Age Group",
                "gradeLevel": "Grades"
            };

        instance.contentObj = ecEditor.getService('content').getContentMeta(ecEditor.getContext('contentId'));
        /**Check for mandatory fields**/
        if (instance.contentObj['name'] == "Untitled lesson") {
            isValid = 0;
            fieldsToFill.push('Title');
        }

        if (instance.contentObj['description'] == "Write a short description of your lesson") {
            isValid = 0;
            fieldsToFill.push('Description');
        }
        
        ecEditor._.each(mandatoryFields, function(value, key) {
            if (typeof instance.contentObj[key] == 'undefined' || instance.contentObj[key] == "") {
                isValid = 0;
                fieldsToFill.push(value);
            } else if (Array.isArray(instance.contentObj[key]) && instance.contentObj[key].length == 0) {
                isValid = 0;
                fieldsToFill.push(value);
            }
        });

        if (isValid == 1) {
            instance.loadHtml(instance);
        } else {
            /**If madatory fields are not fill then show error message**/
            ecEditor.dispatchEvent('org.ekstep.review:showDialog', {
                dialogMainText: "Please fill in the following mandatory details.",
                dialogSubtext: fieldsToFill,
                isRedirect: true,
                isError: true
            });
        }
    },
    /**
     *   load html template to show the dialogbox
     *   @param event {Object} event
     *   @param data {Object} data
     *   @memberof review
     */
    showDialog: function(event, data) {
        var instance = this;
        var modalController = function($scope) {
            $scope.dialogMainText = data.dialogMainText;
            $scope.dialogSubtext = data.dialogSubtext;
            $scope.isRedirect = data.isRedirect;
            $scope.redirectToHome = instance.redirectToHome;
            $scope.isError = data.isError;
            $scope.editContentMeta = function() {
                ecEditor.dispatchEvent('org.ekstep.ceheader:meta:edit');
            }
        };
        ecEditor.getService('popup').open({
            template: 'org.ekstep.review.editMetaDialog.html',
            controller: ['$scope', modalController],
            showClose: false,
            className: 'ngdialog-theme-default'
        });

        if (!data.isError) {
            setTimeout(function() {
                instance.redirectToHome();
            }, 1000);
        }
    },
    /**
     *   show conflict dialog box
     *   @param event {Object} event
     *   @param data {Object} data
     *   @memberof review
     */
    showConflictDialog: function(event) {
        var instance = this;
        var modalController = function($scope) {
            $scope.redirectToHome = instance.redirectToHome;
        };
        ecEditor.getService('popup').open({
            template: 'org.ekstep.review.reviewConflictDialog.html',
            controller: 'reviewcontroller',
            controllerAs: '$ctrl',
            resolve: {
                'instance': function() {
                    return instance;
                },
            },
            showClose: false,
            className: 'ngdialog-theme-plain reviewConflict'
        });
    },
    /**
     *   redirect to home page
     *   @memberof review
     */
    redirectToHome: function() {
        window.location.href = org.ekstep.contenteditor.globalContext.baseURL;
    }
});
//# sourceURL="reviewplugin.js"
