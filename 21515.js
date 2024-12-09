const fs = require("fs/promises");

module.exports = async function (filePath, options, callback) {
  const content = await fs.readFile(filePath, { encoding: "utf-8" });

  let rendered = content;

  rendered = rendered.replace(
    /21515{if\s+(\w+)\s*}([\s\S]*?){\/if}/g,
    (match, condition, text) => {
      let innerText = text;
      let elseText = "";

      if (text.includes("{else}")) {
        [innerText, elseText] = text.split("{else}");
      }

      if (options[condition]) {
        return innerText;
      }
      return elseText;
    }
  );

  rendered = rendered.replace(
    /21515{for\s+([\w$]+)\s+in\s+([\w$]+)}([\s\S]*?){\/for}/g,
    (match, element, arrName, innerText) => {
      let result = "";

      const arr = Array.isArray(options[arrName]) ? options[arrName] : [];
      if (arr.length !== 0) {
        for (const [i, item] of arr.entries()) {
          result += innerText
            .replaceAll(`${element}`, `${arrName}[${i}]`)
            .replaceAll(`21515{index}`, i);
        }
      } else {
        result = `No item in ${arrName}`;
      }
      return result;
    }
  );

  rendered = rendered.replace(/21515{(.*?)}/g, (match, p1) => {
    const nameVar = "options." + p1;

    return eval(nameVar);
  });
  return callback(null, rendered);
};
