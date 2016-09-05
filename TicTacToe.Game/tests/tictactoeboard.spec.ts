
it("board is initialized correctly",
    () => expect((new TicTacToeBoard().board))
        .toEqual([[null, null, null], [null, null, null], [null, null, null]]));

it("floorspot proly works", () => expect(TicTacToeBoard.floorSpot(1.2, 4)).toEqual([1, 4]));

it("inbound can correctly determine the expected inbound values",
    () => expect(
        TicTacToeBoard.inbounds(0, 0) && TicTacToeBoard.inbounds(0, 1) && TicTacToeBoard.inbounds(0, 2) &&
        TicTacToeBoard.inbounds(1, 0) && TicTacToeBoard.inbounds(1, 1) && TicTacToeBoard.inbounds(1, 2) &&
        TicTacToeBoard.inbounds(2, 0) && TicTacToeBoard.inbounds(2, 1) && TicTacToeBoard.inbounds(2, 2)).toBeTruthy());

it("inbound test outside value 1", () => expect(TicTacToeBoard.inbounds(-1, 0)).toBeFalsy());
it("inbound test outside value 2", () => expect(TicTacToeBoard.inbounds(-1, -1)).toBeFalsy());
it("inbound test outside value 3", () => expect(TicTacToeBoard.inbounds(6, 0)).toBeFalsy());

it("test reseting the board", () => expect(
    (() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = null;
        board.reset();

        return board.board;
    })()).toEqual([[null, null, null], [null, null, null], [null, null, null]]));

it("test spotisopen when the board is empty and checking in the center",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        return board.spotIsOpen(1, 1);
    })()).toBeTruthy());

it("test spotisopen when the board is full and checking in the center",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.X, Player.X, Player.X], [Player.X, Player.X, Player.X], [Player.X, Player.X, Player.X]];
        return board.spotIsOpen(1, 1);
    })()).toBeFalsy());

it("test spotisopen when the board is empty and checking outside the board",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        return board.spotIsOpen(-1, 10);
    })()).toBeFalsy());

it("test adding piece to empty board in the center",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.tryAddPiece(Player.O, 1, 1);
        return board.board;
    })()).toEqual([[null, null, null], [null, Player.O, null], [null, null, null]]));

it("test adding piece to full board in the center",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.X, Player.X, Player.X], [Player.X, Player.X, Player.X], [Player.X, Player.X, Player.X]];
        board.tryAddPiece(Player.O, 1, 1);
        return board.board;
    })()).toEqual([[Player.X, Player.X, Player.X], [Player.X, Player.X, Player.X], [Player.X, Player.X, Player.X]]));

it("test adding piece to empty board outside",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.tryAddPiece(Player.O, -1, -1);
        return board.board;
    })()).toEqual([[null, null, null], [null, null, null], [null, null, null]]));

it("test adding 9 pieces to the board",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.tryAddPiece(Player.O, 0, 0);
        board.tryAddPiece(Player.X, 0, 1);
        board.tryAddPiece(Player.O, 0, 2);
        board.tryAddPiece(Player.X, 1, 0);
        board.tryAddPiece(Player.O, 1, 1);
        board.tryAddPiece(Player.X, 1, 2);
        board.tryAddPiece(Player.O, 2, 0);
        board.tryAddPiece(Player.X, 2, 1);
        board.tryAddPiece(Player.O, 2, 2);
        return board.board;
    })()).toEqual([[Player.O, Player.X, Player.O], [Player.X, Player.O, Player.X], [Player.O, Player.X, Player.O]]));

it("test adding piece to empty board inside with null player",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        return board.tryAddPiece(null, 1, 1);
    })()).toBeFalsy());

it("test victory vertical left column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.X, null, null], [Player.X, null, null], [Player.X, null, null]];
        return board.checkForVictoryVertical(Player.X, 0);
    })()).toBeTruthy());

it("test victory vertical center column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, Player.X, null], [null, Player.X, null], [null, Player.X, null]];
        return board.checkForVictoryVertical(Player.X, 1);
    })()).toBeTruthy());

