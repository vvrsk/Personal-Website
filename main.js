function switchON(){
    alert("Inside Connect");
	let options = {};
	options.acceptAllDevices = true;
            return navigator.bluetooth.requestDevice(options)//requestDevice({filters:[{services:['SATECHIPLUG']}]})
                .then(device => {
                console.log(device.name);
                console.log('Here-esrvice');
                this.device = device;
                return device.gatt.connect();
            })
                .then(server => {
                this.server = server;
                return Promise.all([
                    server.getPrimaryService('00001801-0000-1000-8000-00805f9b34fb') //Replace the service value
                .then(
				
				service => {   
                    return service.getCharacteristic('00002a05-0000-1000-8000-00805f9b34fb'); // replace charecteristic
						 })
				.then(function(characteristic) {
                        console.log('Its here in charecteristic');
                        return characteristic.writeValue(0x002b);
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
