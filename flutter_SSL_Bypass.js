function waitForFlutterAndHook() {
    var moduleName = "libflutter.so";
    var interval = setInterval(function () {
        var module = Process.findModuleByName(moduleName);
        if (module !== null) {
            clearInterval(interval);

            var offset = 0x2084644; // Change this value
            var addr = module.base.add(offset);
            console.log("[*] Hook function at: " + addr);

            Interceptor.replace(addr, new NativeCallback(function () {
                console.log("[+] SSL cert bypassed ");
                return 1;
            }, 'int', []));
        } else {
            console.log("[*] Waiting for libflutter.so...");
        }
    }, 500);
}

setImmediate(waitForFlutterAndHook);

