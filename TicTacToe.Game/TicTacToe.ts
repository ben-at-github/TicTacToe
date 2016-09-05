
/**
 * couple functions that help with cross browser support
 * supports IE8+, Chrome, Firefox, Edge
 */
class HTMLHelpers {

    /**
     * determines if the given html element has the given css class
     * @param element {HTMLElement} the element to check if it has the given class
     * @param className {string} the name of the css to check if the given element has
     * @return {boolean} true if the element has the css class
     */
    static hasClass(element: HTMLElement, className: string): boolean {
        if (element !== null) {
            return element.classList ?
                element.classList.contains(className) :
                (" " + element.className + " ").indexOf(" " + className + " ") > -1;
        } else {
            return false;
        }
    }

    /**
     * if the html element does not already have the given css class, add the class to the element
     * @param element {HTMLElement} element to add the css class to
     * @param className {string} name of the css class to add
     */
    static addClass(element: HTMLElement, className: string): void {
        if (element !== null && !HTMLHelpers.hasClass(element, className)) {
            if (element.classList) {
                element.classList.add(className);
            } else {
                element.className += (" " + className);
            }
        }
    }

    /**
     * if the html element has the given css class, removes the class to the element
     * @param element {HTMLElement} element to remove the css class from
     * @param className {string} name of the css class to remove
     */
    static removeClass(element: HTMLElement, className: string): void {
        if (element !== null && HTMLHelpers.hasClass(element, className)) {
            if (element.classList) {
                element.classList.remove(className);
            } else {
                let classes: string[] = (" " + element.className + " ").split(" ");
                let newClassName: string = "";

                for (let i: number = 0; i < classes.length; i++) {
                    if (classes[i] !== " " && classes[i] !== className) {
                        newClassName += (classes[i] + " ");
                    }
                }

                element.className = newClassName;
            }
        }
    }

    /**
     * sets the html elements text
     * some browsers need the 'textContent' others need 'innerText' set
     * @param element {HTMLElement} element to set the text of
     * @param text {string} the text content
     */
    static setText(element: HTMLElement, text: string): void {
        if (element !== null) {
            element.textContent = text;
            element.innerText = text;
        }
    }
}

/**
 * represents the X and O players piece
 */
enum Player { X, O }

/**
 * represents a 3 by 3 tic-tac-toe board
 * here's some explanation for what some words mean in the docs
 * pieces: represents where the player played that turn
 * game board: 3 by 3 grid where players X and O place their pieces
 * 3 in-a-row: a player has placed their pieces such that 3 of them form a line, required to win the game
 * winning combination: there's 8 winning combination, 3 horizontals, 3 verticals, and 2 diagonals
 *     here they are:
 *     top-left    top-center    top-right
 *     center-left center-center center-right
 *     lower-left  lower-center  lower-right
 *     top-left    center-left   lower-left
 *     top-center  center-center lower-center
 *     top-right   center-right  lower-right
 *     top-left    center-center lower-right
 *     lower-left  center-center top-right
 * inbound/outofbounds: the location is inside, or outside the game board respectively
 */
class TicTacToeBoard {

    /** the data holding the actual game board */
    board: Player[][];

    /**
     * initializes a new instance of the TicTacToeBoard class
     */
    constructor() {
        this.reset();
    }

    /**
     * converts the arguments into indeces that can be used by the board
     * @param row {number} the row of the board
     * @param column {number} the column of the board
     * @return {[number, number]} new coordinates that are compatible with the board
     */
    static floorSpot(row: number, column: number): [number, number] {
        return [Math.floor(row), Math.floor(column)];
    }

    /**
     * checks if the given location is in the board
     * @param row {number} the 0 based index of the row of the board
     * @param column {number} the 0 based index of the column of the board
     * @return {boolean} returns true if both row and column are at least 0 and at most 2
     */
    static inbounds(row: number, column: number): boolean {
        [row, column] = TicTacToeBoard.floorSpot(row, column);
        return (0 <= row && row <= 2) && (0 <= column && column <= 2);
    }

