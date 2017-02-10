System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "bower:*": "jspm_packages/bower/*"
  },
  map: {
    "ajax-interceptor": "npm:ajax-interceptor@1.0.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.1",
    "aurelia-framework": "npm:aurelia-framework@1.0.6",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-http-client": "npm:aurelia-http-client@1.0.2",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-mask": "github:ariovistus/aurelia-mask@1.2.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
    "aurelia-router": "npm:aurelia-router@1.0.6",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.1.1",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0",
    "aurelia-validation": "npm:aurelia-validation@0.13.1",
    "css": "github:systemjs/plugin-css@0.1.32",
    "deployd": "bower:file:./dependencies/deployd.js@latest",
    "deployd:": "bower:file:./dependencies/deployd.js@latest",
    "es6-mapify": "npm:es6-mapify@1.0.0",
    "font-awesome": "npm:font-awesome@4.6.3",
    "framework7": "npm:framework7@1.4.2",
    "framework7-icons": "npm:framework7-icons@0.8.7",
    "jquery": "npm:jquery@2.2.4",
    "local-storage": "npm:local-storage@1.4.2",
    "moment": "npm:moment@2.17.1",
    "moment-timezone": "npm:moment-timezone@0.5.11",
    "pad-number": "npm:pad-number@0.0.4",
    "shortid": "npm:shortid@2.2.6",
    "string": "npm:string@3.3.3",
    "text": "github:systemjs/plugin-text@0.0.9",
    "github:ariovistus/aurelia-mask@1.2.0": {
      "ansi-styles": "npm:ansi-styles@2.2.1",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
      "ts": "github:frankwallis/plugin-typescript@2.6.0"
    },
    "github:frankwallis/plugin-typescript@2.6.0": {
      "typescript": "npm:typescript@1.7.5"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.11.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-querystring@0.1.0": {
      "querystring": "npm:querystring@0.2.0"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:amdefine@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:asn1.js@4.9.1": {
      "bn.js": "npm:bn.js@4.11.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-binding@1.0.9": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-bootstrapper@1.0.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.6",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.6",
      "aurelia-templating": "npm:aurelia-templating@1.1.2",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.1.1",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0"
    },
    "npm:aurelia-dependency-injection@1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-event-aggregator@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-framework@1.0.6": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.2"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-http-client@1.0.2": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-metadata@1.0.2": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-pal-browser@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-polyfills@1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-route-recognizer@1.1.0": {
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-router@1.0.6": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.1.0"
    },
    "npm:aurelia-task-queue@1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-templating-binding@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.2"
    },
    "npm:aurelia-templating-resources@1.1.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.2"
    },
    "npm:aurelia-templating-router@1.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.6",
      "aurelia-templating": "npm:aurelia-templating@1.1.2"
    },
    "npm:aurelia-templating@1.1.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-validation@0.13.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.2"
    },
    "npm:bn.js@4.11.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:brace-expansion@1.1.6": {
      "balanced-match": "npm:balanced-match@0.4.2",
      "concat-map": "npm:concat-map@0.0.1"
    },
    "npm:browserify-aes@1.0.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.3",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:browserify-rsa@4.0.1": {
      "bn.js": "npm:bn.js@4.11.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.3"
    },
    "npm:browserify-sign@4.0.0": {
      "bn.js": "npm:bn.js@4.11.6",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.3.2",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.8",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:cipher-base@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:commander@2.9.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:create-ecdh@4.0.0": {
      "bn.js": "npm:bn.js@4.11.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.3.2"
    },
    "npm:create-hash@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@1.0.1",
      "sha.js": "npm:sha.js@2.4.8"
    },
    "npm:create-hmac@1.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:crypto-browserify@3.11.0": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@4.0.0",
      "create-ecdh": "npm:create-ecdh@4.0.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "diffie-hellman": "npm:diffie-hellman@5.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.9",
      "public-encrypt": "npm:public-encrypt@4.0.0",
      "randombytes": "npm:randombytes@2.0.3"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@5.0.2": {
      "bn.js": "npm:bn.js@4.11.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@4.0.0",
      "randombytes": "npm:randombytes@2.0.3",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:elliptic@6.3.2": {
      "bn.js": "npm:bn.js@4.11.6",
      "brorand": "npm:brorand@1.0.6",
      "hash.js": "npm:hash.js@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:es6-mapify@1.0.0": {
      "traceur": "npm:traceur@0.0.111"
    },
    "npm:evp_bytestokey@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.32"
    },
    "npm:framework7@1.4.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:glob@5.0.15": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inflight": "npm:inflight@1.0.6",
      "inherits": "npm:inherits@2.0.1",
      "minimatch": "npm:minimatch@3.0.3",
      "once": "npm:once@1.4.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "path-is-absolute": "npm:path-is-absolute@1.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:hash.js@1.0.3": {
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:inflight@1.0.6": {
      "once": "npm:once@1.4.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "wrappy": "npm:wrappy@1.0.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:miller-rabin@4.0.0": {
      "bn.js": "npm:bn.js@4.11.6",
      "brorand": "npm:brorand@1.0.6"
    },
    "npm:minimatch@3.0.3": {
      "brace-expansion": "npm:brace-expansion@1.1.6",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:moment-timezone@0.5.11": {
      "moment": "npm:moment@2.17.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:once@1.4.0": {
      "wrappy": "npm:wrappy@1.0.2"
    },
    "npm:parse-asn1@5.0.0": {
      "asn1.js": "npm:asn1.js@4.9.1",
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "pbkdf2": "npm:pbkdf2@3.0.9",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-is-absolute@1.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pbkdf2@3.0.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:public-encrypt@4.0.0": {
      "bn.js": "npm:bn.js@4.11.6",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "randombytes": "npm:randombytes@2.0.3"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:randombytes@2.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:ripemd160@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rsvp@3.3.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:semver@4.3.6": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:shortid@2.2.6": {
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:source-map-support@0.2.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0",
      "source-map": "npm:source-map@0.1.32"
    },
    "npm:source-map@0.1.32": {
      "amdefine": "npm:amdefine@1.0.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:traceur@0.0.111": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.9.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "glob": "npm:glob@5.0.15",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "rsvp": "npm:rsvp@3.3.3",
      "semver": "npm:semver@4.3.6",
      "source-map-support": "npm:source-map-support@0.2.10",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  },
  bundles: {
    "aurelia.js": [
      "bower:file:./dependencies/deployd.js@latest.js",
      "bower:file:./dependencies/deployd.js@latest/index.js",
      "github:ariovistus/aurelia-mask@1.2.0.js",
      "github:ariovistus/aurelia-mask@1.2.0/masked-input.js",
      "github:ariovistus/aurelia-mask@1.2.0/masker.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "github:systemjs/plugin-css@0.1.32.js",
      "github:systemjs/plugin-css@0.1.32/css.js",
      "github:systemjs/plugin-text@0.0.9.js",
      "github:systemjs/plugin-text@0.0.9/text.js",
      "npm:ajax-interceptor@1.0.1.js",
      "npm:ajax-interceptor@1.0.1/index.js",
      "npm:aurelia-binding@1.0.9.js",
      "npm:aurelia-binding@1.0.9/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0.js",
      "npm:aurelia-bootstrapper@1.0.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.2.0.js",
      "npm:aurelia-dependency-injection@1.2.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.1.js",
      "npm:aurelia-event-aggregator@1.0.1/aurelia-event-aggregator.js",
      "npm:aurelia-framework@1.0.6.js",
      "npm:aurelia-framework@1.0.6/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0.js",
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0.js",
      "npm:aurelia-history@1.0.0/aurelia-history.js",
      "npm:aurelia-http-client@1.0.2.js",
      "npm:aurelia-http-client@1.0.2/aurelia-http-client.js",
      "npm:aurelia-loader-default@1.0.0.js",
      "npm:aurelia-loader-default@1.0.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0.js",
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.2.0.js",
      "npm:aurelia-logging@1.2.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.2.js",
      "npm:aurelia-metadata@1.0.2/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0.js",
      "npm:aurelia-pal-browser@1.0.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.2.0.js",
      "npm:aurelia-pal@1.2.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-polyfills@1.1.1.js",
      "npm:aurelia-polyfills@1.1.1/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.1.0.js",
      "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.6.js",
      "npm:aurelia-router@1.0.6/aurelia-router.js",
      "npm:aurelia-task-queue@1.1.0.js",
      "npm:aurelia-task-queue@1.1.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0.js",
      "npm:aurelia-templating-binding@1.0.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.1.1.js",
      "npm:aurelia-templating-resources@1.1.1/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.1.1/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.1.1/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/attr-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.1.1/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.1.1/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.1.1/binding-signaler.js",
      "npm:aurelia-templating-resources@1.1.1/compose.js",
      "npm:aurelia-templating-resources@1.1.1/css-resource.js",
      "npm:aurelia-templating-resources@1.1.1/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/dynamic-element.js",
      "npm:aurelia-templating-resources@1.1.1/focus.js",
      "npm:aurelia-templating-resources@1.1.1/hide.js",
      "npm:aurelia-templating-resources@1.1.1/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.1.1/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.1.1/if.js",
      "npm:aurelia-templating-resources@1.1.1/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.1.1/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.1.1/repeat.js",
      "npm:aurelia-templating-resources@1.1.1/replaceable.js",
      "npm:aurelia-templating-resources@1.1.1/sanitize-html.js",
      "npm:aurelia-templating-resources@1.1.1/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/show.js",
      "npm:aurelia-templating-resources@1.1.1/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/with.js",
      "npm:aurelia-templating-router@1.0.0.js",
      "npm:aurelia-templating-router@1.0.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0/route-href.js",
      "npm:aurelia-templating-router@1.0.0/route-loader.js",
      "npm:aurelia-templating-router@1.0.0/router-view.js",
      "npm:aurelia-templating@1.1.2.js",
      "npm:aurelia-templating@1.1.2/aurelia-templating.js",
      "npm:aurelia-validation@0.13.1.js",
      "npm:aurelia-validation@0.13.1/aurelia-validation.js",
      "npm:aurelia-validation@0.13.1/implementation/rules.js",
      "npm:aurelia-validation@0.13.1/implementation/standard-validator.js",
      "npm:aurelia-validation@0.13.1/implementation/util.js",
      "npm:aurelia-validation@0.13.1/implementation/validation-messages.js",
      "npm:aurelia-validation@0.13.1/implementation/validation-parser.js",
      "npm:aurelia-validation@0.13.1/implementation/validation-rules.js",
      "npm:aurelia-validation@0.13.1/property-info.js",
      "npm:aurelia-validation@0.13.1/validate-binding-behavior-base.js",
      "npm:aurelia-validation@0.13.1/validate-binding-behavior.js",
      "npm:aurelia-validation@0.13.1/validate-trigger.js",
      "npm:aurelia-validation@0.13.1/validation-controller-factory.js",
      "npm:aurelia-validation@0.13.1/validation-controller.js",
      "npm:aurelia-validation@0.13.1/validation-error.js",
      "npm:aurelia-validation@0.13.1/validation-errors-custom-attribute.js",
      "npm:aurelia-validation@0.13.1/validation-renderer-custom-attribute.js",
      "npm:aurelia-validation@0.13.1/validator.js",
      "npm:es6-mapify@1.0.0.js",
      "npm:es6-mapify@1.0.0/lib/es5/main.js",
      "npm:framework7@1.4.2.js",
      "npm:framework7@1.4.2/dist/js/framework7.js",
      "npm:local-storage@1.4.2.js",
      "npm:local-storage@1.4.2/local-storage.js",
      "npm:local-storage@1.4.2/stub.js",
      "npm:local-storage@1.4.2/tracking.js",
      "npm:moment-timezone@0.5.11.js",
      "npm:moment-timezone@0.5.11/builds/moment-timezone-with-data.js",
      "npm:moment@2.17.1.js",
      "npm:moment@2.17.1/moment.js",
      "npm:pad-number@0.0.4.js",
      "npm:pad-number@0.0.4/index.js",
      "npm:process@0.11.9.js",
      "npm:process@0.11.9/browser.js",
      "npm:shortid@2.2.6.js",
      "npm:shortid@2.2.6/index.js",
      "npm:shortid@2.2.6/lib/alphabet.js",
      "npm:shortid@2.2.6/lib/decode.js",
      "npm:shortid@2.2.6/lib/encode.js",
      "npm:shortid@2.2.6/lib/index.js",
      "npm:shortid@2.2.6/lib/is-valid.js",
      "npm:shortid@2.2.6/lib/random/random-byte-browser.js",
      "npm:shortid@2.2.6/lib/random/random-from-seed.js",
      "npm:shortid@2.2.6/lib/util/cluster-worker-id-browser.js",
      "npm:string@3.3.3.js",
      "npm:string@3.3.3/lib/_count.js",
      "npm:string@3.3.3/lib/_splitLeft.js",
      "npm:string@3.3.3/lib/_splitRight.js",
      "npm:string@3.3.3/lib/string.js"
    ],
    "app-build.js": [
      "app/active-trip-step.js",
      "app/active-trip.html!github:systemjs/plugin-text@0.0.9.js",
      "app/active-trip.js",
      "app/add-resource-dialog.js",
      "app/api.js",
      "app/app-base.js",
      "app/app-context.js",
      "app/app.html!github:systemjs/plugin-text@0.0.9.js",
      "app/app.js",
      "app/auth-context.js",
      "app/auth-role-step.js",
      "app/auth-service.js",
      "app/auth/login.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/login.js",
      "app/auth/login/password.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/login/pin.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/logout.js",
      "app/auth/reset-password-confirm.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-password-confirm.js",
      "app/auth/reset-password-request.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-password-request.js",
      "app/auth/reset-password/confirm-failed.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-password/request-confirmed.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-password/request-confirmed.js",
      "app/auth/reset-password/request-form.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-password/request-form.js",
      "app/auth/reset-password/request-success.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-password/reset-failed.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-password/reset-success.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-pin-confirm.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-pin-confirm.js",
      "app/auth/reset-pin-request.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-pin-request.js",
      "app/auth/reset-pin/confirm-failed.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-pin/request-confirmed.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-pin/request-confirmed.js",
      "app/auth/reset-pin/request-form.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-pin/request-form.js",
      "app/auth/reset-pin/request-success.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-pin/reset-failed.html!github:systemjs/plugin-text@0.0.9.js",
      "app/auth/reset-pin/reset-success.html!github:systemjs/plugin-text@0.0.9.js",
      "app/authorize-step.js",
      "app/bootstrap-dialog.js",
      "app/bootstrap-form.js",
      "app/bootstrap.js",
      "app/collection.js",
      "app/components/back.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/confirm.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/confirm.js",
      "app/components/cselect-popup.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/cselect-popup.js",
      "app/components/cselect.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/cselect.js",
      "app/components/date-time-picker.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/date-time-picker.js",
      "app/components/delete.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/delete.js",
      "app/components/dialog.js",
      "app/components/drivers-license.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/drivers-license.js",
      "app/components/form-element.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/loader.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/loader.js",
      "app/components/nav-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/nav-bar.js",
      "app/components/nav-bars/active-trip.js",
      "app/components/nav-bars/base.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/nav-bars/base.js",
      "app/components/nav-bars/parties.js",
      "app/components/nav-bars/show-archived.js",
      "app/components/nav-bars/show-party.js",
      "app/components/nav-bars/show-trip-party.js",
      "app/components/nav-bars/show-trip.js",
      "app/components/nav-bars/trips.js",
      "app/components/nav-bars/trips/show.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/nav-bars/trips/show.js",
      "app/components/nav-popup.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/nselect.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/nselect.js",
      "app/components/parties/party-header.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/parties/party-list.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/parties/party-list.js",
      "app/components/parties/party.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/phone-number.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/phone-number.js",
      "app/components/resource-table/actions-renderer.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/resource-table/actions-renderer.js",
      "app/components/resource-table/actions/driver-trips.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/resource-table/actions/driver-trips.js",
      "app/components/resource-table/column.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/resource-table/column.js",
      "app/components/resource-table/password.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/resource-table/password.js",
      "app/components/resource-table/pin.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/resource-table/pin.js",
      "app/components/resource-table/tr-renderer.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/resource-table/tr-renderer.js",
      "app/components/submit.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/submit.js",
      "app/components/third-party/numeric-input.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/third-party/numeric-input.js",
      "app/components/tool-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/tool-bar.js",
      "app/components/trips/confirm-dialog.js",
      "app/components/trips/confirm-end.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/confirm-end.js",
      "app/components/trips/confirm-start.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/confirm-start.js",
      "app/components/trips/other-location.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/other-location.js",
      "app/components/trips/parties.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/parties.js",
      "app/components/trips/party-header.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/party.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/party.js",
      "app/components/trips/trip-add-party.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/trip-add-party.js",
      "app/components/trips/trip-duration.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/trip-duration.js",
      "app/components/trips/trip-header.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/trip-list.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/trip.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/trips/trip.js",
      "app/components/zip-code.html!github:systemjs/plugin-text@0.0.9.js",
      "app/components/zip-code.js",
      "app/config/api.js",
      "app/config/app-router.js",
      "app/converters/admin-filter.js",
      "app/converters/am-pm.js",
      "app/converters/collapse-filter.js",
      "app/converters/duration.js",
      "app/converters/initials.js",
      "app/converters/not-collapsed-filter.js",
      "app/converters/password-filter.js",
      "app/converters/trip-number.js",
      "app/converters/trips-filter.js",
      "app/data-source.js",
      "app/deferred.js",
      "app/dependencies.js",
      "app/events.js",
      "app/f7.js",
      "app/location-not-found.html!github:systemjs/plugin-text@0.0.9.js",
      "app/main-view.html!github:systemjs/plugin-text@0.0.9.js",
      "app/main-view.js",
      "app/models.js",
      "app/models/date-model.js",
      "app/models/index.js",
      "app/models/location.js",
      "app/models/model.js",
      "app/models/party.js",
      "app/models/shuttle.js",
      "app/models/trip.js",
      "app/models/user.js",
      "app/n-popup.html!github:systemjs/plugin-text@0.0.9.js",
      "app/n-popup.js",
      "app/net.js",
      "app/not-found.html!github:systemjs/plugin-text@0.0.9.js",
      "app/not-found.js",
      "app/notifier.js",
      "app/parties.html!github:systemjs/plugin-text@0.0.9.js",
      "app/parties.js",
      "app/parties/add-party.html!github:systemjs/plugin-text@0.0.9.js",
      "app/parties/add-party.js",
      "app/popup.html!github:systemjs/plugin-text@0.0.9.js",
      "app/popup.js",
      "app/resource-dialog-form.js",
      "app/resource-dialog.js",
      "app/show-archived.html!github:systemjs/plugin-text@0.0.9.js",
      "app/show-archived.js",
      "app/show-party.html!github:systemjs/plugin-text@0.0.9.js",
      "app/show-party.js",
      "app/show-trip-party.js",
      "app/show-trip.html!github:systemjs/plugin-text@0.0.9.js",
      "app/show-trip.js",
      "app/skip-main-view-step.js",
      "app/stores.js",
      "app/stores/index.js",
      "app/stores/location.js",
      "app/stores/party.js",
      "app/stores/restful.js",
      "app/stores/shuttle.js",
      "app/stores/trip.js",
      "app/stores/user.js",
      "app/trips.html!github:systemjs/plugin-text@0.0.9.js",
      "app/trips.js",
      "app/trips/pickup-destination.html!github:systemjs/plugin-text@0.0.9.js",
      "app/trips/pickup-destination.js",
      "app/trips/show-party.html!github:systemjs/plugin-text@0.0.9.js",
      "app/trips/show-party.js",
      "app/trips/show-trip.html!github:systemjs/plugin-text@0.0.9.js",
      "app/trips/show-trip.js",
      "app/utils.js",
      "app/utils/table.js",
      "app/validation-rules.js",
      "app/with-context.js",
      "init.js"
    ]
  }
});