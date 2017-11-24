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
                    server.getPrimaryService('00001800-0000-1000-8000-00805f9b34fb')
                    .then(service => {   
                        /* return Promise.all([
             this._cacheCharacteristic(service, 'gattWriteCharacteristicValue'), //replace - Charecteristic ID of the plug control
            ]) */
                        console.log('Here');
                        var data = 0x002b;
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

function switchOFF(){
     alert("Inside Off");
}
