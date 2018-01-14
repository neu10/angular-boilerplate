# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

IRelief client facing web app through which the user can access and book Ambulance Services, blood bank services and home care services.

**Quick summary of architecture**

Front End: Angular4, WebSocket client, Pug, SASS, MaterializeCSS as the scss library
Server: NodeJS, ExpressJS, SocketIO, redis-client(for session management and cache)

**Version**

1.0

**How do I get set up?**

**Pre-requisites**

NodeJS: Download from https://nodejs.org/en/download/
Redis-server: Download from https://redis.io/download. Follow the documentation on the website to start up redis-server on port 6379

**Summary of set up**

Install SourceTree as version control UI
Clone the repo using source tree
Open up your command prompt
Navigate to the directory where you have cloned the project
Type npm install and wait for all the magic to happen. If all is well, you should see a tree structure with all the dependancies installed. If you see any dependancy not installed try installing it manually.

Eg: if node-sass fails, first try the command npm rebuild node-sass. If it fails again, hit npm install node-sass -g

Once you have all setup, hit nodemon server
This will start up the app at http://localhost:3000 or localhost:3000
As of today, you should be able to see a blue screen with the message 'Angular App Loaded'. 
Open up your console. 
You should be able to see a Response Object which is requested by the client to the node server through web-sockets, executed at the node layer using the Request Object and the response is transmitted back to the Angular layer using web-sockets



### Contribution guidelines ###

**Code review**

When you review a code, pull down the branch of the Pull Request.
Run npm run start.
This will first trigger the eslint to do its linting. Watch out for any linting errors.
If all is good, look at the functionality that the PR description talks about

**Other guidelines**

Make sure to branch out of Develop and develop on your own personal branches
When you are done with your changes, push them up on your branch. Pull develop on your branch and raise a Pull Request to Develop.
No code shall be merged without 1 review. 
The branch author cannot merge his own branch

**Who do I talk to?**

* Ritwik Banerjee (ritwik2011@gmail.com)

**Repo owner or admin**

* Ritwik Banerjee (ritwik2011@gmail.com)
* Ritesh Ranjan (ritesrnjn@gmail.com)