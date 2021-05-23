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
bottom-as: 0.91 ms
bottom-js: 3.98 ms

50000 encodes:
------------
bottom-as: 324.50 ms
bottom-js: 1931.11 ms

200000 encodes:
------------
bottom-as: 1342.78 ms
bottom-js: 6928.79 ms

100 decodes:
------------
bottom-as: 2.90 ms
bottom-js: 5.03 ms

50000 decodes:
------------
bottom-as: 1399.36 ms
bottom-js: 2146.35 ms

200000 decodes:
------------
bottom-as: 5473.01 ms
bottom-js: 8820.66 ms
```
