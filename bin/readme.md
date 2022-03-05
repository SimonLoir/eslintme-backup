# Binaries and scripts

You can find three sub-directories in this directory :

-   The [app](app) directory contains the mac os (darwin) and windows version of the app. The binary version allows the user to upload an entire folder whereas the web version only allows the upload of files.

-   The [web](web) directory contains HTML, CSS and JS files for the "website version" of the app.

-   The [htaccess](htaccess) directory contains a .htaccess file that can be used on an apache server. It allows url rewriting for the [model].html page. If you run this project on an nginx website, you might want to reproduce those redirections in your config file.
