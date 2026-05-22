sap.ui.define([
"sap/m/MessageToast",
"sap/ui/core/routing/HashChanger"
], function (MessageToast, HashChanger) {
    "use strict";

    return {

    logout_method: function () {
        console.log("Logout clicked");

      // Clear session
        sessionStorage.clear();
        localStorage.clear();

        MessageToast.show("Logged out");

      // ✅ FORCE navigation to Login (Home)
        HashChanger.getInstance().replaceHash("");
      // "" matches route with pattern ""
    }

};
});
