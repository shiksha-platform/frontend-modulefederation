'use strict';

angular.module('org.ekstep.review', [])
    .controller('reviewcontroller', ['$scope', '$injector', 'instance', function($scope, $injector, instance) {
        var ctrl = this;

        /**Set contentMeta object to display info in send for review popup**/
        ctrl.contentMeta = instance.contentObj;

        /**Show dialog messages**/
        ctrl.showReviewMsg = function(dialogMsg, responseMsg) {
            if (ctrl.success) {
                ecEditor.dispatchEvent('org.ekstep.review:showDialog', {
                    dialogMainText: 'Sent for reivew Successfully..!!',
                    dialogSubtext: 'Redirecting to HomePage...',
                    isRedirect: false,
                    isError: false
                });
            } else {
                ecEditor.dispatchEvent('org.ekstep.review:showDialog', {
                    dialogMainText: dialogMsg,
                    dialogSubtext: '',
                    isRedirect: false,
                    isError: true
                });
            }
        }

        ctrl.saveBeforeReview = function() {
            ctrl.message = "Saving content";
            ctrl.active = "active";
            ctrl.isLoading = true;
            ctrl.success = false;
            ctrl.success_msg = "";
            ecEditor.dispatchEvent('org.ekstep.contenteditor:save', {
                savingPopup: false,
                successPopup: false,
                failPopup: true,
                callback: function(err, res) {
                    ctrl.isLoading = false;
                    ctrl.active = '';
                    if (res && res.data && res.data.responseCode == "OK") {
                        ctrl.sendForReview();
                    }
                }
            });
        }

        /**Close send for reivew popup after success messages**/
        ctrl.closeThisDialog = function(success) {
            if (success) {
                $scope.closeThisDialog();
            } else {
                ctrl.active = '';
            }
        }

        /**Close send for reivew popup after success messages**/
        ctrl.editContentMeta = function() {
            ecEditor.dispatchEvent('org.ekstep.ceheader:meta:edit');
        };

        /**Refresh the browser as user want to fetch the version from platform**/
        ctrl.refreshContent = function() {
            location.reload();
        }


        /**force to save content**/
        ctrl.forceUpdate = function() {
            ctrl.message = "Saving content";
            ctrl.active = "active";
            ctrl.isLoading = true;
            ctrl.success = false;
            ctrl.success_msg = "";
            ecEditor.dispatchEvent('org.ekstep.contenteditor:save:force', {
                savingPopup: false,
                successPopup: false,
                failPopup: true,
                callback: function(err, res) {                    
                    if (res && res.data && res.data.responseCode == "OK") {
                        ctrl.isLoading = false;
                        ctrl.active = '';
                        ctrl.sendForReview();
                    }
                }
            });
        };

        /**send for review content**/
        ctrl.sendForReview = function() {
            ctrl.message = "Saving content";
            ctrl.active = "active";
            ctrl.isLoading = true;
            ctrl.success = false;
            ctrl.success_msg = "";

            ecEditor.ngSafeApply($scope);

            /**Call portal task to send for review content**/
            ecEditor.jQuery.ajax({
                url: ecEditor.getConfig('baseURL') + "/index.php?option=com_ekcontent&task=contentform.sendForReview",
                type: 'POST',
                data: {
                    identifier: ecEditor.getContext('contentId'),
                },
                cache: false,
                beforeSend: function() {
                    ctrl.message = "Sending for reviewer";
                },
                success: function(resp) {
                    if (resp.status === 'success') {
                        ctrl.success = true;
                        ctrl.success_msg = resp.msg;
                        $scope.closeThisDialog();
                        ctrl.closeThisDialog(true);
                    } else {
                        ctrl.success_msg = resp.msg;
                        ctrl.success = false;
                    }
                },
                complete: function() {
                    ctrl.isLoading = false;
                    ctrl.active = '';
                    ctrl.responseMsg = true;
                    ecEditor.ngSafeApply($scope);
                    ctrl.showReviewMsg(ctrl.success_msg, ctrl.responseMsg);
                },
                error: function() {
                    ctrl.success_msg = "Something went wrong! Try again later";
                    ctrl.success = false;
                }
            });
        }
    }]);
//# sourceURL="reviewapp.js"
