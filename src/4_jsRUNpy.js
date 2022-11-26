/* --- jsRUNpy.js begins ↓ --- */

window.jsRUNpy = {
  $utils: {
    tabWholeString: function (string) {
      tab = '    ';
      mystring = string.replaceAll('\n', '\n' + tab);
      mystring = tab + mystring;
      return mystring;
    },

    setElementsAttribute: function (elements, attr) {
      try {
        for (el of elements) {
          // console.log(el)
          el.setAttribute(attr[0], attr[1]);
        }
      } catch (e) {
        if (e.name == 'TypeError') {
          elements.setAttribute(attr[0], attr[1]);
        }
      }
    },

    removeElements: function (elements) {
      try {
        for (el of elements) {
          // console.log(el)
          el.remove();
        }
      } catch (e) {
        if (e.name == 'TypeError') {
          elements.remove();
        }
      }
    },

    createDeferredPromise: function () {
      // Function made by https://stackoverflow.com/users/5776910/rico-kahler @ https://stackoverflow.com/a/47112177/10518428
      let resolve;
      let reject;

      const promise = new Promise((thisResolve, thisReject) => {
        resolve = thisResolve;
        reject = thisReject;
      });

      return Object.assign(promise, { resolve, reject });
    },

    delete_var: function (variable, delay = 0) {
      setTimeout(function () {
        try {
          // eslint-disable-next-line no-delete-var
          eval('delete ' + variable);
        } catch (e) {
          // eslint-disable-next-line no-delete-var
          eval('delete p' + variable);
        }
      }, delay);
    }
  },

  $runners: {
    warning: 'PLEASE DO NOT TOUCH THIS'
  },

  config: {
    br_config: { indexedDB: false }
  }
};

window.jsRUNpy.$sysRun = async function (code, variables) {
  try {
    code = code.replace(/"[^"]*(?:""[^"]*)*"/g, function (m) { return m.replace(/\n/g, '\\\n'); }); // replace all newline characters in a string with \\\n
  } catch (e) {}

  runconsole_scripts = __BRYTHON__.parser._run_scripts;

  function check_all_old_brython () {
    jsRUNpy.$utils.setElementsAttribute(document.querySelectorAll("script[type='text/python']"), ['type', 'text/python/old']);
  }

  function add_new_script (text) {
    newScript = document.createElement('script');
    newScript.setAttribute('type', 'text/python');
    newScript.textContent = text;
    document.body.appendChild(newScript);
  }

  function remove_all_new_brython_scripts () {
    jsRUNpy.$utils.removeElements(document.querySelectorAll("script[type='text/python']"));
  }

  function uncheck_all_old_brython () {
    jsRUNpy.$utils.setElementsAttribute(document.querySelectorAll("script[type='text/python/old']"), ['type', 'text/python']);
  }

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function my_reject (id, err) {
    setTimeout(() => {
      window.jsRUNpy.$utils.delete_var(`window.jsRUNpy['$runners']['p' + ${id}]`);
    }, 300);
    return window.jsRUNpy.$runners['p' + id].promise.reject(err);
  }

  async function run_exec (code) {
    brython(jsRUNpy.config.br_config);

    // uniqueID = Math.floor(((Date.now() * Math.floor(Math.random() * 1000)) + Math.floor(Math.random() * 10) + 1)/2).toString()
    uniqueID = 'e' + String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');

    check_all_old_brython();

    // window.jsRUNpy.$runners["p" + uniqueID] = uniqueID
    window.jsRUNpy.$runners['p' + uniqueID] = {};
    window.jsRUNpy.$runners['p' + uniqueID].promise = jsRUNpy.$utils.createDeferredPromise();

    window.jsRUNpy.$runners['p' + uniqueID].vars = variables;

    varImports = '';

    for (const [key, value] of Object.entries(window.jsRUNpy.$runners['p' + uniqueID].vars)) {
      varImports += `${key} = thisVars["${key}"]\n`;
      if (key.match(/^\d/)) {
        // key starts with a number
        my_reject(uniqueID, `Error: Variable name in 'variables' argument can't start with a number! (${key})`);
      }
    }

    modifiedCode = code;
    modifiedCode = jsRUNpy.$utils.tabWholeString(modifiedCode);
    modifiedCode =
      `
import sys
from browser import window

thisRunner = window.jsRUNpy["$runners"].p${uniqueID}.promise
thisVars = window.jsRUNpy["$runners"].p${uniqueID}.vars

code = """${varImports}def main():\n${modifiedCode.replaceAll('"""', '\\"""')}\n"""

try:
  exec(code)
  L${uniqueID}L = main()
except Exception as e:
  window.jsRUNpy["$utils"].delete_var("window.jsRUNpy['$runners']['p' + '${uniqueID}']")
  thisRunner.reject(f"{type(e).__name__}: {e}")
else:
  window.jsRUNpy["$utils"].delete_var("window.jsRUNpy['$runners']['p' + '${uniqueID}']", 200)
  thisRunner.resolve(L${uniqueID}L)`;

    // console.log(modifiedCode)

    add_new_script(modifiedCode);

    if (!(__BRYTHON__.isWebWorker || __BRYTHON__.isNode)) {
      await sleep(0.001);
      await runconsole_scripts(jsRUNpy.config.br_config);
      await sleep(0.001);
    }

    remove_all_new_brython_scripts();
    uncheck_all_old_brython();

    // return window.jsRUNpy.$runners["p" + uniqueID]
    return window.jsRUNpy.$runners['p' + uniqueID].promise;
  }

  return await run_exec(code);
};

window.jsRUNpy.$sysRunQueue = (() => {
  // We can use the run() function in synchronous functions thanks to https://stackoverflow.com/users/351705/yury-tarabanko @ https://stackoverflow.com/a/53540586/10518428 ♥

  let pending = Promise.resolve();

  run = async (...args) => {
    try {
      await pending;
    } finally {
      return await window.jsRUNpy.$sysRun(...args);
    }
  };

  // update pending promise so that next task could await for it
  return (...args) => (pending = run(...args));
})();

window.jsRUNpy.run = async function (code, variables = {}) {
  return new Promise(function (resolve, reject) {
    // type checking
    if (typeof code !== 'string') {
      return reject("Error: 'code' argument must be a string!");
    }
    if (Object.prototype.toString.call(variables) !== '[object Object]') {
      return reject("Error: 'variables' argument must be a dictionary (object)!");
    }
    // end of type checking

    return resolve(window.jsRUNpy.$sysRunQueue(code, variables));
  });
};

