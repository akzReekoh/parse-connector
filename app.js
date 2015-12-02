'use strict';

var platform = require('./platform'),
    isPlainObject = require('lodash.isplainobject'),
	parseObject;

platform.on('data', function (data) {
    if(isPlainObject(data)){
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
    }
    else
        platform.handleException(new Error('Invalid data received. Must be a valid JSON Object. Data ' + data));
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