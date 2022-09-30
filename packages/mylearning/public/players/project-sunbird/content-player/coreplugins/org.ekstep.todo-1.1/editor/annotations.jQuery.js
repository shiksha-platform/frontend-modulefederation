(function($) {
    $.fn.annotations = function(options) {
        var defaults = { pageId: 0, };
        options = $.extend(defaults, options);
        var pageId = options.pageId;
        var element = $(this);

        var url, type, subtype, client, cont_id, title, ordering, direction, limit, limitstart, userProfile;
        // Read widget data
        url = element.attr("data-jlike-url");
        type = element.attr("data-jlike-type");
        subtype = element.attr("data-jlike-subtype");
        client = element.attr("data-jlike-client");
        cont_id = element.attr("data-jlike-cont-id");
        title = element.attr("data-jlike-title");
        ordering = element.attr("data-jlike-ordering");
        direction = element.attr("data-jlike-direction");
        limit = parseInt(element.attr("data-jlike-limit"), 10);
        limitstart = parseInt(element.attr("data-jlike-limitstart"), 10);
        userProfile = '';

        if (!url) {
            console.warn('URL not found for widget ID = ' + element.attr('id'));
        }

        // Get per widget unique ID. Unique Id will be generated based on stageId
        ecEditor.jQuery.ajax({
            url: ecEditor.getConfig('baseURL') + "/index.php?option=com_api&app=jlike&resource=init&format=raw",
            headers: { 'x-auth': 'session' },
            type: "POST",
            async: false,
            data: { url: url, type: type, subtype: subtype, client: client, title: title, cont_id: cont_id },
            success: function(result) {
                // Append unique content id
                element.attr("data-jlike-contentid", result.data.content_id);

                if (typeof result.data.usersInfo != 'undefined') {
                    userProfile = result.data.usersInfo.avatar;
                    // Mention user list
                    var userslist = type == 'annotations' ? JSON.stringify(result.data.userslist) : '';
                    element.attr("data-jlike-mentionsUserslist", userslist);
                    // Load collaborator comments
                    loadComments(element);
                }
            },
            error: function() {
                console.warn('Something went wrong...')
            }
        });

        /**
         * Funtion to debug widget comments
         * @params element - widget reference
         */
        function debug(element) { console.log(element); }

        /**
         * Funtion to load widget wise comments
         * @params element - widget reference
         */
        function loadComments(element) {
            ecEditor.jQuery(element).comments({
                // Plugin config
                postCommentOnEnter: false, // Post comment on enter
                enableNavigation: true, // Sort comments by Newest / Oldest
                enableReplying: true, // Allow user to replaying on specific comment
                enableEditing: true, // Allow user to edit their own comment
                enableUpvoting: false, // Allow user to upvote comment
                enableDeleting: true, // Allow user to delete their own comment
                roundProfilePictures: true, // User profile picture shape
                enableNavigationOnTop: false, // Comment box position - Top/Bottom
                disabledNoCommentIcon: false, // Show comment empty icon

                // Fields mapping
                fieldMappings: {
                    id: 'annotation_id',
                    parent: 'parent_id',
                    content: 'annotation',
                    content_html: 'annotation_html',
                    created: 'annotation_date',
                    fullname: 'user_name',
                    createdByCurrentUser: 'is_mine',
                },

                // Time and date formatter
                timeFormatter: function(time) {
                    return moment(time).format('HH:mm, DD/MM/YYYY');
                },

                // Logged in user profile
                profilePictureURL: userProfile,
                /**
                 * Funtion to get collaborator comments
                 * @params success - callback function to render comments
                 * @params error   - callback to show error
                 */
                getComments: function(success, error) {
                    ecEditor.jQuery.ajax({
                        url: ecEditor.getConfig('baseURL') + "/index.php?option=com_api&app=jlike&resource=annotations&format=raw",
                        headers: { 'x-auth': 'session' },
                        type: "GET",
                        data: {
                            // Post widget attribute
                            content_id: element.attr("data-jlike-contentid"),
                            subtype: element.attr("data-jlike-subtype"),
                            client: element.attr("data-jlike-client"),
                            limitstart: parseInt(element.attr("data-jlike-limitstart"), 10),
                            limit: parseInt(element.attr("data-jlike-limit"), 10)
                        },
                        success: function(result) {
                            for (var i = 0; i < result.data.results.length; i++) {
                                var t = result.data.results[i].annotation_date.split(/[- :]/);
                                //
                                if (typeof result.data.results != undefined || typeof result.data.results.user != undefined) {
                                    result.data.results[i].user_name = result.data.results[i].user.name;
                                    result.data.results[i].user_id = result.data.results[i].user.id;
                                    result.data.results[i].profile_picture_url = result.data.results[i].user.avatar;
                                    result.data.results[i].profile_url = result.data.results[i].user.profile_link;
                                    result.data.results[i].created = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                                }
                            }

                            // Trigger callback function
                            success(result.data.results);

                            // Pagination
                            if (result.data.total > limit) {
                                // Click on load more button
                                if (ecEditor.jQuery(".data-container .loadMore", element).length) {
                                    ecEditor.jQuery(".loadMore").click(function() {
                                        // Change start limit
                                        limitstart = limitstart + limit;
                                        // Update widget attribute
                                        element.attr('data-jlike-limitstart', limitstart);
                                        // Trigger loadComments function
                                        loadComments(element);
                                    });
                                } else {
                                    var loadMoreBtn = jQuery('<button class="loadMore pull-right"><img class="cmt_loader" src="' + ecEditor.getConfig('baseURL') + 'components/com_jlike/assets/images/ajax-loading.gif">Load More</button>');
                                    jQuery(".data-container", element).append(loadMoreBtn);
                                    ecEditor.jQuery('.cmt_loader').hide();

                                    // Pagination
                                    ecEditor.jQuery(".loadMore").click(function() {
                                        // Show load comment loader
                                        ecEditor.jQuery('.cmt_loader').show();
                                        // Change comment start limit and update widget attribute
                                        limitstart = limitstart + limit;
                                        element.attr('data-jlike-limitstart', limitstart);
                                        // Make API call to get comments
                                        ecEditor.jQuery.ajax({
                                            url: ecEditor.getConfig('baseURL') + "/index.php?option=com_api&app=jlike&resource=annotations&format=raw",
                                            headers: { 'x-auth': 'session' },
                                            type: "GET",
                                            data: {
                                                // Post widget attribute
                                                content_id: element.attr("data-jlike-contentid"),
                                                subtype: element.attr("data-jlike-subtype"),
                                                client: element.attr("data-jlike-client"),
                                                limitstart: parseInt(element.attr("data-jlike-limitstart"), 10),
                                                limit: parseInt(element.attr("data-jlike-limit"), 10)
                                            },
                                            success: function(result) {
                                                // Hide load more comment icon
                                                ecEditor.jQuery('.cmt_loader').hide();
                                                for (var i = 0; i < result.data.results.length; i++) {
                                                    var t = result.data.results[i].annotation_date.split(/[- :]/);

                                                    result.data.results[i].user_name = result.data.results[i].user.name;
                                                    result.data.results[i].user_id = result.data.results[i].user.id;
                                                    result.data.results[i].created = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                                                    result.data.results[i].profile_url = result.data.results[i].user.profile_link;
                                                    result.data.results[i].profile_picture_url = result.data.results[i].user.avatar;
                                                }
                                                // Trigger callback function to render comments
                                                success(result.data.results);
                                                // Show load more button
                                                if (result.data.total < limitstart + 10) {
                                                    ecEditor.jQuery(".data-container .loadMore", element).hide();
                                                    element.attr('data-jlike-limitstart', 0);
                                                }
                                            }
                                        });
                                    });
                                }
                            }
                        }
                    });
                },

                /**
                 * Funtion to post new comment
                 * @params commentJSON - widget attribute data
                 * @params success     - callback to render new comment
                 * @params error       - callback to show error. It will execute If API throws any error(s)
                 * @params error       - Widget ref to read widget attribute
                 */
                postComment: function(commentJSON, success, error, div) {
                    // Read widget data
                    commentJSON.content_id = div.attr('data-jlike-contentid'); // Unique Id
                    commentJSON.subtype = div.attr('data-jlike-subtype'); // Collaborator
                    commentJSON.client = div.attr('data-jlike-client'); // Ek-content. Notify content owner

                    if (parseInt(commentJSON.annotation_id) != commentJSON.annotation_id) {
                        commentJSON.annotation_id = null;
                    }
                    // Make API call to save new comment
                    ecEditor.jQuery.ajax({
                        type: 'POST',
                        url: ecEditor.getConfig('baseURL') + "/index.php?option=com_api&app=jlike&resource=annotations&format=raw",
                        headers: { 'x-auth': 'session' },
                        data: commentJSON,
                        success: function(result) {
                            // Split date
                            var t = result.data.results.annotation_date.split(/[- :]/);
                            if (typeof result.data.results != undefined || typeof result.data.results.user == undefined) {
                                result.data.results.user_name = result.data.results.user.name;
                                result.data.results.user_id = result.data.results.user.id;
                                result.data.results.profile_url = result.data.results.user.profile_link;
                                result.data.results.created = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                                result.data.results.profile_picture_url = result.data.results.user.avatar;
                                result.data.results.created_by_current_user = true;
                                // Trigger callback function
                                success(result.data.results);
                            }
                        },
                        error: error
                    });
                },

                /**
                 * Funtion to delete own comment
                 * @params commentJSON - widget attribute data
                 * @params success     - callback to render new comment
                 * @params error       - callback to show error. It will execute If API throws any error(s)
                 * @params error       - Widget ref to read widget attribute
                 */
                deleteComment: function(commentJSON, success, error, div) {
                    // Read widget data
                    commentJSON.content_id = div.attr('data-jlike-contentid');
                    commentJSON.subtype = div.attr('data-jlike-subtype');
                    commentJSON.client = div.attr('data-jlike-client');

                    // Make API call to delete comment
                    ecEditor.jQuery.ajax({
                        type: 'delete',
                        url: ecEditor.getConfig('baseURL') + "/index.php?option=com_api&app=jlike&resource=annotations&format=raw&id=" + commentJSON.annotation_id,
                        headers: {
                            'x-auth': 'session'
                        },
                        data: commentJSON,
                        success: function(comment) {
                            // trigger callback function
                            success(comment);
                        },
                        error: error
                    });
                },
                /**
                 * Funtion to update/edit comment
                 * @params commentJSON - widget attribute data
                 * @params success     - callback to render new comment
                 * @params error       - callback to show error. It will execute If API throws any error(s)
                 * @params div         - Widget ref to read widget attribute
                 */
                putComment: function(commentJSON, success, error, div) {
                    // Read widget data
                    commentJSON.content_id = div.attr('data-jlike-contentid');
                    commentJSON.subtype = div.attr('data-jlike-subtype');
                    commentJSON.client = div.attr('data-jlike-client');
                    // Make API call
                    ecEditor.jQuery.ajax({
                        type: 'POST',
                        url: ecEditor.getConfig('baseURL') + "/index.php?option=com_api&app=jlike&resource=annotations&format=raw&annotation_id=" + commentJSON.annotation_id,
                        headers: { 'x-auth': 'session' },
                        data: commentJSON,
                        success: function(comment) {
                            var dataresultarray = comment.data.results;
                            // Trigger callback function
                            success(dataresultarray);
                        },
                        error: error
                    });
                }
            });

            // Mention user list
            var instance = "#" + element.attr("id") + " .jlike-mention";
            if (userslistObj) {
                var userslistObj = JSON.parse(element.attr("data-jlike-mentionsUserslist"));
                init_mention(instance, userslistObj);
            }
        }

        return true;
    }
})(jQuery);
