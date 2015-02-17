# Simple Node Framework


##API
```js
var framework = require('./framework');
```

## Framework Methods

#### framework.start(port)

Starts server on the passed in port. Checks fileDestinations on start. Will
throw an error if there is no fileDestination set for a given route.

#### framework.setFileDestination(route, directory)

Sets the destination for saved JSON files of a given route (route) as the
 passed in string (directory). Will create directory if passed in one doesn't
 exist.

#### framework.get(path, callback)

Creates a route for incoming GET requests at the passed in URL, 
the callback takes two arguements: request and response.

#### framework.post(path, callback)

Creates a route for incoming POST requests at the passed in URL, 
the callback takes two arguements: request and response.

#### framework.put(path, callback)

Creates a route for incoming PUT requests at the passed in URL, 
the callback takes two arguements: request and response.

#### framework.patch(path, callback)

Creates a route for incoming PATCH requests at the passed in URL, 
the callback takes two arguements: request and response.

#### framework.del(path, callback)

Creates a route for incoming DELETE requests at the passed in URL, 
the callback takes two arguements: request and response.

## Path Methods

### All paths

#### response.setStatus(number)

Sets the response status to the passed in number.

#### response.setContent(string)

Sets the response content type to the passed in string

### Get path methods

#### response.send(request)

If there are params passing in the request will send back the requested
file. If there are no params it will send back the fileDestination for
the passed in request. If a string is passed it will send back that request.
No arguments will send back the string 'request received'.

### Post path methods

####response.save(request)

Saves the JSON send with the post request to a new JSON file in the
directory designated with framework.setFileDestination(). Sends back the
saved JSON with the response.

### Put path methods

####response.save(request)

Replaces the JSON file named (name passed in as a parameter) with the
sent JSON. It will return an error if the file doesn't exist. Sends back
the updated JSON with the response.

### Patch path methods

####response.save(request)

Updates the information in the JSON file named (name passed in as a
parameter) with the sent JSON. It will return an error if the file doesn't
exist. Sends back the updated JSON with the response.

### Delete path methods

####response.remove(request)

Removes the named JSON file (name passed in as a parameter) with the sent JSON.
Sends back the the file name with a confirmation message if deleted. Will send back
an error if file doesn't exist.


##Example

```js
var framework = require('./framework');

framework.get('/user', function(request, response){
  response.setStatus(404);
  response.setContent('text/plain');
  response.send('sending an error just to mess with you');
//a GET request to localhost:3000/user will return an error to mess with
//your head.
});

framework.post('/user', function(request, response){
  response.save(request);
//a PUT request to localhost:3000/user containing {"Hulk":"Hogan"}
//will be saved in './fake_data_base' as 1.json
});

framework.put('/user', function(request, response){
  response.save(request);
//a PUT request to localhost:3000/user/1 with {"MachoMan":"RandySavage"} will
//overwrite 1.json
});

framework.patch('/user', function(request, response){
  response.save(request);
//a PATCH request to localhost:3000/user/1 with {"snapsInto":"SlimJim"} will
//save to 1.json as {"MachoMan":"RandySavage","snapsInto":"SlimJim"}
});

framework.del('/user', function(request, response){
  response.remove(request);
//a DELETE request to localhost:3000/user/1 will remove 1.json. And send back
//'1.json successfully deleted'
});

framework.setFileDestination('./fake_data_base');

framework.start(3000)
```