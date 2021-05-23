import { bottomLookup, bottomLookupLength } from "./macro";

export function encode(s: string): string {
	// Here be dragons 🐉
	const buffer = String.UTF8.encode(s);
	const srcPtr = changetype<usize>(buffer);

	// get size of destination buffer
	let destSize = 0;
	for (let i = 0; i < buffer.byteLength; i++) {
		destSize += bottomLookupLength[load<u8>(srcPtr + i)];
	}

	let destPtr = __new(destSize, idof<string>());
	const destBuffer = changetype<string>(destPtr);
	for (let i = 0; i < buffer.byteLength; i++) {
		let char = load<u8>(srcPtr + i);
		const mem = bottomLookup[char];
		const memSize = bottomLookupLength[char];
		memory.copy(destPtr, changetype<usize>(mem), memSize);
		destPtr += memSize;
	}

	return destBuffer;
}
