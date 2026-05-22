sap.ui.define([
    "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";


    return Controller.extend("project1.ext.view.Home", {

        
      onInit: function () {
      
      },

      onNavigateToWaves: function () {
        console.log('nav fun working');
      const oView = this.getView();
      const username = oView.byId("username").getValue();
      const password = oView.byId("password").getValue();
        console.log(username, password)
      if (!username || !password) {
        sap.m.MessageBox.error("Please enter username and password");
        return;
      }

      fetch("/odata/v4/datamigration/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then(res => {
            console.log("response:");
          if (!res.ok) {
            console.log("opened");
            return res.text().then(err => { throw err; });
          }
          return res.json();
        })

    .then(data => {
        console.log("Server response:", data);
        if (data.value === true) {
            console.log('inside service')
            sap.m.MessageToast.show("Login successful");
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("WavesList");
        }
        else{
            sap.m.MessageBox.error("Invalid username or password");
        }
    })

        .catch(err => {
          sap.m.MessageBox.error(err.message || "Invalid username or password");
        });
      },
    });
});
