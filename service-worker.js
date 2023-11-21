(()=>{"use strict";var __webpack_modules__={"./node_modules/workbox-core/_version.js":()=>{try{self["workbox:core:6.6.0"]&&_()}catch(e){}},"./node_modules/workbox-expiration/_version.js":()=>{try{self["workbox:expiration:6.6.0"]&&_()}catch(e){}},"./node_modules/workbox-precaching/_version.js":()=>{try{self["workbox:precaching:6.6.0"]&&_()}catch(e){}},"./node_modules/workbox-routing/_version.js":()=>{try{self["workbox:routing:6.6.0"]&&_()}catch(e){}},"./node_modules/workbox-strategies/_version.js":()=>{try{self["workbox:strategies:6.6.0"]&&_()}catch(e){}}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}(()=>{__webpack_require__("./node_modules/workbox-core/_version.js");const messageGenerator=(code,...args)=>{let msg=code;return args.length>0&&(msg+=` :: ${JSON.stringify(args)}`),msg};class WorkboxError_WorkboxError extends Error{constructor(errorCode,details){super(messageGenerator(errorCode,details)),this.name=errorCode,this.details=details}}const quotaErrorCallbacks=new Set;const _cacheNameDetails={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},_createCacheName=cacheName=>[_cacheNameDetails.prefix,cacheName,_cacheNameDetails.suffix].filter((value=>value&&value.length>0)).join("-"),cacheNames_cacheNames_getPrecacheName=userCacheName=>userCacheName||_createCacheName(_cacheNameDetails.precache),cacheNames_cacheNames_getRuntimeName=userCacheName=>userCacheName||_createCacheName(_cacheNameDetails.runtime);function stripParams(fullURL,ignoreParams){const strippedURL=new URL(fullURL);for(const param of ignoreParams)strippedURL.searchParams.delete(param);return strippedURL.href}let canConstructResponseFromBodyStream_supportStatus;function dontWaitFor(promise){promise.then((()=>{}))}class Deferred{constructor(){this.promise=new Promise(((resolve,reject)=>{this.resolve=resolve,this.reject=reject}))}}const getFriendlyURL=url=>new URL(String(url),location.href).href.replace(new RegExp(`^${location.origin}`),"");function waitUntil(event,asyncFn){const returnPromise=asyncFn();return event.waitUntil(returnPromise),returnPromise}async function copyResponse(response,modifier){let origin=null;if(response.url){origin=new URL(response.url).origin}if(origin!==self.location.origin)throw new WorkboxError_WorkboxError("cross-origin-copy-response",{origin});const clonedResponse=response.clone(),responseInit={headers:new Headers(clonedResponse.headers),status:clonedResponse.status,statusText:clonedResponse.statusText},modifiedResponseInit=modifier?modifier(responseInit):responseInit,body=function canConstructResponseFromBodyStream(){if(void 0===canConstructResponseFromBodyStream_supportStatus){const testResponse=new Response("");if("body"in testResponse)try{new Response(testResponse.body),canConstructResponseFromBodyStream_supportStatus=!0}catch(error){canConstructResponseFromBodyStream_supportStatus=!1}canConstructResponseFromBodyStream_supportStatus=!1}return canConstructResponseFromBodyStream_supportStatus}()?clonedResponse.body:await clonedResponse.blob();return new Response(body,modifiedResponseInit)}const instanceOfAny=(object,constructors)=>constructors.some((c=>object instanceof c));let idbProxyableTypes,cursorAdvanceMethods;const cursorRequestMap=new WeakMap,transactionDoneMap=new WeakMap,transactionStoreNamesMap=new WeakMap,transformCache=new WeakMap,reverseTransformCache=new WeakMap;let idbProxyTraps={get(target,prop,receiver){if(target instanceof IDBTransaction){if("done"===prop)return transactionDoneMap.get(target);if("objectStoreNames"===prop)return target.objectStoreNames||transactionStoreNamesMap.get(target);if("store"===prop)return receiver.objectStoreNames[1]?void 0:receiver.objectStore(receiver.objectStoreNames[0])}return wrap(target[prop])},set:(target,prop,value)=>(target[prop]=value,!0),has:(target,prop)=>target instanceof IDBTransaction&&("done"===prop||"store"===prop)||prop in target};function wrapFunction(func){return func!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?function getCursorAdvanceMethods(){return cursorAdvanceMethods||(cursorAdvanceMethods=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}().includes(func)?function(...args){return func.apply(unwrap(this),args),wrap(cursorRequestMap.get(this))}:function(...args){return wrap(func.apply(unwrap(this),args))}:function(storeNames,...args){const tx=func.call(unwrap(this),storeNames,...args);return transactionStoreNamesMap.set(tx,storeNames.sort?storeNames.sort():[storeNames]),wrap(tx)}}function transformCachableValue(value){return"function"==typeof value?wrapFunction(value):(value instanceof IDBTransaction&&function cacheDonePromiseForTransaction(tx){if(transactionDoneMap.has(tx))return;const done=new Promise(((resolve,reject)=>{const unlisten=()=>{tx.removeEventListener("complete",complete),tx.removeEventListener("error",error),tx.removeEventListener("abort",error)},complete=()=>{resolve(),unlisten()},error=()=>{reject(tx.error||new DOMException("AbortError","AbortError")),unlisten()};tx.addEventListener("complete",complete),tx.addEventListener("error",error),tx.addEventListener("abort",error)}));transactionDoneMap.set(tx,done)}(value),instanceOfAny(value,function getIdbProxyableTypes(){return idbProxyableTypes||(idbProxyableTypes=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}())?new Proxy(value,idbProxyTraps):value)}function wrap(value){if(value instanceof IDBRequest)return function promisifyRequest(request){const promise=new Promise(((resolve,reject)=>{const unlisten=()=>{request.removeEventListener("success",success),request.removeEventListener("error",error)},success=()=>{resolve(wrap(request.result)),unlisten()},error=()=>{reject(request.error),unlisten()};request.addEventListener("success",success),request.addEventListener("error",error)}));return promise.then((value=>{value instanceof IDBCursor&&cursorRequestMap.set(value,request)})).catch((()=>{})),reverseTransformCache.set(promise,request),promise}(value);if(transformCache.has(value))return transformCache.get(value);const newValue=transformCachableValue(value);return newValue!==value&&(transformCache.set(value,newValue),reverseTransformCache.set(newValue,value)),newValue}const unwrap=value=>reverseTransformCache.get(value);const readMethods=["get","getKey","getAll","getAllKeys","count"],writeMethods=["put","add","delete","clear"],cachedMethods=new Map;function getMethod(target,prop){if(!(target instanceof IDBDatabase)||prop in target||"string"!=typeof prop)return;if(cachedMethods.get(prop))return cachedMethods.get(prop);const targetFuncName=prop.replace(/FromIndex$/,""),useIndex=prop!==targetFuncName,isWrite=writeMethods.includes(targetFuncName);if(!(targetFuncName in(useIndex?IDBIndex:IDBObjectStore).prototype)||!isWrite&&!readMethods.includes(targetFuncName))return;const method=async function(storeName,...args){const tx=this.transaction(storeName,isWrite?"readwrite":"readonly");let target=tx.store;return useIndex&&(target=target.index(args.shift())),(await Promise.all([target[targetFuncName](...args),isWrite&&tx.done]))[0]};return cachedMethods.set(prop,method),method}!function replaceTraps(callback){idbProxyTraps=callback(idbProxyTraps)}((oldTraps=>({...oldTraps,get:(target,prop,receiver)=>getMethod(target,prop)||oldTraps.get(target,prop,receiver),has:(target,prop)=>!!getMethod(target,prop)||oldTraps.has(target,prop)})));__webpack_require__("./node_modules/workbox-expiration/_version.js");const normalizeURL=unNormalizedUrl=>{const url=new URL(unNormalizedUrl,location.href);return url.hash="",url.href};class CacheTimestampsModel{constructor(cacheName){this._db=null,this._cacheName=cacheName}_upgradeDb(db){const objStore=db.createObjectStore("cache-entries",{keyPath:"id"});objStore.createIndex("cacheName","cacheName",{unique:!1}),objStore.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(db){this._upgradeDb(db),this._cacheName&&function deleteDB(name,{blocked}={}){const request=indexedDB.deleteDatabase(name);return blocked&&request.addEventListener("blocked",(event=>blocked(event.oldVersion,event))),wrap(request).then((()=>{}))}(this._cacheName)}async setTimestamp(url,timestamp){const entry={url:url=normalizeURL(url),timestamp,cacheName:this._cacheName,id:this._getId(url)},tx=(await this.getDb()).transaction("cache-entries","readwrite",{durability:"relaxed"});await tx.store.put(entry),await tx.done}async getTimestamp(url){const db=await this.getDb(),entry=await db.get("cache-entries",this._getId(url));return null==entry?void 0:entry.timestamp}async expireEntries(minTimestamp,maxCount){const db=await this.getDb();let cursor=await db.transaction("cache-entries").store.index("timestamp").openCursor(null,"prev");const entriesToDelete=[];let entriesNotDeletedCount=0;for(;cursor;){const result=cursor.value;result.cacheName===this._cacheName&&(minTimestamp&&result.timestamp<minTimestamp||maxCount&&entriesNotDeletedCount>=maxCount?entriesToDelete.push(cursor.value):entriesNotDeletedCount++),cursor=await cursor.continue()}const urlsDeleted=[];for(const entry of entriesToDelete)await db.delete("cache-entries",entry.id),urlsDeleted.push(entry.url);return urlsDeleted}_getId(url){return this._cacheName+"|"+normalizeURL(url)}async getDb(){return this._db||(this._db=await function openDB(name,version,{blocked,upgrade,blocking,terminated}={}){const request=indexedDB.open(name,version),openPromise=wrap(request);return upgrade&&request.addEventListener("upgradeneeded",(event=>{upgrade(wrap(request.result),event.oldVersion,event.newVersion,wrap(request.transaction),event)})),blocked&&request.addEventListener("blocked",(event=>blocked(event.oldVersion,event.newVersion,event))),openPromise.then((db=>{terminated&&db.addEventListener("close",(()=>terminated())),blocking&&db.addEventListener("versionchange",(event=>blocking(event.oldVersion,event.newVersion,event)))})).catch((()=>{})),openPromise}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class CacheExpiration{constructor(cacheName,config={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=config.maxEntries,this._maxAgeSeconds=config.maxAgeSeconds,this._matchOptions=config.matchOptions,this._cacheName=cacheName,this._timestampModel=new CacheTimestampsModel(cacheName)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const minTimestamp=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,urlsExpired=await this._timestampModel.expireEntries(minTimestamp,this._maxEntries),cache=await self.caches.open(this._cacheName);for(const url of urlsExpired)await cache.delete(url,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,dontWaitFor(this.expireEntries()))}async updateTimestamp(url){await this._timestampModel.setTimestamp(url,Date.now())}async isURLExpired(url){if(this._maxAgeSeconds){const timestamp=await this._timestampModel.getTimestamp(url),expireOlderThan=Date.now()-1e3*this._maxAgeSeconds;return void 0===timestamp||timestamp<expireOlderThan}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}__webpack_require__("./node_modules/workbox-precaching/_version.js");function createCacheKey(entry){if(!entry)throw new WorkboxError_WorkboxError("add-to-cache-list-unexpected-type",{entry});if("string"==typeof entry){const urlObject=new URL(entry,location.href);return{cacheKey:urlObject.href,url:urlObject.href}}const{revision,url}=entry;if(!url)throw new WorkboxError_WorkboxError("add-to-cache-list-unexpected-type",{entry});if(!revision){const urlObject=new URL(url,location.href);return{cacheKey:urlObject.href,url:urlObject.href}}const cacheKeyURL=new URL(url,location.href),originalURL=new URL(url,location.href);return cacheKeyURL.searchParams.set("__WB_REVISION__",revision),{cacheKey:cacheKeyURL.href,url:originalURL.href}}class PrecacheInstallReportPlugin{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request,state})=>{state&&(state.originalRequest=request)},this.cachedResponseWillBeUsed=async({event,state,cachedResponse})=>{if("install"===event.type&&state&&state.originalRequest&&state.originalRequest instanceof Request){const url=state.originalRequest.url;cachedResponse?this.notUpdatedURLs.push(url):this.updatedURLs.push(url)}return cachedResponse}}}class PrecacheCacheKeyPlugin{constructor({precacheController}){this.cacheKeyWillBeUsed=async({request,params})=>{const cacheKey=(null==params?void 0:params.cacheKey)||this._precacheController.getCacheKeyForURL(request.url);return cacheKey?new Request(cacheKey,{headers:request.headers}):request},this._precacheController=precacheController}}__webpack_require__("./node_modules/workbox-strategies/_version.js");function toRequest(input){return"string"==typeof input?new Request(input):input}class StrategyHandler{constructor(strategy,options){this._cacheKeys={},Object.assign(this,options),this.event=options.event,this._strategy=strategy,this._handlerDeferred=new Deferred,this._extendLifetimePromises=[],this._plugins=[...strategy.plugins],this._pluginStateMap=new Map;for(const plugin of this._plugins)this._pluginStateMap.set(plugin,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(input){const{event}=this;let request=toRequest(input);if("navigate"===request.mode&&event instanceof FetchEvent&&event.preloadResponse){const possiblePreloadResponse=await event.preloadResponse;if(possiblePreloadResponse)return possiblePreloadResponse}const originalRequest=this.hasCallback("fetchDidFail")?request.clone():null;try{for(const cb of this.iterateCallbacks("requestWillFetch"))request=await cb({request:request.clone(),event})}catch(err){if(err instanceof Error)throw new WorkboxError_WorkboxError("plugin-error-request-will-fetch",{thrownErrorMessage:err.message})}const pluginFilteredRequest=request.clone();try{let fetchResponse;fetchResponse=await fetch(request,"navigate"===request.mode?void 0:this._strategy.fetchOptions);for(const callback of this.iterateCallbacks("fetchDidSucceed"))fetchResponse=await callback({event,request:pluginFilteredRequest,response:fetchResponse});return fetchResponse}catch(error){throw originalRequest&&await this.runCallbacks("fetchDidFail",{error,event,originalRequest:originalRequest.clone(),request:pluginFilteredRequest.clone()}),error}}async fetchAndCachePut(input){const response=await this.fetch(input),responseClone=response.clone();return this.waitUntil(this.cachePut(input,responseClone)),response}async cacheMatch(key){const request=toRequest(key);let cachedResponse;const{cacheName,matchOptions}=this._strategy,effectiveRequest=await this.getCacheKey(request,"read"),multiMatchOptions=Object.assign(Object.assign({},matchOptions),{cacheName});cachedResponse=await caches.match(effectiveRequest,multiMatchOptions);for(const callback of this.iterateCallbacks("cachedResponseWillBeUsed"))cachedResponse=await callback({cacheName,matchOptions,cachedResponse,request:effectiveRequest,event:this.event})||void 0;return cachedResponse}async cachePut(key,response){const request=toRequest(key);await function timeout_timeout(ms){return new Promise((resolve=>setTimeout(resolve,ms)))}(0);const effectiveRequest=await this.getCacheKey(request,"write");if(!response)throw new WorkboxError_WorkboxError("cache-put-with-no-response",{url:getFriendlyURL(effectiveRequest.url)});const responseToCache=await this._ensureResponseSafeToCache(response);if(!responseToCache)return!1;const{cacheName,matchOptions}=this._strategy,cache=await self.caches.open(cacheName),hasCacheUpdateCallback=this.hasCallback("cacheDidUpdate"),oldResponse=hasCacheUpdateCallback?await async function cacheMatchIgnoreParams(cache,request,ignoreParams,matchOptions){const strippedRequestURL=stripParams(request.url,ignoreParams);if(request.url===strippedRequestURL)return cache.match(request,matchOptions);const keysOptions=Object.assign(Object.assign({},matchOptions),{ignoreSearch:!0}),cacheKeys=await cache.keys(request,keysOptions);for(const cacheKey of cacheKeys)if(strippedRequestURL===stripParams(cacheKey.url,ignoreParams))return cache.match(cacheKey,matchOptions)}(cache,effectiveRequest.clone(),["__WB_REVISION__"],matchOptions):null;try{await cache.put(effectiveRequest,hasCacheUpdateCallback?responseToCache.clone():responseToCache)}catch(error){if(error instanceof Error)throw"QuotaExceededError"===error.name&&await async function executeQuotaErrorCallbacks(){for(const callback of quotaErrorCallbacks)await callback()}(),error}for(const callback of this.iterateCallbacks("cacheDidUpdate"))await callback({cacheName,oldResponse,newResponse:responseToCache.clone(),request:effectiveRequest,event:this.event});return!0}async getCacheKey(request,mode){const key=`${request.url} | ${mode}`;if(!this._cacheKeys[key]){let effectiveRequest=request;for(const callback of this.iterateCallbacks("cacheKeyWillBeUsed"))effectiveRequest=toRequest(await callback({mode,request:effectiveRequest,event:this.event,params:this.params}));this._cacheKeys[key]=effectiveRequest}return this._cacheKeys[key]}hasCallback(name){for(const plugin of this._strategy.plugins)if(name in plugin)return!0;return!1}async runCallbacks(name,param){for(const callback of this.iterateCallbacks(name))await callback(param)}*iterateCallbacks(name){for(const plugin of this._strategy.plugins)if("function"==typeof plugin[name]){const state=this._pluginStateMap.get(plugin),statefulCallback=param=>{const statefulParam=Object.assign(Object.assign({},param),{state});return plugin[name](statefulParam)};yield statefulCallback}}waitUntil(promise){return this._extendLifetimePromises.push(promise),promise}async doneWaiting(){let promise;for(;promise=this._extendLifetimePromises.shift();)await promise}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(response){let responseToCache=response,pluginsUsed=!1;for(const callback of this.iterateCallbacks("cacheWillUpdate"))if(responseToCache=await callback({request:this.request,response:responseToCache,event:this.event})||void 0,pluginsUsed=!0,!responseToCache)break;return pluginsUsed||responseToCache&&200!==responseToCache.status&&(responseToCache=void 0),responseToCache}}class Strategy_Strategy{constructor(options={}){this.cacheName=cacheNames_cacheNames_getRuntimeName(options.cacheName),this.plugins=options.plugins||[],this.fetchOptions=options.fetchOptions,this.matchOptions=options.matchOptions}handle(options){const[responseDone]=this.handleAll(options);return responseDone}handleAll(options){options instanceof FetchEvent&&(options={event:options,request:options.request});const event=options.event,request="string"==typeof options.request?new Request(options.request):options.request,params="params"in options?options.params:void 0,handler=new StrategyHandler(this,{event,request,params}),responseDone=this._getResponse(handler,request,event);return[responseDone,this._awaitComplete(responseDone,handler,request,event)]}async _getResponse(handler,request,event){let response;await handler.runCallbacks("handlerWillStart",{event,request});try{if(response=await this._handle(request,handler),!response||"error"===response.type)throw new WorkboxError_WorkboxError("no-response",{url:request.url})}catch(error){if(error instanceof Error)for(const callback of handler.iterateCallbacks("handlerDidError"))if(response=await callback({error,event,request}),response)break;if(!response)throw error}for(const callback of handler.iterateCallbacks("handlerWillRespond"))response=await callback({event,request,response});return response}async _awaitComplete(responseDone,handler,request,event){let response,error;try{response=await responseDone}catch(error){}try{await handler.runCallbacks("handlerDidRespond",{event,request,response}),await handler.doneWaiting()}catch(waitUntilError){waitUntilError instanceof Error&&(error=waitUntilError)}if(await handler.runCallbacks("handlerDidComplete",{event,request,response,error}),handler.destroy(),error)throw error}}class PrecacheStrategy extends Strategy_Strategy{constructor(options={}){options.cacheName=cacheNames_cacheNames_getPrecacheName(options.cacheName),super(options),this._fallbackToNetwork=!1!==options.fallbackToNetwork,this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin)}async _handle(request,handler){const response=await handler.cacheMatch(request);return response||(handler.event&&"install"===handler.event.type?await this._handleInstall(request,handler):await this._handleFetch(request,handler))}async _handleFetch(request,handler){let response;const params=handler.params||{};if(!this._fallbackToNetwork)throw new WorkboxError_WorkboxError("missing-precache-entry",{cacheName:this.cacheName,url:request.url});{0;const integrityInManifest=params.integrity,integrityInRequest=request.integrity,noIntegrityConflict=!integrityInRequest||integrityInRequest===integrityInManifest;if(response=await handler.fetch(new Request(request,{integrity:"no-cors"!==request.mode?integrityInRequest||integrityInManifest:void 0})),integrityInManifest&&noIntegrityConflict&&"no-cors"!==request.mode){this._useDefaultCacheabilityPluginIfNeeded();await handler.cachePut(request,response.clone());0}}return response}async _handleInstall(request,handler){this._useDefaultCacheabilityPluginIfNeeded();const response=await handler.fetch(request);if(!await handler.cachePut(request,response.clone()))throw new WorkboxError_WorkboxError("bad-precaching-response",{url:request.url,status:response.status});return response}_useDefaultCacheabilityPluginIfNeeded(){let defaultPluginIndex=null,cacheWillUpdatePluginCount=0;for(const[index,plugin]of this.plugins.entries())plugin!==PrecacheStrategy.copyRedirectedCacheableResponsesPlugin&&(plugin===PrecacheStrategy.defaultPrecacheCacheabilityPlugin&&(defaultPluginIndex=index),plugin.cacheWillUpdate&&cacheWillUpdatePluginCount++);0===cacheWillUpdatePluginCount?this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin):cacheWillUpdatePluginCount>1&&null!==defaultPluginIndex&&this.plugins.splice(defaultPluginIndex,1)}}PrecacheStrategy.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response})=>!response||response.status>=400?null:response},PrecacheStrategy.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response})=>response.redirected?await copyResponse(response):response};class PrecacheController{constructor({cacheName,plugins=[],fallbackToNetwork=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new PrecacheStrategy({cacheName:cacheNames_cacheNames_getPrecacheName(cacheName),plugins:[...plugins,new PrecacheCacheKeyPlugin({precacheController:this})],fallbackToNetwork}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(entries){this.addToCacheList(entries),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(entries){const urlsToWarnAbout=[];for(const entry of entries){"string"==typeof entry?urlsToWarnAbout.push(entry):entry&&void 0===entry.revision&&urlsToWarnAbout.push(entry.url);const{cacheKey,url}=createCacheKey(entry),cacheMode="string"!=typeof entry&&entry.revision?"reload":"default";if(this._urlsToCacheKeys.has(url)&&this._urlsToCacheKeys.get(url)!==cacheKey)throw new WorkboxError_WorkboxError("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(url),secondEntry:cacheKey});if("string"!=typeof entry&&entry.integrity){if(this._cacheKeysToIntegrities.has(cacheKey)&&this._cacheKeysToIntegrities.get(cacheKey)!==entry.integrity)throw new WorkboxError_WorkboxError("add-to-cache-list-conflicting-integrities",{url});this._cacheKeysToIntegrities.set(cacheKey,entry.integrity)}if(this._urlsToCacheKeys.set(url,cacheKey),this._urlsToCacheModes.set(url,cacheMode),urlsToWarnAbout.length>0){const warningMessage=`Workbox is precaching URLs without revision info: ${urlsToWarnAbout.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(warningMessage)}}}install(event){return waitUntil(event,(async()=>{const installReportPlugin=new PrecacheInstallReportPlugin;this.strategy.plugins.push(installReportPlugin);for(const[url,cacheKey]of this._urlsToCacheKeys){const integrity=this._cacheKeysToIntegrities.get(cacheKey),cacheMode=this._urlsToCacheModes.get(url),request=new Request(url,{integrity,cache:cacheMode,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey},request,event}))}const{updatedURLs,notUpdatedURLs}=installReportPlugin;return{updatedURLs,notUpdatedURLs}}))}activate(event){return waitUntil(event,(async()=>{const cache=await self.caches.open(this.strategy.cacheName),currentlyCachedRequests=await cache.keys(),expectedCacheKeys=new Set(this._urlsToCacheKeys.values()),deletedURLs=[];for(const request of currentlyCachedRequests)expectedCacheKeys.has(request.url)||(await cache.delete(request),deletedURLs.push(request.url));return{deletedURLs}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(url){const urlObject=new URL(url,location.href);return this._urlsToCacheKeys.get(urlObject.href)}getIntegrityForCacheKey(cacheKey){return this._cacheKeysToIntegrities.get(cacheKey)}async matchPrecache(request){const url=request instanceof Request?request.url:request,cacheKey=this.getCacheKeyForURL(url);if(cacheKey){return(await self.caches.open(this.strategy.cacheName)).match(cacheKey)}}createHandlerBoundToURL(url){const cacheKey=this.getCacheKeyForURL(url);if(!cacheKey)throw new WorkboxError_WorkboxError("non-precached-url",{url});return options=>(options.request=new Request(url),options.params=Object.assign({cacheKey},options.params),this.strategy.handle(options))}}let precacheController;const getOrCreatePrecacheController_getOrCreatePrecacheController=()=>(precacheController||(precacheController=new PrecacheController),precacheController);__webpack_require__("./node_modules/workbox-routing/_version.js");const normalizeHandler=handler=>handler&&"object"==typeof handler?handler:{handle:handler};class Route_Route{constructor(match,handler,method="GET"){this.handler=normalizeHandler(handler),this.match=match,this.method=method}setCatchHandler(handler){this.catchHandler=normalizeHandler(handler)}}class RegExpRoute extends Route_Route{constructor(regExp,handler,method){super((({url})=>{const result=regExp.exec(url.href);if(result&&(url.origin===location.origin||0===result.index))return result.slice(1)}),handler,method)}}class Router{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(event=>{const{request}=event,responsePromise=this.handleRequest({request,event});responsePromise&&event.respondWith(responsePromise)}))}addCacheListener(){self.addEventListener("message",(event=>{if(event.data&&"CACHE_URLS"===event.data.type){const{payload}=event.data;0;const requestPromises=Promise.all(payload.urlsToCache.map((entry=>{"string"==typeof entry&&(entry=[entry]);const request=new Request(...entry);return this.handleRequest({request,event})})));event.waitUntil(requestPromises),event.ports&&event.ports[0]&&requestPromises.then((()=>event.ports[0].postMessage(!0)))}}))}handleRequest({request,event}){const url=new URL(request.url,location.href);if(!url.protocol.startsWith("http"))return void 0;const sameOrigin=url.origin===location.origin,{params,route}=this.findMatchingRoute({event,request,sameOrigin,url});let handler=route&&route.handler;const method=request.method;if(!handler&&this._defaultHandlerMap.has(method)&&(handler=this._defaultHandlerMap.get(method)),!handler)return void 0;let responsePromise;try{responsePromise=handler.handle({url,request,event,params})}catch(err){responsePromise=Promise.reject(err)}const catchHandler=route&&route.catchHandler;return responsePromise instanceof Promise&&(this._catchHandler||catchHandler)&&(responsePromise=responsePromise.catch((async err=>{if(catchHandler){0;try{return await catchHandler.handle({url,request,event,params})}catch(catchErr){catchErr instanceof Error&&(err=catchErr)}}if(this._catchHandler)return this._catchHandler.handle({url,request,event});throw err}))),responsePromise}findMatchingRoute({url,sameOrigin,request,event}){const routes=this._routes.get(request.method)||[];for(const route of routes){let params;const matchResult=route.match({url,sameOrigin,request,event});if(matchResult)return params=matchResult,(Array.isArray(params)&&0===params.length||matchResult.constructor===Object&&0===Object.keys(matchResult).length||"boolean"==typeof matchResult)&&(params=void 0),{route,params}}return{}}setDefaultHandler(handler,method="GET"){this._defaultHandlerMap.set(method,normalizeHandler(handler))}setCatchHandler(handler){this._catchHandler=normalizeHandler(handler)}registerRoute(route){this._routes.has(route.method)||this._routes.set(route.method,[]),this._routes.get(route.method).push(route)}unregisterRoute(route){if(!this._routes.has(route.method))throw new WorkboxError_WorkboxError("unregister-route-but-not-found-with-method",{method:route.method});const routeIndex=this._routes.get(route.method).indexOf(route);if(!(routeIndex>-1))throw new WorkboxError_WorkboxError("unregister-route-route-not-registered");this._routes.get(route.method).splice(routeIndex,1)}}let defaultRouter;const getOrCreateDefaultRouter_getOrCreateDefaultRouter=()=>(defaultRouter||(defaultRouter=new Router,defaultRouter.addFetchListener(),defaultRouter.addCacheListener()),defaultRouter);function registerRoute(capture,handler,method){let route;if("string"==typeof capture){const captureUrl=new URL(capture,location.href);0;route=new Route_Route((({url})=>url.href===captureUrl.href),handler,method)}else if(capture instanceof RegExp)route=new RegExpRoute(capture,handler,method);else if("function"==typeof capture)route=new Route_Route(capture,handler,method);else{if(!(capture instanceof Route_Route))throw new WorkboxError_WorkboxError("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});route=capture}return getOrCreateDefaultRouter_getOrCreateDefaultRouter().registerRoute(route),route}class PrecacheRoute extends Route_Route{constructor(precacheController,options){super((({request})=>{const urlsToCacheKeys=precacheController.getURLsToCacheKeys();for(const possibleURL of function*generateURLVariations(url,{ignoreURLParametersMatching=[/^utm_/,/^fbclid$/],directoryIndex="index.html",cleanURLs=!0,urlManipulation}={}){const urlObject=new URL(url,location.href);urlObject.hash="",yield urlObject.href;const urlWithoutIgnoredParams=function removeIgnoredSearchParams(urlObject,ignoreURLParametersMatching=[]){for(const paramName of[...urlObject.searchParams.keys()])ignoreURLParametersMatching.some((regExp=>regExp.test(paramName)))&&urlObject.searchParams.delete(paramName);return urlObject}(urlObject,ignoreURLParametersMatching);if(yield urlWithoutIgnoredParams.href,directoryIndex&&urlWithoutIgnoredParams.pathname.endsWith("/")){const directoryURL=new URL(urlWithoutIgnoredParams.href);directoryURL.pathname+=directoryIndex,yield directoryURL.href}if(cleanURLs){const cleanURL=new URL(urlWithoutIgnoredParams.href);cleanURL.pathname+=".html",yield cleanURL.href}if(urlManipulation){const additionalURLs=urlManipulation({url:urlObject});for(const urlToAttempt of additionalURLs)yield urlToAttempt.href}}(request.url,options)){const cacheKey=urlsToCacheKeys.get(possibleURL);if(cacheKey){return{cacheKey,integrity:precacheController.getIntegrityForCacheKey(cacheKey)}}}}),precacheController.strategy)}}const cacheOkAndOpaquePlugin_cacheOkAndOpaquePlugin={cacheWillUpdate:async({response})=>200===response.status||0===response.status?response:null};!function clientsClaim(){self.addEventListener("activate",(()=>self.clients.claim()))}(),function precacheAndRoute(entries,options){!function precache(entries){getOrCreatePrecacheController_getOrCreatePrecacheController().precache(entries)}(entries),function addRoute(options){const precacheController=getOrCreatePrecacheController_getOrCreatePrecacheController();registerRoute(new PrecacheRoute(precacheController,options))}(options)}([{'revision':null,'url':'296.21d1f400.iframe.bundle.js'},{'revision':null,'url':'341.0327fb9a.iframe.bundle.js'},{'revision':null,'url':'350.d90b39b4.iframe.bundle.js'},{'revision':null,'url':'426.ca272641.iframe.bundle.js'},{'revision':null,'url':'669.2c13bcda.iframe.bundle.js'},{'revision':null,'url':'729.4fab1099.iframe.bundle.js'},{'revision':null,'url':'902.89dde037.iframe.bundle.js'},{'revision':null,'url':'984.5e90e5bd.iframe.bundle.js'},{'revision':'afdd63019cf0b033f2d3a74b0487caf7','url':'iframe.html'},{'revision':null,'url':'main.1383817f.iframe.bundle.js'},{'revision':null,'url':'runtime~main.42b86c00.iframe.bundle.js'},{'revision':null,'url':'static/css/main.87cd4bca.css'},{'revision':null,'url':'static/css/ui-components-Avatar-Avatar-stories.5bc0f76e.chunk.css'},{'revision':null,'url':'static/css/ui-components-Badge-Badge-stories.d14e2544.chunk.css'},{'revision':null,'url':'static/css/ui-components-Button-Button-stories.55de01ca.chunk.css'},{'revision':null,'url':'static/css/ui-components-Divider-Divider-stories.ac420015.chunk.css'},{'revision':null,'url':'static/css/ui-components-Input-Input-stories.cdf8016a.chunk.css'},{'revision':null,'url':'static/css/ui-components-Select-Select-stories.1a7b3b01.chunk.css'},{'revision':null,'url':'static/css/ui-components-Slider-Slider-stories.f403f500.chunk.css'},{'revision':null,'url':'static/css/ui-components-Typography-TypographyLink-TypographyLink-stories.777491d5.chunk.css'},{'revision':null,'url':'static/css/ui-components-Typography-TypographyText-TypographyText-stories.82c8143d.chunk.css'},{'revision':null,'url':'static/css/ui-components-Typography-TypographyTitle-TypographyTitle-stories.149bcf91.chunk.css'},{'revision':null,'url':'static/media/messages.c2e603266cf3a6c9dafc00194bac11a9.svg'},{'revision':null,'url':'static/media/search.26135a85091478f040e90805a2808b7a.svg'},{'revision':null,'url':'ui-components-Avatar-Avatar-stories.f78aa4ed.iframe.bundle.js'},{'revision':null,'url':'ui-components-Badge-Badge-stories.3d9646ca.iframe.bundle.js'},{'revision':null,'url':'ui-components-Button-Button-stories.dc6e94ad.iframe.bundle.js'},{'revision':null,'url':'ui-components-Divider-Divider-stories.aaf070e3.iframe.bundle.js'},{'revision':null,'url':'ui-components-Input-Input-stories.42bfc0dc.iframe.bundle.js'},{'revision':null,'url':'ui-components-Select-Select-stories.73ed433b.iframe.bundle.js'},{'revision':null,'url':'ui-components-Slider-Slider-stories.3c19c9a8.iframe.bundle.js'},{'revision':null,'url':'ui-components-Typography-TypographyLink-TypographyLink-stories.9a880cc1.iframe.bundle.js'},{'revision':null,'url':'ui-components-Typography-TypographyText-TypographyText-stories.975805ec.iframe.bundle.js'},{'revision':null,'url':'ui-components-Typography-TypographyTitle-TypographyTitle-stories.db242bc9.iframe.bundle.js'}]);const fileExtensionRegexp=new RegExp("/[^/?]+\\.[^/]+$");registerRoute((_ref=>{let{request,url}=_ref;return"navigate"===request.mode&&(!url.pathname.startsWith("/_")&&!url.pathname.match(fileExtensionRegexp))}),function createHandlerBoundToURL(url){return getOrCreatePrecacheController_getOrCreatePrecacheController().createHandlerBoundToURL(url)}("./index.html")),registerRoute((_ref2=>{let{url}=_ref2;return url.origin===self.location.origin&&url.pathname.endsWith(".png")}),new class StaleWhileRevalidate extends Strategy_Strategy{constructor(options={}){super(options),this.plugins.some((p=>"cacheWillUpdate"in p))||this.plugins.unshift(cacheOkAndOpaquePlugin_cacheOkAndOpaquePlugin)}async _handle(request,handler){const fetchAndCachePromise=handler.fetchAndCachePut(request).catch((()=>{}));handler.waitUntil(fetchAndCachePromise);let error,response=await handler.cacheMatch(request);if(response)0;else{0;try{response=await fetchAndCachePromise}catch(err){err instanceof Error&&(error=err)}}if(!response)throw new WorkboxError_WorkboxError("no-response",{url:request.url,error});return response}}({cacheName:"images",plugins:[new class ExpirationPlugin{constructor(config={}){this.cachedResponseWillBeUsed=async({event,request,cacheName,cachedResponse})=>{if(!cachedResponse)return null;const isFresh=this._isResponseDateFresh(cachedResponse),cacheExpiration=this._getCacheExpiration(cacheName);dontWaitFor(cacheExpiration.expireEntries());const updateTimestampDone=cacheExpiration.updateTimestamp(request.url);if(event)try{event.waitUntil(updateTimestampDone)}catch(error){0}return isFresh?cachedResponse:null},this.cacheDidUpdate=async({cacheName,request})=>{const cacheExpiration=this._getCacheExpiration(cacheName);await cacheExpiration.updateTimestamp(request.url),await cacheExpiration.expireEntries()},this._config=config,this._maxAgeSeconds=config.maxAgeSeconds,this._cacheExpirations=new Map,config.purgeOnQuotaError&&function registerQuotaErrorCallback(callback){quotaErrorCallbacks.add(callback)}((()=>this.deleteCacheAndMetadata()))}_getCacheExpiration(cacheName){if(cacheName===cacheNames_cacheNames_getRuntimeName())throw new WorkboxError_WorkboxError("expire-custom-caches-only");let cacheExpiration=this._cacheExpirations.get(cacheName);return cacheExpiration||(cacheExpiration=new CacheExpiration(cacheName,this._config),this._cacheExpirations.set(cacheName,cacheExpiration)),cacheExpiration}_isResponseDateFresh(cachedResponse){if(!this._maxAgeSeconds)return!0;const dateHeaderTimestamp=this._getDateHeaderTimestamp(cachedResponse);if(null===dateHeaderTimestamp)return!0;return dateHeaderTimestamp>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(cachedResponse){if(!cachedResponse.headers.has("date"))return null;const dateHeader=cachedResponse.headers.get("date"),headerTime=new Date(dateHeader).getTime();return isNaN(headerTime)?null:headerTime}async deleteCacheAndMetadata(){for(const[cacheName,cacheExpiration]of this._cacheExpirations)await self.caches.delete(cacheName),await cacheExpiration.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(event=>{event.data&&"SKIP_WAITING"===event.data.type&&self.skipWaiting()}))})()})();