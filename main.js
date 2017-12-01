function switchON(){
    alert("Inside Connect");
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    var value = new Array([0x030004]);
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
				 console.log(charecteristic);
				 console.log(value);
                 return characteristic.writeValue(value);  //The ON-OFF Command
						})
                ]);
            }) 
			
			/*return navigator.bluetooth.requestDevice(options)//requestDevice({filters:[{services:['SATECHIPLUG']}]})
                .then(device => device.gatt.connect())
                .then(server => server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb')) //Replace the service value
                .then(service => {
						service.getCharacteristic('0000fff3-0000-1000-8000-00805f9b34fb'); // replace charecteristic
						 })
				.then(function(characteristic){
                 console.log('In charecteristic');
				 console.log(characteristic);
				 console.log(value);
                 return characteristic.writeValue(value);  //The ON-OFF Command
						}) */
                .catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })

}
function switchOFF(){
     alert("Inside Off");
}
