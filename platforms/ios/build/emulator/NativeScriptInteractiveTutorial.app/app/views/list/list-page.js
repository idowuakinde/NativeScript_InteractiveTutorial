var dialogsModule = require("tns-core-modules/ui/dialogs");
var observableModule = require("tns-core-modules/data/observable")
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var GroceryListViewModel = require("../shared/view-models/grocery-list-view-model");
var page;

var pageData = new observableModule.fromObject({
    groceryList: groceryList,
    grocery: "",
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;

    groceryList.empty();
    groceryList.load();
};

exports.add = function () {
    // Check for empty submissions
    if (pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
        return;
    }

    // Dismiss the keyboard
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
        .catch(function () {
            dialogsModule.alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
        });

    // Empty the input field
    pageData.set("grocery", "");
};