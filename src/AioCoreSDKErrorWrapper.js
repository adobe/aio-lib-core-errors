/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const util = require('util')
const AioCoreSDKError = require('./AioCoreSDKError')

/**
 * Returns a function that creates an Error class with the specified parameters.
 * The returned function takes one parameter, code (string), which is the error code.
 *
 * @param {string} errorClassName
 * @param {string} sdkName
 * @param {string} message
 * @param {Class} BaseClass
 * @private
 */
function curryCreateClass (errorClassName, sdkName, message, BaseClass) {
  return function (code) {
    return class extends BaseClass {
      constructor ({ sdkDetails, messageValues = [] } = {}) {
        // wrap an array around it if not one
        if (!Array.isArray(messageValues)) {
          messageValues = [messageValues]
        }
        super(util.format(message, ...messageValues), code, sdkName, sdkDetails)
        this.name = errorClassName
      }
    }
  }
}

/**
 * Returns a function that updates the parameters specified.
 * This is used in ErrorWrapper.
 *
 * @param {object<string, Error>} codes an object that will map an error code to an Error class.
 * @param {Map.<string, string>} messages a Map, that will map the error code to an error message
 * @returns {Function} an updater function
 */
function createUpdater (codes, messages) {
  return function (code, message, clazz) {
    messages.set(code, message)
    codes[code] = clazz
  }
}

/**
 * Returns a function that will dynamically create a class with the
 * error code specified, and updates the objects specified via the Updater parameter.
 *
 * The returned function takes two parameters:
 *    - code (string), which is the error code.
 *    - message (string), which is the error message (can contain format specifiers)
 *
 * @param {string} errorClassName The class name for your SDK Error. Your Error objects will be these objects
 * @param {string} sdkName The name of your SDK. This will be a property in your Error objects
 * @param {createUpdater} updater the object returned from a createUpdater call
 * @param {Error} baseClass the base class that your Error class is extending. AioCoreSDKError is the default
 * @returns {Function} a wrapper function
 */
function ErrorWrapper (errorClassName, sdkName, updater, baseClass = AioCoreSDKError) {
  return function (code, message) {
    const createClass = curryCreateClass(errorClassName, sdkName, message, baseClass)
    const clazz = createClass(code)
    updater(code, message, clazz)
  }
}

module.exports = {
  ErrorWrapper,
  createUpdater
}
