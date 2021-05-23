const fs = require("fs");
const loader = require("@assemblyscript/loader");

const wasmModule = loader.instantiateSync(
	fs.readFileSync(__dirname + "/build/untouched.wasm")
);

const { encode, decode, __newString, __getString } = wasmModule.exports;

module.exports = {
	encode: (s) => __getString(encode(__newString(s))),
	decode: (s) => __getString(decode(__newString(s)))
};
