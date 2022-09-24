# jsRUNpy - use Brython to run any Python code with JS
* returns promise that is resolved when the code finishes
* if the Python code returns something, it gets set as the promise's value
* allows you to pass dictionary of varibles that can be used by the python script

## Warnings
* ⚠ All of the Brython code is owned by the authors of **[brython-dev/brython](https://github.com/brython-dev/brython)** and i have no intention to misuse the code ⚠
* **[jsRUNpy](https://downgit.github.io/#/home?url=https://github.com/MP3Martin/jsRUNpy.js/blob/main/jsRUNpy.js)** is used standalone, all dependencies are included
* Use at your own risk, bugs may be present!

## Installation
1. Add ↓ inside head in your html file
```html
<script src="https://cdn.jsdelivr.net/gh/MP3Martin/jsRUNpy.js@latest/jsRUNpy.min.js"></script>
```
