// Type definitions for axios 0.9.1
// Project: https://github.com/mzabriskie/axios
// Definitions by: Marcel Buesing <https://github.com/marcelbuesing>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Axios {

    interface IThenable<R> {
        then<U>(onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => U | IThenable<U>): IThenable<U>;
        then<U>(onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => void): IThenable<U>;
    }

    interface IPromise<R> extends IThenable<R> {
        then<U>(onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => U | IThenable<U>): IPromise<U>;
        then<U>(onFulfilled?: (value: R) => U | IThenable<U>, onRejected?: (error: any) => void): IPromise<U>;
        catch<U>(onRejected?: (error: any) => U | IThenable<U>): IPromise<U>;
    }

    /**
     * HTTP Basic auth details
     */
    interface AxiosHttpBasicAuth {
        username: string;
        password: string;
    }

    /**
     * Common axios XHR config interface
     * <T> - request body data type
     */
    interface AxiosXHRConfigBase<T> {
        /**
         * will be prepended to `url` unless `url` is absolute.
         * It can be convenient to set `baseURL` for an instance
         * of axios to pass relative URLs to methods of that instance.
         */
        baseURL?: string;

        /**
         * custom headers to be sent
         */
        headers?: {[key: string]: any};

        /**
         * URL parameters to be sent with the request
         */
        params?: Object;

        /**
         * optional function in charge of serializing `params`
         * (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
         */
        paramsSerializer?: (params: Object) => string;

        /**
         * specifies the number of milliseconds before the request times out.
         * If the request takes longer than `timeout`, the request will be aborted.
         */
        timeout?: number;

        /**
         * indicates whether or not cross-site Access-Control requests
         * should be made using credentials
         */
        withCredentials?: boolean;

        /**
         * indicates that HTTP Basic auth should be used, and supplies
         * credentials. This will set an `Authorization` header,
         * overwriting any existing `Authorization` custom headers you have
         * set using `headers`.
         */
        auth?: AxiosHttpBasicAuth;

        /**
         * indicates the type of data that the server will respond with
         * options are 'arraybuffer', 'blob', 'document', 'json', 'text'
         */
        responseType?: string;

        /**
         * name of the cookie to use as a value for xsrf token
         */
        xsrfCookieName?: string;

        /**
         * name of the http header that carries the xsrf token value
         */
        xsrfHeaderName?: string;

        /**
         * Change the request data before it is sent to the server.
         * This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
         * The last function in the array must return a string or an ArrayBuffer
         */
        transformRequest?: (<U>(data: T) => U) | [<U>(data: T) => U];

        /**
         * change the response data to be made before it is passed to then/catch
         */
        transformResponse?: <U>(data: T) => U;
    }

    /**
     * <T> - request body data type
     */
    interface AxiosXHRConfig<T> extends AxiosXHRConfigBase<T> {
        /**
         * server URL that will be used for the request, options are:
         * GET, PUT, POST, DELETE, CONNECT, HEAD, OPTIONS, TRACE, PATCH
         */
        url: string;

        /**
         * request method to be used when making the request
         */
        method?: string;

        /**
         * data to be sent as the request body
         * Only applicable for request methods 'PUT', 'POST', and 'PATCH'
         * When no `transformRequest` is set, must be a string, an ArrayBuffer or a hash
         */
        data?: T;
    }

    interface AxiosXHRConfigDefaults<T> extends AxiosXHRConfigBase<T> {
        /**
         * custom headers to be sent
         */
        headers: {
            common: {[index: string]: string};
            patch: {[index: string]: string};
            post: {[index: string]: string};
            put: {[index: string]: string};
        };
    }

    /**
     * <T> - expected response type,
     * <U> - request body data type
     */
    interface AxiosXHR<T> {
        /**
         * Response that was provided by the server
         */
        data: T;

        /**
         * HTTP status code from the server response
         */
        status: number;

        /**
         * HTTP status message from the server response
         */
        statusText: string;

        /**
         * headers that the server responded with
         */
        headers: Object;

        /**
         * config that was provided to `axios` for the request
         */
        config: AxiosXHRConfig<T>;
    }

    interface Interceptor {
        /**
         * intercept request before it is sent
         */
        request: RequestInterceptor;

        /**
         * intercept response of request when it is received.
         */
        response: ResponseInterceptor
    }

    type InterceptorId = number;

    interface RequestInterceptor {
        /**
         * <U> - request body data type
         */

        use<U>(fulfilledFn: (config: AxiosXHRConfig<U>) => AxiosXHRConfig<U>): InterceptorId;

        use<U>(fulfilledFn: (config: AxiosXHRConfig<U>) => AxiosXHRConfig<U>,
               rejectedFn: (error: any) => any)
            : InterceptorId;

        eject(interceptorId: InterceptorId): void;
    }

    interface ResponseInterceptor {
        /**
         * <T> - expected response type
         */

        use<T>(fulfilledFn: (config: Axios.AxiosXHR<T>) => Axios.AxiosXHR<T>): InterceptorId;

        use<T>(fulfilledFn: (config: Axios.AxiosXHR<T>) => Axios.AxiosXHR<T>,
               rejectedFn: (error: any) => any)
            : InterceptorId;

        eject(interceptorId: InterceptorId): void;
    }

    /**
     * <T> - expected response type,
     * <U> - request body data type
     */
    interface AxiosInstance {

        /**
         * Send request as configured
         */
        <T>(config: AxiosXHRConfig<T>): IPromise<AxiosXHR<T>>;

        /**
         * Send request as configured
         */
        new <T>(config: AxiosXHRConfig<T>): IPromise<AxiosXHR<T>>;

        /**
         * Send request as configured
         */
        request<T>(config: AxiosXHRConfig<T>): IPromise<AxiosXHR<T>>;

        /**
         * intercept requests or responses before they are handled by then or catch
         */
        interceptors: Interceptor;

        /**
         * Config defaults
         */
        defaults: AxiosXHRConfigDefaults<any>;

        /**
         * equivalent to `Promise.all`
         */
        all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>, T3 | IPromise<AxiosXHR<T3>>, T4 | IPromise<AxiosXHR<T4>>, T5 | IPromise<AxiosXHR<T5>>, T6 | IPromise<AxiosXHR<T6>>, T7 | IPromise<AxiosXHR<T7>>, T8 | IPromise<AxiosXHR<T8>>, T9 |  IPromise<AxiosXHR<T9>>, T10 |  IPromise<AxiosXHR<T10>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>, AxiosXHR<T3>, AxiosXHR<T4>, AxiosXHR<T5>, AxiosXHR<T6>, AxiosXHR<T7>, AxiosXHR<T8>, AxiosXHR<T9>, AxiosXHR<T10>]>;
        all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>, T3 | IPromise<AxiosXHR<T3>>, T4 | IPromise<AxiosXHR<T4>>, T5 | IPromise<AxiosXHR<T5>>, T6 | IPromise<AxiosXHR<T6>>, T7 | IPromise<AxiosXHR<T7>>, T8 | IPromise<AxiosXHR<T8>>, T9 |  IPromise<AxiosXHR<T9>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>, AxiosXHR<T3>, AxiosXHR<T4>, AxiosXHR<T5>, AxiosXHR<T6>, AxiosXHR<T7>, AxiosXHR<T8>, AxiosXHR<T9>]>;
        all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>, T3 | IPromise<AxiosXHR<T3>>, T4 | IPromise<AxiosXHR<T4>>, T5 | IPromise<AxiosXHR<T5>>, T6 | IPromise<AxiosXHR<T6>>, T7 | IPromise<AxiosXHR<T7>>, T8 | IPromise<AxiosXHR<T8>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>, AxiosXHR<T3>, AxiosXHR<T4>, AxiosXHR<T5>, AxiosXHR<T6>, AxiosXHR<T7>, AxiosXHR<T8>]>;
        all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>, T3 | IPromise<AxiosXHR<T3>>, T4 | IPromise<AxiosXHR<T4>>, T5 | IPromise<AxiosXHR<T5>>, T6 | IPromise<AxiosXHR<T6>>, T7 | IPromise<AxiosXHR<T7>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>, AxiosXHR<T3>, AxiosXHR<T4>, AxiosXHR<T5>, AxiosXHR<T6>, AxiosXHR<T7>]>;
        all<T1, T2, T3, T4, T5, T6>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>, T3 | IPromise<AxiosXHR<T3>>, T4 | IPromise<AxiosXHR<T4>>, T5 | IPromise<AxiosXHR<T5>>, T6 | IPromise<AxiosXHR<T6>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>, AxiosXHR<T3>, AxiosXHR<T4>, AxiosXHR<T5>, AxiosXHR<T6>]>;
        all<T1, T2, T3, T4, T5>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>, T3 | IPromise<AxiosXHR<T3>>, T4 | IPromise<AxiosXHR<T4>>, T5 | IPromise<AxiosXHR<T5>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>, AxiosXHR<T3>, AxiosXHR<T4>, AxiosXHR<T5>]>;
        all<T1, T2, T3, T4>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>, T3 | IPromise<AxiosXHR<T3>>, T4 | IPromise<AxiosXHR<T4>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>, AxiosXHR<T3>, AxiosXHR<T4>]>;
        all<T1, T2, T3>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>, T3 | IPromise<AxiosXHR<T3>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>, AxiosXHR<T3>]>;
        all<T1, T2>(values: [T1 | IPromise<AxiosXHR<T1>>, T2 | IPromise<AxiosXHR<T2>>]): IPromise<[AxiosXHR<T1>, AxiosXHR<T2>]>;

        /**
         * spread array parameter to `fn`.
         * note: alternative to `spread`, destructuring assignment.
         */
        spread<T1, T2, U>(fn: (t1: T1, t2: T2) => U): (arr: ([T1, T2])) =>  U;

        /**
         * convenience alias, method = GET
         */
        get<T>(url: string, config?: AxiosXHRConfigBase<T>): IPromise<AxiosXHR<T>>;


        /**
         * convenience alias, method = DELETE
         */
        delete<T>(url: string, config?: AxiosXHRConfigBase<T>): IPromise<AxiosXHR<T>>;

        /**
         * convenience alias, method = HEAD
         */
        head<T>(url: string, config?: AxiosXHRConfigBase<T>): IPromise<AxiosXHR<T>>;

        /**
         * convenience alias, method = POST
         */
        post<T>(url: string, data?: any, config?: AxiosXHRConfigBase<T>): IPromise<AxiosXHR<T>>;

        /**
         * convenience alias, method = PUT
         */
        put<T>(url: string, data?: any, config?: AxiosXHRConfigBase<T>): IPromise<AxiosXHR<T>>;

        /**
         * convenience alias, method = PATCH
         */
        patch<T>(url: string, data?: any, config?: AxiosXHRConfigBase<T>): IPromise<AxiosXHR<T>>;
    }

    /**
     * <T> - expected response type,
     */
    interface AxiosStatic extends AxiosInstance {
        /**
         * create a new instance of axios with a custom config
         */
        create<T>(config: AxiosXHRConfigBase<T>): AxiosInstance;
    }
}

