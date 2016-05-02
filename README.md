# GO AI

A simple GO AI web service. 

This application is meant to provide an external web service that students in UVic's SENG 299 class can program against for their term project.

Given the current board state and last move made the AIs in this web service will return a next move. 

At this point, AIs are state-less, they do not store a history of requests. 
 
## Use

Each HTTP route is serviced by a different AI. The current routes are: 
  
* `/` : Default route, echos the request by returning the last move. 
* ??? : TBA 
   
Access the AI by making an **HTTP POST** request to the respective route. 

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

The AI will return a JSON string with the following structure: 

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