    /**
     * clears the board(i.e sets all the spots to empty)
     */
    reset(): void {
        this.board = [[null, null, null], [null, null, null], [null, null, null]];
    }

    /**
     * determines if the location on the board is open/empty(i.e no Xs or Os in that spot)
     * @param row {number} value in [0, 1, 2] that corresponds with the top, center, lower row respectively to check
     * @param column {number} value in [0, 1, 2] that corresponds with the left, center, right column respectively to check
     * @return {boolean} only returns true if the given location is inbounds and open/empty(i.e no Xs or Os)
     */
    spotIsOpen(row: number, column: number): boolean {
        [row, column] = TicTacToeBoard.floorSpot(row, column);
        return TicTacToeBoard.inbounds(row, column) && (this.board[row][column] === null);
    }

    /**
     * checks if the player can play their piece in the given spot, and does so if they can
     * @param player {Player} who is playing their piece? X or O? if player is null, no piece can be played
     * @param row {number}
     *     value in [0, 1, 2] that corresponds with the top, center, lower rows respetively of
     *     where the player wants to place their piece
     * @param column {number}
     *     value in [0, 1, 2] that corresponds with the left, center, right columns respetively of
     *     where the player wants to place their piece
     * @return {boolean} true if the player can play their piece, else null
     */
    tryAddPiece(player: Player, row: number, column: number): boolean {
        [row, column] = TicTacToeBoard.floorSpot(row, column);

        let ableToAddPiece: boolean = player !== null && this.spotIsOpen(row, column);

        if (ableToAddPiece) {
            this.board[row][column] = player;
        }

        return ableToAddPiece;
    }

    /**
     * checks if the player has 3 pieces in-a-row for the given column
     * @param player {Player} who do you want to check? X or O? if null returns false
     *     if out of bounds, returns false
     * @param column {number} value in [0, 1, 2] that corresponds with the left, center, right columns to check for 3 in-a-row
     * @return {boolean} true if the player has their respective piece in the top, center, and lower rows for the given column
     */
    checkForVictoryVertical(player: Player, column: number): boolean {
        column = Math.floor(column);

        return (player !== null) && (0 <= column && column <= 2) &&
            (this.board[0][column] === player) && (this.board[1][column] === player) && (this.board[2][column] === player);
    }

    /**
     * checks if the player has 3 pieces in-a-row for the given row
     * @param player {Player} who do you want to check? X or O? if null returns false
     * @param row {number} value in [0, 1, 2] that corresponds with the top, center, lower rows to check for 3 in-a-row
     *     if out of bounds, returns false
     * @return {boolean} true if the player has their respective piece in the left, center, and right columns for the given row
     */
    checkForVictoryHorizontal(player: Player, row: number): boolean {
        row = Math.floor(row);

        return (player !== null) && (0 <= row && row <= 2) &&
            (this.board[row][0] === player) && (this.board[row][1] === player) && (this.board[row][2] === player);
    }

    /**
     * checks both the diagonals to see if the player has 3 in-a-row
     * @param player {Player} who do you want to check? X or O? if null returns false
     * @return {boolean} true if the player has their pieces played in at least 1 of these formats on the board:
     *     top-left, center-center, lower-right
     *     lower-left, center-center, top-right
     */
    checkForVictoryDiagonal(player: Player): boolean {
        return (player !== null) &&
            (((this.board[0][0] === player) && (this.board[1][1] === player) && (this.board[2][2] === player)) || // down-right diagonal
             ((this.board[0][2] === player) && (this.board[1][1] === player) && (this.board[2][0] === player))); // down-left diagonal
    }

    /**
     * for the given player, checks all winning combinations, there's 8, to see if they win
     * @param player {Player} who do you want to check? X or O? if null returns false
     * @return {boolean} true if the player has at least 1 of the 8 winning tic-tac-toe combination
     */
    checkForVictory(player: Player): boolean {
        return (player !== null) &&
            (this.checkForVictoryVertical(player, 0) || this.checkForVictoryHorizontal(player, 0) ||
             this.checkForVictoryVertical(player, 1) || this.checkForVictoryHorizontal(player, 1) ||
             this.checkForVictoryVertical(player, 2) || this.checkForVictoryHorizontal(player, 2) ||
             this.checkForVictoryDiagonal(player));
    }

