const cds = require('@sap/cds');

module.exports = class DatamigrationService extends cds.ApplicationService { init() {

    const {
        Waves,
        Rollouts,
        Countries,
        Streams,
        Objects,
        RolloutCountries,
        Mocks,
        MockStreams,
        MockStreamObjects,
        Users
    } = this.entities;

    //  this.on('READ', 'Users', async (req) => {
    //         return SELECT.from(Users); // fetch all users
    //     });


    this.on('READ', 'StatusValues', (req) => {
        return [
            { code: 'COMPLETED'},
            { code: 'IN_PROGRESS'},
            { code: 'ON_HOLD'},
            { code: 'YET_TO_START'}
        ]
    })

        this.on("login", async (req) => {
            console.log('op');
            const { username, password } = req.data;
            console.log("Login attempt:", username, password);

            const user = await SELECT.one
            .from(Users)
            .where({ username, active: true });
            console.log("User found:", user);

          if (!user) return false; // instead of reject
            if (user.password !== password) return false;

        return true;
        });

    // 🚫 Block all non-READ operations (extra safety)
    const rejectWrite = req =>
        req.reject(405, 'Write operations are not allowed');

    this.on(['CREATE', 'UPDATE', 'DELETE'], rejectWrite);
    // Delegate requests to the underlying generic service
    return super.init()

    const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

  this.on('logout', req => {
    // For XSUAA / BTP authentication
    req._.res.redirect('/logout');
  });

});

}}