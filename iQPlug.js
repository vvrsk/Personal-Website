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
      return navigator.bluetooth.requestDevice({filters:[{services:['SATECHIPLUG']}]})
      .then(device => {
        console.log(device.name);
		console.log('Here-esrvice');
		this.device = device;
        return device.gatt.connect();
      })
      .then(server => {
        this.server = server;
        return Promise.all([
			server.getPrimaryService('SATECHIPLUG')
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
      return this._startNotifications('SATECHIPLUG');
    }
    stopButtonAction() {
      return this._stopNotifications('SATECHIPLUG');
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
  console.log("Hello - Hi");
  } )();