'use strict';

(function () {

  var __amdDefs__ = {};

  var randy_prototype = function randy_prototype() {

    (function (_myTrait_) {
      var _localSeed;

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (seed, subGenerator) {

        // default values from Numerical Recipes
        this.m = 4294967296;
        this.a = 1664525;
        this.c = 1013904223;

        if (!subGenerator) {
          this.gen1 = new randy(new Date().getTime(), true);
          this.gen2 = new randy(Math.random() * this.m, true);
        }

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
        //return this.randRaw();
        return this.randRandy();
      };

      /**
       * @param float t
       */
      _myTrait_.randRandy = function (t) {
        var value = this.gen1.random();
        var value2 = this.gen2.random();

        // 4294967296 -> 32 bits
        var f1 = value * 134217728; // 30 bits
        var f2 = value2 * 134217728; // 30 bits

        var new_f = (f1 ^ f2) / 134217728;
        return new_f;
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

      /**
       * Using two separate random number sequences to reduce likelihood of collision.
       * @param float t
       */
      _myTrait_.uuid = function (t) {
        return this.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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