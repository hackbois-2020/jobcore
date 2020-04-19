import datetime
import json

from flask import Flask
from flask import render_template
from flask import Response

import db
app = Flask(__name__)

def default(o):
    """Convert non-JSON serializable objects to their equivalent"""
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()

@app.route("/")
def index():
    return render_template('index.html', title='Home')

@app.route("/api/companies/<int:length>/<int:offset>")
def companies(length, offset=0):
    data = json.dumps(db.get_companies(length, offset), default=default)
    return Response(data, mimetype='application/json')

@app.route("/api/jobs/<string:company_name>")
def jobs(company_name):
    data = json.dumps(db.get_jobs(company_name), default=default)
    return Response(data, mimetype='application/json')
