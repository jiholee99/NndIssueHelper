// Unicode offset maps
const unicodeStyles = {
  bold: {
    A: 0x1d400,
    a: 0x1d41a,
  },
  italic: {
    A: 0x1d434,
    a: 0x1d44e,
  },
  script: {
    A: 0x1d49c,
    a: 0x1d4b6,
  },
  monospace: {
    A: 0x1d670,
    a: 0x1d68a,
  },
};

// Convert function
function toUnicodeStyle(text, style) {
  const offsets = unicodeStyles[style];
  if (!offsets) return text;

  return [...text]
    .map((char) => {
      const code = char.charCodeAt(0);

      // A-Z
      if (code >= 65 && code <= 90) {
        return String.fromCodePoint(offsets.A + (code - 65));
      }

      // a-z
      if (code >= 97 && code <= 122) {
        return String.fromCodePoint(offsets.a + (code - 97));
      }

      // leave numbers/symbols unchanged
      return char;
    })
    .join("");
}


class TextToUnicodeConverter {
    titleConverter = (title) => {
        // make title like this ⚠️⟨𝗗𝗼𝘄𝗻𝘁𝗶𝗺𝗲 𝗶𝘀𝘀𝘂𝗲⟩⚠️
        return `⚠️${toUnicodeStyle(title, 'monospace')}⚠️`;
    }

    issueConverter = (issue) => {
        // make issue like this ⏱️⟨2023-10-01T10:00:00Z⟩⏱️
        return `\n⟶ ${issue}`;
    }
}

export default new TextToUnicodeConverter();