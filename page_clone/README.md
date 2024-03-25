# Task 1 - Page Clone
## Running the page
### Directly
The page can be run by opening the `index.html` file in a browser.
### Docker
A docker container is included in this repository for convenience. To run the page in a container, run the following commands from the project root:
```bash
cd ./page_clone &&
docker-compose up
```
The page will then be available at [localhost:8080](http://localhost:8080).
## Methodology
I've broken up the steps taken to complete this task below.
### Trim scripts
To mitigate errors, authentication issues, and unnecessary tracking, I removed all scripts that were not necessary for the page to function. This included:
* Google Analytics
* TikTok Analytics
* Insta[gram] Page Metrics
* Facebook Pixel
* MS Clarity
* Local Platform Challenge

Facebook Pixel was blocked by my browser's refusal of cross-domain cookies; I instead checked the console for any failing scripts to quickly find that one.

Most of these script were simply tracking and dynamic replacement scripts that weren't needed on a static page, however, the local platform challenge appeared to be a non-tracking script designed to alter the page for certain user agents. Removing this could remove functionality-- but is required to decouple the page from its server.

There is also a shopify non-tracking script that I removed, since a page clone should presumably not send requests to domain-specific endpoints. <br> <br>
However, the "Shopify Snowplow" (script id="ip-analytics") script could not be removed even though it likely should be. It is used to pull images and offers into the page, but it also includes a tracking tag which should be removed if possible.


I was content with removing 


### Additional considerations

#### Metadata
Certain metadata in the HTML should be changed to reflect the page's new location, once the location is determined. 

Specifically: 
* The Open Graph tags should be updated to reflect the new URL.
* The canonical URL should be updated to reflect the new URL. (mainly for robots)


#### Shopify
A new Shopify account and endpoint should be set up for this page to link to.

Currently, the page still links back to the original Shopify account, which is not ideal for a page clone.

#### CDN
Currently, images and other assets are being pulled from a CDN, next steps would involve simply downloading the assets locally (which I did not do to avoid legal concerns in this repository).
Next steps would involve hosting these assets locally, or on a new CDN.