    /**
     * gets the locations of the 3 squares that made the player win(because you need 3 in a row to win!)
     * @param player {Player} who to check won, X or O, if null returns null
     * @param row value in [0, 1, 2] that corresponds with the top, center, lower row respectively where we know is a wining spot
     * @param column value in [0, 1, 2] that corresponds with the left, center, right column respectively where we know is a wining spot
     * @return {[[number, number], [number, number], [number, number]]}
     *    tuple containing 3 values,
     *    each value contains the row and column respectively of the winning spot
     *    (e.g [[0, 0], [0, 1], [0, 2]] would correspond with the top row being the winning spots)
     *    if player is null, or the location is out of bounds, returns null
     */
    winningSpotsFrom(player: Player, row: number, column: number): [[number, number], [number, number], [number, number]] {
        [row, column] = TicTacToeBoard.floorSpot(row, column);

        if (this.checkForVictoryVertical(player, column)) { // check for spots in given column
            return [[0, column], [1, column], [2, column]];
        } else if (this.checkForVictoryHorizontal(player, row)) { // check for spots in given row
            return [[row, 0], [row, 1], [row, 2]];
        } else if (this.checkForVictoryDiagonal(player)) { // check for spots in the diagonals
            if (this.board[0][0] === player && this.board[2][2] === player) {
                return [[0, 0], [1, 1], [2, 2]];
            } else {
                return [[2, 0], [1, 1], [0, 2]];
            }
        } else {
            return null;
        }
    }

}

/**
 * provides an interface to manage a tic-tac-toe game
 */
class TicTacToeGameManager {

    /** the tic-tac-toe board this is managing */
    private board: TicTacToeBoard;

    /**
     * generates a new instance of the TicTacToeGameManager class
     * @param board {TicTacToeBoard}
     *     optionally give the new TicTacToeGameManager the board to start with,
     *     if none is given it creates a new empty board to use
     */
    constructor(board?: TicTacToeBoard) {
        this.board = board ? board : new TicTacToeBoard();
    }

    /**
     * resets the state of the game(i.e clears the board)
     */
    reset(): void {
        this.board.reset();
    }

    /**
     * determines if the location on the board is open/empty(i.e no Xs or Os in that spot)
     * @param row {number} value in [0, 1, 2] that corresponds with the top, center, lower row respectively to check
     * @param column {number} value in [0, 1, 2] that corresponds with the left, center, right column respectively to check
     * @return {boolean} only returns true if the given location is inbounds and open/empty(i.e no Xs or Os)
     */
    spotIsOpen(row: number, column: number): boolean {
        return this.board.spotIsOpen(row, column);
    }

    /**
     * gets the locations of the 3 squares that made the player win(because you need 3 in a row to win!)
     * @param player {Player} who to check won, X or O, if null returns null
     * @param row value in [0, 1, 2] that corresponds with the top, center, lower row respectively where we know is a wining spot
     * @param column value in [0, 1, 2] that corresponds with the left, center, right column respectively where we know is a wining spot
     * @return {[[number, number], [number, number], [number, number]]}
     *    tuple containing 3 values,
     *    each value contains the row and column respectively of the winning spot
     *    (e.g [[0, 0], [0, 1], [0, 2]] would correspond with the top row being the winning spots)
     *    if player is null, or the location is out of bounds, returns null
     */
    winningSpotsFrom(player: Player, row: number, column: number): [[number, number], [number, number], [number, number]] {
        return this.board.winningSpotsFrom(player, row, column);
    }

