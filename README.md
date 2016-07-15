# GO AI

[![Build Status](https://travis-ci.org/sdiemert/goai.svg?branch=master)](https://travis-ci.org/sdiemert/goai) <br>

A simple GO AI web service. 

This application is meant to provide an external web service that students in UVic's SENG 299 class can program against for their term project.

Given the current board state and last move made the AIs in this web service will return a next move. 

At this point, AIs are state-less, they do not store a history of requests. 
 
## Use

Each HTTP route is serviced by a different AI or Util. The current routes are: 
  
* `/` : Default route, echos the request by returning the last move. 
* `/ai/random` : Randomly selects an empty spot on the board and places a token.
* `/ai/maxLibs` : Selects an empty spot with the highest possible liberties.
* `/ai/attackEnemy` : Attempts to attack enemy tokens, this is an offensive AI.
* `/ai/formEyes` : Attempts to form eyes, these are structures that make your territory/position on the board much stronger. This is a defensive AI.
* `/util/findArmies` : Takes a board and returns an object outlining all of the armies.
   
Access the API by making an **HTTP POST** request to the respective route. 

### Input JSON
The body of the request should be JSON string with the following structure: 

```JSON
{
    "size" : number,
    "board" : [ [...], ...],
    "last" : {
        "x" : number,
        "y" : number,
        "c" : number,
        "pass" : boolean
    }
}
```

The fields are: 

* `size` : the dimension of the *square* board (size x size).
* `board` : a 2d array (size x size) representing the current board state. 
    + Each cell is one of 0 (no token), 1 (black token), or 2 (white token). 
* `last` : a structure representing the previous move made.
* `last.x` : the x coordinate of the previous move 
    + `0 <= last.x < size` 
* `last.y` : the y coordinate of the previous move 
    + `0 <= last.y < size` 
* `last.c` : the c color of the token for the last move, 1 (black token), 2 (white token). 
    + If the `last.c` is 0 then the AI assume it is the first move of the game and place a black token. 
* `last.pass` : a boolean indicating if the previous move was a "pass". 
    + The AI will ignore the `last.x` and `last.y` fields.
    + The `last.c` field must be set.
    
### Output JSON

The AI APIs will return a JSON string with the following structure: 

```JSON
    {
      "x": number,
      "y": number,
      "c": number,
      "pass": boolean
    }
```

The fields are: 

* `x` : the x coordinate of the computed move. 
* `y` : the y coordinate of the computed move.
* `c` : the color of the token being placed (0 - None, 1 - Black, or 2 - White)
* `pass` : true if the AI passed, false otherwise. 
    + if the AI passed then the `c` field will be set to 0 (None).
    
---

The Util APIs will return **different** JSON strings each, depending on their functionality.

`/util/findArmies`

```JSON
{
    "armies" : [
        {
            "colour": number
            "tokens": [
                {
                    "colour": number,
                    "position": [number, number],
                    "liberties": [ [number, number], ... ],
                }, ...
            ],
            "liberties": [ [number, number], ... ],
            "size": number
        }, ...
    ]
}

```

* `armies` : an encapsulating field to contain the object 
* `colour` : the colour of the army
* `tokens` : the list of all of the tokens that make up the army
	+ `colour` : the colour of the token (always the same as the army)
	+ `position` : the x,y position of the token
	+ `liberties` : the liberties of the token
* `liberties` : the liberties of the army (**NOT** the union of all token liberties)
* `size` : the size of the army

    
## Design and Implementation Guide

The following UML class diagram describes the basic structure of the web application. 

![Basic Class Diagram](/doc/main-class.png "Main Class Diagram")

The basic interaction for handling a request is illustrated by the following sequence diagram: 

![Basic Class Diagram](/doc/default-sequence.png "Sequence Diagram")


Requests are handled by the ExpressRouter (defined in `routes/index.js`). AI implementations must extend the abstract AI class. 
 
The model objects `Board` and `Move` represent the objects that the AI uses to communicate with the web interface. 

AI implementations may use their own internal model objects provided they can convert to and from the `Board` and `Move` objects in used by the ExpressRouter. 

New AI's should: 

* Implement their own class that extends the `AI` class. 
* Choose an appropriate name for the RESTful API path (e.g. `/random` would indicate the AI randomly picks a move). 
* Write a POST request handler function in the ExpressRouter that calls their AI. 
* Implement unit tests and integration tests in `test/` using the Mocha test framework.
    + These should at minimum ensure that that the `move()` function of the AI returns an appropriate `Move` object for all equivalence classes of inputs. 


### Testing

Unit and integration tests are written using the Mocha test framework.

These tests are run on the Travis continuous integration tool: [https://travis-ci.org/sdiemert/goai](https://travis-ci.org/sdiemert/goai). 

Copyright 2016 Simon Diemert

Licensed under the Apache License, Version 2.0 (the "License");
you may not use the artifacts in this repository 
except in compliance with the License. Obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
