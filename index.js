const logger = require('./src/lib/logger');
const smartui = require('./src/smartui');

async function smartuiSnapshot(t, snapshotName) {
    if (!t) throw new Error("The test function's `t` argument is required.");
    if (!snapshotName) throw new Error('The `name` argument is required.');
    if (!(await smartui.isSmartUIRunning())) throw new Error('SmartUI server is not running.');

  
    let log = logger("@lambdatest/lambdatest-testcafe-sdk");

    try {
        // Inject the DOM serialization script
        /* eslint-disable-next-line no-new-func */
        const resp = await smartui.fetchDOMSerializer();

        await t.eval(new Function(resp.body.data.dom), { boundTestRun: t });

        // Serialize and capture the DOM
        /* istanbul ignore next: no instrumenting injected code */
        let { dom } = await t.eval((options) => ({
            /* eslint-disable-next-line no-undef */
            dom: SmartUIDOM.serialize(options),
        }), { boundTestRun: t, dependencies: {} });

        await smartui.postSnapshot(dom.html, snapshotName, 'testcafe' );
        log.info(`Snapshot captured: ${snapshotName}`);
    } catch (error) {
        // Handle errors
        log.error(`Could not take DOM snapshot "${snapshotName}"`);
        log.error(error);
    }
}

module.exports = smartuiSnapshot;