    /**
     * given the player, X or O, plays their turn(i.e adds the players piece to the board, if it can)
     * @param {Player} player who is setting the piece? X or O?
     * @param {number} row value in [0, 1, 2], determines if it's the top, center, or bottom row respectively
     * @param {number} column value in [0, 1, 2], determines if it's the left, center, or right column respectively
     * @return {[boolean, boolean, Player[][]]} a tuple
     *    first containing if the player successfully played their piece,
     *    second if the player wins the game,
     *    third the new game board
     *    if player is null, no piece is added, nobody wins, and the current board is returned
     */
    playTurn(player: Player, row: number, column: number): [boolean, boolean, Player[][]] {
        [row, column] = TicTacToeBoard.floorSpot(row, column);

        let pieceWasPlayed: boolean = this.board.tryAddPiece(player, row, column);
        let doesPlayerWin: boolean = pieceWasPlayed ? this.board.checkForVictory(player) : false;

        return [pieceWasPlayed, doesPlayerWin, this.board.board];
    }

}

/**
 * manages the tic-tac-toe game's user interface
 */
class TicTacToeUI {

    /** current turn number, starts at 1, odd turns are O, even are X */
    private turn: number;

    /** value holding if the game has ended and not restarted, true if the game is disabled */
    private gameOver: boolean;

    /** the game manager this ui is managing */
    gameManager: TicTacToeGameManager;

    /** the html element that displays information to the players */
    messageElement: HTMLElement;

    /** the html element that holds the game board */
    boardElement: HTMLElement;

    /** the html element of where the user can click to reset the game */
    resetButton: HTMLElement;

    /** the html elements of where the players can click to play their pieces */
    spots: HTMLElement[][];

    /** the element this game is the child of */
    elementConnectedTo: HTMLElement;

    /**
     * initializes a new instance of the TicTacToeUI class
     * makes the game a child of the given element
     * @param connectTo {HTMLElement} the html element to connect the game to, becomes the child element
     */
    constructor(connectTo: HTMLElement) {
        this.elementConnectedTo = connectTo;
        this.gameManager = new TicTacToeGameManager();
        this.spots = [[null, null, null], [null, null, null], [null, null, null]];
    }

    /**
     * at the end of each turn this function is called to set the hover color of the non
     * used spots on the game board to the color for the next player
     * @param toPlayer {Player} the player whos turn is next
     */
    private clearAndSetHovers(toPlayer: Player): void {
        for (let i: number = 0; i < 3; i++) {
            for (let j: number = 0; j < 3; j++) {
                let currentSpot: HTMLElement = this.spots[i][j];

                // remove the current hovering
                HTMLHelpers.removeClass(currentSpot, "x-hover");
                HTMLHelpers.removeClass(currentSpot, "o-hover");

                if (toPlayer !== null &&
                    // if the spot is has not been played yet
                    !HTMLHelpers.hasClass(currentSpot, "x-selected") && !HTMLHelpers.hasClass(currentSpot, "o-selected")) {
                    // add the new hovering
                    HTMLHelpers.addClass(currentSpot, toPlayer === Player.O ? "o-hover" : "x-hover");
                }
            }
        }
    }

    /**
     * generates the message element to be used to display information to the user
     * @return {HTMLElement} the message html element
     */
    private generateMessageElement(): HTMLElement {
        let messageElement: HTMLElement = document.createElement("h2");
        messageElement.className = "tic-tac-toe message";

        return messageElement;
    }

    /**
     * generates an element where the players can click to place thier pieces
     * @param row {number} value in [0, 1, 2] corresponding to upper, center, lower row respectively
     * @param column {number} value in [0, 1, 2] corresponding to left, center, right column respectively
     * @return {HTMLElement} html element where the player can click to place their piece at the given location
     */
    private generatePlayerPlaySpot(row: number, column: number): HTMLElement {
        let spot: HTMLElement = document.createElement("td");
        spot.className = "tic-tac-toe unselected";
        spot.onclick = (ev: MouseEvent): any => this.takeTurn(row, column);

        return spot;
    }

