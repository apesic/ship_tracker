Ship Tracker
============

https://shiptracker.herokuapp.com

This is a simpile web app made to demonstrate realtime maritime ship tracking using the Fleetmon API (http://www.fleetmon.com/my/api/info). 

Ships currently in the tracking list will be plotted on the map, and new ships can be added by searching by their IMO Number. Search by ship name and MMSI number are in the works.

Built with a Rails backend, using PostgreSQL for database.

To setup locally, clone the repo, `bundle` to install gems, and add your Fleetmon API key to your env:

```
export FLEETMON_API_KEY="your_api_key_here"
```

You can then follow the usual Rails procedure:

```
rake db:setup
rails s
```
