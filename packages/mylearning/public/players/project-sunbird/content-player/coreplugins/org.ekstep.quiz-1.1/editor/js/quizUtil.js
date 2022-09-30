var quizBrowserUtil = (function() {

    function getQuestionPreviwContent(tempalteData, itemJson) {
        try {
            if (!tempalteData) {
                throw "Template cannot be empty";
            }
            var story = { "theme": { "manifest": { "media": [] }, "template": [], "controller": [{ "name": "assessment", "type": "items", "id": "assessment", "__cdata": {} }], "startStage": "assessmentStage", "id": "theme", "ver": 0.3, "stage": [{ "id": "baseStage", "preload": true, "image": [], "audio": [], "voice": [] }, { "id": "assessmentStage", "x": 0, "y": 0, "w": 100, "h": 100, "g": [{ "embed": { "template": "item", "var-item": "item" }, "x": 10, "y": 0, "w": 80, "h": 90 }], "iterate": "assessment", "var": "item" }] } };
            story.theme.controller[0].__cdata = { "total_items": 1, "SET_TYPE": "MATERIALISED_SET", "SET_OBJECT_TYPE_KEY": "AssessmentItem", "item_sets": [{ "id": "itemSet", "count": 1 }], "items": { "itemSet": [itemJson] }, "identifier": "itemSet" };
            ecEditor._.forEach(tempalteData, function(t) {
                if (t && ecEditor._.findIndex(story.theme.template, function(st) {
                        return st.id == t.id
                    }) < 0) {
                    story.theme.template.push(t);
                }
            });
            if (itemJson.media) {
                story = addMediaToStory(story, itemJson.media);
            }
            story = addMediaToStory(story, ecEditor.getCurrentObject().media);
            return story;
        } catch (err) {
            return { "error": err };
        };
    }
    function addMediaToStory(story, media) {
        var questionMedia = [], idIndex, srcIndex;
        if(!ecEditor._.isUndefined(media)){
            if(!ecEditor._.isArray(media)){
                _.each(media, function(value){
                    questionMedia.push(value);
                });
                media = questionMedia;
            }
        }
        ecEditor._.forEach(media, function(m) {
            if (m.id && m.src) {
                srcIndex = ecEditor._.findIndex(story.theme.manifest.media, function(sm) {
                    return sm.src === m.src;
                });
                idIndex = ecEditor._.findIndex(story.theme.manifest.media, function(sm) {
                    return sm.id === m.id;
                });
                if (idIndex === -1) story.theme.manifest.media.push(m);
                if (idIndex !== -1 && srcIndex === -1) {
                    var newMedia = { "id": m.id, "src": m.src, "type": m.type };
                    if (m.assetId) newMedia.assetId = m.assetId;
                    story.theme.manifest.media[idIndex] = newMedia;
                }
            }
        });
        return story;
    }
    return {
        getQuestionPreviwContent: getQuestionPreviwContent
    }
})();

//# sourceURL=quizUtil.js