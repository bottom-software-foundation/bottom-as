const fs = require("fs");
const AsBind = require("as-bind/dist/as-bind.cjs");

const wasmModule = AsBind.instantiateSync(
	fs.readFileSync(__dirname + "/build/untouched.wasm")
);

module.exports = wasmModule.exports;
