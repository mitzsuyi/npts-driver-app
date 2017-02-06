"bundle";
(function() {
var define = System.amdDefine;
define("app/active-trip.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/cselect\"></require><require from=\"app/components/trips/trip-duration\"></require><div id=\"active-trip\" if.bind=\"completed\"><center><div class=\"content-block-title color-green\">Trip completed successfully.</div><div class=\"content-block\"><p class=\"color-green\">Continue with other <a class=\"pointer\" route-href=\"route: parties\">trips</a></p></div></center></div><div id=\"active-trip\" if.bind=\"!completed\"><div class=\"text-center\"><div class=\"col-auto\"><i class=\"f7-icons size-50\">time</i> <span id=\"start-time\"><trip-duration start-time.bind=\"app.appContext.tripStartTime\"></trip-duration></span></div></div><div class=\"content-block\"><div class=\"list-block media-list\" repeat.for=\"party of activeTripParties\"><ul class=\"no-top-bottom-border\"><li class=\"card\"><div class=\"card-content\"><div class=\"item-content\"><div class=\"item-media\" if.bind=\"hasMoreThanOneActiveTrips\"><a click.delegate=\"completeSingleTrip(party)\" type=\"button\" class=\"button button-raised\">Drop Off</a></div><div class=\"item-inner\"><div class=\"item-title-row\"><div class=\"item-title\">${party.partyName}</div><div class=\"item-after\">${party.partyNumber}</div></div><div class=\"item-subtitle\">${party.paddedNumber}</div><div class=\"item-text\"><div class=\"row\"><p>From: ${party.pickup}</p><p>To: ${party.destination}</p></div></div></div></div></div></li></ul></div></div><div class=\"content-block\"><div class=\"row text-center\"><div class=\"col-auto\"><a click.delegate=\"addParty()\" class=\"button button-raised button-round\">ADD PARTY</a></div><div class=\"col-auto\"><a click.delegate=\"endTrip()\" class=\"button button-raised button-round\">END TRIP</a></div></div></div></div></template>";
});

})();
'use strict';

System.register('app/active-trip.js', ['app/app-base', 'aurelia-router', 'app/models/trip', 'moment', 'local-storage', 'app/utils', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var AppBase, RedirectToRoute, TripModel, moment, ls, Utils, computedFrom, _createClass, _dec, _desc, _value, _class, ActiveTrip;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }, function (_aureliaRouter) {
      RedirectToRoute = _aureliaRouter.RedirectToRoute;
    }, function (_appModelsTrip) {
      TripModel = _appModelsTrip.TripModel;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_localStorage) {
      ls = _localStorage.default;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('ActiveTrip', ActiveTrip = (_dec = computedFrom("activeTripParties.length"), (_class = function (_AppBase) {
        _inherits(ActiveTrip, _AppBase);

        function ActiveTrip() {
          _classCallCheck(this, ActiveTrip);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args)));

          _this.completed = false;
          _this.tripAddPartyView = 'app/components/trips/trip-add-party';
          _this.confirmEndView = 'app/components/trips/confirm-end';
          return _this;
        }

        ActiveTrip.prototype.canActivate = function canActivate() {
          if (!this.app.appContext.driverHasActiveTrip()) {
            return new RedirectToRoute('parties');
          }
          this.activeTrip = new TripModel(this.app.appContext.activeTrip);
          return true;
        };

        ActiveTrip.prototype.activate = function activate() {
          var _this2 = this;

          var init = function init() {
            _this2.app.appContext.midTripPartyIds = [];
            if (!_this2.app.appContext.startTripPartyIds) {
              _this2.app.appContext.startTripPartyIds = [];
            }
            _this2.activeTripParties = _this2.app.appContext.reservedActiveParties.filter(function (party) {
              return _this2.app.appContext.startTripPartyIds.includes(party.id);
            });
            _this2.startTripParties = [].concat(_this2.activeTripParties);
            _this2.app.appContext.loadCurrentDriverShuttleId();
            _this2.app.appContext.endTrip = false;
            return _this2.app.appContext.loadLocations().then(function () {
              _this2.destinations = _this2.app.appContext.locations.filter(function (location) {
                return location.name != _this2.activeTrip.pickup;
              }).map(function (location) {
                return location.name;
              });
            });
          };
          var tripStartId = 'npts:trip-' + this.activeTrip.id;
          if (!this.app.appContext.reservedActiveParties) {
            return this.app.appContext.loadReservedActiveParties().then(function () {
              if (_this2.app.appContext.reservedActiveParties.length == 0) {
                _this2.app.router.navigateToRoute('parties').then(function () {
                  _this2.app.notifier.danger("No parties are available");
                });
              } else {
                _this2.app.appContext.tripStartTime = ls.get(tripStartId);
                if (!_this2.app.appContext.tripStartTime) {
                  _this2.app.appContext.tripStartTime = _this2.activeTrip.departureTime.utc;
                }
                return init();
              }
            });
          } else {
            this.app.appContext.tripStartTime = moment().unix();
            ls(tripStartId, this.app.appContext.tripStartTime);
            return init();
          }
        };

        ActiveTrip.prototype.canDeactivate = function canDeactivate() {
          if (!this.app.authContext.isAuthenticated) {
            return true;
          }
          return Array.isArray(this.app.appContext.reservedActiveParties) && this.app.appContext.reservedActiveParties.length > 0 && this.completed;
        };

        ActiveTrip.prototype.endTrip = function endTrip() {
          var _this3 = this;

          this.dialogOpen(this.confirmEndView, this.activeTrip, function () {
            if (!_this3.app.appContext.endTrip) return;
            var trip = _this3.activeTrip;
            var options = {};
            if (trip.destination) {
              options = { destination: trip.destination };
            }
            var endTripPartyIds = _this3.app.appContext.endTripPartyIds;
            options = Object.assign({}, options, { partyIds: endTripPartyIds });
            var driverId = _this3.app.authContext.currentUser.id;
            var api = _this3.app.api;
            api.completeTrip(driverId, trip.id, options).then(function () {
              _this3.completed = true;
              api.notifier.success("Trip completed successfully.");
            }).catch(function (err) {
              return api.notifier.danger(err);
            });
          });
        };

        ActiveTrip.prototype.completeSingleTrip = function completeSingleTrip(party) {
          var _this4 = this;

          var driverId = this.app.authContext.currentUser.id;
          var api = this.app.api;
          api.completeSingleTrip(driverId, party.departureTime, this.app.appContext.tripStartTime, party.pickup, party.destination, this.app.appContext.driverShuttleId, party.id).then(function () {
            var removeCompleted = function removeCompleted(completed, collection) {
              Utils.removeFromCollection(completed, collection);
            };
            removeCompleted(party, _this4.app.appContext.reservedActiveParties);
            removeCompleted(party, _this4.startTripParties);
            removeCompleted(party, _this4.activeTripParties);
            api.notifier.success("Party dropped off successfully.");
          }).catch(function (err) {
            api.notifier.danger(err);
          });
        };

        ActiveTrip.prototype.addParty = function addParty() {
          var _this5 = this;

          this.app.appContext.loadReservedActiveParties().then(function () {
            _this5.dialogOpen(_this5.tripAddPartyView, _this5.activeTrip, function () {
              var midTripParties = _this5.app.appContext.reservedActiveParties.filter(function (party) {
                return _this5.app.appContext.midTripPartyIds.includes(party.id);
              });
              if (midTripParties.length > 0) {
                _this5.activeTripParties = _this5.startTripParties.concat(midTripParties);
              }
            });
          });
        };

        ActiveTrip.prototype.dialogOpen = function dialogOpen(viewModel, model, callback) {
          this.app.appContext.showPopup(viewModel, model, callback);
        };

        _createClass(ActiveTrip, [{
          key: 'hasMoreThanOneActiveTrips',
          get: function get() {
            return this.activeTripParties.length > 1;
          }
        }]);

        return ActiveTrip;
      }(AppBase), _applyDecoratedDescriptor(_class.prototype, 'hasMoreThanOneActiveTrips', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'hasMoreThanOneActiveTrips'), _class.prototype), _class)));

      _export('ActiveTrip', ActiveTrip);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/app.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"./main-view\"></require><require from=\"./popup\"></require><require from=\"./n-popup\"></require><div class=\"statusbar-overlay\"></div><popup></popup><n-popup></n-popup><main-view if.bind=\"showMainView\" router.bind=\"router\" containerless></main-view><router-view if.bind=\"!showMainView\"></router-view></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/login.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"./login/pin.html\"></require><require from=\"./login/password.html\"></require><require from=\"app/components/submit\"></require><div class=\"view\"><div class=\"page\"><div class=\"page-content login-screen-content\"><div class=\"login-screen-title\">NPTS Shuttle App</div><form role=\"form\" submit.delegate=\"submit()\"><div class=\"content-block\"><pin model.bind=\"self\" locations.bind=\"locations\" if.bind=\"app.appContext.pinLogin\"></pin><password model.bind=\"self\" if.bind=\"!app.appContext.pinLogin\"></password><submit text=\"Login\"></submit><div class=\"list-block\"><ul><li class=\"item-content\" if.bind=\"app.appContext.pinLogin\"><div class=\"item-inner\"><a click.delegate=\"loginWithPassword()\" class=\"pointer\">Login with Username and Password</a></div></li><li class=\"item-content\" if.bind=\"!app.appContext.pinLogin\"><div class=\"item-inner\"><a click.delegate=\"loginWithPin()\" class=\"pointer\">Login with Pin</a></div></li></ul></div></div></form></div></div></div></template>";
});

})();
'use strict';

System.register('app/auth/login.js', ['app/auth-service', 'aurelia-framework', 'app/app', 'app/bootstrap', 'app/utils', 'app/collection'], function (_export, _context) {
  "use strict";

  var AuthService, inject, App, Bootstrap, Utils, Collection, _dec, _class, loginMethod, Login;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appAuthService) {
      AuthService = _appAuthService.AuthService;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appApp) {
      App = _appApp.App;
    }, function (_appBootstrap) {
      Bootstrap = _appBootstrap.Bootstrap;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appCollection) {
      Collection = _appCollection.Collection;
    }],
    execute: function () {
      loginMethod = function loginMethod() {
        var isPinLogin = this.app.appContext.pinLogin;
        if (isPinLogin) {
          return this.authService.pinLogin(this.locationId, this.pin);
        } else {
          return this.authService.passwordLogin(this.username, this.password);
        }
      };

      _export('Login', Login = (_dec = inject(App, AuthService), _dec(_class = function (_Bootstrap) {
        _inherits(Login, _Bootstrap);

        function Login(app, authService) {
          _classCallCheck(this, Login);

          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _Bootstrap.call.apply(_Bootstrap, [this].concat(args)));

          _this.pin = '';
          _this.username = '';
          _this.password = '';
          _this.self = _this;

          _this.app = app;
          _this.router = app.router;
          _this.authService = authService;
          return _this;
        }

        Login.prototype.activate = function activate() {
          if (Utils.isNullOrUndefined(this.app.appContext.pinLogin)) {
            this.app.appContext.pinLogin = true;
          }
        };

        Login.prototype.loginWithPassword = function loginWithPassword() {
          this.app.appContext.pinLogin = false;
        };

        Login.prototype.loginWithPin = function loginWithPin() {
          this.app.appContext.pinLogin = true;
        };

        Login.prototype.login = function login() {
          var _this2 = this;

          var doLogin = function doLogin() {
            loginMethod.call(_this2).then(function (response) {

              _this2.router.navigateToRoute("home");
            }).catch(function (err) {
              var errMessage = "Login failed...";
              if (err && err.message) {
                errMessage = err.message;
              }
              _this2.app.notifier.danger(errMessage);
            });
          };
          if (this.app.authContext.isAuthenticated) {
            this.authService.logout().then(function () {
              doLogin();
            });
          } else {
            doLogin();
          }
        };

        Login.prototype.submitSuccess = function submitSuccess() {
          var _this3 = this;

          return function () {
            return _this3.login();
          };
        };

        Login.prototype.formValidationRules = function formValidationRules(rules) {
          return rules.ensure(function (a) {
            return a.username;
          }).required().ensure(function (a) {
            return a.pin;
          }).required().ensure(function (a) {
            return a.password;
          }).required();
        };

        return Login;
      }(Bootstrap)) || _class));

      _export('Login', Login);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/login/password.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"model\"><div class=\"list-block\"><ul><li class=\"item-content\"><div class=\"item-media\"><i class=\"icon icon-form-name\"></i></div><div class=\"item-inner\"><div class=\"item-input\"><input type=\"text\" value.bind=\"model.username & validate\" placeholder=\"Username\"></div></div></li><li class=\"item-content\"><div class=\"item-media\"><i class=\"icon icon-form-password\"></i></div><div class=\"item-inner\"><div class=\"item-input\"><input type=\"password\" value.bind=\"model.password & validate\" placeholder=\"Password\"></div></div></li><li class=\"item-content\"><div class=\"item-inner\"><a class=\"pointer\" route-href=\"route: reset-password-request\">Forgot Password?</a></div></li></ul></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/login/pin.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"model\"><div class=\"list-block\"><ul><li class=\"item-content\"><div class=\"item-media\"><i class=\"icon icon-form-password\"></i></div><div class=\"item-inner\"><div class=\"item-input\"><input type=\"password\" value.bind=\"model.pin & validate\" placeholder=\"Enter Pin\"></div></div></li><li class=\"item-content\"><div class=\"item-inner\"><a class=\"pointer\" route-href=\"route: reset-pin-request\">Forgot Pin?</a></div></li></ul></div></template>";
});

})();
'use strict';

System.register('app/auth/logout.js', ['aurelia-framework', 'app/app', 'app/auth-context'], function (_export, _context) {
  "use strict";

  var inject, App, AuthContext, _dec, _class, Logout;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appApp) {
      App = _appApp.App;
    }, function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }],
    execute: function () {
      _export('Logout', Logout = (_dec = inject(App, AuthContext), _dec(_class = function () {
        function Logout(app, authContext) {
          _classCallCheck(this, Logout);

          this.app = app;
          this.authContext = authContext;
        }

        Logout.prototype.canActivate = function canActivate() {
          return this.authContext.isAuthenticated();
        };

        Logout.prototype.activate = function activate() {
          return this.app.logout();
        };

        return Logout;
      }()) || _class));

      _export('Logout', Logout);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-password-confirm.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"./reset-password/confirm-failed.html\"></require><require from=\"./reset-password/request-confirmed\"></require><require from=\"./reset-password/reset-success.html\"></require><require from=\"./reset-password/reset-failed.html\"></require><div class=\"view\"><div class=\"page\"><div class=\"page-content\"><div class=\"login-screen-title\"><a route-href=\"route: home\">${router.title}</a></div><request-confirmed actions.bind=\"onSuccess\" if.bind=\"requestConfirmed\"></request-confirmed><confirm-failed confirm-failed-reason.bind=\"confirmFailedReason\" if.bind=\"confirmFailed\"></confirm-failed><reset-success if.bind=\"resetSuccess\"></reset-success><reset-failed reset-failed-reason.bind=\"resetFailedReason\" if.bind=\"resetFailed\"></reset-failed></div></div></div></template>";
});

})();
'use strict';

System.register('app/auth/reset-password-confirm.js', ['aurelia-framework', 'app/app'], function (_export, _context) {
  "use strict";

  var computedFrom, inject, App, _createClass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, ResetPasswordConfirm;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
      inject = _aureliaFramework.inject;
    }, function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('ResetPasswordConfirm', ResetPasswordConfirm = (_dec = inject(App), _dec2 = computedFrom("status"), _dec3 = computedFrom("status"), _dec4 = computedFrom("status"), _dec5 = computedFrom("status"), _dec6 = computedFrom("status"), _dec(_class = (_class2 = function () {
        function ResetPasswordConfirm(app) {
          var _this = this;

          _classCallCheck(this, ResetPasswordConfirm);

          this.onSuccess = {
            success: function success(form) {
              return _this.resetPassword(form);
            }
          };

          this.app = app;
          this.router = app.router;
        }

        ResetPasswordConfirm.prototype.activate = function activate(params) {
          var _this2 = this;

          this.token = params.token;
          return this.app.api.confirmResetPasswordRequest(this.token).then(function (result) {
            _this2.status = "requestConfirmed";
          }).catch(function (err) {
            _this2.status = "confirmFailed";
            _this2.confirmFailedReason = err;
          });
        };

        ResetPasswordConfirm.prototype.resetPassword = function resetPassword(form) {
          var _this3 = this;

          this.app.api.resetPassword(form.password, this.token).then(function (result) {
            _this3.status = "resetSuccess";
          }).catch(function (err) {
            _this3.resetFailedReason = err;
            _this3.status = "resetFailed";
          });
        };

        _createClass(ResetPasswordConfirm, [{
          key: 'resetFailed',
          get: function get() {
            return this.status == "resetFailed";
          }
        }, {
          key: 'requestConfirmed',
          get: function get() {
            return this.status == "requestConfirmed";
          }
        }, {
          key: 'confirmFailed',
          get: function get() {
            return this.status == "confirmFailed";
          }
        }, {
          key: 'resetSuccess',
          get: function get() {
            return this.status == "resetSuccess";
          }
        }]);

        return ResetPasswordConfirm;
      }(), (_applyDecoratedDescriptor(_class2.prototype, 'resetFailed', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetFailed'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'requestConfirmed', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'requestConfirmed'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'confirmFailed', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'confirmFailed'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetSuccess', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetSuccess'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetFailed', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetFailed'), _class2.prototype)), _class2)) || _class));

      _export('ResetPasswordConfirm', ResetPasswordConfirm);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-password-request.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/submit\"></require><require from=\"./reset-password/request-form\"></require><require from=\"./reset-password/request-success.html\"></require><div class=\"view\"><div class=\"page\"><div class=\"page-content\"><div class=\"login-screen-title\"><a route-href=\"route: home\">${router.title}</a></div><request-form if.bind=\"!resetRequestSuccess\" actions.bind=\"onSuccess\"></request-form><request-success if.bind=\"resetRequestSuccess\"></request-success></div></div></div></template>";
});

})();
'use strict';

System.register('app/auth/reset-password-request.js', ['aurelia-framework', 'app/app'], function (_export, _context) {
  "use strict";

  var inject, App, _dec, _class, ResetPasswordRequest;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _export('ResetPasswordRequest', ResetPasswordRequest = (_dec = inject(App), _dec(_class = function () {
        function ResetPasswordRequest(app) {
          var _this = this;

          _classCallCheck(this, ResetPasswordRequest);

          this.resetRequestSuccess = false;
          this.onSuccess = {
            success: function success() {
              return _this.requestResetPassword();
            }
          };

          this.app = app;
          this.router = app.router;
        }

        ResetPasswordRequest.prototype.requestResetPassword = function requestResetPassword() {
          var _this2 = this;

          this.app.api.requestResetPassword(this.username).then(function (result) {
            _this2.resetRequestSuccess = true;
          }).catch(function (err) {
            _this2.app.notifier.danger(err);
          });
        };

        return ResetPasswordRequest;
      }()) || _class));

      _export('ResetPasswordRequest', ResetPasswordRequest);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-password/confirm-failed.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"confirmFailedReason\"><div class=\"content-block-title\">Confirmation Failed</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><p class=\"color-red\">${confirmFailedReason}</p></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/reset-password/request-confirmed.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/submit\"></require><div class=\"content-block-title\">Change Password</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><form><div class=\"list-block\"><ul><li class=\"item-content\"><div class=\"item-inner\"><p class=\"color-green\">Your request has been confirmed, submit the form below to change your password.</p></div></li><li class=\"item-content\"><div class=\"item-media\"><i class=\"icon icon-form-password\"></i></div><div class=\"item-inner\"><div class=\"item-input\"><input type=\"password\" value.bind=\"password & validate\" placeholder=\"New Password\"></div></div></li><li class=\"item-content\"><div class=\"item-media\"><i class=\"icon icon-form-password\"></i></div><div class=\"item-inner\"><div class=\"item-input\"><input type=\"password\" value.bind=\"confirmPassword & validate\" placeholder=\"Confirm Password\"></div></div></li></ul></div></form></div></div></div><div class=\"content-block\"><submit text=\"Change Password\"></submit></div></template>";
});

})();
"use strict";

System.register("app/auth/reset-password/request-confirmed.js", ["app/bootstrap"], function (_export, _context) {
  "use strict";

  var Bootstrap, RequestConfirmedCustomElement;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appBootstrap) {
      Bootstrap = _appBootstrap.Bootstrap;
    }],
    execute: function () {
      _export("RequestConfirmedCustomElement", RequestConfirmedCustomElement = function (_Bootstrap) {
        _inherits(RequestConfirmedCustomElement, _Bootstrap);

        function RequestConfirmedCustomElement() {
          var _temp, _this, _ret;

          _classCallCheck(this, RequestConfirmedCustomElement);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Bootstrap.call.apply(_Bootstrap, [this].concat(args))), _this), _this.password = "", _this.confirmPassword = "", _temp), _possibleConstructorReturn(_this, _ret);
        }

        RequestConfirmedCustomElement.prototype.formValidationRules = function formValidationRules(rules) {
          return rules.ensure(function (a) {
            return a.password;
          }).required().ensure(function (a) {
            return a.confirmPassword;
          }).required().satisfies(function (value, a) {
            return value === a.password;
          }).withMessage('Passwords must match');
        };

        return RequestConfirmedCustomElement;
      }(Bootstrap));

      _export("RequestConfirmedCustomElement", RequestConfirmedCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-password/request-form.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/submit\"></require><div class=\"content-block-title\">Reset Password Request</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><form><div class=\"list-block\"><ul><li class=\"item-content\"><div class=\"item-media\"><i class=\"icon icon-form-name\"></i></div><div class=\"item-inner\"><div class=\"item-input\"><input type=\"text\" value.bind=\"username & validate\" name=\"username\" placeholder=\"Username\"></div></div></li></ul></div></form></div></div></div><div class=\"content-block\"><submit text=\"Request\"></submit></div></template>";
});

})();
"use strict";

System.register("app/auth/reset-password/request-form.js", ["app/bootstrap"], function (_export, _context) {
  "use strict";

  var Bootstrap, RequestFormCustomElement;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appBootstrap) {
      Bootstrap = _appBootstrap.Bootstrap;
    }],
    execute: function () {
      _export("RequestFormCustomElement", RequestFormCustomElement = function (_Bootstrap) {
        _inherits(RequestFormCustomElement, _Bootstrap);

        function RequestFormCustomElement() {
          var _temp, _this, _ret;

          _classCallCheck(this, RequestFormCustomElement);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Bootstrap.call.apply(_Bootstrap, [this].concat(args))), _this), _this.username = "", _temp), _possibleConstructorReturn(_this, _ret);
        }

        RequestFormCustomElement.prototype.formValidationRules = function formValidationRules(rules) {
          return rules.ensure(function (a) {
            return a.username;
          }).required();
        };

        return RequestFormCustomElement;
      }(Bootstrap));

      _export("RequestFormCustomElement", RequestFormCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-password/request-success.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"content-block-title\">Reset Request Success</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner bg-green\"><p>Please check your email, if a user with that username exists, instructions will be sent to the user's email address.</p></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/reset-password/reset-failed.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"resetFailedReason\"><div class=\"content-block-title\">Reset Password Failed</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><p class=\"color-gray\">Hmm, something went wrong, please try the confirm link again.</p><p></p><p class=\"color-red\">Error: ${resetFailedReason}</p></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/reset-password/reset-success.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"resetSuccess\"><div class=\"content-block-title\">Reset Password Success</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><p class=\"color-green\">Great, your password has been reset, you may proceed to <a route-href=\"route: login\" class=\"pointer\">login</a>.</p></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/reset-pin-confirm.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"./reset-pin/confirm-failed.html\"></require><require from=\"./reset-pin/request-confirmed\"></require><require from=\"./reset-pin/reset-success.html\"></require><require from=\"./reset-pin/reset-failed.html\"></require><div class=\"view\"><div class=\"page\"><div class=\"page-content\"><div class=\"login-screen-title\"><a route-href=\"route: home\">${router.title}</a></div><request-confirmed pin.bind=\"pin\" actions.bind=\"onSuccess\" if.bind=\"requestConfirmed\"></request-confirmed><confirm-failed confirm-failed-reason.bind=\"confirmFailedReason\" if.bind=\"confirmFailed\"></confirm-failed><reset-success if.bind=\"resetSuccess\"></reset-success><reset-failed reset-failed-reason.bind=\"resetFailedReason\" if.bind=\"resetFailed\"></reset-failed></div></div></div></template>";
});

})();
'use strict';

