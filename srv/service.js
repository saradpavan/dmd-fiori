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
            const username = String(req.data.username || '').trim();
            const password = String(req.data.password || '').trim();

            if (!username || !password) return false;

            if (
                process.env.LOGIN_USERNAME &&
                process.env.LOGIN_PASSWORD &&
                username === process.env.LOGIN_USERNAME &&
                password === process.env.LOGIN_PASSWORD
            ) {
                return true;
            }

            try {
                const tx = cds.tx(req);
                const rows = await tx.run(
                    `SELECT username, password, active
                       FROM migration_users
                      WHERE LOWER(TRIM(username)) = LOWER(TRIM($1))
                      LIMIT 1`,
                    [username]
                );
                const user = rows && rows[0];

                console.log("Login lookup:", {
                    username,
                    found: Boolean(user),
                    active: user && user.active
                });

                if (!user) return false;
                if (![true, 'true', 't', '1', 1].includes(user.active)) return false;
                if (String(user.password || '').trim() !== password) return false;

                return true;
            } catch (error) {
                console.error("Login failed:", error);
                return false;
            }
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