it("test victory vertical right column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.X], [null, null, Player.X], [null, null, Player.X]];
        return board.checkForVictoryVertical(Player.X, 2);
    })()).toBeTruthy());

it("test victory vertical null player",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.X], [null, null, Player.X], [null, null, Player.X]];
        return board.checkForVictoryVertical(null, 2);
    })()).toBeFalsy());

it("test victory vertical out of bounds",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.X], [null, null, Player.X], [null, null, Player.X]];
        return board.checkForVictoryVertical(Player.X, -2);
    })()).toBeFalsy());

it("test victory vertical three in row 2 X, 1 O",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.X], [null, null, Player.X], [null, null, Player.O]];
        return board.checkForVictoryVertical(Player.X, 2);
    })()).toBeFalsy());

it("test victory vertical 2 in row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.X], [null, null, Player.X], [null, null, null]];
        return board.checkForVictoryVertical(Player.X, 2);
    })()).toBeFalsy());

it("test victory horizontal top row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.X, Player.X, Player.X], [null, null, null], [null, null, null]];
        return board.checkForVictoryHorizontal(Player.X, 0);
    })()).toBeTruthy());

it("test victory horizontal center row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [Player.X, Player.X, Player.X], [null, null, null]];
        return board.checkForVictoryHorizontal(Player.X, 1);
    })()).toBeTruthy());

it("test victory horizontal bottom row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [Player.X, Player.X, Player.X]];
        return board.checkForVictoryHorizontal(Player.X, 2);
    })()).toBeTruthy());

it("test victory horizontal null player",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [Player.X, Player.X, Player.X]];
        return board.checkForVictoryHorizontal(null, 2);
    })()).toBeFalsy());

it("test victory horizontal out of bounds",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [Player.X, Player.X, Player.X]];
        return board.checkForVictoryHorizontal(Player.X, -2);
    })()).toBeFalsy());

it("test victory horizontal 3 in row 2 X, 1 O",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [Player.X, Player.X, Player.O]];
        return board.checkForVictoryHorizontal(Player.X, 2);
    })()).toBeFalsy());

it("test victory horizontal 2 in row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [Player.X, null, Player.X]];
        return board.checkForVictoryHorizontal(Player.X, 2);
    })()).toBeFalsy());

it("test victory diagonal down-right",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.X, null, null], [null, Player.X, null], [null, null, Player.X]];
        return board.checkForVictoryDiagonal(Player.X);
    })()).toBeTruthy());

it("test victory diagonal down-left",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.X], [null, Player.X, null], [Player.X, null, null]];
        return board.checkForVictoryDiagonal(Player.X);
    })()).toBeTruthy());

it("test victory diagonal null player",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.X, null, null], [null, Player.X, null], [null, null, Player.X]];
        return board.checkForVictoryDiagonal(null);
    })()).toBeFalsy());

it("test victory diagonal down-right 3 in row, 2 X, 1 O",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.X, null, null], [null, Player.O, null], [null, null, Player.X]];
        return board.checkForVictoryDiagonal(null);
    })()).toBeFalsy());

it("test victory diagonal down-right 2 in row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.X, null, null], [null, Player.O, null], [null, null, null]];
        return board.checkForVictoryDiagonal(null);
    })()).toBeFalsy());

it("test victory diagonal down-left 3 in row, 2 X, 1 O",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.X], [null, Player.O, null], [Player.X, null, null]];
        return board.checkForVictoryDiagonal(null);
    })()).toBeFalsy());

it("test victory diagonal down-left 2 in row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.O], [null, Player.O, null], [null, null, null]];
        return board.checkForVictoryDiagonal(null);
    })()).toBeFalsy());

it("test for victory all, null player",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, Player.O, Player.O], [Player.X, Player.X, null], [null, null, null]];
        return board.checkForVictory(null);
    })()).toBeFalsy());

it("test for victory all, top row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, Player.O, Player.O], [null, null, null], [null, null, null]];
        return board.checkForVictory(Player.O);
    })()).toBeTruthy());

