/**
 * @author ManjunathDavanam 
 */


/**
 * @description         - Which removes the lemma keyword form the object
 */
function getArrayOfKeywords(keys) {
    return keys.map(function(a) {
        return a.lemma ? a.lemma : a
    })
};

function invokeDialCode() {
    if (ecEditor.jQuery("#collection-tree").length) {
        var configurations = {
            data: ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild(),
            contentId: org.ekstep.contenteditor.api.getContext('contentId')
        }
        ecEditor.dispatchEvent("editor:metadata:update:dialcode", configurations)
    }
}

/**
 * @description         - Which is used to convert to data to target data type format
 */
function convertToDataType(targetType, data) {
    switch (targetType.toUpperCase()) {
        case 'LIST':
            return _.isString(data) ? data.split(",") : data;
            break;
        case 'TEXT':
            return (_.isArray(data) || _.isNumber(data)) ? data.toString() : data;
            break;
    }
}

/**
 * 
 * @description                 - Which is used to update the field data type values
 * @param {*} selectedFields 
 * @param {*} configurations 
 */
function getUpdateDataType(selectedFields, configurations) {
    var result = undefined;
    _.forEach(configurations, function(configureValue, configureKey) {
        _.forEach(selectedFields, function(selectedValue, selectedKey) {
            if (configureValue.code === selectedKey) {
                result = convertToDataType(configureValue.dataType, selectedValue);
                result && (selectedFields[selectedKey] = result);
            }
        })
    })
    return selectedFields
}

/**
 * 
 * @param {*} data 
 */
function logTelemetry(data, plugin) {
    ecEditor.getService('telemetry').interact({
        "type": data.type || "click",
        "subtype": data.subtype,
        "target": data.target,
        "pluginid": plugin.id,
        "pluginver": plugin.ver,
        "objectid": data.objectid || "",
        "targetid": data.targetid || "",
        "stage": data.stage || ecEditor.getCurrentStage().id
    })
}


function getUpdatedMetadata(currentMetadata, originalMetadata, fields) {
    var metadata = {};
    if (_.isEmpty(originalMetadata)) {
        _.forEach(currentMetadata, function(value, key) {
            metadata[key] = value;
        });
    } else {
        _.forEach(currentMetadata, function(value, key) {
            if (_.isUndefined(originalMetadata[key])) {
                metadata[key] = value;
            } else if (value != originalMetadata[key]) {
                metadata[key] = value;
            }
        });
    }
    if (metadata.keywords) {
        metadata.keywords = getArrayOfKeywords(metadata.keywords);
    }
    // Passing mandatory fields when save is invoked
    !metadata['name'] && (metadata['name'] = originalMetadata['name']);
    !metadata['contentType'] && (metadata['contentType'] = originalMetadata['contentType']);
    !metadata['mimeType'] && (metadata['mimeType'] = originalMetadata['mimeType']);
    return getUpdateDataType(metadata, fields)
}







//# sourceURL=metaDataUtil.js