    /**
     * generates the game board and the spots where the user can click to play their turn
     * the spots come attached to the game board
     * @return {[HTMLElement, HTMLElement[][]]} tuple containing the game board and the spots the user can click to play their turn
     */
    private generateTableElement(): [HTMLElement, HTMLElement[][]] {
        let boardElement: HTMLElement = document.createElement("table");
        boardElement.className = "tic-tac-toe";

        let spots: HTMLElement[][] = [[null, null, null], [null, null, null], [null, null, null]];

        // generate 3 rows each of 3 columns for the game board
        for (let i: number = 0; i < 3; i++) {
            let currentRow: HTMLElement = document.createElement("tr");
            currentRow.className = "tic-tac-toe";
            boardElement.appendChild(currentRow);

            for (let j: number = 0; j < 3; j++) {
                spots[i][j] = this.generatePlayerPlaySpot(i, j);
                currentRow.appendChild(spots[i][j]);
            }
        }

        return [boardElement, spots];
    }

    /**
     * generates the html element that the user clicks to reset the game
     * @return {HTMLElement} html element the user can click to reset the game
     */
    private generateResetAnchor(): HTMLElement {
        let resetAnchor: HTMLElement = document.createElement("a");
        HTMLHelpers.setText(resetAnchor, "Reset");
        resetAnchor.className = "tic-tac-toe";
        resetAnchor.setAttribute("href", "javascript:void(0);");
        resetAnchor.onclick = (ev: Event): any => this.reset();

        return resetAnchor;
    }

    /**
     * generates the html element that holds the anchor responsible for reseting the game
     * @return the div that holds the anchor that resets the game, the anchor comes attached
     */
    private generateResetElement(): HTMLElement {
        let resetButton: HTMLElement = document.createElement("div");
        resetButton.className = "tic-tac-toe reset hidden";
        resetButton.appendChild(this.generateResetAnchor());

        return resetButton;
    }

    /**
     * handles the game ending:
     * sets the game over messages
     * disables the game board
     * shows the winning placements
     * allows the players to reset the game
     * @param winner {Player} who won the game? X if X wins, O if O wins, null is tie
     * @param row {number} ONLY REQUIRED IF if there is a winner, the row coordinate of the players winning placement
     * @param column {number} ONLY REQUIRED IF there is a winner, the column coordinate of the players winning placement
     */
    private endGame(winner: Player, row?: number, column?: number): void {
        // disable game
        this.gameOver = true;

        // set the gameover message
        if (winner === null) {
            this.setMessage("Game Over - Tie!");
        } else if (winner === Player.O) {
            this.setMessage("Game Over - O Wins!");
        } else if (winner === Player.X) {
            this.setMessage("Game Over - X Wins!");
        }

        // if there is a winner, show winning spots
        if (winner !== null) {
            let winningSpots: [[number, number], [number, number], [number, number]] =
                this.gameManager.winningSpotsFrom(winner, row, column);

            // set css for winning spots
            for (let i: number = 0; i < 3; i++) {
                let currentWinningSpot: HTMLElement = this.spots[winningSpots[i][0]][winningSpots[i][1]];
                HTMLHelpers.removeClass(currentWinningSpot, "unselected");
                HTMLHelpers.removeClass(currentWinningSpot, "x-selected");
                HTMLHelpers.removeClass(currentWinningSpot, "o-selected");
                HTMLHelpers.addClass(currentWinningSpot, "winning-spot");
            }
        }

        // show the reset button
        HTMLHelpers.removeClass(this.resetButton, "hidden");
    }

    /**
     * sets the games message elements text to display the given value
     * @param message {string} content to display
     */
    setMessage(message: string): void {
        HTMLHelpers.setText(this.messageElement, message);
    }

    /**
     * clears the game board and game state, and removes the game board from the DOM
     */
    clearBoard(): void {
        // remove the board from the DOM
        this.elementConnectedTo.removeChild(this.boardElement);
        this.elementConnectedTo.removeChild(this.messageElement);
        this.elementConnectedTo.removeChild(this.resetButton);

        this.spots = [[null, null, null], [null, null, null], [null, null, null]];
        this.boardElement = null;
        this.messageElement = null;
        this.resetButton = null;

        // clear game state
        this.gameManager.reset();
        this.turn = 1;
    }

