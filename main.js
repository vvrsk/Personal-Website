function switchON(){
    alert("Inside Connect");
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    var value = new ArrayBuffer(16);
    value = 0x002b;
    BluetoothGattCharacteristic charac = null;
	charac.setValue(value);
				
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
                .then(
				
				service => {   
                    return service.getCharacteristic('0000fff1-0000-1000-8000-00805f9b34fb'); // replace charecteristic
						 })
				.then(function(characteristic) {
                        console.log('In charecteristic');
                        return characteristic.writeValue(charac);  //The ON-OFF Command
                    })
                ]);
            })
                .catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })

}
function switchOFF(){
     alert("Inside Off");
}