System.register('app/auth/reset-pin-confirm.js', ['aurelia-framework', 'app/app', 'shortid'], function (_export, _context) {
  "use strict";

  var computedFrom, inject, App, shortid, _createClass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, ResetPinConfirm;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
      inject = _aureliaFramework.inject;
    }, function (_appApp) {
      App = _appApp.App;
    }, function (_shortid) {
      shortid = _shortid.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('ResetPinConfirm', ResetPinConfirm = (_dec = inject(App), _dec2 = computedFrom("status"), _dec3 = computedFrom("status"), _dec4 = computedFrom("status"), _dec5 = computedFrom("status"), _dec6 = computedFrom("status"), _dec(_class = (_class2 = function () {
        function ResetPinConfirm(app) {
          var _this = this;

          _classCallCheck(this, ResetPinConfirm);

          this.onSuccess = {
            success: function success(form) {
              return _this.resetPin(form);
            }
          };

          this.app = app;
          this.router = app.router;
        }

        ResetPinConfirm.prototype.activate = function activate(params) {
          var _this2 = this;

          this.token = params.token;
          return this.app.api.confirmResetPinRequest(this.token).then(function (result) {
            _this2.pin = shortid.generate();
            _this2.status = "requestConfirmed";
          }).catch(function (err) {
            _this2.status = "confirmFailed";
            _this2.confirmFailedReason = err;
          });
        };

        ResetPinConfirm.prototype.resetPin = function resetPin(form) {
          var _this3 = this;

          this.app.api.resetPin(form.pin, this.token).then(function (result) {
            _this3.status = "resetSuccess";
          }).catch(function (err) {
            _this3.resetFailedReason = err;
            _this3.status = "resetFailed";
          });
        };

        _createClass(ResetPinConfirm, [{
          key: 'resetFailed',
          get: function get() {
            return this.status == "resetFailed";
          }
        }, {
          key: 'requestConfirmed',
          get: function get() {
            return this.status == "requestConfirmed";
          }
        }, {
          key: 'confirmFailed',
          get: function get() {
            return this.status == "confirmFailed";
          }
        }, {
          key: 'resetSuccess',
          get: function get() {
            return this.status == "resetSuccess";
          }
        }]);

        return ResetPinConfirm;
      }(), (_applyDecoratedDescriptor(_class2.prototype, 'resetFailed', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetFailed'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'requestConfirmed', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'requestConfirmed'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'confirmFailed', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'confirmFailed'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetSuccess', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetSuccess'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetFailed', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetFailed'), _class2.prototype)), _class2)) || _class));

      _export('ResetPinConfirm', ResetPinConfirm);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-pin-request.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/submit\"></require><require from=\"./reset-pin/request-form\"></require><require from=\"./reset-pin/request-success.html\"></require><div class=\"view\"><div class=\"page\"><div class=\"page-content\"><div class=\"login-screen-title\"><a route-href=\"route: home\">${router.title}</a></div><request-form if.bind=\"!resetRequestSuccess\" actions.bind=\"onSuccess\"></request-form><request-success if.bind=\"resetRequestSuccess\"></request-success></div></div></div></template>";
});

})();
'use strict';

System.register('app/auth/reset-pin-request.js', ['aurelia-framework', 'app/app'], function (_export, _context) {
  "use strict";

  var inject, App, _dec, _class, ResetPinRequest;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _export('ResetPinRequest', ResetPinRequest = (_dec = inject(App), _dec(_class = function () {
        function ResetPinRequest(app) {
          var _this = this;

          _classCallCheck(this, ResetPinRequest);

          this.resetRequestSuccess = false;
          this.onSuccess = {
            success: function success() {
              return _this.requestResetPin();
            }
          };

          this.app = app;
          this.router = app.router;
        }

        ResetPinRequest.prototype.requestResetPin = function requestResetPin() {
          var _this2 = this;

          this.app.api.requestResetPin(this.username).then(function (result) {
            _this2.resetRequestSuccess = true;
          }).catch(function (err) {
            _this2.app.notifier.danger(err);
          });
        };

        return ResetPinRequest;
      }()) || _class));

      _export('ResetPinRequest', ResetPinRequest);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-pin/confirm-failed.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"confirmFailedReason\"><div class=\"content-block-title\">Confirmation Failed</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><p class=\"color-red\">${confirmFailedReason}</p></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/reset-pin/request-confirmed.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/submit\"></require><div class=\"content-block-title\">Change Pin</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><form role=\"form\" submit.delegate=\"submit()\"><div class=\"list-block\"><ul><li class=\"item-content\"><div class=\"item-inner\"><p class=\"color-green\">Your request has been confirmed, submit the form below to change your pin.</p></div></li><li class=\"item-content\"><div class=\"item-inner\"><p>This is your new pin code:<br><br><span class=\"color-green\">${pin}</span><br><br>You will be able to login using your pin code after submitting the form below.</p></div></li></ul></div></form></div></div></div><div class=\"content-block\"><submit text=\"Change Pin\"></submit></div></template>";
});

})();
'use strict';

System.register('app/auth/reset-pin/request-confirmed.js', ['app/bootstrap', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var Bootstrap, bindable, _desc, _value, _class, _descriptor, _descriptor2, RequestConfirmedCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_appBootstrap) {
      Bootstrap = _appBootstrap.Bootstrap;
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('RequestConfirmedCustomElement', RequestConfirmedCustomElement = (_class = function (_Bootstrap) {
        _inherits(RequestConfirmedCustomElement, _Bootstrap);

        function RequestConfirmedCustomElement() {
          var _temp, _this, _ret;

          _classCallCheck(this, RequestConfirmedCustomElement);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Bootstrap.call.apply(_Bootstrap, [this].concat(args))), _this), _initDefineProp(_this, 'pin', _descriptor, _this), _initDefineProp(_this, 'actions', _descriptor2, _this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        RequestConfirmedCustomElement.prototype.formValidationRules = function formValidationRules(rules) {
          return rules.ensure(function (a) {
            return a.pin;
          }).required();
        };

        return RequestConfirmedCustomElement;
      }(Bootstrap), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'pin', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'actions', [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export('RequestConfirmedCustomElement', RequestConfirmedCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-pin/request-form.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/submit\"></require><div class=\"content-block-title\">Reset Pin Request</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><form role=\"form\" submit.delegate=\"submit()\"><div class=\"list-block\"><ul><li class=\"item-content\"><div class=\"item-media\"><i class=\"icon icon-form-name\"></i></div><div class=\"item-inner\"><div class=\"item-input\"><input type=\"text\" value.bind=\"username & validate\" name=\"username\" placeholder=\"Username\"></div></div></li></ul></div></form></div></div></div><div class=\"content-block\"><submit text=\"Request\"></submit></div></template>";
});

})();
"use strict";

System.register("app/auth/reset-pin/request-form.js", ["app/bootstrap"], function (_export, _context) {
  "use strict";

  var Bootstrap, RequestFormCustomElement;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appBootstrap) {
      Bootstrap = _appBootstrap.Bootstrap;
    }],
    execute: function () {
      _export("RequestFormCustomElement", RequestFormCustomElement = function (_Bootstrap) {
        _inherits(RequestFormCustomElement, _Bootstrap);

        function RequestFormCustomElement() {
          var _temp, _this, _ret;

          _classCallCheck(this, RequestFormCustomElement);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Bootstrap.call.apply(_Bootstrap, [this].concat(args))), _this), _this.username = "", _temp), _possibleConstructorReturn(_this, _ret);
        }

        RequestFormCustomElement.prototype.formValidationRules = function formValidationRules(rules) {
          return rules.ensure(function (a) {
            return a.username;
          }).required();
        };

        return RequestFormCustomElement;
      }(Bootstrap));

      _export("RequestFormCustomElement", RequestFormCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/auth/reset-pin/request-success.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"content-block-title\">Reset Request Success</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner bg-green\"><p>Please check your email, if a user with that username exists, instructions will be sent to the user's email address.</p></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/reset-pin/reset-failed.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"resetFailedReason\"><div class=\"content-block-title\">Reset Password Failed</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><p class=\"color-gray\">Hmm, something went wrong, please try the confirm link again.</p><p></p><p class=\"color-red\">Error: ${resetFailedReason}</p></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/auth/reset-pin/reset-success.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"resetSuccess\"><div class=\"content-block-title\">Reset Pin Success</div><div class=\"card\"><div class=\"card-content\"><div class=\"card-content-inner\"><p class=\"color-green\">Great, your pin has been reset.<br>you should receive an email with the new pin to keep for future reference.<br>You may use your pin to <a route-href=\"route: login\" class=\"pointer\">login</a> at this time.</p></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/back.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"title, action\"><a click.delegate=\"action()\" class=\"back pointer link\"><i class=\"icon icon-back\" style=\"transform: translate3d(0px, 0px, 0px)\"></i><span>${title || 'Back'}</span></a></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/confirm.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><ai-dialog><ai-dialog-header><legend>${heading}</legend></ai-dialog-header><ai-dialog-body><div class=\"m-b-1\">${message}?</div></ai-dialog-body><ai-dialog-footer><button click.delegate=\"controller.cancel()\">Cancel</button> <button click.delegate=\"controller.ok(person)\">Ok</button></ai-dialog-footer></ai-dialog></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/cselect-popup.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/nav-popup.html\"></require><nav-popup heading=\"${name}\" actions.bind=\"actions\"></nav-popup><div click.delegate=\"updateValue($event)\" class=\"list-block\"><ul><li repeat.for=\"item of list\"><label class=\"label-radio item-content\"><input data-title=\"${actions.name(item)}\" if.bind=\"!isSelected(item)\" id=\"${$index}\" type=\"radio\" name=\"radio\" value=\"${actions.val(item)}\"> <input data-title=\"${actions.name(item)}\" if.bind=\"isSelected(item)\" id=\"${$index}\" type=\"radio\" name=\"radio\" value=\"${actions.val(item)}\" checked=\"checked\"><div class=\"item-inner\"><div class=\"item-title\">${actions.name(item)}</div></div></label></li></ul></div></template>";
});

})();
"use strict";

System.register("app/components/cselect-popup.js", [], function (_export, _context) {
  "use strict";

  var CselectPopup;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("CselectPopup", CselectPopup = function () {
        function CselectPopup() {
          _classCallCheck(this, CselectPopup);
        }

        CselectPopup.prototype.activate = function activate(model) {
          this.actions = model.actions;
          this.list = model.list;
          this.name = model.name;
          this.radioChecked = {};
        };

        CselectPopup.prototype.isSelected = function isSelected(item) {
          return this.actions.isSelected(item);
        };

        CselectPopup.prototype.updateValue = function updateValue($event) {
          var label = $event.target.parentElement;
          if (label.className == "item-inner") {
            label = label.parentElement;
          }
          var input = label.firstElementChild;
          var newVal = input.value;
          var radio = this.radioChecked[this.selectedId];
          if (radio) {
            radio.checked = false;
          }
          this.selectedId = input.id;
          this.radioChecked[this.selectedId] = input;
          this.radioChecked[this.selectedId].checked = true;
          var title = input.dataset.title;
          this.actions.update(newVal, title);
        };

        return CselectPopup;
      }());

      _export("CselectPopup", CselectPopup);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/cselect.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"list-block pointer\"><ul class=\"no-top-bottom-border\"><li><a click.delegate=\"openSelect()\" class=\"item-link smart-select\"><div class=\"item-content\"><div class=\"item-inner\"><!-- Select label --><div class=\"item-title\">${title}</div><span if.bind=\"showEmpty\">${emptyText}</span> <span if.bind=\"showBlank\">${blankText}</span><div class=\"item-after\">${valueLabel}</div></div></div></a></li></ul></div></template>";
});

})();
'use strict';

System.register('app/components/cselect.js', ['aurelia-framework', 'app/app-base'], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, computedFrom, AppBase, _createClass, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, CselectCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('CselectCustomElement', CselectCustomElement = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec2 = computedFrom("options", "emptyText", "value"), _dec3 = computedFrom("blankText", "value"), (_class = function (_AppBase) {
        _inherits(CselectCustomElement, _AppBase);

        function CselectCustomElement() {
          var _temp, _this, _ret;

          _classCallCheck(this, CselectCustomElement);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args))), _this), _initDefineProp(_this, 'accessor', _descriptor, _this), _initDefineProp(_this, 'options', _descriptor2, _this), _initDefineProp(_this, 'emptyText', _descriptor3, _this), _initDefineProp(_this, 'title', _descriptor4, _this), _initDefineProp(_this, 'blankText', _descriptor5, _this), _initDefineProp(_this, 'valueLabel', _descriptor6, _this), _initDefineProp(_this, 'value', _descriptor7, _this), _this.selectPopupView = "app/components/cselect-popup", _this.actions = {
            val: function val(item) {
              return _this.val(item);
            },
            isSelected: function isSelected(item) {
              return _this.val(item) == _this.value;
            },
            name: function name(item) {
              return _this.name(item);
            },
            update: function update(newValue, label) {
              return (_this.value = newValue) && (_this.valueLabel = label);
            },
            closePopup: function closePopup() {
              return _this.app.appContext.closeNPopup();
            }
          }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        CselectCustomElement.prototype.val = function val(option) {
          if (this.accessor) {
            return this.accessor.val(option);
          } else {
            return option.id || option.value || option;
          }
        };

        CselectCustomElement.prototype.bind = function bind() {
          this.popupModel = {
            list: this.options,
            name: this.title,
            actions: this.actions
          };
          if (!this.valueLabel) {
            this.valueLabel = this.value;
          }
        };

        CselectCustomElement.prototype.name = function name(option) {
          if (this.accessor) {
            return this.accessor.name(option);
          } else {
            return option.name || option;
          }
        };

        CselectCustomElement.prototype.openSelect = function openSelect() {
          this.app.appContext.showNPopup(this.selectPopupView, this.popupModel);
        };

        _createClass(CselectCustomElement, [{
          key: 'showEmpty',
          get: function get() {
            if (this.options && this.emptyText && !this.value) {
              return this.options.length == 0 && this.emptyText.length > 0;
            }
          }
        }, {
          key: 'showBlank',
          get: function get() {
            if (this.blankText && !this.value) {
              return this.blankText.length > 0;
            }
          }
        }]);

        return CselectCustomElement;
      }(AppBase), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'accessor', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'options', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'emptyText', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'title', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'blankText', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'valueLabel', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'value', [_dec], {
        enumerable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class.prototype, 'showEmpty', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'showEmpty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showBlank', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'showBlank'), _class.prototype)), _class)));

      _export('CselectCustomElement', CselectCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/date-time-picker.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"content-block-title\">Departure</div><div class=\"content-block\"><div class=\"content-block-inner\" style=\"padding:0; margin-right:-15px; width:auto\"><div style=\"margin:0\" class=\"list-block\"><ul style=\"border-top:none\"><li><div class=\"item-content\"><div class=\"item-inner\"><div class=\"item-input\"><input type=\"text\" placeholder=\"Date Time\" readonly=\"readonly\" id=\"picker-date\"></div></div></div></li></ul></div><div id=\"picker-date-container\"></div></div></div></template>";
});

})();
'use strict';

System.register('app/components/date-time-picker.js', ['aurelia-framework', 'moment', 'app/f7'], function (_export, _context) {
    "use strict";

    var bindable, bindingMode, moment, f7, _dec, _desc, _value, _class, _descriptor, initDatePicker, DateTimePickerCustomElement;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    return {
        setters: [function (_aureliaFramework) {
            bindable = _aureliaFramework.bindable;
            bindingMode = _aureliaFramework.bindingMode;
        }, function (_moment) {
            moment = _moment.default;
        }, function (_appF) {
            f7 = _appF.f7;
        }],
        execute: function () {
            initDatePicker = function initDatePicker(startDate) {
                var today = startDate;
                var currentYear = today.getFullYear();
                var pickerInline = f7.picker({
                    input: '#picker-date',
                    container: '#picker-date-container',
                    toolbar: false,
                    rotateEffect: false,
                    value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()],
                    onChange: function onChange(picker, values, displayValues) {
                        var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
                        if (values[1] > daysInMonth) {
                            picker.cols[1].setValue(daysInMonth);
                            this.value = { utc: daysInMonth.toString() };
                        }
                    },
                    formatValue: function formatValue(p, values, displayValues) {
                        return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
                    },

                    cols: [{
                        values: '0 1 2 3 4 5 6 7 8 9 10 11'.split(' '),
                        displayValues: 'Jan Feb Mar Apr May Jun Jul Aug Sept Oct Nov Dec'.split(' '),
                        textAlign: 'left'
                    }, {
                        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                    }, {
                        values: function () {
                            var arr = [];
                            for (var i = currentYear; i <= currentYear + 1; i++) {
                                arr.push(i);
                            }
                            return arr;
                        }()
                    }, {
                        divider: true,
                        content: '  '
                    }, {
                        values: function () {
                            var arr = [];
                            for (var i = 0; i <= 23; i++) {
                                arr.push(i);
                            }
                            return arr;
                        }()
                    }, {
                        divider: true,
                        content: ':'
                    }, {
                        values: function () {
                            var arr = [];
                            for (var i = 0; i <= 59; i++) {
                                arr.push(i < 10 ? '0' + i : i);
                            }
                            return arr;
                        }()
                    }]
                });
            };

            _export('DateTimePickerCustomElement', DateTimePickerCustomElement = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), (_class = function () {
                function DateTimePickerCustomElement() {
                    _classCallCheck(this, DateTimePickerCustomElement);

                    _initDefineProp(this, 'value', _descriptor, this);
                }

                DateTimePickerCustomElement.prototype.attached = function attached() {
                    var defaultDate = moment().toDate();
                    var unix = void 0;
                    if (this.value && (unix = moment.unix(this.value.utc)).isValid()) {
                        defaultDate = unix.toDate();
                    } else {
                        this.value = { utc: defaultDate };
                    }
                    initDatePicker(defaultDate);
                };

                return DateTimePickerCustomElement;
            }(), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_dec], {
                enumerable: true,
                initializer: null
            }), _class)));

            _export('DateTimePickerCustomElement', DateTimePickerCustomElement);
        }
    };
});

(function() {
var define = System.amdDefine;
define("app/components/delete.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><button disabled.bind=\"disabled\" type=\"button\" click.delegate=\"do()\" class=\"btn btn-primary-outline\">Archive <i class=\"fa fa-trash ${iconClass} p-l\"></i></button></template>";
});

})();
"use strict";

System.register("app/components/confirm.js", [], function (_export, _context) {
  "use strict";

  var Confirm;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("Confirm", Confirm = function () {
        function Confirm() {
          _classCallCheck(this, Confirm);

          this.heading = "Confirm";
          this.message = "";
        }

        Confirm.prototype.activate = function activate(options) {
          this.message = options.message;
          if (options.heading) {
            this.heading = options.heading;
          }
        };

        return Confirm;
      }());

      _export("Confirm", Confirm);
    }
  };
});

"use strict";

System.register("app/components/delete.js", ["aurelia-framework", "./confirm"], function (_export, _context) {
  "use strict";

  var inject, bindable, Confirm, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, Delete;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_confirm) {
      Confirm = _confirm.Confirm;
    }],
    execute: function () {
      _export("Delete", Delete = (_class = function () {
        function Delete() {
          _classCallCheck(this, Delete);

          _initDefineProp(this, "action", _descriptor, this);

          _initDefineProp(this, "disabled", _descriptor2, this);

          _initDefineProp(this, "resource", _descriptor3, this);

          _initDefineProp(this, "message", _descriptor4, this);

          _initDefineProp(this, "iconClass", _descriptor5, this);
        }

        Delete.prototype.bind = function bind() {};

        Delete.prototype.do = function _do() {
          var _this = this;

          this.dialog.open({ viewModel: Confirm, model: { message: this.message, heading: "Archive " + this.resource } }).then(function (result) {
            if (result.wasCancelled) return;
            _this.action();
          });
        };

        return Delete;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "action", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return function () {};
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "disabled", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "resource", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "message", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return "Are you sure";
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "iconClass", [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export("Delete", Delete);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/drivers-license.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"aurelia-mask\"></require><input type=\"text\" class=\"form-control\" masked=\"value.bind: value; mask: *** ***;\"></template>";
});

})();
'use strict';

System.register('app/components/drivers-license.js', ['aurelia-framework'], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, _dec, _desc, _value, _class, _descriptor, DriversLicenseCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
    }],
    execute: function () {
      _export('DriversLicenseCustomElement', DriversLicenseCustomElement = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), (_class = function DriversLicenseCustomElement() {
        _classCallCheck(this, DriversLicenseCustomElement);

        _initDefineProp(this, 'value', _descriptor, this);
      }, _descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_dec], {
        enumerable: true,
        initializer: null
      }), _class)));

      _export('DriversLicenseCustomElement', DriversLicenseCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/form-element.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"label\"><li><div class=\"item-content\"><div class=\"item-inner\"><div class=\"item-title label\">${label}</div><div class=\"item-input\"><slot></slot></div></div></div></li></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/loader.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><span show.bind=\"isLoading\" class=\"preloader preloader-big\"></span></template>";
});

})();
'use strict';

System.register('app/components/loader.js', ['app/app', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var App, computedFrom, _createClass, _dec, _desc, _value, _class, Loader;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_appApp) {
      App = _appApp.App;
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Loader', Loader = (_dec = computedFrom("app.appContext.api.isRequesting", "app.appContext.net.isRequesting"), (_class = function () {
        Loader.inject = function inject() {
          return [App];
        };

        function Loader(app) {
          _classCallCheck(this, Loader);

          this.app = app;
        }

        _createClass(Loader, [{
          key: 'isLoading',
          get: function get() {
            return this.app.appContext.api.isRequesting || this.app.appContext.net.isRequesting;
          }
        }]);

        return Loader;
      }(), _applyDecoratedDescriptor(_class.prototype, 'isLoading', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'isLoading'), _class.prototype), _class)));

      _export('Loader', Loader);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/nav-bar.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><compose if.bind=\"hasNavBarView\" view-model.bind=\"navBarView\"></compose></template>";
});

})();
"use strict";

System.register("app/components/nav-bar.js", ["aurelia-framework"], function (_export, _context) {
  "use strict";

  var bindable, computedFrom, _createClass, _dec, _dec2, _desc, _value, _class, _descriptor, NAV_BARS, hasNavBar, NavBarCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      NAV_BARS = ["trips", "show-archived", "active-trip", "show-trip", "show-party", "parties", "trips/show"];

      hasNavBar = function hasNavBar(page) {
        return NAV_BARS.includes(page);
      };

      _export("NavBarCustomElement", NavBarCustomElement = (_dec = computedFrom("page"), _dec2 = computedFrom("page"), (_class = function () {
        function NavBarCustomElement() {
          _classCallCheck(this, NavBarCustomElement);

          _initDefineProp(this, "page", _descriptor, this);
        }

        NavBarCustomElement.prototype.pageChanged = function pageChanged() {
          this.page = this.page.replace('app/', '');
        };

        _createClass(NavBarCustomElement, [{
          key: "navBarView",
          get: function get() {
            return "app/components/nav-bars/" + this.page;
          }
        }, {
          key: "hasNavBarView",
          get: function get() {
            return hasNavBar(this.page);
          }
        }]);

        return NavBarCustomElement;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "page", [bindable], {
        enumerable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class.prototype, "navBarView", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "navBarView"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hasNavBarView", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "hasNavBarView"), _class.prototype)), _class)));

      _export("NavBarCustomElement", NavBarCustomElement);
    }
  };
});

'use strict';

System.register('app/components/nav-bars/active-trip.js', ['./base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var Base, useView, _dec, _class, _class2, _temp, Trips;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_base) {
      Base = _base.Base;
    }, function (_aureliaFramework) {
      useView = _aureliaFramework.useView;
    }],
    execute: function () {
      _export('Trips', Trips = (_dec = useView("app/components/nav-bars/base.html"), _dec(_class = (_temp = _class2 = function (_Base) {
        _inherits(Trips, _Base);

        function Trips() {
          _classCallCheck(this, Trips);

          return _possibleConstructorReturn(this, _Base.apply(this, arguments));
        }

        return Trips;
      }(Base), _class2.header = "Active Trip", _class2.hasSubNavBar = false, _temp)) || _class));

      _export('Trips', Trips);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/nav-bars/base.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/loader\"></require><require from=\"app/components/back.html\"></require><div class=\"navbar\"><div class=\"navbar-inner\"><div class=\"left\"><span if.bind=\"onShowParty\" class=\"ml10\"><back title=\"Parties\" action.call=\"navParties()\"></back></span><span if.bind=\"onShowArchived\" class=\"ml10\"><back title=\"Trips\" action.call=\"navTrips()\"></back></span><span if.bind=\"onShowTrip\" class=\"ml10\"><back title=\"Trips\" action.call=\"navTrips()\"></back></span></div><div class=\"center sliding\">${header}</div><div class=\"right\"><loader class=\"mr20\"></loader><a click.delegate=\"logout()\" class=\"link logout-link pointer\"><i class=\"f7-icons\">logout</i></a><div class=\"ml10 nav-circle\">${authContext.currentUser.initials}</div></div></div><div if.bind=\"hasSubNavBar\" class=\"subnavbar\"><div class=\"buttons-row\"><a click.delegate=\"addResource()\" if.bind=\"canAdd && !editable\" class=\"button button-raised pointer\"><i class=\"f7-icons\">add_round</i> </a><a click.delegate=\"startTrip()\" if.bind=\"canStartTrip && !onShowParty && onParties\" class=\"button button-raised pointer\">Start Trip</a> <a click.delegate=\"startTrip()\" if.bind=\"!canStartTrip && !onShowParty && onParties\" class=\"button button-raised pointer\" disabled=\"disabled\">Start Trip</a> <a class=\"button button-raised pointer\" click.delegate=\"editParty()\" if.bind=\"canEdit && editable\"><i class=\"f7-icons\">compose</i></a> <a class=\"button button-raised pointer\" if.bind=\"!canEdit && editable\"><i class=\"f7-icons\" disabled=\"disabled\">compose</i></a> <a click.delegate=\"archiveParty()\" class=\"button button-raised pointer\" if.bind=\"canArchive && editable\"><i class=\"f7-icons\">delete_round</i></a> <a class=\"button button-raised pointer\" if.bind=\"!canArchive && editable\"><i class=\"f7-icons\" disabled=\"disabled\">delete_round</i></a></div></div></div></template>";
});

})();
'use strict';

System.register('app/components/nav-bars/parties.js', ['./base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var Base, useView, _dec, _class, _class2, _temp, Parties;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_base) {
      Base = _base.Base;
    }, function (_aureliaFramework) {
      useView = _aureliaFramework.useView;
    }],
    execute: function () {
      _export('Parties', Parties = (_dec = useView("app/components/nav-bars/base.html"), _dec(_class = (_temp = _class2 = function (_Base) {
        _inherits(Parties, _Base);

        function Parties() {
          _classCallCheck(this, Parties);

          return _possibleConstructorReturn(this, _Base.apply(this, arguments));
        }

        return Parties;
      }(Base), _class2.header = "Parties", _class2.onParties = true, _class2.addView = "app/parties/add-party", _class2.startTripView = "app/components/trips/confirm-start", _class2.addViewModel = {}, _temp)) || _class));

      _export('Parties', Parties);
    }
  };
});

'use strict';

