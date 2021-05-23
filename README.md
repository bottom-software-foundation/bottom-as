# bottom-as

An implementation of bottom in AssemblyScript.

## What is AssemblyScript?

AssemblyScript compiles TypeScript to WebAssembly. Read more [here.](https://www.assemblyscript.org)

## Is this library safe?

Particularly for the encode function, the library does several raw memory operations for performance.

## Benched against bottom-js

```
100 encodes:
------------
bottom-as: 0.59 ms
bottom-js: 4.89 ms

50000 encodes:
------------
bottom-as: 300.38 ms
bottom-js: 1828.18 ms

200000 encodes:
------------
bottom-as: 1229.01 ms
bottom-js: 7177.28 ms

100 decodes:
------------
bottom-as: 2.07 ms
bottom-js: 5.47 ms

50000 decodes:
------------
bottom-as: 1058.83 ms
bottom-js: 2530.29 ms

200000 decodes:
------------
bottom-as: 4727.13 ms
bottom-js: 9132.84 ms
```
