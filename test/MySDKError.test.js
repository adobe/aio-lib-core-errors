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

const { codes, messages } = require('./classes/MySDKError')
const { UNKNOWN_THING_ID, UNKNOWN_ORDER_ID } = require('./classes/MySDKError').codes
const { AioCoreSDKError } = require('../src')

test('codes', () => {
  expect(codes.UNKNOWN_THING_ID).toBeDefined()
  expect(codes.UNKNOWN_ORDER_ID).toBeDefined()
  expect(messages.get('UNKNOWN_THING_ID')).toBeDefined()
  expect(messages.get('UNKNOWN_ORDER_ID')).toBeDefined()
})

test('UNKNOWN_THING_ID default', () => {
  const sdk = 'MySDK'
  const sdkDetails = {}
  const code = 'UNKNOWN_THING_ID'
  const message = messages.get(code)

  // You can pass in the sdkDetails, or not
  const err = new UNKNOWN_THING_ID()

  expect(err instanceof AioCoreSDKError).toBeTruthy()
  expect(err.sdk).toEqual(sdk)
  expect(err.sdkDetails).toEqual(sdkDetails)
  expect(err.message).toEqual(`[${sdk}:${code}] ${message}`)
  expect(err.code).toEqual(code)

  const json = err.toJSON()
  expect(json).toMatchObject({
    code: 'UNKNOWN_THING_ID',
    message: '[MySDK:UNKNOWN_THING_ID] There was a problem with that thing',
    sdkDetails: {},
    sdk: 'MySDK'
  })
})

test('UNKNOWN_ORDER_ID with order id', () => {
  const sdk = 'MySDK'
  const sdkDetails = { tenantId: 'MYTENANT2' }
  const code = 'UNKNOWN_ORDER_ID'
  const messageValues = 'ORDER-21241-FSFS' // or an array of values
  const message = util.format(messages.get(code), messageValues)

  // Pass in the sdk details, and the message arguments
  // in this case the message format is: "There was a problem with that order id: %s."
  // messageValues can be an array of values or a string
  const err = new UNKNOWN_ORDER_ID({ sdkDetails, messageValues })

  expect(err instanceof Object).toBeTruthy()
  expect(err.sdk).toEqual(sdk)
  expect(err.sdkDetails).toEqual(sdkDetails)
  expect(err.message).toEqual(`[${sdk}:${code}] ${message}`)
  expect(err.code).toEqual(code)

  const json = err.toJSON()
  expect(json).toMatchObject({
    code: 'UNKNOWN_ORDER_ID',
    message: '[MySDK:UNKNOWN_ORDER_ID] There was a problem with that order id: ORDER-21241-FSFS.',
    sdkDetails: {
      tenantId: 'MYTENANT2'
    },
    sdk: 'MySDK'
  })
})