System.register('app/components/nav-bars/show-archived.js', ['./base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var Base, useView, _dec, _class, _class2, _temp, ShowArchived;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_base) {
      Base = _base.Base;
    }, function (_aureliaFramework) {
      useView = _aureliaFramework.useView;
    }],
    execute: function () {
      _export('ShowArchived', ShowArchived = (_dec = useView("app/components/nav-bars/base.html"), _dec(_class = (_temp = _class2 = function (_Base) {
        _inherits(ShowArchived, _Base);

        function ShowArchived() {
          _classCallCheck(this, ShowArchived);

          return _possibleConstructorReturn(this, _Base.apply(this, arguments));
        }

        ShowArchived.prototype.attached = function attached() {
          this.header = 'Party: ' + this.appContext.selectedParty.paddedNumber;
        };

        ShowArchived.prototype.navTrips = function navTrips() {
          this.app.router.navigateToRoute("trips");
        };

        return ShowArchived;
      }(Base), _class2.header = "Archived", _class2.onShowTrip = true, _class2.hasSubNavBar = false, _temp)) || _class));

      _export('ShowArchived', ShowArchived);
    }
  };
});

'use strict';

System.register('app/components/nav-bars/show-party.js', ['./base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var Base, useView, _dec, _class, _class2, _temp, ShowParty;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_base) {
      Base = _base.Base;
    }, function (_aureliaFramework) {
      useView = _aureliaFramework.useView;
    }],
    execute: function () {
      _export('ShowParty', ShowParty = (_dec = useView("app/components/nav-bars/base.html"), _dec(_class = (_temp = _class2 = function (_Base) {
        _inherits(ShowParty, _Base);

        function ShowParty() {
          _classCallCheck(this, ShowParty);

          return _possibleConstructorReturn(this, _Base.apply(this, arguments));
        }

        ShowParty.prototype.attached = function attached() {
          this.header = 'Party: ' + this.appContext.selectedParty.paddedNumber;
        };

        ShowParty.prototype.navParties = function navParties() {
          this.app.router.navigateToRoute("parties");
        };

        return ShowParty;
      }(Base), _class2.header = "Party", _class2.editable = true, _class2.onShowParty = true, _class2.addView = "app/parties/add-party", _temp)) || _class));

      _export('ShowParty', ShowParty);
    }
  };
});

'use strict';

System.register('app/components/nav-bars/show-trip.js', ['./base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var Base, useView, _dec, _class, _class2, _temp, ShowTrip;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_base) {
      Base = _base.Base;
    }, function (_aureliaFramework) {
      useView = _aureliaFramework.useView;
    }],
    execute: function () {
      _export('ShowTrip', ShowTrip = (_dec = useView("app/components/nav-bars/base.html"), _dec(_class = (_temp = _class2 = function (_Base) {
        _inherits(ShowTrip, _Base);

        function ShowTrip() {
          _classCallCheck(this, ShowTrip);

          return _possibleConstructorReturn(this, _Base.apply(this, arguments));
        }

        ShowTrip.prototype.attached = function attached() {
          this.header = 'Trip: ' + this.appContext.selectedTrip.paddedNumber;
        };

        ShowTrip.prototype.navTrips = function navTrips() {
          this.app.router.navigateToRoute("trips");
        };

        return ShowTrip;
      }(Base), _class2.header = "Trip", _class2.onShowTrip = true, _class2.hasSubNavBar = false, _temp)) || _class));

      _export('ShowTrip', ShowTrip);
    }
  };
});

'use strict';

System.register('app/components/nav-bars/base.js', ['app/auth-context', 'app/app-context', 'aurelia-framework', 'app/f7', 'app/notifier', 'app/app'], function (_export, _context) {
  "use strict";

  var AuthContext, AppContext, computedFrom, f7, Notifier, App, _createClass, _dec, _dec2, _dec3, _desc, _value, _class, Base;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }, function (_appAppContext) {
      AppContext = _appAppContext.AppContext;
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appF) {
      f7 = _appF.f7;
    }, function (_appNotifier) {
      Notifier = _appNotifier.Notifier;
    }, function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Base', Base = (_dec = computedFrom("editable"), _dec2 = computedFrom("appContext.selectedRows.size"), _dec3 = computedFrom("editable"), (_class = function () {
        Base.inject = function inject() {
          return [AuthContext, AppContext, Notifier, App];
        };

        function Base(authContext, appContext, notifier, app) {
          _classCallCheck(this, Base);

          this.authContext = authContext;
          this.header = this.constructor.header;
          this.appContext = appContext;
          this.notifier = notifier;
          this.app = app;
          this.hasSubNavBar = this.constructor.hasSubNavBar;
          if (this.hasSubNavBar === undefined) {
            this.hasSubNavBar = true;
          }
          this.addViewModel = this.constructor.addViewModel;
          this.addView = this.constructor.addView;
          this.editable = this.constructor.editable || false;
          this.onShowTrip = this.constructor.onShowTrip || false;
          this.onShowParty = this.constructor.onShowParty || false;
          this.onParties = this.constructor.onParties || false;
          this.startTripView = this.constructor.startTripView;
          console.log('hasSubNavBar', this.hasSubNavBar);
        }

        Base.prototype.logout = function logout() {
          this.app.actions.logout();
        };

        Base.prototype.addResource = function addResource() {
          if (this.canAdd) {
            this.appContext.showPopup(this.addView, this.addViewModel);
          }
        };

        Base.prototype.startTrip = function startTrip() {
          if (this.canStartTrip) {
            this.appContext.showPopup(this.startTripView, {});
          }
        };

        Base.prototype.archiveParty = function archiveParty() {
          var _this = this;

          if (this.canArchive) {
            var message = 'Are you sure you want to archive ' + this.appContext.selectedParty.paddedNumber + ' ?';
            f7.confirm(message, 'Archive Party', function () {
              _this.appContext.partyController.actionTrigger.delete(_this.appContext.selectedParty);
            });
          }
        };

        Base.prototype.editParty = function editParty() {
          if (this.canEdit) {
            this.appContext.showPopup(this.addView, this.appContext.selectedParty);
          }
        };

        _createClass(Base, [{
          key: 'canEdit',
          get: function get() {
            return this.editable;
          }
        }, {
          key: 'canStartTrip',
          get: function get() {
            return this.appContext.selectedRows && this.appContext.selectedRows.size > 0;
          }
        }, {
          key: 'canArchive',
          get: function get() {
            return this.editable;
          }
        }, {
          key: 'canAdd',
          get: function get() {
            return this.addView && this.addViewModel;
          }
        }]);

        return Base;
      }(), (_applyDecoratedDescriptor(_class.prototype, 'canEdit', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'canEdit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'canStartTrip', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'canStartTrip'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'canArchive', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'canArchive'), _class.prototype)), _class)));

      _export('Base', Base);
    }
  };
});

'use strict';

System.register('app/components/nav-bars/trips.js', ['./base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var Base, useView, _dec, _class, _class2, _temp, Trips;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_base) {
      Base = _base.Base;
    }, function (_aureliaFramework) {
      useView = _aureliaFramework.useView;
    }],
    execute: function () {
      _export('Trips', Trips = (_dec = useView("app/components/nav-bars/base.html"), _dec(_class = (_temp = _class2 = function (_Base) {
        _inherits(Trips, _Base);

        function Trips() {
          _classCallCheck(this, Trips);

          return _possibleConstructorReturn(this, _Base.apply(this, arguments));
        }

        return Trips;
      }(Base), _class2.header = "Trips", _class2.hasSubNavBar = false, _temp)) || _class));

      _export('Trips', Trips);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/nav-bars/trips/show.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/converters/trip-number\"></require><div class=\"navbar\"><div class=\"navbar-inner\"><div class=\"left sliding\">Trip</div><div if.bind=\"currentTripNumber\" class=\"center\">${currentTripNumber | tripnumber}</div><div class=\"right\"><a route-href=\"route: trips\">Trips</a></div></div></div></template>";
});

})();
'use strict';

System.register('app/components/nav-bars/trips/show.js', ['aurelia-framework', 'app/app-context'], function (_export, _context) {
  "use strict";

  var computedFrom, AppContext, _createClass, _dec, _desc, _value, _class, Show;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appAppContext) {
      AppContext = _appAppContext.AppContext;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Show', Show = (_dec = computedFrom("appContext.currentTrip"), (_class = function () {
        Show.inject = function inject() {
          return [AppContext];
        };

        function Show(appContext) {
          _classCallCheck(this, Show);

          this.appContext = appContext;
        }

        Show.prototype.activate = function activate(params) {
          console.log('trip id', params);
        };

        _createClass(Show, [{
          key: 'currentTripNumber',
          get: function get() {
            if (this.appContext.currentTrip) {
              return this.appContext.currentTrip.tripNumber;
            }
          }
        }]);

        return Show;
      }(), _applyDecoratedDescriptor(_class.prototype, 'currentTripNumber', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'currentTripNumber'), _class.prototype), _class)));

      _export('Show', Show);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/nav-popup.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"heading, actions\"><require from=\"app/components/back.html\"></require><div class=\"navbar\"><div class=\"navbar-inner\"><div class=\"left\"><back action.call=\"actions.closePopup()\"></back></div><div class=\"center\" style=\"left: 0px\">${heading}</div><div class=\"right\"></div></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/nselect.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><select value.bind=\"value\"><option value=\"\" if.bind=\"showEmpty\">${emptyText}</option><option value=\"\" if.bind=\"showBlank\">${blankText}</option><option repeat.for=\"option of options\" value=\"${val(option)}\">${name(option)}</option></select></template>";
});

})();
"use strict";

System.register("app/components/nselect.js", ["aurelia-framework"], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, computedFrom, _createClass, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, NselectCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("NselectCustomElement", NselectCustomElement = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec2 = computedFrom("options", "emptyText"), _dec3 = computedFrom("blankText"), (_class = function () {
        function NselectCustomElement() {
          _classCallCheck(this, NselectCustomElement);

          _initDefineProp(this, "accessor", _descriptor, this);

          _initDefineProp(this, "options", _descriptor2, this);

          _initDefineProp(this, "emptyText", _descriptor3, this);

          _initDefineProp(this, "blankText", _descriptor4, this);

          _initDefineProp(this, "formControl", _descriptor5, this);

          _initDefineProp(this, "value", _descriptor6, this);
        }

        NselectCustomElement.prototype.val = function val(option) {
          if (this.accessor) {
            return this.accessor.val(option);
          } else {
            return option.id || option.value || option;
          }
        };

        NselectCustomElement.prototype.name = function name(option) {
          if (this.accessor) {
            return this.accessor.name(option);
          } else {
            return option.name || option;
          }
        };

        _createClass(NselectCustomElement, [{
          key: "showEmpty",
          get: function get() {
            if (this.options && this.emptyText) {
              return this.options.length == 0 && this.emptyText.length > 0;
            }
          }
        }, {
          key: "showBlank",
          get: function get() {
            if (this.blankText) {
              return this.blankText.length > 0;
            }
          }
        }]);

        return NselectCustomElement;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "accessor", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "options", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "emptyText", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "blankText", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "formControl", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "value", [_dec], {
        enumerable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class.prototype, "showEmpty", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "showEmpty"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showBlank", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "showBlank"), _class.prototype)), _class)));

      _export("NselectCustomElement", NselectCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/parties/party-header.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"col-auto\"></div><div class=\"col-auto pointer\">Party #</div><div class=\"col-auto pointer\">Status</div><div class=\"col-auto pointer\">Pickup</div><div class=\"col-auto pointer\">Destination</div><div class=\"col-auto pointer\">Date</div><div class=\"col-auto pointer\">Departure <i class=\"f7-icons size-14\">time</i></div><div class=\"col-auto pointer\">Arrival <i class=\"f7-icons size-14\">time</i></div><div class=\"col-auto pointer\">Contact #</div><div class=\"col-auto pointer\">Party Name</div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/parties/party-list.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div id=\"parties\" class=\"list-block media-list\"><ul><li repeat.for=\"party of parties\"><a class=\"item-link pointer item-content\"><div class=\"item-media\"><input id=\"${selectedId(party)}\" type=\"checkbox\" click.delegate=\"selectRow(party, $event)\" checked.bind=\"rowChecked[party.id]\"></div><div class=\"item-inner\" click.delegate=\"showParty(party)\"><div class=\"item-title-row\"><div class=\"item-title\">${party.partyName}</div><div class=\"item-after\">${party.partySize}</div></div><div class=\"item-subtitle\">${party.paddedNumber}</div><div class=\"item-text\"><div class=\"row\"><p>${party.date} ${party.departure}</p><p>Pickup: ${party.pickup}</p></div></div></div></a></li></ul></div></template>";
});

})();
'use strict';

System.register('app/components/parties/party-list.js', ['aurelia-framework', 'app/app-base', 'app/utils', 'app/models/party', 'app/utils/table'], function (_export, _context) {
  "use strict";

  var bindable, AppBase, Utils, PartyModel, TableUtils, _desc, _value, _class, _descriptor, PartyList;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }, function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appModelsParty) {
      PartyModel = _appModelsParty.PartyModel;
    }, function (_appUtilsTable) {
      TableUtils = _appUtilsTable.TableUtils;
    }],
    execute: function () {
      _export('PartyList', PartyList = (_class = function (_AppBase) {
        _inherits(PartyList, _AppBase);

        function PartyList() {
          var _temp, _this, _ret;

          _classCallCheck(this, PartyList);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args))), _this), _initDefineProp(_this, 'parties', _descriptor, _this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        PartyList.prototype.bind = function bind() {
          var _this2 = this;

          this.selectedRows = new Map();
          this.rowChecked = [];
          this.selectedPartyActions = {
            partySelected: function partySelected(selectedRows) {
              _this2.app.appContext.selectedRows = selectedRows;
              return true;
            },
            partyDeleted: function partyDeleted(party) {
              _this2.app.appContext.selectedParty = undefined;
              _this2.app.appContext.selectedRows.delete(_this2.selectedId(party));
            }
          };
          this.selectedPartyActions.partySelected(this.selectedRows);
          this.app.appContext.selectedPartyActions = this.selectedPartyActions;
        };

        PartyList.prototype.selectedId = function selectedId(party) {
          return "checkbox-${party.id}";
        };

        PartyList.prototype.showParty = function showParty(party) {
          this.app.appContext.selectedParty = party;
          this.app.router.navigateToRoute("show-party");
        };

        PartyList.prototype.selectRow = function selectRow(row, event) {
          var eventTarget = event.target;
          if (eventTarget.checked === true) {
            this.selectedRows.set(eventTarget.id, row);
          } else {
            this.selectedRows.delete(eventTarget.id);
          }
          return this.selectedPartyActions.partySelected(this.selectedRows);
        };

        return PartyList;
      }(AppBase), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'parties', [bindable], {
        enumerable: true,
        initializer: null
      }), _class));

      _export('PartyList', PartyList);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/parties/party.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"party\"><div class=\"col-auto\">${party.paddedNumber}</div><div class=\"col-auto\">${party.status}</div><div class=\"col-auto\">${party.pickup}</div><div class=\"col-auto\">${party.destination}</div><div class=\"col-auto\">${party.date}</div><div class=\"col-auto\">${party.departure}</div><div class=\"col-auto\">${party.partySize}</div><div class=\"col-auto\">${party.contactNumber}</div><div class=\"col-auto\">${party.partyName}</div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/phone-number.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"aurelia-mask\"></require><input type=\"tel\" class=\"form-control\" masked=\"value.bind: value; mask: (999) 999-9999; bind-masking: true\"></template>";
});

})();
'use strict';

System.register('app/components/phone-number.js', ['aurelia-framework'], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, _dec, _desc, _value, _class, _descriptor, PhoneNumberCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
    }],
    execute: function () {
      _export('PhoneNumberCustomElement', PhoneNumberCustomElement = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), (_class = function PhoneNumberCustomElement() {
        _classCallCheck(this, PhoneNumberCustomElement);

        _initDefineProp(this, 'value', _descriptor, this);
      }, _descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_dec], {
        enumerable: true,
        initializer: null
      }), _class)));

      _export('PhoneNumberCustomElement', PhoneNumberCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/resource-table/actions-renderer.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><compose view-model.bind=\"view\" model.bind=\"{row:row, actions:actions, actionTrigger: actionTrigger}\" containerless></compose></template>";
});

})();
'use strict';

System.register('app/components/resource-table/actions-renderer.js', ['aurelia-framework', 'app/loader'], function (_export, _context) {
  "use strict";

  var bindable, computedFrom, Loader, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, ActionsRendererCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appLoader) {
      Loader = _appLoader.Loader;
    }],
    execute: function () {
      _export('ActionsRendererCustomElement', ActionsRendererCustomElement = (_class = function (_Loader) {
        _inherits(ActionsRendererCustomElement, _Loader);

        function ActionsRendererCustomElement() {
          var _temp, _this, _ret;

          _classCallCheck(this, ActionsRendererCustomElement);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Loader.call.apply(_Loader, [this].concat(args))), _this), _initDefineProp(_this, 'row', _descriptor, _this), _initDefineProp(_this, 'actionTrigger', _descriptor2, _this), _initDefineProp(_this, 'actions', _descriptor3, _this), _initDefineProp(_this, 'actionInProgress', _descriptor4, _this), _initDefineProp(_this, 'view', _descriptor5, _this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        return ActionsRendererCustomElement;
      }(Loader), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'row', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'actionTrigger', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'actions', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'actionInProgress', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'view', [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export('ActionsRendererCustomElement', ActionsRendererCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/resource-table/actions/driver-trips.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><span class=\"p-r-1 action\"><button disabled.bind=\"disabled\" class=\"btn btn-primary-outline\" click.delegate=\"startTrip()\">Start Trip <i class=\"fa fa-2x fa-hourglass-start\"></i></button></span></template>";
});

})();
"use strict";

System.register("app/components/trips/confirm-start.js", ["app/bootstrap-dialog", "aurelia-framework"], function (_export, _context) {
  "use strict";

  var BootstrapDialog, inject, computedFrom, _createClass, ConfirmStart;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appBootstrapDialog) {
      BootstrapDialog = _appBootstrapDialog.BootstrapDialog;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("ConfirmStart", ConfirmStart = function (_BootstrapDialog) {
        _inherits(ConfirmStart, _BootstrapDialog);

        function ConfirmStart() {
          _classCallCheck(this, ConfirmStart);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _BootstrapDialog.call.apply(_BootstrapDialog, [this].concat(args)));

          _this.heading = "Start Trip";
          _this.message = "Are you sure want to start the trip with these parties";
          return _this;
        }

        ConfirmStart.prototype.activate = function activate(party) {
          var _this2 = this;

          var locationId = this.app.authContext.currentUser.locationId;
          this.selectedPartyIds = this.app.appContext.selectedParties().map(function (party) {
            return party.id;
          });
          return this.app.api.getShuttlesAtLocation(locationId).then(function (shuttles) {
            _this2.shuttles = shuttles;
          });
        };

        ConfirmStart.prototype.submitSuccess = function submitSuccess() {
          var _this3 = this;

          return function () {
            if (_this3.app.appContext.driverShuttleId != _this3.driverShuttleId) {
              _this3.app.appContext.setCurrentDriverShuttleId(_this3.driverShuttleId);
            }
            _this3.app.appContext.closePopup();
            _this3.app.appContext.partyController.actionTrigger.startTrip();
          };
        };

        ConfirmStart.prototype.formValidationRules = function formValidationRules(rules) {
          return rules.ensure(function (a) {
            return a.driverShuttleId;
          }).required();
        };

        _createClass(ConfirmStart, [{
          key: "shuttlesAvailable",
          get: function get() {
            return this.shuttles.length > 0;
          }
        }]);

        return ConfirmStart;
      }(BootstrapDialog));

      _export("ConfirmStart", ConfirmStart);
    }
  };
});

'use strict';

System.register('app/components/resource-table/actions/driver-trips.js', ['../column', 'aurelia-framework', 'app/components/trips/confirm-start', 'app/app-context', 'app/utils'], function (_export, _context) {
  "use strict";

  var Column, computedFrom, ConfirmStart, AppContext, Utils, _createClass, _dec, _desc, _value, _class, Driver;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_column) {
      Column = _column.Column;
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appComponentsTripsConfirmStart) {
      ConfirmStart = _appComponentsTripsConfirmStart.ConfirmStart;
    }, function (_appAppContext) {
      AppContext = _appAppContext.AppContext;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Driver', Driver = (_dec = computedFrom("appContext.resourceTableSelectedRow"), (_class = function (_Column) {
        _inherits(Driver, _Column);

        Driver.inject = function inject() {
          return [AppContext];
        };

        function Driver(appContext) {
          _classCallCheck(this, Driver);

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _Column.call.apply(_Column, [this].concat(args)));

          _this.appContext = appContext;
          return _this;
        }

        Driver.prototype.startTrip = function startTrip() {
          var _this2 = this;

          this.dialog.open({ viewModel: ConfirmStart, model: this.appContext.resourceTableSelectedRow }).then(function (result) {
            if (result.wasCancelled) return;
            _this2.do('startTrip');
          });
        };

        _createClass(Driver, [{
          key: 'disabled',
          get: function get() {
            return Utils.isNullOrUndefined(this.appContext.resourceTableSelectedRow);
          }
        }]);

        return Driver;
      }(Column), _applyDecoratedDescriptor(_class.prototype, 'disabled', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'disabled'), _class.prototype), _class)));

      _export('Driver', Driver);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/resource-table/column.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template>${(accessors[prop] && accessors[prop](row)) || row[prop]}</template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/resource-table/password.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><button click.delegate=\"do('resetPassword')\" type=\"button\" class=\"btn btn-outline-success\">Reset Password</button></template>";
});

})();
'use strict';

System.register('app/components/resource-table/password.js', ['./column'], function (_export, _context) {
  "use strict";

  var Column, Password;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_column) {
      Column = _column.Column;
    }],
    execute: function () {
      _export('Password', Password = function (_Column) {
        _inherits(Password, _Column);

        function Password() {
          _classCallCheck(this, Password);

          return _possibleConstructorReturn(this, _Column.apply(this, arguments));
        }

        return Password;
      }(Column));

      _export('Password', Password);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/resource-table/pin.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><button click.delegate=\"do('resetPin')\" type=\"button\" class=\"btn btn-outline-success\">Reset Pin</button></template>";
});

})();
'use strict';

System.register('app/components/resource-table/column.js', ['aurelia-framework'], function (_export, _context) {
  "use strict";

  var computedFrom, Column;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _export('Column', Column = function () {
        function Column() {
          _classCallCheck(this, Column);
        }

        Column.prototype.activate = function activate(model) {
          this.model = model;
        };

        Column.prototype.do = function _do(action) {
          var actions = this.model.actions;
          var actionTrigger = this.model.actionTrigger;
          if (actionTrigger && actions && actions[action]) {
            actionTrigger.trigger(actions[action], this.model.row);
          }
        };

        return Column;
      }());

      _export('Column', Column);
    }
  };
});

'use strict';

System.register('app/components/resource-table/pin.js', ['./column'], function (_export, _context) {
  "use strict";

  var Column, Pin;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_column) {
      Column = _column.Column;
    }],
    execute: function () {
      _export('Pin', Pin = function (_Column) {
        _inherits(Pin, _Column);

        function Pin() {
          _classCallCheck(this, Pin);

          return _possibleConstructorReturn(this, _Column.apply(this, arguments));
        }

        return Pin;
      }(Column));

      _export('Pin', Pin);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/resource-table/tr-renderer.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><compose view-model.bind=\"view\" model.bind=\"model\"></compose></template>";
});

})();
'use strict';

System.register('app/components/resource-table/tr-renderer.js', ['aurelia-framework'], function (_export, _context) {
  "use strict";

  var bindable, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, TrRendererCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('TrRendererCustomElement', TrRendererCustomElement = (_class = function () {
        function TrRendererCustomElement() {
          _classCallCheck(this, TrRendererCustomElement);

          _initDefineProp(this, 'row', _descriptor, this);

          _initDefineProp(this, 'prop', _descriptor2, this);

          _initDefineProp(this, 'accessors', _descriptor3, this);

          _initDefineProp(this, 'view', _descriptor4, this);

          _initDefineProp(this, 'actionTrigger', _descriptor5, this);

          _initDefineProp(this, 'actions', _descriptor6, this);

          _initDefineProp(this, 'actionInProgress', _descriptor7, this);
        }

        TrRendererCustomElement.prototype.bind = function bind() {
          this.model = { row: this.row, prop: this.prop, accessors: this.accessors, actions: this.actions, actionTrigger: this.actionTrigger };
        };

        return TrRendererCustomElement;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'row', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'prop', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'accessors', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'view', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'actionTrigger', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'actions', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'actionInProgress', [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export('TrRendererCustomElement', TrRendererCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/submit.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/loader\"></require><div class=\"submit\"><a click.delegate=\"submit()\" class=\"button button-raised button-round\">${text}</a><center><loader></loader></center></div></template>";
});

})();
"use strict";

System.register("app/components/submit.js", ["aurelia-framework"], function (_export, _context) {
  "use strict";

  var bindable, _desc, _value, _class, _descriptor, SubmitCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export("SubmitCustomElement", SubmitCustomElement = (_class = function () {
        function SubmitCustomElement() {
          _classCallCheck(this, SubmitCustomElement);

          _initDefineProp(this, "text", _descriptor, this);
        }

        SubmitCustomElement.prototype.bind = function bind(parent) {
          this.$parent = parent;
        };

        SubmitCustomElement.prototype.submit = function submit() {
          this.$parent.submit();
        };

        return SubmitCustomElement;
      }(), _descriptor = _applyDecoratedDescriptor(_class.prototype, "text", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return "Submit";
        }
      }), _class));

      _export("SubmitCustomElement", SubmitCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/third-party/numeric-input.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><input type=\"text\" class=\"form-control\" value.bind=\"value\" placeholder.bind=\"placeholder\"></template>";
});

})();
'use strict';

