!function(e){function t(t){for(var n,r,a=t[0],c=t[1],h=t[2],p=0,d=[];p<a.length;p++)r=a[p],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(l&&l(t);d.length;)d.shift()();return s.push.apply(s,h||[]),o()}function o(){for(var e,t=0;t<s.length;t++){for(var o=s[t],n=!0,a=1;a<o.length;a++){var c=o[a];0!==i[c]&&(n=!1)}n&&(s.splice(t--,1),e=r(r.s=o[0]))}return e}var n={},i={0:0},s=[];function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var h=0;h<a.length;h++)t(a[h]);var l=c;s.push([8,1]),o()}({4:function(e,t,o){var n=o(5),i=o(6);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var s={insert:"head",singleton:!1};n(i,s);e.exports=i.locals||{}},6:function(e,t,o){"use strict";o.r(t);var n=o(2),i=o.n(n)()(!1);i.push([e.i,"html, body {\r\n  overflow: hidden;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  justify-content: center;\r\n  display: flex;\r\n  /*background-color: black;*/\r\n  align-items: center;\r\n  height: 100vh;\r\n}\r\n\r\n.controls {\r\n  color: white;\r\n  border-style: solid;\r\n  border-radius: 10px;\r\n  width: 30%;\r\n}\r\n\r\n.controls__slider {\r\n  display: inline-block;\r\n  margin: 3px;\r\n  margin-left: 11%;\r\n}\r\n\r\nimg {\r\n  position: fixed;\r\n  top: 0px;\r\n  left: 0px;\r\n  height: 100%;\r\n  width: 100%;\r\n  z-index: 99;\r\n}\r\n\r\ncanvas {\r\n  position: fixed;\r\n  top: 0px;\r\n  left: 0px;\r\n}\r\n\r\n.parent {\r\n  position: relative;\r\n}\r\n",""]),t.default=i},8:function(e,t,o){"use strict";o.r(t);o(4);var n=o(0);class i{constructor(e){const t=e.domElement.width/e.domElement.height;this.threeCamera=new n.l(60,t,.1,1500),this.threeCamera.position.set(0,10,0),this.updateSize(e),window.addEventListener("resize",()=>this.updateSize(e),!1)}updateSize(e){this.threeCamera.aspect=e.domElement.width/e.domElement.height,this.threeCamera.updateProjectionMatrix()}}class s{constructor(e,t){this.container=e,this.threeRenderer=new n.w({antialias:!0,canvas:t}),this.threeRenderer.outputEncoding=n.h,this.threeRenderer.setPixelRatio(window.devicePixelRatio),e.appendChild(this.threeRenderer.domElement),this.updateSize(),document.addEventListener("DOMContentLoaded",()=>this.updateSize(),!1),window.addEventListener("resize",()=>this.updateSize(),!1)}updateSize(){this.threeRenderer.setSize(window.innerWidth,window.innerHeight)}render(e,t){this.threeRenderer.render(e,t)}}let r=new n.k({color:10234131}),a=[{sX:150,sY:300,pX:0,pZ:-140},{sX:630,sY:90,pX:0,pZ:-335},{sX:90,sY:450,pX:-270,pZ:-605},{sX:90,sY:450,pX:270,pZ:-605},{sX:630,sY:90,pX:0,pZ:-875},{sX:150,sY:90,pX:-150,pZ:-605},{sX:150,sY:90,pX:150,pZ:-605},{sX:150,sY:150,pX:0,pZ:-605},{sX:150,sY:300,pX:0,pZ:-1070}];class c{constructor(){this.planes=[],a.forEach(e=>{var t=new n.j(new n.m(e.sX,e.sY,1,1),r);t.rotation.x=-Math.PI/2,t.position.y=-18,t.position.x+=e.pX,t.position.z+=e.pZ,this.planes.push(t)})}}var h=o.p+"img/c287d268865cf4e56d77234a75027be8.png";class l{constructor(e){let t=(new n.u).load(h);t.wrapS=n.p,t.wrapT=n.p,t.repeat.set(100,100),e.uTexture={type:"t",value:t};let o=new n.r({vertexShader:"\nuniform float uPhase;\n\nvarying vec2 vTexcoord;\n\nvoid main() {\n  vec4 pos = vec4(position, 1.0);\n  pos.z = 1.0 * sin(0.4 * pos.x + uPhase) * sin(0.4 * pos.y + uPhase);\n  vTexcoord = vec2(round(pos.x) / 40.0, round(pos.y) / 40.0);\n  gl_Position = projectionMatrix * modelViewMatrix * pos;\n}",fragmentShader:"\nvarying vec2 vTexcoord;\n\nuniform sampler2D uTexture;\n\nvoid main() {\n  gl_FragColor = texture2D(uTexture, vTexcoord);\n  //gl_FragColor = vec4(0.0, 0.7, 0.0, 1.0);\n}",uniforms:e}),i=new n.j(new n.m(540,540,100,100),o);i.geometry.vertices,i.rotation.x=-Math.PI/2,i.position.y=-20,i.position.z-=605,this.plane=i}}let p=new n.k({color:10234131}),d=[{sX:150,pX:0,pZ:10,r:Math.PI},{sX:300,pX:-75,pZ:-140,r:Math.PI/2},{sX:300,pX:75,pZ:-140,r:-Math.PI/2},{sX:240,pX:-195,pZ:-290,r:Math.PI},{sX:240,pX:195,pZ:-290,r:Math.PI},{sX:240,pX:-195,pZ:-290,r:Math.PI},{sX:630,pX:-315,pZ:-605,r:Math.PI/2},{sX:630,pX:315,pZ:-605,r:-Math.PI/2},{sX:240,pX:-195,pZ:-920,r:0},{sX:240,pX:195,pZ:-920,r:0},{sX:150,pX:0,pZ:-1220,r:0},{sX:300,pX:-75,pZ:-1070,r:Math.PI/2},{sX:300,pX:75,pZ:-1070,r:-Math.PI/2}];class u{constructor(){this.planes=[],d.forEach(e=>{var t=new n.j(new n.m(e.sX,70,1,1),p);t.rotation.y=e.r,t.position.x+=e.pX,t.position.z+=e.pZ,t.position.y=17,this.planes.push(t)})}}let m=new n.k({color:10234131}),w=[{sX:150,sY:1230,pX:0,pZ:-605},{sX:240,sY:630,pX:195,pZ:-605},{sX:240,sY:630,pX:-195,pZ:-605}];class v{constructor(){this.planes=[],w.forEach(e=>{var t=new n.j(new n.m(e.sX,e.sY,1,1),m);t.rotation.x=Math.PI/2,t.position.y=52,t.position.x+=e.pX,t.position.z+=e.pZ,this.planes.push(t)})}}let f=new n.k({color:10859945}),y=new n.k({color:1942335});class g{constructor(e,t,o,i,s,r){this.scene=o,this.timer=1.5,this.player=t,this.bullets=e,this.walls=r,this.hp=10;var a=new n.j(new n.d(10,30),f);a.position.x=i,a.position.z=s,a.position.y=-10,o.add(a),this.downCone=a;var c=new n.j(new n.s(10,10),y);c.position.x=i,c.position.z=s,c.position.y=15,o.add(c),this.sphere=c;var h=new n.j(new n.d(10,30),f);h.rotation.x=Math.PI,h.position.x=i,h.position.z=s,h.position.y=40,o.add(h),this.upCone=h}onhit(){this.hp--,0==this.hp&&(this.scene.remove(this.sphere),this.scene.remove(this.upCone),this.scene.remove(this.downCone))}shoot(e){this.sphere.lookAt(e);let t=new n.o(this.sphere.position,this.sphere.getWorldDirection().normalize(),0,2e3),o=new n.j(new n.s(1,1),f);o.position.set(e.x,e.y,e.z),o.updateMatrixWorld();let i=t.intersectObject(o)[0].distance,s=t.intersectObjects(this.walls)[0],r=0;if(r=void 0===s?1e3:s.distance,!(r<i)){var a=new n.j(new n.s(8,8),f);a.position.copy(this.sphere.position),a.lookAt(e),this.bullets.push({object:a,dis:r}),this.scene.add(a)}}update(e){this.timer-=e,this.timer<=0&&(this.shoot(this.player.position),this.timer=1.5)}}class b{constructor(e,t,o,n){this.floor=new c,this.floor.planes.forEach(t=>{e.add(t)}),this.roof=new v,this.roof.planes.forEach(t=>{e.add(t)}),e.add(new l(t).plane),this.walls=new u,this.walls.planes.forEach(t=>{e.add(t)}),this.bullets=[],this.enemies=[new g(this.bullets,o,e,-270,-335,this.walls.planes),new g(this.bullets,o,e,270,-335,this.walls.planes),new g(this.bullets,o,e,270,-875,this.walls.planes),new g(this.bullets,o,e,-270,-875,this.walls.planes)],this.scene=e,this.camera=o,this.player=n}update(e){if(this.enemies.forEach(t=>{t.hp>0&&t.update(e)}),0!=this.bullets.length)for(let e=this.bullets.length-1;e>=0;e--){let t=this.bullets[e],o=new n.v;o.setFromMatrixColumn(t.object.matrix,0),o.crossVectors(new n.v(0,1,0),o),t.object.position.addScaledVector(o,-2),t.dis-=2,t.object.position.distanceTo(this.camera.position)<=10?(this.scene.remove(t.object),this.bullets.splice(e,1),this.player.onhit(),e--):t.dis<=0&&(this.scene.remove(t.object),this.bullets.splice(e,1),e--)}}moveLevel(e,t){this.elements.forEach(o=>{o.position.x+=e,o.position.z+=t})}}o(3);class x{constructor(e,t){var o=new n.i(16711680,16711680,.5);o.color.setHSL(.6,1,.6),o.groundColor.setHSL(.095,.8,.5),o.position.set(0,30,0),e.add(o);var i=new n.e(16777215,.1);i.position.set(0,10,0),i.castShadow=!0,i.shadow.camera.near=1,i.shadow.camera.far=2,i.shadow.camera.left=-.1,i.shadow.camera.bottom=-.1,i.shadow.camera.right=.1,i.shadow.camera.top=.1,i.shadow.bias=1e-4,i.target.position.set(0,0,1),i.shadow.radius=.1;let s=new n.t(16777215,.5,150);s.power=12,s.angle=.6,s.decay=1,s.penumbra=.5,s.distance=2e3,t.add(s.target),s.target.position.set(0,0,-1),s.position.copy(t.position),e.add(s),this.spotLight=s,this.camera=t;let r=new n.n(1942335,3);r.distance=500,r.position.set(0,30,-605),r.castShadow=!0,e.add(r),this.pointLight=r;let a=new n.n(1942335,3);a.distance=500,a.position.set(0,30,-725),a.castShadow=!0,e.add(a),this.pointLight2=a}updateSpotlight(e){this.pointLight.intensity=1+5*Math.max(Math.sin(e/700),0),this.pointLight2.intensity=6-this.pointLight.intensity,this.spotLight.position.copy(this.camera.position)}}var X=o(1),k=function(e,t){void 0===t&&(console.warn('THREE.PointerLockControls: The second parameter "domElement" is now mandatory.'),t=document.body),this.domElement=t,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI;var o,i=this,s={type:"change"},r={type:"lock"},a={type:"unlock"},c=new n.f(0,0,0,"YXZ"),h=Math.PI/2,l=new n.v;function p(t){if(!1!==i.isLocked){var o=t.movementX||t.mozMovementX||t.webkitMovementX||0,n=t.movementY||t.mozMovementY||t.webkitMovementY||0;c.setFromQuaternion(e.quaternion),c.y-=.002*o,c.x-=.002*n,c.x=Math.max(h-i.maxPolarAngle,Math.min(h-i.minPolarAngle,c.x)),e.quaternion.setFromEuler(c),i.dispatchEvent(s)}}function d(){i.domElement.ownerDocument.pointerLockElement===i.domElement?(i.dispatchEvent(r),i.isLocked=!0):(i.dispatchEvent(a),i.isLocked=!1)}function u(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}this.connect=function(){i.domElement.ownerDocument.addEventListener("mousemove",p,!1),i.domElement.ownerDocument.addEventListener("pointerlockchange",d,!1),i.domElement.ownerDocument.addEventListener("pointerlockerror",u,!1)},this.disconnect=function(){i.domElement.ownerDocument.removeEventListener("mousemove",p,!1),i.domElement.ownerDocument.removeEventListener("pointerlockchange",d,!1),i.domElement.ownerDocument.removeEventListener("pointerlockerror",u,!1)},this.dispose=function(){this.disconnect()},this.getObject=function(){return e},this.getDirection=(o=new n.v(0,0,-1),function(t){return t.copy(o).applyQuaternion(e.quaternion)}),this.moveForward=function(t,o){l.setFromMatrixColumn(e.matrix,0),l.crossVectors(e.up,l);var i=new n.v;return i.copy(o),i.addScaledVector(l,t),i},this.moveRight=function(t){l.setFromMatrixColumn(e.matrix,0);var o=new n.v;return o.copy(e.position),o.addScaledVector(l,t),o},this.lock=function(){this.domElement.requestPointerLock()},this.unlock=function(){i.domElement.ownerDocument.exitPointerLock()},this.connect()};(k.prototype=Object.create(n.g.prototype)).constructor=k;var E=o.p+"img/df4e87926436244f56b4791eb21e60fa.png",P=o.p+"img/a957d332f9eda3201d55866d2c565a56.png",L=o.p+"img/70c008656f61bd6ddb7806e9b3989032.png",j=o.p+"img/156cb1a8b98da98635f87fea7c7a1459.png",M=o.p+"audio/d8f309eeab0b4e12e53d770c81435eec.ogg";let z=!1,C=!1,S=!1,Z=!1,I=!0;class _{constructor(e,t,o,i,s){this.level=o,this.camera=t,this.scene=e;let r=new k(t,i);this.controls=r,this.shootCooldown=.6;let a=new n.a(s);(new n.c).load(M,(function(e){a.setBuffer(e),a.setLoop(!1),a.setVolume(.3)})),this.shootSound=a,this.huds=[L,P,E],this.hudId=2;const c=document.createElement("img");c.src=E,i.appendChild(c),this.hudImage=c,c.onclick=function(){r.lock()},this.gun_direction=new n.v(0,0,-1),this.gun_ray=new n.o(new n.v,new n.v(0,-1,0),0,1200),this.ground_ray=new n.o(new n.v,new n.v(0,-1,0),0,30),document.addEventListener("keydown",this.onKeyDown,!1),document.addEventListener("keyup",this.onKeyUp,!1),document.addEventListener("mousedown",e=>this.onMouseDown(),!1),this.velocity=new n.v,this.direction=new n.v,e.add(this.controls.getObject())}update(e){this.shootCooldown-=e,this.velocity.x-=7*this.velocity.x*e,this.velocity.z-=7*this.velocity.z*e,this.velocity.y-=9.8*100*e,this.direction.z=Number(z)-Number(S),this.direction.x=Number(Z)-Number(C),this.direction.normalize(),(z||S)&&(this.velocity.z-=400*this.direction.z*e),(C||Z)&&(this.velocity.x-=400*this.direction.x*e);var t=this.camera.position;let o;var n=this.camera.position;n=this.controls.moveRight(-this.velocity.x*e),this.ground_ray.ray.origin.copy(n),o=this.ground_ray.intersectObjects(this.level.floor.planes),0==o.length&&(n=t),t=n,n=this.controls.moveForward(-this.velocity.z*e,n),this.ground_ray.ray.origin.copy(n),o=this.ground_ray.intersectObjects(this.level.floor.planes),0==o.length&&(n=t),this.controls.getObject().position.set(n.x,n.y,n.z),this.controls.getObject().position.y+=this.velocity.y*e,this.controls.getObject().position.y<10&&(this.velocity.y=0,this.controls.getObject().position.y=10,I=!0)}onMouseDown(){if(!(this.shootCooldown>0)){this.shootCooldown=.6,this.shootSound.play(),this.gun_direction.set(0,0,-1),this.gun_direction.unproject(this.camera),this.gun_ray.set(this.camera.position,this.gun_direction.sub(this.camera.position).normalize());for(let e=0;e<this.level.enemies.length;e++){let t=this.level.enemies[e];this.gun_ray.intersectObjects([t.sphere,t.upCone,t.downCone]).length>0&&t.onhit()}}}onclick(){this.controls.lock()}onhit(){if(this.hudId--,-1==this.hudId)return this.controls.unlock(),this.hudImage.src=j,void(this.hudImage.onclick=function(){});this.hudImage.src=this.huds[this.hudId]}onKeyDown(e){switch(e.keyCode){case 38:case 87:z=!0;break;case 37:case 65:C=!0;break;case 40:case 83:S=!0;break;case 39:case 68:Z=!0;break;case 32:!0===I&&(this.velocity.y+=200),I=!1}}onKeyUp(e){switch(e.keyCode){case 38:case 87:z=!1;break;case 37:case 65:C=!1;break;case 40:case 83:S=!1;break;case 39:case 68:Z=!1}}}if(X.a.isWebGLAvailable())!function(){let e=document.body;const t=new n.q,o=document.createElement("CANVAS");document.body.appendChild(o);let r=new s(e,o);o.requestPointerLock=o.requestPointerLock||o.mozRequestPointerLock,document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock;const a=new i(r.threeRenderer);o.onclick=function(){l.onclick()};const c={uPhase:{value:0}},h=new n.b;a.threeCamera.add(h);let l=new _(t,a.threeCamera,null,e,h);const p=new b(t,c,a.threeCamera,l);l.level=p;const d=new x(t,a.threeCamera);let u=performance.now();!function e(){requestAnimationFrame(e),c.uPhase.value+=.1;const o=performance.now();if(!0===l.controls.isLocked){const e=(o-u)/1e3;l.update(e),p.update(e)}u=o,d.updateSpotlight(o),r.render(t,a.threeCamera)}()}();else{let e=X.a.getWebGLErrorMessage();document.body.appendChild(e)}}});