/* globals define */
define([], function () {
	'use strict';
	function AnimRequest(id, taskIn) {
		if (id === undefined || (typeof id) === 'function') {
			console.error('No id defined for AnimRequest');
			return;
		}
		if (AnimRequest.prototype._singletonInstance) {
			AnimRequest.prototype._singletonInstance.push(id, taskIn);
			return AnimRequest.prototype._singletonInstance;
		}
		AnimRequest.prototype._singletonInstance = this;

		var requestAnimFrame = (function () {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();

		var doing = false;
		var tasks = {};
		var taskOnce = {};

		this.start = function () {
			doing = true;
			doThing();
		};

		this.once = function (id, taskIn) {
			taskOnce[id] = taskIn;
		};

		this.stop = function () {
			doing = false;
		};

		this.push = function (id, taskIn) {
			tasks[id] = taskIn;
		};
		this.push(id, taskIn);

		var doThing = function () {
			for (var task in tasks){
				tasks[task]();
			}
			for (var task2 in taskOnce){
				taskOnce[task2]();
				delete taskOnce[task2];
			}
			if(doing){
				requestAnimFrame(doThing);
			}
		};
	}
	return AnimRequest;
});