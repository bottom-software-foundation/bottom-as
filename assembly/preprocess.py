# Credits to: https://github.com/merlinfuchs/bottom-py

from collections import OrderedDict
from pathlib import Path

CHARACTER_VALUES = OrderedDict([
    (200, "🫂"),
    (50, "💖"),
    (10, "✨"),
    (5, "🥺"),
    (1, ","),
    (0, "❤️")
])

SECTION_SEPERATOR = '👉👈'

header_declarations = ',\n\t'.join(
    [f'_{x} = "{y}"' for x, y in CHARACTER_VALUES.items()]
)

valueToChar_macro = ';\n'.join(
    [f'valueToChar.set({x}, "{y}")' for x, y in CHARACTER_VALUES.items()]
)

header = f"""// File generated with preprocess.py

export const {header_declarations};

export const values: u8[] = [{', '.join(map(str, CHARACTER_VALUES.keys()))}];

export const valueToChar: Map<u8, string> = new Map();
{valueToChar_macro}
"""


def get_length(s):
    return len((s + SECTION_SEPERATOR).encode("utf-16")) - 2


path = (Path(__file__).parent / "macro.ts").resolve()
with open(path, "w+", encoding="utf-8") as outf:
    outf.write(header)

    first = CHARACTER_VALUES[0]
    bottomLookup = [f'"{first}"']
    bottomLookupLength = [get_length(first)]

    for i in range(1, 256):
        out = ""

        char = i
        while char != 0:
            for value, emoji in CHARACTER_VALUES.items():
                if char >= value:
                    char -= value
                    out += emoji
                    break

        bottomLookup.append(f'"{out}"')
        bottomLookupLength.append(get_length(out))

    bottomLookupLength = map(str, bottomLookupLength)
    outf.write(
        "export const bottomLookup: string[] = [\n\t{}\n];\n\nexport const bottomLookupLength: u8[] = [\n\t{}\n];".format(', \n\t'.join(bottomLookup), ', \n\t'.join(bottomLookupLength)))
