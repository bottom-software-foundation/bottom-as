const bottom_as = require("..");
const bottom_js = require("bottomify");
const { performance } = require("perf_hooks");

// From https://github.com/MaxGraey/as-string-sink/blob/main/benchmark/run.js
function runBench(fn, arg, iters, name) {
	// warmup
	for (let i = 0; i < 100000; i++) {
		fn(arg);
	}

	let dt = 0;
	dt = performance.now();
	for (let i = 0; i < iters; i++) {
		fn(arg);
	}
	dt = performance.now() - dt;
	console.log(`${name}: ${dt < 1 ? dt.toPrecision(2) : dt.toFixed(2)} ms`);
}

const iterations = [100, 50_000, 200_000];

new Map()
	.set("encode", "がんばれ")
	.set(
		"decode",
		"🫂✨✨🥺,,👉👈💖💖✨✨🥺,,,,👉👈💖💖✨✨✨✨👉👈🫂✨✨🥺,,👉👈💖💖✨✨✨👉👈💖💖✨✨✨✨🥺,,👉👈🫂✨✨🥺,,👉👈💖💖✨✨🥺,,,,👉👈💖💖💖✨✨🥺,👉👈🫂✨✨🥺,,👉👈💖💖✨✨✨👉👈💖💖✨✨✨✨👉👈"
	)
	.forEach((v, f) => {
		iterations.forEach((i) => {
			console.log(`${i} ${f}s:`);
			console.log("------------");
			runBench(bottom_as[f], v, i, "bottom-as");
			runBench(bottom_js[f], v, i, "bottom-js");
			console.log("");
		});
	});
