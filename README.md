# ws-test

test your websocket interactions on OpenShift

To use https, make sure to mount secrets:

 * public.key
 * private.crt 

If secrets are not found, this app will default to http

## Local Dev

1. Generate a localhost certificate for dev testing:
```bash
   openssl req -x509 -out localhost.crt -keyout localhost.key   -newkey rsa:2048 -nodes -sha256   -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
2. Rename the certificates:
```
mv localhost.cert private.crt   
mv localhost.key public.key
```
3. `npm install`
4. `npm start`
