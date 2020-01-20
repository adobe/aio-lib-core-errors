/**
 * Constructor.
 * Do not instantiate directly, subclass this class instead.
 *
 * @param {string} [message=<no_message>] The message for the Error
 * @param {string} [code=<unknown_code>] The code for the Error
 * @param {string} [sdk=<unknown_sdk>] The SDK associated with the Error
 * @param {object} [sdkDetails={}] The SDK details associated with the Error
 * @param {boolean} [captureStackTrace=Error.captureStackTrace] if available, capture the V8 stack trace
 */
declare class AioCoreSDKError {
    constructor(message?: string, code?: string, sdk?: string, sdkDetails?: any, captureStackTrace?: boolean);
    /**
     * Returns a JSON respresentation of this Error object.
     *
     * @return {Object}
     */
    toJSON(): any;
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
 * @param {function} Updater the object returned from a CreateUpdater call
 * @param {Class} BaseClass the base class that your Error class is extending. AioCoreSDKError is the default
 */
declare function ErrorWrapper(errorClassName: string, sdkName: string, Updater: (...params: any[]) => any, BaseClass: Class): void;

/**
 * Returns a function that updates the parameters specified.
 * This is used in ErrorWrapper.
 *
 * @param {Object<string, Class>} codes an object that will map an error code to an Error class.
 * @param {Map<string, string>} messages a Map, that will map the error code to an error message
 */
declare function createUpdater(codes: {
    [key: string]: Class;
}, messages: Map<string, string>): void;

/**
 * @module AioCoreSDKErrorWrapper
 */
declare module "AioCoreSDKErrorWrapper" { }