it("test for victory all, center row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [Player.O, Player.O, Player.O], [null, null, null]];
        return board.checkForVictory(Player.O);
    })()).toBeTruthy());

it("test for victory all, lower row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [Player.O, Player.O, Player.O]];
        return board.checkForVictory(Player.O);
    })()).toBeTruthy());

it("test for victory all, left column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, null, null], [Player.O, null, null], [Player.O, null, null]];
        return board.checkForVictory(Player.O);
    })()).toBeTruthy());

it("test for victory all, center column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, Player.O, null], [null, Player.O, null], [null, Player.O, null]];
        return board.checkForVictory(Player.O);
    })()).toBeTruthy());

it("test for victory all, right column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.O], [null, null, Player.O], [null, null, Player.O]];
        return board.checkForVictory(Player.O);
    })()).toBeTruthy());

it("test for victory all, diagonal down-right",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, null, null], [null, Player.O, null], [null, null, Player.O]];
        return board.checkForVictory(Player.O);
    })()).toBeTruthy());

it("test for victory all, diagonal down-left",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.O], [null, Player.O, null], [Player.O, null, null]];
        return board.checkForVictory(Player.O);
    })()).toBeTruthy());

it("test for victory all, empty",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [null, null, null]];
        return board.checkForVictory(Player.O);
    })()).toBeFalsy());

it("test for victory all, tie",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, Player.O, Player.X], [Player.X, Player.O, Player.O], [Player.O, Player.X, Player.X]];
        return board.checkForVictory(Player.O);
    })()).toBeFalsy());

it("test for victory spots, null player",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, Player.O, Player.O], [Player.X, Player.X, null], [null, null, null]];
        return board.winningSpotsFrom(null, 0, 0);
    })()).toEqual(null));

it("test for victory spots, top row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, Player.O, Player.O], [null, null, null], [null, null, null]];
        return board.winningSpotsFrom(Player.O, 0, 0);
    })()).toEqual([[0, 0], [0, 1], [0, 2]]));

it("test for victory spots, center row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [Player.O, Player.O, Player.O], [null, null, null]];
        return board.winningSpotsFrom(Player.O, 1, 2);
    })()).toEqual([[1, 0], [1, 1], [1, 2]]));

it("test for victory spots, lower row",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [Player.O, Player.O, Player.O]];
        return board.winningSpotsFrom(Player.O, 2, 1);
    })()).toEqual([[2, 0], [2, 1], [2, 2]]));

it("test for victory spots, left column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, null, null], [Player.O, null, null], [Player.O, null, null]];
        return board.winningSpotsFrom(Player.O, 2, 0);
    })()).toEqual([[0, 0], [1, 0], [2, 0]]));

it("test for victory spots, center column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, Player.O, null], [null, Player.O, null], [null, Player.O, null]];
        return board.winningSpotsFrom(Player.O, 0, 1);
    })()).toEqual([[0, 1], [1, 1], [2, 1]]));

it("test for victory spots, right column",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.O], [null, null, Player.O], [null, null, Player.O]];
        return board.winningSpotsFrom(Player.O, 2, 2);
    })()).toEqual([[0, 2], [1, 2], [2, 2]]));

it("test for victory spots, diagonal down-right",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, null, null], [null, Player.O, null], [null, null, Player.O]];
        return board.winningSpotsFrom(Player.O, 0, 0);
    })()).toEqual([[0, 0], [1, 1], [2, 2]]));

it("test for victory spots, diagonal down-left",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, Player.O], [null, Player.O, null], [Player.O, null, null]];
        return board.winningSpotsFrom(Player.O, 0, 2);
    })()).toEqual([[2, 0], [1, 1], [0, 2]]));

it("test for victory spots, empty",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, null], [null, null, null]];
        return board.winningSpotsFrom(Player.O, 0, 0);
    })()).toEqual(null));

it("test for victory spots, tie",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, Player.O, Player.X], [Player.X, Player.O, Player.O], [Player.O, Player.X, Player.X]];
        return board.winningSpotsFrom(Player.O, 0, 2);
    })()).toEqual(null));