System.register('app/components/third-party/numeric-input.js', ['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, bindable, bindingMode, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, NumericInputCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  function isNavigationOrSelectionKey(e) {
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 || [65, 67, 86, 88].indexOf(e.keyCode) !== -1 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 40) {
      return true;
    }
    return false;
  }

  function keydown(e) {
    if (isNavigationOrSelectionKey(e)) {
      return;
    }

    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
    }],
    execute: function () {
      _export('NumericInputCustomElement', NumericInputCustomElement = (_dec = inject(Element), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function NumericInputCustomElement(element) {
          _classCallCheck(this, NumericInputCustomElement);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'placeholder', _descriptor2, this);

          this.element = element;
        }

        NumericInputCustomElement.prototype.attached = function attached() {
          this.element.addEventListener('keydown', keydown);
        };

        NumericInputCustomElement.prototype.detached = function detached() {
          this.element.removeEventListener('keydown', keydown);
        };

        return NumericInputCustomElement;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class));

      _export('NumericInputCustomElement', NumericInputCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/tool-bar.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"toolbar tabbar toolbar-bottom\"><div class=\"toolbar-inner\"><a click.delegate=\"navParties()\" class=\"pointer tab-link ${page == 'parties' ? 'active': ''}\"><span class=\"tabbar-label\">Parties</span> </a><a click.delegate=\"navTrips()\" ref=\"tabTrips\" class=\"pointer tab-link ${page == 'trips' ? 'active': ''}\"><span class=\"tabbar-label\">Trips</span></a></div></div></template>";
});

})();
'use strict';

System.register('app/components/tool-bar.js', ['app/app-base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var AppBase, bindable, _desc, _value, _class, _descriptor, ToolBar;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('ToolBar', ToolBar = (_class = function (_AppBase) {
        _inherits(ToolBar, _AppBase);

        function ToolBar() {
          var _temp, _this, _ret;

          _classCallCheck(this, ToolBar);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args))), _this), _initDefineProp(_this, 'page', _descriptor, _this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        ToolBar.prototype.navParties = function navParties() {
          this.app.router.navigateToRoute('parties');
        };

        ToolBar.prototype.navTrips = function navTrips() {
          this.app.router.navigateToRoute('trips');
        };

        return ToolBar;
      }(AppBase), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'page', [bindable], {
        enumerable: true,
        initializer: null
      }), _class));

      _export('ToolBar', ToolBar);
    }
  };
});

'use strict';

System.register('app/components/trips/confirm-dialog.js', ['app/components/dialog', 'app/app'], function (_export, _context) {
  "use strict";

  var Dialog, App, ConfirmDialog;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appComponentsDialog) {
      Dialog = _appComponentsDialog.Dialog;
    }, function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _export('ConfirmDialog', ConfirmDialog = function (_Dialog) {
        _inherits(ConfirmDialog, _Dialog);

        ConfirmDialog.inject = function inject() {
          return [App];
        };

        function ConfirmDialog(app) {
          _classCallCheck(this, ConfirmDialog);

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _Dialog.call.apply(_Dialog, [this].concat(args)));

          _this.app = app;
          return _this;
        }

        return ConfirmDialog;
      }(Dialog));

      _export('ConfirmDialog', ConfirmDialog);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/trips/confirm-end.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"./parties\"></require><require from=\"app/components/cselect\"></require><require from=\"app/components/trips/other-location\"></require><require from=\"app/components/nav-popup.html\"></require><nav-popup heading=\"${heading}\" actions.bind=\"actions\"></nav-popup><center id=\"confirm-end\"><p class=\"label\">${message}?</p><div class=\"content-block\"><parties if.bind=\"selectedParties.length\" parties.bind=\"selectedParties\" selected.bind=\"selectedPartyIds\" value.bind=\"app.appContext.endTripPartyIds\"></parties></div><p class=\"label\">Confirm End Location</p><div class=\"content-block\"><cselect title=\"Location\" empty-text=\"No locations available\" options.bind=\"locations\" value.bind=\"trip.destination\"></cselect></div><div class=\"content-block\"><div class=\"row\"><div class=\"col-auto\"><other-location other.bind=\"other\"></other-location></div></div></div><div class=\"content-block\"><p class=\"label color-green\">Destination: ${trip.destination}</p><div class=\"content-block\"><div class=\"row\"><div class=\"col-auto\"><a click.delegate=\"submit()\" class=\"button button-raised button-round\">Ok</a></div></div></div></div></center></template>";
});

})();
'use strict';

System.register('app/components/trips/confirm-end.js', ['app/bootstrap-dialog', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var BootstrapDialog, bindable, computedFrom, _createClass, _dec, _desc, _value, _class, _descriptor, ConfirmEnd;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_appBootstrapDialog) {
      BootstrapDialog = _appBootstrapDialog.BootstrapDialog;
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('ConfirmEnd', ConfirmEnd = (_dec = computedFrom("app.appContext.locations"), (_class = function (_BootstrapDialog) {
        _inherits(ConfirmEnd, _BootstrapDialog);

        function ConfirmEnd() {
          var _temp, _this, _ret;

          _classCallCheck(this, ConfirmEnd);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BootstrapDialog.call.apply(_BootstrapDialog, [this].concat(args))), _this), _this.heading = "End Trip", _initDefineProp(_this, 'other', _descriptor, _this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        ConfirmEnd.prototype.activate = function activate(options) {
          var _this2 = this;

          this.trip = options.model;
          this.selectedPartyIds = this.app.appContext.tripPartyIds();
          this.selectedParties = this.app.appContext.reservedActiveParties.filter(function (party) {

            return _this2.selectedPartyIds.includes(party.id);
          });
          var these = "with these";
          if (this.selectedParties.length == 0) {
            these = "without any";
          }
          this.message = 'Are you sure want to end the trip ' + these + ' parties';
        };

        ConfirmEnd.prototype.otherChanged = function otherChanged() {
          if (this.other.length > 0) {
            this.trip.destination = this.other;
          }
        };

        ConfirmEnd.prototype.cancel = function cancel() {
          this.closeDialog();
        };

        ConfirmEnd.prototype.submit = function submit() {
          this.app.appContext.endTrip = true;
          this.closeDialog();
        };

        ConfirmEnd.prototype.setDestination = function setDestination(event) {
          this.trip.destination = event.target.innerHTML;
        };

        _createClass(ConfirmEnd, [{
          key: 'locations',
          get: function get() {
            return this.app.appContext.locations.map(function (location) {
              return location.name;
            });
          }
        }]);

        return ConfirmEnd;
      }(BootstrapDialog), (_applyDecoratedDescriptor(_class.prototype, 'locations', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'locations'), _class.prototype), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'other', [bindable], {
        enumerable: true,
        initializer: null
      })), _class)));

      _export('ConfirmEnd', ConfirmEnd);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/trips/confirm-start.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/cselect\"></require><require from=\"./parties\"></require><require from=\"app/components/nav-popup.html\"></require><nav-popup heading=\"${heading}\" actions.bind=\"actions\"></nav-popup><div class=\"content-block text-center color-red\" if.bind=\"!shuttlesAvailable\"><p>Sorry you cannot start the trip, no shuttles are available at your location.</p></div><div if.bind=\"!shuttlesAvailable\"><div class=\"text-center\"><a click.delegate=\"closeDialog()\" class=\"button button-raised\">Ok</a></div></div><form id=\"confirm-start\" role=\"form\" submit.delegate=\"submit()\" if.bind=\"shuttlesAvailable\"><center><p class=\"label\">${message}?</p><div class=\"content-block\"><parties parties.bind=\"app.appContext.reservedActiveParties\" selected.bind=\"selectedPartyIds\" value.bind=\"app.appContext.startTripPartyIds\"></parties></div><div class=\"content-block\"><div class=\"list-block\"><ul class=\"no-top-bottom-border\"><li><div class=\"item-content\"><div class=\"item-inner\"><div class=\"item-title label\">Shuttle:</div><div class=\"item-input\"><cselect form-control=\"false\" empty-text=\"No shuttles available at your location\" options.bind=\"shuttles\" blank-text=\"Please select a shuttle\" value.bind=\"driverShuttleId & validate\"></cselect></div></div></div></li></ul></div></div><div class=\"content-block\"><div class=\"row\"><div class=\"col-auto\"><a click.delegate=\"submit()\" class=\"button button-raised\">Ok</a></div></div></div></center></form></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/trips/other-location.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><a class=\"button button-raised other destination\" click.delegate=\"enableInputMode()\" if.bind=\"!inputMode\">Other</a> <input if.bind=\"inputMode\" type=\"text\" value.bind=\"other\"></template>";
});

})();
'use strict';

System.register('app/components/trips/other-location.js', ['aurelia-framework'], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, _dec, _desc, _value, _class, _descriptor, OtherLocationCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
    }],
    execute: function () {
      _export('OtherLocationCustomElement', OtherLocationCustomElement = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), (_class = function () {
        function OtherLocationCustomElement() {
          _classCallCheck(this, OtherLocationCustomElement);

          _initDefineProp(this, 'other', _descriptor, this);

          this.inputMode = false;
        }

        OtherLocationCustomElement.prototype.enableInputMode = function enableInputMode() {
          this.inputMode = true;
        };

        return OtherLocationCustomElement;
      }(), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'other', [_dec], {
        enumerable: true,
        initializer: null
      }), _class)));

      _export('OtherLocationCustomElement', OtherLocationCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/trips/parties.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"label\" repeat.for=\"party of selectedParties\">${party.display()}</div></template>";
});

})();
'use strict';

System.register('app/components/trips/parties.js', ['aurelia-framework'], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, computedFrom, _dec, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, PartiesCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      _export('PartiesCustomElement', PartiesCustomElement = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), (_class = function () {
        function PartiesCustomElement() {
          _classCallCheck(this, PartiesCustomElement);

          _initDefineProp(this, 'parties', _descriptor, this);

          _initDefineProp(this, 'selected', _descriptor2, this);

          _initDefineProp(this, 'value', _descriptor3, this);
        }

        PartiesCustomElement.prototype.attached = function attached() {
          var _this = this;

          this.value = this.selected;
          this.selectedParties = this.parties.filter(function (party) {
            return _this.selected.includes(party.id);
          });
        };

        return PartiesCustomElement;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'parties', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'selected', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'value', [_dec], {
        enumerable: true,
        initializer: null
      })), _class)));

      _export('PartiesCustomElement', PartiesCustomElement);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/trips/party-header.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"col-auto\">Party #</div><div class=\"col-auto\">Status</div><div class=\"col-auto\">Pickup</div><div class=\"col-auto\">Destination</div><div class=\"col-auto\">Date</div><div class=\"col-auto\">Departure <i class=\"f7-icons size-14\">time</i></div><div class=\"col-auto\">Arrival <i class=\"f7-icons size-14\">time</i></div><div class=\"col-auto\">Contact #</div><div class=\"col-auto\">Room #</div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/trips/party.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"party\"><a class=\"item-link pointer item-content\"><div class=\"item-inner\" click.delegate=\"showArchived(party)\"><div class=\"item-title-row\"><div class=\"item-title\">${party.paddedNumber}</div><div class=\"item-after\">${party.partySize}</div></div><div class=\"item-subtitle\">${party.partyName}</div><div class=\"item-text\"><div class=\"row\"><p>${party.date} ${party.departure}</p><p>Pickup: ${party.pickup}</p></div></div></div></a></template>";
});

})();
'use strict';

System.register('app/components/trips/party.js', ['app/app-base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var AppBase, bindable, _desc, _value, _class, _descriptor, Party;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('Party', Party = (_class = function (_AppBase) {
        _inherits(Party, _AppBase);

        function Party() {
          var _temp, _this, _ret;

          _classCallCheck(this, Party);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args))), _this), _initDefineProp(_this, 'party', _descriptor, _this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        Party.prototype.showArchived = function showArchived(party) {
          this.app.appContext.selectedParty = party;
          this.app.router.navigateToRoute("show-archived");
        };

        return Party;
      }(AppBase), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'party', [bindable], {
        enumerable: true,
        initializer: null
      }), _class));

      _export('Party', Party);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/trips/trip-add-party.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/cselect\"></require><require from=\"app/components/nav-popup.html\"></require><nav-popup heading=\"${heading}\" actions.bind=\"actions\"></nav-popup><form role=\"form\" submit.delegate=\"submit()\"><div class=\"content-block\"><cselect title=\"Party\" value.bind=\"partyToAdd & validate\" options.bind=\"availableParties\" blank-text=\"Choose Party To Add\"></cselect></div><div class=\"content-block\"><div class=\"row text-center\"><div class=\"col-auto\"><a click.delegate=\"submit()\" class=\"button button-raised\">Ok</a></div></div></div></form></template>";
});

})();
'use strict';

System.register('app/bootstrap.js', ['aurelia-framework', 'app/bootstrap-form', 'app/notifier', 'app/app'], function (_export, _context) {
  "use strict";

  var inject, bindable, BootstrapForm, Notifier, App, _dec, _dec2, _class, Bootstrap;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_appBootstrapForm) {
      BootstrapForm = _appBootstrapForm.BootstrapForm;
    }, function (_appNotifier) {
      Notifier = _appNotifier.Notifier;
    }, function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _export('Bootstrap', Bootstrap = (_dec = bindable("actions"), _dec2 = inject(BootstrapForm, Notifier, App), _dec(_class = _dec2(_class = function () {
        function Bootstrap(bootstrapForm, notifier, app) {
          var _this = this;

          _classCallCheck(this, Bootstrap);

          this.bootstrapForm = bootstrapForm;
          this.notifier = notifier;
          this.app = app;
          this.bootstrapForm.configureFormValidationRules(this, function (rules) {
            return _this.formValidationRules(rules);
          });
        }

        Bootstrap.prototype.formValidationRules = function formValidationRules(rules) {};

        Bootstrap.prototype.submit = function submit() {
          var _this2 = this;

          var defaultSuccess = function defaultSuccess() {
            return _this2.actions.success(_this2);
          };
          var success = this.submitSuccess() || defaultSuccess;
          var defaultError = function defaultError(errors) {
            errors.forEach(function (error) {
              _this2.notifier.formError(error);
            });
          };
          var error = this.submitError || defaultError;
          this.bootstrapForm.validateSubmit(success, error);
        };

        return Bootstrap;
      }()) || _class) || _class));

      _export('Bootstrap', Bootstrap);
    }
  };
});

'use strict';

System.register('app/bootstrap-dialog.js', ['app/bootstrap'], function (_export, _context) {
  "use strict";

  var Bootstrap, BootstrapDialog;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appBootstrap) {
      Bootstrap = _appBootstrap.Bootstrap;
    }],
    execute: function () {
      _export('BootstrapDialog', BootstrapDialog = function (_Bootstrap) {
        _inherits(BootstrapDialog, _Bootstrap);

        function BootstrapDialog() {
          var _temp, _this, _ret;

          _classCallCheck(this, BootstrapDialog);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Bootstrap.call.apply(_Bootstrap, [this].concat(args))), _this), _this.actions = {
            closePopup: function closePopup() {
              return _this.closeDialog();
            }
          }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        BootstrapDialog.prototype.closeDialog = function closeDialog() {
          this.app.appContext.closePopup();
        };

        return BootstrapDialog;
      }(Bootstrap));

      _export('BootstrapDialog', BootstrapDialog);
    }
  };
});

"use strict";

System.register("app/components/trips/trip-add-party.js", ["app/bootstrap-dialog", "aurelia-framework"], function (_export, _context) {
  "use strict";

  var BootstrapDialog, inject, TripAddParty;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appBootstrapDialog) {
      BootstrapDialog = _appBootstrapDialog.BootstrapDialog;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export("TripAddParty", TripAddParty = function (_BootstrapDialog) {
        _inherits(TripAddParty, _BootstrapDialog);

        function TripAddParty() {
          var _temp, _this, _ret;

          _classCallCheck(this, TripAddParty);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BootstrapDialog.call.apply(_BootstrapDialog, [this].concat(args))), _this), _this.heading = "Add Party To Trip", _temp), _possibleConstructorReturn(_this, _ret);
        }

        TripAddParty.prototype.activate = function activate() {
          var tripPartyIds = this.app.appContext.tripPartyIds();
          this.availableParties = this.app.appContext.reservedActiveParties.filter(function (party) {
            return !tripPartyIds.includes(party.id);
          }).map(function (party) {
            var name = party.paddedNumber + ": " + party.partyName + " Party of " + party.partySize;
            return { id: party.id, name: name };
          });
        };

        TripAddParty.prototype.submitSuccess = function submitSuccess() {
          var _this2 = this;

          return function () {
            _this2.app.appContext.midTripPartyIds.push(_this2.partyToAdd);
            _this2.closeDialog();
          };
        };

        TripAddParty.prototype.formValidationRules = function formValidationRules(rules) {
          return rules.ensure(function (a) {
            return a.partyToAdd;
          }).required();
        };

        return TripAddParty;
      }(BootstrapDialog));

      _export("TripAddParty", TripAddParty);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/trips/trip-duration.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/converters/duration\"></require>${value | duration}</template>";
});

})();
'use strict';

System.register('app/components/trips/trip-duration.js', ['moment', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var moment, bindable, _desc, _value, _class, _descriptor, TripDuration;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('TripDuration', TripDuration = (_class = function () {
        function TripDuration() {
          _classCallCheck(this, TripDuration);

          _initDefineProp(this, 'startTime', _descriptor, this);
        }

        TripDuration.prototype.attached = function attached() {
          var _this = this;

          this.unixStartTime = moment.unix(this.startTime);
          this.update();
          setInterval(function () {
            return _this.update();
          }, 1000);
        };

        TripDuration.prototype.update = function update() {
          var now = moment().unix();
          this.value = moment.unix(now).diff(this.unixStartTime, 'seconds');
        };

        return TripDuration;
      }(), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'startTime', [bindable], {
        enumerable: true,
        initializer: null
      }), _class));

      _export('TripDuration', TripDuration);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/trips/trip-header.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"col-auto\">Trip #</div><div class=\"col-auto\">Status</div><div class=\"col-auto\">Pickup</div><div class=\"col-auto\">Destination</div><div class=\"col-auto\">Date</div><div class=\"col-auto\">Departure <i class=\"f7-icons size-14\">time</i></div><div class=\"col-auto\">Arrival <i class=\"f7-icons size-14\">time</i></div><div class=\"col-auto\"># in Party</div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/trips/trip-list.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template bindable=\"list, isA\"><require from=\"app/components/trips/trip\"></require><require from=\"app/components/trips/party\"></require><div id=\"trips\" class=\"list-block media-list\"><ul><li repeat.for=\"item of list\"><trip trip.bind=\"item\" if.bind=\"isA.isTrip(item)\" containerless></trip><party party.bind=\"item\" if.bind=\"isA.isParty(item)\" containerless></party></li></ul></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/components/trips/trip.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><a class=\"item-link pointer item-content\"><div class=\"item-inner\" click.delegate=\"showTrip(trip)\"><div class=\"item-title-row\"><div class=\"item-title\">${trip.paddedNumber}</div><div class=\"item-after\">${trip.status}</div></div><div class=\"item-subtitle\">${trip.destination}</div><div class=\"item-text\"><div class=\"row\"><p>Departure: ${trip.date} ${trip.departure}</p><p if.bind=\"trip.arrival\">Arrival: ${trip.arrival}</p></div></div></div></a></template>";
});

})();
'use strict';

System.register('app/components/trips/trip.js', ['app/app-base', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var AppBase, bindable, _desc, _value, _class, _descriptor, Trip;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('Trip', Trip = (_class = function (_AppBase) {
        _inherits(Trip, _AppBase);

        function Trip() {
          var _temp, _this, _ret;

          _classCallCheck(this, Trip);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args))), _this), _initDefineProp(_this, 'trip', _descriptor, _this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        Trip.prototype.showTrip = function showTrip(trip) {
          this.app.appContext.selectedTrip = trip;
          this.app.router.navigateToRoute("show-trip");
        };

        return Trip;
      }(AppBase), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'trip', [bindable], {
        enumerable: true,
        initializer: null
      }), _class));

      _export('Trip', Trip);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/components/zip-code.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"aurelia-mask\"></require><input type=\"text\" class=\"form-control\" masked=\"value.bind: value; mask: 99999;\"></template>";
});

})();
'use strict';

System.register('app/components/zip-code.js', ['aurelia-framework'], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, _dec, _desc, _value, _class, _descriptor, ZipCodeCustomElement;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
    }],
    execute: function () {
      _export('ZipCodeCustomElement', ZipCodeCustomElement = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), (_class = function ZipCodeCustomElement() {
        _classCallCheck(this, ZipCodeCustomElement);

        _initDefineProp(this, 'value', _descriptor, this);
      }, _descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_dec], {
        enumerable: true,
        initializer: null
      }), _class)));

      _export('ZipCodeCustomElement', ZipCodeCustomElement);
    }
  };
});

'use strict';

System.register('app/converters/admin-filter.js', ['aurelia-framework', 'app/auth-context'], function (_export, _context) {
  "use strict";

  var inject, AuthContext, _dec, _class, AdminFilterValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }],
    execute: function () {
      _export('AdminFilterValueConverter', AdminFilterValueConverter = (_dec = inject(AuthContext), _dec(_class = function () {
        function AdminFilterValueConverter(authContext) {
          _classCallCheck(this, AdminFilterValueConverter);

          this.authContext = authContext;
        }

        AdminFilterValueConverter.prototype.toView = function toView(routes) {
          var _this = this;

          return routes.filter(function (route) {
            var settings = route.config.settings;
            if (settings) {

              if (settings.role == "Admin") {

                return _this.authContext.isAdmin();
              }
            }
            return true;
          });
        };

        return AdminFilterValueConverter;
      }()) || _class));

      _export('AdminFilterValueConverter', AdminFilterValueConverter);
    }
  };
});

'use strict';

System.register('app/converters/am-pm.js', ['moment'], function (_export, _context) {
  "use strict";

  var moment, AmpmValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      _export('AmpmValueConverter', AmpmValueConverter = function () {
        function AmpmValueConverter() {
          _classCallCheck(this, AmpmValueConverter);
        }

        AmpmValueConverter.prototype.toView = function toView(value) {
          console.log('am pm', value);
          return moment(value).format('h:mm:ss a');
        };

        return AmpmValueConverter;
      }());

      _export('AmpmValueConverter', AmpmValueConverter);
    }
  };
});

"use strict";

System.register("app/converters/collapse-filter.js", [], function (_export, _context) {
  "use strict";

  var CollapseFilterValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("CollapseFilterValueConverter", CollapseFilterValueConverter = function () {
        function CollapseFilterValueConverter() {
          _classCallCheck(this, CollapseFilterValueConverter);
        }

        CollapseFilterValueConverter.prototype.toView = function toView(routes) {
          return routes.filter(function (route) {
            var settings = route.config.settings;
            if (settings) {
              if (settings.notCollapsed) {
                return false;
              }
            }
            return true;
          });
        };

        return CollapseFilterValueConverter;
      }());

      _export("CollapseFilterValueConverter", CollapseFilterValueConverter);
    }
  };
});

'use strict';

System.register('app/converters/duration.js', ['moment', 'pad-number'], function (_export, _context) {
  "use strict";

  var moment, pad, DurationValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }, function (_padNumber) {
      pad = _padNumber.default;
    }],
    execute: function () {
      _export('DurationValueConverter', DurationValueConverter = function () {
        function DurationValueConverter() {
          _classCallCheck(this, DurationValueConverter);
        }

        DurationValueConverter.prototype.toView = function toView(value) {
          var duration = moment.duration(value, "seconds");
          var minutes = pad(duration.minutes(), 2);
          var seconds = pad(duration.seconds(), 2);
          var hours = pad(duration.hours(), 2);
          if (duration.hours() == 0) {
            return minutes + ':' + seconds;
          } else {
            return hours + ':' + minutes + ':' + seconds;
          }
        };

        return DurationValueConverter;
      }());

      _export('DurationValueConverter', DurationValueConverter);
    }
  };
});

'use strict';

System.register("app/converters/initials.js", [], function (_export, _context) {
  "use strict";

  var InitialsValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('InitialsValueConverter', InitialsValueConverter = function () {
        function InitialsValueConverter() {
          _classCallCheck(this, InitialsValueConverter);
        }

        InitialsValueConverter.prototype.toView = function toView(name) {
          return name.split(' ').map(function (part) {
            return part[0];
          }).join('');
        };

        return InitialsValueConverter;
      }());

      _export('InitialsValueConverter', InitialsValueConverter);
    }
  };
});

"use strict";

System.register("app/converters/not-collapsed-filter.js", [], function (_export, _context) {
  "use strict";

  var NotCollapsedFilterValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("NotCollapsedFilterValueConverter", NotCollapsedFilterValueConverter = function () {
        function NotCollapsedFilterValueConverter() {
          _classCallCheck(this, NotCollapsedFilterValueConverter);
        }

        NotCollapsedFilterValueConverter.prototype.toView = function toView(routes) {
          return routes.filter(function (route) {
            var settings = route.config.settings;
            if (settings) {
              if (settings.notCollapsed) {
                return true;
              }
            }
            return false;
          });
        };

        return NotCollapsedFilterValueConverter;
      }());

      _export("NotCollapsedFilterValueConverter", NotCollapsedFilterValueConverter);
    }
  };
});

"use strict";

System.register("app/converters/password-filter.js", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {}
  };
});

'use strict';

System.register('app/converters/trip-number.js', ['pad-number'], function (_export, _context) {
  "use strict";

  var pad, TripnumberValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_padNumber) {
      pad = _padNumber.default;
    }],
    execute: function () {
      _export('TripnumberValueConverter', TripnumberValueConverter = function () {
        function TripnumberValueConverter() {
          _classCallCheck(this, TripnumberValueConverter);
        }

        TripnumberValueConverter.prototype.toView = function toView(number) {
          return 'T-' + pad(number, 4);
        };

        return TripnumberValueConverter;
      }());

      _export('TripnumberValueConverter', TripnumberValueConverter);
    }
  };
});

