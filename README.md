# ws-test

test your websocket interactions on OpenShift

To use https, make sure to mount secrets:

 * public.crt 
 * private.key

If secrets are not found, this app will default to http

## Local Dev

1. Generate a [localhost certificate](https://letsencrypt.org/docs/certificates-for-localhost/) for dev testing:
```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
2. Rename the certificates:
```
mv localhost.crt public.crt
mv localhost.key private.key
```
3. `npm install`
4. `npm start`
