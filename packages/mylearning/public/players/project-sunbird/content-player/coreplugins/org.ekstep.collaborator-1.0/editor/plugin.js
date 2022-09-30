/**
 *
 * plugin for add collaborator to contents
 * @class collaborator
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Gourav More <gourav_m@tekditechnologies.com>
 * @listens collaborator:add
 */
org.ekstep.contenteditor.basePlugin.extend({
    /**
     *   @member type {String} plugin title
     *   @memberof collaborator
     *
     */
    type: 'collaborator',
    /**
     *   registers events
     *   @memberof collaborator
     *
     */
    initialize: function() {
        ecEditor.addEventListener("collaborator:add", this.addCollaborator, this);
        var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/popup.html");
        ecEditor.getService('popup').loadNgModules(templatePath);
    },
    /**
     *   Load userlist to add collaborators
     *   @param event {Object} event object from event bus.
     *   @param data {Object} ecml
     *   @memberof collaborator
     */
    addCollaborator: function(event, data) {
        this.showPreview(function() {
            ecEditor.jQuery('#colUsersDropdown').dropdown({
                apiSettings: {
                    url: ecEditor.getConfig('baseURL')+'/index.php?option=com_ekcontent&task=contentform.getUsersToInvite&id=' + window.context.id + '&isEditor=true&search={query}',
                    cache: true
                },
                saveRemoteData: true,
                fields: {
                    remoteValues: 'results',
                    values: 'values',
                    name: 'name',
                    text: 'text',
                    value: 'value'
                },
                forceSelection: false
            });
        });
        this.collaboratorsInfo();
    },
    /**
     *   load html template to show the popup
     *   @memberof collaborator
     */
    showPreview: function(callback) {
        var instance = this;
        var modalController = function($scope) {
            $scope.getUrlLink = instance.getUrlLink;
            $scope.viewContentLink = window.context.viewContentLink;
            $scope.sendInvites = instance.sendInvites;
            instance.copyAnswer = 'Copy';
            $scope.copyAnswer = instance.copyAnswer;
            $scope.notifyUser = instance.notifyUser;
            $scope.contentId = window.context.id;
            $scope.collaborators = instance.collaborators;
            $scope.loading = instance.loading;
            $scope.isLoading = instance.isLoading;
            $scope.isError = instance.isError;

            $scope.$on('ngDialog.opened', function(e, $dialog) {
                callback();
            });
        };

        ecEditor.getService('popup').open({
            template: 'partials_org.ekstep.collaborator.html',
            controller: ['$scope', modalController],
            showClose: false,
            width: 900,
            className: 'ngdialog-theme-default'
        });
    },
    /**
     *   function to copy content preview link
     *   @memberof collaborator
     */
    getUrlLink: function() {
        var instance = this;
        ecEditor.jQuery("#copyTarget").select();

        try {
            var successful = document.execCommand('copy');
            successful ? instance.copyAnswer = 'Copied!' : instance.copyAnswer = 'Unable to copy!';
        } catch (err) {
            instance.copyAnswer = 'Unsupported Browser!';
        }
    },
    /**
     *   form validation
     *   @memberof collaborator
     */
    sendInvites: function() {
        var instance = this;
        ecEditor.jQuery('#colInviteForm')
            .form({
                inline: true,
                fields: {
                    inviteUsers: {
                        identifier: 'inviteUsers',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please select usernames'
                        }]
                    },
                    invite_msg: {
                        identifier: 'invite_msg',
                        rules: [{
                            type: 'empty',
                            prompt: 'Invite message should not be blank'
                        }]
                    },
                },
                onSuccess: function(event, fields) {
                    instance.notifyUser(event, fields);
                },
                onFailure: function(formErrors, fields) {
                    console.log("fields validation failed");
                    return false;
                }
            });
    },
    /**
     *   send notification email to collaborators
     *   @param event {Object} event object.
     *   @param data {Object} data
     *   @memberof collaborator
     */
    notifyUser: function(event, fields) {
        var instance = this;
        ecEditor.jQuery.ajax({
            url: ecEditor.getConfig('baseURL')+'/index.php?option=com_ekcontent&task=contentform.inviteUsers',
            headers: {
                'x-auth': 'session'
            },
            type: "POST",
            data: fields,
            async: false,
            beforeSend: function() {
                instance.loading = 'active';
                instance.isLoading = true;
                instance.isError = false;
                ecEditor.ngSafeApply(ecEditor.getAngularScope());
            },
            success: function(result) {
                if (result == true) {
                    instance.isLoading = false;
                    ecEditor.jQuery('.collaborator_msg').transition('drop');
                    ecEditor.ngSafeApply(ecEditor.getAngularScope());
                } else {
                    instance.isError = true;
                    ecEditor.jQuery('.collaborator_msg').transition('drop');
                    ecEditor.ngSafeApply(ecEditor.getAngularScope());
                }
            },
            error: function() {
                console.log("Error");
            }
        });
    },
    /**
     *   get already invited collaborators info
     *   @memberof collaborator
     */
    collaboratorsInfo: function() {
        var instance = this;

        ecEditor.jQuery.ajax({
            url: ecEditor.getConfig('baseURL')+'/index.php?option=com_api&app=ekcontent&resource=collaborator&format=raw',
            headers: {
                'x-auth': 'session'
            },
            type: "GET",
            data: { id: window.context.id },
            async: false,
            success: function(results) {
                if (results) {
                    instance.collaborators = results.result.collaborators;
                } else {
                    instance.collaborators = null;
                }
            },
            error: function() {
                console.log("Error");
            }
        });
    }
});

//# sourceURL=collaboratorplugin.js
