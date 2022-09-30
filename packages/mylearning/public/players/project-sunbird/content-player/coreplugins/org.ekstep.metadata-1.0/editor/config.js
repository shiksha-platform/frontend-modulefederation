window.formConfigurations = {
    "templateName": "defaultTemplate",
    "action": "save",
    "fields": [{
            "code": "name",
            "dataType": "text",
            "description": "Title of the content",
            "editable": true,
            "inputType": "text",
            "label": "Title",
            "name": "Title",
            "placeholder": "Enter the Title ",
            "renderingHints": {},
            "required": true,
            "visible": true,
            "validation": [{
                    "type": "regex",
                    "value": "[A-Z]",
                    "message": "Invalid Input"
                },
                {
                    "type": "max",
                    "value": "14",
                    "message": "Input is exceded"
                }
            ]
        },
        {
            "code": "description",
            "dataType": "text",
            "description": "Brief description",
            "editable": true,
            "inputType": "textarea",
            "label": "Description",
            "name": "Description",
            "placeholder": "Description",
            "renderingHints": {},
            "required": true,
            "visible": true
        },
        {
            "code": "keywords",
            "dataType": "list",
            "description": "Keywords for the content",
            "editable": true,
            "inputType": "keywordsuggestion",
            "label": "keywords",
            "name": "Keywords",
            "placeholder": "Enter Keywords",
            "required": true,
            "visible": true
        },
        {
            "code": "appicon",
            "dataType": "url",
            "description": "App Icon",
            "editable": true,
            "index": 6,
            "inputType": "file",
            "label": "App Icon",
            "name": "App Icon",
            "placeholder": "App Icon",
            "renderingHints": {},
            "required": true,
            "visible": true
        },

        {
            "code": "board",
            "dataType": "text",
            "depends": [
                "gradeLevel"
            ],
            "description": "Curriculum",
            "editable": true,
            "index": 0,
            "inputType": "select",
            "label": "Curriculum",
            "name": "Curriculum",
            "placeholder": "Select Curriculum",
            "renderingHints": {},
            "required": true,
            "visible": true
        },
        {
            "code": "subject",
            "dataType": "text",
            "description": "",
            "editable": true,
            "index": 2,
            "inputType": "select",
            "label": "Subject",
            "name": "Subject",
            "placeholder": "Select Subject",
            "renderingHints": {},
            "required": true,
            "visible": true
        },
        {
            "code": "medium",
            "dataType": "text",
            "description": "",
            "editable": true,
            "index": 3,
            "inputType": "select",
            "label": "medium",
            "name": "medium",
            "placeholder": "Curriculum",
            "renderingHints": {},
            "required": true,
            "visible": true
        },
        {
            "code": "gradeLevel",
            "dataType": "list",
            "depends": [
                "subject"
            ],
            "description": "Class",
            "editable": true,
            "index": 1,
            "inputType": "multiselect",
            "label": "Class",
            "name": "Class",
            "placeholder": "Select Class",
            "renderingHints": {},
            "required": true,
            "visible": true
        },
        {
            "code": "year",
            "dataType": "text",
            "description": "",
            "editable": true,
            "index": 4,
            "inputType": "select",
            "label": "Year",
            "name": "Year",
            "placeholder": "Select Year",
            "renderingHints": {},
            "required": false,
            "visible": true
        },
        {
            "code": "dialcode",
            "dataType": "text",
            "description": "",
            "editable": true,
            "index": 4,
            "inputType": "dialcode",
            "label": "dialcode",
            "name": "dialcode",
            "placeholder": "Select Year",
            "renderingHints": {},
            "required": true,
            "visible": true
        },
        {
            "code": "publisher",
            "dataType": "text",
            "description": "Publication",
            "editable": true,
            "index": 5,
            "inputType": "text",
            "label": "Publisher",
            "name": "Publisher",
            "placeholder": "Publication",
            "renderingHints": {},
            "required": false,
            "visible": true,
            "validation": [{
                    "type": "regex",
                    "value": "[A-Z]",
                    "message": "Invalid Input"
                },
                {
                    "type": "max",
                    "value": "5",
                    "message": "Input is exceded"
                }
            ]
        },
        {
            "code": "phone",
            "dataType": "text",
            "description": "Publication",
            "editable": true,
            "index": 5,
            "inputType": "number",
            "label": "Phone",
            "name": "Publisher",
            "placeholder": "Contact number",
            "renderingHints": {},
            "required": false,
            "visible": true,
            "validation": [{
                    "type": "regex",
                    "value": "[0-1]",
                    "message": "Invalid Input"
                },
                {
                    "type": "max",
                    "value": "10",
                    "message": "Input is exceded"
                }
            ]
        },
        // {
        //     "code": "concepts",
        //     "dataType": "list",
        //     "description": "Choose a concept",
        //     "editable": true,
        //     "inputType": "conceptselector",
        //     "label": "Concepts",
        //     "name": "Concepts",
        //     "placeholder": "Choose Concepts",
        //     "renderingHints": {},
        //     "required": false,
        //     "visible": true
        // },



    ]
}