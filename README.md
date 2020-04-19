# jobcore
Submission for UWB Hacks the Cloud 2020

## Setup and Running
Package dependencies (Tested on Debian, but should be the same packages
for similar distros):
- `python3`
- `python3-pyvenv`

For debian or ubuntu:
```bash
sudo apt-get update && sudo apt-get install python3 python3-pyvenv
```

Then, grab `config.json` from one of the teammates -- it's not in the
repo because it's got compromising information, e.g. the password to
the SQL server. Add it to the root folder, right next to `config.py`.

After installing the required dependencies, run in bash:

```bash
$ cd jobcore
$ cp config.json.template config.json
$ edit config.json # fill with your own configuration
$ openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 \
      -keyout key.pem -out cert.pem
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ pip install -r requirements.txt
(venv) $ flask run
```
