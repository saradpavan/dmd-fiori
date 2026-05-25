const cds = require('@sap/cds');
const { Pool } = require('pg');

let loginPool;

function getLoginPool() {
    if (loginPool) return loginPool;

    if (process.env.DATABASE_URL) {
        loginPool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        return loginPool;
    }

    loginPool = new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: { rejectUnauthorized: false }
    });

    return loginPool;
}

async function queryRows(sql, params = []) {
    const result = await getLoginPool().query(sql, params);
    return result.rows;
}

function statusCriticalityExpression(alias = '') {
    const prefix = alias ? `${alias}.` : '';
    return `CASE
        WHEN ${prefix}status = 'COMPLETED' THEN 3
        WHEN ${prefix}status = 'IN_PROGRESS' THEN 2
        WHEN ${prefix}status = 'ON_HOLD' THEN 1
        WHEN ${prefix}status = 'YET_TO_START' THEN 5
        ELSE 0
    END`;
}

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

    this.on('READ', 'Waves', async () => queryRows(`
        SELECT
            id AS "ID",
            name,
            startdate AS "startDate",
            enddate AS "endDate",
            actualstartdate AS "actualStartDate",
            actualenddate AS "actualEndDate",
            status,
            ${statusCriticalityExpression()} AS "StatusCriticality",
            rag,
            CASE
                WHEN rag = 'G' THEN 3
                WHEN rag = 'A' THEN 2
                WHEN rag = 'R' THEN 1
                ELSE 0
            END AS "ragCriticality",
            completionpercent AS "completionPercent",
            ${statusCriticalityExpression()} AS "progressCriticality"
        FROM migration_waves
        ORDER BY id
    `));

    this.on('READ', 'Rollouts', async () => queryRows(`
        SELECT
            id AS "ID",
            name,
            status,
            ${statusCriticalityExpression()} AS "StatusCriticality",
            startdate AS "startDate",
            actualstartdate AS "actualStartDate",
            reason,
            lastmodifiedat AS "lastModifiedAt",
            waves_id AS "waves_ID"
        FROM migration_rollouts
        ORDER BY id
    `));

    this.on('READ', 'Mocks', async () => queryRows(`
        SELECT
            id AS "ID",
            name,
            status,
            CASE
                WHEN status = 'COMPLETED' THEN 'Completed'
                WHEN status = 'IN_PROGRESS' THEN 'In Progress'
                WHEN status = 'ON_HOLD' THEN 'On Hold'
                WHEN status = 'YET_TO_START' THEN 'Yet to Start'
                ELSE status
            END AS "StatusText",
            ${statusCriticalityExpression()} AS "StatusCriticality",
            startdate AS "startDate",
            enddate AS "endDate",
            completionpercent AS "completionPercent",
            rollouts_id AS "rollouts_ID"
        FROM migration_mocks
        ORDER BY id
    `));

    this.on('READ', 'Streams', async () => queryRows(`
        SELECT id, name
        FROM migration_streams
        ORDER BY id
    `));

    this.on('READ', 'Objects', async () => queryRows(`
        SELECT id, name
        FROM migration_objects
        ORDER BY id
    `));

    this.on('READ', 'Mockstream', async () => queryRows(`
        SELECT
            mockstreamid AS "mockStreamId",
            startdate AS "startDate",
            enddate AS "endDate",
            status,
            mock_id AS "mock_ID",
            stream_id AS "stream_id"
        FROM migration_mockstream
        ORDER BY mockstreamid
    `));

    this.on('READ', 'MockStreamObjects', async () => queryRows(`
        SELECT
            id AS "ID",
            datatype AS "dataType",
            extractionmethod AS "extractionMethod",
            transformationmethod AS "transformationMethod",
            loadingmethod AS "loadingMethod",
            totalrecords AS "totalRecords",
            recordsloaded AS "recordsLoaded",
            remarks,
            startdate AS "startDate",
            enddate AS "endDate",
            mockstream_mockstreamid AS "mockStream_mockStreamId",
            object_id AS "object_id"
        FROM migration_mockstreamobjects
        ORDER BY id
    `));

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
                const result = await getLoginPool().query(
                    `SELECT username, password, active
                       FROM migration_users
                      WHERE LOWER(TRIM(username)) = LOWER(TRIM($1))
                      LIMIT 1`,
                    [username]
                );
                const user = result.rows && result.rows[0];

                console.log("Login lookup:", {
                    username,
                    rows: result.rowCount,
                    found: Boolean(user),
                    active: user && user.active,
                    passwordMatches: Boolean(user) && String(user.password || '').trim() === password
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
