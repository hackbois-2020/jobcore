from flask import render_template
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    content = {
            'message': 'Lorem ipsum lol'
    }

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
    return render_template('index.html', title='Home', content=content, jobs=jobs)
