'use strict';

module.exports = function (controller) {

    const updateProbeState = (status) => {

        let probeClosed = false;

        // GRBL reports active pins in Pn:
        // Example:
        // Pn:P     -> Probe active
        // Pn:XYZP  -> Probe and other inputs active

        if (status && status.pn) {
            probeClosed = status.pn.includes('P');
        }

        const indicator = document.getElementById('probe-indicator');

        if (!indicator) {
            return;
        }

        if (probeClosed) {
            indicator.innerHTML = '🟢 Probe Touching';
            indicator.style.backgroundColor = '#1f7a1f';
        } else {
            indicator.innerHTML = '⚪ Probe Detached';
            indicator.style.backgroundColor = '#de1616';
        }
    };

    controller.on('status', (status) => {
        updateProbeState(status);
    });
};