"use strict";

System.register("app/converters/trips-filter.js", [], function (_export, _context) {
  "use strict";

  var TripsFilterValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("TripsFilterValueConverter", TripsFilterValueConverter = function () {
        function TripsFilterValueConverter() {
          _classCallCheck(this, TripsFilterValueConverter);
        }

        TripsFilterValueConverter.prototype.toView = function toView(trips, criteria) {};

        return TripsFilterValueConverter;
      }());

      _export("TripsFilterValueConverter", TripsFilterValueConverter);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/location-not-found.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"content-block-title color-red\">Uh-oh</div><div class=\"content-block\"><div class=\"content-block-inner\"><p>Your location information is not valid.</p><p>Please make sure you location setting is valid and try again.</p></div></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/main-view.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/nav-bar\"></require><require from=\"app/components/tool-bar\"></require><div class=\"views\"><div class=\"view view-main\"><nav-bar if.bind=\"currentPage && !appContext.isAndroid\" page.bind=\"currentPage\"></nav-bar><div class=\"pages navbar-fixed toolbar-through\"><div data-page=\"index\" class=\"page\"><nav-bar if.bind=\"currentPage && appContext.isAndroid\" page.bind=\"currentPage\"></nav-bar><tool-bar if.bind=\"currentPageName && appContext.isAndroid\" page.bind=\"currentPageName\" containerless></tool-bar><div class=\"page-content ${currentPageClass} text-normal\"><router-view></router-view></div></div></div><tool-bar if.bind=\"currentPageName && !appContext.isAndroid\" page.bind=\"currentPageName\" containerless></tool-bar></div></div></template>";
});

})();
'use strict';

System.register('app/main-view.js', ['aurelia-framework', 'app/app-context'], function (_export, _context) {
  "use strict";

  var bindable, computedFrom, AppContext, _createClass, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, MainView;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appAppContext) {
      AppContext = _appAppContext.AppContext;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('MainView', MainView = (_dec = computedFrom("router.currentInstruction.config.moduleId"), _dec2 = computedFrom("currentPageName"), _dec3 = computedFrom("router.currentInstruction"), (_class = function () {
        MainView.inject = function inject() {
          return [AppContext];
        };

        function MainView(appContext) {
          _classCallCheck(this, MainView);

          _initDefineProp(this, 'router', _descriptor, this);

          this.appContext = appContext;
        }

        _createClass(MainView, [{
          key: 'currentPage',
          get: function get() {
            var currentInstruction = this.router.currentInstruction;
            if (currentInstruction) {
              return currentInstruction.config.moduleId;
            }
          }
        }, {
          key: 'currentPageClass',
          get: function get() {
            return this.currentPageName;
          }
        }, {
          key: 'currentPageName',
          get: function get() {
            var currentInstruction = this.router.currentInstruction;
            if (currentInstruction) {
              return currentInstruction.config.name;
            }
          }
        }]);

        return MainView;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [bindable], {
        enumerable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class.prototype, 'currentPage', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'currentPage'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'currentPageClass', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'currentPageClass'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'currentPageName', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'currentPageName'), _class.prototype)), _class)));

      _export('MainView', MainView);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/n-popup.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div id=\"npopup\" class=\"popup npopup tablet-fullscreen\"><div class=\"view popup-view text-normal\"><compose if.bind=\"canShowNPopup\" view-model.bind=\"view\" model.bind=\"model\"></compose></div></div></template>";
});

})();
'use strict';

System.register('app/n-popup.js', ['aurelia-framework', 'app/app-base'], function (_export, _context) {
  "use strict";

  var computedFrom, AppBase, _createClass, _dec, _dec2, _dec3, _desc, _value, _class, NPopup;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('NPopup', NPopup = (_dec = computedFrom("app.appContext.nPopupView"), _dec2 = computedFrom("app.appContext.canShowNPopup"), _dec3 = computedFrom("appContext.nPopupModel"), (_class = function (_AppBase) {
        _inherits(NPopup, _AppBase);

        function NPopup() {
          _classCallCheck(this, NPopup);

          return _possibleConstructorReturn(this, _AppBase.apply(this, arguments));
        }

        _createClass(NPopup, [{
          key: 'view',
          get: function get() {
            return this.app.appContext.nPopupView;
          }
        }, {
          key: 'canShowNPopup',
          get: function get() {
            return this.app.appContext.canShowNPopup;
          }
        }, {
          key: 'model',
          get: function get() {
            return this.app.appContext.nPopupModel;
          }
        }]);

        return NPopup;
      }(AppBase), (_applyDecoratedDescriptor(_class.prototype, 'view', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'view'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'canShowNPopup', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'canShowNPopup'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'model', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'model'), _class.prototype)), _class)));

      _export('NPopup', NPopup);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/not-found.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div class=\"content-block-title color-red\">Uh-oh</div><div class=\"content-block\"><div class=\"content-block-inner\"><p class=\"text-xs-center\">It looks like you have taken a wrong turn</p><p class=\"text-xs-center\">Take a few deep breaths and <a route-href=\"route: trips\">start</a> again.</p></div></div></template>";
});

})();
"use strict";

System.register("app/not-found.js", [], function (_export, _context) {
  "use strict";

  var NotFound;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("NotFound", NotFound = function NotFound() {
        _classCallCheck(this, NotFound);
      });

      _export("NotFound", NotFound);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/parties.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/parties/party-list\"></require><div if.bind=\"app.authContext.hasLocation\"><party-list parties.bind=\"parties\" containerless></party-list></div></template>";
});

})();
'use strict';

System.register('app/bootstrap-form.js', ['aurelia-validation', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var ValidationControllerFactory, ValidationController, ValidationRules, inject, NewInstance, _dec, _class, BootstrapForm;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaValidation) {
      ValidationControllerFactory = _aureliaValidation.ValidationControllerFactory;
      ValidationController = _aureliaValidation.ValidationController;
      ValidationRules = _aureliaValidation.ValidationRules;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      NewInstance = _aureliaFramework.NewInstance;
    }],
    execute: function () {
      _export('BootstrapForm', BootstrapForm = (_dec = inject(NewInstance.of(ValidationController)), _dec(_class = function () {
        function BootstrapForm(controller) {
          _classCallCheck(this, BootstrapForm);

          this.controller = controller;
        }

        BootstrapForm.prototype.validationRules = function validationRules() {
          return ValidationRules;
        };

        BootstrapForm.prototype.configureFormValidationRules = function configureFormValidationRules(target, configure) {
          var validations = configure(this.validationRules());
          if (validations) {
            validations.on(target);
          }
          return validations;
        };

        BootstrapForm.prototype.validateSubmit = function validateSubmit(success, error) {
          return this.controller.validate().then(function (result) {
            if (result.length == 0) {
              return success();
            } else {
              error(result);
            }
          });
        };

        return BootstrapForm;
      }()) || _class));

      _export('BootstrapForm', BootstrapForm);
    }
  };
});

'use strict';

System.register('app/resource-dialog-form.js', ['app/resource-dialog', 'aurelia-framework', 'app/bootstrap-form', 'aurelia-validation', 'app/utils', 'app/stores', 'app/app', 'app/collection'], function (_export, _context) {
  "use strict";

  var ResourceDialog, inject, BootstrapForm, ValidationRules, Utils, Stores, App, Collection, _dec, _class, submit, ResourceDialogForm;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appResourceDialog) {
      ResourceDialog = _appResourceDialog.ResourceDialog;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appBootstrapForm) {
      BootstrapForm = _appBootstrapForm.BootstrapForm;
    }, function (_aureliaValidation) {
      ValidationRules = _aureliaValidation.ValidationRules;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appStores) {
      Stores = _appStores.Stores;
    }, function (_appApp) {
      App = _appApp.App;
    }, function (_appCollection) {
      Collection = _appCollection.Collection;
    }],
    execute: function () {
      submit = function submit(success) {
        var _this = this;

        var error = function error(errors) {
          errors.forEach(function (error) {
            _this.app.notifier.formError(error);
          });
        };
        this.bootstrapForm.validateSubmit(function () {
          return Promise.resolve(success()).then(function () {
            _this.app.appContext.closePopup();
          }).catch(function (err) {
            _this.app.notifier.danger(err);
          });
        }, error);
      };

      _export('ResourceDialogForm', ResourceDialogForm = (_dec = inject(BootstrapForm, Stores, App), _dec(_class = function (_ResourceDialog) {
        _inherits(ResourceDialogForm, _ResourceDialog);

        function ResourceDialogForm(bootstrapForm, stores, app) {
          _classCallCheck(this, ResourceDialogForm);

          for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            args[_key - 3] = arguments[_key];
          }

          var _this2 = _possibleConstructorReturn(this, _ResourceDialog.call.apply(_ResourceDialog, [this].concat(args)));

          _this2.bootstrapForm = bootstrapForm;
          _this2.stores = stores;
          _this2.app = app;
          _this2.collection = Collection;
          _this2.store = stores.get(_this2.resourceName());
          _this2.bootstrapForm.configureFormValidationRules(_this2, function (rules) {
            _this2.validationRules = _this2.formValidationRules(rules);
            return _this2.validationRules;
          });
          return _this2;
        }

        ResourceDialogForm.prototype.initFromModel = function initFromModel(model) {
          var _this3 = this;

          this.id = model.id;
          Utils.forEachModelProp(this.resourceModel(), function (prop) {
            if (!Utils.isNullOrUndefined(model[prop])) {
              _this3[prop] = model[prop];
            }
          });
        };

        ResourceDialogForm.prototype.activate = function activate(options) {
          this.options = options;
          var Model = this.resourceModel();
          var model = new Model(options.model);
          this.editMode = !model.isNew();
          if (this.editMode) {
            this.heading = 'Edit ' + Utils.capitalize(this.resourceName());
          }

          this.initFromModel(options.model);
        };

        ResourceDialogForm.prototype.formValidationRules = function formValidationRules(rules) {};

        ResourceDialogForm.prototype.addItemSubmit = function addItemSubmit() {
          var _this4 = this;

          console.log('adding item!!!!');
          submit.call(this, function () {
            return _this4.store.addItem(_this4.toModel());
          });
        };

        ResourceDialogForm.prototype.editItemSubmit = function editItemSubmit() {
          var _this5 = this;

          submit.call(this, function () {
            return _this5.store.updateItem(Object.assign(_this5.toModel(), { id: _this5.id }));
          });
        };

        ResourceDialogForm.prototype.disableValidationRules = function disableValidationRules() {
          this.bootstrapForm.validationRules().off(this);
        };

        ResourceDialogForm.prototype.enableValidationRules = function enableValidationRules() {
          this.validationRules.on(this);
        };

        ResourceDialogForm.prototype.submit = function submit() {
          console.log('submitting form!!!!!!');
          if (this.editMode) {
            this.editItemSubmit();
          } else {
            this.addItemSubmit();
          }
        };

        return ResourceDialogForm;
      }(ResourceDialog)) || _class));

      _export('ResourceDialogForm', ResourceDialogForm);
    }
  };
});

"use strict";

System.register("app/parties/add-party.js", ["app/resource-dialog-form"], function (_export, _context) {
  "use strict";

  var ResourceDialogForm, _createClass, _class, _temp2, AddParty;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appResourceDialogForm) {
      ResourceDialogForm = _appResourceDialogForm.ResourceDialogForm;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("AddParty", AddParty = (_temp2 = _class = function (_ResourceDialogForm) {
        _inherits(AddParty, _ResourceDialogForm);

        function AddParty() {
          var _temp, _this, _ret;

          _classCallCheck(this, AddParty);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _ResourceDialogForm.call.apply(_ResourceDialogForm, [this].concat(args))), _this), _this.heading = "Add Party", _this.partySize = 1, _temp), _possibleConstructorReturn(_this, _ret);
        }

        AddParty.prototype.validatesPickupDestination = function validatesPickupDestination(destination) {
          if (destination) {
            return destination != this.pickup;
          }
        };

        AddParty.prototype.formValidationRules = function formValidationRules(rules) {
          var _this2 = this;

          return rules.ensure(function (a) {
            return a.partyName;
          }).required().ensure(function (a) {
            return a.departureTime;
          }).required().ensure(function (a) {
            return a.pickup;
          }).required().ensure(function (a) {
            return a.destination;
          }).required().satisfies(function (destination) {
            return destination != _this2.pickup;
          }).withMessage('Destination must be different from pickup').when(function (a) {
            return a.destination.length > 0;
          }).ensure(function (a) {
            return a.contactNumber;
          }).satisfiesRule("phoneLength").ensure(function (a) {
            return a.email;
          }).email().when(function (a) {
            return a.email !== undefined && a.email.length > 0;
          }).ensure(function (a) {
            return a.partySize;
          }).satisfiesRule('positiveInteger');
        };

        _createClass(AddParty, [{
          key: "locationValid",
          get: function get() {
            return this.app.authContext.hasLocation();
          }
        }]);

        return AddParty;
      }(ResourceDialogForm), _class.dialogResourceName = "party", _temp2));

      _export("AddParty", AddParty);
    }
  };
});

'use strict';

System.register('app/parties.js', ['aurelia-framework', 'app/add-resource-dialog', 'app/parties/add-party', 'app/auth-context', 'app/utils', 'app/app'], function (_export, _context) {
  "use strict";

  var bindable, AddResourceDialog, AddParty, AuthContext, Utils, App, _desc, _value, _class, _descriptor, _class2, _temp, Parties;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }, function (_appAddResourceDialog) {
      AddResourceDialog = _appAddResourceDialog.AddResourceDialog;
    }, function (_appPartiesAddParty) {
      AddParty = _appPartiesAddParty.AddParty;
    }, function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _export('Parties', Parties = (_class = (_temp = _class2 = function (_AddResourceDialog) {
        _inherits(Parties, _AddResourceDialog);

        Parties.inject = function inject() {
          return [AuthContext, App];
        };

        function Parties(authContext, app) {
          _classCallCheck(this, Parties);

          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _AddResourceDialog.call.apply(_AddResourceDialog, [this].concat(args)));

          _this.actionTriggers = {
            startTrip: function startTrip() {
              var party = _this.app.appContext.selectedParties()[0];
              _this.getApi().startTrip(_this.driverId, party.departureTime, party.pickup, party.destination, _this.app.appContext.driverShuttleId).then(function (updated) {
                _this.app.router.navigateToRoute("active-trip").then(function () {
                  return _this.actionSuccess("Trip started successfully.");
                });
              }).catch(function (err) {
                return _this.actionError(err);
              });
            }
          };

          _initDefineProp(_this, 'parties', _descriptor, _this);

          _this.updateRowClass = {
            update: function update(row, callback) {
              callback(_this.selectRowClass(row));
            }
          };

          _this.authContext = authContext;
          _this.app = app;
          _this.initActionTrigger();
          return _this;
        }

        Parties.prototype.actionSuccess = function actionSuccess(message) {
          this.api.notifier.success(message);
        };

        Parties.prototype.actionError = function actionError(message) {
          this.api.notifier.danger(message);
        };

        Parties.prototype.selectRowClass = function selectRowClass(party) {
          var color = "";
          switch (true) {
            case party.isLate:
              color = "red";break;
            case party.isActive:
              color = "green";break;
            case party.isReserved:
              color = "yellow";break;
          }
          if (color.length) {
            return 'party ' + color;
          }
        };

        Parties.prototype.activate = function activate() {
          var _this2 = this;

          this.addStoreSubscriptions();
          this.app.appContext.partyController = this;
          this.app.appContext.selectedRows = [];
          var isDriver = this.authContext.isDriver();
          if (isDriver) {
            this.driverId = this.authContext.currentUser.id;
            this.actionView = "app/components/resource-table/actions/driver-trips";
          }
          return this.app.appContext.loadLocations().then(function () {
            return _this2.app.appContext.loadReservedActiveParties(_this2).then(function () {
              return _this2.parties = _this2.reservedActiveParties;
            });
          });
        };

        Parties.prototype.deactivate = function deactivate() {
          this.removeStoreSubscriptions();
        };

        return Parties;
      }(AddResourceDialog), _class2.dialogResourceName = "party", _temp), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'parties', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class));

      _export('Parties', Parties);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/parties/add-party.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/trips/pickup-destination\"></require><require from=\"app/components/date-time-picker\"></require><require from=\"app/components/phone-number\"></require><require from=\"app/components/form-element.html\"></require><require from=\"app/components/third-party/numeric-input\"></require><require from=\"app/components/nav-popup.html\"></require><require from=\"app/location-not-found.html\"></require><location-not-found if.bind=\"!locationValid\"></location-not-found><div class=\"actions content-block\" if.bind=\"!locationValid\"><div class=\"text-center\"><a click.delegate=\"closeDialog()\" class=\"button button-raised\">Ok</a></div></div><nav-popup heading=\"${heading}\" actions.bind=\"actions\"></nav-popup><div class=\"content-block\" if.bind=\"locationValid\"><form id=\"add-party\" role=\"form\" submit.delegate=\"submit()\"><pickup-destination hotel=\"${app.authContext.currentLocation()}\" from.bind=\"pickup & validate\" to.bind=\"destination & validate\"></pickup-destination><date-time-picker value.bind=\"departureTime & validate\">></date-time-picker><div class=\"list-block\"><ul class=\"no-top-border\"><form-element label=\"Party Name\" containerless><input value.bind=\"partyName & validate\" type=\"text\"></form-element><form-element label=\"Party Size\" containerless><numeric-input id=\"party-size\" value.bind=\"partySize & validate\"></numeric-input></form-element><form-element label=\"Contact #\" containerless><phone-number id=\"contact-number\" value.bind=\"contactNumber & validate\"></phone-number></form-element><form-element label=\"Room #\" containerless><numeric-input id=\"room-number\" value.bind=\"roomNumber\"></numeric-input></form-element><form-element label=\"Email\" containerless><input class=\"form-control\" id=\"email\" type=\"email\" value.bind=\"email & validate\"></form-element><form-element label=\"Trip Notes\" containerless><textarea value.bind=\"tripNotes & validate\" rows=\"3\"></textarea></form-element></ul></div><div class=\"content-block\"><div class=\"row\"><div class=\"col-auto\"><a click.delegate=\"submit()\" class=\"button button-raised\">Ok</a></div></div></div></form></div></template>";
});

})();
(function() {
var define = System.amdDefine;
define("app/popup.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div id=\"popup\" class=\"popup tablet-fullscreen\"><div class=\"view popup-view text-normal\"><compose if.bind=\"canShowPopup\" view-model.bind=\"view\" model.bind=\"{model: model, actions:actions}\"></compose></div></div></template>";
});

})();
'use strict';

System.register('app/popup.js', ['aurelia-framework', 'app/app-base'], function (_export, _context) {
  "use strict";

  var computedFrom, AppBase, _createClass, _dec, _dec2, _dec3, _desc, _value, _class, Popup;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Popup', Popup = (_dec = computedFrom("app.appContext.popupView"), _dec2 = computedFrom("app.appContext.canShowPopup"), _dec3 = computedFrom("appContext.popupModel"), (_class = function (_AppBase) {
        _inherits(Popup, _AppBase);

        function Popup() {
          var _temp, _this, _ret;

          _classCallCheck(this, Popup);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args))), _this), _this.actions = {
            close: function close() {
              _this.app.appContext.closePopup();
            }
          }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(Popup, [{
          key: 'view',
          get: function get() {
            return this.app.appContext.popupView;
          }
        }, {
          key: 'canShowPopup',
          get: function get() {
            return this.app.appContext.canShowPopup;
          }
        }, {
          key: 'model',
          get: function get() {
            return this.app.appContext.popupModel;
          }
        }]);

        return Popup;
      }(AppBase), (_applyDecoratedDescriptor(_class.prototype, 'view', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'view'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'canShowPopup', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'canShowPopup'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'model', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'model'), _class.prototype)), _class)));

      _export('Popup', Popup);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/show-archived.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div if.bind=\"app.appContext.selectedParty\" class=\"card\"><div class=\"card-header\"><span>${app.appContext.selectedParty.paddedNumber}</span></div><div class=\"card-content\"><div class=\"list-block\"><ul><li class=\"item-content\" repeat.for=\"header of headers\"><div class=\"item-inner\"><div class=\"item-title\">${header}</div><div class=\"item-after\">${headerVal($index)}</div></div></li></ul></div></div></div></template>";
});

})();
'use strict';

System.register('app/show-archived.js', ['app/utils/table', 'app/app-base'], function (_export, _context) {
  "use strict";

  var TableUtils, AppBase, ShowArchived;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appUtilsTable) {
      TableUtils = _appUtilsTable.TableUtils;
    }, function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }],
    execute: function () {
      _export('ShowArchived', ShowArchived = function (_AppBase) {
        _inherits(ShowArchived, _AppBase);

        function ShowArchived() {
          var _temp, _this, _ret;

          _classCallCheck(this, ShowArchived);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args))), _this), _this.props = ["partyNumber", "status", "pickup", "destination", "date", "departure", "partySize", "contactNumber", "partyName"], _temp), _possibleConstructorReturn(_this, _ret);
        }

        ShowArchived.prototype.headerVal = function headerVal(index) {
          var prop = this.props[index];
          var party = this.app.appContext.selectedParty;
          if (this.accessors && this.accessors[prop]) {
            return this.accessors[prop](party);
          } else {
            return party[prop];
          }
        };

        ShowArchived.prototype.bind = function bind() {
          this.headers = TableUtils.headersFromProperties(this.props, this.headers || {});
        };

        return ShowArchived;
      }(AppBase));

      _export('ShowArchived', ShowArchived);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/show-party.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div if.bind=\"app.appContext.selectedParty\" class=\"card\"><div class=\"card-header\"><span>${app.appContext.selectedParty.paddedNumber}</span></div><div class=\"card-content\"><div class=\"list-block\"><ul><li class=\"item-content\" repeat.for=\"header of headers\"><div class=\"item-inner\"><div class=\"item-title\">${header}</div><div class=\"item-after\">${headerVals[props[$index]]}</div></div></li></ul></div></div></div></template>";
});

})();
'use strict';

System.register('app/resource-dialog.js', ['aurelia-framework', 'app/models', 'app/utils'], function (_export, _context) {
  "use strict";

  var inject, Models, Utils, ResourceDialog;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appModels) {
      Models = _appModels.Models;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }],
    execute: function () {
      _export('ResourceDialog', ResourceDialog = function () {
        function ResourceDialog() {
          var _this = this;

          _classCallCheck(this, ResourceDialog);

          this.staticMode = false;
          this.actions = {
            closePopup: function closePopup() {
              return _this.closeDialog();
            }
          };

          this.dialogInit();
        }

        ResourceDialog.prototype.viewModel = function viewModel() {
          if (this.staticMode) {
            return this.dialogStaticViewModel;
          } else {
            return this.dialogViewModel;
          }
        };

        ResourceDialog.prototype.closeDialog = function closeDialog() {
          this.app.appContext.closePopup();
        };

        ResourceDialog.prototype.dialogOpenStatic = function dialogOpenStatic(model) {
          this.staticMode = true;
          this.dialogOpen(model);
        };

        ResourceDialog.prototype.dialogInit = function dialogInit() {};

        ResourceDialog.prototype.dialogOpenEditResource = function dialogOpenEditResource(model) {
          this.dialogOpen(model);
        };

        ResourceDialog.prototype.dialogOpen = function dialogOpen() {
          var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        };

        ResourceDialog.prototype.dialogOpenSuccess = function dialogOpenSuccess() {};

        ResourceDialog.prototype.dialogOpenCancelled = function dialogOpenCancelled() {};

        ResourceDialog.prototype.resourceModel = function resourceModel() {
          return Models.get(this.resourceName());
        };

        ResourceDialog.prototype.toModel = function toModel() {
          var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

          var params = {};
          var model = this;
          if (target) {
            model = target;
          }
          var Model = this.resourceModel();
          Utils.forEachModelProp(Model, function (prop) {
            params[prop] = model[prop];
          });
          return new Model(params);
        };

        ResourceDialog.prototype.resourceName = function resourceName() {
          return this.constructor.dialogResourceName;
        };

        ResourceDialog.prototype.dialogCancel = function dialogCancel() {};

        ResourceDialog.prototype.dialogClose = function dialogClose() {};

        return ResourceDialog;
      }());

      _export('ResourceDialog', ResourceDialog);
    }
  };
});

"use strict";

System.register("app/stores/location.js", ["app/stores/restful"], function (_export, _context) {
  "use strict";

  var RestfulStore, LocationStore;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appStoresRestful) {
      RestfulStore = _appStoresRestful.RestfulStore;
    }],
    execute: function () {
      _export("LocationStore", LocationStore = function (_RestfulStore) {
        _inherits(LocationStore, _RestfulStore);

        function LocationStore() {
          var _temp, _this, _ret;

          _classCallCheck(this, LocationStore);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _RestfulStore.call.apply(_RestfulStore, [this].concat(args))), _this), _this.itemType = "location", _temp), _possibleConstructorReturn(_this, _ret);
        }

        return LocationStore;
      }(RestfulStore));

      _export("LocationStore", LocationStore);
    }
  };
});

"use strict";

System.register("app/stores/user.js", ["app/stores/restful"], function (_export, _context) {
  "use strict";

  var RestfulStore, UserStore;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appStoresRestful) {
      RestfulStore = _appStoresRestful.RestfulStore;
    }],
    execute: function () {
      _export("UserStore", UserStore = function (_RestfulStore) {
        _inherits(UserStore, _RestfulStore);

        function UserStore() {
          var _temp, _this, _ret;

          _classCallCheck(this, UserStore);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _RestfulStore.call.apply(_RestfulStore, [this].concat(args))), _this), _this.itemType = "user", _temp), _possibleConstructorReturn(_this, _ret);
        }

        return UserStore;
      }(RestfulStore));

      _export("UserStore", UserStore);
    }
  };
});

"use strict";