declare var axios: Axios.AxiosStatic;

declare module "axios" {
    export = axios;
}
/* *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

// Typing for the jQuery library, version 1.10

/*
    Interface for the AJAX setting that will configure the AJAX request 
*/
interface JQueryAjaxSettings {
    accepts?: any;
    async?: boolean;
    beforeSend? (jqXHR: JQueryXHR, settings: JQueryAjaxSettings): any;
    cache?: boolean;
    complete? (jqXHR: JQueryXHR, textStatus: string): any;
    contents?: { [key: string]: any; };
    contentType?: any;
    context?: any;
    converters?: { [key: string]: any; };
    crossDomain?: boolean;
    data?: any;
    dataFilter? (data: any, ty: any): any;
    dataType?: string;
    error? (jqXHR: JQueryXHR, textStatus: string, errorThrow: string): any;
    global?: boolean;
    headers?: { [key: string]: any; };
    ifModified?: boolean;
    isLocal?: boolean;
    jsonp?: string;
    jsonpCallback?: any;
    mimeType?: string;
    password?: string;
    processData?: boolean;
    scriptCharset?: string;
    statusCode?: { [key: string]: any; };
    success? (data: any, textStatus: string, jqXHR: JQueryXHR): any;
    timeout?: number;
    traditional?: boolean;
    type?: string;
    url?: string;
    username?: string;
    xhr?: any;
    xhrFields?: { [key: string]: any; };
}

