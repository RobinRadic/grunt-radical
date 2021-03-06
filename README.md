# grunt-radical
Several grunt tasks for use in my projects.


### javascript documenation/github pages generation
  
##### radic_jsdoc
Generates jsdoc with front-matter prefixed using custom template/style
- radic_jsdoc grunt task execs jsdoc generate
- jsdoc parses front-matter into processed-front-matter.yml and generates the documentation with the processed front-matter prefixed in every file
  
  
##### radic_jsdoc_mdpages
prepending specified md files with processed-front-matter that was generated by radic_jsdoc and moves it to defined location in docs folder
  
  
##### radic_jsdoc_coverage
generates istanbul test coverage using custom template/style
  
  
##### radic_jsdoc_readme
writes the projects README.md to index.md in the docs folder, prepending the processed-front-matter and altering the GFM highlight code blocks to match github pages/jekyll. 
  
  
##### radic_ghpages_publish
adds, commits and pushes the docs folder to the remote ghpages branch


### Node/Website project tasks
  
##### radic_publish
Publishes the project. Asks for path, minor or major version change and makes it happen. if configured, it could:
- update package.json version
- update bower.json version, synced with package.json version
- tag the version
- add, commit and push. master&tag


##### radic_jqwidget
Builds jquery widgets/plugins using personal prefferences. If configured, it could do:
- concat all javascript files belonging to the widget
- compile handlebars templates, prepending em to the concatted output file
- create a seperate minified version
- preprocess sass styles to css

##### radic_preview
Generates a preview/demo/test website including specified scripts and styles.
  
  
##### radic_demo_ghpages
Generates a demonstration website for github project page.
