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

const { CNACoreSDKError } = require('../src')

test('CNACoreSDKError default', () => {
  const sdk = '<unknown_sdk>'
  const sdkDetails = {}
  const message = '<no_message>'
  const code = '<unknown_code>'

  // Default, no arguments
  const err = new CNACoreSDKError()

  expect(err instanceof Object).toBeTruthy()
  expect(err.sdk).toEqual(sdk)
  expect(err.sdkDetails).toEqual(sdkDetails)
  expect(err.message).toEqual(`[${sdk}:${code}] ${message}`)
  expect(err.code).toEqual(code)
})

test('CNACoreSDKError with parameters', () => {
  const sdk = 'MySDK'
  const sdkDetails = { endpoint: 'http://foo.bar' }
  const message = 'This is an error message'
  const code = 'ERR_CODE_1'

  // set some arguments
  const err = new CNACoreSDKError(message, code, sdk, sdkDetails, null)

  expect(err instanceof Object).toBeTruthy()
  expect(err.sdk).toEqual(sdk)
  expect(err.sdkDetails).toEqual(sdkDetails)
  expect(err.message).toEqual(`[${sdk}:${code}] ${message}`)
  expect(err.code).toEqual(code)

  const json = err.toJSON()
  expect(json).toMatchObject({
    code: 'ERR_CODE_1',
    message: '[MySDK:ERR_CODE_1] This is an error message',
    sdk: {
      details: {
        endpoint: 'http://foo.bar'
      },
      name: 'MySDK'
    }
  })
})