/*
    Interface for the jqXHR object
*/
interface JQueryXHR extends XMLHttpRequest {
    overrideMimeType(): any;
}

/*
    Interface for the JQuery callback
*/
interface JQueryCallback {
    add(...callbacks: any[]): any;
    disable(): any;
    empty(): any;
    fire(...arguments: any[]): any;
    fired(): boolean;
    fireWith(context: any, ...args: any[]): any;
    has(callback: any): boolean;
    lock(): any;
    locked(): boolean;
    removed(...callbacks: any[]): any;
}

/*
    Interface for the JQuery promise, part of callbacks
*/
interface JQueryPromise {
    always(...alwaysCallbacks: any[]): JQueryDeferred;
    done(...doneCallbacks: any[]): JQueryDeferred;
    fail(...failCallbacks: any[]): JQueryDeferred;
    pipe(doneFilter?: (x: any) => any, failFilter?: (x: any) => any, progressFilter?: (x: any) => any): JQueryPromise;
    then(doneCallbacks: any, failCallbacks: any, progressCallbacks?: any): JQueryDeferred;
}

/*
    Interface for the JQuery deferred, part of callbacks
*/
interface JQueryDeferred extends JQueryPromise {
    notify(...args: any[]): JQueryDeferred;
    notifyWith(context: any, ...args: any[]): JQueryDeferred;

