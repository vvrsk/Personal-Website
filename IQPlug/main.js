function switchOFF(){
    alert("Inside Connect");
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    var value = new Uint8Array([0x0F, 0x06, 0x03, 0x00, 0x00, 0x00, 0x00, 0x04, 0xFF, 0xFF]);
	console.log(value);
    //value[0] = 0x002b;
    //BluetoothGattCharacteristic charac = null;
	//charac.setValue(value);
				
			return navigator.bluetooth.requestDevice(options)//requestDevice({filters:[{services:['SATECHIPLUG']}]})
                .then(device => {
                console.log(device.name);
                console.log('In-service');
                this.device = device;
                return device.gatt.connect();
						})
                .then(server => {
                this.server = server;
                return Promise.all([
                    server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb') //Replace the service value
                .then( service => {   
                return service.getCharacteristic('0000fff3-0000-1000-8000-00805f9b34fb'); // replace charecteristic
						 })
				.then(function(characteristic) {
                 console.log('In charecteristic');
				 console.log(characteristic);
				 console.log(value);
                 return characteristic.writeValue(value);  //The ON-OFF Command
						})
                ]);
            }) 
		
                .catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })

}


function switchON(){
    alert("Inside Connect");
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    var value = new Uint8Array([0x0F, 0x06, 0x03, 0x00, 0x01, 0x00, 0x00, 0x05, 0xFF, 0xFF]);
	console.log(value);
    //value[0] = 0x002b;
    //BluetoothGattCharacteristic charac = null;
	//charac.setValue(value);
				
			return navigator.bluetooth.requestDevice(options)//requestDevice({filters:[{services:['SATECHIPLUG']}]})
                .then(device => {
                console.log(device.name);
                console.log('In-service');
                this.device = device;
                return device.gatt.connect();
						})
                .then(server => {
                this.server = server;
                return Promise.all([
                    server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb') //Replace the service value
                .then( service => {   
                return service.getCharacteristic('0000fff3-0000-1000-8000-00805f9b34fb'); // replace charecteristic
						 })
				.then(function(characteristic) {
                 console.log('In charecteristic');
				 console.log(characteristic);
				 console.log(value);
                 return characteristic.writeValue(value);  //The ON-OFF Command
						})
                ]);
            }) 
		
                .catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })

}


function switchREAD(){
    alert("Inside Read");
	var myCharacteristic;
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    			
			return navigator.bluetooth.requestDevice(options)//requestDevice({filters:[{services:['SATECHIPLUG']}]})
                .then(device => {
                console.log(device.name);
                console.log('In-service');
                this.device = device;
                return device.gatt.connect();
						})
				.then(server => {
					console.log('Getting Service...');
					return server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb');
					})
				.then(service => {
					console.log('Getting Characteristic...');
					return service.getCharacteristic('0000fff4-0000-1000-8000-00805f9b34fb');
				  })
				.then(characteristic => {
					//myCharacteristic = characteristic;
					//replace myCharecteristic with just charesteristic
					return characteristic.startNotifications().then(_ => {  
					  console.log('> Notifications started');
					  characteristic.addEventListener('characteristicvaluechanged', event => {
  
  console.log('Inside Notifications');	
  let value = event.target.value;
  console.log(event.target.value);
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  console.log('> ' + a.join(' '));
   
  
});
					  console.log('>Notifications should have printed');
					});
				  })
				 .catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })
}


/*FN  Switch read 2*/

function switchREAD2(){
    alert("Inside Read");
	var myCharacteristic;
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    			
			return navigator.bluetooth.requestDevice(options)//requestDevice({filters:[{services:['SATECHIPLUG']}]})
                .then(device => {
                console.log(device.name);
                console.log('In-service');
                this.device = device;
                return device.gatt.connect();
						})
				.then(server => {
					console.log('Getting Service...');
					return server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb');
					})
				.then(service => {
					console.log('Getting Characteristic...');
					return service.getCharacteristic('0000fff2-0000-1000-8000-00805f9b34fb');
				  })
				.then(characteristic => characteristic.startNotifications())
					//myCharacteristic = characteristic;
					//replace myCharecteristic with just charesteristic
					//return characteristic.startNotifications()
				 .then(characteristic => {  
					  console.log('> Notifications started');
					  characteristic.addEventListener('characteristicvaluechanged', event => {
  
  console.log('Inside Notifications');	
  let value = event.target.value;
  console.log(event.target.value);
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  console.log('> ' + a.join(' '));
   
});
					  console.log('>Notifications should have printed');
					});
				.catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })
}


/* Fn Switch 2 - End*/
function switchSRVCHAR() {
 
  // Validate services UUID entered by user first.
  let optionalServices = document.querySelector('').value
    .split(/, ?/).map(s => s.startsWith('0x') ? parseInt(s) : s)
    .filter(s => s && BluetoothUUID.getService);
 
 
  console.log('Requesting any Bluetooth Device...');
  navigator.bluetooth.requestDevice({
   // filters: [...] <- Prefer filters to save energy & show relevant devices.
      acceptAllDevices: true,
      optionalServices: optionalServices})
  .then(device => {
    console.log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
  .then(server => {
    // Note that we could also get all services that match a specific UUID by
    // passing it to getPrimaryServices().
    console.log('Getting Services...');
    return server.getPrimaryServices();
  })
  .then(services => {
    console.log('Getting Characteristics...');
    let queue = Promise.resolve();
    services.forEach(service => {
      queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
        console.log('> Service: ' + service.uuid);
        characteristics.forEach(characteristic => {
          console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
              getSupportedProperties(characteristic));
        });
      }));
    });
    return queue;
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}

/* Utils */

function getSupportedProperties(characteristic) {
  let supportedProperties = [];
  for (const p in characteristic.properties) {
    if (characteristic.properties[p] === true) {
      supportedProperties.push(p.toUpperCase());
    }
  }
  return '[' + supportedProperties.join(', ') + ']';
}


function handleNotifications(event) {
  console.log('Inside Notifications');	
  let value = event.target.value;
  console.log(event.target.value);
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  console.log('> ' + a.join(' '));
   
  
}