System.register("app/stores/shuttle.js", ["app/stores/restful"], function (_export, _context) {
  "use strict";

  var RestfulStore, ShuttleStore;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appStoresRestful) {
      RestfulStore = _appStoresRestful.RestfulStore;
    }],
    execute: function () {
      _export("ShuttleStore", ShuttleStore = function (_RestfulStore) {
        _inherits(ShuttleStore, _RestfulStore);

        function ShuttleStore() {
          var _temp, _this, _ret;

          _classCallCheck(this, ShuttleStore);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _RestfulStore.call.apply(_RestfulStore, [this].concat(args))), _this), _this.itemType = "shuttle", _temp), _possibleConstructorReturn(_this, _ret);
        }

        return ShuttleStore;
      }(RestfulStore));

      _export("ShuttleStore", ShuttleStore);
    }
  };
});

'use strict';

System.register('app/stores/trip.js', ['app/stores/restful', 'app/models/trip'], function (_export, _context) {
  "use strict";

  var RestfulStore, TripStatus, TripStore;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appStoresRestful) {
      RestfulStore = _appStoresRestful.RestfulStore;
    }, function (_appModelsTrip) {
      TripStatus = _appModelsTrip.TripStatus;
    }],
    execute: function () {
      _export('TripStore', TripStore = function (_RestfulStore) {
        _inherits(TripStore, _RestfulStore);

        function TripStore() {
          var _temp, _this, _ret;

          _classCallCheck(this, TripStore);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _RestfulStore.call.apply(_RestfulStore, [this].concat(args))), _this), _this.itemType = "trip", _temp), _possibleConstructorReturn(_this, _ret);
        }

        return TripStore;
      }(RestfulStore));

      _export('TripStore', TripStore);
    }
  };
});

'use strict';

System.register('app/events.js', ['aurelia-framework', 'aurelia-event-aggregator'], function (_export, _context) {
   "use strict";

   var inject, EventAggregator, _dec, _class, Events;

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   return {
      setters: [function (_aureliaFramework) {
         inject = _aureliaFramework.inject;
      }, function (_aureliaEventAggregator) {
         EventAggregator = _aureliaEventAggregator.EventAggregator;
      }],
      execute: function () {
         _export('Events', Events = (_dec = inject(EventAggregator), _dec(_class = function () {
            function Events(ea) {
               _classCallCheck(this, Events);

               this.ea = ea;
            }

            Events.prototype.publish = function publish(event, payload) {
               this.ea.publish(event, payload);
            };

            Events.prototype.subscribe = function subscribe(event, callback) {
               return this.ea.subscribe(event, callback);
            };

            return Events;
         }()) || _class));

         _export('Events', Events);
      }
   };
});

'use strict';

System.register('app/stores/restful.js', ['app/events', 'aurelia-framework', 'app/utils', 'app/api'], function (_export, _context) {
  "use strict";

  var Events, inject, Utils, Api, _createClass, _dec, _class, RestfulStore;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appEvents) {
      Events = _appEvents.Events;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appApi) {
      Api = _appApi.Api;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('RestfulStore', RestfulStore = (_dec = inject(Events, Api), _dec(_class = function () {
        function RestfulStore(events, api) {
          _classCallCheck(this, RestfulStore);

          this.items = [];
          this.itemType = "default";

          this.events = events;
          this.api = api;
        }

        RestfulStore.prototype.addItem = function addItem(item) {
          var _this = this;

          var publishAdded = function publishAdded(item) {

            _this.events.publish(_this.itemType + '.added', item);
          };
          return this.add(item).then(function (added) {
            publishAdded(added);
          });
        };

        RestfulStore.prototype.add = function add(item) {

          return this.api.addItem(this.collectionType, item);
        };

        RestfulStore.prototype.newNestedItemWithNoParent = function newNestedItemWithNoParent(item) {
          return false;
        };

        RestfulStore.prototype.deleteItem = function deleteItem(item) {
          var _this2 = this;

          return this.delete(item).then(function () {
            _this2.events.publish(_this2.itemType + '.deleted', item);
          });
        };

        RestfulStore.prototype.updateItem = function updateItem(item) {
          var _this3 = this;

          return this.update(item).then(function (updated) {
            _this3.events.publish(_this3.itemType + '.updated', updated);
          });
        };

        RestfulStore.prototype.delete = function _delete(item) {
          return this.api.deleteItem(this.collectionType, item.id);
        };

        RestfulStore.prototype.update = function update(item) {
          return this.api.updateItem(this.collectionType, item);
        };

        RestfulStore.prototype.eventName = function eventName(type) {
          return this.itemType + '.' + type;
        };

        RestfulStore.prototype.addSubscriptions = function addSubscriptions(target, subscriptions) {
          var _this4 = this;

          var subscribers = [];
          Utils.toMap(subscriptions).forEach(function (callback, eventType) {
            subscribers.push(_this4.events.subscribe(_this4.eventName(eventType), function (payload) {
              target[callback](payload);
            }));
          });
          return subscribers;
        };

        RestfulStore.prototype.removeSubscriptions = function removeSubscriptions(subscribers) {
          subscribers.forEach(function (subscriber) {
            subscriber.dispose();
          });
        };

        _createClass(RestfulStore, [{
          key: 'collectionType',
          get: function get() {
            return Utils.collectionType(this.itemType);
          }
        }]);

        return RestfulStore;
      }()) || _class));

      _export('RestfulStore', RestfulStore);
    }
  };
});

"use strict";

System.register("app/stores/party.js", ["app/stores/restful"], function (_export, _context) {
  "use strict";

  var RestfulStore, PartyStore;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appStoresRestful) {
      RestfulStore = _appStoresRestful.RestfulStore;
    }],
    execute: function () {
      _export("PartyStore", PartyStore = function (_RestfulStore) {
        _inherits(PartyStore, _RestfulStore);

        function PartyStore() {
          var _temp, _this, _ret;

          _classCallCheck(this, PartyStore);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _RestfulStore.call.apply(_RestfulStore, [this].concat(args))), _this), _this.itemType = "party", _temp), _possibleConstructorReturn(_this, _ret);
        }

        return PartyStore;
      }(RestfulStore));

      _export("PartyStore", PartyStore);
    }
  };
});

'use strict';

System.register('app/stores/index.js', ['./location', './user', './shuttle', './trip', './party'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_location) {
      var _exportObj = {};
      _exportObj.LocationStore = _location.LocationStore;

      _export(_exportObj);
    }, function (_user) {
      var _exportObj2 = {};
      _exportObj2.UserStore = _user.UserStore;

      _export(_exportObj2);
    }, function (_shuttle) {
      var _exportObj3 = {};
      _exportObj3.ShuttleStore = _shuttle.ShuttleStore;

      _export(_exportObj3);
    }, function (_trip) {
      var _exportObj4 = {};
      _exportObj4.TripStore = _trip.TripStore;

      _export(_exportObj4);
    }, function (_party) {
      var _exportObj5 = {};
      _exportObj5.PartyStore = _party.PartyStore;

      _export(_exportObj5);
    }],
    execute: function () {}
  };
});

'use strict';

System.register('app/stores.js', ['aurelia-framework', 'app/stores/index'], function (_export, _context) {
  "use strict";

  var inject, LocationStore, UserStore, ShuttleStore, TripStore, PartyStore, _dec, _class, Stores;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appStoresIndex) {
      LocationStore = _appStoresIndex.LocationStore;
      UserStore = _appStoresIndex.UserStore;
      ShuttleStore = _appStoresIndex.ShuttleStore;
      TripStore = _appStoresIndex.TripStore;
      PartyStore = _appStoresIndex.PartyStore;
    }],
    execute: function () {
      _export('Stores', Stores = (_dec = inject(LocationStore, UserStore, ShuttleStore, TripStore, PartyStore), _dec(_class = function () {
        function Stores(locationStore, userStore, shuttleStore, tripStore, partyStore) {
          _classCallCheck(this, Stores);

          this.locationStore = locationStore;
          this.userStore = userStore;
          this.shuttleStore = shuttleStore;
          this.tripStore = tripStore;
          this.partyStore = partyStore;
        }

        Stores.prototype.get = function get(store) {
          return this[store + 'Store'];
        };

        return Stores;
      }()) || _class));

      _export('Stores', Stores);
    }
  };
});

'use strict';

System.register('app/add-resource-dialog.js', ['app/resource-dialog', 'aurelia-framework', 'app/stores', 'app/utils', 'app/api'], function (_export, _context) {
  "use strict";

  var ResourceDialog, inject, bindable, Stores, Utils, Api, _dec, _dec2, _class, AddResourceDialog;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appResourceDialog) {
      ResourceDialog = _appResourceDialog.ResourceDialog;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_appStores) {
      Stores = _appStores.Stores;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appApi) {
      Api = _appApi.Api;
    }],
    execute: function () {
      _export('AddResourceDialog', AddResourceDialog = (_dec = inject(Stores, Api), _dec2 = bindable("edited"), _dec(_class = _dec2(_class = function (_ResourceDialog) {
        _inherits(AddResourceDialog, _ResourceDialog);

        function AddResourceDialog(stores, api) {
          _classCallCheck(this, AddResourceDialog);

          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _ResourceDialog.call.apply(_ResourceDialog, [this].concat(args)));

          _this.subscribers = [];
          _this.showHeader = true;
          _this.selectable = true;
          _this.subscriptions = {
            "added": "resourceAdded",
            "updated": "resourceUpdated",
            "deleted": "resourceDeleted"
          };
          _this.actionTrigger = {
            add: function add() {
              _this.addResource();
            },
            edit: function edit(resource) {

              _this.editResource(resource);
            },
            delete: function _delete(resource) {
              _this.deleteResource(resource);
            }
          };

          _this.store = stores.get(_this.resourceName());
          _this.api = api;
          _this.store.api = _this.api;
          return _this;
        }

        AddResourceDialog.prototype.initActionTrigger = function initActionTrigger() {
          this.actionTrigger = Object.assign({}, this.actionTrigger, this.actionTriggers || {});
        };

        AddResourceDialog.prototype.getApi = function getApi() {
          return this.api;
        };

        AddResourceDialog.prototype.resourceDeleted = function resourceDeleted(resource) {
          var model = this.resourceToModel(resource);
          this.removeFromCollection(resource);
          this.deleted = model;
          this.api.notifier.success(Utils.capitalize(this.resourceName()) + ' archived successfully.');
        };

        AddResourceDialog.prototype.removeFromCollection = function removeFromCollection(resource) {
          Utils.removeFromCollection(resource, this.collection());
        };

        AddResourceDialog.prototype.deleteResource = function deleteResource(resource) {
          var _this2 = this;

          this.store.deleteItem(resource).catch(function (err) {
            _this2.api.notifier.danger(err);
          });
        };

        AddResourceDialog.prototype.editResource = function editResource(resource) {
          this.dialogOpenEditResource(resource);
        };

        AddResourceDialog.prototype.addResource = function addResource() {
          this.dialogOpenAddResource();
        };

        AddResourceDialog.prototype.dialogOpenAddResource = function dialogOpenAddResource() {
          this.dialogOpen();
        };

        AddResourceDialog.prototype.viewModel = function viewModel() {
          if (this.staticMode) {
            return _ResourceDialog.prototype.viewModel.call(this);
          } else {
            return this.dialogAddResourceViewModel;
          }
        };

        AddResourceDialog.prototype.resourceAdded = function resourceAdded(resource) {
          var model = this.resourceToModel(resource);
          Utils.addToCollection(model, this.collection());
          this.api.notifier.success(Utils.capitalize(this.resourceName()) + ' added successfully.');
        };

        AddResourceDialog.prototype.resourceUpdated = function resourceUpdated(resource) {
          var model = this.resourceToModel(resource);

          this.edited = model;
          this.api.notifier.success(Utils.capitalize(this.resourceName()) + ' updated successfully.');
        };

        AddResourceDialog.prototype.collection = function collection() {
          var collectionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

          return this[collectionName || this.collectionName()];
        };

        AddResourceDialog.prototype.resourceToModel = function resourceToModel(resource) {
          var model = this.toModel(resource);
          model.id = resource.id;
          return model;
        };

        AddResourceDialog.prototype.collectionName = function collectionName() {
          return Utils.collectionName(this.resourceName());
        };

        AddResourceDialog.prototype.addStoreSubscriptions = function addStoreSubscriptions() {
          if (this.store) {
            this.subscribers = this.store.addSubscriptions(this, this.subscriptions);
          }
        };

        AddResourceDialog.prototype.removeStoreSubscriptions = function removeStoreSubscriptions() {
          if (this.store) {
            this.store.removeSubscriptions(this.subscribers);
          }
        };

        return AddResourceDialog;
      }(ResourceDialog)) || _class) || _class));

      _export('AddResourceDialog', AddResourceDialog);
    }
  };
});

'use strict';

System.register('app/show-party.js', ['aurelia-framework', 'app/app', 'app/utils', 'app/models/party', 'app/utils/table', 'app/add-resource-dialog'], function (_export, _context) {
  "use strict";

  var bindable, App, Utils, PartyModel, TableUtils, AddResourceDialog, _desc, _value, _class, _descriptor, _descriptor2, _class2, _temp, ShowParty;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }, function (_appApp) {
      App = _appApp.App;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appModelsParty) {
      PartyModel = _appModelsParty.PartyModel;
    }, function (_appUtilsTable) {
      TableUtils = _appUtilsTable.TableUtils;
    }, function (_appAddResourceDialog) {
      AddResourceDialog = _appAddResourceDialog.AddResourceDialog;
    }],
    execute: function () {
      _export('ShowParty', ShowParty = (_class = (_temp = _class2 = function (_AddResourceDialog) {
        _inherits(ShowParty, _AddResourceDialog);

        ShowParty.inject = function inject() {
          return [App];
        };

        function ShowParty(app) {
          _classCallCheck(this, ShowParty);

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _AddResourceDialog.call.apply(_AddResourceDialog, [this].concat(args)));

          _initDefineProp(_this, 'edited', _descriptor, _this);

          _initDefineProp(_this, 'deleted', _descriptor2, _this);

          _this.props = ["partyNumber", "status", "pickup", "destination", "date", "departure", "partySize", "contactNumber", "partyName"];
          _this.accessors = {
            "partyNumber": function partyNumber(party) {
              return party.paddedNumber;
            }
          };

          _this.app = app;
          _this.initActionTrigger();
          return _this;
        }

        ShowParty.prototype.editedChanged = function editedChanged() {
          var _this2 = this;

          if (this.app.appContext.selectedParty) {
            Utils.forEachModelProp(PartyModel, function (prop) {
              _this2.app.appContext.selectedParty[prop] = _this2.edited[prop];
              _this2.headerVals[prop] = _this2.headerVal(prop);
            });
          }
        };

        ShowParty.prototype.deletedChanged = function deletedChanged() {
          this.app.appContext.selectedPartyActions.partyDeleted();
          this.app.router.navigateToRoute("parties");
        };

        ShowParty.prototype.headerVal = function headerVal(prop) {
          var party = this.app.appContext.selectedParty;
          if (this.accessors[prop]) {
            return this.accessors[prop](party);
          } else {
            return party[prop];
          }
        };

        ShowParty.prototype.bind = function bind() {
          var _this3 = this;

          this.headers = TableUtils.headersFromProperties(this.props, this.headers || {});
          this.app.appContext.partyController = this;
          this.headerVals = {};
          var prop = void 0;
          this.headers.forEach(function (header, index) {
            prop = _this3.props[index];
            _this3.headerVals[prop] = _this3.headerVal(prop);
          });
          this.parties = [this.app.appContext.selectedParty];
        };

        ShowParty.prototype.activate = function activate() {
          this.addStoreSubscriptions();
        };

        ShowParty.prototype.deactivate = function deactivate() {
          this.removeStoreSubscriptions();
        };

        return ShowParty;
      }(AddResourceDialog), _class2.dialogResourceName = "party", _class2.dialogResourceName = "party", _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'edited', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'deleted', [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export('ShowParty', ShowParty);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/show-trip.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><div if.bind=\"app.appContext.selectedTrip\" class=\"card\"><div class=\"card-header\"><span>${app.appContext.selectedTrip.paddedNumber}</span></div><div class=\"card-content\"><div class=\"list-block\"><ul><li class=\"item-content\" repeat.for=\"header of headers\"><div class=\"item-inner\"><div class=\"item-title\">${header}</div><div class=\"item-after\">${headerVal($index)}</div></div></li></ul></div></div></div></template>";
});

})();
'use strict';

System.register('app/show-trip.js', ['app/utils/table', 'app/app-base'], function (_export, _context) {
  "use strict";

  var TableUtils, AppBase, ShowTrip;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appUtilsTable) {
      TableUtils = _appUtilsTable.TableUtils;
    }, function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }],
    execute: function () {
      _export('ShowTrip', ShowTrip = function (_AppBase) {
        _inherits(ShowTrip, _AppBase);

        function ShowTrip() {
          var _temp, _this, _ret;

          _classCallCheck(this, ShowTrip);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args))), _this), _this.props = ["tripNumber", "status", "pickup", "destination", "date", "departure", "partySize"], _temp), _possibleConstructorReturn(_this, _ret);
        }

        ShowTrip.prototype.headerVal = function headerVal(index) {
          var prop = this.props[index];
          var trip = this.app.appContext.selectedTrip;
          if (this.accessors && this.accessors[prop]) {
            return this.accessors[prop](trip);
          } else {
            return trip[prop];
          }
        };

        ShowTrip.prototype.bind = function bind() {
          this.headers = TableUtils.headersFromProperties(this.props, this.headers || {});
        };

        return ShowTrip;
      }(AppBase));

      _export('ShowTrip', ShowTrip);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/trips.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/trips/trip-list.html\"></require><trip-list is-a.bind=\"isA\" list.bind=\"filtered\" accessor.bind=\"accessor\"></trip-list></template>";
});

})();
'use strict';

System.register('app/utils/table.js', ['string'], function (_export, _context) {
  "use strict";

  var S, TableUtils;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_string) {
      S = _string.default;
    }],
    execute: function () {
      _export('TableUtils', TableUtils = function () {
        function TableUtils() {
          _classCallCheck(this, TableUtils);
        }

        TableUtils.headersFromProperties = function headersFromProperties(properties) {
          return properties.map(function (p) {
            return S(p).humanize().capitalize().s.replace(/number/, '#');
          });
        };

        return TableUtils;
      }());

      _export('TableUtils', TableUtils);
    }
  };
});

'use strict';

System.register('app/app-base.js', ['app/app'], function (_export, _context) {
  "use strict";

  var App, AppBase;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _export('AppBase', AppBase = function () {
        AppBase.inject = function inject() {
          return [App];
        };

        function AppBase(app) {
          _classCallCheck(this, AppBase);

          this.app = app;
        }

        return AppBase;
      }());

      _export('AppBase', AppBase);
    }
  };
});

"use strict";

System.register("app/components/dialog.js", ["aurelia-framework"], function (_export, _context) {
  "use strict";

  var inject, Dialog;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export("Dialog", Dialog = function Dialog() {
        _classCallCheck(this, Dialog);
      });

      _export("Dialog", Dialog);
    }
  };
});

"use strict";

System.register("app/trips/show-trip.js", ["aurelia-framework", "app/components/dialog"], function (_export, _context) {
  "use strict";

  var inject, Dialog, ShowTrip;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_appComponentsDialog) {
      Dialog = _appComponentsDialog.Dialog;
    }],
    execute: function () {
      _export("ShowTrip", ShowTrip = function (_Dialog) {
        _inherits(ShowTrip, _Dialog);

        function ShowTrip() {
          _classCallCheck(this, ShowTrip);

          return _possibleConstructorReturn(this, _Dialog.apply(this, arguments));
        }

        ShowTrip.prototype.activate = function activate(trip) {
          this.trip = trip;
          this.heading = "Trip: " + this.trip.paddedNumber;
        };

        ShowTrip.prototype.dialogCancel = function dialogCancel() {
          this.controller.cancel();
        };

        return ShowTrip;
      }(Dialog));

      _export("ShowTrip", ShowTrip);
    }
  };
});

'use strict';

System.register('app/trips.js', ['aurelia-framework', 'app/utils/table', 'app/collection', 'app/app-base', 'app/models/index', 'app/trips/show-trip'], function (_export, _context) {
  "use strict";

  var computedFrom, TableUtils, Collection, AppBase, PartyModel, TripModel, ShowTrip, _createClass, _dec, _desc, _value, _class, visibilityFn, Trips;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appUtilsTable) {
      TableUtils = _appUtilsTable.TableUtils;
    }, function (_appCollection) {
      Collection = _appCollection.Collection;
    }, function (_appAppBase) {
      AppBase = _appAppBase.AppBase;
    }, function (_appModelsIndex) {
      PartyModel = _appModelsIndex.PartyModel;
      TripModel = _appModelsIndex.TripModel;
    }, function (_appTripsShowTrip) {
      ShowTrip = _appTripsShowTrip.ShowTrip;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      visibilityFn = function visibilityFn(propHeader) {
        switch (true) {
          case /party #|trip #|partyNumber|tripNumber|status/i.test(propHeader):
            return "";
          case /destination|date/i.test(propHeader):
            return "hidden-xs-down";
          default:
            return "hidden-sm-down";
        }
      };

      _export('Trips', Trips = (_dec = computedFrom("filtered.length"), (_class = function (_AppBase) {
        _inherits(Trips, _AppBase);

        function Trips() {
          _classCallCheck(this, Trips);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _AppBase.call.apply(_AppBase, [this].concat(args)));

          _this.props = ["partyNumber", "tripNumber", "status", "pickup", "destination", "date", "departure", "arrival", "partySize", "contactNumber", "roomNumber"];
          _this.showHeader = false;
          _this.visibility = {
            header: visibilityFn,
            prop: visibilityFn
          };
          _this.headers = {
            "partySize": "# in Party",
            "departure": "Departure time",
            "arrival": "Arrival time"
          };
          _this.data = [];

          _this.isA = {
            isParty: _this.isParty,
            isTrip: _this.isTrip
          };
          return _this;
        }

        Trips.prototype.dblClick = function dblClick(model) {
          if (this.isTrip(model)) {
            this.dialog.open({ viewModel: ShowTrip, model: model });
          }
        };

        Trips.prototype.canManage = function canManage() {
          return this.app.authContext.isAdmin();
        };

        Trips.prototype.isTrip = function isTrip(model) {
          return model instanceof TripModel;
        };

        Trips.prototype.isParty = function isParty(model) {
          return model instanceof PartyModel;
        };

        Trips.prototype.activate = function activate() {
          var _this2 = this;

          this.headers = TableUtils.headersFromProperties(this.props, this.headers || {});
          this.numHeaders = this.headers.length;
          this.properties = this.props;
          return Collection.loadAll(this.app.api, this, ["completedTrip", "archivedParty"]).then(function () {
            _this2.data = [].concat(_this2.completedTrips, _this2.archivedParties);
            _this2.filtered = _this2.data;
          });
        };

        _createClass(Trips, [{
          key: 'noData',
          get: function get() {
            return this.filtered.length == 0;
          }
        }]);

        return Trips;
      }(AppBase), _applyDecoratedDescriptor(_class.prototype, 'noData', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'noData'), _class.prototype), _class)));

      _export('Trips', Trips);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/trips/pickup-destination.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/components/nselect\"></require><div class=\"row text-center\"><div id=\"from\" class=\"col-40 label\">Pickup:<br><a if.bind=\"isstatic\" class=\"btn btn-default\">${from}</a><nselect if.bind=\"!isstatic\" empty-text=\"No locations available\" options.bind=\"locations\" value.bind=\"from\"></nselect></div><div id=\"exchange\" class=\"col-20\"><i if.bind=\"!isstatic\" click.delegate=\"swapFromTo()\" class=\"f7-icons pointer\">reload</i> <i if.bind=\"isstatic\" class=\"f7-icons pointer\">reload</i></div><div id=\"to\" class=\"col-40 label\">Destination:<br><a if.bind=\"isstatic\" class=\"btn btn-default\">${to}</a><nselect if.bind=\"!isstatic\" empty-text=\"No locations available\" options.bind=\"locations\" blank-text=\"Choose a destination\" value.bind=\"to\"></nselect></div></div></template>";
});

})();
'use strict';

System.register('app/authorize-step.js', ['aurelia-router', 'app/auth-service', 'app/utils'], function (_export, _context) {
  "use strict";

  var RedirectToRoute, AuthService, Utils, AuthorizeStep;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaRouter) {
      RedirectToRoute = _aureliaRouter.RedirectToRoute;
    }, function (_appAuthService) {
      AuthService = _appAuthService.AuthService;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }],
    execute: function () {
      _export('AuthorizeStep', AuthorizeStep = function () {
        AuthorizeStep.inject = function inject() {
          return [AuthService];
        };

        function AuthorizeStep(authService) {
          _classCallCheck(this, AuthorizeStep);

          this.authService = authService;
        }

        AuthorizeStep.prototype.run = function run(routingContext, next) {
          var nextInstruction = routingContext;

          if (nextInstruction && nextInstruction.config.auth) {

            return this.authService.isAuthenticated().then(function (isAuthenticated) {

              if (isAuthenticated) {
                return next();
              } else {

                return next.cancel(new RedirectToRoute('login'));
              }
            });
          } else {
            return next();
          }
        };

        return AuthorizeStep;
      }());

      _export('AuthorizeStep', AuthorizeStep);
    }
  };
});

"use strict";

System.register("app/skip-main-view-step.js", ["app/app-context"], function (_export, _context) {
  "use strict";

  var AppContext, SkipMainViewStep;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appAppContext) {
      AppContext = _appAppContext.AppContext;
    }],
    execute: function () {
      _export("SkipMainViewStep", SkipMainViewStep = function () {
        SkipMainViewStep.inject = function inject() {
          return [AppContext];
        };

        function SkipMainViewStep(appContext) {
          _classCallCheck(this, SkipMainViewStep);

          this.appContext = appContext;
        }

        SkipMainViewStep.prototype.run = function run(routingContext, next) {
          var nextInstruction = routingContext;
          if (nextInstruction) {
            var isUnknownRoute = nextInstruction.config.moduleId == "app/not-found";
            var settings = nextInstruction.config.settings || {};
            this.appContext.skipMainView = isUnknownRoute || settings.skipMainView == true;
          }
          return next();
        };

        return SkipMainViewStep;
      }());

      _export("SkipMainViewStep", SkipMainViewStep);
    }
  };
});

