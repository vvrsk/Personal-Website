var PLUG_ATTRIBUTE_HANDLE = 0x2B;

(function() {
    'use strict';

    class IQPlug{
        constructor() {
            this.device = null;
            this.server = null;
            this._characteristics = new Map();

        }

        connect() {
            return navigator.bluetooth.requestDevice({filters:[{services:['IQ_Plug']}]})
                .then(device => {
                console.log(device.name);
                console.log('Here-esrvice');
                this.device = device;
                return device.gatt.connect();
            })
                .then(server => {
                this.server = server;
                return Promise.all([
                    server.getPrimaryService('IQ_Plug')
                    .then(service => {   
                        /* return Promise.all([
             this._cacheCharacteristic(service, 'gattWriteCharacteristicValue'), //replace - Charecteristic ID of the plug control
            ]) */
                        console.log('Here');
                        var data = PLUG_ATTRIBUTE_HANDLE;
                        console.log('Here');
                        return characteristic.writeValue(data);
                    })
                ]);
            })
                .catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })

        }

        // Find the appropriate function for passing the start/ stop command

        startButtonAction() {
            alert("Inside StartButton");
            return this._startNotifications('IQ_Plug');
        }
        stopButtonAction() {
            alert("Inside StopButton");
            return this._stopNotifications('IQ_Plug');
        }


        /* Utils */

        _cacheCharacteristic(service, characteristicUuid) {
            return service.getCharacteristic(characteristicUuid)
                .then(characteristic => {
                this._characteristics.set(characteristicUuid, characteristic);
            });
        }
        _startNotifications(characteristicUuid) {
            let characteristic = this._characteristics.get(characteristicUuid);
            // Returns characteristic to set up characteristicvaluechanged event
            // handlers in the resolved promise.
            return characteristic.startNotifications()
                .then(() => characteristic);
        }
        _stopNotifications(characteristicUuid) {
            let characteristic = this._characteristics.get(characteristicUuid);
            // Returns characteristic to remove characteristicvaluechanged event
            // handlers in the resolved promise.
            return characteristic.stopNotifications()
                .then(() => characteristic);
        }
    }
    console.log("Hello");
    window.iQPlug = new IQPlug();

    window.addEventListener("load", function() {
        document.getElementById('onButton').addEventListener('click', function() {
            iQPlug.startButtonAction();
        });
        document.getElementById('offButton').addEventListener('click', function() {
            iQPlug.stopButtonAction();
        });
    }, false);

    console.log("Hello - Hi");
} )();