# jsRUNpy - use Brython to run any Python code with JS
* returns promise that is resolved when the code finishes
* if the Python code returns something, it gets set as the promise's value
* allows you to pass dictionary of varibles that can be used by the python script

## Warnings
* ⚠ All of the Brython code is owned by the authors of [<img src="https://camo.githubusercontent.com/b079fe922f00c4b86f1b724fbc2e8141c468794ce8adbc9b7456e5e1ad09c622/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6769746875622e737667" alt="gh" width="18"/>](https://github.com/brython-dev/brython) **[brython-dev/brython](https://github.com/brython-dev/brython)** and i have no intention to misuse the code ⚠
* **[jsRUNpy](https://downgit.github.io/#/home?url=https://github.com/MP3Martin/jsRUNpy.js/blob/main/jsRUNpy.js)** is used standalone, all dependencies are included
* Use at your own risk, bugs may be present!

## Installation
1. Add **🠇** inside `<head>` tags in your html file
```html
<script src="https://cdn.jsdelivr.net/gh/MP3Martin/jsRUNpy.js@1/jsRUNpy.min.js"></script>
```

## Fully working example
* can be found [here](https://codesandbox.io/s/github/MP3Martin/jsRUNpy.js/tree/main/examples/example-multiply?file=/index.html), source [here](https://github.com/MP3Martin/jsRUNpy.js/blob/main/examples/example-multiply/index.html)

## Usage / examples
> ```js
> jsRUNpy.run("print(test)", {test: "Hello World!"}) 
> ```

> is same as

> ```js
> jsRUNpy.run("print('Hello World!')") 
> ```

---

> ```js
> jsRUNpy.run("return 33 + 77").then(out => {console.log("Python code outputted: " + out)})
> ```

---

> ```js
> jsRUNpy.run(`
> print(1)
> print(2)
> `)
> ```

> is same as

> ```js
> jsRUNpy.run("print(1)\nprint(2)")
> ```

---

> ```js
> test = "Hello!"
> 
> jsRUNpy.run(`
> from browser import window
> window["test"] = "Hi!"
> `).then(()=>{console.log(test)})
> ```
