<h1>Project 2: Gig Tonight?</h1>

<h2> Live Events Planning consuming Google Maps and Skiddle API's</h2>

Gig Tonight? Is a live event platform that shows all of the live music events in London for the upcoming week that currently have tickets available for purchase. It fills a niche where you can immediately see and purchase tickets for events, plotted on a map, and are insured there is still tickets available. There is a much faster user journey than competitors, as you would usually have to input a set of dates and then navigate to the event page before determining if there are tickets still available for an upcoming event. This app takes some of the length out of that process and shows the user local events.

It can be viewed here:
[Gig Tonight?](https://damp-oasis-81794.herokuapp.com/register)

api
---------
Both the Google Maps API and the Skiddle API were consumed in the project.

Brief
--------
The brief was to create an express app with RESTful routes and at least two models. On top of this you had t include at least one API.

Technologies used
------------
NodeJS
Javescript
Jquery
HTML5
CSS3
SCSS
JSON
Gulp
Bootstrap
Mongo

Design
--------
I designed the site to minimise user journeys. The user can quickly log in an access the Map page, showing them all of the events happing in relation to their position on the map. The Site uses the Bootstrap grid framework for position and allowing the site to be responsive on tablets, mobiles and small screen sizes.

Implementation  
--------------
The MVP involved just getting the data from the Skiddle API to appear on the map, along with a log in and registration page and a landing page. This required only one model. However, after achieving MVP I implemented a way for users to save events for later on to their profile page. This involved a second nested events model. Geolocation was also added after this point.

I originally intended to only show events for the current day. This provided unfeasible however as there were too few events happening that also had tickets available through Skiddle. The scope was then moved to one week.

Challenges
-----------
Consuming the Skiddle API took some time to mine for the correct data.
I used a hidden form on the map page that took the API data and submitted the form to the users profile page. This would then show and save the event information.

Extra features to include
-------------------------
Consume as many event APIs as possible to extend the breadth of events available to the user.
Compare events from multiple APIs to only show the cheapest option.
Implement a mobile app that takes a users login and shows the map as the landing page, for the most optimum and simple user journey.