    progress(...progressCallbacks: any[]): JQueryDeferred;
    reject(...args: any[]): JQueryDeferred;
    rejectWith(context: any, ...args: any[]): JQueryDeferred;
    resolve(...args: any[]): JQueryDeferred;
    resolveWith(context: any, ...args: any[]): JQueryDeferred;
    state(): string;
    then(doneCallbacks: any, failCallbacks?: any, progressCallbacks?: any): JQueryDeferred;
}

/*
    Interface of the JQuery extension of the W3C event object
*/
interface JQueryEventObject extends Event {
    data: any;
    delegateTarget: Element;
    isDefaultPrevented(): boolean;
    isImmediatePropogationStopped(): boolean;
    isPropogationStopped(): boolean;
    namespace: string;
    preventDefault(): any;
    relatedTarget: Element;
    result: any;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    pageX: number;
    pageY: number;
    which: number;
    metaKey: any;
}

/*
    Collection of properties of the current browser
*/
interface JQueryBrowserInfo {
    safari: boolean;
    opera: boolean;
    msie: boolean;
    mozilla: boolean;
    version: string;
}

interface JQuerySupport {
    ajax?: boolean;
    boxModel?: boolean;
    changeBubbles?: boolean;
    checkClone?: boolean;
    checkOn?: boolean;
    cors?: boolean;
    cssFloat?: boolean;
    hrefNormalized?: boolean;
    htmlSerialize?: boolean;
    leadingWhitespace?: boolean;
    noCloneChecked?: boolean;
    noCloneEvent?: boolean;
    opacity?: boolean;
    optDisabled?: boolean;
    optSelected?: boolean;
    scriptEval? (): boolean;
    style?: boolean;
    submitBubbles?: boolean;
    tbody?: boolean;
}

interface JQueryTransport {
    send(headers: { [index: string]: string; }, completeCallback: (status: number, statusText: string, responses: { [dataType: string]: any; }, headers: string) => void): void;
    abort(): void;
}

/*
    Static members of jQuery (those on $ and jQuery themselves)
*/
interface JQueryStatic {

    // AJAX
    ajax(settings: JQueryAjaxSettings): JQueryXHR;
    ajax(url: string, settings: JQueryAjaxSettings): JQueryXHR;

    ajaxPrefilter(handler: (opts: any, originalOpts: any, jqXHR: JQueryXHR) => any): any;
    ajaxPrefilter(dataTypes: string, handler: (opts: any, originalOpts: any, jqXHR: JQueryXHR) => any): any;

    ajaxSetup(options: any): void;
    ajaxTransport(dataType: string, handler: (options: JQueryAjaxSettings, originalOptions: JQueryAjaxSettings, jqXHR: JQueryXHR) => JQueryTransport): void;

    get(url: string, data?: any, success?: any, dataType?: any): JQueryXHR;
    getJSON(url: string, data?: any, success?: any): JQueryXHR;
    getScript(url: string, success?: any): JQueryXHR;

    param(obj: any): string;
    param(obj: any, traditional: boolean): string;

    post(url: string, data?: any, success?: any, dataType?: any): JQueryXHR;

    // Callbacks
    Callbacks(flags: any): JQueryCallback;

    // Core
    holdReady(hold: boolean): any;

    (): JQuery;
    (selector: string, context?: any): JQuery;
    (element: Element): JQuery;
    (elementArray: Element[]): JQuery;
    (object: JQuery): JQuery;
    (func: Function): JQuery;
    (object: {}): JQuery;

    noConflict(removeAll?: boolean): Object;

    when(...deferreds: any[]): JQueryPromise;

    // CSS
    css(e: any, propertyName: string, value?: any): any;
    css(e: any, propertyName: any, value?: any): any;
    cssHooks: { [key: string]: any; };

    // Data
    data(element: Element, key: string, value: any): Object;

    dequeue(element: Element, queueName?: string): any;

    hasData(element: Element): boolean;

    queue(element: Element, queueName?: string): any[];
    queue(element: Element, queueName: string, newQueueOrCallback: any): JQuery;

