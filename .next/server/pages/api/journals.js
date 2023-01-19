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
exports.id = "pages/api/journals";
exports.ids = ["pages/api/journals"];
exports.modules = {

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

/***/ "(api)/./pages/api/journals.ts":
/*!*******************************!*\
  !*** ./pages/api/journals.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/db */ \"(api)/./lib/db.ts\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    try {\n        const { method  } = req;\n        const { date , user_id  } = req.body;\n        switch(method){\n            case \"POST\":\n                const query = \"SELECT * FROM journal_entries WHERE date = $1 AND user_id = $2\";\n                const values = [\n                    date,\n                    user_id\n                ];\n                const result = await _lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].query(query, values);\n                res.status(200).json(result.rows);\n                break;\n        }\n    } catch (error) {\n        console.log(error);\n        res.status(500).json({\n            error: \"Something went wrong\"\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvam91cm5hbHMudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDNkI7QUFFN0IsaUVBQWUsT0FBT0MsS0FBcUJDLE1BQXlCO0lBQ2xFLElBQUk7UUFDRixNQUFNLEVBQUVDLE9BQU0sRUFBRSxHQUFHRjtRQUNuQixNQUFNLEVBQUVHLEtBQUksRUFBRUMsUUFBTyxFQUFFLEdBQUdKLElBQUlLLElBQUk7UUFDbEMsT0FBUUg7WUFDTixLQUFLO2dCQUNILE1BQU1JLFFBQVE7Z0JBQ2QsTUFBTUMsU0FBUztvQkFBQ0o7b0JBQU1DO2lCQUFRO2dCQUM5QixNQUFNSSxTQUFTLE1BQU1ULHFEQUFRLENBQUNPLE9BQU9DO2dCQUNyQ04sSUFBSVEsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0YsT0FBT0csSUFBSTtnQkFDaEMsS0FBSztRQUNYO0lBQ0YsRUFBRSxPQUFPQyxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDWlgsSUFBSVEsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFRSxPQUFPO1FBQXVCO0lBQ3ZEO0FBQUMsR0FBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3doYXRzbmV4dC8uL3BhZ2VzL2FwaS9qb3VybmFscy50cz9mMGNiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0J1xuaW1wb3J0IGRiIGZyb20gJy4uLy4uL2xpYi9kYidcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBtZXRob2QgfSA9IHJlcTtcbiAgICBjb25zdCB7IGRhdGUsIHVzZXJfaWQgfSA9IHJlcS5ib2R5O1xuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdQT1NUJzpcbiAgICAgICAgY29uc3QgcXVlcnkgPSAnU0VMRUNUICogRlJPTSBqb3VybmFsX2VudHJpZXMgV0hFUkUgZGF0ZSA9ICQxIEFORCB1c2VyX2lkID0gJDInO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbZGF0ZSwgdXNlcl9pZF07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KHF1ZXJ5LCB2YWx1ZXMpO1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQucm93cyk7XG4gICAgICAgIGJyZWFrXG4gIH1cbn0gY2F0Y2ggKGVycm9yKSB7XG4gIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbn19OyJdLCJuYW1lcyI6WyJkYiIsInJlcSIsInJlcyIsIm1ldGhvZCIsImRhdGUiLCJ1c2VyX2lkIiwiYm9keSIsInF1ZXJ5IiwidmFsdWVzIiwicmVzdWx0Iiwic3RhdHVzIiwianNvbiIsInJvd3MiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/journals.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/journals.ts"));
module.exports = __webpack_exports__;

})();