'use strict';

System.register('app/auth-role-step.js', ['aurelia-router', 'app/auth-context'], function (_export, _context) {
  "use strict";

  var RedirectToRoute, AuthContext, AuthRoleStep;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaRouter) {
      RedirectToRoute = _aureliaRouter.RedirectToRoute;
    }, function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }],
    execute: function () {
      _export('AuthRoleStep', AuthRoleStep = function () {
        AuthRoleStep.inject = function inject() {
          return [AuthContext];
        };

        function AuthRoleStep(authContext) {
          _classCallCheck(this, AuthRoleStep);

          this.authContext = authContext;
        }

        AuthRoleStep.prototype.run = function run(routingContext, next) {
          var nextInstruction = routingContext;

          if (nextInstruction) {
            if (nextInstruction.config && nextInstruction.config.settings) {
              var role = nextInstruction.config.settings.role;
              if (role) {

                if (!this.authContext.hasRole(role)) {
                  return next.cancel(new RedirectToRoute('home'));
                }
              }
            }
          }

          return next();
        };

        return AuthRoleStep;
      }());

      _export('AuthRoleStep', AuthRoleStep);
    }
  };
});

'use strict';

System.register('app/active-trip-step.js', ['aurelia-router', 'app/auth-context', 'app/app-context'], function (_export, _context) {
  "use strict";

  var RedirectToRoute, AuthContext, AppContext, ActiveTripStep;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaRouter) {
      RedirectToRoute = _aureliaRouter.RedirectToRoute;
    }, function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }, function (_appAppContext) {
      AppContext = _appAppContext.AppContext;
    }],
    execute: function () {
      _export('ActiveTripStep', ActiveTripStep = function () {
        ActiveTripStep.inject = function inject() {
          return [AuthContext, AppContext];
        };

        function ActiveTripStep(authContext, appContext) {
          _classCallCheck(this, ActiveTripStep);

          this.authContext = authContext;
          this.appContext = appContext;
        }

        ActiveTripStep.prototype.run = function run(routingContext, next) {
          var _this = this;

          var nextInstruction = routingContext;
          if (nextInstruction) {
            var toActiveStepPage = nextInstruction.config.route == 'active-trip';
            if (!toActiveStepPage && this.authContext.isDriver()) {
              return this.appContext.loadDriverActiveTrip().then(function () {
                if (_this.appContext.driverHasActiveTrip()) {
                  return next.cancel(new RedirectToRoute('active-trip'));
                } else {
                  return next();
                }
              });
            }
          }
          return next();
        };

        return ActiveTripStep;
      }());

      _export('ActiveTripStep', ActiveTripStep);
    }
  };
});

'use strict';

System.register('app/config/app-router.js', ['app/authorize-step', 'app/skip-main-view-step', 'app/auth-role-step', 'app/active-trip-step'], function (_export, _context) {
    "use strict";

    var AuthorizeStep, SkipMainViewStep, AuthRoleStep, ActiveTripStep;

    _export('default', function (config) {
        config.title = 'NPTS Shuttle App';
        config.options.pushState = true;
        config.addPipelineStep('authorize', AuthorizeStep);
        config.addPipelineStep('authorize', AuthRoleStep);
        config.addPipelineStep('authorize', SkipMainViewStep);
        config.addPipelineStep('authorize', ActiveTripStep);
        config.map([{ route: '', name: 'home', redirect: 'parties' }, { route: 'parties', name: 'parties', moduleId: 'app/parties', nav: true, title: 'Parties', auth: true }, { route: 'trips', name: 'trips', moduleId: 'app/trips', nav: true, title: 'Trips', auth: true }, { route: 'show-archived', name: 'show-archived', moduleId: 'app/show-archived', nav: true, title: 'Show Archived', auth: true }, { route: 'show-party', name: 'show-party', moduleId: 'app/show-party', nav: true, title: 'Show Party', auth: true }, { route: 'show-trip', name: 'show-trip', moduleId: 'app/show-trip', nav: true, title: 'Show Party', auth: true }, { route: 'active-trip', name: 'active-trip', moduleId: 'app/active-trip', nav: false, title: 'Active Trip', auth: true }, { route: 'login', name: 'login', moduleId: 'app/auth/login', nav: false, title: 'Login', settings: { skipMainView: true } }, { route: 'logout', name: 'logout', moduleId: 'app/auth/logout', auth: true, nav: false, title: 'Logout' }, { route: 'reset-password-confirm', name: 'reset-password-confirm', moduleId: 'app/auth/reset-password-confirm', nav: false, title: 'Reset Password Confirm', settings: { skipMainView: true } }, { route: 'reset-password-request', name: 'reset-password-request', moduleId: 'app/auth/reset-password-request', nav: false, title: 'Reset Password Request', settings: { skipMainView: true } }, { route: 'reset-pin-request', name: 'reset-pin-request', moduleId: 'app/auth/reset-pin-request', nav: false, title: 'Reset Pin Request', settings: { skipMainView: true } }, { route: 'reset-pin-confirm', name: 'reset-pin-confirm', moduleId: 'app/auth/reset-pin-confirm', nav: false, title: 'Reset Pin Confirm', settings: { skipMainView: true } }]);
        config.mapUnknownRoutes('app/not-found');
    });

    return {
        setters: [function (_appAuthorizeStep) {
            AuthorizeStep = _appAuthorizeStep.AuthorizeStep;
        }, function (_appSkipMainViewStep) {
            SkipMainViewStep = _appSkipMainViewStep.SkipMainViewStep;
        }, function (_appAuthRoleStep) {
            AuthRoleStep = _appAuthRoleStep.AuthRoleStep;
        }, function (_appActiveTripStep) {
            ActiveTripStep = _appActiveTripStep.ActiveTripStep;
        }],
        execute: function () {}
    };
});

'use strict';

System.register('app/app.js', ['aurelia-framework', 'app/config/app-router', 'app/auth-context', 'app/app-context', 'app/auth-service', 'app/notifier', 'app/api', 'local-storage'], function (_export, _context) {
  "use strict";

  var inject, AppRouterConfig, computedFrom, AuthContext, AppContext, AuthService, Notifier, Api, ls, _createClass, _dec, _dec2, _class, _desc, _value, _class2, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appConfigAppRouter) {
      AppRouterConfig = _appConfigAppRouter.default;
    }, function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }, function (_appAppContext) {
      AppContext = _appAppContext.AppContext;
    }, function (_appAuthService) {
      AuthService = _appAuthService.AuthService;
    }, function (_appNotifier) {
      Notifier = _appNotifier.Notifier;
    }, function (_appApi) {
      Api = _appApi.Api;
    }, function (_localStorage) {
      ls = _localStorage.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('App', App = (_dec = inject(AuthContext, AppContext, AuthService, Notifier, Api), _dec2 = computedFrom("authContext.isAuthenticated", "appContext.skipMainView"), _dec(_class = (_class2 = function () {
        function App(authContext, appContext, authService, notifier, api) {
          var _this = this;

          _classCallCheck(this, App);

          this.actions = {
            logout: function logout() {
              _this.logout();
            }
          };

          this.authContext = authContext;
          this.appContext = appContext;
          this.authService = authService;
          this.notifier = notifier;
          this.api = api;
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          AppRouterConfig(config);
          this.router = router;
        };

        App.prototype.logout = function logout() {
          var _this2 = this;

          return this.authService.logout().then(function () {
            ls.clear();
            _this2.router.navigate('/', { replace: true, trigger: false });
            _this2.router.reset();
            _this2.router.deactivate();
            return _this2.aurelia.setRoot('app/app');
          }).catch(function (error) {
            _this2.notifier.danger(error);
          });
        };

        _createClass(App, [{
          key: 'showMainView',
          get: function get() {
            var show = !this.authContext.skipMainView && this.authContext.isAuthenticated;
            return show;
          }
        }]);

        return App;
      }(), _applyDecoratedDescriptor(_class2.prototype, 'showMainView', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'showMainView'), _class2.prototype), _class2)) || _class));

      _export('App', App);
    }
  };
});

'use strict';

System.register('app/trips/pickup-destination.js', ['aurelia-framework', 'app/app'], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, computedFrom, App, _createClass, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, PickupDestination;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appApp) {
      App = _appApp.App;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('PickupDestination', PickupDestination = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec3 = computedFrom("app.appContext.locations"), (_class = function () {
        PickupDestination.inject = function inject() {
          return [App];
        };

        function PickupDestination(app) {
          _classCallCheck(this, PickupDestination);

          _initDefineProp(this, 'from', _descriptor, this);

          _initDefineProp(this, 'to', _descriptor2, this);

          _initDefineProp(this, 'hotel', _descriptor3, this);

          _initDefineProp(this, 'isstatic', _descriptor4, this);

          this.app = app;
        }

        PickupDestination.prototype.attached = function attached() {
          this.from = this.hotel;
        };

        PickupDestination.prototype.swapFromTo = function swapFromTo() {
          var fromTo = { from: this.from, to: this.to };
          this.to = fromTo.from;
          this.from = fromTo.to;
        };

        _createClass(PickupDestination, [{
          key: 'locations',
          get: function get() {
            return this.app.appContext.locations.map(function (location) {
              return location.name;
            });
          }
        }]);

        return PickupDestination;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'from', [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'to', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'hotel', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'isstatic', [bindable], {
        enumerable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class.prototype, 'locations', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'locations'), _class.prototype)), _class)));

      _export('PickupDestination', PickupDestination);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/trips/show-party.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"app/trips/pickup-destination\"></require><div class=\"card\"><div class=\"card-header\" role=\"tab\" id=\"#{heading}\"><h5 class=\"mb-0\"><a click.bind=\"toggleCollapse\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#${id}\" aria-expanded=\"false\" aria-controls=\"${id}\">Party: ${party.paddedNumber}</a></h5></div><div id=\"${id}\" class=\"collapse ${state}\" role=\"tabpanel\" aria-labelledby=\"${heading}\"><div class=\"card-block\"><div id=\"show-party-dialog\"><form><div class=\"container\"><div class=\"form-group row p-b-2\"><center><pickup-destination isstatic=\"true\" from.one-way=\"party.pickup\" to.one-way=\"party.destination\"></pickup-destination></center></div><div class=\"form-group row\"><label class=\"col-xs-6 col-form-label\" for=\"partyName\">Party Name</label><div class=\"col-xs-6\"><p class=\"form-control-static mb-0\">${party.partyName}</p></div></div><div class=\"form-group row\"><label class=\"col-xs-6 col-form-label\" for=\"partySize\">Party Size</label><div class=\"col-xs-6\"><p class=\"form-control-static mb-0\">${party.partySize}</p></div></div><div class=\"form-group row\"><label class=\"col-xs-6 col-form-label\" for=\"departure\">Departure Time</label><div class=\"col-xs-6\"><p class=\"form-control-static mb-0\">${party.date} ${party.departure}</p></div></div><div class=\"form-group row\"><label class=\"col-xs-6 col-form-label\" for=\"contact-number\">Contact #</label><div class=\"col-xs-6\"><p class=\"form-control-static mb-0\">${party.contactNumber}</p></div></div><div class=\"form-group row\"><label class=\"col-xs-6 col-form-label\" for=\"room-number\">Room #</label><div class=\"col-xs-6\"><p class=\"form-control-static mb-0\">${party.roomNumber}</p></div></div><div class=\"form-group row\"><label class=\"col-xs-6 col-form-label\" for=\"party-notes\">Trip Notes</label><div class=\"col-xs-6\"><p class=\"form-control-static mb-0\" innerhtml.bind=\"party.tripNotes\"></p></div></div></div></form></div></div></div></div></template>";
});

})();
"use strict";

System.register("app/trips/show-party.js", ["aurelia-framework"], function (_export, _context) {
  "use strict";

  var bindable, _desc, _value, _class, _descriptor, _descriptor2, IN, ShowParty;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      IN = "in";

      _export("ShowParty", ShowParty = (_class = function () {
        function ShowParty() {
          _classCallCheck(this, ShowParty);

          _initDefineProp(this, "party", _descriptor, this);

          _initDefineProp(this, "id", _descriptor2, this);
        }

        ShowParty.prototype.bind = function bind() {
          this.id = "collapse-" + this.id;
          this.heading = "heading-" + this.id;
          this.state = "";
        };

        ShowParty.prototype.toggleCollapse = function toggleCollapse() {
          if (this.state == IN) {
            this.state = "";
          }
        };

        return ShowParty;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "party", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "id", [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export("ShowParty", ShowParty);
    }
  };
});

(function() {
var define = System.amdDefine;
define("app/trips/show-trip.html!github:systemjs/plugin-text@0.0.9.js", [], function() {
  return "<template><require from=\"./show-party\"></require><div id=\"show-trip-dialog\"><form><ai-dialog><ai-dialog-header><legend>${heading} <button click.delegate=\"dialogCancel()\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></legend></ai-dialog-header><ai-dialog-body><fieldset><div class=\"form-group row\"><label class=\"col-xs-4 col-form-label\" for=\"departure\">Status</label><div class=\"col-xs-8\"><p class=\"form-control-static mb-0\">${trip.status}</p></div></div><div class=\"form-group row\"><label class=\"col-xs-4 col-form-label\" for=\"departure\">Pickup</label><div class=\"col-xs-8\"><p class=\"form-control-static mb-0\">${trip.pickup}</p></div></div><div class=\"form-group row\"><label class=\"col-xs-4 col-form-label\" for=\"departure\">Destination</label><div class=\"col-xs-8\"><p class=\"form-control-static mb-0\">${trip.destination}</p></div></div></fieldset><fieldset><div class=\"form-group row\"><label class=\"col-xs-4 col-form-label\" for=\"departure\">Departure Time</label><div class=\"col-xs-8\"><p class=\"form-control-static mb-0\">${trip.date} ${trip.departure}</p></div></div><div class=\"form-group row\"><label class=\"col-xs-4 col-form-label\" for=\"departure\">Arrival Time</label><div class=\"col-xs-8\"><p class=\"form-control-static mb-0\">${trip.arrival}</p></div></div></fieldset><fieldset class=\"m-b-1\"><legend>Parties (${trip.partySize})</legend><div id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\"><show-party repeat.for=\"party of trip.parties\" party.bind=\"party\" id.bind=\"$index\" class=\"m-2\"></show-party></div></fieldset></ai-dialog-body><ai-dialog-footer><button click.delegate=\"dialogCancel()\">Close</button></ai-dialog-footer></ai-dialog></form></div></template>";
});

})();
"use strict";

System.register("app/deferred.js", [], function (_export, _context) {
  "use strict";

  var Deferred;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("Deferred", Deferred = function () {
        function Deferred() {
          _classCallCheck(this, Deferred);
        }

        Deferred.prototype.defer = function defer(callback) {
          return new Promise(function (resolve, reject) {
            return callback().then(function (result) {
              resolve(result);
            }).fail(function (err) {
              reject(err);
            });
          });
        };

        return Deferred;
      }());

      _export("Deferred", Deferred);
    }
  };
});

"use strict";

System.register("app/notifier.js", ["app/f7"], function (_export, _context) {
  "use strict";

  var f7, f7m, $$, Notifier;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appF) {
      f7 = _appF.f7;
      f7m = _appF.f7m;
      $$ = _appF.$$;
    }],
    execute: function () {
      _export("Notifier", Notifier = function () {
        function Notifier() {
          _classCallCheck(this, Notifier);
        }

        Notifier.prototype.success = function success(message) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          f7.addNotification({
            title: "NPTS Shuttle",
            message: message,
            closeIcon: false,
            closeOnClick: true,
            hold: "2000",
            media: '<i class="f7-icons">check_round</i>'
          });
        };

        Notifier.prototype.danger = function danger(message) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          f7.addNotification({
            title: "NPTS Shuttle",
            hold: "8000",
            closeIcon: false,
            closeOnClick: true,
            message: message,
            media: '<i class="f7-icons">close_round</i>'
          });
        };

        Notifier.prototype.formError = function formError(error) {
          f7.addNotification({
            title: "Form Error",
            closeIcon: false,
            hold: "5000",
            closeOnClick: true,
            message: error.message,
            media: '<i class="f7-icons">close_round</i>'
          });
        };

        return Notifier;
      }());

      _export("Notifier", Notifier);
    }
  };
});

'use strict';

System.register('app/api.js', ['app/deferred', 'app/notifier'], function (_export, _context) {
  "use strict";

  var Deferred, Notifier, Api;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appDeferred) {
      Deferred = _appDeferred.Deferred;
    }, function (_appNotifier) {
      Notifier = _appNotifier.Notifier;
    }],
    execute: function () {
      _export('Api', Api = function (_Deferred) {
        _inherits(Api, _Deferred);

        Api.inject = function inject() {
          return [Notifier];
        };

        function Api(notifier) {
          _classCallCheck(this, Api);

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var _this = _possibleConstructorReturn(this, _Deferred.call.apply(_Deferred, [this].concat(args)));

          _this.notifier = notifier;
          _this.isRequesting = false;
          return _this;
        }

        Api.prototype.startTrip = function startTrip(driverId, expectedDepartureTime, pickup, destination, shuttleId) {
          return this.defer(function () {
            return dpd.starttrip.post({ driverId: driverId, expectedDepartureTime: expectedDepartureTime, shuttleId: shuttleId, partyIds: [], pickup: pickup, destination: destination });
          }, false);
        };

        Api.prototype.completeTrip = function completeTrip(driverId, tripId, options) {
          return this.defer(function () {
            return dpd.completetrip.post(Object.assign({}, { driverId: driverId, tripId: tripId }, options));
          }, false);
        };

        Api.prototype.completeSingleTrip = function completeSingleTrip(driverId, expectedDepartureTime, tripStartTime, pickup, destination, shuttleId, partyId) {
          return this.defer(function () {
            return dpd.completesingletrip.post({ startTime: { utc: tripStartTime }, driverId: driverId, expectedDepartureTime: expectedDepartureTime, shuttleId: shuttleId, partyId: partyId, pickup: pickup, destination: destination });
          }, false);
        };

        Api.prototype.getAll = function getAll(collection) {
          return this.defer(function () {
            return dpd[collection].get();
          }, false);
        };

        Api.prototype.getShuttlesAtLocation = function getShuttlesAtLocation(locationId) {
          return this.defer(function () {
            return dpd.shuttles.get({ locationId: locationId });
          });
        };

        Api.prototype.driverActiveTrip = function driverActiveTrip(driverId) {
          return this.defer(function () {
            return dpd.activetrips.get({ driverId: driverId });
          });
        };

        Api.prototype.updateItem = function updateItem(collection, item) {
          return this.defer(function () {
            return dpd[collection].put(item);
          }, false);
        };

        Api.prototype.addItem = function addItem(collection, item) {
          return this.defer(function () {
            return dpd[collection].post(item);
          }, false);
        };

        Api.prototype.deleteItem = function deleteItem(collection, itemId) {
          return this.defer(function () {
            return dpd[collection].del({ id: itemId });
          }, false);
        };

        Api.prototype.confirmResetPasswordRequest = function confirmResetPasswordRequest(token) {
          return this.defer(function () {
            return dpd.resetpasswordconfirm.post({ token: token });
          }, false);
        };

        Api.prototype.confirmResetPinRequest = function confirmResetPinRequest(token) {
          return this.defer(function () {
            return dpd.resetpinconfirm.post({ token: token });
          }, false);
        };

        Api.prototype.requestResetPassword = function requestResetPassword(username) {
          return this.defer(function () {
            return dpd.resetpasswordrequest.post({ username: username });
          }, false);
        };

        Api.prototype.requestResetPin = function requestResetPin(username) {
          return this.defer(function () {
            return dpd.resetpinrequest.post({ username: username });
          }, false);
        };

        Api.prototype.requestAccountActivate = function requestAccountActivate(username) {
          return this.defer(function () {
            return dpd.activateaccountrequest.post({ username: username });
          }, false);
        };

        Api.prototype.resetPassword = function resetPassword(newPassword, token) {
          return this.defer(function () {
            return dpd.resetpassword.post({ newPassword: newPassword, token: token });
          }, false);
        };

        Api.prototype.resetPin = function resetPin(newPin, token) {
          return this.defer(function () {
            return dpd.resetpin.post({ newPin: newPin, token: token });
          }, false);
        };

        Api.prototype.defer = function defer(callback) {
          var _this2 = this;

          var catchError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

          this.isRequesting = true;
          var deferred = _Deferred.prototype.defer.call(this, callback).then(function (result) {
            _this2.isRequesting = false;
            return result;
          });
          deferred = deferred.catch(function (err) {
            _this2.isRequesting = false;
            var errMessage = err ? err.errors || err.message : _this2.defaultErrMessage;
            console.log('whooops', err);
            if (catchError) {
              _this2.notifier.danger(errMessage);
            } else {

              return Promise.reject(errMessage);
            }
          });

          return deferred;
        };

        return Api;
      }(Deferred));

      _export('Api', Api);
    }
  };
});

'use strict';

System.register('app/net.js', ['aurelia-http-client', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var HttpClient, inject, bindable, _dec, _class, _desc, _value, _class2, _descriptor, configure, Net;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      configure = function configure(client) {
        var self = this;
        client.configure(function (config) {
          config.withInterceptor({
            request: function request(_request) {
              self.isRequesting = true;
              return _request;
            },
            response: function response(_response) {
              self.isRequesting = false;
              return _response;
            },
            requestError: function requestError(error) {
              self.isRequesting = false;

              throw error;
            },
            responseError: function responseError(error) {
              self.isRequesting = false;

              throw error;
            }
          });
        });
        return client;
      };

      _export('Net', Net = (_dec = inject(HttpClient), _dec(_class = (_class2 = function () {
        function Net(httpClient) {
          _classCallCheck(this, Net);

          _initDefineProp(this, 'isRequesting', _descriptor, this);

          this.httpClient = configure.call(this, httpClient);
        }

        Net.prototype.client = function client() {
          return this.httpClient;
        };

        return Net;
      }(), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'isRequesting', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return false;
        }
      }), _class2)) || _class));

      _export('Net', Net);
    }
  };
});

"use strict";

System.register("app/data-source.js", [], function (_export, _context) {
  "use strict";

  var DataSource;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("DataSource", DataSource = function () {
        function DataSource(api, collection) {
          _classCallCheck(this, DataSource);

          this.api = api;
          this.collection = collection;
        }

        DataSource.prototype.getAll = function getAll() {
          return this.api.getAll(this.collection);
        };

        return DataSource;
      }());

      _export("DataSource", DataSource);
    }
  };
});

'use strict';

System.register('app/collection.js', ['app/data-source', 'app/utils'], function (_export, _context) {
  "use strict";

  var DataSource, Utils, Collection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appDataSource) {
      DataSource = _appDataSource.DataSource;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }],
    execute: function () {
      _export('Collection', Collection = function () {
        function Collection(api, target, resource) {
          _classCallCheck(this, Collection);

          this.resource = resource;
          this.target = target;
          this.collection = Utils.collectionType(resource);
          this.dataSource = new DataSource(api, this.collection);
        }

        Collection.loadAll = function loadAll(api, target, resources) {
          var loader = function loader(collection) {
            return function () {
              return collection.load();
            };
          };
          return Promise.all(resources.map(function (resource) {
            return loader(new Collection(api, target, resource))();
          }));
        };

        Collection.prototype.load = function load() {
          var _this = this;

          return this.dataSource.getAll().then(function (all) {
            var targetCollectionName = Utils.collectionName(_this.resource);
            _this.target[targetCollectionName] = Utils.mapCollection(_this.resource, all);
          });
        };

        return Collection;
      }());

      _export('Collection', Collection);
    }
  };
});

'use strict';

