from dotmap import DotMap
import json

Config = {}
with open('config.json') as f:
    Config = DotMap(json.load(f))

if __name__ == '__main__':
    print(Config)
