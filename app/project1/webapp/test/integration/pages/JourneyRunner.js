sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"project1/test/integration/pages/WavesList",
	"project1/test/integration/pages/WavesObjectPage"
], function (JourneyRunner, WavesList, WavesObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('project1') + '/test/flp.html#app-preview',
        pages: {
			onTheWavesList: WavesList,
			onTheWavesObjectPage: WavesObjectPage
        },
        async: true
    });

    return runner;
});

