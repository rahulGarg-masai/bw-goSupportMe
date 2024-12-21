// Device constructor
function Device(name, type, status) {
    this.name = name;
    this.type = type;
    this.status = status;
}

Device.prototype.turnOn = function() {
    this.status = "on";
};

Device.prototype.turnOff = function() {
    this.status = "off";
};

Device.prototype.checkStatus = function() {
    return this.status;
};

// SmartHome constructor
function SmartHome(owner) {
    this.owner = owner;
    this.devices = [];
}

SmartHome.prototype.addDevice = function(device) {
    this.devices.push(device);
};

SmartHome.prototype.removeDevice = function(deviceName) {
    this.devices = this.devices.filter(device => device.name !== deviceName);
};

SmartHome.prototype.listDevices = function() {
    return this.devices;
};

// SmartDevice constructor
function SmartDevice(name, type, status, brand, connectivity) {
    Device.call(this, name, type, status);
    this.brand = brand;
    this.connectivity = connectivity;
}

SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.constructor = SmartDevice;

SmartDevice.prototype.fetchFirmwareUpdate = async function() {
    return await new Promise(resolve => setTimeout(() => resolve("Firmware updated"), 1000));
};

SmartDevice.prototype.checkConnectivity = function() {
    return this.connectivity;
};

// SmartLight constructor
function SmartLight(name, type, status, brand, connectivity, brightness, color) {
    SmartDevice.call(this, name, type, status, brand, connectivity);
    this.brightness = brightness;
    this.color = color;
}

SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.constructor = SmartLight;

SmartLight.prototype.setBrightness = function(brightness) {
    this.brightness = brightness;
};

SmartLight.prototype.setColor = function(color) {
    this.color = color;
};

// SmartThermostat constructor
function SmartThermostat(name, type, status, brand, connectivity, temperature, mode) {
    SmartDevice.call(this, name, type, status, brand, connectivity);
    this.temperature = temperature;
    this.mode = mode;
}

SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.constructor = SmartThermostat;

SmartThermostat.prototype.setTemperature = function(temperature) {
    this.temperature = temperature;
};

SmartThermostat.prototype.setMode = function(mode) {
    this.mode = mode;
};

// User constructor
function User(username, password) {
    this.username = username;
    this.password = password;
}

User.prototype.authenticate = async function() {
    return await new Promise(resolve => setTimeout(() => resolve("Authenticated"), 1000));
};

User.prototype.manageSmartHome = function(smartHome) {
    this.smartHome = smartHome;
};