    /**
     * initializes the game board and game state, and draws the game board on the DOM
     */
    initBoard(): void {
        // generate the html elements for the game board and connect them to the DOM
        this.messageElement = this.generateMessageElement();
        this.elementConnectedTo.appendChild(this.messageElement);

        [this.boardElement, this.spots] = this.generateTableElement();
        this.elementConnectedTo.appendChild(this.boardElement);

        this.resetButton = this.generateResetElement();
        this.elementConnectedTo.appendChild(this.resetButton);

        // initialize game state
        this.clearAndSetHovers(Player.O);
        this.setMessage("O's turn");
        this.gameOver = false;
        this.turn = 1;
    }

    /**
     * resets the board, removes the generated elements from the DOM, and then regenerates everything
     */
    reset(): void {
        this.clearBoard();
        this.initBoard();
    }

    /**
     * handles the player adding thier piece to the game board, the current player is determined by the current turn
     * turns start at 1 and odd turns are O while evens are X
     * if an illegal row or column are entered of the location is already taken it simply ignores this turn taking
     * if the player successfully played, the ui is updated to show where they played, and the hovering changes
     * to the next players color.
     * if the player wins the game, it'll do the game ending
     * @param row {number}
     *     value in [0, 1, 2] corresponding with the upper, center, lower rows respectively where the player wants to add their piece
     * @param column {number}
     *     value in [0, 1, 2] corresponding with the left, center, right columns respectively where the player wants to add their piece
     */
    takeTurn(row: number, column: number): void {
        // if the game is not disabled
        if (!this.gameOver) {
            // odd turns are O, even are X
            let player: Player = this.turn % 2 === 0 ? Player.X : Player.O;

            let [spotPlayedSuccessfully, playerWins, ]: [boolean, boolean, Player[][]] = this.gameManager.playTurn(player, row, column);

            if (spotPlayedSuccessfully) {
                let isXPlayer: boolean = player === Player.X;
                let spotPlayed: HTMLElement = this.spots[row][column];

                // set the played locations css to the correct players css class
                HTMLHelpers.removeClass(spotPlayed, "unselected");
                HTMLHelpers.addClass(spotPlayed, isXPlayer ? "x-selected" : "o-selected");

                // set the message to display whos turn is next
                HTMLHelpers.setText(spotPlayed, isXPlayer ? "X" : "O");
                this.setMessage((isXPlayer ? "O" : "X") + "'s turn");

                // set the hover css for the next player
                this.clearAndSetHovers(playerWins ? null : (isXPlayer ? Player.O : Player.X));

                // check if the game is over, if not increase the turn number
                if (playerWins) {
                    this.endGame(player, row, column);
                } else if (this.turn >= 9) {
                    // since there's only 9 spots, if there is not winner by now it's a tie
                    this.endGame(null);
                } else {
                    this.turn++;
                }
            }
        }
    }

    /**
     * loads up the tic-tac-toe ui on the given element
     * call this after the window has loaded the element
     * @param connectTo {HTMLElement} the html element you want the tic-tac-toe game to be the parent of
     * @return {TicTacToeUI} the generated ui
     */
    static connectToElement(connectTo: HTMLElement): TicTacToeUI {
        let ui: TicTacToeUI = new TicTacToeUI(connectTo);
        ui.initBoard();
        return ui;
    }

    /**
     * loads up the tic-tac-toe ui on the given element when the window.onload event
     * @param connectTo {HTMLElement} the html element you want the tic-tac-toe game to be the parent of
     * @return {TicTacToeUI} the generated ui
     */
    static connectOnWindowLoadTo(connectTo: HTMLElement): TicTacToeUI {
        let ui: TicTacToeUI = new TicTacToeUI(connectTo);
        window.onload = (ev: Event): any => ui.initBoard();
        return ui;
    }
}