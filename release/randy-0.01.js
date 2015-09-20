'use strict';

(function () {

  var __amdDefs__ = {};

  var randy_prototype = function randy_prototype() {

    (function (_myTrait_) {
      var _localSeed;

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (seed) {

        // default values from Numerical Recipes
        this.m = 4294967296;
        this.a = 1664525;
        this.c = 1013904223;

        if (seed) {
          // predicatable sequence
          this.setSeed(seed);
        } else {
          // using double seed based on script's first runtime and the
          // JavaScript own pseudrandom sequence
          if (!_localSeed) _localSeed = new Date().getTime();
          _localSeed++;
          this.setSeed(Math.random() * _localSeed);
        }
      });

      /**
       * @param float t
       */
      _myTrait_.random = function (t) {
        return this.randRaw();
      };

      /**
       * @param float t
       */
      _myTrait_.randRaw = function (t) {
        // lgc step
        this.z = (this.a * this.z + this.c) % this.m;
        return this.z / this.m;
      };

      /**
       * @param float val
       */
      _myTrait_.setSeed = function (val) {
        this.z = val;
        this.seed = val;
      };
    })(this);
  };

  var randy = function randy(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof randy) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == 'function') {
          if (res._classInfo.name != randy._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == 'function') m.init.apply(m, args);
      }
    } else return new randy(a, b, c, d, e, f, g, h);
  };

  randy._classInfo = {
    name: 'randy'
  };
  randy.prototype = new randy_prototype();

  (function () {
    if (typeof define !== 'undefined' && define !== null && define.amd != null) {
      __amdDefs__['randy'] = randy;
      this.randy = randy;
    } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
      module.exports['randy'] = randy;
    } else {
      this.randy = randy;
    }
  }).call(new Function('return this')());

  if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function('return this')());