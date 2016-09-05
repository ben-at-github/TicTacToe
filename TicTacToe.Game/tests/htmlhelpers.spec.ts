
it("test has class, null element",
    () => expect((() => {
        return HTMLHelpers.hasClass(null, "something");
    })()).toBeFalsy());

it("test has class, empty element",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        return HTMLHelpers.hasClass(el, "something");
    })()).toBeFalsy());

it("test has class, element does not have class",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        $(el).addClass("great");
        return HTMLHelpers.hasClass(el, "something");
    })()).toBeFalsy());

it("test has class, element has class",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        $(el).addClass("something");
        return HTMLHelpers.hasClass(el, "something");
    })()).toBeTruthy());

it("test add class, empty element",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        HTMLHelpers.addClass(el, "something");
        return $(el).hasClass("something");
    })()).toBeTruthy());

it("test add class, non empty element",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        $(el).addClass("ok");
        HTMLHelpers.addClass(el, "something");
        return $(el).hasClass("something");
    })()).toBeTruthy());

it("test add class, element already has class",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        $(el).addClass("something");
        HTMLHelpers.addClass(el, "something");
        return $(el).hasClass("something");
    })()).toBeTruthy());

it("test remove class, empty element",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        HTMLHelpers.removeClass(el, "something");
        return $(el).hasClass("something");
    })()).toBeFalsy());

it("test remove class, non empty element, does not have class we want to remove",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        $(el).addClass("ok");
        HTMLHelpers.removeClass(el, "something");
        return $(el).hasClass("something");
    })()).toBeFalsy());

it("test remove class, non empty element, has class we want to remove",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        $(el).addClass("something");
        HTMLHelpers.removeClass(el, "something");
        return $(el).hasClass("something");
    })()).toBeFalsy());

it("test set text, empty element",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        HTMLHelpers.setText(el, "hey");
        return $(el).text();
    })()).toEqual("hey"));

it("test set text, non empty element",
    () => expect((() => {
        let el: HTMLElement = document.createElement("div");
        $(el).text("sdfsdf");
        HTMLHelpers.setText(el, "hey");
        return $(el).text();
    })()).toEqual("hey"));

