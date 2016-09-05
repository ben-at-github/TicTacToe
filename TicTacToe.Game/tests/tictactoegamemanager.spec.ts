
it("test play turn, from empty",
    () => expect((() => {
        let manager: TicTacToeGameManager = new TicTacToeGameManager();
        return manager.playTurn(Player.O, 0, 0);
    })()).toEqual([true, false, [[Player.O, null, null], [null, null, null], [null, null, null]]]));

it("test play turn, not empty, yes place, no win",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, Player.X, null], [null, null, null]];

        let manager: TicTacToeGameManager = new TicTacToeGameManager(board);
        return manager.playTurn(Player.O, 0, 0);
    })()).toEqual([true, false, [[Player.O, null, null], [null, Player.X, null], [null, null, null]]]));

it("test play turn, not empty, no place, no win",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, Player.X, null], [null, null, null]];

        let manager: TicTacToeGameManager = new TicTacToeGameManager(board);
        return manager.playTurn(Player.O, 1, 1);
    })()).toEqual([false, false, [[null, null, null], [null, Player.X, null], [null, null, null]]]));

it("test play turn, not empty, no place (out of bounds), no win",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, Player.X, null], [null, null, null]];

        let manager: TicTacToeGameManager = new TicTacToeGameManager(board);
        return manager.playTurn(Player.O, -1, 1);
    })()).toEqual([false, false, [[null, null, null], [null, Player.X, null], [null, null, null]]]));

it("test play turn, not empty, yes place, yes win",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [Player.O, Player.X, null], [Player.O, Player.X, null]];

        let manager: TicTacToeGameManager = new TicTacToeGameManager(board);
        return manager.playTurn(Player.O, 0, 0);
    })()).toEqual([true, true, [[Player.O, null, null], [Player.O, Player.X, null], [Player.O, Player.X, null]]]));

it("test play turn, not empty, yes place, create tie",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, Player.O, Player.X], [Player.X, Player.O, Player.O], [Player.O, Player.X, Player.X]];

        let manager: TicTacToeGameManager = new TicTacToeGameManager(board);
        return manager.playTurn(Player.O, 0, 0);
    })()).toEqual([true, false, [[Player.O, Player.O, Player.X], [Player.X, Player.O, Player.O], [Player.O, Player.X, Player.X]]]));

it("test play turn, full, no place, no win",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[Player.O, Player.O, Player.X], [Player.X, Player.O, Player.O], [Player.O, Player.X, Player.X]];

        let manager: TicTacToeGameManager = new TicTacToeGameManager(board);
        return manager.playTurn(Player.O, 0, 0);
    })()).toEqual([false, false, [[Player.O, Player.O, Player.X], [Player.X, Player.O, Player.O], [Player.O, Player.X, Player.X]]]));

it("test play turn, null player, not empty, no place, no win",
    () => expect((() => {
        let board: TicTacToeBoard = new TicTacToeBoard();
        board.board = [[null, null, null], [null, null, Player.X], [null, null, null]];

        let manager: TicTacToeGameManager = new TicTacToeGameManager(board);
        return manager.playTurn(null, 0, 0);
    })()).toEqual([false, false, [[null, null, null], [null, null, Player.X], [null, null, null]]]));

