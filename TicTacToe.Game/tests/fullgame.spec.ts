let fullGamePassed: any[] = (() => {

    function checkGameState(ui: TicTacToeUI, spotHasClasses: string[][][], spotDoesNotHaveClasses: string[][][]): boolean {
        for (let i: number = 0; i < 3; i++) {
            for (let j: number = 0; j < 3; j++) {
                let spot: JQuery = $(ui.spots[i][j]);

                for (let k: number = 0; k < spotHasClasses[i][j].length; k++) {
                    if (!spot.hasClass(spotHasClasses[i][j][k])) {
                        return false;
                    }
                }

                for (let k: number = 0; k < spotDoesNotHaveClasses[i][j].length; k++) {
                    if (spot.hasClass(spotDoesNotHaveClasses[i][j][k])) {
                        return false;
                    }
                }
            }
        }

        return true;
    };

    let uiConnectedTo: HTMLElement = document.createElement("div");
    let gameUI: TicTacToeUI = TicTacToeUI.connectToElement(uiConnectedTo);

    let yesClass: string[][][];
    let noClass: string[][][];

    let xsel: string = "x-selected";
    let osel: string = "o-selected";
    let xhov: string = "x-hover";
    let ohov: string = "o-hover";
    let winspot: string = "winning-spot";

    yesClass = [[[ohov], [ohov], [ohov]], [[ohov], [ohov], [ohov]], [[ohov], [ohov], [ohov]]];
    noClass =
        [[[xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]],
         [[xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]],
         [[xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed before 1st"];
    }

    gameUI.takeTurn(1, 1); // o

    yesClass = [[[xhov], [xhov], [xhov]], [[xhov], [osel], [xhov]], [[xhov], [xhov], [xhov]]];
    noClass =
        [[[xsel, osel, winspot, ohov], [xsel, osel, winspot, ohov], [xsel, osel, winspot, ohov]],
        [[xsel, osel, winspot, ohov], [xsel, winspot, ohov, xhov], [xsel, osel, winspot, ohov]],
        [[xsel, osel, winspot, ohov], [xsel, osel, winspot, ohov], [xsel, osel, winspot, ohov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed before 2nd"];
    }

    gameUI.takeTurn(0, 0); // x

    yesClass = [[[xsel], [ohov], [ohov]], [[ohov], [osel], [ohov]], [[ohov], [ohov], [ohov]]];
    noClass =
        [[[osel, winspot, ohov, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]],
        [[xsel, osel, winspot, xhov], [xsel, winspot, ohov, xhov], [xsel, osel, winspot, xhov]],
        [[xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed before 3rd"];
    }

    gameUI.takeTurn(0, 2); // o

    yesClass = [[[xsel], [xhov], [osel]], [[xhov], [osel], [xhov]], [[xhov], [xhov], [xhov]]];
    noClass =
        [[[osel, winspot, ohov, xhov], [xsel, osel, winspot, ohov], [xsel, winspot, xhov, ohov]],
        [[xsel, osel, winspot, ohov], [xsel, winspot, ohov, xhov], [xsel, osel, winspot, ohov]],
        [[xsel, osel, winspot, ohov], [xsel, osel, winspot, ohov], [xsel, osel, winspot, ohov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed before 4th"];
    }

    gameUI.takeTurn(2, 0); // x

    yesClass = [[[xsel], [ohov], [osel]], [[ohov], [osel], [ohov]], [[xsel], [ohov], [ohov]]];
    noClass =
        [[[osel, winspot, ohov, xhov], [xsel, osel, winspot, xhov], [xsel, winspot, xhov, ohov]],
        [[xsel, osel, winspot, xhov], [xsel, winspot, ohov, xhov], [xsel, osel, winspot, xhov]],
        [[osel, winspot, ohov, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed before 5th"];
    }

    gameUI.takeTurn(1, 2); // o

    yesClass = [[[xsel], [xhov], [osel]], [[xhov], [osel], [osel]], [[xsel], [xhov], [xhov]]];
    noClass =
        [[[osel, winspot, ohov, xhov], [xsel, osel, winspot, ohov], [xsel, winspot, xhov, ohov]],
        [[xsel, osel, winspot, ohov], [xsel, winspot, ohov, xhov], [xsel, winspot, xhov, ohov]],
        [[osel, winspot, ohov, xhov], [xsel, osel, winspot, ohov], [xsel, osel, winspot, ohov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed before 5th"];
    }

    gameUI.takeTurn(2, 2); // x

    yesClass = [[[xsel], [ohov], [osel]], [[ohov], [osel], [osel]], [[xsel], [ohov], [xsel]]];
    noClass =
        [[[osel, winspot, ohov, xhov], [xsel, osel, winspot, xhov], [xsel, winspot, xhov, ohov]],
         [[xsel, osel, winspot, xhov], [xsel, winspot, ohov, xhov], [xsel, winspot, xhov, ohov]],
         [[osel, winspot, ohov, xhov], [xsel, osel, winspot, xhov], [osel, winspot, xhov, ohov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed before 5th"];
    }

    gameUI.takeTurn(1, 0); // o wins

    yesClass = [[[xsel], [], [osel]], [[winspot], [winspot], [winspot]], [[xsel], [], [xsel]]];
    noClass =
        [[[osel, winspot, ohov, xhov], [xsel, osel, winspot, ohov, xhov], [xsel, winspot, xhov, ohov]],
            [[xsel, osel, xhov, ohov], [xsel, osel, ohov, xhov], [xsel, osel, xhov, ohov]],
            [[osel, winspot, ohov, xhov], [xsel, osel, winspot, ohov, xhov], [osel, winspot, xhov, ohov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed after O wins"];
    }

    gameUI.reset();

    yesClass = [[[ohov], [ohov], [ohov]], [[ohov], [ohov], [ohov]], [[ohov], [ohov], [ohov]]];
    noClass =
        [[[xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]],
            [[xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]],
            [[xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov], [xsel, osel, winspot, xhov]]];
    if (!checkGameState(gameUI, yesClass, noClass)) {
        return [false, "failed after reset"];
    }

    return [true, "success"];
})();

it("full game should pass", () => expect(fullGamePassed[0]).toBeTruthy(fullGamePassed[1]));