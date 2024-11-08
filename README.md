# ws-test

Test your websocket interactions on OpenShift

NOTE: Websocket connections can only be upgraded from http to ws, or from https to wss

To use https+wss, make sure to mount secrets as files:

 * `public.crt`
 * `private.key`

Or, expose secrets as environment variables: `PUBLIC_CRT` `PRIVATE_KEY`

If secrets are not found, this app will default to http+ws only.

## OpenShift

Websocket connections will work successfully when connecting over http/ws, or when using a "passthrough" Route for full https+wss support.

WARNING: You may be tempted to use an "edge" Route with SSL termination for this app.  Edge Routes can allow developers to simplify to "http" only, and to avoid using certificates in their server config.  However, edge terminated Routes will NOT allow a connection upgrade from http to wss since the protocol is mismatched.  Your webserver must be configured for direct https connections using TLS certs in order to successfully negotiate the wss connection upgrade.  This is why passthrough Routes are required for wss connectivity.

## Local Dev

1. Generate a [localhost certificate](https://letsencrypt.org/docs/certificates-for-localhost/) for dev testing:
```bash
openssl req -x509 -out public.crt -keyout private.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
2. Install dependencies:
```
npm install
```
3. Start the webserver:
```
npm start
```
4. Connect to the webserver at [https://localhost:8080/](https://localhost:8080/)
