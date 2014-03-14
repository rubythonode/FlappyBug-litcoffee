global.CONNS=OBJECT({init:function(t,e,a){"use strict";var o,r=t.socketPack,n={};a.addRoomFunc=o=function(t,e){void 0===n[t]&&(n[t]=[]),n[t].push(e)},r.on("connection",function(t){var e,a=t.handshake.headers["x-forwarded-for"],o={},r={},i={},d={};void 0===a&&(a=t.handshake.address.address),t.addListener("disconnect",function(){EACH(d,function(t){EACH(t,function(t){t()})})}),t.addListener("__ENTER_ROOM",function(c){EACH(n,function(n,s){var f,v="",u=s,m={};return f=function(t){var e,a;return-1!==u.indexOf("{")&&-1!==u.indexOf("}")&&(a=u.substring(0,u.indexOf("{")),v+"/"===a)?(e=u.substring(u.indexOf("{")+1,u.indexOf("}")),u=a+t+u.substring(u.indexOf("}")+1),{name:e,value:t}):void 0},EACH(c.split("/"),function(t,e){var a=f(t);return void 0!==a&&(m[a.name]=a.value),0===e?v=t:v+="/"+t,v===u?!1:void 0}),c===u?(void 0===r[c]?(o[c]=[],d[c]=[],t.join(c),EACH(n,function(r){o[c].push(r(c,t,a,t.handshake.headers,m,function(t){e=t},function(){return e},function(){e=void 0},i,d[c]))}),r[c]=1):r[c]+=1,!1):void 0})}),t.addListener("__EXIT_ROOM",function(e){r[e]-=1,0===r[e]&&(EACH(o[e],function(t){t.removeAllListeners()}),t.leave(e),delete o[e],delete r[e],delete d[e])})})}}),FOR_BOX(function(t){"use strict";t.DB=CLASS({init:function(e,a,o,r){var n,i,d,c,s,f,v,u,m,E,l,D,h,S,g,R,C,O,A,_,b=UPPERCASE.MODULE("mongolian").ObjectId;SERVER_CONFIG.isNotUsingDB===!0?(o.createData=E=function(){},o.createDataSafely=l=function(){},o.getData=D=function(){},o.updateData=h=function(){},o.updateDataSafely=S=function(){},o.removeData=g=function(){},o.removeDataSafely=R=function(){},o.findData=C=function(){},o.findDatas=O=function(){},o.countDatas=A=function(){},o.checkIsExists=_=function(){}):(n=UPPERCASE.db.collection(t.boxName+"."+r),i=UPPERCASE.db.collection(t.boxName+"."+r+"_backup"),d=UPPERCASE.db.collection(t.boxName+"."+r+"_error"),c=function(t){return new b(t)},s=function(t){return void 0!==t._id&&(t.id=t._id.toString()),delete t._id,delete t.__IS_ENABLED,t},f=function(t){EACH(t,function(e,a){e===TO_DELETE?REMOVE_AT({data:t,key:a}):(CHECK_IS_DATA(e)===!0||CHECK_IS_ARRAY(e)===!0)&&f(e)})},v=function(t){void 0!==t.id&&(CHECK_IS_DATA(t.id)===!0?(EACH(t.id,function(e,a){CHECK_IS_DATA(e)===!0||CHECK_IS_ARRAY(e)===!0?EACH(e,function(t,a){e[a]=c(t)}):t.id[a]=c(e)}),t._id=t.id):t._id=c(id),delete t.id),t.__IS_ENABLED=!0,EACH(t,function(e,a){void 0===e&&delete t[a]})},u=function(t){var e=t.call,a=t.data,o=new Date;i.save({call:e,time:o,data:a})},m=function(t){t.time=new Date,d.save(t)},o.createData=E=function(t,e){var a;try{t.__IS_ENABLED=!0,t.createTime=new Date,f(t),n.save(t),u({method:"createData",data:t}),void 0!==e&&(s(t),e(void 0,t))}catch(o){a=o.toString(),m({method:"createData",data:t,errorMsg:a}),void 0!==e&&e(a)}},o.createDataSafely=l=function(t,e){var a;try{t.__IS_ENABLED=!0,t.createTime=new Date,f(t),n.save(t,function(o,r){null===o?(u({method:"createDataSafely",data:r}),s(r),e(void 0,r)):(a=o.toString(),m({method:"createDataSafely",data:t,errorMsg:a}),e(a))})}catch(o){a=o.toString(),m({method:"createDataSafely",data:t,errorMsg:a}),e(a)}},o.getData=D=function(t,e){var a,o;try{a={_id:c(t),__IS_ENABLED:!0},n.findOne(a,function(a,r){null===a?(void 0!==r&&s(r),e(void 0,r)):(o=a.toString(),m({method:"getData",id:t,errorMsg:o}),e(o))})}catch(r){o=r.toString(),m({method:"getData",id:t,errorMsg:o}),e(o)}},o.updateData=h=function(t,e){var a,o,r=t.id;try{a={_id:c(r),__IS_ENABLED:!0},n.findOne(a,function(a,r){delete t.id,null===a?void 0===r?void 0!==e&&e():(EACH(r,function(e,a){(void 0===t[a]||"_id"===a||"__IS_ENABLED"===a||"createTime"===a)&&(t[a]=e)}),f(t),t.lastUpdateTime=new Date,n.save(t),u({method:"updateData",data:t}),void 0!==e&&(s(t),e(void 0,t))):(o=a.toString(),m({method:"updateData",data:t,errorMsg:o}),void 0!==e&&e(o))})}catch(i){o=i.toString(),m({method:"updateData",data:t,errorMsg:o}),void 0!==e&&e(o)}},o.updateDataSafely=S=function(t,e){var a,o,r=t.id;try{a={_id:c(r),__IS_ENABLED:!0},n.findOne(a,function(a,r){delete t.id,null===a?void 0===r?e():(EACH(r,function(e,a){(void 0===t[a]||"_id"===a||"__IS_ENABLED"===a||"createTime"===a)&&(t[a]=e)}),f(t),t.lastUpdateTime=new Date,n.save(t,function(a,r){null===a?(u({method:"updateDataSafely",data:r}),s(r),e(void 0,r)):(o=a.toString(),m({method:"updateDataSafely",data:t,errorMsg:o}),e(o))})):(o=a.toString(),m({method:"updateDataSafely",data:t,errorMsg:o}),e(o))})}catch(i){o=i.toString(),m({method:"updateDataSafely",data:t,errorMsg:o}),e(o)}},o.removeData=g=function(t,e){var a,o;try{a={_id:c(t),__IS_ENABLED:!0},n.findOne(a,function(a,r){null===a?void 0===r?void 0!==e&&e():(r.__IS_ENABLED=!1,r.removeTime=new Date,n.save(r),u({method:"removeData",data:r}),void 0!==e&&(s(r),e(void 0,r))):(o=a.toString(),m({method:"removeData",id:t,errorMsg:o}),void 0!==e&&e(o))})}catch(r){o=r.toString(),m({method:"removeData",id:t,errorMsg:o}),void 0!==e&&e(o)}},o.removeDataSafely=R=function(t,e){var a,o;try{a={_id:c(t),__IS_ENABLED:!0},n.findOne(a,function(a,r){null===a?void 0===r?e():(r.__IS_ENABLED=!1,r.removeTime=new Date,n.save(r,function(a,r){null===a?(u({method:"removeDataSafely",data:r}),s(r),e(void 0,r)):(o=a.toString(),m({method:"removeDataSafely",id:t,errorMsg:o}),e(o))})):(o=a.toString(),m({method:"removeDataSafely",id:t,errorMsg:o}),e(o))})}catch(r){o=r.toString(),m({method:"removeDataSafely",id:t,errorMsg:o}),e(o)}},o.findData=C=function(t,e){var a;void 0!==t&&void 0===e&&(e=t),void 0===t&&(t={});try{v(t),n.findOne(t,function(o,r){null===o?(void 0!==r&&s(r),e(void 0,r)):(a=o.toString(),m({method:"findData",filter:t,errorMsg:a}),e(a))})}catch(o){a=o.toString(),m({method:"findData",filter:t,errorMsg:a}),e(a)}},o.findDatas=O=function(t,e){var a,o,r=void 0===t?void 0:t.filter,i=void 0===t?void 0:t.sort,d=void 0===t?void 0:t.start,c=void 0===t||void 0===t.count?void 0:parseInt(t.count,10),f=void 0===t||void 0===t.isFindAll?void 0:parseInt(t.isFindAll,10);void 0!==t&&void 0===e&&(e=t);try{void 0===r&&(r={}),void 0===i&&(i={}),void 0===d&&(d=0),f!==!0&&(void 0===c||c>SERVER_CONFIG.maxDataCount||isNaN(c)===!0?c=SERVER_CONFIG.maxDataCount:1>c&&(c=1)),v(r),o=function(o,r){null===o?(void 0!==r&&EACH(r,function(t){s(t)}),e(void 0,r)):(a=o.toString(),m({method:"findDatas",params:t,errorMsg:a}),e(a))},f===!0?n.find(r).sort(i).skip(d).toArray(o):n.find(r).sort(i).skip(d).limit(c).toArray(o)}catch(u){a=u.toString(),m({method:"findDatas",params:t,errorMsg:a}),e(a)}},o.countDatas=A=function(t,e){var a;void 0!==t&&void 0===e&&(e=t),void 0===t&&(t={});try{v(t),n.find(t).count(function(o,r){null===o?e(void 0,r):(a=o.toString(),m({method:"countDatas",filter:t,errorMsg:a}),e(a))})}catch(o){a=o.toString(),m({method:"countDatas",filter:t,errorMsg:a}),e(a)}},o.checkIsExists=_=function(t,e){var a;void 0!==t&&void 0===e&&(e=t),void 0===t&&(t={});try{v(t),n.find(t).count(function(o,r){null===o?e(void 0,void 0!==r&&r>0):(a=o.toString(),m({method:"checkIsExists",filter:t,errorMsg:a}),e(a))})}catch(o){a=o.toString(),m({method:"checkIsExists",filter:t,errorMsg:a}),e(a)}})}})}),FOR_BOX(function(t){"use strict";t.LOG_DB=CLASS({init:function(e,a,o,r){var n,i;SERVER_CONFIG.isNotUsingDB===!0?o.log=i=function(){}:(n=UPPERCASE.db.collection(t.boxName+"."+r),o.log=i=function(t){t.time=new Date,n.save(t)})}})}),FOR_BOX(function(t){"use strict";OVERRIDE(t.MODEL,function(){t.MODEL=CLASS({init:function(e,a,o,r){var n,i,d,c,s,f,v,u,m,E,l,D,h,S,g,R,C,O,A,_,b,p=r.name,M=void 0===r.propertyNamesForNewEvent?[]:r.propertyNamesForNewEvent,y=r.config,N=t.DB(p);void 0!==y&&(n=y.create,i=y.getData,d=y.update,c=y.remove,s=y.findData,f=y.findDatas,v=y.countDatas,u=y.checkIsExists,void 0!==n&&(m=n.valid),void 0!==d&&(E=d.valid)),a.getCreateValid=l=function(){return m},a.getUpdateValid=D=function(){return E},t.ROOM(p+"/create"),EACH(M,function(e){t.ROOM(p+"/"+e+"/{value}/create")}),t.ROOM(p+"/remove"),EACH(M,function(e){t.ROOM(p+"/"+e+"/{value}/remove")}),t.ROOM(p,function(e){n!==!1&&e.on("create",function(o,r){var n,i=m.check({data:o});i.checkHasError()===!0?r({hasError:!0,errors:i.getErrors()}):(n=function(){N.createDataSafely(o,function(o,n){void 0!==o?r({hasError:!0,errorMsg:o}):(void 0!==a.afterCreate&&a.afterCreate(n),void 0!==a.afterCreateRoom&&a.afterCreateRoom({savedData:n,room:e}),t.ROOMS(p+"/create").broadcast({methodName:"create",data:n}),EACH(M,function(e){var a=n[e];t.ROOMS(p+"/"+e+"/"+a+"/create").broadcast({methodName:"create",data:n})}),r({hasError:!1,savedData:n}))})},void 0===a.beforeCreateRoom?void 0!==a.beforeCreate?a.beforeCreate(o,{ret:r,proc:n})!==!1&&n():n():a.beforeCreateRoom({data:o,room:e},{ret:r,proc:n}))}),i!==!1&&e.on("getData",g),s!==!1&&e.on("findData",O),f!==!1&&e.on("findDatas",function(t,e){delete t.isFindAll,A(t,e)}),v!==!1&&e.on("countDatas",_),u!==!1&&e.on("checkIsExists",b)}),t.ROOM(p+"/{id}",function(e,o){var r=o.id;d!==!1&&e.on("update",function(t,o){var n,i=E.check({data:t,isExceptUndefined:!0});t.id=r,i.checkHasError()===!0?o({hasError:!0,errors:i.getErrors()}):(n=function(){N.updateDataSafely(t,function(t,r){void 0!==t?o({hasError:!0,errorMsg:t}):(void 0!==r&&(void 0!==a.afterUpdate&&a.afterUpdate(r),void 0!==a.afterUpdateRoom&&a.afterUpdateRoom({savedData:r,room:e}),e.broadcast({methodName:"update",data:r})),o({hasError:!1,savedData:r}))})},void 0===a.beforeUpdateRoom?void 0!==a.beforeUpdate?a.beforeUpdate(t,{ret:o,proc:n})!==!1&&n():n():a.beforeUpdateRoom({data:t,room:e},{ret:o,proc:n})!==!1&&n())}),c!==!1&&e.on("remove",function(o,r){var n;n=function(){N.removeDataSafely(o,function(o,n){void 0!==o?r({hasError:!0,errorMsg:o}):(void 0!==n&&(void 0!==a.afterRemove&&a.afterRemove(n),void 0!==a.afterRemoveRoom&&a.afterRemoveRoom({savedData:n,room:e}),e.broadcast({methodName:"remove",data:n}),EACH(M,function(e){var a=n[e];t.ROOMS(p+"/"+e+"/"+a+"/remove").broadcast({methodName:"remove",data:n})})),r({hasError:!1,savedData:n}))})},void 0===a.beforeRemoveRoom?void 0!==a.beforeRemove?a.beforeRemove(o,{ret:r,proc:n})!==!1&&n():n():a.beforeRemoveRoom({id:o,room:e},{ret:r,proc:n})!==!1&&n()})}),a.getDB=h=function(){return N},n!==!1&&(o.create=S=function(e,o){var r,n=m.check({data:e});n.checkHasError()===!0?void 0!==o&&o({hasError:!0,errors:n.getErrors()}):(r=function(){N.createDataSafely(e,function(e,r){void 0!==e?void 0!==o&&o({hasError:!0,errorMsg:e}):(void 0!==a.afterCreate&&a.afterCreate(r),t.ROOMS(p+"/create").broadcast({methodName:"create",data:r}),EACH(M,function(e){var a=r[e];t.ROOMS(p+"/"+e+"/"+a+"/create").broadcast({methodName:"create",data:r})}),void 0!==o&&o({hasError:!1,savedData:r}))})},void 0!==a.beforeCreate?a.beforeCreate(e,{ret:o,proc:r})!==!1&&r():r())}),i!==!1&&(o.getData=g=function(t,e){N.getData(t,function(t,o){void 0!==t?void 0!==e&&e({hasError:!0,errorMsg:t}):(void 0===a.getData||a.getData(o,e)!==!1)&&void 0!==e&&e({hasError:!1,savedData:o})})}),d!==!1&&(o.update=R=function(e,o){var r,n=E.check({data:e,isExceptUndefined:!0});n.checkHasError()===!0?void 0!==o&&o({hasError:!0,errors:n.getErrors()}):(r=function(){N.updateDataSafely(e,function(r,n){void 0!==r?void 0!==o&&o({hasError:!0,errorMsg:r}):(void 0!==n&&(void 0!==a.afterUpdate&&a.afterUpdate(n),t.ROOMS(p+"/"+e.id).broadcast({methodName:"update",data:n})),void 0!==o&&o({hasError:!1,savedData:n}))})},void 0!==a.beforeUpdate?a.beforeUpdate(e,{ret:o,proc:r})!==!1&&r():r())}),c!==!1&&(o.remove=C=function(e,o){var r;r=function(){N.removeDataSafely(e,function(e,r){void 0!==e?void 0!==o&&o({hasError:!0,errorMsg:e}):(void 0!==r&&(void 0!==a.afterRemove&&a.afterRemove(r),t.ROOMS(p+"/"+r.id).broadcast({methodName:"remove",data:r}),EACH(M,function(e){var a=r[e];t.ROOMS(p+"/"+e+"/"+a+"/remove").broadcast({methodName:"remove",data:r})})),void 0!==o&&o({hasError:!1,savedData:r}))})},void 0!==a.beforeRemove?a.beforeRemove(e,{ret:o,proc:r})!==!1&&r():r()}),s!==!1&&(o.findData=O=function(t,e){N.findData(t,function(t,o){void 0!==t?void 0!==e&&e({hasError:!0,errorMsg:t}):(void 0===a.findData||a.findData(o,e)!==!1)&&void 0!==e&&e({hasError:!1,savedData:o})})}),f!==!1&&(o.findDatas=A=function(t,e){N.findDatas(t,function(t,o){void 0!==t?void 0!==e&&e({hasError:!0,errorMsg:t}):(void 0===a.findDatas||a.findDatas(o,e)!==!1)&&void 0!==e&&e({hasError:!1,savedDatas:o})})}),v!==!1&&(o.countDatas=_=function(t,e){N.countDatas(t,function(t,o){void 0!==t?void 0!==e&&e({hasError:!0,errorMsg:t}):(void 0===a.countDatas||a.countDatas(o,e)!==!1)&&void 0!==e&&e({hasError:!1,count:o})})}),u!==!1&&(o.checkIsExists=b=function(t,e){N.checkIsExists(t,function(t,o){void 0!==t?void 0!==e&&e({hasError:!0,errorMsg:t}):(void 0===a.checkIsExists||a.checkIsExists(o,e)!==!1)&&void 0!==e&&e({hasError:!1,isExists:o})})})}})})}),FOR_BOX(function(t){"use strict";t.MODULE=METHOD({run:function(e,a){var o=__dirname+"/../..";return require(o+"/"+t.boxName+"/SERVER/node_modules/"+a)}})}),FOR_BOX(function(t){"use strict";t.ROOM=METHOD({run:function(e,a,o){CONNS.addRoomFunc(t.boxName+"/"+a,function(t,e,a,r,n,i,d,c,s,f){var v=OBJECT({init:function(o,n,v){var u,m,E,l,D,h,S,g,R,C,O,A,_,b,p={};v.on=u=function(a,o){var r,n=t+"/"+a;r=function(t){var a=CHECK_IS_DATA(t.data)===!0?UNPACK_DATA(t.data):t.data,r=t.instantListenerName;o(a,function(t){e.emit(r,CHECK_IS_DATA(t)===!0?PACK_DATA(t):t)})},e.addListener(n,r),void 0===p[n]&&(p[n]=[]),p[n].push(r)},v.broadcast=m=function(e){var a=e.methodName,o=CHECK_IS_DATA(e.data)===!0?PACK_DATA(e.data):e.data,r=t+"/"+a;CONNS.type.socketPack["in"](t).emit(r,o)},v.broadcastExceptSender=E=function(a){var o=a.methodName,r=CHECK_IS_DATA(a.data)===!0?PACK_DATA(a.data):a.data,n=t+"/"+o;e.broadcast.to(t).emit(n,r)},v.removeAllListeners=l=function(){EACH(p,function(t,a){EACH(t,function(t){e.removeListener(a,t)})}),p.length=0},v.setAuthKey=D=function(t){i(t)},v.getAuthKey=h=function(){return d()},v.removeAuthKey=S=function(){c()},v.addRole=g=function(t){s[t]=!0},v.checkRole=R=function(t){return s[t]===!0},v.removeRole=C=function(t){REMOVE_AT({data:s,key:t})},v.removeAllRoles=O=function(){EACH(s,function(t,e){REMOVE_AT({data:s,key:e})})},v.addDisconnectListener=A=function(t){f.push(t)},v.getIp=_=function(){return a},v.getHeaders=b=function(){return r}}});return void 0!==o&&o(v,n),v})}})}),FOR_BOX(function(t){"use strict";t.ROOMS=CLASS({init:function(e,a,o,r){var n,i=t.boxName+"/"+r;o.broadcast=n=function(t){var e=t.methodName,a=CHECK_IS_DATA(t.data)===!0?PACK_DATA(t.data):t.data,o=i+"/"+e;CONNS.type.socketPack["in"](i).emit(o,a)}}})}),global.SERVER_CONFIG={dbName:"UPPERCASE-testdb",dbUsername:"test",dbPassword:"test",isNotRequiringDBAuth:!1,maxDataCount:1e3,securedUsername:"test",securedPassword:"test",authedPageUrl:"/UPPERCASE/R/AUTHED.html",errorPageUrl:"/UPPERCASE/R/ERROR.html"},global.SHA1=METHOD({run:function(t,e){"use strict";var a=e.key,o=e.password,r=require("crypto");return r.createHmac("sha1",a).update(o).digest("hex")}}),global.TIME_SYNC=OBJECT({init:function(){"use strict";UPPERCASE.ROOM("timeSync",function(t){t.on("sync",function(t,e){var a=new Date,o=t.now;e({diff:o-a})})})}});