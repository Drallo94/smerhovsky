(function () {
  'use strict';

  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * Animate
   * ======================================
   * - add class to element in viewport
   * - if you want disable animate delay on mobile use [animate-delay-desktop]
   * - set animation delay via [animate-delay] html attribute
   * - set visible threshold via [animate-threshold] html attribute
   * - toggle class on body when visible via [animate-body-class] attr
   * - add class for all childrens of AUTO_CHILDRENS
   */

  var ISMOBILE = window.matchMedia("only screen and (max-width: 768px)").matches;
  var THRESHOLD = ISMOBILE ? '0.4' : '0.6';
  var LOAD_THRESHOLD = '0.2';
  var ELEMENTS_CLASS = 'animate';
  var VISIBLE_CLASS = 'animate--visible';
  var AUTO_CHILDRENS = '.js-animate-childrens';
  var Animate = /*#__PURE__*/_createClass(function Animate() {
    var _this = this;
    _classCallCheck(this, Animate);
    _defineProperty(this, "observeCallback", function (entries) {
      entries.map(function (entry) {
        var section = entry.target;
        var delay = _this.getDelay(section);
        var sectionBodyClass = section.getAttribute('animate-body-class');
        if (entry.isIntersecting) {
          if (ISMOBILE && section.getAttribute('animate-delay-desktop')) {
            section.classList.add(VISIBLE_CLASS);
            _this.bodyClass(sectionBodyClass, 'add');
          } else {
            setTimeout(function () {
              section.classList.add(VISIBLE_CLASS);
              _this.bodyClass(sectionBodyClass, 'add');
            }, delay);
          }
        } else {
          _this.bodyClass(sectionBodyClass, 'remove');
        }
      });
    });
    _defineProperty(this, "getDelay", function (section) {
      var delay = section.getAttribute('animate-delay');
      if (!ISMOBILE && section.getAttribute('animate-delay-desktop')) {
        var delay = section.getAttribute('animate-delay-desktop');
      }
      if (delay === null) {
        return 0;
      } else if (delay.includes('.')) {
        return parseInt(delay * 1000);
      } else {
        return parseInt(delay);
      }
    });
    _defineProperty(this, "bodyClass", function (htmlclass, type) {
      if (!htmlclass) {
        return;
      }
      if (type == 'add') {
        document.body.classList.add(htmlclass);
      } else {
        document.body.classList.remove(htmlclass);
      }
    });
    this.auto_elements = document.querySelectorAll(AUTO_CHILDRENS);
    if (this.auto_elements) {
      this.auto_elements.forEach(function (group) {
        var _iterator = _createForOfIteratorHelper(group.children),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            child.classList.add(ELEMENTS_CLASS);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }
    this.THRESHOLD = THRESHOLD;
    this.LOAD_THRESHOLD = LOAD_THRESHOLD;
    this.sections = document.querySelectorAll('.' + ELEMENTS_CLASS);
    if ('IntersectionObserver' in window) {
      this.sections.forEach(function (el) {
        var BoundingClientRect = el.getBoundingClientRect();
        var visibleRatio = BoundingClientRect.height / window.innerHeight;
        if (visibleRatio > 0.95) {
          _this.THRESHOLD = window.innerHeight / BoundingClientRect.height / 100 * 30;
          _this.LOAD_THRESHOLD = window.innerHeight / BoundingClientRect.height / 100 * 20;
        }

        // observe on page load
        var loadObserver = new IntersectionObserver(_this.observeCallback, {
          threshold: _this.LOAD_THRESHOLD
        });
        loadObserver.observe(el);
        setTimeout(function () {
          loadObserver.disconnect();
        }, 100);

        // observe
        var observerThreshold = el.getAttribute('animate-threshold') ? el.getAttribute('animate-threshold') : _this.THRESHOLD;
        var observer = new IntersectionObserver(_this.observeCallback, {
          threshold: observerThreshold
        });
        observer.observe(el);
      });
    } else {
      this.sections.forEach(function (el) {
        el.classList.add(VISIBLE_CLASS);
      });
    }
  });
  new Animate();

  /**
   * ToggleBodyClass
   * ======================================
   * - toggle class on body
   * - multiple classes supported - "CLASSNAME CLASSNAME2 ..."
   * - add class to html attr [data-toggle="CLASSNAME"]
   * - remove class when attr [data-remove="CLASSNAME"]
   */

  var ELEMENTS = '.js-ToggleBodyClass';
  var ToggleBodyClass = /*#__PURE__*/_createClass(function ToggleBodyClass() {
    var _this = this;
    _classCallCheck(this, ToggleBodyClass);
    _defineProperty(this, "toggle", function (e) {
      var el = e.currentTarget;
      var classes = el.getAttribute('data-toggle');
      var classesRemove = el.getAttribute('data-remove');
      if (classesRemove) {
        classesRemove.split(" ").forEach(function (className) {
          document.body.classList.remove(className);
        });
      } else {
        classes.split(" ").forEach(function (className) {
          document.body.classList.toggle(className);
        });
      }
    });
    this.elements = document.querySelectorAll(ELEMENTS);
    if (!this.elements) {
      return false;
    }
    this.elements.forEach(function (el) {
      el.addEventListener('click', _this.toggle, false);
    });
  });
  new ToggleBodyClass();

  /*
    @ Add body class if:
    - scroll started
    - scrolled to bottom
  */

  var START_OFFSET = 10;
  var START_CLASS = "is-scrolled";
  var BOTTOM_OFFSET = 10;
  var BOTTOM_CLASS = "is-scrolled-bottom";
  var ScrollClass = /*#__PURE__*/_createClass(function ScrollClass() {
    var _this = this;
    _classCallCheck(this, ScrollClass);
    _defineProperty(this, "scrollHandler", function () {
      var top = document.documentElement.scrollTop;
      document.body.classList.toggle(START_CLASS, top >= START_OFFSET);
      document.body.classList.toggle(BOTTOM_CLASS, window.innerHeight + top >= document.body.offsetHeight - BOTTOM_OFFSET);
      _this.oldScroll = top;
    });
    document.addEventListener("scroll", this.scrollHandler, {
      passive: true
    });
    this.scrollHandler();
  });
  new ScrollClass();

  function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  /*!
   * Splide.js
   * Version  : 4.1.4
   * License  : MIT
   * Copyright: 2022 Naotoshi Fujita
   */
  var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
  var CREATED = 1;
  var MOUNTED = 2;
  var IDLE = 3;
  var MOVING = 4;
  var SCROLLING = 5;
  var DRAGGING = 6;
  var DESTROYED = 7;
  var STATES = {
    CREATED: CREATED,
    MOUNTED: MOUNTED,
    IDLE: IDLE,
    MOVING: MOVING,
    SCROLLING: SCROLLING,
    DRAGGING: DRAGGING,
    DESTROYED: DESTROYED
  };

  function empty(array) {
    array.length = 0;
  }

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  var nextTick = setTimeout;

  var noop = function noop() {};

  function raf(func) {
    return requestAnimationFrame(func);
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  var isFunction = apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

  function isNull(subject) {
    return subject === null;
  }

  function isHTMLElement(subject) {
    try {
      return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
    } catch (e) {
      return false;
    }
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  function includes(array, value) {
    return array.indexOf(value) > -1;
  }

  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }

  function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
  }

  function before(nodes, ref) {
    forEach(nodes, function (node) {
      var parent = (ref || node).parentNode;

      if (parent) {
        parent.insertBefore(node, ref);
      }
    });
  }

  function matches(elm, selector) {
    return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }

  function children(parent, selector) {
    var children2 = parent ? slice(parent.children) : [];
    return selector ? children2.filter(function (child) {
      return matches(child, selector);
    }) : children2;
  }

  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }

  var ownKeys = Object.keys;

  function forOwn(object, iteratee, right) {
    if (object) {
      (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function (key) {
        key !== "__proto__" && iteratee(object[key], key);
      });
    }

    return object;
  }

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function merge(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        if (isArray(value)) {
          object[key] = value.slice();
        } else if (isObject(value)) {
          object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }

  function omit(object, keys) {
    forEach(keys || ownKeys(object), function (key) {
      delete object[key];
    });
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }

  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);

    if (attrs) {
      isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }

    parent && append(parent, elm);
    return elm;
  }

  function style(elm, prop, value) {
    if (isUndefined(value)) {
      return getComputedStyle(elm)[prop];
    }

    if (!isNull(value)) {
      elm.style[prop] = "" + value;
    }
  }

  function display(elm, display2) {
    style(elm, "display", display2);
  }

  function focus(elm) {
    elm["setActive"] && elm["setActive"]() || elm.focus({
      preventScroll: true
    });
  }

  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }

  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }

  function rect(target) {
    return target.getBoundingClientRect();
  }

  function remove(nodes) {
    forEach(nodes, function (node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function parseHtml(html) {
    return child(new DOMParser().parseFromString(html, "text/html").body);
  }

  function prevent(e, stopPropagation) {
    e.preventDefault();

    if (stopPropagation) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }

  function query(parent, selector) {
    return parent && parent.querySelector(selector);
  }

  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }

  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }

  function timeOf(e) {
    return e.timeStamp;
  }

  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }

  var PROJECT_CODE = "splide";
  var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;

  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }

  var min = Math.min,
      max = Math.max,
      floor = Math.floor,
      ceil = Math.ceil,
      abs = Math.abs;

  function approximatelyEqual(x, y, epsilon) {
    return abs(x - y) < epsilon;
  }

  function between(number, x, y, exclusive) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
  }

  function clamp(number, x, y) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return min(max(minimum, number), maximum);
  }

  function sign(x) {
    return +(x > 0) - +(x < 0);
  }

  function format(string, replacements) {
    forEach(replacements, function (replacement) {
      string = string.replace("%s", "" + replacement);
    });
    return string;
  }

  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var ids = {};

  function uniqueId(prefix) {
    return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
  }

  function EventBinder() {
    var listeners = [];

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event, namespace) {
        var isEventTarget = ("addEventListener" in target);
        var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
        isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event, namespace) {
        listeners = listeners.filter(function (listener) {
          if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
            listener[4]();
            return false;
          }

          return true;
        });
      });
    }

    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;

      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles: bubbles,
          detail: detail
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }

      target.dispatchEvent(e);
      return e;
    }

    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function (target) {
        target && forEach(events, function (events2) {
          events2.split(" ").forEach(function (eventNS) {
            var fragment = eventNS.split(".");
            iteratee(target, fragment[0], fragment[1]);
          });
        });
      });
    }

    function destroy() {
      listeners.forEach(function (data) {
        data[4]();
      });
      empty(listeners);
    }

    return {
      bind: bind,
      unbind: unbind,
      dispatch: dispatch,
      destroy: destroy
    };
  }

  var EVENT_MOUNTED = "mounted";
  var EVENT_READY = "ready";
  var EVENT_MOVE = "move";
  var EVENT_MOVED = "moved";
  var EVENT_CLICK = "click";
  var EVENT_ACTIVE = "active";
  var EVENT_INACTIVE = "inactive";
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_RESIZE = "resize";
  var EVENT_RESIZED = "resized";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGING = "dragging";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_OVERFLOW = "overflow";
  var EVENT_DESTROY = "destroy";
  var EVENT_ARROWS_MOUNTED = "arrows:mounted";
  var EVENT_ARROWS_UPDATED = "arrows:updated";
  var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
  var EVENT_PAGINATION_UPDATED = "pagination:updated";
  var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
  var EVENT_AUTOPLAY_PLAY = "autoplay:play";
  var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
  var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
  var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
  var EVENT_SLIDE_KEYDOWN = "sk";
  var EVENT_SHIFTED = "sh";
  var EVENT_END_INDEX_CHANGED = "ei";

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray(events).join(" "), function (e) {
        callback.apply(callback, isArray(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign(binder, {
      bus: bus,
      on: on,
      off: apply(binder.unbind, bus),
      emit: emit
    });
  }

  function RequestInterval(interval, onInterval, onUpdate, limit) {
    var now = Date.now;
    var startTime;
    var rate = 0;
    var id;
    var paused = true;
    var count = 0;

    function update() {
      if (!paused) {
        rate = interval ? min((now() - startTime) / interval, 1) : 1;
        onUpdate && onUpdate(rate);

        if (rate >= 1) {
          onInterval();
          startTime = now();

          if (limit && ++count >= limit) {
            return pause();
          }
        }

        id = raf(update);
      }
    }

    function start(resume) {
      resume || cancel();
      startTime = now() - (resume ? rate * interval : 0);
      paused = false;
      id = raf(update);
    }

    function pause() {
      paused = true;
    }

    function rewind() {
      startTime = now();
      rate = 0;

      if (onUpdate) {
        onUpdate(rate);
      }
    }

    function cancel() {
      id && cancelAnimationFrame(id);
      rate = 0;
      id = 0;
      paused = true;
    }

    function set(time) {
      interval = time;
    }

    function isPaused() {
      return paused;
    }

    return {
      start: start,
      rewind: rewind,
      pause: pause,
      cancel: cancel,
      set: set,
      isPaused: isPaused
    };
  }

  function State(initialState) {
    var state = initialState;

    function set(value) {
      state = value;
    }

    function is(states) {
      return includes(toArray(states), state);
    }

    return {
      set: set,
      is: is
    };
  }

  function Throttle(func, duration) {
    var interval = RequestInterval(duration || 0, func, null, 1);
    return function () {
      interval.isPaused() && interval.start();
    };
  }

  function Media(Splide2, Components2, options) {
    var state = Splide2.state;
    var breakpoints = options.breakpoints || {};
    var reducedMotion = options.reducedMotion || {};
    var binder = EventBinder();
    var queries = [];

    function setup() {
      var isMin = options.mediaQuery === "min";
      ownKeys(breakpoints).sort(function (n, m) {
        return isMin ? +n - +m : +m - +n;
      }).forEach(function (key) {
        register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
      });
      register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
      update();
    }

    function destroy(completely) {
      if (completely) {
        binder.destroy();
      }
    }

    function register(options2, query) {
      var queryList = matchMedia(query);
      binder.bind(queryList, "change", update);
      queries.push([options2, queryList]);
    }

    function update() {
      var destroyed = state.is(DESTROYED);
      var direction = options.direction;
      var merged = queries.reduce(function (merged2, entry) {
        return merge(merged2, entry[1].matches ? entry[0] : {});
      }, {});
      omit(options);
      set(merged);

      if (options.destroy) {
        Splide2.destroy(options.destroy === "completely");
      } else if (destroyed) {
        destroy(true);
        Splide2.mount();
      } else {
        direction !== options.direction && Splide2.refresh();
      }
    }

    function reduce(enable) {
      if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
        enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
      }
    }

    function set(opts, base, notify) {
      merge(options, opts);
      base && merge(Object.getPrototypeOf(options), opts);

      if (notify || !state.is(CREATED)) {
        Splide2.emit(EVENT_UPDATED, options);
      }
    }

    return {
      setup: setup,
      destroy: destroy,
      reduce: reduce,
      set: set
    };
  }

  var ARROW = "Arrow";
  var ARROW_LEFT = ARROW + "Left";
  var ARROW_RIGHT = ARROW + "Right";
  var ARROW_UP = ARROW + "Up";
  var ARROW_DOWN = ARROW + "Down";
  var RTL = "rtl";
  var TTB = "ttb";
  var ORIENTATION_MAP = {
    width: ["height"],
    left: ["top", "right"],
    right: ["bottom", "left"],
    x: ["y"],
    X: ["Y"],
    Y: ["X"],
    ArrowLeft: [ARROW_UP, ARROW_RIGHT],
    ArrowRight: [ARROW_DOWN, ARROW_LEFT]
  };

  function Direction(Splide2, Components2, options) {
    function resolve(prop, axisOnly, direction) {
      direction = direction || options.direction;
      var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
      return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function (match, offset) {
        var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
        return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
      });
    }

    function orient(value) {
      return value * (options.direction === RTL ? 1 : -1);
    }

    return {
      resolve: resolve,
      orient: orient
    };
  }

  var ROLE = "role";
  var TAB_INDEX = "tabindex";
  var DISABLED = "disabled";
  var ARIA_PREFIX = "aria-";
  var ARIA_CONTROLS = ARIA_PREFIX + "controls";
  var ARIA_CURRENT = ARIA_PREFIX + "current";
  var ARIA_SELECTED = ARIA_PREFIX + "selected";
  var ARIA_LABEL = ARIA_PREFIX + "label";
  var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
  var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
  var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
  var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
  var ARIA_LIVE = ARIA_PREFIX + "live";
  var ARIA_BUSY = ARIA_PREFIX + "busy";
  var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
  var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
  var CLASS_PREFIX = PROJECT_CODE + "__";
  var STATUS_CLASS_PREFIX = "is-";
  var CLASS_ROOT = PROJECT_CODE;
  var CLASS_TRACK = CLASS_PREFIX + "track";
  var CLASS_LIST = CLASS_PREFIX + "list";
  var CLASS_SLIDE = CLASS_PREFIX + "slide";
  var CLASS_CLONE = CLASS_SLIDE + "--clone";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var CLASS_ARROWS = CLASS_PREFIX + "arrows";
  var CLASS_ARROW = CLASS_PREFIX + "arrow";
  var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
  var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
  var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
  var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
  var CLASS_PROGRESS = CLASS_PREFIX + "progress";
  var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
  var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
  var CLASS_SPINNER = CLASS_PREFIX + "spinner";
  var CLASS_SR = CLASS_PREFIX + "sr";
  var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
  var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
  var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
  var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
  var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
  var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
  var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
  var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
  var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
  var CLASSES = {
    slide: CLASS_SLIDE,
    clone: CLASS_CLONE,
    arrows: CLASS_ARROWS,
    arrow: CLASS_ARROW,
    prev: CLASS_ARROW_PREV,
    next: CLASS_ARROW_NEXT,
    pagination: CLASS_PAGINATION,
    page: CLASS_PAGINATION_PAGE,
    spinner: CLASS_SPINNER
  };

  function closest(from, selector) {
    if (isFunction(from.closest)) {
      return from.closest(selector);
    }

    var elm = from;

    while (elm && elm.nodeType === 1) {
      if (matches(elm, selector)) {
        break;
      }

      elm = elm.parentElement;
    }

    return elm;
  }

  var FRICTION = 5;
  var LOG_INTERVAL = 200;
  var POINTER_DOWN_EVENTS = "touchstart mousedown";
  var POINTER_MOVE_EVENTS = "touchmove mousemove";
  var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";

  function Elements(Splide2, Components2, options) {
    var _EventInterface = EventInterface(Splide2),
        on = _EventInterface.on,
        bind = _EventInterface.bind;

    var root = Splide2.root;
    var i18n = options.i18n;
    var elements = {};
    var slides = [];
    var rootClasses = [];
    var trackClasses = [];
    var track;
    var list;
    var isUsingKey;

    function setup() {
      collect();
      init();
      update();
    }

    function mount() {
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, setup);
      on(EVENT_UPDATED, update);
      bind(document, POINTER_DOWN_EVENTS + " keydown", function (e) {
        isUsingKey = e.type === "keydown";
      }, {
        capture: true
      });
      bind(root, "focusin", function () {
        toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
      });
    }

    function destroy(completely) {
      var attrs = ALL_ATTRIBUTES.concat("style");
      empty(slides);
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      removeAttribute([track, list], attrs);
      removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
    }

    function update() {
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      rootClasses = getClasses(CLASS_ROOT);
      trackClasses = getClasses(CLASS_TRACK);
      addClass(root, rootClasses);
      addClass(track, trackClasses);
      setAttribute(root, ARIA_LABEL, options.label);
      setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
    }

    function collect() {
      track = find("." + CLASS_TRACK);
      list = child(track, "." + CLASS_LIST);
      assert(track && list, "A track/list element is missing.");
      push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
      forOwn({
        arrows: CLASS_ARROWS,
        pagination: CLASS_PAGINATION,
        prev: CLASS_ARROW_PREV,
        next: CLASS_ARROW_NEXT,
        bar: CLASS_PROGRESS_BAR,
        toggle: CLASS_TOGGLE
      }, function (className, key) {
        elements[key] = find("." + className);
      });
      assign(elements, {
        root: root,
        track: track,
        list: list,
        slides: slides
      });
    }

    function init() {
      var id = root.id || uniqueId(PROJECT_CODE);
      var role = options.role;
      root.id = id;
      track.id = track.id || id + "-track";
      list.id = list.id || id + "-list";

      if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
        setAttribute(root, ROLE, role);
      }

      setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
      setAttribute(list, ROLE, "presentation");
    }

    function find(selector) {
      var elm = query(root, selector);
      return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
    }

    function getClasses(base) {
      return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
    }

    return assign(elements, {
      setup: setup,
      mount: mount,
      destroy: destroy
    });
  }

  var SLIDE = "slide";
  var LOOP = "loop";
  var FADE = "fade";

  function Slide$1(Splide2, index, slideIndex, slide) {
    var event = EventInterface(Splide2);
    var on = event.on,
        emit = event.emit,
        bind = event.bind;
    var Components = Splide2.Components,
        root = Splide2.root,
        options = Splide2.options;
    var isNavigation = options.isNavigation,
        updateOnMove = options.updateOnMove,
        i18n = options.i18n,
        pagination = options.pagination,
        slideFocus = options.slideFocus;
    var resolve = Components.Direction.resolve;
    var styles = getAttribute(slide, "style");
    var label = getAttribute(slide, ARIA_LABEL);
    var isClone = slideIndex > -1;
    var container = child(slide, "." + CLASS_CONTAINER);
    var destroyed;

    function mount() {
      if (!isClone) {
        slide.id = root.id + "-slide" + pad(index + 1);
        setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
        setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
        setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
      }

      listen();
    }

    function listen() {
      bind(slide, "click", apply(emit, EVENT_CLICK, self));
      bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
      on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
      on(EVENT_NAVIGATION_MOUNTED, initNavigation);

      if (updateOnMove) {
        on(EVENT_MOVE, onMove);
      }
    }

    function destroy() {
      destroyed = true;
      event.destroy();
      removeClass(slide, STATUS_CLASSES);
      removeAttribute(slide, ALL_ATTRIBUTES);
      setAttribute(slide, "style", styles);
      setAttribute(slide, ARIA_LABEL, label || "");
    }

    function initNavigation() {
      var controls = Splide2.splides.map(function (target) {
        var Slide2 = target.splide.Components.Slides.getAt(index);
        return Slide2 ? Slide2.slide.id : "";
      }).join(" ");
      setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
      setAttribute(slide, ARIA_CONTROLS, controls);
      setAttribute(slide, ROLE, slideFocus ? "button" : "");
      slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
    }

    function onMove() {
      if (!destroyed) {
        update();
      }
    }

    function update() {
      if (!destroyed) {
        var curr = Splide2.index;
        updateActivity();
        updateVisibility();
        toggleClass(slide, CLASS_PREV, index === curr - 1);
        toggleClass(slide, CLASS_NEXT, index === curr + 1);
      }
    }

    function updateActivity() {
      var active = isActive();

      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass(slide, CLASS_ACTIVE, active);
        setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
        emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
      }
    }

    function updateVisibility() {
      var visible = isVisible();
      var hidden = !visible && (!isActive() || isClone);

      if (!Splide2.state.is([MOVING, SCROLLING])) {
        setAttribute(slide, ARIA_HIDDEN, hidden || "");
      }

      setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");

      if (slideFocus) {
        setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
      }

      if (visible !== hasClass(slide, CLASS_VISIBLE)) {
        toggleClass(slide, CLASS_VISIBLE, visible);
        emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
      }

      if (!visible && document.activeElement === slide) {
        var Slide2 = Components.Slides.getAt(Splide2.index);
        Slide2 && focus(Slide2.slide);
      }
    }

    function style$1(prop, value, useContainer) {
      style(useContainer && container || slide, prop, value);
    }

    function isActive() {
      var curr = Splide2.index;
      return curr === index || options.cloneStatus && curr === slideIndex;
    }

    function isVisible() {
      if (Splide2.is(FADE)) {
        return isActive();
      }

      var trackRect = rect(Components.Elements.track);
      var slideRect = rect(slide);
      var left = resolve("left", true);
      var right = resolve("right", true);
      return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
    }

    function isWithin(from, distance) {
      var diff = abs(from - index);

      if (!isClone && (options.rewind || Splide2.is(LOOP))) {
        diff = min(diff, Splide2.length - diff);
      }

      return diff <= distance;
    }

    var self = {
      index: index,
      slideIndex: slideIndex,
      slide: slide,
      container: container,
      isClone: isClone,
      mount: mount,
      destroy: destroy,
      update: update,
      style: style$1,
      isWithin: isWithin
    };
    return self;
  }

  function Slides(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2),
        on = _EventInterface2.on,
        emit = _EventInterface2.emit,
        bind = _EventInterface2.bind;

    var _Components2$Elements = Components2.Elements,
        slides = _Components2$Elements.slides,
        list = _Components2$Elements.list;
    var Slides2 = [];

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
    }

    function init() {
      slides.forEach(function (slide, index) {
        register(slide, index, -1);
      });
    }

    function destroy() {
      forEach$1(function (Slide2) {
        Slide2.destroy();
      });
      empty(Slides2);
    }

    function update() {
      forEach$1(function (Slide2) {
        Slide2.update();
      });
    }

    function register(slide, index, slideIndex) {
      var object = Slide$1(Splide2, index, slideIndex, slide);
      object.mount();
      Slides2.push(object);
      Slides2.sort(function (Slide1, Slide2) {
        return Slide1.index - Slide2.index;
      });
    }

    function get(excludeClones) {
      return excludeClones ? filter(function (Slide2) {
        return !Slide2.isClone;
      }) : Slides2;
    }

    function getIn(page) {
      var Controller = Components2.Controller;
      var index = Controller.toIndex(page);
      var max = Controller.hasFocus() ? 1 : options.perPage;
      return filter(function (Slide2) {
        return between(Slide2.index, index, index + max - 1);
      });
    }

    function getAt(index) {
      return filter(index)[0];
    }

    function add(items, index) {
      forEach(items, function (slide) {
        if (isString(slide)) {
          slide = parseHtml(slide);
        }

        if (isHTMLElement(slide)) {
          var ref = slides[index];
          ref ? before(slide, ref) : append(list, slide);
          addClass(slide, options.classes.slide);
          observeImages(slide, apply(emit, EVENT_RESIZE));
        }
      });
      emit(EVENT_REFRESH);
    }

    function remove$1(matcher) {
      remove(filter(matcher).map(function (Slide2) {
        return Slide2.slide;
      }));
      emit(EVENT_REFRESH);
    }

    function forEach$1(iteratee, excludeClones) {
      get(excludeClones).forEach(iteratee);
    }

    function filter(matcher) {
      return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
        return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
      });
    }

    function style(prop, value, useContainer) {
      forEach$1(function (Slide2) {
        Slide2.style(prop, value, useContainer);
      });
    }

    function observeImages(elm, callback) {
      var images = queryAll(elm, "img");
      var length = images.length;

      if (length) {
        images.forEach(function (img) {
          bind(img, "load error", function () {
            if (! --length) {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    }

    function getLength(excludeClones) {
      return excludeClones ? slides.length : Slides2.length;
    }

    function isEnough() {
      return Slides2.length > options.perPage;
    }

    return {
      mount: mount,
      destroy: destroy,
      update: update,
      register: register,
      get: get,
      getIn: getIn,
      getAt: getAt,
      add: add,
      remove: remove$1,
      forEach: forEach$1,
      filter: filter,
      style: style,
      getLength: getLength,
      isEnough: isEnough
    };
  }

  function Layout(Splide2, Components2, options) {
    var _EventInterface3 = EventInterface(Splide2),
        on = _EventInterface3.on,
        bind = _EventInterface3.bind,
        emit = _EventInterface3.emit;

    var Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var _Components2$Elements2 = Components2.Elements,
        root = _Components2$Elements2.root,
        track = _Components2$Elements2.track,
        list = _Components2$Elements2.list;
    var getAt = Slides.getAt,
        styleSlides = Slides.style;
    var vertical;
    var rootRect;
    var overflow;

    function mount() {
      init();
      bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on(EVENT_RESIZE, resize);
    }

    function init() {
      vertical = options.direction === TTB;
      style(root, "maxWidth", unit(options.width));
      style(track, resolve("paddingLeft"), cssPadding(false));
      style(track, resolve("paddingRight"), cssPadding(true));
      resize(true);
    }

    function resize(force) {
      var newRect = rect(root);

      if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
        style(track, "height", cssTrackHeight());
        styleSlides(resolve("marginRight"), unit(options.gap));
        styleSlides("width", cssSlideWidth());
        styleSlides("height", cssSlideHeight(), true);
        rootRect = newRect;
        emit(EVENT_RESIZED);

        if (overflow !== (overflow = isOverflow())) {
          toggleClass(root, CLASS_OVERFLOW, overflow);
          emit(EVENT_OVERFLOW, overflow);
        }
      }
    }

    function cssPadding(right) {
      var padding = options.padding;
      var prop = resolve(right ? "right" : "left");
      return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
    }

    function cssTrackHeight() {
      var height = "";

      if (vertical) {
        height = cssHeight();
        assert(height, "height or heightRatio is missing.");
        height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
      }

      return height;
    }

    function cssHeight() {
      return unit(options.height || rect(list).width * options.heightRatio);
    }

    function cssSlideWidth() {
      return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
    }

    function cssSlideHeight() {
      return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
    }

    function cssSlideSize() {
      var gap = unit(options.gap);
      return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
    }

    function listSize() {
      return rect(list)[resolve("width")];
    }

    function slideSize(index, withoutGap) {
      var Slide = getAt(index || 0);
      return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
    }

    function totalSize(index, withoutGap) {
      var Slide = getAt(index);

      if (Slide) {
        var right = rect(Slide.slide)[resolve("right")];
        var left = rect(list)[resolve("left")];
        return abs(right - left) + (withoutGap ? 0 : getGap());
      }

      return 0;
    }

    function sliderSize(withoutGap) {
      return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
    }

    function getGap() {
      var Slide = getAt(0);
      return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
    }

    function getPadding(right) {
      return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
    }

    function isOverflow() {
      return Splide2.is(FADE) || sliderSize(true) > listSize();
    }

    return {
      mount: mount,
      resize: resize,
      listSize: listSize,
      slideSize: slideSize,
      sliderSize: sliderSize,
      totalSize: totalSize,
      getPadding: getPadding,
      isOverflow: isOverflow
    };
  }

  var MULTIPLIER = 2;

  function Clones(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on;
    var Elements = Components2.Elements,
        Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var clones = [];
    var cloneCount;

    function mount() {
      on(EVENT_REFRESH, remount);
      on([EVENT_UPDATED, EVENT_RESIZE], observe);

      if (cloneCount = computeCloneCount()) {
        generate(cloneCount);
        Components2.Layout.resize(true);
      }
    }

    function remount() {
      destroy();
      mount();
    }

    function destroy() {
      remove(clones);
      empty(clones);
      event.destroy();
    }

    function observe() {
      var count = computeCloneCount();

      if (cloneCount !== count) {
        if (cloneCount < count || !count) {
          event.emit(EVENT_REFRESH);
        }
      }
    }

    function generate(count) {
      var slides = Slides.get().slice();
      var length = slides.length;

      if (length) {
        while (slides.length < count) {
          push(slides, slides);
        }

        push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
          var isHead = index < count;
          var clone = cloneDeep(Slide.slide, index);
          isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
          push(clones, clone);
          Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
        });
      }
    }

    function cloneDeep(elm, index) {
      var clone = elm.cloneNode(true);
      addClass(clone, options.classes.clone);
      clone.id = Splide2.root.id + "-clone" + pad(index + 1);
      return clone;
    }

    function computeCloneCount() {
      var clones2 = options.clones;

      if (!Splide2.is(LOOP)) {
        clones2 = 0;
      } else if (isUndefined(clones2)) {
        var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
        var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
        clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
      }

      return clones2;
    }

    return {
      mount: mount,
      destroy: destroy
    };
  }

  function Move(Splide2, Components2, options) {
    var _EventInterface4 = EventInterface(Splide2),
        on = _EventInterface4.on,
        emit = _EventInterface4.emit;

    var set = Splide2.state.set;
    var _Components2$Layout = Components2.Layout,
        slideSize = _Components2$Layout.slideSize,
        getPadding = _Components2$Layout.getPadding,
        totalSize = _Components2$Layout.totalSize,
        listSize = _Components2$Layout.listSize,
        sliderSize = _Components2$Layout.sliderSize;
    var _Components2$Directio = Components2.Direction,
        resolve = _Components2$Directio.resolve,
        orient = _Components2$Directio.orient;
    var _Components2$Elements3 = Components2.Elements,
        list = _Components2$Elements3.list,
        track = _Components2$Elements3.track;
    var Transition;

    function mount() {
      Transition = Components2.Transition;
      on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
    }

    function reposition() {
      if (!Components2.Controller.isBusy()) {
        Components2.Scroll.cancel();
        jump(Splide2.index);
        Components2.Slides.update();
      }
    }

    function move(dest, index, prev, callback) {
      if (dest !== index && canShift(dest > prev)) {
        cancel();
        translate(shift(getPosition(), dest > prev), true);
      }

      set(MOVING);
      emit(EVENT_MOVE, index, prev, dest);
      Transition.start(index, function () {
        set(IDLE);
        emit(EVENT_MOVED, index, prev, dest);
        callback && callback();
      });
    }

    function jump(index) {
      translate(toPosition(index, true));
    }

    function translate(position, preventLoop) {
      if (!Splide2.is(FADE)) {
        var destination = preventLoop ? position : loop(position);
        style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
        position !== destination && emit(EVENT_SHIFTED);
      }
    }

    function loop(position) {
      if (Splide2.is(LOOP)) {
        var index = toIndex(position);
        var exceededMax = index > Components2.Controller.getEnd();
        var exceededMin = index < 0;

        if (exceededMin || exceededMax) {
          position = shift(position, exceededMax);
        }
      }

      return position;
    }

    function shift(position, backwards) {
      var excess = position - getLimit(backwards);
      var size = sliderSize();
      position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
      return position;
    }

    function cancel() {
      translate(getPosition(), true);
      Transition.cancel();
    }

    function toIndex(position) {
      var Slides = Components2.Slides.get();
      var index = 0;
      var minDistance = Infinity;

      for (var i = 0; i < Slides.length; i++) {
        var slideIndex = Slides[i].index;
        var distance = abs(toPosition(slideIndex, true) - position);

        if (distance <= minDistance) {
          minDistance = distance;
          index = slideIndex;
        } else {
          break;
        }
      }

      return index;
    }

    function toPosition(index, trimming) {
      var position = orient(totalSize(index - 1) - offset(index));
      return trimming ? trim(position) : position;
    }

    function getPosition() {
      var left = resolve("left");
      return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
    }

    function trim(position) {
      if (options.trimSpace && Splide2.is(SLIDE)) {
        position = clamp(position, 0, orient(sliderSize(true) - listSize()));
      }

      return position;
    }

    function offset(index) {
      var focus = options.focus;
      return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
    }

    function getLimit(max) {
      return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
    }

    function canShift(backwards) {
      var shifted = orient(shift(getPosition(), backwards));
      return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
    }

    function exceededLimit(max, position) {
      position = isUndefined(position) ? getPosition() : position;
      var exceededMin = max !== true && orient(position) < orient(getLimit(false));
      var exceededMax = max !== false && orient(position) > orient(getLimit(true));
      return exceededMin || exceededMax;
    }

    return {
      mount: mount,
      move: move,
      jump: jump,
      translate: translate,
      shift: shift,
      cancel: cancel,
      toIndex: toIndex,
      toPosition: toPosition,
      getPosition: getPosition,
      getLimit: getLimit,
      exceededLimit: exceededLimit,
      reposition: reposition
    };
  }

  function Controller(Splide2, Components2, options) {
    var _EventInterface5 = EventInterface(Splide2),
        on = _EventInterface5.on,
        emit = _EventInterface5.emit;

    var Move = Components2.Move;
    var getPosition = Move.getPosition,
        getLimit = Move.getLimit,
        toPosition = Move.toPosition;
    var _Components2$Slides = Components2.Slides,
        isEnough = _Components2$Slides.isEnough,
        getLength = _Components2$Slides.getLength;
    var omitEnd = options.omitEnd;
    var isLoop = Splide2.is(LOOP);
    var isSlide = Splide2.is(SLIDE);
    var getNext = apply(getAdjacent, false);
    var getPrev = apply(getAdjacent, true);
    var currIndex = options.start || 0;
    var endIndex;
    var prevIndex = currIndex;
    var slideCount;
    var perMove;
    var perPage;

    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
      on(EVENT_RESIZED, onResized);
    }

    function init() {
      slideCount = getLength(true);
      perMove = options.perMove;
      perPage = options.perPage;
      endIndex = getEnd();
      var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);

      if (index !== currIndex) {
        currIndex = index;
        Move.reposition();
      }
    }

    function onResized() {
      if (endIndex !== getEnd()) {
        emit(EVENT_END_INDEX_CHANGED);
      }
    }

    function go(control, allowSameIndex, callback) {
      if (!isBusy()) {
        var dest = parse(control);
        var index = loop(dest);

        if (index > -1 && (allowSameIndex || index !== currIndex)) {
          setIndex(index);
          Move.move(dest, index, prevIndex, callback);
        }
      }
    }

    function scroll(destination, duration, snap, callback) {
      Components2.Scroll.scroll(destination, duration, snap, function () {
        var index = loop(Move.toIndex(getPosition()));
        setIndex(omitEnd ? min(index, endIndex) : index);
        callback && callback();
      });
    }

    function parse(control) {
      var index = currIndex;

      if (isString(control)) {
        var _ref = control.match(/([+\-<>])(\d+)?/) || [],
            indicator = _ref[1],
            number = _ref[2];

        if (indicator === "+" || indicator === "-") {
          index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
        } else if (indicator === ">") {
          index = number ? toIndex(+number) : getNext(true);
        } else if (indicator === "<") {
          index = getPrev(true);
        }
      } else {
        index = isLoop ? control : clamp(control, 0, endIndex);
      }

      return index;
    }

    function getAdjacent(prev, destination) {
      var number = perMove || (hasFocus() ? 1 : perPage);
      var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));

      if (dest === -1 && isSlide) {
        if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
          return prev ? 0 : endIndex;
        }
      }

      return destination ? dest : loop(dest);
    }

    function computeDestIndex(dest, from, snapPage) {
      if (isEnough() || hasFocus()) {
        var index = computeMovableDestIndex(dest);

        if (index !== dest) {
          from = dest;
          dest = index;
          snapPage = false;
        }

        if (dest < 0 || dest > endIndex) {
          if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
            dest = toIndex(toPage(dest));
          } else {
            if (isLoop) {
              dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
            } else if (options.rewind) {
              dest = dest < 0 ? endIndex : 0;
            } else {
              dest = -1;
            }
          }
        } else {
          if (snapPage && dest !== from) {
            dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
          }
        }
      } else {
        dest = -1;
      }

      return dest;
    }

    function computeMovableDestIndex(dest) {
      if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
        var position = getPosition();

        while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
          dest < currIndex ? --dest : ++dest;
        }
      }

      return dest;
    }

    function loop(index) {
      return isLoop ? (index + slideCount) % slideCount || 0 : index;
    }

    function getEnd() {
      var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);

      while (omitEnd && end-- > 0) {
        if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
          end++;
          break;
        }
      }

      return clamp(end, 0, slideCount - 1);
    }

    function toIndex(page) {
      return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
    }

    function toPage(index) {
      return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
    }

    function toDest(destination) {
      var closest = Move.toIndex(destination);
      return isSlide ? clamp(closest, 0, endIndex) : closest;
    }

    function setIndex(index) {
      if (index !== currIndex) {
        prevIndex = currIndex;
        currIndex = index;
      }
    }

    function getIndex(prev) {
      return prev ? prevIndex : currIndex;
    }

    function hasFocus() {
      return !isUndefined(options.focus) || options.isNavigation;
    }

    function isBusy() {
      return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
    }

    return {
      mount: mount,
      go: go,
      scroll: scroll,
      getNext: getNext,
      getPrev: getPrev,
      getAdjacent: getAdjacent,
      getEnd: getEnd,
      setIndex: setIndex,
      getIndex: getIndex,
      toIndex: toIndex,
      toPage: toPage,
      toDest: toDest,
      hasFocus: hasFocus,
      isBusy: isBusy
    };
  }

  var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
  var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
  var SIZE = 40;

  function Arrows(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on,
        bind = event.bind,
        emit = event.emit;
    var classes = options.classes,
        i18n = options.i18n;
    var Elements = Components2.Elements,
        Controller = Components2.Controller;
    var placeholder = Elements.arrows,
        track = Elements.track;
    var wrapper = placeholder;
    var prev = Elements.prev;
    var next = Elements.next;
    var created;
    var wrapperClasses;
    var arrows = {};

    function mount() {
      init();
      on(EVENT_UPDATED, remount);
    }

    function remount() {
      destroy();
      mount();
    }

    function init() {
      var enabled = options.arrows;

      if (enabled && !(prev && next)) {
        createArrows();
      }

      if (prev && next) {
        assign(arrows, {
          prev: prev,
          next: next
        });
        display(wrapper, enabled ? "" : "none");
        addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);

        if (enabled) {
          listen();
          update();
          setAttribute([prev, next], ARIA_CONTROLS, track.id);
          emit(EVENT_ARROWS_MOUNTED, prev, next);
        }
      }
    }

    function destroy() {
      event.destroy();
      removeClass(wrapper, wrapperClasses);

      if (created) {
        remove(placeholder ? [prev, next] : wrapper);
        prev = next = null;
      } else {
        removeAttribute([prev, next], ALL_ATTRIBUTES);
      }
    }

    function listen() {
      on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
      bind(next, "click", apply(go, ">"));
      bind(prev, "click", apply(go, "<"));
    }

    function go(control) {
      Controller.go(control, true);
    }

    function createArrows() {
      wrapper = placeholder || create("div", classes.arrows);
      prev = createArrow(true);
      next = createArrow(false);
      created = true;
      append(wrapper, [prev, next]);
      !placeholder && before(wrapper, track);
    }

    function createArrow(prev2) {
      var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\" focusable=\"false\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
      return parseHtml(arrow);
    }

    function update() {
      if (prev && next) {
        var index = Splide2.index;
        var prevIndex = Controller.getPrev();
        var nextIndex = Controller.getNext();
        var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
        var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
        prev.disabled = prevIndex < 0;
        next.disabled = nextIndex < 0;
        setAttribute(prev, ARIA_LABEL, prevLabel);
        setAttribute(next, ARIA_LABEL, nextLabel);
        emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
      }
    }

    return {
      arrows: arrows,
      mount: mount,
      destroy: destroy,
      update: update
    };
  }

  var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";

  function Autoplay(Splide2, Components2, options) {
    var _EventInterface6 = EventInterface(Splide2),
        on = _EventInterface6.on,
        bind = _EventInterface6.bind,
        emit = _EventInterface6.emit;

    var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
    var isPaused = interval.isPaused;
    var Elements = Components2.Elements,
        _Components2$Elements4 = Components2.Elements,
        root = _Components2$Elements4.root,
        toggle = _Components2$Elements4.toggle;
    var autoplay = options.autoplay;
    var hovered;
    var focused;
    var stopped = autoplay === "pause";

    function mount() {
      if (autoplay) {
        listen();
        toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
        stopped || play();
        update();
      }
    }

    function listen() {
      if (options.pauseOnHover) {
        bind(root, "mouseenter mouseleave", function (e) {
          hovered = e.type === "mouseenter";
          autoToggle();
        });
      }

      if (options.pauseOnFocus) {
        bind(root, "focusin focusout", function (e) {
          focused = e.type === "focusin";
          autoToggle();
        });
      }

      if (toggle) {
        bind(toggle, "click", function () {
          stopped ? play() : pause(true);
        });
      }

      on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
      on(EVENT_MOVE, onMove);
    }

    function play() {
      if (isPaused() && Components2.Slides.isEnough()) {
        interval.start(!options.resetProgress);
        focused = hovered = stopped = false;
        update();
        emit(EVENT_AUTOPLAY_PLAY);
      }
    }

    function pause(stop) {
      if (stop === void 0) {
        stop = true;
      }

      stopped = !!stop;
      update();

      if (!isPaused()) {
        interval.pause();
        emit(EVENT_AUTOPLAY_PAUSE);
      }
    }

    function autoToggle() {
      if (!stopped) {
        hovered || focused ? pause(false) : play();
      }
    }

    function update() {
      if (toggle) {
        toggleClass(toggle, CLASS_ACTIVE, !stopped);
        setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
      }
    }

    function onAnimationFrame(rate) {
      var bar = Elements.bar;
      bar && style(bar, "width", rate * 100 + "%");
      emit(EVENT_AUTOPLAY_PLAYING, rate);
    }

    function onMove(index) {
      var Slide = Components2.Slides.getAt(index);
      interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
    }

    return {
      mount: mount,
      destroy: interval.cancel,
      play: play,
      pause: pause,
      isPaused: isPaused
    };
  }

  function Cover(Splide2, Components2, options) {
    var _EventInterface7 = EventInterface(Splide2),
        on = _EventInterface7.on;

    function mount() {
      if (options.cover) {
        on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
        on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
      }
    }

    function cover(cover2) {
      Components2.Slides.forEach(function (Slide) {
        var img = child(Slide.container || Slide.slide, "img");

        if (img && img.src) {
          toggle(cover2, img, Slide);
        }
      });
    }

    function toggle(cover2, img, Slide) {
      Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
      display(img, cover2 ? "none" : "");
    }

    return {
      mount: mount,
      destroy: apply(cover, false)
    };
  }

  var BOUNCE_DIFF_THRESHOLD = 10;
  var BOUNCE_DURATION = 600;
  var FRICTION_FACTOR = 0.6;
  var BASE_VELOCITY = 1.5;
  var MIN_DURATION = 800;

  function Scroll(Splide2, Components2, options) {
    var _EventInterface8 = EventInterface(Splide2),
        on = _EventInterface8.on,
        emit = _EventInterface8.emit;

    var set = Splide2.state.set;
    var Move = Components2.Move;
    var getPosition = Move.getPosition,
        getLimit = Move.getLimit,
        exceededLimit = Move.exceededLimit,
        translate = Move.translate;
    var isSlide = Splide2.is(SLIDE);
    var interval;
    var callback;
    var friction = 1;

    function mount() {
      on(EVENT_MOVE, clear);
      on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }

    function scroll(destination, duration, snap, onScrolled, noConstrain) {
      var from = getPosition();
      clear();

      if (snap && (!isSlide || !exceededLimit())) {
        var size = Components2.Layout.sliderSize();
        var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
        destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
      }

      var noDistance = approximatelyEqual(from, destination, 1);
      friction = 1;
      duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
      callback = onScrolled;
      interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
      set(SCROLLING);
      emit(EVENT_SCROLL);
      interval.start();
    }

    function onEnd() {
      set(IDLE);
      callback && callback();
      emit(EVENT_SCROLLED);
    }

    function update(from, to, noConstrain, rate) {
      var position = getPosition();
      var target = from + (to - from) * easing(rate);
      var diff = (target - position) * friction;
      translate(position + diff);

      if (isSlide && !noConstrain && exceededLimit()) {
        friction *= FRICTION_FACTOR;

        if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
          scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
        }
      }
    }

    function clear() {
      if (interval) {
        interval.cancel();
      }
    }

    function cancel() {
      if (interval && !interval.isPaused()) {
        clear();
        onEnd();
      }
    }

    function easing(t) {
      var easingFunc = options.easingFunc;
      return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
    }

    return {
      mount: mount,
      destroy: clear,
      scroll: scroll,
      cancel: cancel
    };
  }

  var SCROLL_LISTENER_OPTIONS = {
    passive: false,
    capture: true
  };

  function Drag(Splide2, Components2, options) {
    var _EventInterface9 = EventInterface(Splide2),
        on = _EventInterface9.on,
        emit = _EventInterface9.emit,
        bind = _EventInterface9.bind,
        unbind = _EventInterface9.unbind;

    var state = Splide2.state;
    var Move = Components2.Move,
        Scroll = Components2.Scroll,
        Controller = Components2.Controller,
        track = Components2.Elements.track,
        reduce = Components2.Media.reduce;
    var _Components2$Directio2 = Components2.Direction,
        resolve = _Components2$Directio2.resolve,
        orient = _Components2$Directio2.orient;
    var getPosition = Move.getPosition,
        exceededLimit = Move.exceededLimit;
    var basePosition;
    var baseEvent;
    var prevBaseEvent;
    var isFree;
    var dragging;
    var exceeded = false;
    var clickPrevented;
    var disabled;
    var target;

    function mount() {
      bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
      bind(track, "click", onClick, {
        capture: true
      });
      bind(track, "dragstart", prevent);
      on([EVENT_MOUNTED, EVENT_UPDATED], init);
    }

    function init() {
      var drag = options.drag;
      disable(!drag);
      isFree = drag === "free";
    }

    function onPointerDown(e) {
      clickPrevented = false;

      if (!disabled) {
        var isTouch = isTouchEvent(e);

        if (isDraggable(e.target) && (isTouch || !e.button)) {
          if (!Controller.isBusy()) {
            target = isTouch ? track : window;
            dragging = state.is([MOVING, SCROLLING]);
            prevBaseEvent = null;
            bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
            bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
            Move.cancel();
            Scroll.cancel();
            save(e);
          } else {
            prevent(e, true);
          }
        }
      }
    }

    function onPointerMove(e) {
      if (!state.is(DRAGGING)) {
        state.set(DRAGGING);
        emit(EVENT_DRAG);
      }

      if (e.cancelable) {
        if (dragging) {
          Move.translate(basePosition + constrain(diffCoord(e)));
          var expired = diffTime(e) > LOG_INTERVAL;
          var hasExceeded = exceeded !== (exceeded = exceededLimit());

          if (expired || hasExceeded) {
            save(e);
          }

          clickPrevented = true;
          emit(EVENT_DRAGGING);
          prevent(e);
        } else if (isSliderDirection(e)) {
          dragging = shouldStart(e);
          prevent(e);
        }
      }
    }

    function onPointerUp(e) {
      if (state.is(DRAGGING)) {
        state.set(IDLE);
        emit(EVENT_DRAGGED);
      }

      if (dragging) {
        move(e);
        prevent(e);
      }

      unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
      unbind(target, POINTER_UP_EVENTS, onPointerUp);
      dragging = false;
    }

    function onClick(e) {
      if (!disabled && clickPrevented) {
        prevent(e, true);
      }
    }

    function save(e) {
      prevBaseEvent = baseEvent;
      baseEvent = e;
      basePosition = getPosition();
    }

    function move(e) {
      var velocity = computeVelocity(e);
      var destination = computeDestination(velocity);
      var rewind = options.rewind && options.rewindByDrag;
      reduce(false);

      if (isFree) {
        Controller.scroll(destination, 0, options.snap);
      } else if (Splide2.is(FADE)) {
        Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
      } else if (Splide2.is(SLIDE) && exceeded && rewind) {
        Controller.go(exceededLimit(true) ? ">" : "<");
      } else {
        Controller.go(Controller.toDest(destination), true);
      }

      reduce(true);
    }

    function shouldStart(e) {
      var thresholds = options.dragMinThreshold;
      var isObj = isObject(thresholds);
      var mouse = isObj && thresholds.mouse || 0;
      var touch = (isObj ? thresholds.touch : +thresholds) || 10;
      return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
    }

    function isSliderDirection(e) {
      return abs(diffCoord(e)) > abs(diffCoord(e, true));
    }

    function computeVelocity(e) {
      if (Splide2.is(LOOP) || !exceeded) {
        var time = diffTime(e);

        if (time && time < LOG_INTERVAL) {
          return diffCoord(e) / time;
        }
      }

      return 0;
    }

    function computeDestination(velocity) {
      return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
    }

    function diffCoord(e, orthogonal) {
      return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
    }

    function diffTime(e) {
      return timeOf(e) - timeOf(getBaseEvent(e));
    }

    function getBaseEvent(e) {
      return baseEvent === e && prevBaseEvent || baseEvent;
    }

    function coordOf(e, orthogonal) {
      return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
    }

    function constrain(diff) {
      return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
    }

    function isDraggable(target2) {
      var noDrag = options.noDrag;
      return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
    }

    function isTouchEvent(e) {
      return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
    }

    function isDragging() {
      return dragging;
    }

    function disable(value) {
      disabled = value;
    }

    return {
      mount: mount,
      disable: disable,
      isDragging: isDragging
    };
  }

  var NORMALIZATION_MAP = {
    Spacebar: " ",
    Right: ARROW_RIGHT,
    Left: ARROW_LEFT,
    Up: ARROW_UP,
    Down: ARROW_DOWN
  };

  function normalizeKey(key) {
    key = isString(key) ? key : key.key;
    return NORMALIZATION_MAP[key] || key;
  }

  var KEYBOARD_EVENT = "keydown";

  function Keyboard(Splide2, Components2, options) {
    var _EventInterface10 = EventInterface(Splide2),
        on = _EventInterface10.on,
        bind = _EventInterface10.bind,
        unbind = _EventInterface10.unbind;

    var root = Splide2.root;
    var resolve = Components2.Direction.resolve;
    var target;
    var disabled;

    function mount() {
      init();
      on(EVENT_UPDATED, destroy);
      on(EVENT_UPDATED, init);
      on(EVENT_MOVE, onMove);
    }

    function init() {
      var keyboard = options.keyboard;

      if (keyboard) {
        target = keyboard === "global" ? window : root;
        bind(target, KEYBOARD_EVENT, onKeydown);
      }
    }

    function destroy() {
      unbind(target, KEYBOARD_EVENT);
    }

    function disable(value) {
      disabled = value;
    }

    function onMove() {
      var _disabled = disabled;
      disabled = true;
      nextTick(function () {
        disabled = _disabled;
      });
    }

    function onKeydown(e) {
      if (!disabled) {
        var key = normalizeKey(e);

        if (key === resolve(ARROW_LEFT)) {
          Splide2.go("<");
        } else if (key === resolve(ARROW_RIGHT)) {
          Splide2.go(">");
        }
      }
    }

    return {
      mount: mount,
      destroy: destroy,
      disable: disable
    };
  }

  var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
  var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
  var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";

  function LazyLoad(Splide2, Components2, options) {
    var _EventInterface11 = EventInterface(Splide2),
        on = _EventInterface11.on,
        off = _EventInterface11.off,
        bind = _EventInterface11.bind,
        emit = _EventInterface11.emit;

    var isSequential = options.lazyLoad === "sequential";
    var events = [EVENT_MOVED, EVENT_SCROLLED];
    var entries = [];

    function mount() {
      if (options.lazyLoad) {
        init();
        on(EVENT_REFRESH, init);
      }
    }

    function init() {
      empty(entries);
      register();

      if (isSequential) {
        loadNext();
      } else {
        off(events);
        on(events, check);
        check();
      }
    }

    function register() {
      Components2.Slides.forEach(function (Slide) {
        queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
          var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
          var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

          if (src !== img.src || srcset !== img.srcset) {
            var className = options.classes.spinner;
            var parent = img.parentElement;
            var spinner = child(parent, "." + className) || create("span", className, parent);
            entries.push([img, Slide, spinner]);
            img.src || display(img, "none");
          }
        });
      });
    }

    function check() {
      entries = entries.filter(function (data) {
        var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
        return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
      });
      entries.length || off(events);
    }

    function load(data) {
      var img = data[0];
      addClass(data[1].slide, CLASS_LOADING);
      bind(img, "load error", apply(onLoad, data));
      setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
      setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
      removeAttribute(img, SRC_DATA_ATTRIBUTE);
      removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
    }

    function onLoad(data, e) {
      var img = data[0],
          Slide = data[1];
      removeClass(Slide.slide, CLASS_LOADING);

      if (e.type !== "error") {
        remove(data[2]);
        display(img, "");
        emit(EVENT_LAZYLOAD_LOADED, img, Slide);
        emit(EVENT_RESIZE);
      }

      isSequential && loadNext();
    }

    function loadNext() {
      entries.length && load(entries.shift());
    }

    return {
      mount: mount,
      destroy: apply(empty, entries),
      check: check
    };
  }

  function Pagination(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on,
        emit = event.emit,
        bind = event.bind;
    var Slides = Components2.Slides,
        Elements = Components2.Elements,
        Controller = Components2.Controller;
    var hasFocus = Controller.hasFocus,
        getIndex = Controller.getIndex,
        go = Controller.go;
    var resolve = Components2.Direction.resolve;
    var placeholder = Elements.pagination;
    var items = [];
    var list;
    var paginationClasses;

    function mount() {
      destroy();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
      var enabled = options.pagination;
      placeholder && display(placeholder, enabled ? "" : "none");

      if (enabled) {
        on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
        createPagination();
        update();
        emit(EVENT_PAGINATION_MOUNTED, {
          list: list,
          items: items
        }, getAt(Splide2.index));
      }
    }

    function destroy() {
      if (list) {
        remove(placeholder ? slice(list.children) : list);
        removeClass(list, paginationClasses);
        empty(items);
        list = null;
      }

      event.destroy();
    }

    function createPagination() {
      var length = Splide2.length;
      var classes = options.classes,
          i18n = options.i18n,
          perPage = options.perPage;
      var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
      list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
      addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
      setAttribute(list, ROLE, "tablist");
      setAttribute(list, ARIA_LABEL, i18n.select);
      setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");

      for (var i = 0; i < max; i++) {
        var li = create("li", null, list);
        var button = create("button", {
          class: classes.page,
          type: "button"
        }, li);
        var controls = Slides.getIn(i).map(function (Slide) {
          return Slide.slide.id;
        });
        var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
        bind(button, "click", apply(onClick, i));

        if (options.paginationKeyboard) {
          bind(button, "keydown", apply(onKeydown, i));
        }

        setAttribute(li, ROLE, "presentation");
        setAttribute(button, ROLE, "tab");
        setAttribute(button, ARIA_CONTROLS, controls.join(" "));
        setAttribute(button, ARIA_LABEL, format(text, i + 1));
        setAttribute(button, TAB_INDEX, -1);
        items.push({
          li: li,
          button: button,
          page: i
        });
      }
    }

    function onClick(page) {
      go(">" + page, true);
    }

    function onKeydown(page, e) {
      var length = items.length;
      var key = normalizeKey(e);
      var dir = getDirection();
      var nextPage = -1;

      if (key === resolve(ARROW_RIGHT, false, dir)) {
        nextPage = ++page % length;
      } else if (key === resolve(ARROW_LEFT, false, dir)) {
        nextPage = (--page + length) % length;
      } else if (key === "Home") {
        nextPage = 0;
      } else if (key === "End") {
        nextPage = length - 1;
      }

      var item = items[nextPage];

      if (item) {
        focus(item.button);
        go(">" + nextPage);
        prevent(e, true);
      }
    }

    function getDirection() {
      return options.paginationDirection || options.direction;
    }

    function getAt(index) {
      return items[Controller.toPage(index)];
    }

    function update() {
      var prev = getAt(getIndex(true));
      var curr = getAt(getIndex());

      if (prev) {
        var button = prev.button;
        removeClass(button, CLASS_ACTIVE);
        removeAttribute(button, ARIA_SELECTED);
        setAttribute(button, TAB_INDEX, -1);
      }

      if (curr) {
        var _button = curr.button;
        addClass(_button, CLASS_ACTIVE);
        setAttribute(_button, ARIA_SELECTED, true);
        setAttribute(_button, TAB_INDEX, "");
      }

      emit(EVENT_PAGINATION_UPDATED, {
        list: list,
        items: items
      }, prev, curr);
    }

    return {
      items: items,
      mount: mount,
      destroy: destroy,
      getAt: getAt,
      update: update
    };
  }

  var TRIGGER_KEYS = [" ", "Enter"];

  function Sync(Splide2, Components2, options) {
    var isNavigation = options.isNavigation,
        slideFocus = options.slideFocus;
    var events = [];

    function mount() {
      Splide2.splides.forEach(function (target) {
        if (!target.isParent) {
          sync(Splide2, target.splide);
          sync(target.splide, Splide2);
        }
      });

      if (isNavigation) {
        navigate();
      }
    }

    function destroy() {
      events.forEach(function (event) {
        event.destroy();
      });
      empty(events);
    }

    function remount() {
      destroy();
      mount();
    }

    function sync(splide, target) {
      var event = EventInterface(splide);
      event.on(EVENT_MOVE, function (index, prev, dest) {
        target.go(target.is(LOOP) ? dest : index);
      });
      events.push(event);
    }

    function navigate() {
      var event = EventInterface(Splide2);
      var on = event.on;
      on(EVENT_CLICK, onClick);
      on(EVENT_SLIDE_KEYDOWN, onKeydown);
      on([EVENT_MOUNTED, EVENT_UPDATED], update);
      events.push(event);
      event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
    }

    function update() {
      setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
    }

    function onClick(Slide) {
      Splide2.go(Slide.index);
    }

    function onKeydown(Slide, e) {
      if (includes(TRIGGER_KEYS, normalizeKey(e))) {
        onClick(Slide);
        prevent(e);
      }
    }

    return {
      setup: apply(Components2.Media.set, {
        slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
      }, true),
      mount: mount,
      destroy: destroy,
      remount: remount
    };
  }

  function Wheel(Splide2, Components2, options) {
    var _EventInterface12 = EventInterface(Splide2),
        bind = _EventInterface12.bind;

    var lastTime = 0;

    function mount() {
      if (options.wheel) {
        bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
      }
    }

    function onWheel(e) {
      if (e.cancelable) {
        var deltaY = e.deltaY;
        var backwards = deltaY < 0;
        var timeStamp = timeOf(e);

        var _min = options.wheelMinThreshold || 0;

        var sleep = options.wheelSleep || 0;

        if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
          Splide2.go(backwards ? "<" : ">");
          lastTime = timeStamp;
        }

        shouldPrevent(backwards) && prevent(e);
      }
    }

    function shouldPrevent(backwards) {
      return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
    }

    return {
      mount: mount
    };
  }

  var SR_REMOVAL_DELAY = 90;

  function Live(Splide2, Components2, options) {
    var _EventInterface13 = EventInterface(Splide2),
        on = _EventInterface13.on;

    var track = Components2.Elements.track;
    var enabled = options.live && !options.isNavigation;
    var sr = create("span", CLASS_SR);
    var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));

    function mount() {
      if (enabled) {
        disable(!Components2.Autoplay.isPaused());
        setAttribute(track, ARIA_ATOMIC, true);
        sr.textContent = "\u2026";
        on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
        on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
        on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
      }
    }

    function toggle(active) {
      setAttribute(track, ARIA_BUSY, active);

      if (active) {
        append(track, sr);
        interval.start();
      } else {
        remove(sr);
        interval.cancel();
      }
    }

    function destroy() {
      removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
      remove(sr);
    }

    function disable(disabled) {
      if (enabled) {
        setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
      }
    }

    return {
      mount: mount,
      disable: disable,
      destroy: destroy
    };
  }

  var ComponentConstructors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Media: Media,
    Direction: Direction,
    Elements: Elements,
    Slides: Slides,
    Layout: Layout,
    Clones: Clones,
    Move: Move,
    Controller: Controller,
    Arrows: Arrows,
    Autoplay: Autoplay,
    Cover: Cover,
    Scroll: Scroll,
    Drag: Drag,
    Keyboard: Keyboard,
    LazyLoad: LazyLoad,
    Pagination: Pagination,
    Sync: Sync,
    Wheel: Wheel,
    Live: Live
  });
  var I18N = {
    prev: "Previous slide",
    next: "Next slide",
    first: "Go to first slide",
    last: "Go to last slide",
    slideX: "Go to slide %s",
    pageX: "Go to page %s",
    play: "Start autoplay",
    pause: "Pause autoplay",
    carousel: "carousel",
    slide: "slide",
    select: "Select a slide to show",
    slideLabel: "%s of %s"
  };
  var DEFAULTS = {
    type: "slide",
    role: "region",
    speed: 400,
    perPage: 1,
    cloneStatus: true,
    arrows: true,
    pagination: true,
    paginationKeyboard: true,
    interval: 5e3,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    drag: true,
    direction: "ltr",
    trimSpace: true,
    focusableNodes: "a, button, textarea, input, select, iframe",
    live: true,
    classes: CLASSES,
    i18n: I18N,
    reducedMotion: {
      speed: 0,
      rewindSpeed: 0,
      autoplay: "pause"
    }
  };

  function Fade(Splide2, Components2, options) {
    var Slides = Components2.Slides;

    function mount() {
      EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
    }

    function init() {
      Slides.forEach(function (Slide) {
        Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
      });
    }

    function start(index, done) {
      Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
      nextTick(done);
    }

    return {
      mount: mount,
      start: start,
      cancel: noop
    };
  }

  function Slide(Splide2, Components2, options) {
    var Move = Components2.Move,
        Controller = Components2.Controller,
        Scroll = Components2.Scroll;
    var list = Components2.Elements.list;
    var transition = apply(style, list, "transition");
    var endCallback;

    function mount() {
      EventInterface(Splide2).bind(list, "transitionend", function (e) {
        if (e.target === list && endCallback) {
          cancel();
          endCallback();
        }
      });
    }

    function start(index, done) {
      var destination = Move.toPosition(index, true);
      var position = Move.getPosition();
      var speed = getSpeed(index);

      if (abs(destination - position) >= 1 && speed >= 1) {
        if (options.useScroll) {
          Scroll.scroll(destination, speed, false, done);
        } else {
          transition("transform " + speed + "ms " + options.easing);
          Move.translate(destination, true);
          endCallback = done;
        }
      } else {
        Move.jump(index);
        done();
      }
    }

    function cancel() {
      transition("");
      Scroll.cancel();
    }

    function getSpeed(index) {
      var rewindSpeed = options.rewindSpeed;

      if (Splide2.is(SLIDE) && rewindSpeed) {
        var prev = Controller.getIndex(true);
        var end = Controller.getEnd();

        if (prev === 0 && index >= end || prev >= end && index === 0) {
          return rewindSpeed;
        }
      }

      return options.speed;
    }

    return {
      mount: mount,
      start: start,
      cancel: cancel
    };
  }

  var _Splide = /*#__PURE__*/function () {
    function _Splide(target, options) {
      this.event = EventInterface();
      this.Components = {};
      this.state = State(CREATED);
      this.splides = [];
      this._o = {};
      this._E = {};
      var root = isString(target) ? query(document, target) : target;
      assert(root, root + " is invalid.");
      this.root = root;
      options = merge({
        label: getAttribute(root, ARIA_LABEL) || "",
        labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
      }, DEFAULTS, _Splide.defaults, options || {});

      try {
        merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
      } catch (e) {
        assert(false, "Invalid JSON");
      }

      this._o = Object.create(merge({}, options));
    }

    var _proto = _Splide.prototype;

    _proto.mount = function mount(Extensions, Transition) {
      var _this = this;

      var state = this.state,
          Components2 = this.Components;
      assert(state.is([CREATED, DESTROYED]), "Already mounted!");
      state.set(CREATED);
      this._C = Components2;
      this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
      this._E = Extensions || this._E;
      var Constructors = assign({}, ComponentConstructors, this._E, {
        Transition: this._T
      });
      forOwn(Constructors, function (Component, key) {
        var component = Component(_this, Components2, _this._o);
        Components2[key] = component;
        component.setup && component.setup();
      });
      forOwn(Components2, function (component) {
        component.mount && component.mount();
      });
      this.emit(EVENT_MOUNTED);
      addClass(this.root, CLASS_INITIALIZED);
      state.set(IDLE);
      this.emit(EVENT_READY);
      return this;
    };

    _proto.sync = function sync(splide) {
      this.splides.push({
        splide: splide
      });
      splide.splides.push({
        splide: this,
        isParent: true
      });

      if (this.state.is(IDLE)) {
        this._C.Sync.remount();

        splide.Components.Sync.remount();
      }

      return this;
    };

    _proto.go = function go(control) {
      this._C.Controller.go(control);

      return this;
    };

    _proto.on = function on(events, callback) {
      this.event.on(events, callback);
      return this;
    };

    _proto.off = function off(events) {
      this.event.off(events);
      return this;
    };

    _proto.emit = function emit(event) {
      var _this$event;

      (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));

      return this;
    };

    _proto.add = function add(slides, index) {
      this._C.Slides.add(slides, index);

      return this;
    };

    _proto.remove = function remove(matcher) {
      this._C.Slides.remove(matcher);

      return this;
    };

    _proto.is = function is(type) {
      return this._o.type === type;
    };

    _proto.refresh = function refresh() {
      this.emit(EVENT_REFRESH);
      return this;
    };

    _proto.destroy = function destroy(completely) {
      if (completely === void 0) {
        completely = true;
      }

      var event = this.event,
          state = this.state;

      if (state.is(CREATED)) {
        EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
      } else {
        forOwn(this._C, function (component) {
          component.destroy && component.destroy(completely);
        }, true);
        event.emit(EVENT_DESTROY);
        event.destroy();
        completely && empty(this.splides);
        state.set(DESTROYED);
      }

      return this;
    };

    _createClass$1(_Splide, [{
      key: "options",
      get: function get() {
        return this._o;
      },
      set: function set(options) {
        this._C.Media.set(options, true, true);
      }
    }, {
      key: "length",
      get: function get() {
        return this._C.Slides.getLength(true);
      }
    }, {
      key: "index",
      get: function get() {
        return this._C.Controller.getIndex();
      }
    }]);

    return _Splide;
  }();

  var Splide = _Splide;
  Splide.defaults = {};
  Splide.STATES = STATES;

  var EL = '.js-references';
  if (document.querySelector(EL)) {
    var slider = new Splide(EL, {
      pagination: false,
      arrows: true,
      perPage: 3,
      gap: 30,
      perMove: 1,
      breakpoints: {
        1024: {
          perPage: 2
        },
        768: {
          perPage: 1
        }
      }
    }).mount();
  }

  var Tabs = /*#__PURE__*/function () {
    function Tabs() {
      var _this = this;
      _classCallCheck(this, Tabs);
      _defineProperty(this, "clickHandler", function (e) {
        var button = e.currentTarget;
        var widget = button.closest(_this.WIDGET);
        _this.switchTab(widget, _this.getIndex(button));
        button.classList.add(_this.ACTIVECLASS);
      });
      _defineProperty(this, "selectHandler", function (e) {
        var select = e.currentTarget;
        var widget = select.closest(_this.WIDGET);
        _this.switchTab(widget, select.selectedIndex);
      });
      _defineProperty(this, "switchTab", function (widget, index) {
        var tabs = widget.querySelectorAll('.js-tabs-list > *');
        _this.reset(widget);
        tabs.forEach(function (tab) {
          if (_this.getIndex(tab) === index) {
            tab.removeAttribute('hidden');
          }
        });
        window.dispatchEvent(new CustomEvent('scroll'));
      });
      _defineProperty(this, "getIndex", function (el) {
        return _toConsumableArray(el.parentNode.children).indexOf(el);
      });
      _defineProperty(this, "reset", function (widget) {
        var nav = widget.querySelectorAll('.js-tabs-nav > *');
        var tabs = widget.querySelectorAll('.js-tabs-list > *');
        nav.forEach(function (button) {
          button.classList.remove(_this.ACTIVECLASS);
        });
        tabs.forEach(function (tab) {
          tab.setAttribute('hidden', 'hidden');
        });
      });
      this.WIDGET = '.js-tabs';
      this.ACTIVECLASS = 'current';
      this.elements = document.querySelectorAll(this.WIDGET);
      this.elements.forEach(function (el) {
        var nav = el.querySelectorAll('.js-tabs-nav > *');
        var select = el.querySelector('.js-tabs-select');
        nav.forEach(function (el) {
          el.addEventListener('click', _this.clickHandler, false);
        });
        if (select) {
          select.addEventListener('change', _this.selectHandler, false);
        }
      });
      this.activateTabFromURL();
    }
    _createClass(Tabs, [{
      key: "activateTabFromURL",
      value: function activateTabFromURL() {
        var _this2 = this;
        var urlParams = new URLSearchParams(window.location.search);
        var tabParam = urlParams.get('tab');
        if (tabParam) {
          var tabIndex = parseInt(tabParam, 10) - 1;
          if (!isNaN(tabIndex)) {
            this.elements.forEach(function (widget) {
              _this2.switchTab(widget, tabIndex);
              var nav = widget.querySelectorAll('.js-tabs-nav > *');
              if (nav[tabIndex]) {
                nav[tabIndex].classList.add(_this2.ACTIVECLASS);
              }
            });
          }
        }
      }
    }]);
    return Tabs;
  }();
  new Tabs();

  /**
   * Dropdown
   * ======================================
   * - mobile only
   * - add class to parent on click
   * - and close others open on mobile
   */

  var WIDGET = '.dropdown';
  var ACTIVECLASS = 'is-open';
  var IS_COARSE = matchMedia('(pointer:coarse)').matches;
  var Dropdown = /*#__PURE__*/_createClass(function Dropdown() {
    var _this = this;
    _classCallCheck(this, Dropdown);
    _defineProperty(this, "init", function () {
      _this.elements.forEach(function (el) {
        var button = el.querySelector('.dropdown__btn');
        if (button) {
          button.addEventListener('click', _this.clickHandler, false);
        }
      });
    });
    _defineProperty(this, "clickHandler", function (e) {
      var button = e.currentTarget;
      var widget = button.closest(WIDGET);
      if (!widget.classList.contains(ACTIVECLASS)) {
        _this.closeActive();
      }
      widget.classList.toggle(ACTIVECLASS);
    });
    _defineProperty(this, "closeActive", function () {
      var openDropdown = document.querySelector('.dropdown.is-open');
      if (openDropdown) {
        openDropdown.classList.remove('is-open');
      }
    });
    this.elements = document.querySelectorAll(WIDGET);
  });
  if (IS_COARSE) {
    var DropdownObject = new Dropdown();
    DropdownObject.init();
  }

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub2dnbGVCb2R5Q2xhc3MuanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL1Njcm9sbENsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BzcGxpZGVqcy9zcGxpZGUvZGlzdC9qcy9zcGxpZGUuZXNtLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9SZWZlcmVuY2VzLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9UYWJzLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ecm9wZG93bi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQW5pbWF0ZVxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIGFkZCBjbGFzcyB0byBlbGVtZW50IGluIHZpZXdwb3J0XHJcbiAqIC0gaWYgeW91IHdhbnQgZGlzYWJsZSBhbmltYXRlIGRlbGF5IG9uIG1vYmlsZSB1c2UgW2FuaW1hdGUtZGVsYXktZGVza3RvcF1cclxuICogLSBzZXQgYW5pbWF0aW9uIGRlbGF5IHZpYSBbYW5pbWF0ZS1kZWxheV0gaHRtbCBhdHRyaWJ1dGVcclxuICogLSBzZXQgdmlzaWJsZSB0aHJlc2hvbGQgdmlhIFthbmltYXRlLXRocmVzaG9sZF0gaHRtbCBhdHRyaWJ1dGVcclxuICogLSB0b2dnbGUgY2xhc3Mgb24gYm9keSB3aGVuIHZpc2libGUgdmlhIFthbmltYXRlLWJvZHktY2xhc3NdIGF0dHJcclxuICogLSBhZGQgY2xhc3MgZm9yIGFsbCBjaGlsZHJlbnMgb2YgQVVUT19DSElMRFJFTlNcclxuICovXHJcblxyXG5jb25zdCBJU01PQklMRSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzXHJcbmNvbnN0IFRIUkVTSE9MRCA9IElTTU9CSUxFID8gJzAuNCcgOiAnMC42J1xyXG5jb25zdCBMT0FEX1RIUkVTSE9MRCA9ICcwLjInXHJcbmNvbnN0IEVMRU1FTlRTX0NMQVNTID0gJ2FuaW1hdGUnXHJcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSAnYW5pbWF0ZS0tdmlzaWJsZSdcclxuY29uc3QgQVVUT19DSElMRFJFTlMgPSAnLmpzLWFuaW1hdGUtY2hpbGRyZW5zJ1xyXG5cclxuY2xhc3MgQW5pbWF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgIHRoaXMuYXV0b19lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoQVVUT19DSElMRFJFTlMpXHJcblxyXG4gICBpZih0aGlzLmF1dG9fZWxlbWVudHMpe1xyXG4gICAgdGhpcy5hdXRvX2VsZW1lbnRzLmZvckVhY2goKGdyb3VwKSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgZ3JvdXAuY2hpbGRyZW4pIHtcclxuICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKEVMRU1FTlRTX0NMQVNTKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICB9XHJcblxyXG4gICB0aGlzLlRIUkVTSE9MRCA9IFRIUkVTSE9MRFxyXG4gICB0aGlzLkxPQURfVEhSRVNIT0xEID0gTE9BRF9USFJFU0hPTERcclxuICAgdGhpcy5zZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nKyBFTEVNRU5UU19DTEFTUylcclxuXHJcbiAgICAgaWYoJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cpIHtcclxuICAgICAgIHRoaXMuc2VjdGlvbnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICBjb25zdCBCb3VuZGluZ0NsaWVudFJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgIGNvbnN0IHZpc2libGVSYXRpbyA9ICBCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IC8gd2luZG93LmlubmVySGVpZ2h0XHJcblxyXG4gICAgICAgIGlmKHZpc2libGVSYXRpbyA+IDAuOTUpe1xyXG4gICAgICAgICAgdGhpcy5USFJFU0hPTEQgPSAgd2luZG93LmlubmVySGVpZ2h0IC8gQm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCAvIDEwMCAqIDMwXHJcbiAgICAgICAgICB0aGlzLkxPQURfVEhSRVNIT0xEID0gd2luZG93LmlubmVySGVpZ2h0IC8gQm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCAvIDEwMCAqIDIwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gb2JzZXJ2ZSBvbiBwYWdlIGxvYWRcclxuICAgICAgICAgY29uc3QgbG9hZE9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMub2JzZXJ2ZUNhbGxiYWNrLCB7XHJcbiAgICAgICAgICAgdGhyZXNob2xkOiB0aGlzLkxPQURfVEhSRVNIT0xEXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICBsb2FkT2JzZXJ2ZXIub2JzZXJ2ZShlbCk7XHJcblxyXG5cclxuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgbG9hZE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgIC8vIG9ic2VydmVcclxuICAgICAgICAgY29uc3Qgb2JzZXJ2ZXJUaHJlc2hvbGQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtdGhyZXNob2xkJykgPyBlbC5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtdGhyZXNob2xkJykgOiB0aGlzLlRIUkVTSE9MRFxyXG4gICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLm9ic2VydmVDYWxsYmFjaywge1xyXG4gICAgICAgICAgIHRocmVzaG9sZDogb2JzZXJ2ZXJUaHJlc2hvbGRcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWwpO1xyXG4gICAgICAgfSlcclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgdGhpcy5zZWN0aW9ucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpXHJcbiAgICAgICB9KVxyXG4gICAgIH1cclxuICB9XHJcblxyXG4gICBvYnNlcnZlQ2FsbGJhY2sgPSAoZW50cmllcykgPT4ge1xyXG4gICAgIGVudHJpZXMubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICAgY29uc3Qgc2VjdGlvbiA9IGVudHJ5LnRhcmdldDtcclxuICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5nZXREZWxheShzZWN0aW9uKVxyXG4gICAgICAgY29uc3Qgc2VjdGlvbkJvZHlDbGFzcyA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWJvZHktY2xhc3MnKVxyXG5cclxuICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICBpZihJU01PQklMRSAmJiBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1kZWxheS1kZXNrdG9wJykpe1xyXG4gICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKVxyXG5cclxuICAgICAgICAgICB0aGlzLmJvZHlDbGFzcyhzZWN0aW9uQm9keUNsYXNzLCAnYWRkJylcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKVxyXG4gICAgICAgICAgICAgdGhpcy5ib2R5Q2xhc3Moc2VjdGlvbkJvZHlDbGFzcywgJ2FkZCcpXHJcbiAgICAgICAgICAgfSwgZGVsYXkpXHJcbiAgICAgICAgIH1cclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHRoaXMuYm9keUNsYXNzKHNlY3Rpb25Cb2R5Q2xhc3MsICdyZW1vdmUnKVxyXG4gICAgICAgfVxyXG4gICAgIH0pO1xyXG4gICB9XHJcblxyXG4gIGdldERlbGF5ID0gKHNlY3Rpb24pID0+IHtcclxuICB2YXIgZGVsYXkgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1kZWxheScpXHJcblxyXG4gIGlmKCFJU01PQklMRSAmJiBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1kZWxheS1kZXNrdG9wJykpe1xyXG4gICAgdmFyIGRlbGF5ID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXktZGVza3RvcCcpXHJcbiAgfVxyXG5cclxuICBpZiAoZGVsYXkgPT09IG51bGwpIHtcclxuICAgIHJldHVybiAwXHJcbiAgfSBlbHNlIGlmIChkZWxheS5pbmNsdWRlcygnLicpKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoZGVsYXkgKiAxMDAwKVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoZGVsYXkpXHJcbiAgfVxyXG4gIH1cclxuXHJcbiAgYm9keUNsYXNzID0gKGh0bWxjbGFzcywgdHlwZSkgPT4ge1xyXG4gICAgaWYoIWh0bWxjbGFzcyl7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgICBpZih0eXBlID09ICdhZGQnKXtcclxuICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChodG1sY2xhc3MpXHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShodG1sY2xhc3MpXHJcbiAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbm5ldyBBbmltYXRlKClcclxuIiwiLyoqXHJcbiAqIFRvZ2dsZUJvZHlDbGFzc1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIHRvZ2dsZSBjbGFzcyBvbiBib2R5XHJcbiAqIC0gbXVsdGlwbGUgY2xhc3NlcyBzdXBwb3J0ZWQgLSBcIkNMQVNTTkFNRSBDTEFTU05BTUUyIC4uLlwiXHJcbiAqIC0gYWRkIGNsYXNzIHRvIGh0bWwgYXR0ciBbZGF0YS10b2dnbGU9XCJDTEFTU05BTUVcIl1cclxuICogLSByZW1vdmUgY2xhc3Mgd2hlbiBhdHRyIFtkYXRhLXJlbW92ZT1cIkNMQVNTTkFNRVwiXVxyXG4gKi9cclxuXHJcbiBjb25zdCBFTEVNRU5UUyA9ICcuanMtVG9nZ2xlQm9keUNsYXNzJ1xyXG5cclxuIGNsYXNzIFRvZ2dsZUJvZHlDbGFzcyB7XHJcbiAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgIHRoaXMuZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEVMRU1FTlRTKVxyXG5cclxuICAgICBpZiAoIXRoaXMuZWxlbWVudHMpIHtcclxuICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgIH1cclxuXHJcbiAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUsIGZhbHNlKVxyXG4gICAgIH0pXHJcbiAgIH1cclxuXHJcbiAgIHRvZ2dsZSA9IChlKSA9PiB7XHJcbiAgICAgY29uc3QgZWwgPSBlLmN1cnJlbnRUYXJnZXRcclxuICAgICBjb25zdCBjbGFzc2VzID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZScpXHJcbiAgICAgY29uc3QgY2xhc3Nlc1JlbW92ZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1vdmUnKVxyXG5cclxuICAgICBpZihjbGFzc2VzUmVtb3ZlKXtcclxuICAgICAgY2xhc3Nlc1JlbW92ZS5zcGxpdChcIiBcIikuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXHJcbiAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICBjbGFzc2VzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpXHJcbiAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgIH1cclxuIH1cclxuXHJcbiBuZXcgVG9nZ2xlQm9keUNsYXNzKClcclxuIiwiLypcclxuICBAIEFkZCBib2R5IGNsYXNzIGlmOlxyXG4gIC0gc2Nyb2xsIHN0YXJ0ZWRcclxuICAtIHNjcm9sbGVkIHRvIGJvdHRvbVxyXG4qL1xyXG5cclxuY29uc3QgU1RBUlRfT0ZGU0VUID0gMTA7XHJcbmNvbnN0IFNUQVJUX0NMQVNTID0gXCJpcy1zY3JvbGxlZFwiO1xyXG5jb25zdCBCT1RUT01fT0ZGU0VUID0gMTA7XHJcbmNvbnN0IEJPVFRPTV9DTEFTUyA9IFwiaXMtc2Nyb2xsZWQtYm90dG9tXCI7XHJcblxyXG5jb25zdCBVUF9ET1dOX0NMQVNTRVMgPSBmYWxzZTtcclxuY29uc3QgVVBfQ0xBU1MgPSBcInNjcm9sbGluZy11cFwiO1xyXG5jb25zdCBET1dOX0NMQVNTID0gXCJzY3JvbGxpbmctZG93blwiO1xyXG5cclxuY2xhc3MgU2Nyb2xsQ2xhc3Mge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxIYW5kbGVyKCk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoU1RBUlRfQ0xBU1MsIHRvcCA+PSBTVEFSVF9PRkZTRVQpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFxyXG4gICAgICBCT1RUT01fQ0xBU1MsXHJcbiAgICAgIHdpbmRvdy5pbm5lckhlaWdodCArIHRvcCA+PSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIEJPVFRPTV9PRkZTRVRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKFVQX0RPV05fQ0xBU1NFUykge1xyXG4gICAgICBpZih0aGlzLm9sZFNjcm9sbCA+IHRvcCl7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFVQX0NMQVNTKVxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShET1dOX0NMQVNTKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoRE9XTl9DTEFTUylcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoVVBfQ0xBU1MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbGRTY3JvbGwgPSB0b3A7XHJcblxyXG4gIH07XHJcbn1cclxuXHJcbm5ldyBTY3JvbGxDbGFzcygpO1xyXG4iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbi8qIVxuICogU3BsaWRlLmpzXG4gKiBWZXJzaW9uICA6IDQuMS40XG4gKiBMaWNlbnNlICA6IE1JVFxuICogQ29weXJpZ2h0OiAyMDIyIE5hb3Rvc2hpIEZ1aml0YVxuICovXG52YXIgTUVESUFfUFJFRkVSU19SRURVQ0VEX01PVElPTiA9IFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIjtcbnZhciBDUkVBVEVEID0gMTtcbnZhciBNT1VOVEVEID0gMjtcbnZhciBJRExFID0gMztcbnZhciBNT1ZJTkcgPSA0O1xudmFyIFNDUk9MTElORyA9IDU7XG52YXIgRFJBR0dJTkcgPSA2O1xudmFyIERFU1RST1lFRCA9IDc7XG52YXIgU1RBVEVTID0ge1xuICBDUkVBVEVEOiBDUkVBVEVELFxuICBNT1VOVEVEOiBNT1VOVEVELFxuICBJRExFOiBJRExFLFxuICBNT1ZJTkc6IE1PVklORyxcbiAgU0NST0xMSU5HOiBTQ1JPTExJTkcsXG4gIERSQUdHSU5HOiBEUkFHR0lORyxcbiAgREVTVFJPWUVEOiBERVNUUk9ZRURcbn07XG5cbmZ1bmN0aW9uIGVtcHR5KGFycmF5KSB7XG4gIGFycmF5Lmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHNsaWNlKGFycmF5TGlrZSwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyYXlMaWtlLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gYXBwbHkoZnVuYykge1xuICByZXR1cm4gZnVuYy5iaW5kLmFwcGx5KGZ1bmMsIFtudWxsXS5jb25jYXQoc2xpY2UoYXJndW1lbnRzLCAxKSkpO1xufVxuXG52YXIgbmV4dFRpY2sgPSBzZXRUaW1lb3V0O1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcblxuZnVuY3Rpb24gcmFmKGZ1bmMpIHtcbiAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jKTtcbn1cblxuZnVuY3Rpb24gdHlwZU9mKHR5cGUsIHN1YmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWJqZWN0ID09PSB0eXBlO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChzdWJqZWN0KSB7XG4gIHJldHVybiAhaXNOdWxsKHN1YmplY3QpICYmIHR5cGVPZihcIm9iamVjdFwiLCBzdWJqZWN0KTtcbn1cblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGlzRnVuY3Rpb24gPSBhcHBseSh0eXBlT2YsIFwiZnVuY3Rpb25cIik7XG52YXIgaXNTdHJpbmcgPSBhcHBseSh0eXBlT2YsIFwic3RyaW5nXCIpO1xudmFyIGlzVW5kZWZpbmVkID0gYXBwbHkodHlwZU9mLCBcInVuZGVmaW5lZFwiKTtcblxuZnVuY3Rpb24gaXNOdWxsKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QgPT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzSFRNTEVsZW1lbnQoc3ViamVjdCkge1xuICB0cnkge1xuICAgIHJldHVybiBzdWJqZWN0IGluc3RhbmNlb2YgKHN1YmplY3Qub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLkhUTUxFbGVtZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHZhbHVlcywgaXRlcmF0ZWUpIHtcbiAgdG9BcnJheSh2YWx1ZXMpLmZvckVhY2goaXRlcmF0ZWUpO1xufVxuXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIHB1c2goYXJyYXksIGl0ZW1zKSB7XG4gIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHRvQXJyYXkoaXRlbXMpKTtcbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbG0sIGNsYXNzZXMsIGFkZCkge1xuICBpZiAoZWxtKSB7XG4gICAgZm9yRWFjaChjbGFzc2VzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgZWxtLmNsYXNzTGlzdFthZGQgPyBcImFkZFwiIDogXCJyZW1vdmVcIl0obmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxtLCBjbGFzc2VzKSB7XG4gIHRvZ2dsZUNsYXNzKGVsbSwgaXNTdHJpbmcoY2xhc3NlcykgPyBjbGFzc2VzLnNwbGl0KFwiIFwiKSA6IGNsYXNzZXMsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmQocGFyZW50LCBjaGlsZHJlbikge1xuICBmb3JFYWNoKGNoaWxkcmVuLCBwYXJlbnQuYXBwZW5kQ2hpbGQuYmluZChwYXJlbnQpKTtcbn1cblxuZnVuY3Rpb24gYmVmb3JlKG5vZGVzLCByZWYpIHtcbiAgZm9yRWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgcGFyZW50ID0gKHJlZiB8fCBub2RlKS5wYXJlbnROb2RlO1xuXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCByZWYpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxtLCBzZWxlY3Rvcikge1xuICByZXR1cm4gaXNIVE1MRWxlbWVudChlbG0pICYmIChlbG1bXCJtc01hdGNoZXNTZWxlY3RvclwiXSB8fCBlbG0ubWF0Y2hlcykuY2FsbChlbG0sIHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW4ocGFyZW50LCBzZWxlY3Rvcikge1xuICB2YXIgY2hpbGRyZW4yID0gcGFyZW50ID8gc2xpY2UocGFyZW50LmNoaWxkcmVuKSA6IFtdO1xuICByZXR1cm4gc2VsZWN0b3IgPyBjaGlsZHJlbjIuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIHJldHVybiBtYXRjaGVzKGNoaWxkLCBzZWxlY3Rvcik7XG4gIH0pIDogY2hpbGRyZW4yO1xufVxuXG5mdW5jdGlvbiBjaGlsZChwYXJlbnQsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA/IGNoaWxkcmVuKHBhcmVudCwgc2VsZWN0b3IpWzBdIDogcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG52YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5mdW5jdGlvbiBmb3JPd24ob2JqZWN0LCBpdGVyYXRlZSwgcmlnaHQpIHtcbiAgaWYgKG9iamVjdCkge1xuICAgIChyaWdodCA/IG93bktleXMob2JqZWN0KS5yZXZlcnNlKCkgOiBvd25LZXlzKG9iamVjdCkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAga2V5ICE9PSBcIl9fcHJvdG9fX1wiICYmIGl0ZXJhdGVlKG9iamVjdFtrZXldLCBrZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gYXNzaWduKG9iamVjdCkge1xuICBzbGljZShhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgIGZvck93bihzb3VyY2UsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gbWVyZ2Uob2JqZWN0KSB7XG4gIHNsaWNlKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgZm9yT3duKHNvdXJjZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlLnNsaWNlKCk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IG1lcmdlKHt9LCBpc09iamVjdChvYmplY3Rba2V5XSkgPyBvYmplY3Rba2V5XSA6IHt9LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gb21pdChvYmplY3QsIGtleXMpIHtcbiAgZm9yRWFjaChrZXlzIHx8IG93bktleXMob2JqZWN0KSwgZnVuY3Rpb24gKGtleSkge1xuICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZShlbG1zLCBhdHRycykge1xuICBmb3JFYWNoKGVsbXMsIGZ1bmN0aW9uIChlbG0pIHtcbiAgICBmb3JFYWNoKGF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgZWxtICYmIGVsbS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUoZWxtcywgYXR0cnMsIHZhbHVlKSB7XG4gIGlmIChpc09iamVjdChhdHRycykpIHtcbiAgICBmb3JPd24oYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZTIsIG5hbWUpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShlbG1zLCBuYW1lLCB2YWx1ZTIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2goZWxtcywgZnVuY3Rpb24gKGVsbSkge1xuICAgICAgaXNOdWxsKHZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIiA/IHJlbW92ZUF0dHJpYnV0ZShlbG0sIGF0dHJzKSA6IGVsbS5zZXRBdHRyaWJ1dGUoYXR0cnMsIFN0cmluZyh2YWx1ZSkpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIGF0dHJzLCBwYXJlbnQpIHtcbiAgdmFyIGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICBpZiAoYXR0cnMpIHtcbiAgICBpc1N0cmluZyhhdHRycykgPyBhZGRDbGFzcyhlbG0sIGF0dHJzKSA6IHNldEF0dHJpYnV0ZShlbG0sIGF0dHJzKTtcbiAgfVxuXG4gIHBhcmVudCAmJiBhcHBlbmQocGFyZW50LCBlbG0pO1xuICByZXR1cm4gZWxtO1xufVxuXG5mdW5jdGlvbiBzdHlsZShlbG0sIHByb3AsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbG0pW3Byb3BdO1xuICB9XG5cbiAgaWYgKCFpc051bGwodmFsdWUpKSB7XG4gICAgZWxtLnN0eWxlW3Byb3BdID0gXCJcIiArIHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXkoZWxtLCBkaXNwbGF5Mikge1xuICBzdHlsZShlbG0sIFwiZGlzcGxheVwiLCBkaXNwbGF5Mik7XG59XG5cbmZ1bmN0aW9uIGZvY3VzKGVsbSkge1xuICBlbG1bXCJzZXRBY3RpdmVcIl0gJiYgZWxtW1wic2V0QWN0aXZlXCJdKCkgfHwgZWxtLmZvY3VzKHtcbiAgICBwcmV2ZW50U2Nyb2xsOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGUoZWxtLCBhdHRyKSB7XG4gIHJldHVybiBlbG0uZ2V0QXR0cmlidXRlKGF0dHIpO1xufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbG0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gZWxtICYmIGVsbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbn1cblxuZnVuY3Rpb24gcmVjdCh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKG5vZGVzKSB7XG4gIGZvckVhY2gobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VIdG1sKGh0bWwpIHtcbiAgcmV0dXJuIGNoaWxkKG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIikuYm9keSk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnQoZSwgc3RvcFByb3BhZ2F0aW9uKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBpZiAoc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5KHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHBhcmVudCAmJiBwYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID8gc2xpY2UocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSA6IFtdO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbG0sIGNsYXNzZXMpIHtcbiAgdG9nZ2xlQ2xhc3MoZWxtLCBjbGFzc2VzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHRpbWVPZihlKSB7XG4gIHJldHVybiBlLnRpbWVTdGFtcDtcbn1cblxuZnVuY3Rpb24gdW5pdCh2YWx1ZSkge1xuICByZXR1cm4gaXNTdHJpbmcodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA/IHZhbHVlICsgXCJweFwiIDogXCJcIjtcbn1cblxudmFyIFBST0pFQ1RfQ09ERSA9IFwic3BsaWRlXCI7XG52YXIgREFUQV9BVFRSSUJVVEUgPSBcImRhdGEtXCIgKyBQUk9KRUNUX0NPREU7XG5cbmZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJbXCIgKyBQUk9KRUNUX0NPREUgKyBcIl0gXCIgKyAobWVzc2FnZSB8fCBcIlwiKSk7XG4gIH1cbn1cblxudmFyIG1pbiA9IE1hdGgubWluLFxuICAgIG1heCA9IE1hdGgubWF4LFxuICAgIGZsb29yID0gTWF0aC5mbG9vcixcbiAgICBjZWlsID0gTWF0aC5jZWlsLFxuICAgIGFicyA9IE1hdGguYWJzO1xuXG5mdW5jdGlvbiBhcHByb3hpbWF0ZWx5RXF1YWwoeCwgeSwgZXBzaWxvbikge1xuICByZXR1cm4gYWJzKHggLSB5KSA8IGVwc2lsb247XG59XG5cbmZ1bmN0aW9uIGJldHdlZW4obnVtYmVyLCB4LCB5LCBleGNsdXNpdmUpIHtcbiAgdmFyIG1pbmltdW0gPSBtaW4oeCwgeSk7XG4gIHZhciBtYXhpbXVtID0gbWF4KHgsIHkpO1xuICByZXR1cm4gZXhjbHVzaXZlID8gbWluaW11bSA8IG51bWJlciAmJiBudW1iZXIgPCBtYXhpbXVtIDogbWluaW11bSA8PSBudW1iZXIgJiYgbnVtYmVyIDw9IG1heGltdW07XG59XG5cbmZ1bmN0aW9uIGNsYW1wKG51bWJlciwgeCwgeSkge1xuICB2YXIgbWluaW11bSA9IG1pbih4LCB5KTtcbiAgdmFyIG1heGltdW0gPSBtYXgoeCwgeSk7XG4gIHJldHVybiBtaW4obWF4KG1pbmltdW0sIG51bWJlciksIG1heGltdW0pO1xufVxuXG5mdW5jdGlvbiBzaWduKHgpIHtcbiAgcmV0dXJuICsoeCA+IDApIC0gKyh4IDwgMCk7XG59XG5cbmZ1bmN0aW9uIGNhbWVsVG9LZWJhYihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2EtejAtOV0pKFtBLVpdKS9nLCBcIiQxLSQyXCIpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdChzdHJpbmcsIHJlcGxhY2VtZW50cykge1xuICBmb3JFYWNoKHJlcGxhY2VtZW50cywgZnVuY3Rpb24gKHJlcGxhY2VtZW50KSB7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoXCIlc1wiLCBcIlwiICsgcmVwbGFjZW1lbnQpO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZztcbn1cblxuZnVuY3Rpb24gcGFkKG51bWJlcikge1xuICByZXR1cm4gbnVtYmVyIDwgMTAgPyBcIjBcIiArIG51bWJlciA6IFwiXCIgKyBudW1iZXI7XG59XG5cbnZhciBpZHMgPSB7fTtcblxuZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG4gIHJldHVybiBcIlwiICsgcHJlZml4ICsgcGFkKGlkc1twcmVmaXhdID0gKGlkc1twcmVmaXhdIHx8IDApICsgMSk7XG59XG5cbmZ1bmN0aW9uIEV2ZW50QmluZGVyKCkge1xuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYmluZCh0YXJnZXRzLCBldmVudHMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgZm9yRWFjaEV2ZW50KHRhcmdldHMsIGV2ZW50cywgZnVuY3Rpb24gKHRhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSkge1xuICAgICAgdmFyIGlzRXZlbnRUYXJnZXQgPSAoXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gdGFyZ2V0KTtcbiAgICAgIHZhciByZW1vdmVyID0gaXNFdmVudFRhcmdldCA/IHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyLmJpbmQodGFyZ2V0LCBldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIDogdGFyZ2V0W1wicmVtb3ZlTGlzdGVuZXJcIl0uYmluZCh0YXJnZXQsIGNhbGxiYWNrKTtcbiAgICAgIGlzRXZlbnRUYXJnZXQgPyB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIDogdGFyZ2V0W1wiYWRkTGlzdGVuZXJcIl0oY2FsbGJhY2spO1xuICAgICAgbGlzdGVuZXJzLnB1c2goW3RhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSwgY2FsbGJhY2ssIHJlbW92ZXJdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuYmluZCh0YXJnZXRzLCBldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgZm9yRWFjaEV2ZW50KHRhcmdldHMsIGV2ZW50cywgZnVuY3Rpb24gKHRhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSkge1xuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyWzBdID09PSB0YXJnZXQgJiYgbGlzdGVuZXJbMV0gPT09IGV2ZW50ICYmIGxpc3RlbmVyWzJdID09PSBuYW1lc3BhY2UgJiYgKCFjYWxsYmFjayB8fCBsaXN0ZW5lclszXSA9PT0gY2FsbGJhY2spKSB7XG4gICAgICAgICAgbGlzdGVuZXJbNF0oKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGF0Y2godGFyZ2V0LCB0eXBlLCBkZXRhaWwpIHtcbiAgICB2YXIgZTtcbiAgICB2YXIgYnViYmxlcyA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGUgPSBuZXcgQ3VzdG9tRXZlbnQodHlwZSwge1xuICAgICAgICBidWJibGVzOiBidWJibGVzLFxuICAgICAgICBkZXRhaWw6IGRldGFpbFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgYnViYmxlcywgZmFsc2UsIGRldGFpbCk7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgcmV0dXJuIGU7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBpdGVyYXRlZSkge1xuICAgIGZvckVhY2godGFyZ2V0cywgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdGFyZ2V0ICYmIGZvckVhY2goZXZlbnRzLCBmdW5jdGlvbiAoZXZlbnRzMikge1xuICAgICAgICBldmVudHMyLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5TKSB7XG4gICAgICAgICAgdmFyIGZyYWdtZW50ID0gZXZlbnROUy5zcGxpdChcIi5cIik7XG4gICAgICAgICAgaXRlcmF0ZWUodGFyZ2V0LCBmcmFnbWVudFswXSwgZnJhZ21lbnRbMV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgZGF0YVs0XSgpO1xuICAgIH0pO1xuICAgIGVtcHR5KGxpc3RlbmVycyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJpbmQ6IGJpbmQsXG4gICAgdW5iaW5kOiB1bmJpbmQsXG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcbn1cblxudmFyIEVWRU5UX01PVU5URUQgPSBcIm1vdW50ZWRcIjtcbnZhciBFVkVOVF9SRUFEWSA9IFwicmVhZHlcIjtcbnZhciBFVkVOVF9NT1ZFID0gXCJtb3ZlXCI7XG52YXIgRVZFTlRfTU9WRUQgPSBcIm1vdmVkXCI7XG52YXIgRVZFTlRfQ0xJQ0sgPSBcImNsaWNrXCI7XG52YXIgRVZFTlRfQUNUSVZFID0gXCJhY3RpdmVcIjtcbnZhciBFVkVOVF9JTkFDVElWRSA9IFwiaW5hY3RpdmVcIjtcbnZhciBFVkVOVF9WSVNJQkxFID0gXCJ2aXNpYmxlXCI7XG52YXIgRVZFTlRfSElEREVOID0gXCJoaWRkZW5cIjtcbnZhciBFVkVOVF9SRUZSRVNIID0gXCJyZWZyZXNoXCI7XG52YXIgRVZFTlRfVVBEQVRFRCA9IFwidXBkYXRlZFwiO1xudmFyIEVWRU5UX1JFU0laRSA9IFwicmVzaXplXCI7XG52YXIgRVZFTlRfUkVTSVpFRCA9IFwicmVzaXplZFwiO1xudmFyIEVWRU5UX0RSQUcgPSBcImRyYWdcIjtcbnZhciBFVkVOVF9EUkFHR0lORyA9IFwiZHJhZ2dpbmdcIjtcbnZhciBFVkVOVF9EUkFHR0VEID0gXCJkcmFnZ2VkXCI7XG52YXIgRVZFTlRfU0NST0xMID0gXCJzY3JvbGxcIjtcbnZhciBFVkVOVF9TQ1JPTExFRCA9IFwic2Nyb2xsZWRcIjtcbnZhciBFVkVOVF9PVkVSRkxPVyA9IFwib3ZlcmZsb3dcIjtcbnZhciBFVkVOVF9ERVNUUk9ZID0gXCJkZXN0cm95XCI7XG52YXIgRVZFTlRfQVJST1dTX01PVU5URUQgPSBcImFycm93czptb3VudGVkXCI7XG52YXIgRVZFTlRfQVJST1dTX1VQREFURUQgPSBcImFycm93czp1cGRhdGVkXCI7XG52YXIgRVZFTlRfUEFHSU5BVElPTl9NT1VOVEVEID0gXCJwYWdpbmF0aW9uOm1vdW50ZWRcIjtcbnZhciBFVkVOVF9QQUdJTkFUSU9OX1VQREFURUQgPSBcInBhZ2luYXRpb246dXBkYXRlZFwiO1xudmFyIEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCA9IFwibmF2aWdhdGlvbjptb3VudGVkXCI7XG52YXIgRVZFTlRfQVVUT1BMQVlfUExBWSA9IFwiYXV0b3BsYXk6cGxheVwiO1xudmFyIEVWRU5UX0FVVE9QTEFZX1BMQVlJTkcgPSBcImF1dG9wbGF5OnBsYXlpbmdcIjtcbnZhciBFVkVOVF9BVVRPUExBWV9QQVVTRSA9IFwiYXV0b3BsYXk6cGF1c2VcIjtcbnZhciBFVkVOVF9MQVpZTE9BRF9MT0FERUQgPSBcImxhenlsb2FkOmxvYWRlZFwiO1xudmFyIEVWRU5UX1NMSURFX0tFWURPV04gPSBcInNrXCI7XG52YXIgRVZFTlRfU0hJRlRFRCA9IFwic2hcIjtcbnZhciBFVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRCA9IFwiZWlcIjtcblxuZnVuY3Rpb24gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMikge1xuICB2YXIgYnVzID0gU3BsaWRlMiA/IFNwbGlkZTIuZXZlbnQuYnVzIDogZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgYmluZGVyID0gRXZlbnRCaW5kZXIoKTtcblxuICBmdW5jdGlvbiBvbihldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgYmluZGVyLmJpbmQoYnVzLCB0b0FycmF5KGV2ZW50cykuam9pbihcIiBcIiksIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjYWxsYmFjay5hcHBseShjYWxsYmFjaywgaXNBcnJheShlLmRldGFpbCkgPyBlLmRldGFpbCA6IFtdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICBiaW5kZXIuZGlzcGF0Y2goYnVzLCBldmVudCwgc2xpY2UoYXJndW1lbnRzLCAxKSk7XG4gIH1cblxuICBpZiAoU3BsaWRlMikge1xuICAgIFNwbGlkZTIuZXZlbnQub24oRVZFTlRfREVTVFJPWSwgYmluZGVyLmRlc3Ryb3kpO1xuICB9XG5cbiAgcmV0dXJuIGFzc2lnbihiaW5kZXIsIHtcbiAgICBidXM6IGJ1cyxcbiAgICBvbjogb24sXG4gICAgb2ZmOiBhcHBseShiaW5kZXIudW5iaW5kLCBidXMpLFxuICAgIGVtaXQ6IGVtaXRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIFJlcXVlc3RJbnRlcnZhbChpbnRlcnZhbCwgb25JbnRlcnZhbCwgb25VcGRhdGUsIGxpbWl0KSB7XG4gIHZhciBub3cgPSBEYXRlLm5vdztcbiAgdmFyIHN0YXJ0VGltZTtcbiAgdmFyIHJhdGUgPSAwO1xuICB2YXIgaWQ7XG4gIHZhciBwYXVzZWQgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoIXBhdXNlZCkge1xuICAgICAgcmF0ZSA9IGludGVydmFsID8gbWluKChub3coKSAtIHN0YXJ0VGltZSkgLyBpbnRlcnZhbCwgMSkgOiAxO1xuICAgICAgb25VcGRhdGUgJiYgb25VcGRhdGUocmF0ZSk7XG5cbiAgICAgIGlmIChyYXRlID49IDEpIHtcbiAgICAgICAgb25JbnRlcnZhbCgpO1xuICAgICAgICBzdGFydFRpbWUgPSBub3coKTtcblxuICAgICAgICBpZiAobGltaXQgJiYgKytjb3VudCA+PSBsaW1pdCkge1xuICAgICAgICAgIHJldHVybiBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlkID0gcmFmKHVwZGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQocmVzdW1lKSB7XG4gICAgcmVzdW1lIHx8IGNhbmNlbCgpO1xuICAgIHN0YXJ0VGltZSA9IG5vdygpIC0gKHJlc3VtZSA/IHJhdGUgKiBpbnRlcnZhbCA6IDApO1xuICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIGlkID0gcmFmKHVwZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV3aW5kKCkge1xuICAgIHN0YXJ0VGltZSA9IG5vdygpO1xuICAgIHJhdGUgPSAwO1xuXG4gICAgaWYgKG9uVXBkYXRlKSB7XG4gICAgICBvblVwZGF0ZShyYXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWQgJiYgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgIHJhdGUgPSAwO1xuICAgIGlkID0gMDtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0KHRpbWUpIHtcbiAgICBpbnRlcnZhbCA9IHRpbWU7XG4gIH1cblxuICBmdW5jdGlvbiBpc1BhdXNlZCgpIHtcbiAgICByZXR1cm4gcGF1c2VkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgcmV3aW5kOiByZXdpbmQsXG4gICAgcGF1c2U6IHBhdXNlLFxuICAgIGNhbmNlbDogY2FuY2VsLFxuICAgIHNldDogc2V0LFxuICAgIGlzUGF1c2VkOiBpc1BhdXNlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAgdmFyIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgIHN0YXRlID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBpcyhzdGF0ZXMpIHtcbiAgICByZXR1cm4gaW5jbHVkZXModG9BcnJheShzdGF0ZXMpLCBzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldDogc2V0LFxuICAgIGlzOiBpc1xuICB9O1xufVxuXG5mdW5jdGlvbiBUaHJvdHRsZShmdW5jLCBkdXJhdGlvbikge1xuICB2YXIgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwoZHVyYXRpb24gfHwgMCwgZnVuYywgbnVsbCwgMSk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaW50ZXJ2YWwuaXNQYXVzZWQoKSAmJiBpbnRlcnZhbC5zdGFydCgpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBNZWRpYShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgc3RhdGUgPSBTcGxpZGUyLnN0YXRlO1xuICB2YXIgYnJlYWtwb2ludHMgPSBvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9O1xuICB2YXIgcmVkdWNlZE1vdGlvbiA9IG9wdGlvbnMucmVkdWNlZE1vdGlvbiB8fCB7fTtcbiAgdmFyIGJpbmRlciA9IEV2ZW50QmluZGVyKCk7XG4gIHZhciBxdWVyaWVzID0gW107XG5cbiAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgdmFyIGlzTWluID0gb3B0aW9ucy5tZWRpYVF1ZXJ5ID09PSBcIm1pblwiO1xuICAgIG93bktleXMoYnJlYWtwb2ludHMpLnNvcnQoZnVuY3Rpb24gKG4sIG0pIHtcbiAgICAgIHJldHVybiBpc01pbiA/ICtuIC0gK20gOiArbSAtICtuO1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmVnaXN0ZXIoYnJlYWtwb2ludHNba2V5XSwgXCIoXCIgKyAoaXNNaW4gPyBcIm1pblwiIDogXCJtYXhcIikgKyBcIi13aWR0aDpcIiArIGtleSArIFwicHgpXCIpO1xuICAgIH0pO1xuICAgIHJlZ2lzdGVyKHJlZHVjZWRNb3Rpb24sIE1FRElBX1BSRUZFUlNfUkVEVUNFRF9NT1RJT04pO1xuICAgIHVwZGF0ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveShjb21wbGV0ZWx5KSB7XG4gICAgaWYgKGNvbXBsZXRlbHkpIHtcbiAgICAgIGJpbmRlci5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXIob3B0aW9uczIsIHF1ZXJ5KSB7XG4gICAgdmFyIHF1ZXJ5TGlzdCA9IG1hdGNoTWVkaWEocXVlcnkpO1xuICAgIGJpbmRlci5iaW5kKHF1ZXJ5TGlzdCwgXCJjaGFuZ2VcIiwgdXBkYXRlKTtcbiAgICBxdWVyaWVzLnB1c2goW29wdGlvbnMyLCBxdWVyeUxpc3RdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgZGVzdHJveWVkID0gc3RhdGUuaXMoREVTVFJPWUVEKTtcbiAgICB2YXIgZGlyZWN0aW9uID0gb3B0aW9ucy5kaXJlY3Rpb247XG4gICAgdmFyIG1lcmdlZCA9IHF1ZXJpZXMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQyLCBlbnRyeSkge1xuICAgICAgcmV0dXJuIG1lcmdlKG1lcmdlZDIsIGVudHJ5WzFdLm1hdGNoZXMgPyBlbnRyeVswXSA6IHt9KTtcbiAgICB9LCB7fSk7XG4gICAgb21pdChvcHRpb25zKTtcbiAgICBzZXQobWVyZ2VkKTtcblxuICAgIGlmIChvcHRpb25zLmRlc3Ryb3kpIHtcbiAgICAgIFNwbGlkZTIuZGVzdHJveShvcHRpb25zLmRlc3Ryb3kgPT09IFwiY29tcGxldGVseVwiKTtcbiAgICB9IGVsc2UgaWYgKGRlc3Ryb3llZCkge1xuICAgICAgZGVzdHJveSh0cnVlKTtcbiAgICAgIFNwbGlkZTIubW91bnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9uICE9PSBvcHRpb25zLmRpcmVjdGlvbiAmJiBTcGxpZGUyLnJlZnJlc2goKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWR1Y2UoZW5hYmxlKSB7XG4gICAgaWYgKG1hdGNoTWVkaWEoTUVESUFfUFJFRkVSU19SRURVQ0VEX01PVElPTikubWF0Y2hlcykge1xuICAgICAgZW5hYmxlID8gbWVyZ2Uob3B0aW9ucywgcmVkdWNlZE1vdGlvbikgOiBvbWl0KG9wdGlvbnMsIG93bktleXMocmVkdWNlZE1vdGlvbikpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChvcHRzLCBiYXNlLCBub3RpZnkpIHtcbiAgICBtZXJnZShvcHRpb25zLCBvcHRzKTtcbiAgICBiYXNlICYmIG1lcmdlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvcHRpb25zKSwgb3B0cyk7XG5cbiAgICBpZiAobm90aWZ5IHx8ICFzdGF0ZS5pcyhDUkVBVEVEKSkge1xuICAgICAgU3BsaWRlMi5lbWl0KEVWRU5UX1VQREFURUQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0dXA6IHNldHVwLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgcmVkdWNlOiByZWR1Y2UsXG4gICAgc2V0OiBzZXRcbiAgfTtcbn1cblxudmFyIEFSUk9XID0gXCJBcnJvd1wiO1xudmFyIEFSUk9XX0xFRlQgPSBBUlJPVyArIFwiTGVmdFwiO1xudmFyIEFSUk9XX1JJR0hUID0gQVJST1cgKyBcIlJpZ2h0XCI7XG52YXIgQVJST1dfVVAgPSBBUlJPVyArIFwiVXBcIjtcbnZhciBBUlJPV19ET1dOID0gQVJST1cgKyBcIkRvd25cIjtcbnZhciBMVFIgPSBcImx0clwiO1xudmFyIFJUTCA9IFwicnRsXCI7XG52YXIgVFRCID0gXCJ0dGJcIjtcbnZhciBPUklFTlRBVElPTl9NQVAgPSB7XG4gIHdpZHRoOiBbXCJoZWlnaHRcIl0sXG4gIGxlZnQ6IFtcInRvcFwiLCBcInJpZ2h0XCJdLFxuICByaWdodDogW1wiYm90dG9tXCIsIFwibGVmdFwiXSxcbiAgeDogW1wieVwiXSxcbiAgWDogW1wiWVwiXSxcbiAgWTogW1wiWFwiXSxcbiAgQXJyb3dMZWZ0OiBbQVJST1dfVVAsIEFSUk9XX1JJR0hUXSxcbiAgQXJyb3dSaWdodDogW0FSUk9XX0RPV04sIEFSUk9XX0xFRlRdXG59O1xuXG5mdW5jdGlvbiBEaXJlY3Rpb24oU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgZnVuY3Rpb24gcmVzb2x2ZShwcm9wLCBheGlzT25seSwgZGlyZWN0aW9uKSB7XG4gICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uIHx8IG9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIHZhciBpbmRleCA9IGRpcmVjdGlvbiA9PT0gUlRMICYmICFheGlzT25seSA/IDEgOiBkaXJlY3Rpb24gPT09IFRUQiA/IDAgOiAtMTtcbiAgICByZXR1cm4gT1JJRU5UQVRJT05fTUFQW3Byb3BdICYmIE9SSUVOVEFUSU9OX01BUFtwcm9wXVtpbmRleF0gfHwgcHJvcC5yZXBsYWNlKC93aWR0aHxsZWZ0fHJpZ2h0L2ksIGZ1bmN0aW9uIChtYXRjaCwgb2Zmc2V0KSB7XG4gICAgICB2YXIgcmVwbGFjZW1lbnQgPSBPUklFTlRBVElPTl9NQVBbbWF0Y2gudG9Mb3dlckNhc2UoKV1baW5kZXhdIHx8IG1hdGNoO1xuICAgICAgcmV0dXJuIG9mZnNldCA+IDAgPyByZXBsYWNlbWVudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlcGxhY2VtZW50LnNsaWNlKDEpIDogcmVwbGFjZW1lbnQ7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvcmllbnQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgKiAob3B0aW9ucy5kaXJlY3Rpb24gPT09IFJUTCA/IDEgOiAtMSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgb3JpZW50OiBvcmllbnRcbiAgfTtcbn1cblxudmFyIFJPTEUgPSBcInJvbGVcIjtcbnZhciBUQUJfSU5ERVggPSBcInRhYmluZGV4XCI7XG52YXIgRElTQUJMRUQgPSBcImRpc2FibGVkXCI7XG52YXIgQVJJQV9QUkVGSVggPSBcImFyaWEtXCI7XG52YXIgQVJJQV9DT05UUk9MUyA9IEFSSUFfUFJFRklYICsgXCJjb250cm9sc1wiO1xudmFyIEFSSUFfQ1VSUkVOVCA9IEFSSUFfUFJFRklYICsgXCJjdXJyZW50XCI7XG52YXIgQVJJQV9TRUxFQ1RFRCA9IEFSSUFfUFJFRklYICsgXCJzZWxlY3RlZFwiO1xudmFyIEFSSUFfTEFCRUwgPSBBUklBX1BSRUZJWCArIFwibGFiZWxcIjtcbnZhciBBUklBX0xBQkVMTEVEQlkgPSBBUklBX1BSRUZJWCArIFwibGFiZWxsZWRieVwiO1xudmFyIEFSSUFfSElEREVOID0gQVJJQV9QUkVGSVggKyBcImhpZGRlblwiO1xudmFyIEFSSUFfT1JJRU5UQVRJT04gPSBBUklBX1BSRUZJWCArIFwib3JpZW50YXRpb25cIjtcbnZhciBBUklBX1JPTEVERVNDUklQVElPTiA9IEFSSUFfUFJFRklYICsgXCJyb2xlZGVzY3JpcHRpb25cIjtcbnZhciBBUklBX0xJVkUgPSBBUklBX1BSRUZJWCArIFwibGl2ZVwiO1xudmFyIEFSSUFfQlVTWSA9IEFSSUFfUFJFRklYICsgXCJidXN5XCI7XG52YXIgQVJJQV9BVE9NSUMgPSBBUklBX1BSRUZJWCArIFwiYXRvbWljXCI7XG52YXIgQUxMX0FUVFJJQlVURVMgPSBbUk9MRSwgVEFCX0lOREVYLCBESVNBQkxFRCwgQVJJQV9DT05UUk9MUywgQVJJQV9DVVJSRU5ULCBBUklBX0xBQkVMLCBBUklBX0xBQkVMTEVEQlksIEFSSUFfSElEREVOLCBBUklBX09SSUVOVEFUSU9OLCBBUklBX1JPTEVERVNDUklQVElPTl07XG52YXIgQ0xBU1NfUFJFRklYID0gUFJPSkVDVF9DT0RFICsgXCJfX1wiO1xudmFyIFNUQVRVU19DTEFTU19QUkVGSVggPSBcImlzLVwiO1xudmFyIENMQVNTX1JPT1QgPSBQUk9KRUNUX0NPREU7XG52YXIgQ0xBU1NfVFJBQ0sgPSBDTEFTU19QUkVGSVggKyBcInRyYWNrXCI7XG52YXIgQ0xBU1NfTElTVCA9IENMQVNTX1BSRUZJWCArIFwibGlzdFwiO1xudmFyIENMQVNTX1NMSURFID0gQ0xBU1NfUFJFRklYICsgXCJzbGlkZVwiO1xudmFyIENMQVNTX0NMT05FID0gQ0xBU1NfU0xJREUgKyBcIi0tY2xvbmVcIjtcbnZhciBDTEFTU19DT05UQUlORVIgPSBDTEFTU19TTElERSArIFwiX19jb250YWluZXJcIjtcbnZhciBDTEFTU19BUlJPV1MgPSBDTEFTU19QUkVGSVggKyBcImFycm93c1wiO1xudmFyIENMQVNTX0FSUk9XID0gQ0xBU1NfUFJFRklYICsgXCJhcnJvd1wiO1xudmFyIENMQVNTX0FSUk9XX1BSRVYgPSBDTEFTU19BUlJPVyArIFwiLS1wcmV2XCI7XG52YXIgQ0xBU1NfQVJST1dfTkVYVCA9IENMQVNTX0FSUk9XICsgXCItLW5leHRcIjtcbnZhciBDTEFTU19QQUdJTkFUSU9OID0gQ0xBU1NfUFJFRklYICsgXCJwYWdpbmF0aW9uXCI7XG52YXIgQ0xBU1NfUEFHSU5BVElPTl9QQUdFID0gQ0xBU1NfUEFHSU5BVElPTiArIFwiX19wYWdlXCI7XG52YXIgQ0xBU1NfUFJPR1JFU1MgPSBDTEFTU19QUkVGSVggKyBcInByb2dyZXNzXCI7XG52YXIgQ0xBU1NfUFJPR1JFU1NfQkFSID0gQ0xBU1NfUFJPR1JFU1MgKyBcIl9fYmFyXCI7XG52YXIgQ0xBU1NfVE9HR0xFID0gQ0xBU1NfUFJFRklYICsgXCJ0b2dnbGVcIjtcbnZhciBDTEFTU19UT0dHTEVfUExBWSA9IENMQVNTX1RPR0dMRSArIFwiX19wbGF5XCI7XG52YXIgQ0xBU1NfVE9HR0xFX1BBVVNFID0gQ0xBU1NfVE9HR0xFICsgXCJfX3BhdXNlXCI7XG52YXIgQ0xBU1NfU1BJTk5FUiA9IENMQVNTX1BSRUZJWCArIFwic3Bpbm5lclwiO1xudmFyIENMQVNTX1NSID0gQ0xBU1NfUFJFRklYICsgXCJzclwiO1xudmFyIENMQVNTX0lOSVRJQUxJWkVEID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwiaW5pdGlhbGl6ZWRcIjtcbnZhciBDTEFTU19BQ1RJVkUgPSBTVEFUVVNfQ0xBU1NfUFJFRklYICsgXCJhY3RpdmVcIjtcbnZhciBDTEFTU19QUkVWID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwicHJldlwiO1xudmFyIENMQVNTX05FWFQgPSBTVEFUVVNfQ0xBU1NfUFJFRklYICsgXCJuZXh0XCI7XG52YXIgQ0xBU1NfVklTSUJMRSA9IFNUQVRVU19DTEFTU19QUkVGSVggKyBcInZpc2libGVcIjtcbnZhciBDTEFTU19MT0FESU5HID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwibG9hZGluZ1wiO1xudmFyIENMQVNTX0ZPQ1VTX0lOID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwiZm9jdXMtaW5cIjtcbnZhciBDTEFTU19PVkVSRkxPVyA9IFNUQVRVU19DTEFTU19QUkVGSVggKyBcIm92ZXJmbG93XCI7XG52YXIgU1RBVFVTX0NMQVNTRVMgPSBbQ0xBU1NfQUNUSVZFLCBDTEFTU19WSVNJQkxFLCBDTEFTU19QUkVWLCBDTEFTU19ORVhULCBDTEFTU19MT0FESU5HLCBDTEFTU19GT0NVU19JTiwgQ0xBU1NfT1ZFUkZMT1ddO1xudmFyIENMQVNTRVMgPSB7XG4gIHNsaWRlOiBDTEFTU19TTElERSxcbiAgY2xvbmU6IENMQVNTX0NMT05FLFxuICBhcnJvd3M6IENMQVNTX0FSUk9XUyxcbiAgYXJyb3c6IENMQVNTX0FSUk9XLFxuICBwcmV2OiBDTEFTU19BUlJPV19QUkVWLFxuICBuZXh0OiBDTEFTU19BUlJPV19ORVhULFxuICBwYWdpbmF0aW9uOiBDTEFTU19QQUdJTkFUSU9OLFxuICBwYWdlOiBDTEFTU19QQUdJTkFUSU9OX1BBR0UsXG4gIHNwaW5uZXI6IENMQVNTX1NQSU5ORVJcbn07XG5cbmZ1bmN0aW9uIGNsb3Nlc3QoZnJvbSwgc2VsZWN0b3IpIHtcbiAgaWYgKGlzRnVuY3Rpb24oZnJvbS5jbG9zZXN0KSkge1xuICAgIHJldHVybiBmcm9tLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICB9XG5cbiAgdmFyIGVsbSA9IGZyb207XG5cbiAgd2hpbGUgKGVsbSAmJiBlbG0ubm9kZVR5cGUgPT09IDEpIHtcbiAgICBpZiAobWF0Y2hlcyhlbG0sIHNlbGVjdG9yKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gZWxtO1xufVxuXG52YXIgRlJJQ1RJT04gPSA1O1xudmFyIExPR19JTlRFUlZBTCA9IDIwMDtcbnZhciBQT0lOVEVSX0RPV05fRVZFTlRTID0gXCJ0b3VjaHN0YXJ0IG1vdXNlZG93blwiO1xudmFyIFBPSU5URVJfTU9WRV9FVkVOVFMgPSBcInRvdWNobW92ZSBtb3VzZW1vdmVcIjtcbnZhciBQT0lOVEVSX1VQX0VWRU5UUyA9IFwidG91Y2hlbmQgdG91Y2hjYW5jZWwgbW91c2V1cCBjbGlja1wiO1xuXG5mdW5jdGlvbiBFbGVtZW50cyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZS5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UuYmluZDtcblxuICB2YXIgcm9vdCA9IFNwbGlkZTIucm9vdDtcbiAgdmFyIGkxOG4gPSBvcHRpb25zLmkxOG47XG4gIHZhciBlbGVtZW50cyA9IHt9O1xuICB2YXIgc2xpZGVzID0gW107XG4gIHZhciByb290Q2xhc3NlcyA9IFtdO1xuICB2YXIgdHJhY2tDbGFzc2VzID0gW107XG4gIHZhciB0cmFjaztcbiAgdmFyIGxpc3Q7XG4gIHZhciBpc1VzaW5nS2V5O1xuXG4gIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGNvbGxlY3QoKTtcbiAgICBpbml0KCk7XG4gICAgdXBkYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBkZXN0cm95KTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBzZXR1cCk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgdXBkYXRlKTtcbiAgICBiaW5kKGRvY3VtZW50LCBQT0lOVEVSX0RPV05fRVZFTlRTICsgXCIga2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaXNVc2luZ0tleSA9IGUudHlwZSA9PT0gXCJrZXlkb3duXCI7XG4gICAgfSwge1xuICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgIH0pO1xuICAgIGJpbmQocm9vdCwgXCJmb2N1c2luXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHJvb3QsIENMQVNTX0ZPQ1VTX0lOLCAhIWlzVXNpbmdLZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveShjb21wbGV0ZWx5KSB7XG4gICAgdmFyIGF0dHJzID0gQUxMX0FUVFJJQlVURVMuY29uY2F0KFwic3R5bGVcIik7XG4gICAgZW1wdHkoc2xpZGVzKTtcbiAgICByZW1vdmVDbGFzcyhyb290LCByb290Q2xhc3Nlcyk7XG4gICAgcmVtb3ZlQ2xhc3ModHJhY2ssIHRyYWNrQ2xhc3Nlcyk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKFt0cmFjaywgbGlzdF0sIGF0dHJzKTtcbiAgICByZW1vdmVBdHRyaWJ1dGUocm9vdCwgY29tcGxldGVseSA/IGF0dHJzIDogW1wic3R5bGVcIiwgQVJJQV9ST0xFREVTQ1JJUFRJT05dKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICByZW1vdmVDbGFzcyhyb290LCByb290Q2xhc3Nlcyk7XG4gICAgcmVtb3ZlQ2xhc3ModHJhY2ssIHRyYWNrQ2xhc3Nlcyk7XG4gICAgcm9vdENsYXNzZXMgPSBnZXRDbGFzc2VzKENMQVNTX1JPT1QpO1xuICAgIHRyYWNrQ2xhc3NlcyA9IGdldENsYXNzZXMoQ0xBU1NfVFJBQ0spO1xuICAgIGFkZENsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICBhZGRDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTCwgb3B0aW9ucy5sYWJlbCk7XG4gICAgc2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfTEFCRUxMRURCWSwgb3B0aW9ucy5sYWJlbGxlZGJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbGxlY3QoKSB7XG4gICAgdHJhY2sgPSBmaW5kKFwiLlwiICsgQ0xBU1NfVFJBQ0spO1xuICAgIGxpc3QgPSBjaGlsZCh0cmFjaywgXCIuXCIgKyBDTEFTU19MSVNUKTtcbiAgICBhc3NlcnQodHJhY2sgJiYgbGlzdCwgXCJBIHRyYWNrL2xpc3QgZWxlbWVudCBpcyBtaXNzaW5nLlwiKTtcbiAgICBwdXNoKHNsaWRlcywgY2hpbGRyZW4obGlzdCwgXCIuXCIgKyBDTEFTU19TTElERSArIFwiOm5vdCguXCIgKyBDTEFTU19DTE9ORSArIFwiKVwiKSk7XG4gICAgZm9yT3duKHtcbiAgICAgIGFycm93czogQ0xBU1NfQVJST1dTLFxuICAgICAgcGFnaW5hdGlvbjogQ0xBU1NfUEFHSU5BVElPTixcbiAgICAgIHByZXY6IENMQVNTX0FSUk9XX1BSRVYsXG4gICAgICBuZXh0OiBDTEFTU19BUlJPV19ORVhULFxuICAgICAgYmFyOiBDTEFTU19QUk9HUkVTU19CQVIsXG4gICAgICB0b2dnbGU6IENMQVNTX1RPR0dMRVxuICAgIH0sIGZ1bmN0aW9uIChjbGFzc05hbWUsIGtleSkge1xuICAgICAgZWxlbWVudHNba2V5XSA9IGZpbmQoXCIuXCIgKyBjbGFzc05hbWUpO1xuICAgIH0pO1xuICAgIGFzc2lnbihlbGVtZW50cywge1xuICAgICAgcm9vdDogcm9vdCxcbiAgICAgIHRyYWNrOiB0cmFjayxcbiAgICAgIGxpc3Q6IGxpc3QsXG4gICAgICBzbGlkZXM6IHNsaWRlc1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgaWQgPSByb290LmlkIHx8IHVuaXF1ZUlkKFBST0pFQ1RfQ09ERSk7XG4gICAgdmFyIHJvbGUgPSBvcHRpb25zLnJvbGU7XG4gICAgcm9vdC5pZCA9IGlkO1xuICAgIHRyYWNrLmlkID0gdHJhY2suaWQgfHwgaWQgKyBcIi10cmFja1wiO1xuICAgIGxpc3QuaWQgPSBsaXN0LmlkIHx8IGlkICsgXCItbGlzdFwiO1xuXG4gICAgaWYgKCFnZXRBdHRyaWJ1dGUocm9vdCwgUk9MRSkgJiYgcm9vdC50YWdOYW1lICE9PSBcIlNFQ1RJT05cIiAmJiByb2xlKSB7XG4gICAgICBzZXRBdHRyaWJ1dGUocm9vdCwgUk9MRSwgcm9sZSk7XG4gICAgfVxuXG4gICAgc2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfUk9MRURFU0NSSVBUSU9OLCBpMThuLmNhcm91c2VsKTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgUk9MRSwgXCJwcmVzZW50YXRpb25cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG4gICAgdmFyIGVsbSA9IHF1ZXJ5KHJvb3QsIHNlbGVjdG9yKTtcbiAgICByZXR1cm4gZWxtICYmIGNsb3Nlc3QoZWxtLCBcIi5cIiArIENMQVNTX1JPT1QpID09PSByb290ID8gZWxtIDogdm9pZCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NlcyhiYXNlKSB7XG4gICAgcmV0dXJuIFtiYXNlICsgXCItLVwiICsgb3B0aW9ucy50eXBlLCBiYXNlICsgXCItLVwiICsgb3B0aW9ucy5kaXJlY3Rpb24sIG9wdGlvbnMuZHJhZyAmJiBiYXNlICsgXCItLWRyYWdnYWJsZVwiLCBvcHRpb25zLmlzTmF2aWdhdGlvbiAmJiBiYXNlICsgXCItLW5hdlwiLCBiYXNlID09PSBDTEFTU19ST09UICYmIENMQVNTX0FDVElWRV07XG4gIH1cblxuICByZXR1cm4gYXNzaWduKGVsZW1lbnRzLCB7XG4gICAgc2V0dXA6IHNldHVwLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH0pO1xufVxuXG52YXIgU0xJREUgPSBcInNsaWRlXCI7XG52YXIgTE9PUCA9IFwibG9vcFwiO1xudmFyIEZBREUgPSBcImZhZGVcIjtcblxuZnVuY3Rpb24gU2xpZGUkMShTcGxpZGUyLCBpbmRleCwgc2xpZGVJbmRleCwgc2xpZGUpIHtcbiAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gIHZhciBvbiA9IGV2ZW50Lm9uLFxuICAgICAgZW1pdCA9IGV2ZW50LmVtaXQsXG4gICAgICBiaW5kID0gZXZlbnQuYmluZDtcbiAgdmFyIENvbXBvbmVudHMgPSBTcGxpZGUyLkNvbXBvbmVudHMsXG4gICAgICByb290ID0gU3BsaWRlMi5yb290LFxuICAgICAgb3B0aW9ucyA9IFNwbGlkZTIub3B0aW9ucztcbiAgdmFyIGlzTmF2aWdhdGlvbiA9IG9wdGlvbnMuaXNOYXZpZ2F0aW9uLFxuICAgICAgdXBkYXRlT25Nb3ZlID0gb3B0aW9ucy51cGRhdGVPbk1vdmUsXG4gICAgICBpMThuID0gb3B0aW9ucy5pMThuLFxuICAgICAgcGFnaW5hdGlvbiA9IG9wdGlvbnMucGFnaW5hdGlvbixcbiAgICAgIHNsaWRlRm9jdXMgPSBvcHRpb25zLnNsaWRlRm9jdXM7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIHN0eWxlcyA9IGdldEF0dHJpYnV0ZShzbGlkZSwgXCJzdHlsZVwiKTtcbiAgdmFyIGxhYmVsID0gZ2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMKTtcbiAgdmFyIGlzQ2xvbmUgPSBzbGlkZUluZGV4ID4gLTE7XG4gIHZhciBjb250YWluZXIgPSBjaGlsZChzbGlkZSwgXCIuXCIgKyBDTEFTU19DT05UQUlORVIpO1xuICB2YXIgZGVzdHJveWVkO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmICghaXNDbG9uZSkge1xuICAgICAgc2xpZGUuaWQgPSByb290LmlkICsgXCItc2xpZGVcIiArIHBhZChpbmRleCArIDEpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBST0xFLCBwYWdpbmF0aW9uID8gXCJ0YWJwYW5lbFwiIDogXCJncm91cFwiKTtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9ST0xFREVTQ1JJUFRJT04sIGkxOG4uc2xpZGUpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBsYWJlbCB8fCBmb3JtYXQoaTE4bi5zbGlkZUxhYmVsLCBbaW5kZXggKyAxLCBTcGxpZGUyLmxlbmd0aF0pKTtcbiAgICB9XG5cbiAgICBsaXN0ZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBiaW5kKHNsaWRlLCBcImNsaWNrXCIsIGFwcGx5KGVtaXQsIEVWRU5UX0NMSUNLLCBzZWxmKSk7XG4gICAgYmluZChzbGlkZSwgXCJrZXlkb3duXCIsIGFwcGx5KGVtaXQsIEVWRU5UX1NMSURFX0tFWURPV04sIHNlbGYpKTtcbiAgICBvbihbRVZFTlRfTU9WRUQsIEVWRU5UX1NISUZURUQsIEVWRU5UX1NDUk9MTEVEXSwgdXBkYXRlKTtcbiAgICBvbihFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQsIGluaXROYXZpZ2F0aW9uKTtcblxuICAgIGlmICh1cGRhdGVPbk1vdmUpIHtcbiAgICAgIG9uKEVWRU5UX01PVkUsIG9uTW92ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBkZXN0cm95ZWQgPSB0cnVlO1xuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICByZW1vdmVDbGFzcyhzbGlkZSwgU1RBVFVTX0NMQVNTRVMpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShzbGlkZSwgQUxMX0FUVFJJQlVURVMpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgXCJzdHlsZVwiLCBzdHlsZXMpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9MQUJFTCwgbGFiZWwgfHwgXCJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0TmF2aWdhdGlvbigpIHtcbiAgICB2YXIgY29udHJvbHMgPSBTcGxpZGUyLnNwbGlkZXMubWFwKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHZhciBTbGlkZTIgPSB0YXJnZXQuc3BsaWRlLkNvbXBvbmVudHMuU2xpZGVzLmdldEF0KGluZGV4KTtcbiAgICAgIHJldHVybiBTbGlkZTIgPyBTbGlkZTIuc2xpZGUuaWQgOiBcIlwiO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9MQUJFTCwgZm9ybWF0KGkxOG4uc2xpZGVYLCAoaXNDbG9uZSA/IHNsaWRlSW5kZXggOiBpbmRleCkgKyAxKSk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0NPTlRST0xTLCBjb250cm9scyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBST0xFLCBzbGlkZUZvY3VzID8gXCJidXR0b25cIiA6IFwiXCIpO1xuICAgIHNsaWRlRm9jdXMgJiYgcmVtb3ZlQXR0cmlidXRlKHNsaWRlLCBBUklBX1JPTEVERVNDUklQVElPTik7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoKSB7XG4gICAgaWYgKCFkZXN0cm95ZWQpIHtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoIWRlc3Ryb3llZCkge1xuICAgICAgdmFyIGN1cnIgPSBTcGxpZGUyLmluZGV4O1xuICAgICAgdXBkYXRlQWN0aXZpdHkoKTtcbiAgICAgIHVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICAgIHRvZ2dsZUNsYXNzKHNsaWRlLCBDTEFTU19QUkVWLCBpbmRleCA9PT0gY3VyciAtIDEpO1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX05FWFQsIGluZGV4ID09PSBjdXJyICsgMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQWN0aXZpdHkoKSB7XG4gICAgdmFyIGFjdGl2ZSA9IGlzQWN0aXZlKCk7XG5cbiAgICBpZiAoYWN0aXZlICE9PSBoYXNDbGFzcyhzbGlkZSwgQ0xBU1NfQUNUSVZFKSkge1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX0FDVElWRSwgYWN0aXZlKTtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9DVVJSRU5ULCBpc05hdmlnYXRpb24gJiYgYWN0aXZlIHx8IFwiXCIpO1xuICAgICAgZW1pdChhY3RpdmUgPyBFVkVOVF9BQ1RJVkUgOiBFVkVOVF9JTkFDVElWRSwgc2VsZik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVmlzaWJpbGl0eSgpIHtcbiAgICB2YXIgdmlzaWJsZSA9IGlzVmlzaWJsZSgpO1xuICAgIHZhciBoaWRkZW4gPSAhdmlzaWJsZSAmJiAoIWlzQWN0aXZlKCkgfHwgaXNDbG9uZSk7XG5cbiAgICBpZiAoIVNwbGlkZTIuc3RhdGUuaXMoW01PVklORywgU0NST0xMSU5HXSkpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9ISURERU4sIGhpZGRlbiB8fCBcIlwiKTtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUocXVlcnlBbGwoc2xpZGUsIG9wdGlvbnMuZm9jdXNhYmxlTm9kZXMgfHwgXCJcIiksIFRBQl9JTkRFWCwgaGlkZGVuID8gLTEgOiBcIlwiKTtcblxuICAgIGlmIChzbGlkZUZvY3VzKSB7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFRBQl9JTkRFWCwgaGlkZGVuID8gLTEgOiAwKTtcbiAgICB9XG5cbiAgICBpZiAodmlzaWJsZSAhPT0gaGFzQ2xhc3Moc2xpZGUsIENMQVNTX1ZJU0lCTEUpKSB7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfVklTSUJMRSwgdmlzaWJsZSk7XG4gICAgICBlbWl0KHZpc2libGUgPyBFVkVOVF9WSVNJQkxFIDogRVZFTlRfSElEREVOLCBzZWxmKTtcbiAgICB9XG5cbiAgICBpZiAoIXZpc2libGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gc2xpZGUpIHtcbiAgICAgIHZhciBTbGlkZTIgPSBDb21wb25lbnRzLlNsaWRlcy5nZXRBdChTcGxpZGUyLmluZGV4KTtcbiAgICAgIFNsaWRlMiAmJiBmb2N1cyhTbGlkZTIuc2xpZGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0eWxlJDEocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcikge1xuICAgIHN0eWxlKHVzZUNvbnRhaW5lciAmJiBjb250YWluZXIgfHwgc2xpZGUsIHByb3AsIHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHZhciBjdXJyID0gU3BsaWRlMi5pbmRleDtcbiAgICByZXR1cm4gY3VyciA9PT0gaW5kZXggfHwgb3B0aW9ucy5jbG9uZVN0YXR1cyAmJiBjdXJyID09PSBzbGlkZUluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNWaXNpYmxlKCkge1xuICAgIGlmIChTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICByZXR1cm4gaXNBY3RpdmUoKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhY2tSZWN0ID0gcmVjdChDb21wb25lbnRzLkVsZW1lbnRzLnRyYWNrKTtcbiAgICB2YXIgc2xpZGVSZWN0ID0gcmVjdChzbGlkZSk7XG4gICAgdmFyIGxlZnQgPSByZXNvbHZlKFwibGVmdFwiLCB0cnVlKTtcbiAgICB2YXIgcmlnaHQgPSByZXNvbHZlKFwicmlnaHRcIiwgdHJ1ZSk7XG4gICAgcmV0dXJuIGZsb29yKHRyYWNrUmVjdFtsZWZ0XSkgPD0gY2VpbChzbGlkZVJlY3RbbGVmdF0pICYmIGZsb29yKHNsaWRlUmVjdFtyaWdodF0pIDw9IGNlaWwodHJhY2tSZWN0W3JpZ2h0XSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1dpdGhpbihmcm9tLCBkaXN0YW5jZSkge1xuICAgIHZhciBkaWZmID0gYWJzKGZyb20gLSBpbmRleCk7XG5cbiAgICBpZiAoIWlzQ2xvbmUgJiYgKG9wdGlvbnMucmV3aW5kIHx8IFNwbGlkZTIuaXMoTE9PUCkpKSB7XG4gICAgICBkaWZmID0gbWluKGRpZmYsIFNwbGlkZTIubGVuZ3RoIC0gZGlmZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZmYgPD0gZGlzdGFuY2U7XG4gIH1cblxuICB2YXIgc2VsZiA9IHtcbiAgICBpbmRleDogaW5kZXgsXG4gICAgc2xpZGVJbmRleDogc2xpZGVJbmRleCxcbiAgICBzbGlkZTogc2xpZGUsXG4gICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgaXNDbG9uZTogaXNDbG9uZSxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICBzdHlsZTogc3R5bGUkMSxcbiAgICBpc1dpdGhpbjogaXNXaXRoaW5cbiAgfTtcbiAgcmV0dXJuIHNlbGY7XG59XG5cbmZ1bmN0aW9uIFNsaWRlcyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMiA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UyLm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTIuZW1pdCxcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UyLmJpbmQ7XG5cbiAgdmFyIF9Db21wb25lbnRzMiRFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgc2xpZGVzID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzLnNsaWRlcyxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMubGlzdDtcbiAgdmFyIFNsaWRlczIgPSBbXTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgaW5pdCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSwgaW5kZXgpIHtcbiAgICAgIHJlZ2lzdGVyKHNsaWRlLCBpbmRleCwgLTEpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBmb3JFYWNoJDEoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgU2xpZGUyLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICBlbXB0eShTbGlkZXMyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBmb3JFYWNoJDEoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgU2xpZGUyLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXIoc2xpZGUsIGluZGV4LCBzbGlkZUluZGV4KSB7XG4gICAgdmFyIG9iamVjdCA9IFNsaWRlJDEoU3BsaWRlMiwgaW5kZXgsIHNsaWRlSW5kZXgsIHNsaWRlKTtcbiAgICBvYmplY3QubW91bnQoKTtcbiAgICBTbGlkZXMyLnB1c2gob2JqZWN0KTtcbiAgICBTbGlkZXMyLnNvcnQoZnVuY3Rpb24gKFNsaWRlMSwgU2xpZGUyKSB7XG4gICAgICByZXR1cm4gU2xpZGUxLmluZGV4IC0gU2xpZGUyLmluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICByZXR1cm4gZXhjbHVkZUNsb25lcyA/IGZpbHRlcihmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gIVNsaWRlMi5pc0Nsb25lO1xuICAgIH0pIDogU2xpZGVzMjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEluKHBhZ2UpIHtcbiAgICB2YXIgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXI7XG4gICAgdmFyIGluZGV4ID0gQ29udHJvbGxlci50b0luZGV4KHBhZ2UpO1xuICAgIHZhciBtYXggPSBDb250cm9sbGVyLmhhc0ZvY3VzKCkgPyAxIDogb3B0aW9ucy5wZXJQYWdlO1xuICAgIHJldHVybiBmaWx0ZXIoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgcmV0dXJuIGJldHdlZW4oU2xpZGUyLmluZGV4LCBpbmRleCwgaW5kZXggKyBtYXggLSAxKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEF0KGluZGV4KSB7XG4gICAgcmV0dXJuIGZpbHRlcihpbmRleClbMF07XG4gIH1cblxuICBmdW5jdGlvbiBhZGQoaXRlbXMsIGluZGV4KSB7XG4gICAgZm9yRWFjaChpdGVtcywgZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcoc2xpZGUpKSB7XG4gICAgICAgIHNsaWRlID0gcGFyc2VIdG1sKHNsaWRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzSFRNTEVsZW1lbnQoc2xpZGUpKSB7XG4gICAgICAgIHZhciByZWYgPSBzbGlkZXNbaW5kZXhdO1xuICAgICAgICByZWYgPyBiZWZvcmUoc2xpZGUsIHJlZikgOiBhcHBlbmQobGlzdCwgc2xpZGUpO1xuICAgICAgICBhZGRDbGFzcyhzbGlkZSwgb3B0aW9ucy5jbGFzc2VzLnNsaWRlKTtcbiAgICAgICAgb2JzZXJ2ZUltYWdlcyhzbGlkZSwgYXBwbHkoZW1pdCwgRVZFTlRfUkVTSVpFKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZW1pdChFVkVOVF9SRUZSRVNIKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZSQxKG1hdGNoZXIpIHtcbiAgICByZW1vdmUoZmlsdGVyKG1hdGNoZXIpLm1hcChmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gU2xpZGUyLnNsaWRlO1xuICAgIH0pKTtcbiAgICBlbWl0KEVWRU5UX1JFRlJFU0gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yRWFjaCQxKGl0ZXJhdGVlLCBleGNsdWRlQ2xvbmVzKSB7XG4gICAgZ2V0KGV4Y2x1ZGVDbG9uZXMpLmZvckVhY2goaXRlcmF0ZWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyKG1hdGNoZXIpIHtcbiAgICByZXR1cm4gU2xpZGVzMi5maWx0ZXIoaXNGdW5jdGlvbihtYXRjaGVyKSA/IG1hdGNoZXIgOiBmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gaXNTdHJpbmcobWF0Y2hlcikgPyBtYXRjaGVzKFNsaWRlMi5zbGlkZSwgbWF0Y2hlcikgOiBpbmNsdWRlcyh0b0FycmF5KG1hdGNoZXIpLCBTbGlkZTIuaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3R5bGUocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcikge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIuc3R5bGUocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvYnNlcnZlSW1hZ2VzKGVsbSwgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2VzID0gcXVlcnlBbGwoZWxtLCBcImltZ1wiKTtcbiAgICB2YXIgbGVuZ3RoID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgYmluZChpbWcsIFwibG9hZCBlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCEgLS1sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExlbmd0aChleGNsdWRlQ2xvbmVzKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVDbG9uZXMgPyBzbGlkZXMubGVuZ3RoIDogU2xpZGVzMi5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBpc0Vub3VnaCgpIHtcbiAgICByZXR1cm4gU2xpZGVzMi5sZW5ndGggPiBvcHRpb25zLnBlclBhZ2U7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICBnZXQ6IGdldCxcbiAgICBnZXRJbjogZ2V0SW4sXG4gICAgZ2V0QXQ6IGdldEF0LFxuICAgIGFkZDogYWRkLFxuICAgIHJlbW92ZTogcmVtb3ZlJDEsXG4gICAgZm9yRWFjaDogZm9yRWFjaCQxLFxuICAgIGZpbHRlcjogZmlsdGVyLFxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBnZXRMZW5ndGg6IGdldExlbmd0aCxcbiAgICBpc0Vub3VnaDogaXNFbm91Z2hcbiAgfTtcbn1cblxuZnVuY3Rpb24gTGF5b3V0KFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UzID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTMub24sXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMy5iaW5kLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTMuZW1pdDtcblxuICB2YXIgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzO1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzMiA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgcm9vdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czIucm9vdCxcbiAgICAgIHRyYWNrID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMi50cmFjayxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMyLmxpc3Q7XG4gIHZhciBnZXRBdCA9IFNsaWRlcy5nZXRBdCxcbiAgICAgIHN0eWxlU2xpZGVzID0gU2xpZGVzLnN0eWxlO1xuICB2YXIgdmVydGljYWw7XG4gIHZhciByb290UmVjdDtcbiAgdmFyIG92ZXJmbG93O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBiaW5kKHdpbmRvdywgXCJyZXNpemUgbG9hZFwiLCBUaHJvdHRsZShhcHBseShlbWl0LCBFVkVOVF9SRVNJWkUpKSk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBpbml0KTtcbiAgICBvbihFVkVOVF9SRVNJWkUsIHJlc2l6ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZlcnRpY2FsID0gb3B0aW9ucy5kaXJlY3Rpb24gPT09IFRUQjtcbiAgICBzdHlsZShyb290LCBcIm1heFdpZHRoXCIsIHVuaXQob3B0aW9ucy53aWR0aCkpO1xuICAgIHN0eWxlKHRyYWNrLCByZXNvbHZlKFwicGFkZGluZ0xlZnRcIiksIGNzc1BhZGRpbmcoZmFsc2UpKTtcbiAgICBzdHlsZSh0cmFjaywgcmVzb2x2ZShcInBhZGRpbmdSaWdodFwiKSwgY3NzUGFkZGluZyh0cnVlKSk7XG4gICAgcmVzaXplKHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzaXplKGZvcmNlKSB7XG4gICAgdmFyIG5ld1JlY3QgPSByZWN0KHJvb3QpO1xuXG4gICAgaWYgKGZvcmNlIHx8IHJvb3RSZWN0LndpZHRoICE9PSBuZXdSZWN0LndpZHRoIHx8IHJvb3RSZWN0LmhlaWdodCAhPT0gbmV3UmVjdC5oZWlnaHQpIHtcbiAgICAgIHN0eWxlKHRyYWNrLCBcImhlaWdodFwiLCBjc3NUcmFja0hlaWdodCgpKTtcbiAgICAgIHN0eWxlU2xpZGVzKHJlc29sdmUoXCJtYXJnaW5SaWdodFwiKSwgdW5pdChvcHRpb25zLmdhcCkpO1xuICAgICAgc3R5bGVTbGlkZXMoXCJ3aWR0aFwiLCBjc3NTbGlkZVdpZHRoKCkpO1xuICAgICAgc3R5bGVTbGlkZXMoXCJoZWlnaHRcIiwgY3NzU2xpZGVIZWlnaHQoKSwgdHJ1ZSk7XG4gICAgICByb290UmVjdCA9IG5ld1JlY3Q7XG4gICAgICBlbWl0KEVWRU5UX1JFU0laRUQpO1xuXG4gICAgICBpZiAob3ZlcmZsb3cgIT09IChvdmVyZmxvdyA9IGlzT3ZlcmZsb3coKSkpIHtcbiAgICAgICAgdG9nZ2xlQ2xhc3Mocm9vdCwgQ0xBU1NfT1ZFUkZMT1csIG92ZXJmbG93KTtcbiAgICAgICAgZW1pdChFVkVOVF9PVkVSRkxPVywgb3ZlcmZsb3cpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1BhZGRpbmcocmlnaHQpIHtcbiAgICB2YXIgcGFkZGluZyA9IG9wdGlvbnMucGFkZGluZztcbiAgICB2YXIgcHJvcCA9IHJlc29sdmUocmlnaHQgPyBcInJpZ2h0XCIgOiBcImxlZnRcIik7XG4gICAgcmV0dXJuIHBhZGRpbmcgJiYgdW5pdChwYWRkaW5nW3Byb3BdIHx8IChpc09iamVjdChwYWRkaW5nKSA/IDAgOiBwYWRkaW5nKSkgfHwgXCIwcHhcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1RyYWNrSGVpZ2h0KCkge1xuICAgIHZhciBoZWlnaHQgPSBcIlwiO1xuXG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBoZWlnaHQgPSBjc3NIZWlnaHQoKTtcbiAgICAgIGFzc2VydChoZWlnaHQsIFwiaGVpZ2h0IG9yIGhlaWdodFJhdGlvIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgaGVpZ2h0ID0gXCJjYWxjKFwiICsgaGVpZ2h0ICsgXCIgLSBcIiArIGNzc1BhZGRpbmcoZmFsc2UpICsgXCIgLSBcIiArIGNzc1BhZGRpbmcodHJ1ZSkgKyBcIilcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzSGVpZ2h0KCkge1xuICAgIHJldHVybiB1bml0KG9wdGlvbnMuaGVpZ2h0IHx8IHJlY3QobGlzdCkud2lkdGggKiBvcHRpb25zLmhlaWdodFJhdGlvKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1NsaWRlV2lkdGgoKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuYXV0b1dpZHRoID8gbnVsbCA6IHVuaXQob3B0aW9ucy5maXhlZFdpZHRoKSB8fCAodmVydGljYWwgPyBcIlwiIDogY3NzU2xpZGVTaXplKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5maXhlZEhlaWdodCkgfHwgKHZlcnRpY2FsID8gb3B0aW9ucy5hdXRvSGVpZ2h0ID8gbnVsbCA6IGNzc1NsaWRlU2l6ZSgpIDogY3NzSGVpZ2h0KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVTaXplKCkge1xuICAgIHZhciBnYXAgPSB1bml0KG9wdGlvbnMuZ2FwKTtcbiAgICByZXR1cm4gXCJjYWxjKCgxMDAlXCIgKyAoZ2FwICYmIFwiICsgXCIgKyBnYXApICsgXCIpL1wiICsgKG9wdGlvbnMucGVyUGFnZSB8fCAxKSArIChnYXAgJiYgXCIgLSBcIiArIGdhcCkgKyBcIilcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RTaXplKCkge1xuICAgIHJldHVybiByZWN0KGxpc3QpW3Jlc29sdmUoXCJ3aWR0aFwiKV07XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZVNpemUoaW5kZXgsIHdpdGhvdXRHYXApIHtcbiAgICB2YXIgU2xpZGUgPSBnZXRBdChpbmRleCB8fCAwKTtcbiAgICByZXR1cm4gU2xpZGUgPyByZWN0KFNsaWRlLnNsaWRlKVtyZXNvbHZlKFwid2lkdGhcIildICsgKHdpdGhvdXRHYXAgPyAwIDogZ2V0R2FwKCkpIDogMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvdGFsU2l6ZShpbmRleCwgd2l0aG91dEdhcCkge1xuICAgIHZhciBTbGlkZSA9IGdldEF0KGluZGV4KTtcblxuICAgIGlmIChTbGlkZSkge1xuICAgICAgdmFyIHJpZ2h0ID0gcmVjdChTbGlkZS5zbGlkZSlbcmVzb2x2ZShcInJpZ2h0XCIpXTtcbiAgICAgIHZhciBsZWZ0ID0gcmVjdChsaXN0KVtyZXNvbHZlKFwibGVmdFwiKV07XG4gICAgICByZXR1cm4gYWJzKHJpZ2h0IC0gbGVmdCkgKyAod2l0aG91dEdhcCA/IDAgOiBnZXRHYXAoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXJTaXplKHdpdGhvdXRHYXApIHtcbiAgICByZXR1cm4gdG90YWxTaXplKFNwbGlkZTIubGVuZ3RoIC0gMSkgLSB0b3RhbFNpemUoMCkgKyBzbGlkZVNpemUoMCwgd2l0aG91dEdhcCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRHYXAoKSB7XG4gICAgdmFyIFNsaWRlID0gZ2V0QXQoMCk7XG4gICAgcmV0dXJuIFNsaWRlICYmIHBhcnNlRmxvYXQoc3R5bGUoU2xpZGUuc2xpZGUsIHJlc29sdmUoXCJtYXJnaW5SaWdodFwiKSkpIHx8IDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYWRkaW5nKHJpZ2h0KSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGUodHJhY2ssIHJlc29sdmUoXCJwYWRkaW5nXCIgKyAocmlnaHQgPyBcIlJpZ2h0XCIgOiBcIkxlZnRcIikpKSkgfHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIFNwbGlkZTIuaXMoRkFERSkgfHwgc2xpZGVyU2l6ZSh0cnVlKSA+IGxpc3RTaXplKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICByZXNpemU6IHJlc2l6ZSxcbiAgICBsaXN0U2l6ZTogbGlzdFNpemUsXG4gICAgc2xpZGVTaXplOiBzbGlkZVNpemUsXG4gICAgc2xpZGVyU2l6ZTogc2xpZGVyU2l6ZSxcbiAgICB0b3RhbFNpemU6IHRvdGFsU2l6ZSxcbiAgICBnZXRQYWRkaW5nOiBnZXRQYWRkaW5nLFxuICAgIGlzT3ZlcmZsb3c6IGlzT3ZlcmZsb3dcbiAgfTtcbn1cblxudmFyIE1VTFRJUExJRVIgPSAyO1xuXG5mdW5jdGlvbiBDbG9uZXMoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gIHZhciBvbiA9IGV2ZW50Lm9uO1xuICB2YXIgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcztcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzMi5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIGNsb25lcyA9IFtdO1xuICB2YXIgY2xvbmVDb3VudDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBvbihFVkVOVF9SRUZSRVNILCByZW1vdW50KTtcbiAgICBvbihbRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVTSVpFXSwgb2JzZXJ2ZSk7XG5cbiAgICBpZiAoY2xvbmVDb3VudCA9IGNvbXB1dGVDbG9uZUNvdW50KCkpIHtcbiAgICAgIGdlbmVyYXRlKGNsb25lQ291bnQpO1xuICAgICAgQ29tcG9uZW50czIuTGF5b3V0LnJlc2l6ZSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdW50KCkge1xuICAgIGRlc3Ryb3koKTtcbiAgICBtb3VudCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICByZW1vdmUoY2xvbmVzKTtcbiAgICBlbXB0eShjbG9uZXMpO1xuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9ic2VydmUoKSB7XG4gICAgdmFyIGNvdW50ID0gY29tcHV0ZUNsb25lQ291bnQoKTtcblxuICAgIGlmIChjbG9uZUNvdW50ICE9PSBjb3VudCkge1xuICAgICAgaWYgKGNsb25lQ291bnQgPCBjb3VudCB8fCAhY291bnQpIHtcbiAgICAgICAgZXZlbnQuZW1pdChFVkVOVF9SRUZSRVNIKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZShjb3VudCkge1xuICAgIHZhciBzbGlkZXMgPSBTbGlkZXMuZ2V0KCkuc2xpY2UoKTtcbiAgICB2YXIgbGVuZ3RoID0gc2xpZGVzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgIHdoaWxlIChzbGlkZXMubGVuZ3RoIDwgY291bnQpIHtcbiAgICAgICAgcHVzaChzbGlkZXMsIHNsaWRlcyk7XG4gICAgICB9XG5cbiAgICAgIHB1c2goc2xpZGVzLnNsaWNlKC1jb3VudCksIHNsaWRlcy5zbGljZSgwLCBjb3VudCkpLmZvckVhY2goZnVuY3Rpb24gKFNsaWRlLCBpbmRleCkge1xuICAgICAgICB2YXIgaXNIZWFkID0gaW5kZXggPCBjb3VudDtcbiAgICAgICAgdmFyIGNsb25lID0gY2xvbmVEZWVwKFNsaWRlLnNsaWRlLCBpbmRleCk7XG4gICAgICAgIGlzSGVhZCA/IGJlZm9yZShjbG9uZSwgc2xpZGVzWzBdLnNsaWRlKSA6IGFwcGVuZChFbGVtZW50cy5saXN0LCBjbG9uZSk7XG4gICAgICAgIHB1c2goY2xvbmVzLCBjbG9uZSk7XG4gICAgICAgIFNsaWRlcy5yZWdpc3RlcihjbG9uZSwgaW5kZXggLSBjb3VudCArIChpc0hlYWQgPyAwIDogbGVuZ3RoKSwgU2xpZGUuaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmVEZWVwKGVsbSwgaW5kZXgpIHtcbiAgICB2YXIgY2xvbmUgPSBlbG0uY2xvbmVOb2RlKHRydWUpO1xuICAgIGFkZENsYXNzKGNsb25lLCBvcHRpb25zLmNsYXNzZXMuY2xvbmUpO1xuICAgIGNsb25lLmlkID0gU3BsaWRlMi5yb290LmlkICsgXCItY2xvbmVcIiArIHBhZChpbmRleCArIDEpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVDbG9uZUNvdW50KCkge1xuICAgIHZhciBjbG9uZXMyID0gb3B0aW9ucy5jbG9uZXM7XG5cbiAgICBpZiAoIVNwbGlkZTIuaXMoTE9PUCkpIHtcbiAgICAgIGNsb25lczIgPSAwO1xuICAgIH0gZWxzZSBpZiAoaXNVbmRlZmluZWQoY2xvbmVzMikpIHtcbiAgICAgIHZhciBmaXhlZFNpemUgPSBvcHRpb25zW3Jlc29sdmUoXCJmaXhlZFdpZHRoXCIpXSAmJiBDb21wb25lbnRzMi5MYXlvdXQuc2xpZGVTaXplKDApO1xuICAgICAgdmFyIGZpeGVkQ291bnQgPSBmaXhlZFNpemUgJiYgY2VpbChyZWN0KEVsZW1lbnRzLnRyYWNrKVtyZXNvbHZlKFwid2lkdGhcIildIC8gZml4ZWRTaXplKTtcbiAgICAgIGNsb25lczIgPSBmaXhlZENvdW50IHx8IG9wdGlvbnNbcmVzb2x2ZShcImF1dG9XaWR0aFwiKV0gJiYgU3BsaWRlMi5sZW5ndGggfHwgb3B0aW9ucy5wZXJQYWdlICogTVVMVElQTElFUjtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmVzMjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcbn1cblxuZnVuY3Rpb24gTW92ZShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U0Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTQuZW1pdDtcblxuICB2YXIgc2V0ID0gU3BsaWRlMi5zdGF0ZS5zZXQ7XG4gIHZhciBfQ29tcG9uZW50czIkTGF5b3V0ID0gQ29tcG9uZW50czIuTGF5b3V0LFxuICAgICAgc2xpZGVTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5zbGlkZVNpemUsXG4gICAgICBnZXRQYWRkaW5nID0gX0NvbXBvbmVudHMyJExheW91dC5nZXRQYWRkaW5nLFxuICAgICAgdG90YWxTaXplID0gX0NvbXBvbmVudHMyJExheW91dC50b3RhbFNpemUsXG4gICAgICBsaXN0U2l6ZSA9IF9Db21wb25lbnRzMiRMYXlvdXQubGlzdFNpemUsXG4gICAgICBzbGlkZXJTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5zbGlkZXJTaXplO1xuICB2YXIgX0NvbXBvbmVudHMyJERpcmVjdGlvID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLFxuICAgICAgcmVzb2x2ZSA9IF9Db21wb25lbnRzMiREaXJlY3Rpby5yZXNvbHZlLFxuICAgICAgb3JpZW50ID0gX0NvbXBvbmVudHMyJERpcmVjdGlvLm9yaWVudDtcbiAgdmFyIF9Db21wb25lbnRzMiRFbGVtZW50czMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMzLmxpc3QsXG4gICAgICB0cmFjayA9IF9Db21wb25lbnRzMiRFbGVtZW50czMudHJhY2s7XG4gIHZhciBUcmFuc2l0aW9uO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIFRyYW5zaXRpb24gPSBDb21wb25lbnRzMi5UcmFuc2l0aW9uO1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9SRVNJWkVELCBFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgcmVwb3NpdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiByZXBvc2l0aW9uKCkge1xuICAgIGlmICghQ29tcG9uZW50czIuQ29udHJvbGxlci5pc0J1c3koKSkge1xuICAgICAgQ29tcG9uZW50czIuU2Nyb2xsLmNhbmNlbCgpO1xuICAgICAganVtcChTcGxpZGUyLmluZGV4KTtcbiAgICAgIENvbXBvbmVudHMyLlNsaWRlcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGRlc3QsIGluZGV4LCBwcmV2LCBjYWxsYmFjaykge1xuICAgIGlmIChkZXN0ICE9PSBpbmRleCAmJiBjYW5TaGlmdChkZXN0ID4gcHJldikpIHtcbiAgICAgIGNhbmNlbCgpO1xuICAgICAgdHJhbnNsYXRlKHNoaWZ0KGdldFBvc2l0aW9uKCksIGRlc3QgPiBwcmV2KSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2V0KE1PVklORyk7XG4gICAgZW1pdChFVkVOVF9NT1ZFLCBpbmRleCwgcHJldiwgZGVzdCk7XG4gICAgVHJhbnNpdGlvbi5zdGFydChpbmRleCwgZnVuY3Rpb24gKCkge1xuICAgICAgc2V0KElETEUpO1xuICAgICAgZW1pdChFVkVOVF9NT1ZFRCwgaW5kZXgsIHByZXYsIGRlc3QpO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGp1bXAoaW5kZXgpIHtcbiAgICB0cmFuc2xhdGUodG9Qb3NpdGlvbihpbmRleCwgdHJ1ZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHBvc2l0aW9uLCBwcmV2ZW50TG9vcCkge1xuICAgIGlmICghU3BsaWRlMi5pcyhGQURFKSkge1xuICAgICAgdmFyIGRlc3RpbmF0aW9uID0gcHJldmVudExvb3AgPyBwb3NpdGlvbiA6IGxvb3AocG9zaXRpb24pO1xuICAgICAgc3R5bGUobGlzdCwgXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVcIiArIHJlc29sdmUoXCJYXCIpICsgXCIoXCIgKyBkZXN0aW5hdGlvbiArIFwicHgpXCIpO1xuICAgICAgcG9zaXRpb24gIT09IGRlc3RpbmF0aW9uICYmIGVtaXQoRVZFTlRfU0hJRlRFRCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9vcChwb3NpdGlvbikge1xuICAgIGlmIChTcGxpZGUyLmlzKExPT1ApKSB7XG4gICAgICB2YXIgaW5kZXggPSB0b0luZGV4KHBvc2l0aW9uKTtcbiAgICAgIHZhciBleGNlZWRlZE1heCA9IGluZGV4ID4gQ29tcG9uZW50czIuQ29udHJvbGxlci5nZXRFbmQoKTtcbiAgICAgIHZhciBleGNlZWRlZE1pbiA9IGluZGV4IDwgMDtcblxuICAgICAgaWYgKGV4Y2VlZGVkTWluIHx8IGV4Y2VlZGVkTWF4KSB7XG4gICAgICAgIHBvc2l0aW9uID0gc2hpZnQocG9zaXRpb24sIGV4Y2VlZGVkTWF4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBzaGlmdChwb3NpdGlvbiwgYmFja3dhcmRzKSB7XG4gICAgdmFyIGV4Y2VzcyA9IHBvc2l0aW9uIC0gZ2V0TGltaXQoYmFja3dhcmRzKTtcbiAgICB2YXIgc2l6ZSA9IHNsaWRlclNpemUoKTtcbiAgICBwb3NpdGlvbiAtPSBvcmllbnQoc2l6ZSAqIChjZWlsKGFicyhleGNlc3MpIC8gc2l6ZSkgfHwgMSkpICogKGJhY2t3YXJkcyA/IDEgOiAtMSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRyYW5zbGF0ZShnZXRQb3NpdGlvbigpLCB0cnVlKTtcbiAgICBUcmFuc2l0aW9uLmNhbmNlbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9JbmRleChwb3NpdGlvbikge1xuICAgIHZhciBTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXMuZ2V0KCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgbWluRGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2xpZGVJbmRleCA9IFNsaWRlc1tpXS5pbmRleDtcbiAgICAgIHZhciBkaXN0YW5jZSA9IGFicyh0b1Bvc2l0aW9uKHNsaWRlSW5kZXgsIHRydWUpIC0gcG9zaXRpb24pO1xuXG4gICAgICBpZiAoZGlzdGFuY2UgPD0gbWluRGlzdGFuY2UpIHtcbiAgICAgICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgaW5kZXggPSBzbGlkZUluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gdG9Qb3NpdGlvbihpbmRleCwgdHJpbW1pbmcpIHtcbiAgICB2YXIgcG9zaXRpb24gPSBvcmllbnQodG90YWxTaXplKGluZGV4IC0gMSkgLSBvZmZzZXQoaW5kZXgpKTtcbiAgICByZXR1cm4gdHJpbW1pbmcgPyB0cmltKHBvc2l0aW9uKSA6IHBvc2l0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UG9zaXRpb24oKSB7XG4gICAgdmFyIGxlZnQgPSByZXNvbHZlKFwibGVmdFwiKTtcbiAgICByZXR1cm4gcmVjdChsaXN0KVtsZWZ0XSAtIHJlY3QodHJhY2spW2xlZnRdICsgb3JpZW50KGdldFBhZGRpbmcoZmFsc2UpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyaW0ocG9zaXRpb24pIHtcbiAgICBpZiAob3B0aW9ucy50cmltU3BhY2UgJiYgU3BsaWRlMi5pcyhTTElERSkpIHtcbiAgICAgIHBvc2l0aW9uID0gY2xhbXAocG9zaXRpb24sIDAsIG9yaWVudChzbGlkZXJTaXplKHRydWUpIC0gbGlzdFNpemUoKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZnNldChpbmRleCkge1xuICAgIHZhciBmb2N1cyA9IG9wdGlvbnMuZm9jdXM7XG4gICAgcmV0dXJuIGZvY3VzID09PSBcImNlbnRlclwiID8gKGxpc3RTaXplKCkgLSBzbGlkZVNpemUoaW5kZXgsIHRydWUpKSAvIDIgOiArZm9jdXMgKiBzbGlkZVNpemUoaW5kZXgpIHx8IDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaW1pdChtYXgpIHtcbiAgICByZXR1cm4gdG9Qb3NpdGlvbihtYXggPyBDb21wb25lbnRzMi5Db250cm9sbGVyLmdldEVuZCgpIDogMCwgISFvcHRpb25zLnRyaW1TcGFjZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5TaGlmdChiYWNrd2FyZHMpIHtcbiAgICB2YXIgc2hpZnRlZCA9IG9yaWVudChzaGlmdChnZXRQb3NpdGlvbigpLCBiYWNrd2FyZHMpKTtcbiAgICByZXR1cm4gYmFja3dhcmRzID8gc2hpZnRlZCA+PSAwIDogc2hpZnRlZCA8PSBsaXN0W3Jlc29sdmUoXCJzY3JvbGxXaWR0aFwiKV0gLSByZWN0KHRyYWNrKVtyZXNvbHZlKFwid2lkdGhcIildO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhjZWVkZWRMaW1pdChtYXgsIHBvc2l0aW9uKSB7XG4gICAgcG9zaXRpb24gPSBpc1VuZGVmaW5lZChwb3NpdGlvbikgPyBnZXRQb3NpdGlvbigpIDogcG9zaXRpb247XG4gICAgdmFyIGV4Y2VlZGVkTWluID0gbWF4ICE9PSB0cnVlICYmIG9yaWVudChwb3NpdGlvbikgPCBvcmllbnQoZ2V0TGltaXQoZmFsc2UpKTtcbiAgICB2YXIgZXhjZWVkZWRNYXggPSBtYXggIT09IGZhbHNlICYmIG9yaWVudChwb3NpdGlvbikgPiBvcmllbnQoZ2V0TGltaXQodHJ1ZSkpO1xuICAgIHJldHVybiBleGNlZWRlZE1pbiB8fCBleGNlZWRlZE1heDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIG1vdmU6IG1vdmUsXG4gICAganVtcDoganVtcCxcbiAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZSxcbiAgICBzaGlmdDogc2hpZnQsXG4gICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICB0b1Bvc2l0aW9uOiB0b1Bvc2l0aW9uLFxuICAgIGdldFBvc2l0aW9uOiBnZXRQb3NpdGlvbixcbiAgICBnZXRMaW1pdDogZ2V0TGltaXQsXG4gICAgZXhjZWVkZWRMaW1pdDogZXhjZWVkZWRMaW1pdCxcbiAgICByZXBvc2l0aW9uOiByZXBvc2l0aW9uXG4gIH07XG59XG5cbmZ1bmN0aW9uIENvbnRyb2xsZXIoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTUgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlNS5vbixcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2U1LmVtaXQ7XG5cbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlO1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZ2V0TGltaXQgPSBNb3ZlLmdldExpbWl0LFxuICAgICAgdG9Qb3NpdGlvbiA9IE1vdmUudG9Qb3NpdGlvbjtcbiAgdmFyIF9Db21wb25lbnRzMiRTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXMsXG4gICAgICBpc0Vub3VnaCA9IF9Db21wb25lbnRzMiRTbGlkZXMuaXNFbm91Z2gsXG4gICAgICBnZXRMZW5ndGggPSBfQ29tcG9uZW50czIkU2xpZGVzLmdldExlbmd0aDtcbiAgdmFyIG9taXRFbmQgPSBvcHRpb25zLm9taXRFbmQ7XG4gIHZhciBpc0xvb3AgPSBTcGxpZGUyLmlzKExPT1ApO1xuICB2YXIgaXNTbGlkZSA9IFNwbGlkZTIuaXMoU0xJREUpO1xuICB2YXIgZ2V0TmV4dCA9IGFwcGx5KGdldEFkamFjZW50LCBmYWxzZSk7XG4gIHZhciBnZXRQcmV2ID0gYXBwbHkoZ2V0QWRqYWNlbnQsIHRydWUpO1xuICB2YXIgY3VyckluZGV4ID0gb3B0aW9ucy5zdGFydCB8fCAwO1xuICB2YXIgZW5kSW5kZXg7XG4gIHZhciBwcmV2SW5kZXggPSBjdXJySW5kZXg7XG4gIHZhciBzbGlkZUNvdW50O1xuICB2YXIgcGVyTW92ZTtcbiAgdmFyIHBlclBhZ2U7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNILCBFVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRF0sIGluaXQpO1xuICAgIG9uKEVWRU5UX1JFU0laRUQsIG9uUmVzaXplZCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNsaWRlQ291bnQgPSBnZXRMZW5ndGgodHJ1ZSk7XG4gICAgcGVyTW92ZSA9IG9wdGlvbnMucGVyTW92ZTtcbiAgICBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgIGVuZEluZGV4ID0gZ2V0RW5kKCk7XG4gICAgdmFyIGluZGV4ID0gY2xhbXAoY3VyckluZGV4LCAwLCBvbWl0RW5kID8gZW5kSW5kZXggOiBzbGlkZUNvdW50IC0gMSk7XG5cbiAgICBpZiAoaW5kZXggIT09IGN1cnJJbmRleCkge1xuICAgICAgY3VyckluZGV4ID0gaW5kZXg7XG4gICAgICBNb3ZlLnJlcG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblJlc2l6ZWQoKSB7XG4gICAgaWYgKGVuZEluZGV4ICE9PSBnZXRFbmQoKSkge1xuICAgICAgZW1pdChFVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ28oY29udHJvbCwgYWxsb3dTYW1lSW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFpc0J1c3koKSkge1xuICAgICAgdmFyIGRlc3QgPSBwYXJzZShjb250cm9sKTtcbiAgICAgIHZhciBpbmRleCA9IGxvb3AoZGVzdCk7XG5cbiAgICAgIGlmIChpbmRleCA+IC0xICYmIChhbGxvd1NhbWVJbmRleCB8fCBpbmRleCAhPT0gY3VyckluZGV4KSkge1xuICAgICAgICBzZXRJbmRleChpbmRleCk7XG4gICAgICAgIE1vdmUubW92ZShkZXN0LCBpbmRleCwgcHJldkluZGV4LCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgY2FsbGJhY2spIHtcbiAgICBDb21wb25lbnRzMi5TY3JvbGwuc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGluZGV4ID0gbG9vcChNb3ZlLnRvSW5kZXgoZ2V0UG9zaXRpb24oKSkpO1xuICAgICAgc2V0SW5kZXgob21pdEVuZCA/IG1pbihpbmRleCwgZW5kSW5kZXgpIDogaW5kZXgpO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlKGNvbnRyb2wpIHtcbiAgICB2YXIgaW5kZXggPSBjdXJySW5kZXg7XG5cbiAgICBpZiAoaXNTdHJpbmcoY29udHJvbCkpIHtcbiAgICAgIHZhciBfcmVmID0gY29udHJvbC5tYXRjaCgvKFsrXFwtPD5dKShcXGQrKT8vKSB8fCBbXSxcbiAgICAgICAgICBpbmRpY2F0b3IgPSBfcmVmWzFdLFxuICAgICAgICAgIG51bWJlciA9IF9yZWZbMl07XG5cbiAgICAgIGlmIChpbmRpY2F0b3IgPT09IFwiK1wiIHx8IGluZGljYXRvciA9PT0gXCItXCIpIHtcbiAgICAgICAgaW5kZXggPSBjb21wdXRlRGVzdEluZGV4KGN1cnJJbmRleCArICsoXCJcIiArIGluZGljYXRvciArICgrbnVtYmVyIHx8IDEpKSwgY3VyckluZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kaWNhdG9yID09PSBcIj5cIikge1xuICAgICAgICBpbmRleCA9IG51bWJlciA/IHRvSW5kZXgoK251bWJlcikgOiBnZXROZXh0KHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChpbmRpY2F0b3IgPT09IFwiPFwiKSB7XG4gICAgICAgIGluZGV4ID0gZ2V0UHJldih0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBpc0xvb3AgPyBjb250cm9sIDogY2xhbXAoY29udHJvbCwgMCwgZW5kSW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFkamFjZW50KHByZXYsIGRlc3RpbmF0aW9uKSB7XG4gICAgdmFyIG51bWJlciA9IHBlck1vdmUgfHwgKGhhc0ZvY3VzKCkgPyAxIDogcGVyUGFnZSk7XG4gICAgdmFyIGRlc3QgPSBjb21wdXRlRGVzdEluZGV4KGN1cnJJbmRleCArIG51bWJlciAqIChwcmV2ID8gLTEgOiAxKSwgY3VyckluZGV4LCAhKHBlck1vdmUgfHwgaGFzRm9jdXMoKSkpO1xuXG4gICAgaWYgKGRlc3QgPT09IC0xICYmIGlzU2xpZGUpIHtcbiAgICAgIGlmICghYXBwcm94aW1hdGVseUVxdWFsKGdldFBvc2l0aW9uKCksIGdldExpbWl0KCFwcmV2KSwgMSkpIHtcbiAgICAgICAgcmV0dXJuIHByZXYgPyAwIDogZW5kSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uID8gZGVzdCA6IGxvb3AoZGVzdCk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlRGVzdEluZGV4KGRlc3QsIGZyb20sIHNuYXBQYWdlKSB7XG4gICAgaWYgKGlzRW5vdWdoKCkgfHwgaGFzRm9jdXMoKSkge1xuICAgICAgdmFyIGluZGV4ID0gY29tcHV0ZU1vdmFibGVEZXN0SW5kZXgoZGVzdCk7XG5cbiAgICAgIGlmIChpbmRleCAhPT0gZGVzdCkge1xuICAgICAgICBmcm9tID0gZGVzdDtcbiAgICAgICAgZGVzdCA9IGluZGV4O1xuICAgICAgICBzbmFwUGFnZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGVzdCA8IDAgfHwgZGVzdCA+IGVuZEluZGV4KSB7XG4gICAgICAgIGlmICghcGVyTW92ZSAmJiAoYmV0d2VlbigwLCBkZXN0LCBmcm9tLCB0cnVlKSB8fCBiZXR3ZWVuKGVuZEluZGV4LCBmcm9tLCBkZXN0LCB0cnVlKSkpIHtcbiAgICAgICAgICBkZXN0ID0gdG9JbmRleCh0b1BhZ2UoZGVzdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc0xvb3ApIHtcbiAgICAgICAgICAgIGRlc3QgPSBzbmFwUGFnZSA/IGRlc3QgPCAwID8gLShzbGlkZUNvdW50ICUgcGVyUGFnZSB8fCBwZXJQYWdlKSA6IHNsaWRlQ291bnQgOiBkZXN0O1xuICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZXdpbmQpIHtcbiAgICAgICAgICAgIGRlc3QgPSBkZXN0IDwgMCA/IGVuZEluZGV4IDogMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVzdCA9IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNuYXBQYWdlICYmIGRlc3QgIT09IGZyb20pIHtcbiAgICAgICAgICBkZXN0ID0gdG9JbmRleCh0b1BhZ2UoZnJvbSkgKyAoZGVzdCA8IGZyb20gPyAtMSA6IDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0ID0gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlTW92YWJsZURlc3RJbmRleChkZXN0KSB7XG4gICAgaWYgKGlzU2xpZGUgJiYgb3B0aW9ucy50cmltU3BhY2UgPT09IFwibW92ZVwiICYmIGRlc3QgIT09IGN1cnJJbmRleCkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gZ2V0UG9zaXRpb24oKTtcblxuICAgICAgd2hpbGUgKHBvc2l0aW9uID09PSB0b1Bvc2l0aW9uKGRlc3QsIHRydWUpICYmIGJldHdlZW4oZGVzdCwgMCwgU3BsaWRlMi5sZW5ndGggLSAxLCAhb3B0aW9ucy5yZXdpbmQpKSB7XG4gICAgICAgIGRlc3QgPCBjdXJySW5kZXggPyAtLWRlc3QgOiArK2Rlc3Q7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBsb29wKGluZGV4KSB7XG4gICAgcmV0dXJuIGlzTG9vcCA/IChpbmRleCArIHNsaWRlQ291bnQpICUgc2xpZGVDb3VudCB8fCAwIDogaW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFbmQoKSB7XG4gICAgdmFyIGVuZCA9IHNsaWRlQ291bnQgLSAoaGFzRm9jdXMoKSB8fCBpc0xvb3AgJiYgcGVyTW92ZSA/IDEgOiBwZXJQYWdlKTtcblxuICAgIHdoaWxlIChvbWl0RW5kICYmIGVuZC0tID4gMCkge1xuICAgICAgaWYgKHRvUG9zaXRpb24oc2xpZGVDb3VudCAtIDEsIHRydWUpICE9PSB0b1Bvc2l0aW9uKGVuZCwgdHJ1ZSkpIHtcbiAgICAgICAgZW5kKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbGFtcChlbmQsIDAsIHNsaWRlQ291bnQgLSAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvSW5kZXgocGFnZSkge1xuICAgIHJldHVybiBjbGFtcChoYXNGb2N1cygpID8gcGFnZSA6IHBlclBhZ2UgKiBwYWdlLCAwLCBlbmRJbmRleCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b1BhZ2UoaW5kZXgpIHtcbiAgICByZXR1cm4gaGFzRm9jdXMoKSA/IG1pbihpbmRleCwgZW5kSW5kZXgpIDogZmxvb3IoKGluZGV4ID49IGVuZEluZGV4ID8gc2xpZGVDb3VudCAtIDEgOiBpbmRleCkgLyBwZXJQYWdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvRGVzdChkZXN0aW5hdGlvbikge1xuICAgIHZhciBjbG9zZXN0ID0gTW92ZS50b0luZGV4KGRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gaXNTbGlkZSA/IGNsYW1wKGNsb3Nlc3QsIDAsIGVuZEluZGV4KSA6IGNsb3Nlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCAhPT0gY3VyckluZGV4KSB7XG4gICAgICBwcmV2SW5kZXggPSBjdXJySW5kZXg7XG4gICAgICBjdXJySW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbmRleChwcmV2KSB7XG4gICAgcmV0dXJuIHByZXYgPyBwcmV2SW5kZXggOiBjdXJySW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNGb2N1cygpIHtcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKG9wdGlvbnMuZm9jdXMpIHx8IG9wdGlvbnMuaXNOYXZpZ2F0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCdXN5KCkge1xuICAgIHJldHVybiBTcGxpZGUyLnN0YXRlLmlzKFtNT1ZJTkcsIFNDUk9MTElOR10pICYmICEhb3B0aW9ucy53YWl0Rm9yVHJhbnNpdGlvbjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGdvOiBnbyxcbiAgICBzY3JvbGw6IHNjcm9sbCxcbiAgICBnZXROZXh0OiBnZXROZXh0LFxuICAgIGdldFByZXY6IGdldFByZXYsXG4gICAgZ2V0QWRqYWNlbnQ6IGdldEFkamFjZW50LFxuICAgIGdldEVuZDogZ2V0RW5kLFxuICAgIHNldEluZGV4OiBzZXRJbmRleCxcbiAgICBnZXRJbmRleDogZ2V0SW5kZXgsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICB0b1BhZ2U6IHRvUGFnZSxcbiAgICB0b0Rlc3Q6IHRvRGVzdCxcbiAgICBoYXNGb2N1czogaGFzRm9jdXMsXG4gICAgaXNCdXN5OiBpc0J1c3lcbiAgfTtcbn1cblxudmFyIFhNTF9OQU1FX1NQQUNFID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xudmFyIFBBVEggPSBcIm0xNS41IDAuOTMyLTQuMyA0LjM4IDE0LjUgMTQuNi0xNC41IDE0LjUgNC4zIDQuNCAxNC42LTE0LjYgNC40LTQuMy00LjQtNC40LTE0LjYtMTQuNnpcIjtcbnZhciBTSVpFID0gNDA7XG5cbmZ1bmN0aW9uIEFycm93cyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBiaW5kID0gZXZlbnQuYmluZCxcbiAgICAgIGVtaXQgPSBldmVudC5lbWl0O1xuICB2YXIgY2xhc3NlcyA9IG9wdGlvbnMuY2xhc3NlcyxcbiAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG47XG4gIHZhciBFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXI7XG4gIHZhciBwbGFjZWhvbGRlciA9IEVsZW1lbnRzLmFycm93cyxcbiAgICAgIHRyYWNrID0gRWxlbWVudHMudHJhY2s7XG4gIHZhciB3cmFwcGVyID0gcGxhY2Vob2xkZXI7XG4gIHZhciBwcmV2ID0gRWxlbWVudHMucHJldjtcbiAgdmFyIG5leHQgPSBFbGVtZW50cy5uZXh0O1xuICB2YXIgY3JlYXRlZDtcbiAgdmFyIHdyYXBwZXJDbGFzc2VzO1xuICB2YXIgYXJyb3dzID0ge307XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKEVWRU5UX1VQREFURUQsIHJlbW91bnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgbW91bnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGVuYWJsZWQgPSBvcHRpb25zLmFycm93cztcblxuICAgIGlmIChlbmFibGVkICYmICEocHJldiAmJiBuZXh0KSkge1xuICAgICAgY3JlYXRlQXJyb3dzKCk7XG4gICAgfVxuXG4gICAgaWYgKHByZXYgJiYgbmV4dCkge1xuICAgICAgYXNzaWduKGFycm93cywge1xuICAgICAgICBwcmV2OiBwcmV2LFxuICAgICAgICBuZXh0OiBuZXh0XG4gICAgICB9KTtcbiAgICAgIGRpc3BsYXkod3JhcHBlciwgZW5hYmxlZCA/IFwiXCIgOiBcIm5vbmVcIik7XG4gICAgICBhZGRDbGFzcyh3cmFwcGVyLCB3cmFwcGVyQ2xhc3NlcyA9IENMQVNTX0FSUk9XUyArIFwiLS1cIiArIG9wdGlvbnMuZGlyZWN0aW9uKTtcblxuICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgbGlzdGVuKCk7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICBzZXRBdHRyaWJ1dGUoW3ByZXYsIG5leHRdLCBBUklBX0NPTlRST0xTLCB0cmFjay5pZCk7XG4gICAgICAgIGVtaXQoRVZFTlRfQVJST1dTX01PVU5URUQsIHByZXYsIG5leHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIHJlbW92ZUNsYXNzKHdyYXBwZXIsIHdyYXBwZXJDbGFzc2VzKTtcblxuICAgIGlmIChjcmVhdGVkKSB7XG4gICAgICByZW1vdmUocGxhY2Vob2xkZXIgPyBbcHJldiwgbmV4dF0gOiB3cmFwcGVyKTtcbiAgICAgIHByZXYgPSBuZXh0ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlQXR0cmlidXRlKFtwcmV2LCBuZXh0XSwgQUxMX0FUVFJJQlVURVMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfTU9WRUQsIEVWRU5UX1JFRlJFU0gsIEVWRU5UX1NDUk9MTEVELCBFVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRF0sIHVwZGF0ZSk7XG4gICAgYmluZChuZXh0LCBcImNsaWNrXCIsIGFwcGx5KGdvLCBcIj5cIikpO1xuICAgIGJpbmQocHJldiwgXCJjbGlja1wiLCBhcHBseShnbywgXCI8XCIpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKGNvbnRyb2wpIHtcbiAgICBDb250cm9sbGVyLmdvKGNvbnRyb2wsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyb3dzKCkge1xuICAgIHdyYXBwZXIgPSBwbGFjZWhvbGRlciB8fCBjcmVhdGUoXCJkaXZcIiwgY2xhc3Nlcy5hcnJvd3MpO1xuICAgIHByZXYgPSBjcmVhdGVBcnJvdyh0cnVlKTtcbiAgICBuZXh0ID0gY3JlYXRlQXJyb3coZmFsc2UpO1xuICAgIGNyZWF0ZWQgPSB0cnVlO1xuICAgIGFwcGVuZCh3cmFwcGVyLCBbcHJldiwgbmV4dF0pO1xuICAgICFwbGFjZWhvbGRlciAmJiBiZWZvcmUod3JhcHBlciwgdHJhY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyb3cocHJldjIpIHtcbiAgICB2YXIgYXJyb3cgPSBcIjxidXR0b24gY2xhc3M9XFxcIlwiICsgY2xhc3Nlcy5hcnJvdyArIFwiIFwiICsgKHByZXYyID8gY2xhc3Nlcy5wcmV2IDogY2xhc3Nlcy5uZXh0KSArIFwiXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPjxzdmcgeG1sbnM9XFxcIlwiICsgWE1MX05BTUVfU1BBQ0UgKyBcIlxcXCIgdmlld0JveD1cXFwiMCAwIFwiICsgU0laRSArIFwiIFwiICsgU0laRSArIFwiXFxcIiB3aWR0aD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiIGhlaWdodD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiIGZvY3VzYWJsZT1cXFwiZmFsc2VcXFwiPjxwYXRoIGQ9XFxcIlwiICsgKG9wdGlvbnMuYXJyb3dQYXRoIHx8IFBBVEgpICsgXCJcXFwiIC8+XCI7XG4gICAgcmV0dXJuIHBhcnNlSHRtbChhcnJvdyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgaWYgKHByZXYgJiYgbmV4dCkge1xuICAgICAgdmFyIGluZGV4ID0gU3BsaWRlMi5pbmRleDtcbiAgICAgIHZhciBwcmV2SW5kZXggPSBDb250cm9sbGVyLmdldFByZXYoKTtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBDb250cm9sbGVyLmdldE5leHQoKTtcbiAgICAgIHZhciBwcmV2TGFiZWwgPSBwcmV2SW5kZXggPiAtMSAmJiBpbmRleCA8IHByZXZJbmRleCA/IGkxOG4ubGFzdCA6IGkxOG4ucHJldjtcbiAgICAgIHZhciBuZXh0TGFiZWwgPSBuZXh0SW5kZXggPiAtMSAmJiBpbmRleCA+IG5leHRJbmRleCA/IGkxOG4uZmlyc3QgOiBpMThuLm5leHQ7XG4gICAgICBwcmV2LmRpc2FibGVkID0gcHJldkluZGV4IDwgMDtcbiAgICAgIG5leHQuZGlzYWJsZWQgPSBuZXh0SW5kZXggPCAwO1xuICAgICAgc2V0QXR0cmlidXRlKHByZXYsIEFSSUFfTEFCRUwsIHByZXZMYWJlbCk7XG4gICAgICBzZXRBdHRyaWJ1dGUobmV4dCwgQVJJQV9MQUJFTCwgbmV4dExhYmVsKTtcbiAgICAgIGVtaXQoRVZFTlRfQVJST1dTX1VQREFURUQsIHByZXYsIG5leHQsIHByZXZJbmRleCwgbmV4dEluZGV4KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFycm93czogYXJyb3dzLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHVwZGF0ZTogdXBkYXRlXG4gIH07XG59XG5cbnZhciBJTlRFUlZBTF9EQVRBX0FUVFJJQlVURSA9IERBVEFfQVRUUklCVVRFICsgXCItaW50ZXJ2YWxcIjtcblxuZnVuY3Rpb24gQXV0b3BsYXkoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTYgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlNi5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2U2LmJpbmQsXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlNi5lbWl0O1xuXG4gIHZhciBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChvcHRpb25zLmludGVydmFsLCBTcGxpZGUyLmdvLmJpbmQoU3BsaWRlMiwgXCI+XCIpLCBvbkFuaW1hdGlvbkZyYW1lKTtcbiAgdmFyIGlzUGF1c2VkID0gaW50ZXJ2YWwuaXNQYXVzZWQ7XG4gIHZhciBFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgX0NvbXBvbmVudHMyJEVsZW1lbnRzNCA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgcm9vdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czQucm9vdCxcbiAgICAgIHRvZ2dsZSA9IF9Db21wb25lbnRzMiRFbGVtZW50czQudG9nZ2xlO1xuICB2YXIgYXV0b3BsYXkgPSBvcHRpb25zLmF1dG9wbGF5O1xuICB2YXIgaG92ZXJlZDtcbiAgdmFyIGZvY3VzZWQ7XG4gIHZhciBzdG9wcGVkID0gYXV0b3BsYXkgPT09IFwicGF1c2VcIjtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgIGxpc3RlbigpO1xuICAgICAgdG9nZ2xlICYmIHNldEF0dHJpYnV0ZSh0b2dnbGUsIEFSSUFfQ09OVFJPTFMsIEVsZW1lbnRzLnRyYWNrLmlkKTtcbiAgICAgIHN0b3BwZWQgfHwgcGxheSgpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKCkge1xuICAgIGlmIChvcHRpb25zLnBhdXNlT25Ib3Zlcikge1xuICAgICAgYmluZChyb290LCBcIm1vdXNlZW50ZXIgbW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBob3ZlcmVkID0gZS50eXBlID09PSBcIm1vdXNlZW50ZXJcIjtcbiAgICAgICAgYXV0b1RvZ2dsZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucGF1c2VPbkZvY3VzKSB7XG4gICAgICBiaW5kKHJvb3QsIFwiZm9jdXNpbiBmb2N1c291dFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBmb2N1c2VkID0gZS50eXBlID09PSBcImZvY3VzaW5cIjtcbiAgICAgICAgYXV0b1RvZ2dsZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgYmluZCh0b2dnbGUsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzdG9wcGVkID8gcGxheSgpIDogcGF1c2UodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBvbihbRVZFTlRfTU9WRSwgRVZFTlRfU0NST0xMLCBFVkVOVF9SRUZSRVNIXSwgaW50ZXJ2YWwucmV3aW5kKTtcbiAgICBvbihFVkVOVF9NT1ZFLCBvbk1vdmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICBpZiAoaXNQYXVzZWQoKSAmJiBDb21wb25lbnRzMi5TbGlkZXMuaXNFbm91Z2goKSkge1xuICAgICAgaW50ZXJ2YWwuc3RhcnQoIW9wdGlvbnMucmVzZXRQcm9ncmVzcyk7XG4gICAgICBmb2N1c2VkID0gaG92ZXJlZCA9IHN0b3BwZWQgPSBmYWxzZTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgICAgZW1pdChFVkVOVF9BVVRPUExBWV9QTEFZKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZShzdG9wKSB7XG4gICAgaWYgKHN0b3AgPT09IHZvaWQgMCkge1xuICAgICAgc3RvcCA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RvcHBlZCA9ICEhc3RvcDtcbiAgICB1cGRhdGUoKTtcblxuICAgIGlmICghaXNQYXVzZWQoKSkge1xuICAgICAgaW50ZXJ2YWwucGF1c2UoKTtcbiAgICAgIGVtaXQoRVZFTlRfQVVUT1BMQVlfUEFVU0UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGF1dG9Ub2dnbGUoKSB7XG4gICAgaWYgKCFzdG9wcGVkKSB7XG4gICAgICBob3ZlcmVkIHx8IGZvY3VzZWQgPyBwYXVzZShmYWxzZSkgOiBwbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHRvZ2dsZSwgQ0xBU1NfQUNUSVZFLCAhc3RvcHBlZCk7XG4gICAgICBzZXRBdHRyaWJ1dGUodG9nZ2xlLCBBUklBX0xBQkVMLCBvcHRpb25zLmkxOG5bc3RvcHBlZCA/IFwicGxheVwiIDogXCJwYXVzZVwiXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25BbmltYXRpb25GcmFtZShyYXRlKSB7XG4gICAgdmFyIGJhciA9IEVsZW1lbnRzLmJhcjtcbiAgICBiYXIgJiYgc3R5bGUoYmFyLCBcIndpZHRoXCIsIHJhdGUgKiAxMDAgKyBcIiVcIik7XG4gICAgZW1pdChFVkVOVF9BVVRPUExBWV9QTEFZSU5HLCByYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW92ZShpbmRleCkge1xuICAgIHZhciBTbGlkZSA9IENvbXBvbmVudHMyLlNsaWRlcy5nZXRBdChpbmRleCk7XG4gICAgaW50ZXJ2YWwuc2V0KFNsaWRlICYmICtnZXRBdHRyaWJ1dGUoU2xpZGUuc2xpZGUsIElOVEVSVkFMX0RBVEFfQVRUUklCVVRFKSB8fCBvcHRpb25zLmludGVydmFsKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGludGVydmFsLmNhbmNlbCxcbiAgICBwbGF5OiBwbGF5LFxuICAgIHBhdXNlOiBwYXVzZSxcbiAgICBpc1BhdXNlZDogaXNQYXVzZWRcbiAgfTtcbn1cblxuZnVuY3Rpb24gQ292ZXIoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTcgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlNy5vbjtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpZiAob3B0aW9ucy5jb3Zlcikge1xuICAgICAgb24oRVZFTlRfTEFaWUxPQURfTE9BREVELCBhcHBseSh0b2dnbGUsIHRydWUpKTtcbiAgICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgYXBwbHkoY292ZXIsIHRydWUpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb3Zlcihjb3ZlcjIpIHtcbiAgICBDb21wb25lbnRzMi5TbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgIHZhciBpbWcgPSBjaGlsZChTbGlkZS5jb250YWluZXIgfHwgU2xpZGUuc2xpZGUsIFwiaW1nXCIpO1xuXG4gICAgICBpZiAoaW1nICYmIGltZy5zcmMpIHtcbiAgICAgICAgdG9nZ2xlKGNvdmVyMiwgaW1nLCBTbGlkZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGUoY292ZXIyLCBpbWcsIFNsaWRlKSB7XG4gICAgU2xpZGUuc3R5bGUoXCJiYWNrZ3JvdW5kXCIsIGNvdmVyMiA/IFwiY2VudGVyL2NvdmVyIG5vLXJlcGVhdCB1cmwoXFxcIlwiICsgaW1nLnNyYyArIFwiXFxcIilcIiA6IFwiXCIsIHRydWUpO1xuICAgIGRpc3BsYXkoaW1nLCBjb3ZlcjIgPyBcIm5vbmVcIiA6IFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogYXBwbHkoY292ZXIsIGZhbHNlKVxuICB9O1xufVxuXG52YXIgQk9VTkNFX0RJRkZfVEhSRVNIT0xEID0gMTA7XG52YXIgQk9VTkNFX0RVUkFUSU9OID0gNjAwO1xudmFyIEZSSUNUSU9OX0ZBQ1RPUiA9IDAuNjtcbnZhciBCQVNFX1ZFTE9DSVRZID0gMS41O1xudmFyIE1JTl9EVVJBVElPTiA9IDgwMDtcblxuZnVuY3Rpb24gU2Nyb2xsKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U4ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTgub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlOC5lbWl0O1xuXG4gIHZhciBzZXQgPSBTcGxpZGUyLnN0YXRlLnNldDtcbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlO1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZ2V0TGltaXQgPSBNb3ZlLmdldExpbWl0LFxuICAgICAgZXhjZWVkZWRMaW1pdCA9IE1vdmUuZXhjZWVkZWRMaW1pdCxcbiAgICAgIHRyYW5zbGF0ZSA9IE1vdmUudHJhbnNsYXRlO1xuICB2YXIgaXNTbGlkZSA9IFNwbGlkZTIuaXMoU0xJREUpO1xuICB2YXIgaW50ZXJ2YWw7XG4gIHZhciBjYWxsYmFjaztcbiAgdmFyIGZyaWN0aW9uID0gMTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBvbihFVkVOVF9NT1ZFLCBjbGVhcik7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBjYW5jZWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgb25TY3JvbGxlZCwgbm9Db25zdHJhaW4pIHtcbiAgICB2YXIgZnJvbSA9IGdldFBvc2l0aW9uKCk7XG4gICAgY2xlYXIoKTtcblxuICAgIGlmIChzbmFwICYmICghaXNTbGlkZSB8fCAhZXhjZWVkZWRMaW1pdCgpKSkge1xuICAgICAgdmFyIHNpemUgPSBDb21wb25lbnRzMi5MYXlvdXQuc2xpZGVyU2l6ZSgpO1xuICAgICAgdmFyIG9mZnNldCA9IHNpZ24oZGVzdGluYXRpb24pICogc2l6ZSAqIGZsb29yKGFicyhkZXN0aW5hdGlvbikgLyBzaXplKSB8fCAwO1xuICAgICAgZGVzdGluYXRpb24gPSBNb3ZlLnRvUG9zaXRpb24oQ29tcG9uZW50czIuQ29udHJvbGxlci50b0Rlc3QoZGVzdGluYXRpb24gJSBzaXplKSkgKyBvZmZzZXQ7XG4gICAgfVxuXG4gICAgdmFyIG5vRGlzdGFuY2UgPSBhcHByb3hpbWF0ZWx5RXF1YWwoZnJvbSwgZGVzdGluYXRpb24sIDEpO1xuICAgIGZyaWN0aW9uID0gMTtcbiAgICBkdXJhdGlvbiA9IG5vRGlzdGFuY2UgPyAwIDogZHVyYXRpb24gfHwgbWF4KGFicyhkZXN0aW5hdGlvbiAtIGZyb20pIC8gQkFTRV9WRUxPQ0lUWSwgTUlOX0RVUkFUSU9OKTtcbiAgICBjYWxsYmFjayA9IG9uU2Nyb2xsZWQ7XG4gICAgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwoZHVyYXRpb24sIG9uRW5kLCBhcHBseSh1cGRhdGUsIGZyb20sIGRlc3RpbmF0aW9uLCBub0NvbnN0cmFpbiksIDEpO1xuICAgIHNldChTQ1JPTExJTkcpO1xuICAgIGVtaXQoRVZFTlRfU0NST0xMKTtcbiAgICBpbnRlcnZhbC5zdGFydCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25FbmQoKSB7XG4gICAgc2V0KElETEUpO1xuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgZW1pdChFVkVOVF9TQ1JPTExFRCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZnJvbSwgdG8sIG5vQ29uc3RyYWluLCByYXRlKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gZ2V0UG9zaXRpb24oKTtcbiAgICB2YXIgdGFyZ2V0ID0gZnJvbSArICh0byAtIGZyb20pICogZWFzaW5nKHJhdGUpO1xuICAgIHZhciBkaWZmID0gKHRhcmdldCAtIHBvc2l0aW9uKSAqIGZyaWN0aW9uO1xuICAgIHRyYW5zbGF0ZShwb3NpdGlvbiArIGRpZmYpO1xuXG4gICAgaWYgKGlzU2xpZGUgJiYgIW5vQ29uc3RyYWluICYmIGV4Y2VlZGVkTGltaXQoKSkge1xuICAgICAgZnJpY3Rpb24gKj0gRlJJQ1RJT05fRkFDVE9SO1xuXG4gICAgICBpZiAoYWJzKGRpZmYpIDwgQk9VTkNFX0RJRkZfVEhSRVNIT0xEKSB7XG4gICAgICAgIHNjcm9sbChnZXRMaW1pdChleGNlZWRlZExpbWl0KHRydWUpKSwgQk9VTkNFX0RVUkFUSU9OLCBmYWxzZSwgY2FsbGJhY2ssIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgaW50ZXJ2YWwuY2FuY2VsKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmIChpbnRlcnZhbCAmJiAhaW50ZXJ2YWwuaXNQYXVzZWQoKSkge1xuICAgICAgY2xlYXIoKTtcbiAgICAgIG9uRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZWFzaW5nKHQpIHtcbiAgICB2YXIgZWFzaW5nRnVuYyA9IG9wdGlvbnMuZWFzaW5nRnVuYztcbiAgICByZXR1cm4gZWFzaW5nRnVuYyA/IGVhc2luZ0Z1bmModCkgOiAxIC0gTWF0aC5wb3coMSAtIHQsIDQpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogY2xlYXIsXG4gICAgc2Nyb2xsOiBzY3JvbGwsXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn1cblxudmFyIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TID0ge1xuICBwYXNzaXZlOiBmYWxzZSxcbiAgY2FwdHVyZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gRHJhZyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlOSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U5Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTkuZW1pdCxcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2U5LmJpbmQsXG4gICAgICB1bmJpbmQgPSBfRXZlbnRJbnRlcmZhY2U5LnVuYmluZDtcblxuICB2YXIgc3RhdGUgPSBTcGxpZGUyLnN0YXRlO1xuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmUsXG4gICAgICBTY3JvbGwgPSBDb21wb25lbnRzMi5TY3JvbGwsXG4gICAgICBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcixcbiAgICAgIHRyYWNrID0gQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2ssXG4gICAgICByZWR1Y2UgPSBDb21wb25lbnRzMi5NZWRpYS5yZWR1Y2U7XG4gIHZhciBfQ29tcG9uZW50czIkRGlyZWN0aW8yID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLFxuICAgICAgcmVzb2x2ZSA9IF9Db21wb25lbnRzMiREaXJlY3RpbzIucmVzb2x2ZSxcbiAgICAgIG9yaWVudCA9IF9Db21wb25lbnRzMiREaXJlY3RpbzIub3JpZW50O1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZXhjZWVkZWRMaW1pdCA9IE1vdmUuZXhjZWVkZWRMaW1pdDtcbiAgdmFyIGJhc2VQb3NpdGlvbjtcbiAgdmFyIGJhc2VFdmVudDtcbiAgdmFyIHByZXZCYXNlRXZlbnQ7XG4gIHZhciBpc0ZyZWU7XG4gIHZhciBkcmFnZ2luZztcbiAgdmFyIGV4Y2VlZGVkID0gZmFsc2U7XG4gIHZhciBjbGlja1ByZXZlbnRlZDtcbiAgdmFyIGRpc2FibGVkO1xuICB2YXIgdGFyZ2V0O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfTU9WRV9FVkVOVFMsIG5vb3AsIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBQT0lOVEVSX1VQX0VWRU5UUywgbm9vcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfRE9XTl9FVkVOVFMsIG9uUG9pbnRlckRvd24sIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBcImNsaWNrXCIsIG9uQ2xpY2ssIHtcbiAgICAgIGNhcHR1cmU6IHRydWVcbiAgICB9KTtcbiAgICBiaW5kKHRyYWNrLCBcImRyYWdzdGFydFwiLCBwcmV2ZW50KTtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfVVBEQVRFRF0sIGluaXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgZHJhZyA9IG9wdGlvbnMuZHJhZztcbiAgICBkaXNhYmxlKCFkcmFnKTtcbiAgICBpc0ZyZWUgPSBkcmFnID09PSBcImZyZWVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlckRvd24oZSkge1xuICAgIGNsaWNrUHJldmVudGVkID0gZmFsc2U7XG5cbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICB2YXIgaXNUb3VjaCA9IGlzVG91Y2hFdmVudChlKTtcblxuICAgICAgaWYgKGlzRHJhZ2dhYmxlKGUudGFyZ2V0KSAmJiAoaXNUb3VjaCB8fCAhZS5idXR0b24pKSB7XG4gICAgICAgIGlmICghQ29udHJvbGxlci5pc0J1c3koKSkge1xuICAgICAgICAgIHRhcmdldCA9IGlzVG91Y2ggPyB0cmFjayA6IHdpbmRvdztcbiAgICAgICAgICBkcmFnZ2luZyA9IHN0YXRlLmlzKFtNT1ZJTkcsIFNDUk9MTElOR10pO1xuICAgICAgICAgIHByZXZCYXNlRXZlbnQgPSBudWxsO1xuICAgICAgICAgIGJpbmQodGFyZ2V0LCBQT0lOVEVSX01PVkVfRVZFTlRTLCBvblBvaW50ZXJNb3ZlLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgICAgICAgYmluZCh0YXJnZXQsIFBPSU5URVJfVVBfRVZFTlRTLCBvblBvaW50ZXJVcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgICAgICAgIE1vdmUuY2FuY2VsKCk7XG4gICAgICAgICAgU2Nyb2xsLmNhbmNlbCgpO1xuICAgICAgICAgIHNhdmUoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlck1vdmUoZSkge1xuICAgIGlmICghc3RhdGUuaXMoRFJBR0dJTkcpKSB7XG4gICAgICBzdGF0ZS5zZXQoRFJBR0dJTkcpO1xuICAgICAgZW1pdChFVkVOVF9EUkFHKTtcbiAgICB9XG5cbiAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgTW92ZS50cmFuc2xhdGUoYmFzZVBvc2l0aW9uICsgY29uc3RyYWluKGRpZmZDb29yZChlKSkpO1xuICAgICAgICB2YXIgZXhwaXJlZCA9IGRpZmZUaW1lKGUpID4gTE9HX0lOVEVSVkFMO1xuICAgICAgICB2YXIgaGFzRXhjZWVkZWQgPSBleGNlZWRlZCAhPT0gKGV4Y2VlZGVkID0gZXhjZWVkZWRMaW1pdCgpKTtcblxuICAgICAgICBpZiAoZXhwaXJlZCB8fCBoYXNFeGNlZWRlZCkge1xuICAgICAgICAgIHNhdmUoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja1ByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIGVtaXQoRVZFTlRfRFJBR0dJTkcpO1xuICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgfSBlbHNlIGlmIChpc1NsaWRlckRpcmVjdGlvbihlKSkge1xuICAgICAgICBkcmFnZ2luZyA9IHNob3VsZFN0YXJ0KGUpO1xuICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlclVwKGUpIHtcbiAgICBpZiAoc3RhdGUuaXMoRFJBR0dJTkcpKSB7XG4gICAgICBzdGF0ZS5zZXQoSURMRSk7XG4gICAgICBlbWl0KEVWRU5UX0RSQUdHRUQpO1xuICAgIH1cblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgbW92ZShlKTtcbiAgICAgIHByZXZlbnQoZSk7XG4gICAgfVxuXG4gICAgdW5iaW5kKHRhcmdldCwgUE9JTlRFUl9NT1ZFX0VWRU5UUywgb25Qb2ludGVyTW92ZSk7XG4gICAgdW5iaW5kKHRhcmdldCwgUE9JTlRFUl9VUF9FVkVOVFMsIG9uUG9pbnRlclVwKTtcbiAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgaWYgKCFkaXNhYmxlZCAmJiBjbGlja1ByZXZlbnRlZCkge1xuICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlKGUpIHtcbiAgICBwcmV2QmFzZUV2ZW50ID0gYmFzZUV2ZW50O1xuICAgIGJhc2VFdmVudCA9IGU7XG4gICAgYmFzZVBvc2l0aW9uID0gZ2V0UG9zaXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZSkge1xuICAgIHZhciB2ZWxvY2l0eSA9IGNvbXB1dGVWZWxvY2l0eShlKTtcbiAgICB2YXIgZGVzdGluYXRpb24gPSBjb21wdXRlRGVzdGluYXRpb24odmVsb2NpdHkpO1xuICAgIHZhciByZXdpbmQgPSBvcHRpb25zLnJld2luZCAmJiBvcHRpb25zLnJld2luZEJ5RHJhZztcbiAgICByZWR1Y2UoZmFsc2UpO1xuXG4gICAgaWYgKGlzRnJlZSkge1xuICAgICAgQ29udHJvbGxlci5zY3JvbGwoZGVzdGluYXRpb24sIDAsIG9wdGlvbnMuc25hcCk7XG4gICAgfSBlbHNlIGlmIChTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICBDb250cm9sbGVyLmdvKG9yaWVudChzaWduKHZlbG9jaXR5KSkgPCAwID8gcmV3aW5kID8gXCI8XCIgOiBcIi1cIiA6IHJld2luZCA/IFwiPlwiIDogXCIrXCIpO1xuICAgIH0gZWxzZSBpZiAoU3BsaWRlMi5pcyhTTElERSkgJiYgZXhjZWVkZWQgJiYgcmV3aW5kKSB7XG4gICAgICBDb250cm9sbGVyLmdvKGV4Y2VlZGVkTGltaXQodHJ1ZSkgPyBcIj5cIiA6IFwiPFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29udHJvbGxlci5nbyhDb250cm9sbGVyLnRvRGVzdChkZXN0aW5hdGlvbiksIHRydWUpO1xuICAgIH1cblxuICAgIHJlZHVjZSh0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZFN0YXJ0KGUpIHtcbiAgICB2YXIgdGhyZXNob2xkcyA9IG9wdGlvbnMuZHJhZ01pblRocmVzaG9sZDtcbiAgICB2YXIgaXNPYmogPSBpc09iamVjdCh0aHJlc2hvbGRzKTtcbiAgICB2YXIgbW91c2UgPSBpc09iaiAmJiB0aHJlc2hvbGRzLm1vdXNlIHx8IDA7XG4gICAgdmFyIHRvdWNoID0gKGlzT2JqID8gdGhyZXNob2xkcy50b3VjaCA6ICt0aHJlc2hvbGRzKSB8fCAxMDtcbiAgICByZXR1cm4gYWJzKGRpZmZDb29yZChlKSkgPiAoaXNUb3VjaEV2ZW50KGUpID8gdG91Y2ggOiBtb3VzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1NsaWRlckRpcmVjdGlvbihlKSB7XG4gICAgcmV0dXJuIGFicyhkaWZmQ29vcmQoZSkpID4gYWJzKGRpZmZDb29yZChlLCB0cnVlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlVmVsb2NpdHkoZSkge1xuICAgIGlmIChTcGxpZGUyLmlzKExPT1ApIHx8ICFleGNlZWRlZCkge1xuICAgICAgdmFyIHRpbWUgPSBkaWZmVGltZShlKTtcblxuICAgICAgaWYgKHRpbWUgJiYgdGltZSA8IExPR19JTlRFUlZBTCkge1xuICAgICAgICByZXR1cm4gZGlmZkNvb3JkKGUpIC8gdGltZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVEZXN0aW5hdGlvbih2ZWxvY2l0eSkge1xuICAgIHJldHVybiBnZXRQb3NpdGlvbigpICsgc2lnbih2ZWxvY2l0eSkgKiBtaW4oYWJzKHZlbG9jaXR5KSAqIChvcHRpb25zLmZsaWNrUG93ZXIgfHwgNjAwKSwgaXNGcmVlID8gSW5maW5pdHkgOiBDb21wb25lbnRzMi5MYXlvdXQubGlzdFNpemUoKSAqIChvcHRpb25zLmZsaWNrTWF4UGFnZXMgfHwgMSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlmZkNvb3JkKGUsIG9ydGhvZ29uYWwpIHtcbiAgICByZXR1cm4gY29vcmRPZihlLCBvcnRob2dvbmFsKSAtIGNvb3JkT2YoZ2V0QmFzZUV2ZW50KGUpLCBvcnRob2dvbmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZUaW1lKGUpIHtcbiAgICByZXR1cm4gdGltZU9mKGUpIC0gdGltZU9mKGdldEJhc2VFdmVudChlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCYXNlRXZlbnQoZSkge1xuICAgIHJldHVybiBiYXNlRXZlbnQgPT09IGUgJiYgcHJldkJhc2VFdmVudCB8fCBiYXNlRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZE9mKGUsIG9ydGhvZ29uYWwpIHtcbiAgICByZXR1cm4gKGlzVG91Y2hFdmVudChlKSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlKVtcInBhZ2VcIiArIHJlc29sdmUob3J0aG9nb25hbCA/IFwiWVwiIDogXCJYXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihkaWZmKSB7XG4gICAgcmV0dXJuIGRpZmYgLyAoZXhjZWVkZWQgJiYgU3BsaWRlMi5pcyhTTElERSkgPyBGUklDVElPTiA6IDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNEcmFnZ2FibGUodGFyZ2V0Mikge1xuICAgIHZhciBub0RyYWcgPSBvcHRpb25zLm5vRHJhZztcbiAgICByZXR1cm4gIW1hdGNoZXModGFyZ2V0MiwgXCIuXCIgKyBDTEFTU19QQUdJTkFUSU9OX1BBR0UgKyBcIiwgLlwiICsgQ0xBU1NfQVJST1cpICYmICghbm9EcmFnIHx8ICFtYXRjaGVzKHRhcmdldDIsIG5vRHJhZykpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUb3VjaEV2ZW50KGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIFRvdWNoRXZlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RyYWdnaW5nKCkge1xuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUodmFsdWUpIHtcbiAgICBkaXNhYmxlZCA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGlzYWJsZTogZGlzYWJsZSxcbiAgICBpc0RyYWdnaW5nOiBpc0RyYWdnaW5nXG4gIH07XG59XG5cbnZhciBOT1JNQUxJWkFUSU9OX01BUCA9IHtcbiAgU3BhY2ViYXI6IFwiIFwiLFxuICBSaWdodDogQVJST1dfUklHSFQsXG4gIExlZnQ6IEFSUk9XX0xFRlQsXG4gIFVwOiBBUlJPV19VUCxcbiAgRG93bjogQVJST1dfRE9XTlxufTtcblxuZnVuY3Rpb24gbm9ybWFsaXplS2V5KGtleSkge1xuICBrZXkgPSBpc1N0cmluZyhrZXkpID8ga2V5IDoga2V5LmtleTtcbiAgcmV0dXJuIE5PUk1BTElaQVRJT05fTUFQW2tleV0gfHwga2V5O1xufVxuXG52YXIgS0VZQk9BUkRfRVZFTlQgPSBcImtleWRvd25cIjtcblxuZnVuY3Rpb24gS2V5Ym9hcmQoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTEwID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTEwLm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTEwLmJpbmQsXG4gICAgICB1bmJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMC51bmJpbmQ7XG5cbiAgdmFyIHJvb3QgPSBTcGxpZGUyLnJvb3Q7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciB0YXJnZXQ7XG4gIHZhciBkaXNhYmxlZDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgaW5pdCk7XG4gICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGtleWJvYXJkID0gb3B0aW9ucy5rZXlib2FyZDtcblxuICAgIGlmIChrZXlib2FyZCkge1xuICAgICAgdGFyZ2V0ID0ga2V5Ym9hcmQgPT09IFwiZ2xvYmFsXCIgPyB3aW5kb3cgOiByb290O1xuICAgICAgYmluZCh0YXJnZXQsIEtFWUJPQVJEX0VWRU5ULCBvbktleWRvd24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdW5iaW5kKHRhcmdldCwgS0VZQk9BUkRfRVZFTlQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzYWJsZSh2YWx1ZSkge1xuICAgIGRpc2FibGVkID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoKSB7XG4gICAgdmFyIF9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBkaXNhYmxlZCA9IF9kaXNhYmxlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XG4gICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgdmFyIGtleSA9IG5vcm1hbGl6ZUtleShlKTtcblxuICAgICAgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19MRUZUKSkge1xuICAgICAgICBTcGxpZGUyLmdvKFwiPFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSByZXNvbHZlKEFSUk9XX1JJR0hUKSkge1xuICAgICAgICBTcGxpZGUyLmdvKFwiPlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIGRpc2FibGU6IGRpc2FibGVcbiAgfTtcbn1cblxudmFyIFNSQ19EQVRBX0FUVFJJQlVURSA9IERBVEFfQVRUUklCVVRFICsgXCItbGF6eVwiO1xudmFyIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSA9IFNSQ19EQVRBX0FUVFJJQlVURSArIFwiLXNyY3NldFwiO1xudmFyIElNQUdFX1NFTEVDVE9SID0gXCJbXCIgKyBTUkNfREFUQV9BVFRSSUJVVEUgKyBcIl0sIFtcIiArIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSArIFwiXVwiO1xuXG5mdW5jdGlvbiBMYXp5TG9hZChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTEgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTEub24sXG4gICAgICBvZmYgPSBfRXZlbnRJbnRlcmZhY2UxMS5vZmYsXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTEuYmluZCxcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2UxMS5lbWl0O1xuXG4gIHZhciBpc1NlcXVlbnRpYWwgPSBvcHRpb25zLmxhenlMb2FkID09PSBcInNlcXVlbnRpYWxcIjtcbiAgdmFyIGV2ZW50cyA9IFtFVkVOVF9NT1ZFRCwgRVZFTlRfU0NST0xMRURdO1xuICB2YXIgZW50cmllcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChvcHRpb25zLmxhenlMb2FkKSB7XG4gICAgICBpbml0KCk7XG4gICAgICBvbihFVkVOVF9SRUZSRVNILCBpbml0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGVtcHR5KGVudHJpZXMpO1xuICAgIHJlZ2lzdGVyKCk7XG5cbiAgICBpZiAoaXNTZXF1ZW50aWFsKSB7XG4gICAgICBsb2FkTmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmYoZXZlbnRzKTtcbiAgICAgIG9uKGV2ZW50cywgY2hlY2spO1xuICAgICAgY2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgICBDb21wb25lbnRzMi5TbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgIHF1ZXJ5QWxsKFNsaWRlLnNsaWRlLCBJTUFHRV9TRUxFQ1RPUikuZm9yRWFjaChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIHZhciBzcmMgPSBnZXRBdHRyaWJ1dGUoaW1nLCBTUkNfREFUQV9BVFRSSUJVVEUpO1xuICAgICAgICB2YXIgc3Jjc2V0ID0gZ2V0QXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKTtcblxuICAgICAgICBpZiAoc3JjICE9PSBpbWcuc3JjIHx8IHNyY3NldCAhPT0gaW1nLnNyY3NldCkge1xuICAgICAgICAgIHZhciBjbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzZXMuc3Bpbm5lcjtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gaW1nLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgdmFyIHNwaW5uZXIgPSBjaGlsZChwYXJlbnQsIFwiLlwiICsgY2xhc3NOYW1lKSB8fCBjcmVhdGUoXCJzcGFuXCIsIGNsYXNzTmFtZSwgcGFyZW50KTtcbiAgICAgICAgICBlbnRyaWVzLnB1c2goW2ltZywgU2xpZGUsIHNwaW5uZXJdKTtcbiAgICAgICAgICBpbWcuc3JjIHx8IGRpc3BsYXkoaW1nLCBcIm5vbmVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2soKSB7XG4gICAgZW50cmllcyA9IGVudHJpZXMuZmlsdGVyKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgZGlzdGFuY2UgPSBvcHRpb25zLnBlclBhZ2UgKiAoKG9wdGlvbnMucHJlbG9hZFBhZ2VzIHx8IDEpICsgMSkgLSAxO1xuICAgICAgcmV0dXJuIGRhdGFbMV0uaXNXaXRoaW4oU3BsaWRlMi5pbmRleCwgZGlzdGFuY2UpID8gbG9hZChkYXRhKSA6IHRydWU7XG4gICAgfSk7XG4gICAgZW50cmllcy5sZW5ndGggfHwgb2ZmKGV2ZW50cyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkKGRhdGEpIHtcbiAgICB2YXIgaW1nID0gZGF0YVswXTtcbiAgICBhZGRDbGFzcyhkYXRhWzFdLnNsaWRlLCBDTEFTU19MT0FESU5HKTtcbiAgICBiaW5kKGltZywgXCJsb2FkIGVycm9yXCIsIGFwcGx5KG9uTG9hZCwgZGF0YSkpO1xuICAgIHNldEF0dHJpYnV0ZShpbWcsIFwic3JjXCIsIGdldEF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSkpO1xuICAgIHNldEF0dHJpYnV0ZShpbWcsIFwic3Jjc2V0XCIsIGdldEF0dHJpYnV0ZShpbWcsIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSkpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTG9hZChkYXRhLCBlKSB7XG4gICAgdmFyIGltZyA9IGRhdGFbMF0sXG4gICAgICAgIFNsaWRlID0gZGF0YVsxXTtcbiAgICByZW1vdmVDbGFzcyhTbGlkZS5zbGlkZSwgQ0xBU1NfTE9BRElORyk7XG5cbiAgICBpZiAoZS50eXBlICE9PSBcImVycm9yXCIpIHtcbiAgICAgIHJlbW92ZShkYXRhWzJdKTtcbiAgICAgIGRpc3BsYXkoaW1nLCBcIlwiKTtcbiAgICAgIGVtaXQoRVZFTlRfTEFaWUxPQURfTE9BREVELCBpbWcsIFNsaWRlKTtcbiAgICAgIGVtaXQoRVZFTlRfUkVTSVpFKTtcbiAgICB9XG5cbiAgICBpc1NlcXVlbnRpYWwgJiYgbG9hZE5leHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWROZXh0KCkge1xuICAgIGVudHJpZXMubGVuZ3RoICYmIGxvYWQoZW50cmllcy5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGFwcGx5KGVtcHR5LCBlbnRyaWVzKSxcbiAgICBjaGVjazogY2hlY2tcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGFnaW5hdGlvbihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBlbWl0ID0gZXZlbnQuZW1pdCxcbiAgICAgIGJpbmQgPSBldmVudC5iaW5kO1xuICB2YXIgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzLFxuICAgICAgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIENvbnRyb2xsZXIgPSBDb21wb25lbnRzMi5Db250cm9sbGVyO1xuICB2YXIgaGFzRm9jdXMgPSBDb250cm9sbGVyLmhhc0ZvY3VzLFxuICAgICAgZ2V0SW5kZXggPSBDb250cm9sbGVyLmdldEluZGV4LFxuICAgICAgZ28gPSBDb250cm9sbGVyLmdvO1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBFbGVtZW50cy5wYWdpbmF0aW9uO1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgdmFyIGxpc3Q7XG4gIHZhciBwYWdpbmF0aW9uQ2xhc3NlcztcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0gsIEVWRU5UX0VORF9JTkRFWF9DSEFOR0VEXSwgbW91bnQpO1xuICAgIHZhciBlbmFibGVkID0gb3B0aW9ucy5wYWdpbmF0aW9uO1xuICAgIHBsYWNlaG9sZGVyICYmIGRpc3BsYXkocGxhY2Vob2xkZXIsIGVuYWJsZWQgPyBcIlwiIDogXCJub25lXCIpO1xuXG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIG9uKFtFVkVOVF9NT1ZFLCBFVkVOVF9TQ1JPTEwsIEVWRU5UX1NDUk9MTEVEXSwgdXBkYXRlKTtcbiAgICAgIGNyZWF0ZVBhZ2luYXRpb24oKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgICAgZW1pdChFVkVOVF9QQUdJTkFUSU9OX01PVU5URUQsIHtcbiAgICAgICAgbGlzdDogbGlzdCxcbiAgICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgICB9LCBnZXRBdChTcGxpZGUyLmluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAobGlzdCkge1xuICAgICAgcmVtb3ZlKHBsYWNlaG9sZGVyID8gc2xpY2UobGlzdC5jaGlsZHJlbikgOiBsaXN0KTtcbiAgICAgIHJlbW92ZUNsYXNzKGxpc3QsIHBhZ2luYXRpb25DbGFzc2VzKTtcbiAgICAgIGVtcHR5KGl0ZW1zKTtcbiAgICAgIGxpc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhZ2luYXRpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IFNwbGlkZTIubGVuZ3RoO1xuICAgIHZhciBjbGFzc2VzID0gb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBpMThuID0gb3B0aW9ucy5pMThuLFxuICAgICAgICBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgIHZhciBtYXggPSBoYXNGb2N1cygpID8gQ29udHJvbGxlci5nZXRFbmQoKSArIDEgOiBjZWlsKGxlbmd0aCAvIHBlclBhZ2UpO1xuICAgIGxpc3QgPSBwbGFjZWhvbGRlciB8fCBjcmVhdGUoXCJ1bFwiLCBjbGFzc2VzLnBhZ2luYXRpb24sIEVsZW1lbnRzLnRyYWNrLnBhcmVudEVsZW1lbnQpO1xuICAgIGFkZENsYXNzKGxpc3QsIHBhZ2luYXRpb25DbGFzc2VzID0gQ0xBU1NfUEFHSU5BVElPTiArIFwiLS1cIiArIGdldERpcmVjdGlvbigpKTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgUk9MRSwgXCJ0YWJsaXN0XCIpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBBUklBX0xBQkVMLCBpMThuLnNlbGVjdCk7XG4gICAgc2V0QXR0cmlidXRlKGxpc3QsIEFSSUFfT1JJRU5UQVRJT04sIGdldERpcmVjdGlvbigpID09PSBUVEIgPyBcInZlcnRpY2FsXCIgOiBcIlwiKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIHZhciBsaSA9IGNyZWF0ZShcImxpXCIsIG51bGwsIGxpc3QpO1xuICAgICAgdmFyIGJ1dHRvbiA9IGNyZWF0ZShcImJ1dHRvblwiLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnBhZ2UsXG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCJcbiAgICAgIH0sIGxpKTtcbiAgICAgIHZhciBjb250cm9scyA9IFNsaWRlcy5nZXRJbihpKS5tYXAoZnVuY3Rpb24gKFNsaWRlKSB7XG4gICAgICAgIHJldHVybiBTbGlkZS5zbGlkZS5pZDtcbiAgICAgIH0pO1xuICAgICAgdmFyIHRleHQgPSAhaGFzRm9jdXMoKSAmJiBwZXJQYWdlID4gMSA/IGkxOG4ucGFnZVggOiBpMThuLnNsaWRlWDtcbiAgICAgIGJpbmQoYnV0dG9uLCBcImNsaWNrXCIsIGFwcGx5KG9uQ2xpY2ssIGkpKTtcblxuICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbktleWJvYXJkKSB7XG4gICAgICAgIGJpbmQoYnV0dG9uLCBcImtleWRvd25cIiwgYXBwbHkob25LZXlkb3duLCBpKSk7XG4gICAgICB9XG5cbiAgICAgIHNldEF0dHJpYnV0ZShsaSwgUk9MRSwgXCJwcmVzZW50YXRpb25cIik7XG4gICAgICBzZXRBdHRyaWJ1dGUoYnV0dG9uLCBST0xFLCBcInRhYlwiKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIEFSSUFfQ09OVFJPTFMsIGNvbnRyb2xzLmpvaW4oXCIgXCIpKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIEFSSUFfTEFCRUwsIGZvcm1hdCh0ZXh0LCBpICsgMSkpO1xuICAgICAgc2V0QXR0cmlidXRlKGJ1dHRvbiwgVEFCX0lOREVYLCAtMSk7XG4gICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgbGk6IGxpLFxuICAgICAgICBidXR0b246IGJ1dHRvbixcbiAgICAgICAgcGFnZTogaVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhwYWdlKSB7XG4gICAgZ28oXCI+XCIgKyBwYWdlLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihwYWdlLCBlKSB7XG4gICAgdmFyIGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcbiAgICB2YXIga2V5ID0gbm9ybWFsaXplS2V5KGUpO1xuICAgIHZhciBkaXIgPSBnZXREaXJlY3Rpb24oKTtcbiAgICB2YXIgbmV4dFBhZ2UgPSAtMTtcblxuICAgIGlmIChrZXkgPT09IHJlc29sdmUoQVJST1dfUklHSFQsIGZhbHNlLCBkaXIpKSB7XG4gICAgICBuZXh0UGFnZSA9ICsrcGFnZSAlIGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19MRUZULCBmYWxzZSwgZGlyKSkge1xuICAgICAgbmV4dFBhZ2UgPSAoLS1wYWdlICsgbGVuZ3RoKSAlIGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJIb21lXCIpIHtcbiAgICAgIG5leHRQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJFbmRcIikge1xuICAgICAgbmV4dFBhZ2UgPSBsZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHZhciBpdGVtID0gaXRlbXNbbmV4dFBhZ2VdO1xuXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGZvY3VzKGl0ZW0uYnV0dG9uKTtcbiAgICAgIGdvKFwiPlwiICsgbmV4dFBhZ2UpO1xuICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMucGFnaW5hdGlvbkRpcmVjdGlvbiB8fCBvcHRpb25zLmRpcmVjdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEF0KGluZGV4KSB7XG4gICAgcmV0dXJuIGl0ZW1zW0NvbnRyb2xsZXIudG9QYWdlKGluZGV4KV07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHByZXYgPSBnZXRBdChnZXRJbmRleCh0cnVlKSk7XG4gICAgdmFyIGN1cnIgPSBnZXRBdChnZXRJbmRleCgpKTtcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICB2YXIgYnV0dG9uID0gcHJldi5idXR0b247XG4gICAgICByZW1vdmVDbGFzcyhidXR0b24sIENMQVNTX0FDVElWRSk7XG4gICAgICByZW1vdmVBdHRyaWJ1dGUoYnV0dG9uLCBBUklBX1NFTEVDVEVEKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIFRBQl9JTkRFWCwgLTEpO1xuICAgIH1cblxuICAgIGlmIChjdXJyKSB7XG4gICAgICB2YXIgX2J1dHRvbiA9IGN1cnIuYnV0dG9uO1xuICAgICAgYWRkQ2xhc3MoX2J1dHRvbiwgQ0xBU1NfQUNUSVZFKTtcbiAgICAgIHNldEF0dHJpYnV0ZShfYnV0dG9uLCBBUklBX1NFTEVDVEVELCB0cnVlKTtcbiAgICAgIHNldEF0dHJpYnV0ZShfYnV0dG9uLCBUQUJfSU5ERVgsIFwiXCIpO1xuICAgIH1cblxuICAgIGVtaXQoRVZFTlRfUEFHSU5BVElPTl9VUERBVEVELCB7XG4gICAgICBsaXN0OiBsaXN0LFxuICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgfSwgcHJldiwgY3Vycik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGl0ZW1zOiBpdGVtcyxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBnZXRBdDogZ2V0QXQsXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfTtcbn1cblxudmFyIFRSSUdHRVJfS0VZUyA9IFtcIiBcIiwgXCJFbnRlclwiXTtcblxuZnVuY3Rpb24gU3luYyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgaXNOYXZpZ2F0aW9uID0gb3B0aW9ucy5pc05hdmlnYXRpb24sXG4gICAgICBzbGlkZUZvY3VzID0gb3B0aW9ucy5zbGlkZUZvY3VzO1xuICB2YXIgZXZlbnRzID0gW107XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgU3BsaWRlMi5zcGxpZGVzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgaWYgKCF0YXJnZXQuaXNQYXJlbnQpIHtcbiAgICAgICAgc3luYyhTcGxpZGUyLCB0YXJnZXQuc3BsaWRlKTtcbiAgICAgICAgc3luYyh0YXJnZXQuc3BsaWRlLCBTcGxpZGUyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChpc05hdmlnYXRpb24pIHtcbiAgICAgIG5hdmlnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICBlbXB0eShldmVudHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgbW91bnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN5bmMoc3BsaWRlLCB0YXJnZXQpIHtcbiAgICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShzcGxpZGUpO1xuICAgIGV2ZW50Lm9uKEVWRU5UX01PVkUsIGZ1bmN0aW9uIChpbmRleCwgcHJldiwgZGVzdCkge1xuICAgICAgdGFyZ2V0LmdvKHRhcmdldC5pcyhMT09QKSA/IGRlc3QgOiBpbmRleCk7XG4gICAgfSk7XG4gICAgZXZlbnRzLnB1c2goZXZlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmF2aWdhdGUoKSB7XG4gICAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gICAgdmFyIG9uID0gZXZlbnQub247XG4gICAgb24oRVZFTlRfQ0xJQ0ssIG9uQ2xpY2spO1xuICAgIG9uKEVWRU5UX1NMSURFX0tFWURPV04sIG9uS2V5ZG93bik7XG4gICAgb24oW0VWRU5UX01PVU5URUQsIEVWRU5UX1VQREFURURdLCB1cGRhdGUpO1xuICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICBldmVudC5lbWl0KEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCwgU3BsaWRlMi5zcGxpZGVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBzZXRBdHRyaWJ1dGUoQ29tcG9uZW50czIuRWxlbWVudHMubGlzdCwgQVJJQV9PUklFTlRBVElPTiwgb3B0aW9ucy5kaXJlY3Rpb24gPT09IFRUQiA/IFwidmVydGljYWxcIiA6IFwiXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhTbGlkZSkge1xuICAgIFNwbGlkZTIuZ28oU2xpZGUuaW5kZXgpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25LZXlkb3duKFNsaWRlLCBlKSB7XG4gICAgaWYgKGluY2x1ZGVzKFRSSUdHRVJfS0VZUywgbm9ybWFsaXplS2V5KGUpKSkge1xuICAgICAgb25DbGljayhTbGlkZSk7XG4gICAgICBwcmV2ZW50KGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0dXA6IGFwcGx5KENvbXBvbmVudHMyLk1lZGlhLnNldCwge1xuICAgICAgc2xpZGVGb2N1czogaXNVbmRlZmluZWQoc2xpZGVGb2N1cykgPyBpc05hdmlnYXRpb24gOiBzbGlkZUZvY3VzXG4gICAgfSwgdHJ1ZSksXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgcmVtb3VudDogcmVtb3VudFxuICB9O1xufVxuXG5mdW5jdGlvbiBXaGVlbChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTIgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMi5iaW5kO1xuXG4gIHZhciBsYXN0VGltZSA9IDA7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKG9wdGlvbnMud2hlZWwpIHtcbiAgICAgIGJpbmQoQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2ssIFwid2hlZWxcIiwgb25XaGVlbCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uV2hlZWwoZSkge1xuICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgIHZhciBkZWx0YVkgPSBlLmRlbHRhWTtcbiAgICAgIHZhciBiYWNrd2FyZHMgPSBkZWx0YVkgPCAwO1xuICAgICAgdmFyIHRpbWVTdGFtcCA9IHRpbWVPZihlKTtcblxuICAgICAgdmFyIF9taW4gPSBvcHRpb25zLndoZWVsTWluVGhyZXNob2xkIHx8IDA7XG5cbiAgICAgIHZhciBzbGVlcCA9IG9wdGlvbnMud2hlZWxTbGVlcCB8fCAwO1xuXG4gICAgICBpZiAoYWJzKGRlbHRhWSkgPiBfbWluICYmIHRpbWVTdGFtcCAtIGxhc3RUaW1lID4gc2xlZXApIHtcbiAgICAgICAgU3BsaWRlMi5nbyhiYWNrd2FyZHMgPyBcIjxcIiA6IFwiPlwiKTtcbiAgICAgICAgbGFzdFRpbWUgPSB0aW1lU3RhbXA7XG4gICAgICB9XG5cbiAgICAgIHNob3VsZFByZXZlbnQoYmFja3dhcmRzKSAmJiBwcmV2ZW50KGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZFByZXZlbnQoYmFja3dhcmRzKSB7XG4gICAgcmV0dXJuICFvcHRpb25zLnJlbGVhc2VXaGVlbCB8fCBTcGxpZGUyLnN0YXRlLmlzKE1PVklORykgfHwgQ29tcG9uZW50czIuQ29udHJvbGxlci5nZXRBZGphY2VudChiYWNrd2FyZHMpICE9PSAtMTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50XG4gIH07XG59XG5cbnZhciBTUl9SRU1PVkFMX0RFTEFZID0gOTA7XG5cbmZ1bmN0aW9uIExpdmUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTEzID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTEzLm9uO1xuXG4gIHZhciB0cmFjayA9IENvbXBvbmVudHMyLkVsZW1lbnRzLnRyYWNrO1xuICB2YXIgZW5hYmxlZCA9IG9wdGlvbnMubGl2ZSAmJiAhb3B0aW9ucy5pc05hdmlnYXRpb247XG4gIHZhciBzciA9IGNyZWF0ZShcInNwYW5cIiwgQ0xBU1NfU1IpO1xuICB2YXIgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwoU1JfUkVNT1ZBTF9ERUxBWSwgYXBwbHkodG9nZ2xlLCBmYWxzZSkpO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICBkaXNhYmxlKCFDb21wb25lbnRzMi5BdXRvcGxheS5pc1BhdXNlZCgpKTtcbiAgICAgIHNldEF0dHJpYnV0ZSh0cmFjaywgQVJJQV9BVE9NSUMsIHRydWUpO1xuICAgICAgc3IudGV4dENvbnRlbnQgPSBcIlxcdTIwMjZcIjtcbiAgICAgIG9uKEVWRU5UX0FVVE9QTEFZX1BMQVksIGFwcGx5KGRpc2FibGUsIHRydWUpKTtcbiAgICAgIG9uKEVWRU5UX0FVVE9QTEFZX1BBVVNFLCBhcHBseShkaXNhYmxlLCBmYWxzZSkpO1xuICAgICAgb24oW0VWRU5UX01PVkVELCBFVkVOVF9TQ1JPTExFRF0sIGFwcGx5KHRvZ2dsZSwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZShhY3RpdmUpIHtcbiAgICBzZXRBdHRyaWJ1dGUodHJhY2ssIEFSSUFfQlVTWSwgYWN0aXZlKTtcblxuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgIGFwcGVuZCh0cmFjaywgc3IpO1xuICAgICAgaW50ZXJ2YWwuc3RhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKHNyKTtcbiAgICAgIGludGVydmFsLmNhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcmVtb3ZlQXR0cmlidXRlKHRyYWNrLCBbQVJJQV9MSVZFLCBBUklBX0FUT01JQywgQVJJQV9CVVNZXSk7XG4gICAgcmVtb3ZlKHNyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUoZGlzYWJsZWQpIHtcbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgc2V0QXR0cmlidXRlKHRyYWNrLCBBUklBX0xJVkUsIGRpc2FibGVkID8gXCJvZmZcIiA6IFwicG9saXRlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRpc2FibGU6IGRpc2FibGUsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG52YXIgQ29tcG9uZW50Q29uc3RydWN0b3JzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIE1lZGlhOiBNZWRpYSxcbiAgRGlyZWN0aW9uOiBEaXJlY3Rpb24sXG4gIEVsZW1lbnRzOiBFbGVtZW50cyxcbiAgU2xpZGVzOiBTbGlkZXMsXG4gIExheW91dDogTGF5b3V0LFxuICBDbG9uZXM6IENsb25lcyxcbiAgTW92ZTogTW92ZSxcbiAgQ29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgQXJyb3dzOiBBcnJvd3MsXG4gIEF1dG9wbGF5OiBBdXRvcGxheSxcbiAgQ292ZXI6IENvdmVyLFxuICBTY3JvbGw6IFNjcm9sbCxcbiAgRHJhZzogRHJhZyxcbiAgS2V5Ym9hcmQ6IEtleWJvYXJkLFxuICBMYXp5TG9hZDogTGF6eUxvYWQsXG4gIFBhZ2luYXRpb246IFBhZ2luYXRpb24sXG4gIFN5bmM6IFN5bmMsXG4gIFdoZWVsOiBXaGVlbCxcbiAgTGl2ZTogTGl2ZVxufSk7XG52YXIgSTE4TiA9IHtcbiAgcHJldjogXCJQcmV2aW91cyBzbGlkZVwiLFxuICBuZXh0OiBcIk5leHQgc2xpZGVcIixcbiAgZmlyc3Q6IFwiR28gdG8gZmlyc3Qgc2xpZGVcIixcbiAgbGFzdDogXCJHbyB0byBsYXN0IHNsaWRlXCIsXG4gIHNsaWRlWDogXCJHbyB0byBzbGlkZSAlc1wiLFxuICBwYWdlWDogXCJHbyB0byBwYWdlICVzXCIsXG4gIHBsYXk6IFwiU3RhcnQgYXV0b3BsYXlcIixcbiAgcGF1c2U6IFwiUGF1c2UgYXV0b3BsYXlcIixcbiAgY2Fyb3VzZWw6IFwiY2Fyb3VzZWxcIixcbiAgc2xpZGU6IFwic2xpZGVcIixcbiAgc2VsZWN0OiBcIlNlbGVjdCBhIHNsaWRlIHRvIHNob3dcIixcbiAgc2xpZGVMYWJlbDogXCIlcyBvZiAlc1wiXG59O1xudmFyIERFRkFVTFRTID0ge1xuICB0eXBlOiBcInNsaWRlXCIsXG4gIHJvbGU6IFwicmVnaW9uXCIsXG4gIHNwZWVkOiA0MDAsXG4gIHBlclBhZ2U6IDEsXG4gIGNsb25lU3RhdHVzOiB0cnVlLFxuICBhcnJvd3M6IHRydWUsXG4gIHBhZ2luYXRpb246IHRydWUsXG4gIHBhZ2luYXRpb25LZXlib2FyZDogdHJ1ZSxcbiAgaW50ZXJ2YWw6IDVlMyxcbiAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICBwYXVzZU9uRm9jdXM6IHRydWUsXG4gIHJlc2V0UHJvZ3Jlc3M6IHRydWUsXG4gIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC4yNSwgMSwgMC41LCAxKVwiLFxuICBkcmFnOiB0cnVlLFxuICBkaXJlY3Rpb246IFwibHRyXCIsXG4gIHRyaW1TcGFjZTogdHJ1ZSxcbiAgZm9jdXNhYmxlTm9kZXM6IFwiYSwgYnV0dG9uLCB0ZXh0YXJlYSwgaW5wdXQsIHNlbGVjdCwgaWZyYW1lXCIsXG4gIGxpdmU6IHRydWUsXG4gIGNsYXNzZXM6IENMQVNTRVMsXG4gIGkxOG46IEkxOE4sXG4gIHJlZHVjZWRNb3Rpb246IHtcbiAgICBzcGVlZDogMCxcbiAgICByZXdpbmRTcGVlZDogMCxcbiAgICBhdXRvcGxheTogXCJwYXVzZVwiXG4gIH1cbn07XG5cbmZ1bmN0aW9uIEZhZGUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcztcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBFdmVudEludGVyZmFjZShTcGxpZGUyKS5vbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfUkVGUkVTSF0sIGluaXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBTbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgIFNsaWRlLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgtXCIgKyAxMDAgKiBTbGlkZS5pbmRleCArIFwiJSlcIik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChpbmRleCwgZG9uZSkge1xuICAgIFNsaWRlcy5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IFwiICsgb3B0aW9ucy5zcGVlZCArIFwibXMgXCIgKyBvcHRpb25zLmVhc2luZyk7XG4gICAgbmV4dFRpY2soZG9uZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBzdGFydDogc3RhcnQsXG4gICAgY2FuY2VsOiBub29wXG4gIH07XG59XG5cbmZ1bmN0aW9uIFNsaWRlKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBNb3ZlID0gQ29tcG9uZW50czIuTW92ZSxcbiAgICAgIENvbnRyb2xsZXIgPSBDb21wb25lbnRzMi5Db250cm9sbGVyLFxuICAgICAgU2Nyb2xsID0gQ29tcG9uZW50czIuU2Nyb2xsO1xuICB2YXIgbGlzdCA9IENvbXBvbmVudHMyLkVsZW1lbnRzLmxpc3Q7XG4gIHZhciB0cmFuc2l0aW9uID0gYXBwbHkoc3R5bGUsIGxpc3QsIFwidHJhbnNpdGlvblwiKTtcbiAgdmFyIGVuZENhbGxiYWNrO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLmJpbmQobGlzdCwgXCJ0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IGxpc3QgJiYgZW5kQ2FsbGJhY2spIHtcbiAgICAgICAgY2FuY2VsKCk7XG4gICAgICAgIGVuZENhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChpbmRleCwgZG9uZSkge1xuICAgIHZhciBkZXN0aW5hdGlvbiA9IE1vdmUudG9Qb3NpdGlvbihpbmRleCwgdHJ1ZSk7XG4gICAgdmFyIHBvc2l0aW9uID0gTW92ZS5nZXRQb3NpdGlvbigpO1xuICAgIHZhciBzcGVlZCA9IGdldFNwZWVkKGluZGV4KTtcblxuICAgIGlmIChhYnMoZGVzdGluYXRpb24gLSBwb3NpdGlvbikgPj0gMSAmJiBzcGVlZCA+PSAxKSB7XG4gICAgICBpZiAob3B0aW9ucy51c2VTY3JvbGwpIHtcbiAgICAgICAgU2Nyb2xsLnNjcm9sbChkZXN0aW5hdGlvbiwgc3BlZWQsIGZhbHNlLCBkb25lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zaXRpb24oXCJ0cmFuc2Zvcm0gXCIgKyBzcGVlZCArIFwibXMgXCIgKyBvcHRpb25zLmVhc2luZyk7XG4gICAgICAgIE1vdmUudHJhbnNsYXRlKGRlc3RpbmF0aW9uLCB0cnVlKTtcbiAgICAgICAgZW5kQ2FsbGJhY2sgPSBkb25lO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBNb3ZlLmp1bXAoaW5kZXgpO1xuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICB0cmFuc2l0aW9uKFwiXCIpO1xuICAgIFNjcm9sbC5jYW5jZWwoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNwZWVkKGluZGV4KSB7XG4gICAgdmFyIHJld2luZFNwZWVkID0gb3B0aW9ucy5yZXdpbmRTcGVlZDtcblxuICAgIGlmIChTcGxpZGUyLmlzKFNMSURFKSAmJiByZXdpbmRTcGVlZCkge1xuICAgICAgdmFyIHByZXYgPSBDb250cm9sbGVyLmdldEluZGV4KHRydWUpO1xuICAgICAgdmFyIGVuZCA9IENvbnRyb2xsZXIuZ2V0RW5kKCk7XG5cbiAgICAgIGlmIChwcmV2ID09PSAwICYmIGluZGV4ID49IGVuZCB8fCBwcmV2ID49IGVuZCAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gcmV3aW5kU3BlZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnMuc3BlZWQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBzdGFydDogc3RhcnQsXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn1cblxudmFyIF9TcGxpZGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBfU3BsaWRlKHRhcmdldCwgb3B0aW9ucykge1xuICAgIHRoaXMuZXZlbnQgPSBFdmVudEludGVyZmFjZSgpO1xuICAgIHRoaXMuQ29tcG9uZW50cyA9IHt9O1xuICAgIHRoaXMuc3RhdGUgPSBTdGF0ZShDUkVBVEVEKTtcbiAgICB0aGlzLnNwbGlkZXMgPSBbXTtcbiAgICB0aGlzLl9vID0ge307XG4gICAgdGhpcy5fRSA9IHt9O1xuICAgIHZhciByb290ID0gaXNTdHJpbmcodGFyZ2V0KSA/IHF1ZXJ5KGRvY3VtZW50LCB0YXJnZXQpIDogdGFyZ2V0O1xuICAgIGFzc2VydChyb290LCByb290ICsgXCIgaXMgaW52YWxpZC5cIik7XG4gICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICBvcHRpb25zID0gbWVyZ2Uoe1xuICAgICAgbGFiZWw6IGdldEF0dHJpYnV0ZShyb290LCBBUklBX0xBQkVMKSB8fCBcIlwiLFxuICAgICAgbGFiZWxsZWRieTogZ2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfTEFCRUxMRURCWSkgfHwgXCJcIlxuICAgIH0sIERFRkFVTFRTLCBfU3BsaWRlLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRyeSB7XG4gICAgICBtZXJnZShvcHRpb25zLCBKU09OLnBhcnNlKGdldEF0dHJpYnV0ZShyb290LCBEQVRBX0FUVFJJQlVURSkpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBhc3NlcnQoZmFsc2UsIFwiSW52YWxpZCBKU09OXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX28gPSBPYmplY3QuY3JlYXRlKG1lcmdlKHt9LCBvcHRpb25zKSk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gX1NwbGlkZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLm1vdW50ID0gZnVuY3Rpb24gbW91bnQoRXh0ZW5zaW9ucywgVHJhbnNpdGlvbikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlLFxuICAgICAgICBDb21wb25lbnRzMiA9IHRoaXMuQ29tcG9uZW50cztcbiAgICBhc3NlcnQoc3RhdGUuaXMoW0NSRUFURUQsIERFU1RST1lFRF0pLCBcIkFscmVhZHkgbW91bnRlZCFcIik7XG4gICAgc3RhdGUuc2V0KENSRUFURUQpO1xuICAgIHRoaXMuX0MgPSBDb21wb25lbnRzMjtcbiAgICB0aGlzLl9UID0gVHJhbnNpdGlvbiB8fCB0aGlzLl9UIHx8ICh0aGlzLmlzKEZBREUpID8gRmFkZSA6IFNsaWRlKTtcbiAgICB0aGlzLl9FID0gRXh0ZW5zaW9ucyB8fCB0aGlzLl9FO1xuICAgIHZhciBDb25zdHJ1Y3RvcnMgPSBhc3NpZ24oe30sIENvbXBvbmVudENvbnN0cnVjdG9ycywgdGhpcy5fRSwge1xuICAgICAgVHJhbnNpdGlvbjogdGhpcy5fVFxuICAgIH0pO1xuICAgIGZvck93bihDb25zdHJ1Y3RvcnMsIGZ1bmN0aW9uIChDb21wb25lbnQsIGtleSkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IENvbXBvbmVudChfdGhpcywgQ29tcG9uZW50czIsIF90aGlzLl9vKTtcbiAgICAgIENvbXBvbmVudHMyW2tleV0gPSBjb21wb25lbnQ7XG4gICAgICBjb21wb25lbnQuc2V0dXAgJiYgY29tcG9uZW50LnNldHVwKCk7XG4gICAgfSk7XG4gICAgZm9yT3duKENvbXBvbmVudHMyLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICBjb21wb25lbnQubW91bnQgJiYgY29tcG9uZW50Lm1vdW50KCk7XG4gICAgfSk7XG4gICAgdGhpcy5lbWl0KEVWRU5UX01PVU5URUQpO1xuICAgIGFkZENsYXNzKHRoaXMucm9vdCwgQ0xBU1NfSU5JVElBTElaRUQpO1xuICAgIHN0YXRlLnNldChJRExFKTtcbiAgICB0aGlzLmVtaXQoRVZFTlRfUkVBRFkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5zeW5jID0gZnVuY3Rpb24gc3luYyhzcGxpZGUpIHtcbiAgICB0aGlzLnNwbGlkZXMucHVzaCh7XG4gICAgICBzcGxpZGU6IHNwbGlkZVxuICAgIH0pO1xuICAgIHNwbGlkZS5zcGxpZGVzLnB1c2goe1xuICAgICAgc3BsaWRlOiB0aGlzLFxuICAgICAgaXNQYXJlbnQ6IHRydWVcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmlzKElETEUpKSB7XG4gICAgICB0aGlzLl9DLlN5bmMucmVtb3VudCgpO1xuXG4gICAgICBzcGxpZGUuQ29tcG9uZW50cy5TeW5jLnJlbW91bnQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZ28gPSBmdW5jdGlvbiBnbyhjb250cm9sKSB7XG4gICAgdGhpcy5fQy5Db250cm9sbGVyLmdvKGNvbnRyb2wpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLm9uID0gZnVuY3Rpb24gb24oZXZlbnRzLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZXZlbnQub24oZXZlbnRzLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLm9mZiA9IGZ1bmN0aW9uIG9mZihldmVudHMpIHtcbiAgICB0aGlzLmV2ZW50Lm9mZihldmVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgIHZhciBfdGhpcyRldmVudDtcblxuICAgIChfdGhpcyRldmVudCA9IHRoaXMuZXZlbnQpLmVtaXQuYXBwbHkoX3RoaXMkZXZlbnQsIFtldmVudF0uY29uY2F0KHNsaWNlKGFyZ3VtZW50cywgMSkpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5hZGQgPSBmdW5jdGlvbiBhZGQoc2xpZGVzLCBpbmRleCkge1xuICAgIHRoaXMuX0MuU2xpZGVzLmFkZChzbGlkZXMsIGluZGV4KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUobWF0Y2hlcikge1xuICAgIHRoaXMuX0MuU2xpZGVzLnJlbW92ZShtYXRjaGVyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5pcyA9IGZ1bmN0aW9uIGlzKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fby50eXBlID09PSB0eXBlO1xuICB9O1xuXG4gIF9wcm90by5yZWZyZXNoID0gZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICB0aGlzLmVtaXQoRVZFTlRfUkVGUkVTSCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KGNvbXBsZXRlbHkpIHtcbiAgICBpZiAoY29tcGxldGVseSA9PT0gdm9pZCAwKSB7XG4gICAgICBjb21wbGV0ZWx5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50LFxuICAgICAgICBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoc3RhdGUuaXMoQ1JFQVRFRCkpIHtcbiAgICAgIEV2ZW50SW50ZXJmYWNlKHRoaXMpLm9uKEVWRU5UX1JFQURZLCB0aGlzLmRlc3Ryb3kuYmluZCh0aGlzLCBjb21wbGV0ZWx5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvck93bih0aGlzLl9DLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgIGNvbXBvbmVudC5kZXN0cm95ICYmIGNvbXBvbmVudC5kZXN0cm95KGNvbXBsZXRlbHkpO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgICBldmVudC5lbWl0KEVWRU5UX0RFU1RST1kpO1xuICAgICAgZXZlbnQuZGVzdHJveSgpO1xuICAgICAgY29tcGxldGVseSAmJiBlbXB0eSh0aGlzLnNwbGlkZXMpO1xuICAgICAgc3RhdGUuc2V0KERFU1RST1lFRCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX2NyZWF0ZUNsYXNzKF9TcGxpZGUsIFt7XG4gICAga2V5OiBcIm9wdGlvbnNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQob3B0aW9ucykge1xuICAgICAgdGhpcy5fQy5NZWRpYS5zZXQob3B0aW9ucywgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImxlbmd0aFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX0MuU2xpZGVzLmdldExlbmd0aCh0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5kZXhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9DLkNvbnRyb2xsZXIuZ2V0SW5kZXgoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gX1NwbGlkZTtcbn0oKTtcblxudmFyIFNwbGlkZSA9IF9TcGxpZGU7XG5TcGxpZGUuZGVmYXVsdHMgPSB7fTtcblNwbGlkZS5TVEFURVMgPSBTVEFURVM7XG52YXIgQ0xBU1NfUkVOREVSRUQgPSBcImlzLXJlbmRlcmVkXCI7XG52YXIgUkVOREVSRVJfREVGQVVMVF9DT05GSUcgPSB7XG4gIGxpc3RUYWc6IFwidWxcIixcbiAgc2xpZGVUYWc6IFwibGlcIlxufTtcblxudmFyIFN0eWxlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3R5bGUoaWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnN0eWxlcyA9IHt9O1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBTdHlsZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi5ydWxlID0gZnVuY3Rpb24gcnVsZShzZWxlY3RvciwgcHJvcCwgdmFsdWUsIGJyZWFrcG9pbnQpIHtcbiAgICBicmVha3BvaW50ID0gYnJlYWtwb2ludCB8fCBcImRlZmF1bHRcIjtcbiAgICB2YXIgc2VsZWN0b3JzID0gdGhpcy5zdHlsZXNbYnJlYWtwb2ludF0gPSB0aGlzLnN0eWxlc1ticmVha3BvaW50XSB8fCB7fTtcbiAgICB2YXIgc3R5bGVzID0gc2VsZWN0b3JzW3NlbGVjdG9yXSA9IHNlbGVjdG9yc1tzZWxlY3Rvcl0gfHwge307XG4gICAgc3R5bGVzW3Byb3BdID0gdmFsdWU7XG4gIH07XG5cbiAgX3Byb3RvMi5idWlsZCA9IGZ1bmN0aW9uIGJ1aWxkKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgICBpZiAodGhpcy5zdHlsZXMuZGVmYXVsdCkge1xuICAgICAgY3NzICs9IHRoaXMuYnVpbGRTZWxlY3RvcnModGhpcy5zdHlsZXMuZGVmYXVsdCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5zdHlsZXMpLnNvcnQoZnVuY3Rpb24gKG4sIG0pIHtcbiAgICAgIHJldHVybiBfdGhpczIub3B0aW9ucy5tZWRpYVF1ZXJ5ID09PSBcIm1pblwiID8gK24gLSArbSA6ICttIC0gK247XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoYnJlYWtwb2ludCkge1xuICAgICAgaWYgKGJyZWFrcG9pbnQgIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgIGNzcyArPSBcIkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IFwiICsgYnJlYWtwb2ludCArIFwicHgpIHtcIjtcbiAgICAgICAgY3NzICs9IF90aGlzMi5idWlsZFNlbGVjdG9ycyhfdGhpczIuc3R5bGVzW2JyZWFrcG9pbnRdKTtcbiAgICAgICAgY3NzICs9IFwifVwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjc3M7XG4gIH07XG5cbiAgX3Byb3RvMi5idWlsZFNlbGVjdG9ycyA9IGZ1bmN0aW9uIGJ1aWxkU2VsZWN0b3JzKHNlbGVjdG9ycykge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIGNzcyA9IFwiXCI7XG4gICAgZm9yT3duKHNlbGVjdG9ycywgZnVuY3Rpb24gKHN0eWxlcywgc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gKFwiI1wiICsgX3RoaXMzLmlkICsgXCIgXCIgKyBzZWxlY3RvcikudHJpbSgpO1xuICAgICAgY3NzICs9IHNlbGVjdG9yICsgXCIge1wiO1xuICAgICAgZm9yT3duKHN0eWxlcywgZnVuY3Rpb24gKHZhbHVlLCBwcm9wKSB7XG4gICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgIGNzcyArPSBwcm9wICsgXCI6IFwiICsgdmFsdWUgKyBcIjtcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjc3MgKz0gXCJ9XCI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNzcztcbiAgfTtcblxuICByZXR1cm4gU3R5bGU7XG59KCk7XG5cbnZhciBTcGxpZGVSZW5kZXJlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNwbGlkZVJlbmRlcmVyKGNvbnRlbnRzLCBvcHRpb25zLCBjb25maWcsIGRlZmF1bHRzKSB7XG4gICAgdGhpcy5zbGlkZXMgPSBbXTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gW107XG4gICAgbWVyZ2UoREVGQVVMVFMsIGRlZmF1bHRzIHx8IHt9KTtcbiAgICBtZXJnZShtZXJnZSh0aGlzLm9wdGlvbnMsIERFRkFVTFRTKSwgb3B0aW9ucyB8fCB7fSk7XG4gICAgdGhpcy5jb250ZW50cyA9IGNvbnRlbnRzO1xuICAgIHRoaXMuY29uZmlnID0gYXNzaWduKHt9LCBSRU5ERVJFUl9ERUZBVUxUX0NPTkZJRywgY29uZmlnIHx8IHt9KTtcbiAgICB0aGlzLmlkID0gdGhpcy5jb25maWcuaWQgfHwgdW5pcXVlSWQoXCJzcGxpZGVcIik7XG4gICAgdGhpcy5TdHlsZSA9IG5ldyBTdHlsZSh0aGlzLmlkLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuRGlyZWN0aW9uID0gRGlyZWN0aW9uKG51bGwsIG51bGwsIHRoaXMub3B0aW9ucyk7XG4gICAgYXNzZXJ0KHRoaXMuY29udGVudHMubGVuZ3RoLCBcIlByb3ZpZGUgYXQgbGVhc3QgMSBjb250ZW50LlwiKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIFNwbGlkZVJlbmRlcmVyLmNsZWFuID0gZnVuY3Rpb24gY2xlYW4oc3BsaWRlKSB7XG4gICAgdmFyIF9FdmVudEludGVyZmFjZTE0ID0gRXZlbnRJbnRlcmZhY2Uoc3BsaWRlKSxcbiAgICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UxNC5vbjtcblxuICAgIHZhciByb290ID0gc3BsaWRlLnJvb3Q7XG4gICAgdmFyIGNsb25lcyA9IHF1ZXJ5QWxsKHJvb3QsIFwiLlwiICsgQ0xBU1NfQ0xPTkUpO1xuICAgIG9uKEVWRU5UX01PVU5URUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlbW92ZShjaGlsZChyb290LCBcInN0eWxlXCIpKTtcbiAgICB9KTtcbiAgICByZW1vdmUoY2xvbmVzKTtcbiAgfTtcblxuICB2YXIgX3Byb3RvMyA9IFNwbGlkZVJlbmRlcmVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8zLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMucGFyc2VCcmVha3BvaW50cygpO1xuICAgIHRoaXMuaW5pdFNsaWRlcygpO1xuICAgIHRoaXMucmVnaXN0ZXJSb290U3R5bGVzKCk7XG4gICAgdGhpcy5yZWdpc3RlclRyYWNrU3R5bGVzKCk7XG4gICAgdGhpcy5yZWdpc3RlclNsaWRlU3R5bGVzKCk7XG4gICAgdGhpcy5yZWdpc3Rlckxpc3RTdHlsZXMoKTtcbiAgfTtcblxuICBfcHJvdG8zLmluaXRTbGlkZXMgPSBmdW5jdGlvbiBpbml0U2xpZGVzKCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgcHVzaCh0aGlzLnNsaWRlcywgdGhpcy5jb250ZW50cy5tYXAoZnVuY3Rpb24gKGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICBjb250ZW50ID0gaXNTdHJpbmcoY29udGVudCkgPyB7XG4gICAgICAgIGh0bWw6IGNvbnRlbnRcbiAgICAgIH0gOiBjb250ZW50O1xuICAgICAgY29udGVudC5zdHlsZXMgPSBjb250ZW50LnN0eWxlcyB8fCB7fTtcbiAgICAgIGNvbnRlbnQuYXR0cnMgPSBjb250ZW50LmF0dHJzIHx8IHt9O1xuXG4gICAgICBfdGhpczQuY292ZXIoY29udGVudCk7XG5cbiAgICAgIHZhciBjbGFzc2VzID0gX3RoaXM0Lm9wdGlvbnMuY2xhc3Nlcy5zbGlkZSArIFwiIFwiICsgKGluZGV4ID09PSAwID8gQ0xBU1NfQUNUSVZFIDogXCJcIik7XG4gICAgICBhc3NpZ24oY29udGVudC5hdHRycywge1xuICAgICAgICBjbGFzczogKGNsYXNzZXMgKyBcIiBcIiArIChjb250ZW50LmF0dHJzLmNsYXNzIHx8IFwiXCIpKS50cmltKCksXG4gICAgICAgIHN0eWxlOiBfdGhpczQuYnVpbGRTdHlsZXMoY29udGVudC5zdHlsZXMpXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pKTtcblxuICAgIGlmICh0aGlzLmlzTG9vcCgpKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlQ2xvbmVzKHRoaXMuc2xpZGVzKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5yZWdpc3RlclJvb3RTdHlsZXMgPSBmdW5jdGlvbiByZWdpc3RlclJvb3RTdHlsZXMoKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmMlswXSxcbiAgICAgICAgICBvcHRpb25zID0gX3JlZjJbMV07XG5cbiAgICAgIF90aGlzNS5TdHlsZS5ydWxlKFwiIFwiLCBcIm1heC13aWR0aFwiLCB1bml0KG9wdGlvbnMud2lkdGgpLCB3aWR0aCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZWdpc3RlclRyYWNrU3R5bGVzID0gZnVuY3Rpb24gcmVnaXN0ZXJUcmFja1N0eWxlcygpIHtcbiAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgIHZhciBTdHlsZTIgPSB0aGlzLlN0eWxlO1xuICAgIHZhciBzZWxlY3RvciA9IFwiLlwiICsgQ0xBU1NfVFJBQ0s7XG4gICAgdGhpcy5icmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjNbMF0sXG4gICAgICAgICAgb3B0aW9ucyA9IF9yZWYzWzFdO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIF90aGlzNi5yZXNvbHZlKFwicGFkZGluZ0xlZnRcIiksIF90aGlzNi5jc3NQYWRkaW5nKG9wdGlvbnMsIGZhbHNlKSwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIF90aGlzNi5yZXNvbHZlKFwicGFkZGluZ1JpZ2h0XCIpLCBfdGhpczYuY3NzUGFkZGluZyhvcHRpb25zLCB0cnVlKSwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwiaGVpZ2h0XCIsIF90aGlzNi5jc3NUcmFja0hlaWdodChvcHRpb25zKSwgd2lkdGgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMucmVnaXN0ZXJMaXN0U3R5bGVzID0gZnVuY3Rpb24gcmVnaXN0ZXJMaXN0U3R5bGVzKCkge1xuICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgdmFyIFN0eWxlMiA9IHRoaXMuU3R5bGU7XG4gICAgdmFyIHNlbGVjdG9yID0gXCIuXCIgKyBDTEFTU19MSVNUO1xuICAgIHRoaXMuYnJlYWtwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjQpIHtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWY0WzBdLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcmVmNFsxXTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcInRyYW5zZm9ybVwiLCBfdGhpczcuYnVpbGRUcmFuc2xhdGUob3B0aW9ucyksIHdpZHRoKTtcblxuICAgICAgaWYgKCFfdGhpczcuY3NzU2xpZGVIZWlnaHQob3B0aW9ucykpIHtcbiAgICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwiYXNwZWN0LXJhdGlvXCIsIF90aGlzNy5jc3NBc3BlY3RSYXRpbyhvcHRpb25zKSwgd2lkdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMucmVnaXN0ZXJTbGlkZVN0eWxlcyA9IGZ1bmN0aW9uIHJlZ2lzdGVyU2xpZGVTdHlsZXMoKSB7XG4gICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICB2YXIgU3R5bGUyID0gdGhpcy5TdHlsZTtcbiAgICB2YXIgc2VsZWN0b3IgPSBcIi5cIiArIENMQVNTX1NMSURFO1xuICAgIHRoaXMuYnJlYWtwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjUpIHtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWY1WzBdLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcmVmNVsxXTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcIndpZHRoXCIsIF90aGlzOC5jc3NTbGlkZVdpZHRoKG9wdGlvbnMpLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJoZWlnaHRcIiwgX3RoaXM4LmNzc1NsaWRlSGVpZ2h0KG9wdGlvbnMpIHx8IFwiMTAwJVwiLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgX3RoaXM4LnJlc29sdmUoXCJtYXJnaW5SaWdodFwiKSwgdW5pdChvcHRpb25zLmdhcCkgfHwgXCIwcHhcIiwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IgKyBcIiA+IGltZ1wiLCBcImRpc3BsYXlcIiwgb3B0aW9ucy5jb3ZlciA/IFwibm9uZVwiIDogXCJpbmxpbmVcIiwgd2lkdGgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRUcmFuc2xhdGUgPSBmdW5jdGlvbiBidWlsZFRyYW5zbGF0ZShvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzJERpcmVjdGlvbiA9IHRoaXMuRGlyZWN0aW9uLFxuICAgICAgICByZXNvbHZlID0gX3RoaXMkRGlyZWN0aW9uLnJlc29sdmUsXG4gICAgICAgIG9yaWVudCA9IF90aGlzJERpcmVjdGlvbi5vcmllbnQ7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhbHVlcy5wdXNoKHRoaXMuY3NzT2Zmc2V0Q2xvbmVzKG9wdGlvbnMpKTtcbiAgICB2YWx1ZXMucHVzaCh0aGlzLmNzc09mZnNldEdhcHMob3B0aW9ucykpO1xuXG4gICAgaWYgKHRoaXMuaXNDZW50ZXIob3B0aW9ucykpIHtcbiAgICAgIHZhbHVlcy5wdXNoKHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQoLTUwKSwgXCIlXCIpKTtcbiAgICAgIHZhbHVlcy5wdXNoLmFwcGx5KHZhbHVlcywgdGhpcy5jc3NPZmZzZXRDZW50ZXIob3B0aW9ucykpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXMuZmlsdGVyKEJvb2xlYW4pLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBcInRyYW5zbGF0ZVwiICsgcmVzb2x2ZShcIlhcIikgKyBcIihcIiArIHZhbHVlICsgXCIpXCI7XG4gICAgfSkuam9pbihcIiBcIik7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NPZmZzZXRDbG9uZXMgPSBmdW5jdGlvbiBjc3NPZmZzZXRDbG9uZXMob3B0aW9ucykge1xuICAgIHZhciBfdGhpcyREaXJlY3Rpb24yID0gdGhpcy5EaXJlY3Rpb24sXG4gICAgICAgIHJlc29sdmUgPSBfdGhpcyREaXJlY3Rpb24yLnJlc29sdmUsXG4gICAgICAgIG9yaWVudCA9IF90aGlzJERpcmVjdGlvbjIub3JpZW50O1xuICAgIHZhciBjbG9uZUNvdW50ID0gdGhpcy5nZXRDbG9uZUNvdW50KCk7XG5cbiAgICBpZiAodGhpcy5pc0ZpeGVkV2lkdGgob3B0aW9ucykpIHtcbiAgICAgIHZhciBfdGhpcyRwYXJzZUNzc1ZhbHVlID0gdGhpcy5wYXJzZUNzc1ZhbHVlKG9wdGlvbnNbcmVzb2x2ZShcImZpeGVkV2lkdGhcIildKSxcbiAgICAgICAgICB2YWx1ZSA9IF90aGlzJHBhcnNlQ3NzVmFsdWUudmFsdWUsXG4gICAgICAgICAgdW5pdDIgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlLnVuaXQ7XG5cbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KHZhbHVlKSAqIGNsb25lQ291bnQsIHVuaXQyKTtcbiAgICB9XG5cbiAgICB2YXIgcGVyY2VudCA9IDEwMCAqIGNsb25lQ291bnQgLyBvcHRpb25zLnBlclBhZ2U7XG4gICAgcmV0dXJuIG9yaWVudChwZXJjZW50KSArIFwiJVwiO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzT2Zmc2V0Q2VudGVyID0gZnVuY3Rpb24gY3NzT2Zmc2V0Q2VudGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMkRGlyZWN0aW9uMyA9IHRoaXMuRGlyZWN0aW9uLFxuICAgICAgICByZXNvbHZlID0gX3RoaXMkRGlyZWN0aW9uMy5yZXNvbHZlLFxuICAgICAgICBvcmllbnQgPSBfdGhpcyREaXJlY3Rpb24zLm9yaWVudDtcblxuICAgIGlmICh0aGlzLmlzRml4ZWRXaWR0aChvcHRpb25zKSkge1xuICAgICAgdmFyIF90aGlzJHBhcnNlQ3NzVmFsdWUyID0gdGhpcy5wYXJzZUNzc1ZhbHVlKG9wdGlvbnNbcmVzb2x2ZShcImZpeGVkV2lkdGhcIildKSxcbiAgICAgICAgICB2YWx1ZSA9IF90aGlzJHBhcnNlQ3NzVmFsdWUyLnZhbHVlLFxuICAgICAgICAgIHVuaXQyID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTIudW5pdDtcblxuICAgICAgcmV0dXJuIFt0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KHZhbHVlIC8gMiksIHVuaXQyKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhciBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlLFxuICAgICAgICBnYXAgPSBvcHRpb25zLmdhcDtcbiAgICB2YWx1ZXMucHVzaChvcmllbnQoNTAgLyBwZXJQYWdlKSArIFwiJVwiKTtcblxuICAgIGlmIChnYXApIHtcbiAgICAgIHZhciBfdGhpcyRwYXJzZUNzc1ZhbHVlMyA9IHRoaXMucGFyc2VDc3NWYWx1ZShnYXApLFxuICAgICAgICAgIF92YWx1ZSA9IF90aGlzJHBhcnNlQ3NzVmFsdWUzLnZhbHVlLFxuICAgICAgICAgIF91bml0ID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTMudW5pdDtcblxuICAgICAgdmFyIGdhcE9mZnNldCA9IChfdmFsdWUgLyBwZXJQYWdlIC0gX3ZhbHVlKSAvIDI7XG4gICAgICB2YWx1ZXMucHVzaCh0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KGdhcE9mZnNldCksIF91bml0KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICBfcHJvdG8zLmNzc09mZnNldEdhcHMgPSBmdW5jdGlvbiBjc3NPZmZzZXRHYXBzKG9wdGlvbnMpIHtcbiAgICB2YXIgY2xvbmVDb3VudCA9IHRoaXMuZ2V0Q2xvbmVDb3VudCgpO1xuXG4gICAgaWYgKGNsb25lQ291bnQgJiYgb3B0aW9ucy5nYXApIHtcbiAgICAgIHZhciBvcmllbnQgPSB0aGlzLkRpcmVjdGlvbi5vcmllbnQ7XG5cbiAgICAgIHZhciBfdGhpcyRwYXJzZUNzc1ZhbHVlNCA9IHRoaXMucGFyc2VDc3NWYWx1ZShvcHRpb25zLmdhcCksXG4gICAgICAgICAgdmFsdWUgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlNC52YWx1ZSxcbiAgICAgICAgICB1bml0MiA9IF90aGlzJHBhcnNlQ3NzVmFsdWU0LnVuaXQ7XG5cbiAgICAgIGlmICh0aGlzLmlzRml4ZWRXaWR0aChvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudCh2YWx1ZSAqIGNsb25lQ291bnQpLCB1bml0Mik7XG4gICAgICB9XG5cbiAgICAgIHZhciBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgICAgdmFyIGdhcHMgPSBjbG9uZUNvdW50IC8gcGVyUGFnZTtcbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KGdhcHMgKiB2YWx1ZSksIHVuaXQyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIjtcbiAgfTtcblxuICBfcHJvdG8zLnJlc29sdmUgPSBmdW5jdGlvbiByZXNvbHZlKHByb3ApIHtcbiAgICByZXR1cm4gY2FtZWxUb0tlYmFiKHRoaXMuRGlyZWN0aW9uLnJlc29sdmUocHJvcCkpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzUGFkZGluZyA9IGZ1bmN0aW9uIGNzc1BhZGRpbmcob3B0aW9ucywgcmlnaHQpIHtcbiAgICB2YXIgcGFkZGluZyA9IG9wdGlvbnMucGFkZGluZztcbiAgICB2YXIgcHJvcCA9IHRoaXMuRGlyZWN0aW9uLnJlc29sdmUocmlnaHQgPyBcInJpZ2h0XCIgOiBcImxlZnRcIiwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhZGRpbmcgJiYgdW5pdChwYWRkaW5nW3Byb3BdIHx8IChpc09iamVjdChwYWRkaW5nKSA/IDAgOiBwYWRkaW5nKSkgfHwgXCIwcHhcIjtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1RyYWNrSGVpZ2h0ID0gZnVuY3Rpb24gY3NzVHJhY2tIZWlnaHQob3B0aW9ucykge1xuICAgIHZhciBoZWlnaHQgPSBcIlwiO1xuXG4gICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICBoZWlnaHQgPSB0aGlzLmNzc0hlaWdodChvcHRpb25zKTtcbiAgICAgIGFzc2VydChoZWlnaHQsICdcImhlaWdodFwiIGlzIG1pc3NpbmcuJyk7XG4gICAgICBoZWlnaHQgPSBcImNhbGMoXCIgKyBoZWlnaHQgKyBcIiAtIFwiICsgdGhpcy5jc3NQYWRkaW5nKG9wdGlvbnMsIGZhbHNlKSArIFwiIC0gXCIgKyB0aGlzLmNzc1BhZGRpbmcob3B0aW9ucywgdHJ1ZSkgKyBcIilcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9O1xuXG4gIF9wcm90bzMuY3NzSGVpZ2h0ID0gZnVuY3Rpb24gY3NzSGVpZ2h0KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdW5pdChvcHRpb25zLmhlaWdodCk7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NTbGlkZVdpZHRoID0gZnVuY3Rpb24gY3NzU2xpZGVXaWR0aChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuYXV0b1dpZHRoID8gXCJcIiA6IHVuaXQob3B0aW9ucy5maXhlZFdpZHRoKSB8fCAodGhpcy5pc1ZlcnRpY2FsKCkgPyBcIlwiIDogdGhpcy5jc3NTbGlkZVNpemUob3B0aW9ucykpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzU2xpZGVIZWlnaHQgPSBmdW5jdGlvbiBjc3NTbGlkZUhlaWdodChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5maXhlZEhlaWdodCkgfHwgKHRoaXMuaXNWZXJ0aWNhbCgpID8gb3B0aW9ucy5hdXRvSGVpZ2h0ID8gXCJcIiA6IHRoaXMuY3NzU2xpZGVTaXplKG9wdGlvbnMpIDogdGhpcy5jc3NIZWlnaHQob3B0aW9ucykpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzU2xpZGVTaXplID0gZnVuY3Rpb24gY3NzU2xpZGVTaXplKG9wdGlvbnMpIHtcbiAgICB2YXIgZ2FwID0gdW5pdChvcHRpb25zLmdhcCk7XG4gICAgcmV0dXJuIFwiY2FsYygoMTAwJVwiICsgKGdhcCAmJiBcIiArIFwiICsgZ2FwKSArIFwiKS9cIiArIChvcHRpb25zLnBlclBhZ2UgfHwgMSkgKyAoZ2FwICYmIFwiIC0gXCIgKyBnYXApICsgXCIpXCI7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIGNzc0FzcGVjdFJhdGlvKG9wdGlvbnMpIHtcbiAgICB2YXIgaGVpZ2h0UmF0aW8gPSBvcHRpb25zLmhlaWdodFJhdGlvO1xuICAgIHJldHVybiBoZWlnaHRSYXRpbyA/IFwiXCIgKyAxIC8gaGVpZ2h0UmF0aW8gOiBcIlwiO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRDc3NWYWx1ZSA9IGZ1bmN0aW9uIGJ1aWxkQ3NzVmFsdWUodmFsdWUsIHVuaXQyKSB7XG4gICAgcmV0dXJuIFwiXCIgKyB2YWx1ZSArIHVuaXQyO1xuICB9O1xuXG4gIF9wcm90bzMucGFyc2VDc3NWYWx1ZSA9IGZ1bmN0aW9uIHBhcnNlQ3NzVmFsdWUodmFsdWUpIHtcbiAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICB2YXIgbnVtYmVyID0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcbiAgICAgIHZhciB1bml0MiA9IHZhbHVlLnJlcGxhY2UoL1xcZCooXFwuXFxkKik/LywgXCJcIikgfHwgXCJweFwiO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IG51bWJlcixcbiAgICAgICAgdW5pdDogdW5pdDJcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHVuaXQ6IFwicHhcIlxuICAgIH07XG4gIH07XG5cbiAgX3Byb3RvMy5wYXJzZUJyZWFrcG9pbnRzID0gZnVuY3Rpb24gcGFyc2VCcmVha3BvaW50cygpIHtcbiAgICB2YXIgX3RoaXM5ID0gdGhpcztcblxuICAgIHZhciBicmVha3BvaW50cyA9IHRoaXMub3B0aW9ucy5icmVha3BvaW50cztcbiAgICB0aGlzLmJyZWFrcG9pbnRzLnB1c2goW1wiZGVmYXVsdFwiLCB0aGlzLm9wdGlvbnNdKTtcblxuICAgIGlmIChicmVha3BvaW50cykge1xuICAgICAgZm9yT3duKGJyZWFrcG9pbnRzLCBmdW5jdGlvbiAob3B0aW9ucywgd2lkdGgpIHtcbiAgICAgICAgX3RoaXM5LmJyZWFrcG9pbnRzLnB1c2goW3dpZHRoLCBtZXJnZShtZXJnZSh7fSwgX3RoaXM5Lm9wdGlvbnMpLCBvcHRpb25zKV0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzMuaXNGaXhlZFdpZHRoID0gZnVuY3Rpb24gaXNGaXhlZFdpZHRoKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gISFvcHRpb25zW3RoaXMuRGlyZWN0aW9uLnJlc29sdmUoXCJmaXhlZFdpZHRoXCIpXTtcbiAgfTtcblxuICBfcHJvdG8zLmlzTG9vcCA9IGZ1bmN0aW9uIGlzTG9vcCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnR5cGUgPT09IExPT1A7XG4gIH07XG5cbiAgX3Byb3RvMy5pc0NlbnRlciA9IGZ1bmN0aW9uIGlzQ2VudGVyKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5mb2N1cyA9PT0gXCJjZW50ZXJcIikge1xuICAgICAgaWYgKHRoaXMuaXNMb29wKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudHlwZSA9PT0gU0xJREUpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLm9wdGlvbnMudHJpbVNwYWNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBfcHJvdG8zLmlzVmVydGljYWwgPSBmdW5jdGlvbiBpc1ZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBUVEI7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZENsYXNzZXMgPSBmdW5jdGlvbiBidWlsZENsYXNzZXMoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgcmV0dXJuIFtDTEFTU19ST09ULCBDTEFTU19ST09UICsgXCItLVwiICsgb3B0aW9ucy50eXBlLCBDTEFTU19ST09UICsgXCItLVwiICsgb3B0aW9ucy5kaXJlY3Rpb24sIG9wdGlvbnMuZHJhZyAmJiBDTEFTU19ST09UICsgXCItLWRyYWdnYWJsZVwiLCBvcHRpb25zLmlzTmF2aWdhdGlvbiAmJiBDTEFTU19ST09UICsgXCItLW5hdlwiLCBDTEFTU19BQ1RJVkUsICF0aGlzLmNvbmZpZy5oaWRkZW4gJiYgQ0xBU1NfUkVOREVSRURdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkQXR0cnMgPSBmdW5jdGlvbiBidWlsZEF0dHJzKGF0dHJzKSB7XG4gICAgdmFyIGF0dHIgPSBcIlwiO1xuICAgIGZvck93bihhdHRycywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGF0dHIgKz0gdmFsdWUgPyBcIiBcIiArIGNhbWVsVG9LZWJhYihrZXkpICsgXCI9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIiA6IFwiXCI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGF0dHIudHJpbSgpO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRTdHlsZXMgPSBmdW5jdGlvbiBidWlsZFN0eWxlcyhzdHlsZXMpIHtcbiAgICB2YXIgc3R5bGUgPSBcIlwiO1xuICAgIGZvck93bihzdHlsZXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBzdHlsZSArPSBcIiBcIiArIGNhbWVsVG9LZWJhYihrZXkpICsgXCI6XCIgKyB2YWx1ZSArIFwiO1wiO1xuICAgIH0pO1xuICAgIHJldHVybiBzdHlsZS50cmltKCk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZW5kZXJTbGlkZXMgPSBmdW5jdGlvbiByZW5kZXJTbGlkZXMoKSB7XG4gICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgdmFyIHRhZyA9IHRoaXMuY29uZmlnLnNsaWRlVGFnO1xuICAgIHJldHVybiB0aGlzLnNsaWRlcy5tYXAoZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBcIjxcIiArIHRhZyArIFwiIFwiICsgX3RoaXMxMC5idWlsZEF0dHJzKGNvbnRlbnQuYXR0cnMpICsgXCI+XCIgKyAoY29udGVudC5odG1sIHx8IFwiXCIpICsgXCI8L1wiICsgdGFnICsgXCI+XCI7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICBfcHJvdG8zLmNvdmVyID0gZnVuY3Rpb24gY292ZXIoY29udGVudCkge1xuICAgIHZhciBzdHlsZXMgPSBjb250ZW50LnN0eWxlcyxcbiAgICAgICAgX2NvbnRlbnQkaHRtbCA9IGNvbnRlbnQuaHRtbCxcbiAgICAgICAgaHRtbCA9IF9jb250ZW50JGh0bWwgPT09IHZvaWQgMCA/IFwiXCIgOiBfY29udGVudCRodG1sO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb3ZlciAmJiAhdGhpcy5vcHRpb25zLmxhenlMb2FkKSB7XG4gICAgICB2YXIgc3JjID0gaHRtbC5tYXRjaCgvPGltZy4qP3NyY1xccyo9XFxzKihbJ1wiXSkoLis/KVxcMS4qPz4vKTtcblxuICAgICAgaWYgKHNyYyAmJiBzcmNbMl0pIHtcbiAgICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSBcImNlbnRlci9jb3ZlciBuby1yZXBlYXQgdXJsKCdcIiArIHNyY1syXSArIFwiJylcIjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5nZW5lcmF0ZUNsb25lcyA9IGZ1bmN0aW9uIGdlbmVyYXRlQ2xvbmVzKGNvbnRlbnRzKSB7XG4gICAgdmFyIGNsYXNzZXMgPSB0aGlzLm9wdGlvbnMuY2xhc3NlcztcbiAgICB2YXIgY291bnQgPSB0aGlzLmdldENsb25lQ291bnQoKTtcbiAgICB2YXIgc2xpZGVzID0gY29udGVudHMuc2xpY2UoKTtcblxuICAgIHdoaWxlIChzbGlkZXMubGVuZ3RoIDwgY291bnQpIHtcbiAgICAgIHB1c2goc2xpZGVzLCBzbGlkZXMpO1xuICAgIH1cblxuICAgIHB1c2goc2xpZGVzLnNsaWNlKC1jb3VudCkucmV2ZXJzZSgpLCBzbGlkZXMuc2xpY2UoMCwgY291bnQpKS5mb3JFYWNoKGZ1bmN0aW9uIChjb250ZW50LCBpbmRleCkge1xuICAgICAgdmFyIGF0dHJzID0gYXNzaWduKHt9LCBjb250ZW50LmF0dHJzLCB7XG4gICAgICAgIGNsYXNzOiBjb250ZW50LmF0dHJzLmNsYXNzICsgXCIgXCIgKyBjbGFzc2VzLmNsb25lXG4gICAgICB9KTtcbiAgICAgIHZhciBjbG9uZSA9IGFzc2lnbih7fSwgY29udGVudCwge1xuICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgIH0pO1xuICAgICAgaW5kZXggPCBjb3VudCA/IGNvbnRlbnRzLnVuc2hpZnQoY2xvbmUpIDogY29udGVudHMucHVzaChjbG9uZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5nZXRDbG9uZUNvdW50ID0gZnVuY3Rpb24gZ2V0Q2xvbmVDb3VudCgpIHtcbiAgICBpZiAodGhpcy5pc0xvb3AoKSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgIGlmIChvcHRpb25zLmNsb25lcykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5jbG9uZXM7XG4gICAgICB9XG5cbiAgICAgIHZhciBwZXJQYWdlID0gbWF4LmFwcGx5KHZvaWQgMCwgdGhpcy5icmVha3BvaW50cy5tYXAoZnVuY3Rpb24gKF9yZWY2KSB7XG4gICAgICAgIHZhciBvcHRpb25zMiA9IF9yZWY2WzFdO1xuICAgICAgICByZXR1cm4gb3B0aW9uczIucGVyUGFnZTtcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBwZXJQYWdlICogKChvcHRpb25zLmZsaWNrTWF4UGFnZXMgfHwgMSkgKyAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfTtcblxuICBfcHJvdG8zLnJlbmRlckFycm93cyA9IGZ1bmN0aW9uIHJlbmRlckFycm93cygpIHtcbiAgICB2YXIgaHRtbCA9IFwiXCI7XG4gICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcIlwiICsgdGhpcy5vcHRpb25zLmNsYXNzZXMuYXJyb3dzICsgXCJcXFwiPlwiO1xuICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJBcnJvdyh0cnVlKTtcbiAgICBodG1sICs9IHRoaXMucmVuZGVyQXJyb3coZmFsc2UpO1xuICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICByZXR1cm4gaHRtbDtcbiAgfTtcblxuICBfcHJvdG8zLnJlbmRlckFycm93ID0gZnVuY3Rpb24gcmVuZGVyQXJyb3cocHJldikge1xuICAgIHZhciBfdGhpcyRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBjbGFzc2VzID0gX3RoaXMkb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBpMThuID0gX3RoaXMkb3B0aW9ucy5pMThuO1xuICAgIHZhciBhdHRycyA9IHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLmFycm93ICsgXCIgXCIgKyAocHJldiA/IGNsYXNzZXMucHJldiA6IGNsYXNzZXMubmV4dCksXG4gICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgYXJpYUxhYmVsOiBwcmV2ID8gaTE4bi5wcmV2IDogaTE4bi5uZXh0XG4gICAgfTtcbiAgICByZXR1cm4gXCI8YnV0dG9uIFwiICsgdGhpcy5idWlsZEF0dHJzKGF0dHJzKSArIFwiPjxzdmcgeG1sbnM9XFxcIlwiICsgWE1MX05BTUVfU1BBQ0UgKyBcIlxcXCIgdmlld0JveD1cXFwiMCAwIFwiICsgU0laRSArIFwiIFwiICsgU0laRSArIFwiXFxcIiB3aWR0aD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiIGhlaWdodD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiPjxwYXRoIGQ9XFxcIlwiICsgKHRoaXMub3B0aW9ucy5hcnJvd1BhdGggfHwgUEFUSCkgKyBcIlxcXCIgLz48L3N2Zz48L2J1dHRvbj5cIjtcbiAgfTtcblxuICBfcHJvdG8zLmh0bWwgPSBmdW5jdGlvbiBodG1sKCkge1xuICAgIHZhciBfdGhpcyRjb25maWcgPSB0aGlzLmNvbmZpZyxcbiAgICAgICAgcm9vdENsYXNzID0gX3RoaXMkY29uZmlnLnJvb3RDbGFzcyxcbiAgICAgICAgbGlzdFRhZyA9IF90aGlzJGNvbmZpZy5saXN0VGFnLFxuICAgICAgICBhcnJvd3MgPSBfdGhpcyRjb25maWcuYXJyb3dzLFxuICAgICAgICBiZWZvcmVUcmFjayA9IF90aGlzJGNvbmZpZy5iZWZvcmVUcmFjayxcbiAgICAgICAgYWZ0ZXJUcmFjayA9IF90aGlzJGNvbmZpZy5hZnRlclRyYWNrLFxuICAgICAgICBzbGlkZXIgPSBfdGhpcyRjb25maWcuc2xpZGVyLFxuICAgICAgICBiZWZvcmVTbGlkZXIgPSBfdGhpcyRjb25maWcuYmVmb3JlU2xpZGVyLFxuICAgICAgICBhZnRlclNsaWRlciA9IF90aGlzJGNvbmZpZy5hZnRlclNsaWRlcjtcbiAgICB2YXIgaHRtbCA9IFwiXCI7XG4gICAgaHRtbCArPSBcIjxkaXYgaWQ9XFxcIlwiICsgdGhpcy5pZCArIFwiXFxcIiBjbGFzcz1cXFwiXCIgKyB0aGlzLmJ1aWxkQ2xhc3NlcygpICsgXCIgXCIgKyAocm9vdENsYXNzIHx8IFwiXCIpICsgXCJcXFwiPlwiO1xuICAgIGh0bWwgKz0gXCI8c3R5bGU+XCIgKyB0aGlzLlN0eWxlLmJ1aWxkKCkgKyBcIjwvc3R5bGU+XCI7XG5cbiAgICBpZiAoc2xpZGVyKSB7XG4gICAgICBodG1sICs9IGJlZm9yZVNsaWRlciB8fCBcIlwiO1xuICAgICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcInNwbGlkZV9fc2xpZGVyXFxcIj5cIjtcbiAgICB9XG5cbiAgICBodG1sICs9IGJlZm9yZVRyYWNrIHx8IFwiXCI7XG5cbiAgICBpZiAoYXJyb3dzKSB7XG4gICAgICBodG1sICs9IHRoaXMucmVuZGVyQXJyb3dzKCk7XG4gICAgfVxuXG4gICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcInNwbGlkZV9fdHJhY2tcXFwiPlwiO1xuICAgIGh0bWwgKz0gXCI8XCIgKyBsaXN0VGFnICsgXCIgY2xhc3M9XFxcInNwbGlkZV9fbGlzdFxcXCI+XCI7XG4gICAgaHRtbCArPSB0aGlzLnJlbmRlclNsaWRlcygpO1xuICAgIGh0bWwgKz0gXCI8L1wiICsgbGlzdFRhZyArIFwiPlwiO1xuICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICBodG1sICs9IGFmdGVyVHJhY2sgfHwgXCJcIjtcblxuICAgIGlmIChzbGlkZXIpIHtcbiAgICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICAgIGh0bWwgKz0gYWZ0ZXJTbGlkZXIgfHwgXCJcIjtcbiAgICB9XG5cbiAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH07XG5cbiAgcmV0dXJuIFNwbGlkZVJlbmRlcmVyO1xufSgpO1xuXG5leHBvcnQgeyBDTEFTU0VTLCBDTEFTU19BQ1RJVkUsIENMQVNTX0FSUk9XLCBDTEFTU19BUlJPV1MsIENMQVNTX0FSUk9XX05FWFQsIENMQVNTX0FSUk9XX1BSRVYsIENMQVNTX0NMT05FLCBDTEFTU19DT05UQUlORVIsIENMQVNTX0ZPQ1VTX0lOLCBDTEFTU19JTklUSUFMSVpFRCwgQ0xBU1NfTElTVCwgQ0xBU1NfTE9BRElORywgQ0xBU1NfTkVYVCwgQ0xBU1NfT1ZFUkZMT1csIENMQVNTX1BBR0lOQVRJT04sIENMQVNTX1BBR0lOQVRJT05fUEFHRSwgQ0xBU1NfUFJFViwgQ0xBU1NfUFJPR1JFU1MsIENMQVNTX1BST0dSRVNTX0JBUiwgQ0xBU1NfUk9PVCwgQ0xBU1NfU0xJREUsIENMQVNTX1NQSU5ORVIsIENMQVNTX1NSLCBDTEFTU19UT0dHTEUsIENMQVNTX1RPR0dMRV9QQVVTRSwgQ0xBU1NfVE9HR0xFX1BMQVksIENMQVNTX1RSQUNLLCBDTEFTU19WSVNJQkxFLCBERUZBVUxUUywgRVZFTlRfQUNUSVZFLCBFVkVOVF9BUlJPV1NfTU9VTlRFRCwgRVZFTlRfQVJST1dTX1VQREFURUQsIEVWRU5UX0FVVE9QTEFZX1BBVVNFLCBFVkVOVF9BVVRPUExBWV9QTEFZLCBFVkVOVF9BVVRPUExBWV9QTEFZSU5HLCBFVkVOVF9DTElDSywgRVZFTlRfREVTVFJPWSwgRVZFTlRfRFJBRywgRVZFTlRfRFJBR0dFRCwgRVZFTlRfRFJBR0dJTkcsIEVWRU5UX0VORF9JTkRFWF9DSEFOR0VELCBFVkVOVF9ISURERU4sIEVWRU5UX0lOQUNUSVZFLCBFVkVOVF9MQVpZTE9BRF9MT0FERUQsIEVWRU5UX01PVU5URUQsIEVWRU5UX01PVkUsIEVWRU5UX01PVkVELCBFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQsIEVWRU5UX09WRVJGTE9XLCBFVkVOVF9QQUdJTkFUSU9OX01PVU5URUQsIEVWRU5UX1BBR0lOQVRJT05fVVBEQVRFRCwgRVZFTlRfUkVBRFksIEVWRU5UX1JFRlJFU0gsIEVWRU5UX1JFU0laRSwgRVZFTlRfUkVTSVpFRCwgRVZFTlRfU0NST0xMLCBFVkVOVF9TQ1JPTExFRCwgRVZFTlRfU0hJRlRFRCwgRVZFTlRfU0xJREVfS0VZRE9XTiwgRVZFTlRfVVBEQVRFRCwgRVZFTlRfVklTSUJMRSwgRXZlbnRCaW5kZXIsIEV2ZW50SW50ZXJmYWNlLCBGQURFLCBMT09QLCBMVFIsIFJUTCwgUmVxdWVzdEludGVydmFsLCBTTElERSwgU1RBVFVTX0NMQVNTRVMsIFNwbGlkZSwgU3BsaWRlUmVuZGVyZXIsIFN0YXRlLCBUVEIsIFRocm90dGxlLCBTcGxpZGUgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IFNwbGlkZSBmcm9tICdAc3BsaWRlanMvc3BsaWRlJztcclxuXHJcbmNvbnN0IEVMID0gJy5qcy1yZWZlcmVuY2VzJztcclxuY29uc3QgQUNUSVZFX0NMQVNTID0gJ2lzLWFjdGl2ZSc7XHJcblxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihFTCkpIHtcclxuICBjb25zdCBzbGlkZXIgPSBuZXcgU3BsaWRlKEVMLCB7XHJcbiAgICBwYWdpbmF0aW9uOiBmYWxzZSxcclxuICAgIGFycm93czogdHJ1ZSxcclxuICAgIHBlclBhZ2U6IDMsXHJcbiAgICBnYXA6IDMwLFxyXG4gICAgcGVyTW92ZTogMSxcclxuICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgIDEwMjQ6IHtcclxuICAgICAgICBwZXJQYWdlOiAyLFxyXG4gICAgICB9LFxyXG4gICAgICA3Njg6IHtcclxuICAgICAgICBwZXJQYWdlOiAxLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSkubW91bnQoKTtcclxufVxyXG4iLCJjbGFzcyBUYWJzIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuV0lER0VUID0gJy5qcy10YWJzJ1xyXG4gICAgdGhpcy5BQ1RJVkVDTEFTUyA9ICdjdXJyZW50J1xyXG5cclxuICAgIHRoaXMuZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuV0lER0VUKVxyXG5cclxuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgY29uc3QgbmF2ID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhYnMtbmF2ID4gKicpXHJcbiAgICAgIGNvbnN0IHNlbGVjdCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWJzLXNlbGVjdCcpXHJcblxyXG4gICAgICBuYXYuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyLCBmYWxzZSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmIChzZWxlY3QpIHtcclxuICAgICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5zZWxlY3RIYW5kbGVyLCBmYWxzZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmFjdGl2YXRlVGFiRnJvbVVSTCgpXHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZVRhYkZyb21VUkwoKSB7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXHJcbiAgICBjb25zdCB0YWJQYXJhbSA9IHVybFBhcmFtcy5nZXQoJ3RhYicpXHJcblxyXG4gICAgaWYgKHRhYlBhcmFtKSB7XHJcbiAgICAgIGNvbnN0IHRhYkluZGV4ID0gcGFyc2VJbnQodGFiUGFyYW0sIDEwKSAtIDFcclxuICAgICAgaWYgKCFpc05hTih0YWJJbmRleCkpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zd2l0Y2hUYWIod2lkZ2V0LCB0YWJJbmRleClcclxuICAgICAgICAgIGNvbnN0IG5hdiA9IHdpZGdldC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtdGFicy1uYXYgPiAqJylcclxuICAgICAgICAgIGlmIChuYXZbdGFiSW5kZXhdKSB7XHJcbiAgICAgICAgICAgIG5hdlt0YWJJbmRleF0uY2xhc3NMaXN0LmFkZCh0aGlzLkFDVElWRUNMQVNTKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsaWNrSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBidXR0b24gPSBlLmN1cnJlbnRUYXJnZXRcclxuICAgIGNvbnN0IHdpZGdldCA9IGJ1dHRvbi5jbG9zZXN0KHRoaXMuV0lER0VUKVxyXG5cclxuICAgIHRoaXMuc3dpdGNoVGFiKHdpZGdldCwgdGhpcy5nZXRJbmRleChidXR0b24pKVxyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5BQ1RJVkVDTEFTUylcclxuICB9XHJcblxyXG4gIHNlbGVjdEhhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ID0gZS5jdXJyZW50VGFyZ2V0XHJcbiAgICBjb25zdCB3aWRnZXQgPSBzZWxlY3QuY2xvc2VzdCh0aGlzLldJREdFVClcclxuXHJcbiAgICB0aGlzLnN3aXRjaFRhYih3aWRnZXQsIHNlbGVjdC5zZWxlY3RlZEluZGV4KVxyXG4gIH1cclxuXHJcbiAgc3dpdGNoVGFiID0gKHdpZGdldCwgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IHRhYnMgPSB3aWRnZXQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhYnMtbGlzdCA+IConKVxyXG5cclxuICAgIHRoaXMucmVzZXQod2lkZ2V0KVxyXG5cclxuICAgIHRhYnMuZm9yRWFjaCgodGFiKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmdldEluZGV4KHRhYikgPT09IGluZGV4KSB7XHJcbiAgICAgICAgdGFiLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Njcm9sbCcpKVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5kZXggPSAoZWwpID0+IHtcclxuICAgIHJldHVybiBbLi4uZWwucGFyZW50Tm9kZS5jaGlsZHJlbl0uaW5kZXhPZihlbClcclxuICB9XHJcblxyXG4gIHJlc2V0ID0gKHdpZGdldCkgPT4ge1xyXG4gICAgY29uc3QgbmF2ID0gd2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10YWJzLW5hdiA+IConKVxyXG4gICAgY29uc3QgdGFicyA9IHdpZGdldC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtdGFicy1saXN0ID4gKicpXHJcblxyXG4gICAgbmF2LmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkFDVElWRUNMQVNTKVxyXG4gICAgfSlcclxuXHJcbiAgICB0YWJzLmZvckVhY2goKHRhYikgPT4ge1xyXG4gICAgICB0YWIuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnaGlkZGVuJylcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5uZXcgVGFicygpXHJcbiIsIi8qKlxyXG4gKiBEcm9wZG93blxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIG1vYmlsZSBvbmx5XHJcbiAqIC0gYWRkIGNsYXNzIHRvIHBhcmVudCBvbiBjbGlja1xyXG4gKiAtIGFuZCBjbG9zZSBvdGhlcnMgb3BlbiBvbiBtb2JpbGVcclxuICovXHJcblxyXG5jb25zdCBXSURHRVQgPSAnLmRyb3Bkb3duJ1xyXG5jb25zdCBBQ1RJVkVDTEFTUyA9ICdpcy1vcGVuJ1xyXG5jb25zdCBJU19DT0FSU0UgPSBtYXRjaE1lZGlhKCcocG9pbnRlcjpjb2Fyc2UpJykubWF0Y2hlc1xyXG5cclxuZXhwb3J0IGNsYXNzIERyb3Bkb3duIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFdJREdFVClcclxuICB9XHJcblxyXG4gIGluaXQgPSAoKSA9PiB7XHJcbiAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICBjb25zdCBidXR0b24gPSBlbC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd25fX2J0bicpXHJcblxyXG4gICAgIGlmKGJ1dHRvbil7XHJcbiAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlciwgZmFsc2UpXHJcbiAgICAgfVxyXG4gIH0pXHJcbiAgfVxyXG5cclxuICBjbGlja0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZS5jdXJyZW50VGFyZ2V0XHJcbiAgICBjb25zdCB3aWRnZXQgPSBidXR0b24uY2xvc2VzdChXSURHRVQpXHJcblxyXG4gICAgaWYoIXdpZGdldC5jbGFzc0xpc3QuY29udGFpbnMoQUNUSVZFQ0xBU1MpKXtcclxuICAgICAgdGhpcy5jbG9zZUFjdGl2ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgd2lkZ2V0LmNsYXNzTGlzdC50b2dnbGUoQUNUSVZFQ0xBU1MpXHJcbiAgfVxyXG5cclxuICBjbG9zZUFjdGl2ZSA9ICgpID0+IHtcclxuICAgY29uc3Qgb3BlbkRyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLmlzLW9wZW4nKVxyXG5cclxuICAgaWYob3BlbkRyb3Bkb3duKXtcclxuICAgICBvcGVuRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpXHJcbiAgIH1cclxuICB9XHJcbn1cclxuXHJcbmlmKElTX0NPQVJTRSl7XHJcbiBjb25zdCBEcm9wZG93bk9iamVjdCA9IG5ldyBEcm9wZG93bigpXHJcbiBEcm9wZG93bk9iamVjdC5pbml0KClcclxufVxyXG4iXSwibmFtZXMiOlsiSVNNT0JJTEUiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIlRIUkVTSE9MRCIsIkxPQURfVEhSRVNIT0xEIiwiRUxFTUVOVFNfQ0xBU1MiLCJWSVNJQkxFX0NMQVNTIiwiQVVUT19DSElMRFJFTlMiLCJBbmltYXRlIiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJlbnRyaWVzIiwibWFwIiwiZW50cnkiLCJzZWN0aW9uIiwidGFyZ2V0IiwiZGVsYXkiLCJnZXREZWxheSIsInNlY3Rpb25Cb2R5Q2xhc3MiLCJnZXRBdHRyaWJ1dGUiLCJpc0ludGVyc2VjdGluZyIsImNsYXNzTGlzdCIsImFkZCIsImJvZHlDbGFzcyIsInNldFRpbWVvdXQiLCJpbmNsdWRlcyIsInBhcnNlSW50IiwiaHRtbGNsYXNzIiwidHlwZSIsImRvY3VtZW50IiwiYm9keSIsInJlbW92ZSIsImF1dG9fZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImdyb3VwIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJjaGlsZHJlbiIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwiY2hpbGQiLCJ2YWx1ZSIsImVyciIsImUiLCJmIiwic2VjdGlvbnMiLCJlbCIsIkJvdW5kaW5nQ2xpZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInZpc2libGVSYXRpbyIsImhlaWdodCIsImlubmVySGVpZ2h0IiwibG9hZE9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlQ2FsbGJhY2siLCJ0aHJlc2hvbGQiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsIm9ic2VydmVyVGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJFTEVNRU5UUyIsIlRvZ2dsZUJvZHlDbGFzcyIsImN1cnJlbnRUYXJnZXQiLCJjbGFzc2VzIiwiY2xhc3Nlc1JlbW92ZSIsInNwbGl0IiwiY2xhc3NOYW1lIiwidG9nZ2xlIiwiZWxlbWVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiU1RBUlRfT0ZGU0VUIiwiU1RBUlRfQ0xBU1MiLCJCT1RUT01fT0ZGU0VUIiwiQk9UVE9NX0NMQVNTIiwiU2Nyb2xsQ2xhc3MiLCJ0b3AiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJvZmZzZXRIZWlnaHQiLCJvbGRTY3JvbGwiLCJzY3JvbGxIYW5kbGVyIiwicGFzc2l2ZSIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiRUwiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVyIiwiU3BsaWRlIiwicGFnaW5hdGlvbiIsImFycm93cyIsInBlclBhZ2UiLCJnYXAiLCJwZXJNb3ZlIiwiYnJlYWtwb2ludHMiLCJtb3VudCIsIlRhYnMiLCJidXR0b24iLCJ3aWRnZXQiLCJjbG9zZXN0IiwiV0lER0VUIiwic3dpdGNoVGFiIiwiZ2V0SW5kZXgiLCJBQ1RJVkVDTEFTUyIsInNlbGVjdCIsInNlbGVjdGVkSW5kZXgiLCJpbmRleCIsInRhYnMiLCJyZXNldCIsInRhYiIsInJlbW92ZUF0dHJpYnV0ZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsIl90b0NvbnN1bWFibGVBcnJheSIsInBhcmVudE5vZGUiLCJpbmRleE9mIiwibmF2Iiwic2V0QXR0cmlidXRlIiwiY2xpY2tIYW5kbGVyIiwic2VsZWN0SGFuZGxlciIsImFjdGl2YXRlVGFiRnJvbVVSTCIsImtleSIsIl90aGlzMiIsInVybFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImxvY2F0aW9uIiwic2VhcmNoIiwidGFiUGFyYW0iLCJnZXQiLCJ0YWJJbmRleCIsImlzTmFOIiwiSVNfQ09BUlNFIiwiRHJvcGRvd24iLCJjb250YWlucyIsImNsb3NlQWN0aXZlIiwib3BlbkRyb3Bkb3duIiwiRHJvcGRvd25PYmplY3Qi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Q0EsSUFBSSxPQUFPLE9BQU8sSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7RUFDakMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7RUFDdEUsUUFBUSxHQUFHLEVBQUUsQ0FBQztFQUNkLFFBQVEsTUFBTTtFQUNkLE9BQU87RUFDUCxLQUFLO0FBQ0w7RUFDQSxJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3pDLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFO0VBQ3pCLElBQUksT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0VBQ2xFLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxNQUFNLENBQUMsS0FBSyxFQUFFO0VBQ3pCLElBQUksT0FBTyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLEdBQUcsVUFBVSxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksT0FBTyxDQUFDLENBQUM7RUFDN0csR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLE1BQU0sQ0FBQyxXQUFXLEVBQUU7RUFDL0IsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VBQzVDLElBQUksT0FBTyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDO0VBQzNELEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0VBQzNCLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxF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
