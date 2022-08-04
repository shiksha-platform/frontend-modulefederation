- Download Prebuilt Binary - https://github.com/oauth2-proxy/oauth2-proxy/releases and extract the file to folder `/usr/local/bin`
- Create `oauth2-proxy.cfg` in `/etc/oauth2-proxy`

```
## OAuth2 Proxy Config File
## https://github.com/oauth2-proxy/oauth2-proxy


# ./oauth2-proxy --config=./oauth2-proxy-frontend.cfg --oidc-issuer-url="https://dev-shiksha.uniteframework.io/auth/realms/sunbird-rc"  --redirect-url="http://localhost:4181/oauth2/callback" --insecure-oidc-allow-unverified-email --pass-authorization-header=true
# ./oauth2-proxy --config=./oauth2-proxy-frontend.cfg --oidc-issuer-url="http://localhost:8080/auth/realms/shiksha"  --redirect-url="http://localhost:4181/oauth2/callback" --insecure-oidc-allow-unverified-email --pass-authorization-header=true
#

## <addr>:<port> to listen on for HTTP/HTTPS clients
 http_address = "127.0.0.1:4181"
# https_address = ":443"

## Are we running behind a reverse proxy? Will not accept headers like X-Real-Ip unless this is set.
# reverse_proxy = true

## TLS Settings
# tls_cert_file = ""
# tls_key_file = ""

## the OAuth Redirect URL.
# defaults to the "https://" + requested host header + "/oauth2/callback"
# redirect_url = "https://internalapp.yourcompany.com/oauth2/callback"

## the http url(s) of the upstream endpoint. If multiple, routing is based on path
 upstreams = [
     "http://localhost:3000/api/",
     "http://localhost:4000/"
 ]

## Logging configuration
#logging_filename = ""
#logging_max_size = 100
#logging_max_age = 7
#logging_local_time = true
#logging_compress = false
#standard_logging = true
#standard_logging_format = "[{{.Timestamp}}] [{{.File}}] {{.Message}}"
request_logging = true
request_logging_format = "{{.Client}} - {{.Username}} [{{.Timestamp}}] {{.Host}} {{.RequestMethod}} {{.Upstream}} {{.RequestURI}} {{.Protocol}} {{.UserAgent}} {{.StatusCode}} {{.ResponseSize}} {{.RequestDuration}}"
#auth_logging = true
#auth_logging_format = "{{.Client}} - {{.Username}} [{{.Timestamp}}] [{{.Status}}] {{.Message}}"

## pass HTTP Basic Auth, X-Forwarded-User and X-Forwarded-Email information to upstream
# pass_basic_auth = true
# pass_user_headers = true
## pass the request Host Header to upstream
## when disabled the upstream Host is used as the Host Header
# pass_host_header = true

## Email Domains to allow authentication for (this authorizes any email on this domain)
## for more granular authorization use `authenticated_emails_file`
## To authorize any email addresses use "*"
# email_domains = [
#     "yourcompany.com"
# ]
email_domains = "*"
## The OAuth Client ID, Secret
 provider="oidc"
 client_id = "shiksha-test"
 client_secret = "shiksha-test"

 #client_id = "registry-frontend"
 #client_secret = "registry-frontend"

# redirect-url = "http://localhost:4180/oauth2/callback"
# oidc-issuer-url="http://localhost:8080/auth/realms/shiksha"


## Pass OAuth Access token to upstream via "X-Forwarded-Access-Token"
# pass_access_token = false

## Authenticated Email Addresses File (one email per line)
# authenticated_emails_file = ""

## Htpasswd File (optional)
## Additionally authenticate against a htpasswd file. Entries must be created with "htpasswd -B" for bcrypt encryption
## enabling exposes a username/login signin form
# htpasswd_file = ""

## bypass authentication for requests that match the method & path. Format: method=path_regex OR path_regex alone for all methods
# skip_auth_routes = [
#   "GET=^/probe",
#   "^/metrics"
# ]

## Templates
## optional directory with custom sign_in.html and error.html
# custom_templates_dir = ""

## skip SSL checking for HTTPS requests
# ssl_insecure_skip_verify = false


## Cookie Settings
## Name     - the cookie name
## Secret   - the seed string for secure cookies; should be 16, 24, or 32 bytes
##            for use with an AES cipher when cookie_refresh or pass_access_token
##            is set
## Domain   - (optional) cookie domain to force cookies to (ie: .yourcompany.com)
## Expire   - (duration) expire timeframe for cookie
## Refresh  - (duration) refresh the cookie when duration has elapsed after cookie was initially set.
##            Should be less than cookie_expire; set to 0 to disable.
##            On refresh, OAuth token is re-validated.
##            (ie: 1h means tokens are refreshed on request 1hr+ after it was set)
## Secure   - secure cookies are only sent by the browser of a HTTPS connection (recommended)
## HttpOnly - httponly cookies are not readable by javascript (recommended)
 cookie_name = "_oauth2_proxy"
 cookie_secret = "LYm95P5YaQXb9eU5"
# cookie_domains = ""
# cookie_expire = "168h"
# cookie_refresh = ""
# cookie_secure = true
# cookie_httponly = true

```

- Configure as serice
  Create file `oauth2-proxy.service` in folder `/etc/systemd/system `
  Reference - https://github.com/oauth2-proxy/oauth2-proxy/blob/master/contrib/oauth2-proxy.service.example

```
[Unit]
Description=oauth2-proxy daemon service
After=syslog.target network.target

[Service]
# www-data group and user need to be created before using these lines
User=www-data
Group=www-data


ExecStart=/usr/local/bin/oauth2-proxy --config=/etc/oauth2-proxy/oauth2-proxy.cfg --oidc-issuer-url="https://dev-shiksha.uniteframework.io/auth/realms/sunbird-rc"  --redirect-url="http://sandbox.shikshaplatform.io:4181/oauth2/callback" --insecure-oidc-allow-unverified-email --pass-authorization-header=true

ExecReload=/bin/kill -HUP $MAINPID

KillMode=process
Restart=always

[Install]
WantedBy=multi-user.target
```

- Reload systemd with this new service unit file

```
systemctl daemon-reload
```

- Enable Service

```
systemctl enable oauth2-proxy.service
```

- Start Service

```
systemctl start oauth2-proxy
```

- Check service status
