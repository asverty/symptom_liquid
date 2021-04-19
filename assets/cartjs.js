(function() {
    var Cart, CartJS, FORMAT_MONEY_WARNING, Item, processing, queue,
      __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
      __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  
    Cart = (function() {
      function Cart() {
        this.update = __bind(this.update, this);
      }
  
      Cart.prototype.update = function(cart) {
        var item, key, value;
        for (key in cart) {
          value = cart[key];
          if (key !== 'items') {
            this[key] = value;
          }
        }
        return this.items = (function() {
          var _i, _len, _ref, _results;
          _ref = cart.items;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            _results.push(new Item(item));
          }
          return _results;
        })();
      };
  
      return Cart;
  
    })();
  
    Item = (function() {
      function Item(item) {
        this.propertyArray = __bind(this.propertyArray, this);
        this.update = __bind(this.update, this);
        this.update(item);
      }
  
      Item.prototype.update = function(item) {
        var key, value;
        for (key in item) {
          value = item[key];
          if (key !== 'properties') {
            this[key] = value;
          }
        }
        return this.properties = CartJS.Utils.extend({}, item.properties);
      };
  
      Item.prototype.propertyArray = function() {
        var name, value, _ref, _results;
        _ref = this.properties;
        _results = [];
        for (name in _ref) {
          value = _ref[name];
          _results.push({
            name: name,
            value: value
          });
        }
        return _results;
      };
  
      return Item;
  
    })();
  
    CartJS = {
      settings: {
        debug: false,
        dataAPI: true,
        requestBodyClass: null,
        rivetsModels: {},
        currency: null,
        moneyFormat: null,
        moneyWithCurrencyFormat: null,
        weightUnit: 'g',
        weightPrecision: 0
      },
      cart: new Cart()
    };
  
    CartJS.init = function(cart, settings) {
      if (settings == null) {
        settings = {};
      }
      CartJS.configure(settings);
      CartJS.Utils.log('Initialising CartJS.');
      CartJS.cart.update(cart);
      if (CartJS.settings.dataAPI) {
        CartJS.Utils.log('"dataAPI" setting is true, initialising Data API.');
      }
      if (CartJS.settings.requestBodyClass) {
        CartJS.Utils.log('"requestBodyClass" set, adding event listeners.');
        document.addEventListener('cart.requestStarted', function() {
          return document.body.classList.add(CartJS.settings.requestBodyClass);
        });
        document.addEventListener('cart.requestComplete', function() {
          return document.body.classList.remove(CartJS.settings.requestBodyClass);
        });
      }
    };
  
    CartJS.configure = function(settings) {
      if (settings == null) {
        settings = {};
      }
      return CartJS.Utils.extend(CartJS.settings, settings);
    };
  
    if (window.console == null) {
      window.console = {};
      window.console.log = function() {};
    }
  
    FORMAT_MONEY_WARNING = 'A money formatting filter was used, but Shopify.formatMoney is not available. See the note "Dependency when formatting monetary values" on this page: https://cartjs.org/pages/guide#getting-started-setup.';
  
    CartJS.Utils = {
      log: function() {
        return CartJS.Utils.console(console.log, arguments);
      },
      warn: function() {
        return CartJS.Utils.console(console.warn, arguments);
      },
      error: function() {
        return CartJS.Utils.console(console.error, arguments);
      },
      console: function(method, args) {
        if (CartJS.settings.debug && (typeof console !== "undefined" && console !== null)) {
          args = Array.prototype.slice.call(args);
          args.unshift('[CartJS]:');
          return method.apply(console, args);
        }
      },
      wrapKeys: function(obj, type, override, skip) {
        var key, mappedKey, value, wrapped;
        if (type == null) {
          type = 'properties';
        }
        if (skip == null) {
          skip = [];
        }
        wrapped = {};
        for (key in obj) {
          value = obj[key];
          mappedKey = __indexOf.call(skip, key) >= 0 ? key : "" + type + "[" + key + "]";
          wrapped[mappedKey] = override != null ? override : value;
        }
        return wrapped;
      },
      unwrapKeys: function(obj, type, override) {
        var key, unwrapped, unwrappedKey, value;
        if (type == null) {
          type = 'properties';
        }
        unwrapped = {};
        for (key in obj) {
          value = obj[key];
          unwrappedKey = key.replace("" + type + "[", "").replace("]", "");
          unwrapped[unwrappedKey] = override != null ? override : value;
        }
        return unwrapped;
      },
      extend: function(object, properties) {
        var key, val;
        for (key in properties) {
          val = properties[key];
          object[key] = val;
        }
        return object;
      },
      clone: function(object) {
        var key, newInstance;
        if ((object == null) || typeof object !== 'object') {
          return object;
        }
        newInstance = new object.constructor();
        for (key in object) {
          newInstance[key] = clone(object[key]);
        }
        return newInstance;
      },
      "delete": function(object, key) {
        var val;
        val = object[key];
        delete object[key];
        return val;
      },
      isArray: Array.isArray || function(value) {
        return {}.toString.call(value) === '[object Array]';
      },
      ensureArray: function(value) {
        if (CartJS.Utils.isArray(value)) {
          return value;
        }
        if (value != null) {
          return [value];
        } else {
          return [];
        }
      },
      formatMoney: function(value, format, formatName, currency) {
        var _ref, _ref1;
        if (currency == null) {
          currency = '';
        }
        if (!currency) {
          currency = CartJS.settings.currency;
        }
        if ((window.Currency != null) && currency !== CartJS.settings.currency) {
          value = Currency.convert(value, CartJS.settings.currency, currency);
          if ((((_ref = window.Currency) != null ? _ref.moneyFormats : void 0) != null) && (currency in window.Currency.moneyFormats)) {
            format = window.Currency.moneyFormats[currency][formatName];
          }
        }
        if (((_ref1 = window.Shopify) != null ? _ref1.formatMoney : void 0) != null) {
          return Shopify.formatMoney(value, format);
        } else {
          CartJS.Utils.warn(FORMAT_MONEY_WARNING);
          return value;
        }
      },
      getSizedImageUrl: function(src, size) {
        var _ref, _ref1;
        if (((_ref = window.Shopify) != null ? (_ref1 = _ref.Image) != null ? _ref1.getSizedImageUrl : void 0 : void 0) != null) {
          if (src) {
            return Shopify.Image.getSizedImageUrl(src, size);
          } else {
            return Shopify.Image.getSizedImageUrl('https://cdn.shopify.com/s/images/admin/no-image-.gif', size).replace('-_', '-');
          }
        } else {
          if (src) {
            return src;
          } else {
            return 'https://cdn.shopify.com/s/images/admin/no-image-large.gif';
          }
        }
      }
    };
  
    queue = [];
  
    processing = false;
  
    CartJS.Queue = {
      add: function(url, data, options) {
        var request;
        if (options == null) {
          options = {};
        }
        request = {
          url: url,
          data: data,
          type: options.type || 'POST',
          dataType: options.dataType || 'json',
          cache: !!options.cache,
          success: CartJS.Utils.ensureArray(options.success),
          error: CartJS.Utils.ensureArray(options.error),
          complete: CartJS.Utils.ensureArray(options.complete)
        };
        if (options.updateCart) {
          request.success.push(CartJS.cart.update);
        }
        queue.push(request);
        if (processing) {
          return;
        }
        let event = new Event('cart.requestStarted');
        document.dispatchEvent(event);
        return CartJS.Queue.process();
      },
      process: function() {
        var params;
        if (!queue.length) {
            processing = false;
            let event = new Event('cart.requestComplete');
            document.dispatchEvent(event);
            return;
        }
        processing = true;
        params = queue.shift();
        params.complete = CartJS.Queue.process;
        return ajax(params);
      }
    };

    let ajax = (params) => {
      let url = params.url + ((/\?/).test(params.url) ? "&" : "?") + (new Date()).getTime();
      var request = new XMLHttpRequest();

      request.open(params.type, url, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
      request.onload = function () {
        try{
          var response = JSON.parse(this.response);
          console.log(response);
        }catch(e){
          if(params.error) params.error.forEach(fn => {fn(response)});

          return;
        }

        if (this.status >= 200 && this.status < 400) { 
          if(params.success) params.success.forEach(fn => {fn(response)});
          if(params.complete) params.complete(response); 
        } else {
          if(params.error) params.error.forEach(fn => {fn(response)});
        }
      };

      request.onerror = function() {
        var response = JSON.parse(this.response); 
        if(params.error) params.error.forEach(fn => {fn(response)});
      };

      let dataString = [];

      for (key in params.data) {
        dataString.push(encodeURI(key) + "=" + encodeURI(params.data[key])); 
      }

      request.send(dataString.join('&')); 

      return request;
    };
  
    CartJS.Core = {
      getCart: function(options) {
        if (options == null) {
          options = {};
        }
        options.type = 'GET';
        options.updateCart = true;
        return CartJS.Queue.add('/cart.js', {
          v: new Date().getTime()
        }, options);
      },
      addItem: function(id, quantity, properties, options) {
        var data;
        if (quantity == null) {
          quantity = 1;
        }
        if (properties == null) {
          properties = {};
        }
        if (options == null) {
          options = {};
        }
        data = CartJS.Utils.wrapKeys(properties, null, null, ['selling_plan']);
        data.id = id;
        data.quantity = quantity;
        CartJS.Queue.add('/cart/add.js', data, options);
        return CartJS.Core.getCart();
      },
      addItems: function(items, options) {
        var data;
        if (options == null) {
          options = {};
        }
        data = {
          items: items
        };
        CartJS.Queue.add('/cart/add.js', data, options);
        return CartJS.Core.getCart();
      },
      updateItem: function(line, quantity, properties, options) {
        var data;
        if (properties == null) {
          properties = {};
        }
        if (options == null) {
          options = {};
        }
        data = CartJS.Utils.wrapKeys(properties, null, null, ['selling_plan']);
        data.line = line;
        if (quantity != null) {
          data.quantity = quantity;
        }
        options.updateCart = true;
        return CartJS.Queue.add('/cart/change.js', data, options);
      },
      removeItem: function(line, options) {
        if (options == null) {
          options = {};
        }
        return CartJS.Core.updateItem(line, 0, {}, options);
      },
      updateItemById: function(id, quantity, properties, options) {
        var data;
        if (properties == null) {
          properties = {};
        }
        if (options == null) {
          options = {};
        }
        data = CartJS.Utils.wrapKeys(properties, null, null, ['selling_plan']);
        data.id = id;
        if (quantity != null) {
          data.quantity = quantity;
        }
        options.updateCart = true;
        return CartJS.Queue.add('/cart/change.js', data, options);
      },
      updateItemQuantitiesById: function(updates, options) {
        if (updates == null) {
          updates = {};
        }
        if (options == null) {
          options = {};
        }
        options.updateCart = true;
        return CartJS.Queue.add('/cart/update.js', {
          updates: updates
        }, options);
      },
      removeItemById: function(id, options) {
        var data;
        if (options == null) {
          options = {};
        }
        data = {
          id: id,
          quantity: 0
        };
        options.updateCart = true;
        return CartJS.Queue.add('/cart/change.js', data, options);
      },
      clear: function(options) {
        if (options == null) {
          options = {};
        }
        options.updateCart = true;
        return CartJS.Queue.add('/cart/clear.js', {}, options);
      },
      getAttribute: function(attributeName, defaultValue) {
        if (attributeName in CartJS.cart.attributes) {
          return CartJS.cart.attributes[attributeName];
        } else {
          return defaultValue;
        }
      },
      setAttribute: function(attributeName, value, options) {
        var attributes;
        if (options == null) {
          options = {};
        }
        attributes = {};
        attributes[attributeName] = value;
        return CartJS.Core.setAttributes(attributes, options);
      },
      getAttributes: function() {
        return CartJS.cart.attributes;
      },
      setAttributes: function(attributes, options) {
        if (attributes == null) {
          attributes = {};
        }
        if (options == null) {
          options = {};
        }
        options.updateCart = true;
        return CartJS.Queue.add('/cart/update.js', CartJS.Utils.wrapKeys(attributes, 'attributes'), options);
      },
      clearAttributes: function(options) {
        if (options == null) {
          options = {};
        }
        options.updateCart = true;
        return CartJS.Queue.add('/cart/update.js', CartJS.Utils.wrapKeys(CartJS.Core.getAttributes(), 'attributes', ''), options);
      },
      getNote: function() {
        return CartJS.cart.note;
      },
      setNote: function(note, options) {
        if (options == null) {
          options = {};
        }
        options.updateCart = true;
        return CartJS.Queue.add('/cart/update.js', {
          note: note
        }, options);
      }
    };
  
    CartJS.factory = function(exports) {
      exports.init = CartJS.init;
      exports.configure = CartJS.configure;
      exports.cart = CartJS.cart;
      exports.settings = CartJS.settings;
      exports.getCart = CartJS.Core.getCart;
      exports.addItem = CartJS.Core.addItem;
      exports.addItems = CartJS.Core.addItems;
      exports.updateItem = CartJS.Core.updateItem;
      exports.updateItemById = CartJS.Core.updateItemById;
      exports.updateItemQuantitiesById = CartJS.Core.updateItemQuantitiesById;
      exports.removeItem = CartJS.Core.removeItem;
      exports.removeItemById = CartJS.Core.removeItemById;
      exports.clear = CartJS.Core.clear;
      exports.getAttribute = CartJS.Core.getAttribute;
      exports.setAttribute = CartJS.Core.setAttribute;
      exports.getAttributes = CartJS.Core.getAttributes;
      exports.setAttributes = CartJS.Core.setAttributes;
      exports.clearAttributes = CartJS.Core.clearAttributes;
      exports.getNote = CartJS.Core.getNote;
      exports.setNote = CartJS.Core.setNote; 
    };
  
    if (typeof exports === 'object') {
      CartJS.factory(exports);
    } else if (typeof define === 'function' && define.amd) {
      define(['exports'], function(exports) {
        CartJS.factory(this.CartJS = exports);
        return exports;
      });
    } else {
      CartJS.factory(this.CartJS = {});
    }
  
  }).call(this);