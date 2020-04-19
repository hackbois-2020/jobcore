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
    # company status title salary
    jobs = [
            {
                'company': 'Boing',
                'status': 'hiring',
                'title': 'plan enginer',
                'salary': 1
            },
            {
                'company': 'Michaelsoft',
                'status': 'hiring freeze',
                'title': 'shiftwere dev loper',
                'salary': 100
            }
    ]
    return render_template('index.html', title='Home', jobs=jobs)

@app.route("/api/companies/<int:length>/<int:offset>")
def companies(length, offset=0):
    data = json.dumps(db.get_companies(length, offset), default=default)
    return Response(data, mimetype='application/json')
