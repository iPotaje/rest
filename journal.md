## Journal

###11/25/2015
- Started the project

###11/26/2015
- Separated journal and list of links from the readme.md
- bundle.js is too big, lets try to use minimal foundation

browserify-shim and using foundation.core and foundation.offcanvas do the trick   

Finally used browserify-shim in package.json like this:
  "browserify-shim": {
    "jquery" : { "exports": "global:$" },
    "angular" : { "exports": "global:angular" },
    "foundation" : {"exports" : "global:foundation"}   

Imported from a cdn ... or from a local folder

- Started to use mapsource, watch errors without them is impossible   
- Markdown: Force a new line -> make two space before new line ;)
- Git commands:
git push origin master
git commit -am "message"
git log

###11/27/2015   
- Added php server to gulpfile   
Don't forget detached process in spawn and stdio configuration (see links)
