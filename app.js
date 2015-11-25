'use strict';

var platform = require('./platform'),
    isPlainObject = require('lodash.isplainobject'),
    request = require('request'),
	config;

platform.on('data', function (data) {
    if(isPlainObject(data)){
        var options = {
            method: 'POST',
            url: 'https://api.parse.com/1/classes/' + config.data_class,
            headers:
                {
                    'x-parse-rest-api-key': config.api_key,
                    'x-parse-application-id': config.app_id
                },
            body: JSON.stringify(data)
        };

        request(options, function (error, response, body) {
            if (error){
                console.error(error);
                platform.handleException(error);
            }
            else{
                platform.log(JSON.stringify({
                    title: 'Data Sent to Parse.',
                    data: data
                }));
            }
        });
    }
    else
        platform.handleException(new Error('Invalid data received. Must be a valid JSON Object. Data ' + data));
});

platform.once('close', function () {
    platform.notifyClose();
});

platform.once('ready', function (options) {
    config = options;

    platform.log('Parse Connector Initialized.');
	platform.notifyReady();
});