System.register('app/app-context.js', ['app/api', 'app/net', 'app/f7', 'aurelia-framework', 'app/collection', 'app/utils', 'app/auth-context', 'local-storage'], function (_export, _context) {
  "use strict";

  var Api, Net, f7, computedFrom, Collection, Utils, AuthContext, ls, _createClass, _dec, _desc, _value, _class, popupSelector, nPopupSelector, AppContext;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_appApi) {
      Api = _appApi.Api;
    }, function (_appNet) {
      Net = _appNet.Net;
    }, function (_appF) {
      f7 = _appF.f7;
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appCollection) {
      Collection = _appCollection.Collection;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }, function (_localStorage) {
      ls = _localStorage.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      popupSelector = '#popup.popup';
      nPopupSelector = '#npopup.npopup';

      _export('AppContext', AppContext = (_dec = computedFrom("api.isRequesting", "net.isRequesting"), (_class = function () {
        AppContext.inject = function inject() {
          return [Api, Net, f7, AuthContext];
        };

        function AppContext(api, net, f7, authContext) {
          _classCallCheck(this, AppContext);

          this.currentTrip = null;
          this.canShowPopup = false;
          this.skipMainView = true;

          this.api = api;
          this.net = net;
          this.utils = Utils;
          this.f7 = f7;
          this.isAndroid = this.f7.device.android;
          this.authContext = authContext;
        }

        AppContext.prototype.closePopup = function closePopup() {
          this.f7.closeModal(popupSelector);
          this.canShowPopup = false;
          if (this.popupCallback) {
            this.popupCallback();
          }
        };

        AppContext.prototype.showPopup = function showPopup(view, model) {
          var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

          this.popupView = view;
          this.popupModel = model;
          this.canShowPopup = true;
          this.popupCallback = callback;
          this.f7.popup(popupSelector);
        };

        AppContext.prototype.closeNPopup = function closeNPopup() {
          this.f7.closeModal(nPopupSelector);
          this.canShowNPopup = false;
          if (this.nPopupCallback) {
            this.nPopupCallback();
          }
        };

        AppContext.prototype.showNPopup = function showNPopup(view, model) {
          var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

          this.nPopupView = view;
          this.nPopupModel = model;
          this.canShowNPopup = true;
          this.nPopupCallback = callback;
          this.f7.popup(nPopupSelector);
        };

        AppContext.prototype.loadDriverActiveTrip = function loadDriverActiveTrip() {
          var _this = this;

          return this.api.driverActiveTrip(this.authContext.currentUser.id).then(function (trips) {
            _this.activeTrip = trips[0];
          });
        };

        AppContext.prototype.storedCurrentDriverShuttleId = function storedCurrentDriverShuttleId() {
          return 'npts:driver-shuttle-' + this.authContext.currentUser.id;
        };

        AppContext.prototype.selectedParties = function selectedParties() {
          return Array.from(this.selectedRows.values());
        };

        AppContext.prototype.loadCurrentDriverShuttleId = function loadCurrentDriverShuttleId() {
          this.driverShuttleId = ls.get(this.storedCurrentDriverShuttleId());
          return this.driverShuttleId;
        };

        AppContext.prototype.setCurrentDriverShuttleId = function setCurrentDriverShuttleId(shuttleId) {
          ls.set(this.storedCurrentDriverShuttleId(), shuttleId);
          this.driverShuttleId = shuttleId;
        };

        AppContext.prototype.loadLocations = function loadLocations() {
          return Collection.loadAll(this.api, this, ["location"]);
        };

        AppContext.prototype.tripSelectedParties = function tripSelectedParties() {
          var tripPartyIds = this.tripPartyIds();
          return this.reservedActiveParties(function (party) {
            return tripPartyIds.includes(party.id);
          });
        };

        AppContext.prototype.tripPartyIds = function tripPartyIds() {
          return this.startTripPartyIds.concat(this.midTripPartyIds);
        };

        AppContext.prototype.driverHasActiveTrip = function driverHasActiveTrip() {
          return !this.utils.isNullOrUndefined(this.activeTrip);
        };

        AppContext.prototype.loadReservedActiveParties = function loadReservedActiveParties(target) {
          var _this2 = this;

          return Collection.loadAll(this.api, this, ["reservedActiveParty"]).then(function () {
            if (target) {
              target.reservedActiveParties = _this2.reservedActiveParties;
            }
          });
        };

        _createClass(AppContext, [{
          key: 'isLoading',
          get: function get() {
            return (this.api.isRequesting || this.net.isRequesting) === true;
          }
        }]);

        return AppContext;
      }(), _applyDecoratedDescriptor(_class.prototype, 'isLoading', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'isLoading'), _class.prototype), _class)));

      _export('AppContext', AppContext);
    }
  };
});

'use strict';

System.register('app/with-context.js', ['aurelia-framework', 'app/app-context'], function (_export, _context) {
  "use strict";

  var computedFrom, AppContext, WithContext;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_appAppContext) {
      AppContext = _appAppContext.AppContext;
    }],
    execute: function () {
      _export('WithContext', WithContext = function () {
        WithContext.inject = function inject() {
          return [AppContext];
        };

        function WithContext(appContext) {
          _classCallCheck(this, WithContext);

          this.appContext = appContext;
        }

        return WithContext;
      }());

      _export('WithContext', WithContext);
    }
  };
});

'use strict';

System.register('app/validation-rules.js', ['aurelia-validation'], function (_export, _context) {
  "use strict";

  var ValidationRules;
  return {
    setters: [function (_aureliaValidation) {
      ValidationRules = _aureliaValidation.ValidationRules;
    }],
    execute: function () {

      ValidationRules.customRule('positiveInteger', function (value, obj) {
        var number = Number.parseInt(value);
        return Number.isInteger(number) && number > 0;
      }, "${$displayName} must be integer greater than 0");

      ValidationRules.customRule('phoneLength', function (value, obj) {
        return value && value.replace(/[\s|\(|\)|-]/g, '').length == 10;
      }, "${$displayName} must have 10 digits");

      ValidationRules.customRule('shuttleYear', function (value, obj) {
        var number = Number.parseInt(value);
        return Number.isInteger(number) && number > 1900;
      }, "${$displayName} must be greater than 1900");

      ValidationRules.customRule('partySize', function (value, obj) {
        return value && value.length > 0;
      }, "Number of ${$displayName} should be at least 1");
    }
  };
});

'use strict';

System.register('app/f7.js', ['framework7'], function (_export, _context) {
  "use strict";

  var $$, f7;
  return {
    setters: [function (_framework) {}],
    execute: function () {
      _export('$$', $$ = Dom7);

      _export('$$', $$);

      _export('f7', f7 = new window.Framework7({
        router: false
      }));

      _export('f7', f7);

      if (f7.device.android) {
        $$('head').append('<link rel="stylesheet" href="jspm_packages/npm/framework7@1.4.2/dist/css/framework7.material.min.css">' + '<link rel="stylesheet" href="jspm_packages/npm/framework7@1.4.2/dist/css/framework7.material.colors.min.css">');
      } else {
        $$('head').append('<link rel="stylesheet" href="jspm_packages/npm/framework7@1.4.2/dist/css/framework7.ios.min.css">' + '<link rel="stylesheet" href="jspm_packages/npm/framework7@1.4.2/dist/css/framework7.ios.colors.min.css">');
      }
    }
  };
});

"use strict";

System.register("app/dependencies.js", ["./validation-rules", "deployd", "./f7"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_validationRules) {}, function (_deployd) {}, function (_f) {}],
    execute: function () {}
  };
});

"use strict";

System.register("app/config/api.js", [], function (_export, _context) {
  "use strict";

  var ApiConfig;
  return {
    setters: [],
    execute: function () {
      _export("ApiConfig", ApiConfig = {
        URL: "https://npts-shuttle-api.herokuapp.com"
      });

      _export("ApiConfig", ApiConfig);
    }
  };
});

'use strict';

System.register('app/auth-context.js', ['app/utils', 'app/models/user'], function (_export, _context) {
  "use strict";

  var Utils, UserModel, AuthContext;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appUtils) {
      Utils = _appUtils.Utils;
    }, function (_appModelsUser) {
      UserModel = _appModelsUser.UserModel;
    }],
    execute: function () {
      _export('AuthContext', AuthContext = function () {
        function AuthContext() {
          _classCallCheck(this, AuthContext);

          this.currentUser = undefined;
          this.isAuthenticated = false;
        }

        AuthContext.prototype.isAdmin = function isAdmin() {
          return this.currentUser && this.currentUser.isAdmin();
        };

        AuthContext.prototype.isSuperAdmin = function isSuperAdmin() {
          return this.currentUser && this.currentUser.isSuperAdmin();
        };

        AuthContext.prototype.isDriver = function isDriver() {
          return this.currentUser && this.currentUser.isDriver();
        };

        AuthContext.prototype.isUser = function isUser() {
          return this.currentUser && this.currentUser.isUser();
        };

        AuthContext.prototype.hasRole = function hasRole(role) {
          var roleMethod = 'is' + role;
          return this.currentUser && this.currentUser[roleMethod] && this.currentUser[roleMethod]();
        };

        AuthContext.prototype.hasLocation = function hasLocation() {
          return this.currentUser && !Utils.isEmptyString(this.currentUser.location);
        };

        AuthContext.prototype.currentLocation = function currentLocation() {
          if (this.currentUser) {
            return this.currentUser.location;
          }
        };

        AuthContext.prototype.isLoggedIn = function isLoggedIn() {
          return this.isAuthenticated;
        };

        AuthContext.prototype.loggedIn = function loggedIn(user) {
          this.currentUser = new UserModel(user);
          this.isAuthenticated = true;
        };

        AuthContext.prototype.loggedOut = function loggedOut() {
          this.currentUser = undefined;
          this.isAuthenticated = false;
        };

        return AuthContext;
      }());

      _export('AuthContext', AuthContext);
    }
  };
});

'use strict';

System.register('app/models/user.js', ['./model', 'string'], function (_export, _context) {
  "use strict";

  var Model, S, _class, _temp, _class2, _temp2, SUPERADMIN, ADMIN, USER, DRIVER, ADMINS, UserTypes, UserModel;

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_model) {
      Model = _model.Model;
    }, function (_string) {
      S = _string.default;
    }],
    execute: function () {
      SUPERADMIN = "SuperAdmin";
      ADMIN = "Admin";
      USER = "User";
      DRIVER = "Driver";
      ADMINS = [ADMIN, SUPERADMIN];

      _export('UserTypes', UserTypes = (_temp = _class = function UserTypes() {
        _classCallCheck(this, UserTypes);
      }, _class.types = [ADMIN, USER, DRIVER], _class.user = USER, _class.superAdmin = SUPERADMIN, _temp));

      _export('UserTypes', UserTypes);

      _export('UserModel', UserModel = (_temp2 = _class2 = function (_Model) {
        _inherits(UserModel, _Model);

        function UserModel() {
          _classCallCheck(this, UserModel);

          return _possibleConstructorReturn(this, _Model.apply(this, arguments));
        }

        UserModel.prototype.name = function name() {
          return this.firstName + ' ' + this.lastName;
        };

        UserModel.prototype.isAdmin = function isAdmin() {
          return ADMINS.includes(this.type);
        };

        UserModel.prototype.isSuperAdmin = function isSuperAdmin() {
          return this.type == SUPERADMIN;
        };

        UserModel.prototype.isDriver = function isDriver() {
          return this.type == DRIVER;
        };

        UserModel.prototype.isUser = function isUser() {
          return this.type == USER;
        };

        UserModel.prototype.isActive = function isActive() {
          return this.active === true;
        };

        UserModel.prototype.onInit = function onInit() {
          if (this.firstName && this.lastName) {
            this.initials = [this.firstName[0], this.lastName[0]].map(function (name) {
              return S(name).capitalize().s;
            }).join('');
          }
          if (!this.location) {
            this.location = "";
          }
        };

        return UserModel;
      }(Model), _class2.props = ["firstName", "lastName", "type", "username", "email", "password", "location", "locationId", "active", "pin"], _temp2));

      _export('UserModel', UserModel);
    }
  };
});

'use strict';

System.register('app/models/trip.js', ['app/models/date-model', 'app/models/party'], function (_export, _context) {
  "use strict";

  var DateModel, PartyModel, _createClass, _class, _temp, TripModel;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appModelsDateModel) {
      DateModel = _appModelsDateModel.DateModel;
    }, function (_appModelsParty) {
      PartyModel = _appModelsParty.PartyModel;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('TripModel', TripModel = (_temp = _class = function (_DateModel) {
        _inherits(TripModel, _DateModel);

        function TripModel() {
          _classCallCheck(this, TripModel);

          return _possibleConstructorReturn(this, _DateModel.apply(this, arguments));
        }

        TripModel.prototype.onInit = function onInit() {
          var _constructor$getDateT = this.constructor.getDateTime(this.departureTime.utc),
              date = _constructor$getDateT[0],
              time = _constructor$getDateT.slice(1);

          this.date = date;
          this.departure = time;
          if (this.arrivalTime) {
            this.arrival = this.constructor.dateTime(this.arrivalTime.utc).join(' ');
          }
          this.partySize = this.parties.reduce(function (acc, party) {
            return acc + party.partySize;
          }, 0);
          this.parties = this.parties.map(function (party) {
            return new PartyModel(party);
          });
        };

        _createClass(TripModel, [{
          key: 'paddedNumber',
          get: function get() {
            return 'T-' + this.utils.padded(this.tripNumber);
          }
        }]);

        return TripModel;
      }(DateModel), _class.props = ["tripNumber", "departureTime", "arrivalTime", "destination", "status", "pickup", "partyIds", "parties"], _temp));

      _export('TripModel', TripModel);
    }
  };
});

'use strict';

System.register('app/models/date-model.js', ['app/models/model', 'moment-timezone'], function (_export, _context) {
  "use strict";

  var Model, moment, dateTime, DateModel;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appModelsModel) {
      Model = _appModelsModel.Model;
    }, function (_momentTimezone) {
      moment = _momentTimezone.default;
    }],
    execute: function () {
      dateTime = function dateTime(utc) {
        return moment.unix(utc).format('M/D/YY h:mm a z').toString().split(' ');
      };

      _export('DateModel', DateModel = function (_Model) {
        _inherits(DateModel, _Model);

        function DateModel() {
          _classCallCheck(this, DateModel);

          return _possibleConstructorReturn(this, _Model.apply(this, arguments));
        }

        DateModel.dateTime = function dateTime(utc) {
          return moment.unix(utc).format('M/D/YY h:mm a z').toString().split(' ');
        };

        DateModel.getDateTime = function getDateTime(utc) {
          var _dateTime = this.dateTime(utc),
              date = _dateTime[0],
              time = _dateTime.slice(1);

          return [date, time.join(' ')];
        };

        return DateModel;
      }(Model));

      _export('DateModel', DateModel);
    }
  };
});

'use strict';

System.register('app/models/party.js', ['app/models/date-model', 'moment-timezone'], function (_export, _context) {
  "use strict";

  var DateModel, moment, _createClass, _class, _temp, Status, PartyModel;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appModelsDateModel) {
      DateModel = _appModelsDateModel.DateModel;
    }, function (_momentTimezone) {
      moment = _momentTimezone.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      Status = {
        ARCHIVED: "Archived",
        LATE: "Late",
        ACTIVE: "Active",
        RESERVED: "Reserved",
        COMPLETED: "Completed"
      };

      _export('PartyModel', PartyModel = (_temp = _class = function (_DateModel) {
        _inherits(PartyModel, _DateModel);

        function PartyModel() {
          _classCallCheck(this, PartyModel);

          return _possibleConstructorReturn(this, _DateModel.apply(this, arguments));
        }

        PartyModel.prototype.display = function display() {
          return this.paddedNumber + ': ' + this.partyName + ' Party of ' + this.partySize + ' ';
        };

        PartyModel.prototype.onInit = function onInit() {
          if (this.departureTime) {
            var _constructor$getDateT = this.constructor.getDateTime(this.departureTime.utc),
                date = _constructor$getDateT[0],
                time = _constructor$getDateT.slice(1);

            this.date = date;
            this.departure = time;
            if (this.tripArrivalTime) {
              this.arrival = this.constructor.dateTime(this.tripArrivalTime.utc).join(' ');
            }
            this.status = this.partyStatus;
          }
        };

        _createClass(PartyModel, [{
          key: 'paddedNumber',
          get: function get() {
            return 'P-' + this.utils.padded(this.partyNumber);
          }
        }, {
          key: 'partyStatus',
          get: function get() {
            if (this.archived) {
              return Status.ARCHIVED;
            } else if (this.tripId) {
              return this.tripStatus;
            } else if (moment().unix() > this.departureTime.utc) {
              return Status.LATE;
            } else {
              return Status.RESERVED;
            }
          }
        }, {
          key: 'isLate',
          get: function get() {
            return this.partyStatus == Status.LATE;
          }
        }, {
          key: 'isReserved',
          get: function get() {
            return this.partyStatus == Status.RESERVED;
          }
        }, {
          key: 'isCompleted',
          get: function get() {
            return this.partyStatus == Status.COMPLETED;
          }
        }, {
          key: 'isArchived',
          get: function get() {
            return this.partyStatus == Status.ARCHIVED;
          }
        }, {
          key: 'isActive',
          get: function get() {
            return this.partyStatus == Status.ACTIVE;
          }
        }]);

        return PartyModel;
      }(DateModel), _class.props = ["partyNumber", "pickup", "destination", "date", "partyName", "departureTime", "partySize", "contactNumber", "tripId", "tripDepartureTime", "tripArrivalTime", "tripStatus", "archived", "roomNumber", "tripNotes"], _temp));

      _export('PartyModel', PartyModel);
    }
  };
});

'use strict';

System.register('app/models/index.js', ['./location', './shuttle', './user', './trip', './party'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_location) {
      var _exportObj = {};
      _exportObj.LocationModel = _location.LocationModel;

      _export(_exportObj);
    }, function (_shuttle) {
      var _exportObj2 = {};
      _exportObj2.ShuttleModel = _shuttle.ShuttleModel;

      _export(_exportObj2);
    }, function (_user) {
      var _exportObj3 = {};
      _exportObj3.UserModel = _user.UserModel;

      _export(_exportObj3);
    }, function (_trip) {
      var _exportObj4 = {};
      _exportObj4.TripModel = _trip.TripModel;

      _export(_exportObj4);
    }, function (_party) {
      var _exportObj5 = {};
      _exportObj5.PartyModel = _party.PartyModel;

      _export(_exportObj5);
    }],
    execute: function () {}
  };
});

"use strict";

System.register("app/models/location.js", ["app/models/model"], function (_export, _context) {
  "use strict";

  var Model, _class, _temp, LocationModel;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appModelsModel) {
      Model = _appModelsModel.Model;
    }],
    execute: function () {
      _export("LocationModel", LocationModel = (_temp = _class = function (_Model) {
        _inherits(LocationModel, _Model);

        function LocationModel() {
          _classCallCheck(this, LocationModel);

          return _possibleConstructorReturn(this, _Model.apply(this, arguments));
        }

        return LocationModel;
      }(Model), _class.props = ["name", "address", "city", "state", "zip", "phone"], _temp));

      _export("LocationModel", LocationModel);
    }
  };
});

'use strict';

System.register('app/models/model.js', ['app/utils'], function (_export, _context) {
  "use strict";

  var Utils, _class, _temp, Model;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appUtils) {
      Utils = _appUtils.Utils;
    }],
    execute: function () {
      _export('Model', Model = (_temp = _class = function () {
        function Model() {
          var _this = this;

          var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          _classCallCheck(this, Model);

          this.constructor.props.forEach(function (prop) {
            _this[prop] = props[prop];
          });
          this.id = props.id;
          this.utils = Utils;
          this.onInit();
        }

        Model.prototype.onInit = function onInit() {};

        Model.prototype.isNew = function isNew() {
          return this.id === undefined;
        };

        return Model;
      }(), _class.props = [], _temp));

      _export('Model', Model);
    }
  };
});

"use strict";

System.register("app/models/shuttle.js", ["app/models/model"], function (_export, _context) {
  "use strict";

  var Model, _class, _temp, ShuttleModel;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appModelsModel) {
      Model = _appModelsModel.Model;
    }],
    execute: function () {
      _export("ShuttleModel", ShuttleModel = (_temp = _class = function (_Model) {
        _inherits(ShuttleModel, _Model);

        function ShuttleModel() {
          _classCallCheck(this, ShuttleModel);

          return _possibleConstructorReturn(this, _Model.apply(this, arguments));
        }

        return ShuttleModel;
      }(Model), _class.props = ["name", "location", "licensePlate", "capacity", "make", "model", "locationId", "year"], _temp));

      _export("ShuttleModel", ShuttleModel);
    }
  };
});

'use strict';

System.register('app/models.js', ['app/models/index', 'app/models/location', 'app/models/shuttle', 'string'], function (_export, _context) {
  "use strict";

  var MODELS, LocationModel, ShuttleModel, S, getResourceType, getModel, Models;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appModelsIndex) {
      MODELS = _appModelsIndex;
    }, function (_appModelsLocation) {
      LocationModel = _appModelsLocation.LocationModel;
    }, function (_appModelsShuttle) {
      ShuttleModel = _appModelsShuttle.ShuttleModel;
    }, function (_string) {
      S = _string.default;
    }],
    execute: function () {

      MODELS.LocationModel = LocationModel;
      MODELS.ShuttleModel = ShuttleModel;

      getResourceType = function getResourceType(resource) {
        switch (true) {
          case /user|.*driver/i.test(resource):
            return "user";
          case /party|.*party/i.test(resource):
            return "party";
          case /trip|.*trip/i.test(resource):
            return "trip";
          default:
            return resource;
        }
      };

      getModel = function getModel(resource) {
        return MODELS[S(getResourceType(resource)).capitalize().s + 'Model'];
      };

      _export('Models', Models = function () {
        function Models() {
          _classCallCheck(this, Models);
        }

        Models.get = function get(model) {
          return getModel(model);
        };

        Models.properties = function properties(model) {
          var Model = this.get(model);
          if (Model) {
            return Model.props;
          } else {
            return [];
          }
        };

        return Models;
      }());

      _export('Models', Models);
    }
  };
});

'use strict';

System.register('app/utils.js', ['es6-mapify', 'string', 'app/models', 'pad-number'], function (_export, _context) {
  "use strict";

  var mapify, S, Models, pad, Utils;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_es6Mapify) {
      mapify = _es6Mapify.mapify;
    }, function (_string) {
      S = _string.default;
    }, function (_appModels) {
      Models = _appModels.Models;
    }, function (_padNumber) {
      pad = _padNumber.default;
    }],
    execute: function () {
      _export('Utils', Utils = function () {
        function Utils() {
          _classCallCheck(this, Utils);
        }

        Utils.toMap = function toMap(object) {
          return mapify(object);
        };

        Utils.isNullOrUndefined = function isNullOrUndefined(value) {
          return value === null || value === undefined;
        };

        Utils.addToCollection = function addToCollection(target, collection) {
          collection.unshift(target);
        };

        Utils.removeFromCollection = function removeFromCollection(target, collection) {
          var indexToDelete = collection.findIndex(function (item) {
            return item.id === target.id;
          });

          if (indexToDelete != -1) {
            collection.splice(indexToDelete, 1);
          }
        };

        Utils.stringIncludes = function stringIncludes(string, search) {

          return S(string).include(search);
        };

        Utils.isEmptyString = function isEmptyString(string) {
          return typeof string === "string" && S(string).isEmpty();
        };

        Utils.padded = function padded(digits) {
          var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

          return pad(digits, 4);
        };

        Utils.collectionName = function collectionName(resource) {
          if (/party|.*party/i.test(resource)) {
            return resource.replace(/arty/, 'arties');
          } else {
            return resource + 's';
          }
        };

        Utils.mapCollection = function mapCollection(type, collection) {
          var Model = Models.get(type);

          if (Model) {
            return collection.map(function (record) {
              return new Model(record);
            });
          } else {
            return collection;
          }
        };

        Utils.capitalize = function capitalize(target) {
          return S(target).capitalize().s;
        };

        Utils.dasherize = function dasherize(target) {
          return S(target).dasherize().s;
        };

        Utils.titleize = function titleize(target) {
          var _this = this;

          return S(target).humanize().s.split(' ').map(function (s) {
            return _this.capitalize(s);
          }).join(' ');
        };

        Utils.collectionType = function collectionType(resource) {
          return this.collectionName(S(resource).dasherize().s.replace(/-/g, ''));
        };

        Utils.forEachModelProp = function forEachModelProp(Model, action) {
          if (Model) {
            Model.props.forEach(function (prop) {
              action(prop);
            });
          }
        };

        return Utils;
      }());

      _export('Utils', Utils);
    }
  };
});

'use strict';

System.register('app/auth-service.js', ['app/config/api', 'app/auth-context', 'app/utils'], function (_export, _context) {
  "use strict";

  var ApiConfig, AuthContext, Utils, _isAuthenticated, login, AuthService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_appConfigApi) {
      ApiConfig = _appConfigApi.ApiConfig;
    }, function (_appAuthContext) {
      AuthContext = _appAuthContext.AuthContext;
    }, function (_appUtils) {
      Utils = _appUtils.Utils;
    }],
    execute: function () {
      _isAuthenticated = function _isAuthenticated() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          dpd.users.me(function (result, error) {

            if (error) {
              return reject(error);
            }
            var me = new Object(result);

            if (me.id) {
              _this.authContext.loggedIn(me);
            }

            resolve(me.id != undefined);
          });
        });
      };

      login = function login(method, credentials) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          var loginMethod = method == "login" ? dpd.users.login : dpd.loginwithpin.post;
          loginMethod(credentials, function (user, error) {
            var resolveReject = function resolveReject(yes) {
              if (yes) {
                resolve(_this2.authContext.currentUser);
              } else {
                reject(error || {});
              }
            };
            if (user) {
              if (!new UserModel(user).isDriver()) {
                console.log('rejecting');
                return _this2.logout().then(function () {
                  reject("Only drivers can use this app.");
                });
              } else {
                _this2.authContext.loggedIn(user);
                resolveReject(true);
              }
            } else if (!error) {
              return _isAuthenticated.call(_this2).then(function (authenticated) {
                resolveReject(authenticated);
              });
            } else {
              resolveReject(false);
            }
          });
        });
      };

      _export('AuthService', AuthService = function () {
        AuthService.inject = function inject() {
          return [AuthContext];
        };

        function AuthService(authContext) {
          _classCallCheck(this, AuthService);

          this.authContext = authContext;
          dpd.setBaseUrl(ApiConfig.URL);
        }

        AuthService.prototype.passwordLogin = function passwordLogin(username, password) {
          return login.call(this, "login", { username: username, password: password });
        };

        AuthService.prototype.pinLogin = function pinLogin(locationId, pin) {
          return login.call(this, "pinlogin", { locationId: locationId, pin: pin });
        };

        AuthService.prototype.logout = function logout() {
          var _this3 = this;

          return new Promise(function (resolve, reject) {
            dpd.users.logout(function (result, error) {

              if (!error) {
                _this3.authContext.loggedOut();
                resolve(result);
              } else {
                reject(error);
              }
            });
          });
        };

        AuthService.prototype.isAuthenticated = function isAuthenticated() {
          return _isAuthenticated.call(this);
        };

        return AuthService;
      }());

      _export('AuthService', AuthService);
    }
  };
});

'use strict';

System.register('init.js', ['app/dependencies', 'app/auth-service'], function (_export, _context) {
  "use strict";

  var AuthService;
  function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-validation');

    aurelia.start().then(function () {
      console.log('set root');
      return aurelia.container.get(AuthService).isAuthenticated().then(function () {
        aurelia.setRoot('app/app');
      });
    });
  }

  _export('configure', configure);

  return {
    setters: [function (_appDependencies) {}, function (_appAuthService) {
      AuthService = _appAuthService.AuthService;
    }],
    execute: function () {}
  };
});
