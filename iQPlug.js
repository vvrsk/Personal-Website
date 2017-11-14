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
             this._cacheCharacteristic(service, 'replace'), //replace - Charecteristic ID of the plug control
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

 // Dummy Code stubs for future--- Change based on requirements  --> Inspired by Heart Rate Monitor Example
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
	  return characteristic.startNotifications()
      .then(() => characteristic);
    }
    _stopNotifications(characteristicUuid) {
      let characteristic = this._characteristics.get(characteristicUuid);
      return characteristic.stopNotifications()
      .then(() => characteristic);
    }
  }
  console.log("Test - 1");
  window.iQPlug = new IQPlug();
  console.log("Test - 2");
  } )();