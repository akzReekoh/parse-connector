# Parse Storage
[![Build Status](https://travis-ci.org/Reekoh/parse-storage.svg)](https://travis-ci.org/Reekoh/parse-storage)
![Dependencies](https://img.shields.io/david/Reekoh/parse-storage.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/parse-storage.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Parse Storage plugin for the Reekoh IoT Platform. ntegrates a Reekoh instance with Parse to store device data.

## Description
This plugin saves data from devices connected to the Reekoh Instance to Parse.

## Configuration
To configure this plugin a Parse account, application and class is needed in order to provide the following:

1. Application ID - The Parse Application ID to use.
2. JavaScirpt Key -  The Parse Application's corresponding JavaScript Key.
3. Class Name - The Parse Class Name in which the data will be added.

These parameters are then injected to the plugin from the platform.