# jsRUNpy - use Brython to run any Python code with JS
* returns promise that is resolved when the code finishes
* if the Python code returns something, it gets set as the promise's value
* allows you to pass dictionary of varibles that can be used by the python script

## Warnings
* ⚠ **All of the Brython code is owned by the authors of** [<img src="https://camo.githubusercontent.com/b079fe922f00c4b86f1b724fbc2e8141c468794ce8adbc9b7456e5e1ad09c622/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6769746875622e737667" alt="gh" width="18"/>](https://github.com/brython-dev/brython) **[brython-dev/brython](https://github.com/brython-dev/brython)** **and i have no intention to misuse the code** ⚠
* ⚠ **This package is 1MB - 4MB (depending on [File chooser](#file-chooser)) in size,** **not recommended for production** ⚠
* This package is used standalone, all dependencies are included
* Not tested concurrently with Brython
* Use at your own risk, bugs may be present!

## Installation
#### 1. Find your file in **[File chooser](#file-chooser)** below and click on it's name

#### 2. Was the step 1 too confusing?
* Just add
```html
<script src="https://cdn.jsdelivr.net/gh/MP3Martin/jsRUNpy.js@1/jsRUNpy.min.js"></script>
```
*  in your `<head>` tags

## File chooser
Click on the file's name and read what the page says
1. <b><code><a href="https://parse.mp3martin.xyz/?url=Add+this+to+your+%27amp%27lt%27semi%27head%27amp%27gt%27semi%27+tags:%3Cbr%2F%3E%3Cspan+style%3D%27color:%20%23000000c7%27%3E%3Ccode%3E%27amp%27lt%27semi%27script+src%3D%22https:%2F%2Fcdn.jsdelivr.net%2Fgh%2FMP3Martin%2FjsRUNpy.js%401%2F%7B1%7D%22%27amp%27gt%27semi%27%27amp%27lt%27semi%27%2Fscript%27amp%27gt%27semi%27%3C%2Fcode%3E%3C%2Fspan%3E&placeholder=1,jsRUNpy.js&type=display">jsRUNpy.js</a></code></b> - uncompressed file, nearly 4MB, <ins>not recommended</ins>

2. <b><code><a href="https://parse.mp3martin.xyz/?url=Add+this+to+your+%27amp%27lt%27semi%27head%27amp%27gt%27semi%27+tags:%3Cbr%2F%3E%3Cspan+style%3D%27color:%20%23000000c7%27%3E%3Ccode%3E%27amp%27lt%27semi%27script+src%3D%22https:%2F%2Fcdn.jsdelivr.net%2Fgh%2FMP3Martin%2FjsRUNpy.js%401%2F%7B1%7D%22%27amp%27gt%27semi%27%27amp%27lt%27semi%27%2Fscript%27amp%27gt%27semi%27%3C%2Fcode%3E%3C%2Fspan%3E&placeholder=1,jsRUNpy.min.js&type=display">jsRUNpy.min.js</a></code></b> - compressed file, nearly 4MB, ✅<ins>**recommended**</ins>✅, *(not located in this repo, it is automatically generated using [jsDelivr](https://www.jsdelivr.com/))* 

3. <b><code><a href="https://parse.mp3martin.xyz/?url=Add+this+to+your+%27amp%27lt%27semi%27head%27amp%27gt%27semi%27+tags:%3Cbr%2F%3E%3Cspan+style%3D%27color:%20%23000000c7%27%3E%3Ccode%3E%27amp%27lt%27semi%27script+src%3D%22https:%2F%2Fcdn.jsdelivr.net%2Fgh%2FMP3Martin%2FjsRUNpy.js%401%2F%7B1%7D%22%27amp%27gt%27semi%27%27amp%27lt%27semi%27%2Fscript%27amp%27gt%27semi%27%3C%2Fcode%3E%3C%2Fspan%3E&placeholder=1,jsRUNpy.min.extreme.js&type=display">jsRUNpy.min.extreme.js</a></code></b> - extremely compressed file using [<img src="https://camo.githubusercontent.com/b079fe922f00c4b86f1b724fbc2e8141c468794ce8adbc9b7456e5e1ad09c622/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6769746875622e737667" alt="gh" width="18"/>](https://github.com/brython-dev/brython) **[streamich/crunchme](https://github.com/streamich/crunchme)**, nearly 1MB, not recommended, ¼ size of the recommended file, but can <ins>lag your browser</ins> for a few seconds (depending on the hardware)

## Fully working example
* can be found [here](https://codesandbox.io/s/github/MP3Martin/jsRUNpy.js/tree/main/examples/example-multiply?file=/index.html), source [here](https://github.com/MP3Martin/jsRUNpy.js/blob/main/examples/example-multiply/index.html)

## Functions

|Emoji|Meaning|
|--|--|
|✅|Mandatory argument|
|🟨|Optional argument|

* ### **`jsRUNpy.run()`**
  * **`jsRUNpy.run(`** ✅**code**: *string* **`,`** 🟨**variables**: *object* **`)`**

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

> is same as

> ```js
> (async () => {
>    out = await jsRUNpy.run("return 33 + 77")
>    console.log("Python code outputted: " + out)
> })()
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

> and is same as

> ```js
> for (i = 1; i <= 2; i++) {
>   jsRUNpy.run("print(i)", {i: i})
> }
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

---

> ```js
> for (i = 0; i <= 10; i++) {
>   jsRUNpy.run("print(i)", {i: i})
> }
> ```
