# jobcore
Submission for UWB Hacks the Cloud 2020

## Setup and Running
Package dependencies (Tested on Debian, but should be the same names
for similar distros):
- `python3`
- `python3-pyvenv`

After installing the required dependencies, run in bash:

```bash
$ cd jobcore
$ cp config.json.template config.json
$ edit config.json # fill with your own configuration
$ openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 \
      -keyout key.pem -out cert.pem
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ pip -r requirements.txt
(venv) $ flask run
```
