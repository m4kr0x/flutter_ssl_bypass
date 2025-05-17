function hookVerifyCert() {
    var base = Process.findModuleByName("libflutter.so").base;
    var offset = 0x2084644;  // Change this value
    var addr = base.add(offset);

    console.log("[*] Hooking function at: " + addr);

    Interceptor.attach(addr, {
        onLeave: function (retval) {
            console.log("[*] Original retval: " + retval);
            retval.replace(0x1); // force true
            console.log("[+] SSL certificate validation bypassed");
        }
    });
}

setTimeout(hookVerifyCert, 1000);
