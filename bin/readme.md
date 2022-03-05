# Binaries and scripts

## Hosted version

If you don't want to install the app, you can try it using the website [eslintme.simonloir.be](https://eslintme.simonloir.be).

## Understanding the directories

You can find three sub-directories in this directory :

-   The [app](app) directory contains the mac os (darwin) and windows version of the app. The binary version allows the user to upload an entire folder whereas the web version only allows the upload of files.

-   The [web](web) directory contains HTML, CSS and JS files for the "website version" of the app.

    This version **MUST** be served on a proper web server. Opening the html file in a browser won't let you run the program (you will get an html file without css and without js).

-   The [htaccess](htaccess) directory contains a .htaccess file that can be used on an apache server. It allows url rewriting for the [model].html page. If you run this project on an nginx website, you might want to reproduce those redirections in your config file.
