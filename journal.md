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
    * git push origin master  
    * git commit -am "message"  
    * git log  

###11/27/2015   
- Added php server to gulpfile   
Don't forget detached process in spawn and stdio configuration (see links)   
- Final design with foundation  
    * Title bar : http://foundation.zurb.com/sites/docs/off-canvas.html#title-bar  
    * Buttons, Callout, Icons, Off-canvas  
- Markdown nested list : indent four spaces    
- Add minify html to gulp to strip comments in html files   
We need to redistribute all folders!  
- Finish business logic, all CRUD operations  
    * Add  
- Add tag to git repository   
https://git-scm.com/book/en/v2/Git-Basics-Tagging  
    git tag  
- Add autofocus attribute and tabindex="number"

Todo:   
    * Add function: validate if is empty the input field, clean input before
    * Update function: Highlight the element updating, update buttons values
    * Style: Add margin from the left to the list
    * When search and delete the list is the same and can delete other elements not showing

### 11/28/2015  
Lets make some directives ;)

### 11/29/2015
$templateCache not need to declare it usign gulp-templateCache, it makes a module templates that have a run method. 
Remember that in config method the service $templateCache is not declared (whatever services)
