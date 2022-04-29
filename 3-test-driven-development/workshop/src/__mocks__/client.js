const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM(`...`).window;

/* global.document = jest.fn(() => {
  return {
    ...document,

    querySelector: () => {
      return {
        innerHTML: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center"><img src="./src/assets/explode.gif" style="width: 500px;" /> <h1>${this.status}!</h1> <button class="btn" id="replay">Play again</button></div>`,
      };
    },
  };
});
 */

global.document = document;
