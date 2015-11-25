'use strict';

const APP_ID = '5GwhgEyOkTX2ebfN8ULSh23HArd1BU8WNxt6NEQ7',
    API_KEY = 'gjbMU1YxRDk2epyNSMTJ7tiS8CORQ5lLNa6T04bU',
    DATA_CLASS = 'data';

var cp     = require('child_process'),
	assert = require('assert'),
	connector;

describe('Connector', function () {
	this.slow(5000);

	after('terminate child process', function () {
        setTimeout(function(){
            connector.kill('SIGKILL');
        }, 5000);
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(connector = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			connector.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			connector.send({
				type: 'ready',
				data: {
					options: {
						app_id: APP_ID,
						api_key: API_KEY,
                        data_class : DATA_CLASS
					}
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});

	describe('#data', function (done) {
		it('should process the data', function () {
			connector.send({
				type: 'data',
				data: {
					title: 'Test Message',
					message: 'This is a test message from Parse Connector.'
				}
			}, done);
		});
	});

    describe('#stressTest', function (done) {
        it('should process the data 200 times', function () {
            for( var c = 0; c < 200; c++){
                connector.send({
                    type: 'data',
                    data: {
                        title: 'Test Message',
                        message: 'This is a test message from Parse Connector.'
                    }
                }, done);
                setTimeout(function(){}, 1000);
            }
        });
    });
});