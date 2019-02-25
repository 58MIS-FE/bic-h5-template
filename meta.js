module.exports = {
    "prompts": {
        "name": {
            "type": "string",
            "required": false,
            "message": "Project name",
            "default": "h5-demo"
        },
        "author": {
            "type": "string",
            "message": "Author"
        },
        "version": {
            "type": "string",
            "message": "Project version",
            "default": "0.0.1"
        },
        "description": {
            "type": "string",
            "required": false,
            "message": "Project description",
            "default": "A new H5 project built by bic-cli"
        },
    },
    "filters": {},
    "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/58MIS-FE/mis-vue-startup"
}
