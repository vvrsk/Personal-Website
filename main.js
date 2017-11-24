function switchON(){
    alert("Inside Connect");
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

function switchOFF(){
     alert("Inside Off");
}
