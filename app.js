'use strict';

var platform = require('./platform'),
    isPlainObject = require('lodash.isplainobject'),
    isArray = require('lodash.isarray'),
    async = require('async'),
	parseObject;

let sendData = (data) => {
    parseObject.save(data,{
        success : function(response){
            platform.log(JSON.stringify({
                title: 'Parse object saved.',
                data: data
            }));
        },
        error : function(response, error){
            console.error(error);
            platform.handleException(error);
        }
    });
};

platform.on('data', function (data) {
    if(isPlainObject(data)){
        sendData(data);
    }
    else if(isArray(data)){
        async.each(data, function(datum){
            sendData(datum);
        });
    }
    else
        platform.handleException(new Error(`Invalid data received. Data must be a valid Array/JSON Object or a collection of objects. Data: ${data}`));
});

platform.once('close', function () {
    platform.notifyClose();
});

platform.once('ready', function (options) {
    var domain = require('domain'),
        d = domain.create();

    d.once('error', function(error){
        console.error(error);
        platform.handleException(error);
        d.exit();
    });

    d.run(function(){
        var Parse = require('parse/node');

        Parse.initialize(options.app_id, options.javascript_key);
        var DataObject = Parse.Object.extend(options.data_class);
        parseObject = new DataObject();

        platform.log('Parse Storage Initialized.');
        platform.notifyReady();
        d.exit();
    });
});