/**
 * Constructor.
 * Do not instantiate directly, subclass this class instead.
 * @param [message = <no_message>] - The message for the Error
 * @param [code = <unknown_code>] - The code for the Error
 * @param [sdk = <unknown_sdk>] - The SDK associated with the Error
 * @param [sdkDetails = {}] - The SDK details associated with the Error
 * @param [captureStackTrace = Error.captureStackTrace] - if available, capture the V8 stack trace
 */
declare class AioCoreSDKError {
    constructor(message?: string, code?: string, sdk?: string, sdkDetails?: any, captureStackTrace?: boolean);
    /**
     * Returns a JSON respresentation of this Error object.
     * @returns this error object as json
     */
    toJSON(): any;
}

/**
 * Returns a function that updates the parameters specified.
 * This is used in ErrorWrapper.
 * @param codes - an object that will map an error code to an Error class.
 * @param messages - a Map, that will map the error code to an error message
 * @returns an updater function
 */
declare function createUpdater(codes: {
    [key: string]: Error;
}, messages: Map<string, string>): (...params: any[]) => any;

/**
 * Returns a function that will dynamically create a class with the
 * error code specified, and updates the objects specified via the Updater parameter.
 *
 * The returned function takes two parameters:
 *    - code (string), which is the error code.
 *    - message (string), which is the error message (can contain format specifiers)
 * @param errorClassName - The class name for your SDK Error. Your Error objects will be these objects
 * @param sdkName - The name of your SDK. This will be a property in your Error objects
 * @param updater - the object returned from a createUpdater call
 * @param baseClass - the base class that your Error class is extending. AioCoreSDKError is the default
 * @returns a wrapper function
 */
declare function ErrorWrapper(errorClassName: string, sdkName: string, updater: createUpdater, baseClass: Error): (...params: any[]) => any;

