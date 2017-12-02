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
					log('Getting Service...');
					return server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb');
					})
					.then(service => {
					log('Getting Characteristic...');
					return service.getCharacteristic('0000fff4-0000-1000-8000-00805f9b34fb');
				  })
				  .then(characteristic => {
					myCharacteristic = characteristic;
					return myCharacteristic.startNotifications().then(_ => {
					  log('> Notifications started');
					  myCharacteristic.addEventListener('characteristicvaluechanged',
						  handleNotifications);
					});
				  })
				  .catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })
}
