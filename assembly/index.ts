import { bottomLookup, bottomLookupLength } from "./macro";

const separator = "👉👈";
const sepPtr = changetype<usize>(separator);
const sepLen = 8;

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
		memory.copy(destPtr - sepLen, sepPtr, sepLen);
	}

	return destBuffer;
}

export function decode(s: string): string | null {
	if (!s.endsWith(separator)) return null;

	// Replace String.split for performance in future
	const bytes = s.split(separator);
	const size = bytes.length;
	const dest = new ArrayBuffer(size);
	const destPtr = changetype<usize>(dest);

	for (let i = 0; i < size; i++) {
		const v = bytes[i];
		store<u8>(destPtr + i, bottomLookup.indexOf(v));
	}

	return String.UTF8.decode(dest);
}
