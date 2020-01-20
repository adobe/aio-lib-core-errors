## Classes

<dl>
<dt><a href="#AioCoreSDKError">AioCoreSDKError</a></dt>
<dd><p>The base class for all Adobe I/O Core SDK Errors.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#ErrorWrapper">ErrorWrapper(errorClassName, sdkName, updater, baseClass)</a></dt>
<dd><p>Returns a function that will dynamically create a class with the
error code specified, and updates the objects specified via the Updater parameter.</p>
<p>The returned function takes two parameters:</p>
<ul>
<li>code (string), which is the error code.</li>
<li>message (string), which is the error message (can contain format specifiers)</li>
</ul>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#createUpdater">createUpdater</a> : <code>function</code></dt>
<dd><p>Returns a function that updates the parameters specified.
This is used in ErrorWrapper.</p>
</dd>
</dl>

<a name="AioCoreSDKError"></a>

## AioCoreSDKError
The base class for all Adobe I/O Core SDK Errors.

**Kind**: global class  

* [AioCoreSDKError](#AioCoreSDKError)
    * [new AioCoreSDKError([message], [code], [sdk], [sdkDetails], [captureStackTrace])](#new_AioCoreSDKError_new)
    * [.toJSON()](#AioCoreSDKError+toJSON) ⇒ <code>Object</code>

<a name="new_AioCoreSDKError_new"></a>

### new AioCoreSDKError([message], [code], [sdk], [sdkDetails], [captureStackTrace])
Constructor.
Do not instantiate directly, subclass this class instead.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [message] | <code>string</code> | <code>&quot;&lt;no_message&gt;&quot;</code> | The message for the Error |
| [code] | <code>string</code> | <code>&quot;&lt;unknown_code&gt;&quot;</code> | The code for the Error |
| [sdk] | <code>string</code> | <code>&quot;&lt;unknown_sdk&gt;&quot;</code> | The SDK associated with the Error |
| [sdkDetails] | <code>object</code> | <code>{}</code> | The SDK details associated with the Error |
| [captureStackTrace] | <code>boolean</code> | <code>Error.captureStackTrace</code> | if available, capture the V8 stack trace |

<a name="AioCoreSDKError+toJSON"></a>

### aioCoreSDKError.toJSON() ⇒ <code>Object</code>
Returns a JSON respresentation of this Error object.

**Kind**: instance method of [<code>AioCoreSDKError</code>](#AioCoreSDKError)  
<a name="ErrorWrapper"></a>

## ErrorWrapper(errorClassName, sdkName, updater, baseClass)
Returns a function that will dynamically create a class with the
error code specified, and updates the objects specified via the Updater parameter.

The returned function takes two parameters:
   - code (string), which is the error code.
   - message (string), which is the error message (can contain format specifiers)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| errorClassName | <code>string</code> | The class name for your SDK Error. Your Error objects will be these objects |
| sdkName | <code>string</code> | The name of your SDK. This will be a property in your Error objects |
| updater | [<code>createUpdater</code>](#createUpdater) | the object returned from a createUpdater call |
| baseClass | <code>Error</code> | the base class that your Error class is extending. AioCoreSDKError is the default |

<a name="createUpdater"></a>

## createUpdater : <code>function</code>
Returns a function that updates the parameters specified.
This is used in ErrorWrapper.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| codes | <code>Object.&lt;string, Error&gt;</code> | an object that will map an error code to an Error class. |
| messages | <code>Map.&lt;string, string&gt;</code> | a Map, that will map the error code to an error message |

