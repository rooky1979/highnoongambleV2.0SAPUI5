sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Filter, FilterOperator, History) {
    "use strict";

    return Controller.extend("HNGv2.highnoongamble.controller.SoberCards", {
      onInit: function () {
        var sobercardsModel = new sap.ui.model.json.JSONModel();
        sobercardsModel.loadData("model/sobercards.json");
      },
      onSearch: function (oEvent) {
        var aFilter = [];
        var sQuery = oEvent.getParameter("query");
        if (sQuery) {
          aFilter.push(new Filter("id", FilterOperator.Contains, sQuery));
        }
        // filter binding
        var oList = this.byId("sobercards");
        var oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      },
      godShot: function () {
        var random = Math.floor(Math.random() * 52) + 1;
        var aFilter = [];
        if (random) {
          aFilter.push(new Filter("card", FilterOperator.Contains, random));
        }
        // filter binding
        var oList = this.byId("sobercards");
        var oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      },
      onNavBack: function () {
        var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("start", {}, true);
			}
      },
    });
  }
);