    removeData(element: Element, name?: string): JQuery;

    // Deferred
    Deferred(beforeStart?: (deferred: JQueryDeferred) => any): JQueryDeferred;

    // Effects
    fx: { tick: () => void; interval: number; stop: () => void; speeds: { slow: number; fast: number; }; off: boolean; step: any; };

    // Events
    proxy(func: Function, context: any): any;
    proxy(context: any, name: string): any;

    // Internals
    error(message: any): void;

    // Miscellaneous
    expr: any;
    fn: any;  //TODO: Decide how we want to type this
    isReady: boolean;

    // Properties
    browser: JQueryBrowserInfo;
    support: JQuerySupport;

    // Utilities
    contains(container: Element, contained: Element): boolean;

    each(collection: any, callback: (indexInArray: any, valueOfElement: any) => any): any;

    extend(deep: boolean, target: any, ...objs: any[]): Object;
    extend(target: any, ...objs: any[]): Object;

    globalEval(code: string): any;

    grep(array: any[], func: any, invert: boolean): any[];

    inArray(value: any, array: any[], fromIndex?: number): number;

    isArray(obj: any): boolean;
    isEmptyObject(obj: any): boolean;
    isFunction(obj: any): boolean;
    isNumeric(value: any): boolean;
    isPlainObject(obj: any): boolean;
    isWindow(obj: any): boolean;
    isXMLDoc(node: Node): boolean;

    makeArray(obj: any): any[];

    map(array: any[], callback: (elementOfArray: any, indexInArray: any) => any): any[];

    merge(first: any[], second: any[]): any[];

    noop(): any;

    now(): number;

    parseHTML(data: string, context?: Element, keepScripts?: boolean): any[];
    parseJSON(json: string): any;

    //FIXME: This should return an XMLDocument
    parseXML(data: string): any;

    queue(element: Element, queueName: string, newQueue: any[]): JQuery;

    trim(str: string): string;

    type(obj: any): string;

    unique(arr: any[]): any[];
}

/*
    The jQuery instance members
*/
interface JQuery {
    // AJAX
    ajaxComplete(handler: any): JQuery;
    ajaxError(handler: (evt: any, xhr: any, opts: any) => any): JQuery;
    ajaxSend(handler: (evt: any, xhr: any, opts: any) => any): JQuery;
    ajaxStart(handler: () => any): JQuery;
    ajaxStop(handler: () => any): JQuery;
    ajaxSuccess(handler: (evt: any, xml: any, opts: any) => any): JQuery;

    serialize(): string;
    serializeArray(): any[];

    // Attributes
    addClass(classNames: string): JQuery;
    addClass(func: (index: any, currentClass: any) => JQuery): JQuery;

    attr(attributeName: string): string;
    attr(attributeName: string, func: (index: any, attr: any) => any): JQuery;
    attr(attributeName: string, value: any): JQuery;
    attr(map: { [key: string]: any; }): JQuery;

    hasClass(className: string): boolean;

    html(): string;
    html(htmlString: string): JQuery;

    prop(propertyName: string): any;
    prop(propertyName: string, func: (index: any, oldPropertyValue: any) => any): JQuery;
    prop(propertyName: string, value: any): JQuery;
    prop(map: any): JQuery;

    removeAttr(attributeName: any): JQuery;

    removeClass(func: (index: any, cls: any) => any): JQuery;
    removeClass(className?: string): JQuery;

    removeProp(propertyName: any): JQuery;

    toggleClass(func: (index: any, cls: any, swtch: any) => any): JQuery;
    toggleClass(swtch?: boolean): JQuery;
    toggleClass(className: any, swtch?: boolean): JQuery;

    val(): any;
    val(value: string[]): JQuery;
    val(value: string): JQuery;
    val(func: (index: any, value: any) => any): JQuery;

    // CSS
    css(propertyNames: any[]): string;
    css(propertyName: string): string;
    css(propertyName: string, value: any): JQuery;
    css(propertyName: any, value?: any): JQuery;

    height(): number;
    height(value: number): JQuery;
    height(func: (index: any, height: any) => any): JQuery;

    innerHeight(): number;
    innerWidth(): number;

    offset(): { top: number; left: number; };
    offset(func: (index: any, coords: any) => any): JQuery;
    offset(coordinates: any): JQuery;

    outerHeight(includeMargin?: boolean): number;
    outerWidth(includeMargin?: boolean): number;

    position(): { top: number; left: number; };

    scrollLeft(): number;
    scrollLeft(value: number): JQuery;

