# TicTacToe
it's a html tic-tac-toe game

this tic-tac-toe game does not use any external libraries, at least for the game

to play the game either open the vs solution and build, or run npm install then run the typescript compiler
then open index.html to play!

if you want to insert the game on your own page you'll need to reference the compiled js and css files
then tell it which html element to connect to like this.

```html
<html>
<head>
    <link rel="stylesheet" href="TicTacToe.css" type="text/css" />
    <script src="TicTacToe.js" type="text/javascript"></script>
</head>
<body>
    <div id="content"></div>
    <script type="text/javascript">
        var tictactoeUI = TicTacToeUI.connectOnWindowLoadTo(document.getElementById("content"));
    </script>
</body>
</html>
```

to run tests, run npm install, to install [jasmine](http://jasmine.github.io/), then go to tests/unit-tests.html
in the tests directory.
for convinience I added 
[jquery](https://jquery.com/), and 
[definitelytyped](https://github.com/DefinitelyTyped/DefinitelyTyped) for 
[jquery](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/jquery/jquery.d.ts) and 
[jasmine](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/jasmine/jasmine.d.ts).
they are only used for testing


