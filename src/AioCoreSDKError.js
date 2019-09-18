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

/**
 * Base class for all Adobe I/O Core SDK Errors.
 * Do not instantiate directly.
 */
class AioCoreSDKError extends Error {
  constructor (
    message = '<no_message>',
    code = '<unknown_code>',
    sdk = '<unknown_sdk>',
    sdkDetails = {},
    captureStackTrace = Error.captureStackTrace
  ) {
    super(`[${sdk}:${code}] ${message}`)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (captureStackTrace && captureStackTrace instanceof Function) {
      captureStackTrace(this, AioCoreSDKError)
    }

    this.code = code
    this.sdk = sdk
    this.sdkDetails = sdkDetails
    this.name = this.constructor.name
  }

  toJSON () {
    return {
      sdk: {
        name: this.sdk,
        details: this.sdkDetails
      },
      code: this.code,
      message: this.message,
      stacktrace: this.stack
    }
  }
}

module.exports = AioCoreSDKError
