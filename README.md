# parse-connector
[![Build Status](https://travis-ci.org/Reekoh/parse-connector.svg)](https://travis-ci.org/Reekoh/parse-connector)
![Dependencies](https://img.shields.io/david/Reekoh/parse-connector.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/parse-connector.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Parse Connector plugin for the Reekoh IoT Platform. Integrates a Reekoh instance with Parse to store and synchronize device data.

## Description
This plugin sends data from devices connected to the Reekoh Instance to Parse.

## Configuration
To configure this plugin a Parse account, application and class is needed in order to provide the following:

1. Application ID - The Parse Application ID to use.
2. REST API Key -  The Parse Application's corresponding REST API Key.
3. Class Name - The Parse Class Name in which the data will be added.

These parameters are then injected to the plugin from the platform.