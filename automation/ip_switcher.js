// BunnyEra Automation - IP Switcher Module
// Wraps WireGuard CLI for IP rotation
// 规则：所有 IP 切换逻辑必须调用 WireGuard CLI

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class IPSwitcher {
    constructor(configPath) {
        this.configPath = configPath || 'C:\\Program Files\\WireGuard\\Data\\Configurations';
    }

    async connect(profileName) {
        console.log(`[IPSwitcher] Connecting to WireGuard profile: ${profileName}...`);
        try {
            // 使用 wireguard.exe /installtunnelservice 
            await execPromise(`wireguard /installtunnelservice "${this.configPath}\\${profileName}.conf"`);
            console.log(`[IPSwitcher] Connected to ${profileName}`);
            return true;
        } catch (error) {
            console.error(`[IPSwitcher] Connection failed: ${error.message}`);
            return false;
        }
    }

    async disconnect(profileName) {
        console.log(`[IPSwitcher] Disconnecting from ${profileName}...`);
        try {
            await execPromise(`wireguard /uninstalltunnelservice ${profileName}`);
            console.log(`[IPSwitcher] Disconnected`);
            return true;
        } catch (error) {
            console.error(`[IPSwitcher] Disconnect failed: ${error.message}`);
            return false;
        }
    }
}

module.exports = new IPSwitcher();
