# Flutter SSL Bypass

A simple Frida script to disable SSL certificate validation in Android applications based on flutter . It works by hooking into the native certificate verification function inside `libflutter.so`.

> Tested on AVD and genymotion with android 11 based on x86_64
### Usage
#### 1. Configure Burp Suite
- Listen to all interfaces on port 8083 (or any of your choice).
![image](https://github.com/user-attachments/assets/9d7aee04-1b88-4912-9d23-2845034c759e)

- Check ✅ "Support invisible proxying"
![image](https://github.com/user-attachments/assets/4e179ccb-5a4d-4baf-b7f1-d89c75be745a)
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



