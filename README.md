# Flutter SSL Bypass

This repo provides a simple Frida script to disable SSL certificate validation in Flutter-based Android applications. It works by hooking into the native certificate verification function inside `libflutter.so`.


### Usage
#### 1. Configure Burp Suite
- Listen to all interfaces on port 8083 (or any of your choice).
![image](https://github.com/user-attachments/assets/ef856bd7-500a-4ddc-badd-085633719f02)

- Check ✅ "Support invisible proxying"
![image](https://github.com/user-attachments/assets/03920520-a342-4c0d-9175-ba57406e5be8)
#### 2. Redirect Android Traffic to Burp
On your rooted Android device or emulator, execute the following commands:
```bash
adb shell
su
iptables -t nat -A OUTPUT -p tcp --dport 443 -j DNAT --to-destination Burp_IP:Burp_Port
iptables -t nat -A OUTPUT -p tcp --dport 80 -j DNAT --to-destination Burp_IP:Burp_Port
```
> Replace Burp_IP and Burp_Port with the actual IP and port you set in Burp Suite.
#### 3. Update the Script Offset
You must locate the offset for the function `ssl_crypto_x509_session_verify_cert_chain` inside `libflutter.so`. 
> Refer to the 📖 [Full Article](https://m4kr0x.medium.com/flutter-tls-bypass-how-to-intercept-https-traffic-when-all-other-frida-scripts-fail-bd3d04489088) to learn how to extract this using Ghidra.

#### 4. Run the Frida Script
Once you've updated the offset, execute the script using Frida 
```bash
frida -U -f your.package.name -l flutter_ssl_bypass.js
```
> Replace your.package.name with the actual package name of the target app.



### 📖 Full Article
To learn more about:
- Reversing libflutter.so
- Extracting the correct function offset
👉 Check out the full guide [here](https://m4kr0x.medium.com/flutter-tls-bypass-how-to-intercept-https-traffic-when-all-other-frida-scripts-fail-bd3d04489088).



