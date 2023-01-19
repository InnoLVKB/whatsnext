"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/login";
exports.ids = ["pages/api/login"];
exports.modules = {

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "(api)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_0__);\n\nlet db;\nconst connectionString = process.env.CONNECTION_STRING;\nif (!db) {\n    db = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\n        connectionString: connectionString\n    });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZGIudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBCO0FBRTFCLElBQUlDO0FBQ0osTUFBTUMsbUJBQW1CQyxRQUFRQyxHQUFHLENBQUNDLGlCQUFpQjtBQUV0RCxJQUFJLENBQUNKLElBQUk7SUFDUEEsS0FBSyxJQUFJRCxvQ0FBSUEsQ0FBQztRQUNaRSxrQkFBa0JBO0lBQ3BCO0FBQ0YsQ0FBQztBQUVELGlFQUFlRCxFQUFFQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2hhdHNuZXh0Ly4vbGliL2RiLnRzPzFkZjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gXCJwZ1wiO1xuXG5sZXQgZGI7XG5jb25zdCBjb25uZWN0aW9uU3RyaW5nID0gcHJvY2Vzcy5lbnYuQ09OTkVDVElPTl9TVFJJTkc7XG5cbmlmICghZGIpIHtcbiAgZGIgPSBuZXcgUG9vbCh7XG4gICAgY29ubmVjdGlvblN0cmluZzogY29ubmVjdGlvblN0cmluZyxcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRiOyJdLCJuYW1lcyI6WyJQb29sIiwiZGIiLCJjb25uZWN0aW9uU3RyaW5nIiwicHJvY2VzcyIsImVudiIsIkNPTk5FQ1RJT05fU1RSSU5HIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/db.ts\n");

/***/ }),

/***/ "(api)/./pages/api/login.ts":
/*!****************************!*\
  !*** ./pages/api/login.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/db */ \"(api)/./lib/db.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    try {\n        const { method  } = req;\n        const { username , password  } = req.body;\n        switch(method){\n            case \"POST\":\n                const query = \"SELECT * FROM users WHERE username = $1;\";\n                const values = [\n                    username\n                ];\n                const data = await _lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].query(query, values);\n                const dbPassword = data.rows[0].password;\n                bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(password, dbPassword, function(err, result) {\n                    if (result) {\n                        return res.status(200).json({\n                            message: \"User logged in\",\n                            username: data.rows[0].username,\n                            user_id: data.rows[0].user_id\n                        });\n                    } else {\n                        return res.status(500).json({\n                            error: \"Something went wrong\"\n                        });\n                    }\n                });\n                break;\n        }\n    } catch (error) {\n        console.log(error);\n        res.status(500).json({\n            error: \"Something went wrong\"\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbG9naW4udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUM2QjtBQUNGO0FBRTNCLGlFQUFlLE9BQU9FLEtBQXFCQyxNQUF5QjtJQUNsRSxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxPQUFNLEVBQUUsR0FBR0Y7UUFDbkIsTUFBTSxFQUFFRyxTQUFRLEVBQUVDLFNBQVEsRUFBRSxHQUFHSixJQUFJSyxJQUFJO1FBQ3ZDLE9BQVFIO1lBQ04sS0FBSztnQkFDSCxNQUFNSSxRQUFRO2dCQUNkLE1BQU1DLFNBQVM7b0JBQUNKO2lCQUFTO2dCQUN6QixNQUFNSyxPQUFPLE1BQU1WLHFEQUFRLENBQUNRLE9BQU9DO2dCQUNuQyxNQUFNRSxhQUFhRCxLQUFLRSxJQUFJLENBQUMsRUFBRSxDQUFDTixRQUFRO2dCQUN4Q0wscURBQWMsQ0FBQ0ssVUFBVUssWUFBWSxTQUFTRyxHQUFHLEVBQUVDLE1BQU0sRUFBRTtvQkFDdkQsSUFBSUEsUUFBUTt3QkFDUixPQUFPWixJQUFJYSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDOzRCQUMxQkMsU0FBUzs0QkFDVGIsVUFBVUssS0FBS0UsSUFBSSxDQUFDLEVBQUUsQ0FBQ1AsUUFBUTs0QkFDL0JjLFNBQVNULEtBQUtFLElBQUksQ0FBQyxFQUFFLENBQUNPLE9BQU87d0JBQy9CO29CQUNKLE9BQU87d0JBQ0gsT0FBT2hCLElBQUlhLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7NEJBQUVHLE9BQU87d0JBQXVCO29CQUNoRSxDQUFDO2dCQUNMO2dCQUNBLEtBQUs7UUFDWDtJQUNGLEVBQUUsT0FBT0EsT0FBTztRQUNkQyxRQUFRQyxHQUFHLENBQUNGO1FBQ1pqQixJQUFJYSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVHLE9BQU87UUFBdUI7SUFDdkQ7QUFBQyxHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2hhdHNuZXh0Ly4vcGFnZXMvYXBpL2xvZ2luLnRzP2MxMjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgZGIgZnJvbSAnLi4vLi4vbGliL2RiJ1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgbWV0aG9kIH0gPSByZXE7XG4gICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdQT1NUJzpcbiAgICAgICAgY29uc3QgcXVlcnkgPSAnU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSB1c2VybmFtZSA9ICQxOyc7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFt1c2VybmFtZV07XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYi5xdWVyeShxdWVyeSwgdmFsdWVzKTtcbiAgICAgICAgY29uc3QgZGJQYXNzd29yZCA9IGRhdGEucm93c1swXS5wYXNzd29yZDtcbiAgICAgICAgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGRiUGFzc3dvcmQsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdVc2VyIGxvZ2dlZCBpbicsXG4gICAgICAgICAgICAgICAgICB1c2VybmFtZTogZGF0YS5yb3dzWzBdLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgdXNlcl9pZDogZGF0YS5yb3dzWzBdLnVzZXJfaWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgfVxufSBjYXRjaCAoZXJyb3IpIHtcbiAgY29uc29sZS5sb2coZXJyb3IpO1xuICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xufX07Il0sIm5hbWVzIjpbImRiIiwiYmNyeXB0IiwicmVxIiwicmVzIiwibWV0aG9kIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImJvZHkiLCJxdWVyeSIsInZhbHVlcyIsImRhdGEiLCJkYlBhc3N3b3JkIiwicm93cyIsImNvbXBhcmUiLCJlcnIiLCJyZXN1bHQiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInVzZXJfaWQiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/login.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/login.ts"));
module.exports = __webpack_exports__;

})();