/**
 * Plugin to get todos from community portal
 * @class Todo
 * @constructor
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Nilesh More <nilesh_m@tekditechnologies.com>
 */

org.ekstep.contenteditor.basePlugin.extend({
    initialize: function() {
        this.initData();
        ecEditor.addEventListener("stage:select", this.controllerCallback, this);
    },
    initData: function() {
        var instance = this;
    },
    controllerCallback: function(event, data) {
        ctrl = this;
        ecEditor.jQuery("#todoCommentsLoader").addClass('active');
        setTimeout(function() {
            ctrl.initializeTodoWidget();
        }, 3000);
        ctrl.context = org.ekstep.contenteditor.globalContext;
        ctrl.initializeTodoWidget = function() {
            var requestParams = {};
            var widgetRef;
            ecEditor.jQuery("#todo-sidebar-tab .item").tab('change tab', 'reviewerTab');
            /**Check for collabortors tab**/
            isCollaborators = _.isUndefined(ecEditor.getService('content').getContentMeta(ctrl.context.contentId).collaborators) ? false : true;
            if(isCollaborators)ecEditor.jQuery("#collaboratorTab").removeClass("disabled");
            else{
                ecEditor.jQuery("#collaboratorTab").addClass("disabled");
                ecEditor.jQuery("#collaboratorTab").removeAttr("data-tab");
            }

            if (!ecEditor._.isUndefined(ctrl.context)) {
                if (!ecEditor._.isUndefined(ctrl.context.contentId) && ctrl.context.contentId != "") {
                    // Content url
                    requestParams["url"] = "index.php?option=com_ekcontent&view=content&id=" + ctrl.context.id;
                    requestParams["type"] = "todos";

                    // Stage id
                    requestParams["subtype"] = "reviewer#" + data.stageId;
                    requestParams["client"] = "content.jlike_ekcontent";

                    // Content id
                    requestParams["cont_id"] = ctrl.context.id;

                    // Content title
                    requestParams["title"] = ecEditor.getService('content').getContentMeta(ctrl.context.contentId).name;

                    widgetRef = ecEditor.jQuery("#pageLevelTodos");

                    /**Update widget attribute as per page**/
                    ecEditor.jQuery(widgetRef).attr('data-jlike-url', requestParams["url"]);
                    ecEditor.jQuery(widgetRef).attr('data-jlike-status', requestParams["status"]);
                    ecEditor.jQuery(widgetRef).attr('data-jlike-type', requestParams["type"]);
                    ecEditor.jQuery(widgetRef).attr('data-jlike-subtype', requestParams["subtype"]);
                    ecEditor.jQuery(widgetRef).attr('data-jlike-client', requestParams["client"]);
                    ecEditor.jQuery(widgetRef).attr('data-jlike-cont-id', requestParams["cont_id"]);
                    ecEditor.jQuery(widgetRef).attr('data-jlike-title', requestParams["title"]);

                    requestParams["content_id"] = ecEditor.jQuery(widgetRef).attr("data-jlike-contentid");
                    requestParams["assigned_by"] = ecEditor.jQuery(widgetRef).attr("data-jlike-assigned_by");
                    requestParams["assigned_to"] = ecEditor.jQuery(widgetRef).attr("data-jlike-assigned_to");

                    // State 1 = Publish
                    requestParams["state"] = 1;

                    // Status I = Incomplete(Unresolved todo)
                    requestParams["status"] = "I";
                    ctrl.getTodos(widgetRef, requestParams, "#pageLevelTodos");

                    // Status C = Complete(resolved todo)
                    requestParams["status"] = "C";
                    ctrl.getTodos(widgetRef, requestParams, "#pageLevelResolvedTodos");

                    // Render collaborators comments. Update widget attribute based on stageId
                    ecEditor.jQuery('#collaboratorsCommentsDiv').attr("data-jlike-url", requestParams["url"]);
                    // Update subtype based on stageId. subtype is very IMP to load comments
                    ecEditor.jQuery('#collaboratorsCommentsDiv').attr("data-jlike-subtype", "collaborators#" + data.stageId);
                    ecEditor.jQuery('#collaboratorsCommentsDiv').attr('data-jlike-cont-id', requestParams["cont_id"]);
                    // Call annotation function to make API's call
                    ecEditor.jQuery('#collaboratorsCommentsDiv').annotations();
                }
            }
        }

        /**
         * WidgetRef = widget id
         * apiRequestParams  = APIs request params
         * todoThreadsWrapperDiv = to append widget
         **/
        ctrl.getTodos = function(widgetRef, apiRequestParams, todoThreadsWrapperDiv) {
            var status = ''
            status = apiRequestParams["status"];
            ecEditor.jQuery(widgetRef).hybridtodo({
                apiRequestParams: apiRequestParams,
                action: 'getTodosAndComments',
                callback: function(result) {
                    ctrl.renderHybridTodos(result, status, todoThreadsWrapperDiv);
                }
            });
        }

        // Function to initilize widget when creator click on resolve button
        ctrl.updateStatus = function(ref) {
                var widgetRef, status, id, todotext, context;

                // Status C = resolved todo
                status = 'C';

                // Id = joomla todo id. Todotext = todo title. content = joomla subtype
                id = ecEditor.jQuery(ref).attr("data-jlike-id");
                todotext = ecEditor.jQuery(ref).attr("data-ek-todomsg");
                context = ecEditor.jQuery(ref).attr("data-jlike-context");

                widgetRef = ecEditor.jQuery("#todoThreadId" + parseInt(id));

                // Update todo status
                ctrl.save(widgetRef, status, id, todotext, context);

                ecEditor.jQuery("#" + id).prop("disabled", true);
                ecEditor.jQuery("#todoWrapper" + id).hide(1000);
            },

            ctrl.save = function(widgetRef, status, id, todotext, context) {
                var apiPostParams = {};

                // Joomla id
                apiPostParams['id'] = id;

                // Todo title
                apiPostParams["sender_msg"] = todotext;

                // Content url
                apiPostParams["url"] = ecEditor.jQuery(widgetRef).attr("data-jlike-url");
                apiPostParams["cont_id"] = ecEditor.jQuery(widgetRef).attr("data-jlike-cont-id");
                apiPostParams["type"] = 'todos'

                // Joomla subtype along with stage Id
                apiPostParams["subtype"] = context
                apiPostParams["client"] = ecEditor.jQuery(widgetRef).attr("data-jlike-client");
                apiPostParams["content_id"] = ecEditor.jQuery(widgetRef).attr("data-jlike-contentid");
                apiPostParams["assigned_by"] = ecEditor.jQuery(widgetRef).attr("data-jlike-assigned_by");
                apiPostParams["assigned_to"] = ecEditor.jQuery(widgetRef).attr("data-jlike-assigned_to");

                // State 1 = Publish
                apiPostParams["state"] = 1;

                // Status C = complete
                apiPostParams["status"] = "C";

                ecEditor.jQuery(widgetRef).hybridtodo({ apiPostParams: apiPostParams, action: 'createTodo' });
                ctrl.generateTelemetry({type: 'click', subtype: 'todo', target: 'createTodo',targetid: ctrl.context.contentId});
            }

        /**
         * Function to render hybrid todo
         * @params result - api result
         * @staus staus   - todo status
         * @todoThreadsWrapperDiv - thread wrapper div
         **/
        ctrl.renderHybridTodos = function(result, status, todoThreadsWrapperDiv) {
            // Todo template. DOM manipulation by underscore js
            var todoTemplate = [
                "<div class='todo-wrapper' id='todoWrapper<%= id %>'>",
                "<div clss='ui grid'>",
                "<div class='ui three column grid row'>",
                "<div class='two wide column user-avatar'>",
                "<img src='<%= assigned_by.avatar %>' class='ui avatar image' style='width:33px; height:33px;max-width:inherit'>",
                "</div>",
                "<div class='six wide column' id='reviewerInfoHolder'>",
                "<div class='row reviewer-name'>",
                "<a class='reviewer-name' href='<%= assigned_by.profile_link %>'><%= assigned_by.name %></a>",
                "</div>",
                "<div class='row'>",
                "<time><%= moment(created).format('HH:mm, DD/MM/YYYY') %></time>",
                "</div>",
                "</div>",
                "<div class='one wide column right floated'>",
                "<button type='button' class='ui tiny icon button right floated basic' id='<%= id %>' data-jlike-id='<%= id %>' data-ek-todomsg='<%= sender_msg %>' data-jlike-context='<%= context %>' onClick='ctrl.updateStatus(this)' <%= disabledAttr %>><%= buttonName %></button>",
                "</div>",
                "</div>",
                "</div>",
                "<div class='row' id='todoTitle'>",
                "<span class='row four wide column'><%= title %></span>",
                "</div>",
                "<div class='row todo-comment'>",
                "<label class='left floated'><%= sender_msg %></label>",
                "</div></br>",
                "<div id='todoThreadId<%= id %>' class='list-unstyled' data-jlike-client='content.jlike_ekcontent' data-jlike-type='annotations' data-jlike-subtype='com_ekcontent.reviewers' data-jlike-context='reviewer#todo#<%= id %>' data-jlike-limitstart='0' data-jlike-limit='2' <% if (readOnly){ %> data-jlike-readonly='<%= readOnly %>'<% } %> data-jlike-contentid='<%= content_id %>' data-jlike-ordering='annotation_date'></div>",
                "</div>"
            ];

            // Join todo template data
            todoTemplate = (todoTemplate).join("");

            // Initially clear empty/non empty data
            ecEditor.jQuery(todoThreadsWrapperDiv).html('');

            // If apis return data
            if (result.success == true) {
                // Hide empty message
                ecEditor.jQuery('#noIssueFound').hide();
                for (var i = 0; i < result.data.result.length; i++) {
                    // Todo button name = resolve/resolved
                    result.data.result[i].buttonName = result.data.result[i].status == "I" ? 'Resolve' : 'Resolved';
                    // Button disabled or not
                    result.data.result[i].disabledAttr = result.data.result[i].status == "I" ? '' : 'disabled';
                    // Resolved todo thread should be readonly
                    result.data.result[i].readOnly = result.data.result[i].status == "I" ? false : true;

                    for (var c = 0; c < result.data.result[i].comments.length; c++) {
                        result.data.result[i].comments[c].user_name = result.data.result[i].comments[c].user.name;
                        result.data.result[i].comments[c].user_id = result.data.result[i].comments[c].user.id;
                        result.data.result[i].comments[c].profile_picture_url = result.data.result[i].comments[c].user.avatar;
                        result.data.result[i].comments[c].profile_url = result.data.result[i].comments[c].user.profile_link;
                        result.data.result[i].comments[c].created = moment(result.data.result[i].comments[c].annotation_date).format('HH:mm, MMM Do YYYY');
                    }

                    // HTML markup
                    var markup = '';
                    var todoData = result.data.result[i];
                    // Compile _ js template data
                    var compiled = _.template(todoTemplate);
                    // Bind todo data with compiled template
                    markup += compiled(todoData);

                    // Append widget data
                    result.data.result[i].status == "I" ? ecEditor.jQuery(todoThreadsWrapperDiv).append(markup) : ecEditor.jQuery(todoThreadsWrapperDiv).append(markup);

                    // Render comment box
                    jQuery("#todoThreadId" + result.data.result[i].id).hybridtodo({
                        arrData: result.data.result[i].comments,
                        action: 'renderHybridTodos',
                        userProfile: result.data.userinfo
                    });
                }
            }
            // Error handling/show empty message. status == 'I' means Incomplete/unresolved todo
            else if (result.success == false && status == 'I') {
                var emptyMessage = '';

                // Clear div html
                jQuery(todoThreadsWrapperDiv).html('');

                // Prepare empty message
                var emptyMessage = '<div class="ui grid" id="noIssueFound" style="padding-top: 22px;"><div class="ui one column stackable center aligned page grid"><i class="fa fa-comments-o fa-2x" aria-hidden="true"></i><br>No issues found</div></div>';

                // Append empty message
                ecEditor.jQuery(todoThreadsWrapperDiv).html(emptyMessage);
            }
            ecEditor.jQuery("#todoCommentsLoader").removeClass('active');
        }
    },
    /**
     *   To generate telemetry events
     *   @memberof collaborator
     */
    generateTelemetry: function(data) {
        var instance = this;
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "subtype": data.subtype,
            "id": data.target,
            "pageid": org.ekstep.contenteditor.api.getCurrentStage().id || "",
            "target":{
                "id":  data.targetid || "",
                "type": "plugin",
                "ver": ""
            },
            "plugin":{
                "id": instance.manifest.id,
                "ver": instance.manifest.ver,
                "category": "core"
            },
            "ver": "3.0"
        })
    }
});
//# sourceURL=todo.js