    scrollTop(): number;
    scrollTop(value: number): JQuery;

    width(): number;
    width(value: number): JQuery;
    width(func: (index: any, height: any) => any): JQuery;

    // Data
    clearQueue(queueName?: string): JQuery;

    data(key: string, value: any): JQuery;
    data(obj: { [key: string]: any; }): JQuery;
    data(key?: string): any;

    dequeue(queueName?: string): JQuery;

    queue(queueName?: string): any[];
    queue(queueName: string, newQueueOrCallback: any): JQuery;
    queue(newQueueOrCallback: any): JQuery;

    removeData(nameOrList?: any): JQuery;

    // Deferred
    promise(type?: any, target?: any): JQueryPromise;

    // Effects
    animate(properties: any, options: { duration?: any; easing?: string; complete?: Function; step?: Function; queue?: boolean; specialEasing?: any; }): JQuery;
    animate(properties: any, duration?: any, easing?: "linear", complete?: Function): JQuery;
    animate(properties: any, duration?: any, easing?: "swing", complete?: Function): JQuery;
    animate(properties: any, duration?: any, easing?: string, complete?: Function): JQuery;

    delay(duration: number, queueName?: string): JQuery;

    fadeIn(duration?: any, easing?: "linear", complete?: Function): JQuery;
    fadeIn(duration?: any, easing?: "swing", complete?: Function): JQuery;
    fadeIn(duration?: any, easing?: string, complete?: Function): JQuery;
    fadeIn(duration?: any, complete?: Function): JQuery;


    fadeOut(duration?: any, easing?: "linear", complete?: Function): JQuery;
    fadeOut(duration?: any, easing?: "swing", complete?: Function): JQuery;
    fadeOut(duration?: any, easing?: string, complete?: Function): JQuery;
    fadeOut(duration?: any, complete?: any): JQuery;

    fadeTo(duration: any, opacity: number, easing?: "linear", complete?: Function): JQuery;
    fadeTo(duration: any, opacity: number, easing?: "swing", complete?: Function): JQuery;
    fadeTo(duration: any, opacity: number, easing?: string, complete?: Function): JQuery;
    fadeTo(duration: any, opacity: number, complete?: Function): JQuery;

    fadeToggle(duration?: any, easing?: "linear", complete?: Function): JQuery;
    fadeToggle(duration?: any, easing?: "swing", complete?: Function): JQuery;
    fadeToggle(duration?: any, easing?: string, complete?: Function): JQuery;

    finish(queue?: string): JQuery;

    hide(duration?: any, easing?: "linear", callback?: Function): JQuery;
    hide(duration?: any, easing?: "swing", callback?: Function): JQuery;
    hide(duration?: any, easing?: string, callback?: Function): JQuery;
    hide(duration?: any, callback?: Function): JQuery;

    show(duration?: any, easing?: "linear", complete?: Function): JQuery;
    show(duration?: any, easing?: "swing", complete?: Function): JQuery;
    show(duration?: any, easing?: string, complete?: Function): JQuery;
    show(duration?: any, complete?: Function): JQuery;

    slideDown(duration?: any, easing?: "linear", complete?: Function): JQuery;
    slideDown(duration?: any, easing?: "swing", complete?: Function): JQuery;
    slideDown(duration?: any, easing?: string, complete?: Function): JQuery;
    slideDown(duration?: any, complete?: Function): JQuery;

    slideToggle(duration?: any, easing?: "linear", complete?: Function): JQuery;
    slideToggle(duration?: any, easing?: "swing", complete?: Function): JQuery;
    slideToggle(duration?: any, easing?: string, complete?: Function): JQuery;
    slideToggle(duration?: any, complete?: Function): JQuery;

    slideUp(duration?: any, easing?: "linear", complete?: Function): JQuery;
    slideUp(duration?: any, easing?: "swing", complete?: Function): JQuery;
    slideUp(duration?: any, easing?: string, complete?: Function): JQuery;
    slideUp(duration?: any, complete?: Function): JQuery;

    stop(clearQueue?: boolean, jumpToEnd?: boolean): JQuery;
    stop(queue?: any, clearQueue?: boolean, jumpToEnd?: boolean): JQuery;

    toggle(showOrHide: boolean): JQuery;
    toggle(duration?: any, easing?: "linear", complete?: Function): JQuery;
    toggle(duration?: any, easing?: "swing", complete?: Function): JQuery;
    toggle(duration?: any, easing?: string, complete?: Function): JQuery;
    toggle(duration?: any, complete?: Function): JQuery;

