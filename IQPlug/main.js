function switchOFF(){
    alert("Inside Connect");
	
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    var value = new Uint8Array([0x0F, 0x06, 0x03, 0x00, 0x00, 0x00, 0x00, 0x04, 0xFF, 0xFF]);
				
			return navigator.bluetooth.requestDevice(options)
                .then(device => {
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
                    return characteristic.writeValue(value);  //The ON-OFF Command by writing to characteristic
						})
                ]);
            }) 
		
                .catch(function(error) {
                // And of course, error handling!
                console.error('Connection failed!', error);
            })

}


function switchON(){
    alert("Inside Connect");
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    var value = new Uint8Array([0x0F, 0x06, 0x03, 0x00, 0x01, 0x00, 0x00, 0x05, 0xFF, 0xFF]);
	console.log(value);
   				
			return navigator.bluetooth.requestDevice(options)
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
					return characteristic.writeValue(value);  //The ON-OFF Command by writing to characteristic
						})
                ]);
            }) 
		
                .catch(function(error) {
                // And of course, error handling!
                console.error('Connection failed!', error);
            })

}


function switchREAD(){
    alert("Inside Read");
	var myCharacteristic;
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;	
	return navigator.bluetooth.requestDevice(options)
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
			myCharacteristic = characteristic;
			return myCharacteristic.startNotifications()
			.then(_ => {
			  console.log('> Notifications started');
			  myCharacteristic.addEventListener('characteristicvaluechanged',
				  handleNotifications);
				});
			})
		.catch(function(error) {
		// And of course: error handling!
		console.error('Connection failed!', error);
	})
}
	/*
	alert("Inside Read");
	var myCharacteristic;
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
				
	return navigator.bluetooth.requestDevice(options)
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
*/

function switchSRVCHAR() {
  
   console.log("Requesting any Bluetooth Device...");
  navigator.bluetooth.requestDevice({
  acceptAllDevices: true
	 })
  .then(device => {
    console.log("Connecting to GATT Server...");
    return device.gatt.connect();
  })
  .then(server => {
    console.log("Getting Services...");
    return server.getPrimaryServices();
  })
  .then(services => {
    console.log("Getting Characteristics...");
    let queue = Promise.resolve();
    services.forEach(service => {
      queue = queue.then(_ => service.getCharacteristics()
		 .then(characteristics => {
		   console.log("> Service: " + service.uuid);
			characteristics.forEach(characteristic => {
				
			return	('>> Characteristic: ' + characteristic.uuid + ' ' +
              getSupportedProperties(characteristic));
				
			});
		  }));
    });
	
	document.getElementById('log').innerHTML = queue.value;
    //return queue;
  })
  .catch(error => {
    console.log('Error!! ' + error);
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



function findDevice(reading) {
	
	
	
	
}

/*Test Functions*/

/*FN  Switch read 2*/

// Notifications Read

function switchREAD2(){
    alert("Inside Read2");
	var myCharacteristic;
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;	
	return navigator.bluetooth.requestDevice(options)
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
			myCharacteristic = characteristic;
			return myCharacteristic.startNotifications()
			.then(_ => {
			  console.log('> Notifications started');
			  myCharacteristic.addEventListener('characteristicvaluechanged',
				  handleNotifications);
				});
			})
		.catch(function(error) {
		// And of course: error handling!
		console.error('Connection failed!', error);
	})
}


// Charecteristic vlaue changed value

function switchREAD3(){
    alert("Inside Read3");
	var myCharacteristic;
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    			
			return navigator.bluetooth.requestDevice(options)
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
					return service.getCharacteristic('0000fff6-0000-1000-8000-00805f9b34fb');
				  })
				.then( characteristic => { 
					console.log('> Inside Characteristic: ');
				return characteristic.readValue();
				})
				 .then(value => {
					 let a=[];
					console.log('Inside Value');
					console.log(value);
					for (let i = 0; i < value.byteLength; i++) {
							a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
						  }
					console.log('> ' + a.join(' '));
				  })
				.catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })
}


//Charecteristic Values Changed 
function switchREAD4(){
 alert("Inside Read4");
	var myCharacteristic;
	let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;
    			
			return navigator.bluetooth.requestDevice(options)
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
					return service.getCharacteristic('0000fff6-0000-1000-8000-00805f9b34fb');
				  })
				.then( characteristic => { 
					console.log('> Inside Characteristic: ');
				return characteristic.readValue();
				})
				 .then(value => {
					 let a=[];
					console.log('Inside Value');
					console.log(value);
					for (let i = 0; i < value.byteLength; i++) {
							a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
						  }
					console.log('> ' + a.join(' '));
				  })
				.catch(function(error) {
                // And of course: error handling!
                console.error('Connection failed!', error);
            })
}


/* Fn Switch 2 - End*/

/* Function Switch Read 5*/

//Async Notifications REad

async function switchREAD5(){

var myCharacteristic;
let options = {optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']};
	options.acceptAllDevices = true;

try {
    console.log('Requesting Bluetooth Device...');
    const device = await navigator.bluetooth.requestDevice(options);

    console.log('Connecting to GATT Server...');
    const server = await device.gatt.connect();

    console.log('Getting Service...');
    const service = await server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb'); // REplace the Service ID

    console.log('Getting Characteristic...');
    myCharacteristic = await service.getCharacteristic('0000fff4-0000-1000-8000-00805f9b34fb'); // Replace Charecteristic UUID

    await myCharacteristic.startNotifications();

    console.log('> Notifications started');
    myCharacteristic.addEventListener('characteristicvaluechanged',
        handleNotifications2);
  } catch(error) {
    console.log('Argh! ' + error);
  }	
	
}




async function onStopButtonClick() {
  if (myCharacteristic) {
    try {
      await myCharacteristic.stopNotifications();
      console.log('> Notifications stopped');
      myCharacteristic.removeEventListener('characteristicvaluechanged',
          handleNotifications);
    } catch(error) {
      console.log('Argh! ' + error);
    }
  }
}

function handleNotifications2(event) {
  let value = event.target.value;
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  console.log('> ' + a.join(' '));
}





