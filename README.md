# Simple Node Framework


##API
```js
var framework = require('./framework');
```

## Framework Methods

#### framework.start(port)

Starts server on the passed in port.

#### framework.setFileDestination(directory)

Sets the destination for saved JSON files as the passed in string.
Defaults to root relative to framework module.

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

#### response.send(string)

Sends the response with a default status of 200 and Content-Type
text/plain

#### response.setStatus(number)

Sets the response status to the passed in number.

#### response.setContent(string)

Sets the response content type to the passed in string

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

####response.remove(string)

Removes the named JSON file (name passed in as a parameter) with the sent JSON.
Sends back the passed in string with the response.


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

framework.del('/user'. function(request, response){
  response.remove('file deleted');
//a DELETE request to localhost:3000/user/1 will remove 1.json. And send back
//'file deleted'
});

framework.setFileDestination('./fake_data_base');

framework.start(3000)
```