    // Events
    bind(eventType: string, preventBubble: boolean): JQuery;
    bind(eventType: string, eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    bind(eventType: string, eventData: any, preventBubble: boolean): JQuery;
    bind(...events: any[]): JQuery;

    blur(handler: (eventObject: JQueryEventObject) => any): JQuery;
    blur(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    change(handler: (eventObject: JQueryEventObject) => any): JQuery;
    change(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    click(handler: (eventObject: JQueryEventObject) => any): JQuery;
    click(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    dblclick(handler: (eventObject: JQueryEventObject) => any): JQuery;
    dblclick(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    delegate(selector: any, eventType: string, handler: (eventObject: JQueryEventObject) => any): JQuery;

    focus(handler: (eventObject: JQueryEventObject) => any): JQuery;
    focus(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    focusin(handler: (eventObject: JQueryEventObject) => any): JQuery;
    focusin(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    focusout(handler: (eventObject: JQueryEventObject) => any): JQuery;
    focusout(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    hover(handlerIn: (eventObject: JQueryEventObject) => any, handlerOut: (eventObject: JQueryEventObject) => any): JQuery;
    hover(handlerInOut: (eventObject: JQueryEventObject) => any): JQuery;

    keydown(handler: (eventObject: JQueryEventObject) => any): JQuery;
    keydown(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    keypress(handler: (eventObject: JQueryEventObject) => any): JQuery;
    keypress(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    keyup(handler: (eventObject: JQueryEventObject) => any): JQuery;
    keyup(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    mousedown(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mousedown(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    mouseevent(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseevent(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    mouseenter(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseenter(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    mouseleave(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseleave(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    mousemove(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mousemove(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    mouseout(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseout(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    mouseover(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseover(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    mouseup(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseup(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;

    off(events?: string, selector?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    off(eventsMap: { [key: string]: any; }, selector?: any): JQuery;

    on(events: string, selector?: any, data?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    on(eventsMap: { [key: string]: any; }, selector?: any, data?: any): JQuery;

    one(events: string, selector?: any, data?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    one(eventsMap: { [key: string]: any; }, selector?: any, data?: any): JQuery;

    ready(handler: any): JQuery;

    resize(handler: (eventObject: JQueryEventObject) => any): JQuery;
    resize(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    scroll(handler: (eventObject: JQueryEventObject) => any): JQuery;
    scroll(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    select(handler: (eventObject: JQueryEventObject) => any): JQuery;
    select(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    submit(handler: (eventObject: JQueryEventObject) => any): JQuery;
    submit(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;

    trigger(eventType: string, ...extraParameters: any[]): JQuery;
    trigger(event: JQueryEventObject): JQuery;

    triggerHandler(eventType: string, ...extraParameters: any[]): Object;

    unbind(eventType?: string, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    unbind(eventType: string, fls: boolean): JQuery;
    unbind(evt: any): JQuery;

    undelegate(): JQuery;
    undelegate(selector: any, eventType: string, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    undelegate(selector: any, events: any): JQuery;
    undelegate(namespace: string): JQuery;

    // Internals
    context: Element;
    jquery: string;
    pushStack(elements: any[]): JQuery;
    pushStack(elements: any[], name: any, arguments: any): JQuery;

    // Manipulation
    after(func: (index: any) => any): JQuery;
    after(...content: any[]): JQuery;

    append(func: (index: any, html: any) => any): JQuery;
    append(...content: any[]): JQuery;

    appendTo(target: any): JQuery;

    before(func: (index: any) => any): JQuery;
    before(...content: any[]): JQuery;

    clone(withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean): JQuery;

    detach(selector?: any): JQuery;

    empty(): JQuery;

    insertAfter(target: any): JQuery;
    insertBefore(target: any): JQuery;

    prepend(func: (index: any, html: any) => any): JQuery;
    prepend(...content: any[]): JQuery;

    prependTo(target: any): JQuery;

    remove(selector?: any): JQuery;

    replaceAll(target: any): JQuery;

    replaceWith(func: any): JQuery;

    text(textString: string): JQuery;
    text(): string;

    toArray(): any[];

    unwrap(): JQuery;

    wrap(func: (index: any) => any): JQuery;
    wrap(wrappingElement: any): JQuery;

    wrapAll(wrappingElement: any): JQuery;

    wrapInner(func: (index: any) => any): JQuery;
    wrapInner(wrappingElement: any): JQuery;

    // Miscellaneous
    each(func: (index: any, elem: Element) => any): JQuery;

    get(index?: number): any;

    index(selectorOrElement?: any): number;

    // Properties
    length: number;
    [x: number]: HTMLElement;

    // Traversing
    add(selector: string, context?: any): JQuery;
    add(html: string): JQuery;
    add(obj: JQuery): JQuery;
    add(...elements: any[]): JQuery;

    addBack(selector?: any): JQuery;

    children(selector?: any): JQuery;

    closest(selector: string): JQuery;
    closest(selector: string, context?: Element): JQuery;
    closest(obj: JQuery): JQuery;
    closest(element: any): JQuery;
    closest(selectors: any, context?: Element): any[];

    contents(): JQuery;

    end(): JQuery;

    eq(index: number): JQuery;

    filter(selector: string): JQuery;
    filter(func: (index: any) => any): JQuery;
    filter(obj: JQuery): JQuery;
    filter(element: any): JQuery;

    find(selector: string): JQuery;
    find(element: any): JQuery;
    find(obj: JQuery): JQuery;

    first(): JQuery;

    has(selector: string): JQuery;
    has(contained: Element): JQuery;

    is(selector: string): boolean;
    is(func: (index: any) => any): boolean;
    is(obj: JQuery): boolean;
    is(element: any): boolean;

    last(): JQuery;

    map(callback: (index: any, domElement: Element) => any): JQuery;

    next(selector?: string): JQuery;

    nextAll(selector?: string): JQuery;

    nextUntil(selector?: string, filter?: string): JQuery;
    nextUntil(element?: Element, filter?: string): JQuery;

    not(selector: string): JQuery;
    not(func: (index: any) => any): JQuery;
    not(obj: JQuery): JQuery;
    not(element: any): JQuery;

    offsetParent(): JQuery;

    parent(selector?: string): JQuery;

    parents(selector?: string): JQuery;

    parentsUntil(selector?: string, filter?: string): JQuery;
    parentsUntil(element?: Element, filter?: string): JQuery;

    prev(selector?: string): JQuery;

    prevAll(selector?: string): JQuery;

    prevUntil(selector?: string, filter?: string): JQuery;
    prevUntil(element?: Element, filter?: string): JQuery;

    siblings(selector?: string): JQuery;

    slice(start: number, end?: number): JQuery;
}

declare var jQuery: JQueryStatic;
declare var $: JQueryStatic;

class ArticleSearch extends React.Component  {
  readonly requestUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=";
  
  constructor(props){
        super(props);
        this.state = { searchResults: [] };
        this.search = this.search.bind(this);
    this.setResultList = this.setResultList.bind(this);
  }
  
  render() {
  return (
    <div>
    <div className="well text-center center-block">
      <i className="fa fa-wikipedia-w fa-4x"></i>
      <h5>Wikipedia Article Viewer</h5>
      <div className="input-group">
        <input type="text" className="form-control" aria-label="search input" id="searchText" placeholder="Search for..."/>
        <div className="input-group-btn">
          <button type="button" name="search" className="btn btn-default" aria-label="search" onClick={this.search}>
            <span className="fa fa-search" aria-hidden="true"></span>
          </button>
        </div>
      </div>  
    <a className="btn btn-default" id="random" href="https://en.wikipedia.org/wiki/Special:Random">
    Random Article
    </a>
    </div>
    <ArticleList results={this.state.searchResults}/>
    </div>
  )
  }
    
   public search(searchClick : event) : void {
   
    let searchText : string = encodeURI($("#searchText").val());
    
    axios.get(this.requestUrl + searchText).then(this.setResultList);
   }
  
  setResultList(response: any) {
      var result = response.data;
      let results : Article[] = [];
      for (var i = 0; i < result[1].length; i++) {
        results.push(new Article(result[1][i], result[2][i], result[3][i]));
      }
      this.setState({
        searchResults: results
      });
  }
}

class ArticleList extends React.Component<any, any> {
  props: { results: Article[] };
  
  render() {
    var results = this.props.results.map(function (article : Article) {
      return (
          <li>
          <div>
            <a href={article.url}>{article.title}</a>
          </div>
            {article.summary}
          </li>
      )
      
    }); 
    return (
      <div>
      <ul>
      {results}
      </ul>
      </div>
     )
    }
}

class Article {
  constructor(public title:string, public summary:string, public url:string) {
    this.title = title;
    this.summary = summary;
    this.url = url;
  }
}
  
  ReactDOM.render(<ArticleSearch />,  document.getElementById("articleSearch"));
//w/api.php?action=opensearch&format=json&search=Hitler&namespace=