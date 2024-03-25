# Misc notes
Unfortuantely, it looks like The Audio Database has a more limited free API than this assignment expected; as its search functionality is now limited to only return "Coldplay". I've build the app out despite this, but the search functionality is heavily limited.

Both tasks have docker containers set up to run the app, I highly recommend using them instead of running the page/app directly.

## Table of Contents
1. [Question Answers](#question-answers)
2. [Tasks](#tasks)
    1. [Task 1 - Quickly clone a page](#task-1---quickly-clone-a-page)
    2. [Task 2 - Build a music search app](#task-2---build-a-music-search-app)

# Question Answers
1. What are some ways to make websites faster? (Name as many different techniques as you can)
    * Minify/bundle CSS and JS files
    * Shrink and compress images
    * Use a CDN to host static files on the edge
      * Nuxt.js and Next.js have built-in support to bundle, minify, and build for production on the edge
    * Ensure that you are using modern HTTP performance upgrades
      * HTTP/2 speeds up website loading, as well as heavily improving communication between the server and client
      * HTTP/3 is not as widely adopted, but uses UDP and QUIC to massively speed up communication
      * Many backends support gzip or brotli compression to speed up the transfer of data
    * Enable caching
      * Many servers are set up behind a reverse proxy like Nginx, ensuring that it terminates SSL, caches requests, and handles load balancing will improve server response time
      * Even when running outside of a reverse proxy, most servers have middleware support or direct support for caching plugins via Redis or something similar
    * Async scripts defer calculations until after the page has loaded, which can sometimes result in heavy performance improvements
    * Preloading assets can speed up loading speeds once a user has landed and is interacting with the page
    * Use lazy loading of assets like images or videos (especially anything not served by you)
    * Optimize your CSS (especially animations). This topic is large enough to write papers on (in fact, there are books on the topic) but I've put some obvious ones below.
        * Avoid "heavy" selectors (like selectors that require traversing the DOM conditionally for every element or each element of a type)
        * Avoid using `!important` as it can cause some browsers to recalculate styles (though browsers are getting better with this one)
        * Use Javascript animations instead of CSS animations for animations that involve complex movement, resizing... really anything that isn't a translation
    * And really just make sure your backend is smart with any API requests, basic caching, good database hygiene, and so on.
2. When would you use a NoSQL solution instead of SQL?
    * When a traditional RDBMS wouldn't easily or efficiently handle the data structure. For example:
      * Heavily nested data structures (Mongo is optimized for this)
      * Spatial data, like geolocations (PostgreSQL has some support for this, but vector databases are an increasingly helpful option)
    * When your use-case doesn't fit in traditional RDBMS constraints. For example:
      * You need Availability and Partition Tolerance over Consistency, under the CAP theorem (Cassandra is built for this)
      * You need response times to be as low as possible, and don't mind a lack of query flexibility (Redis is built for this)
    * When you need to query the data in a way that most RDBMs aren't optimized for. For example:
      * You need to apply a similarity search (Vector databases are optimized around this)
3. What type of experience have you had working with e-commerce sites?
    * I've worked with WooCommerce, though it has been a little while.
    * Most of my experience has been around integrating with CRMs for leads-as-sales, and building out custom solutions for unique CRMs. (as well as supporting the leads and sales pipelines)

# Tasks
## Task 1 - Quickly clone a page
There is a readme in the [page_clone directory](./page_clone/) explaining my process, and how to run locally.

## Task 2 - Build a music search app
There is a readme in the [simple_app directory](./simple_app/) explaining how to run the app.

