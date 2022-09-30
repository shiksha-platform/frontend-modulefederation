org.ekstep.services.configuration = new(org.ekstep.services.iService.extend({
    /**
     * @member {string} domainURL
     * @memberof org.ekstep.services.metaService
     */
    configURL: function() {
        return this.getBaseURL() + this.getAPISlug() + this.getConfig('configEndPoint', '/data')
    },

    getFormConfigurations: function(data, callback) {
        this.postFromService(this.configURL() + this.getConfig('configurationUrl', '/v1/form/read'), data, this.requestHeaders, callback)
    }

}))