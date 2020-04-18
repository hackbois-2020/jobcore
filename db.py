from dotmap import DotMap
import mysql.connector
from config import Config

_sql = DotMap(Config.sql)

_db = mysql.connector.connect(
    host = _sql.server,
    user = _sql.username,
    passwd = _sql.password,
    database = _sql.database,
    ssl_ca='cert.pem'
)

_cursor = _db.cursor()

def get_jobs():
    _cursor.execute('SELECT * FROM COMPANY')
    return _cursor.fetchall()

def close_connection():
    _db.commit()
    _cursor.close()
    _db.close()

if __name__ == '__main__':
    for job in get_jobs():
        print(job)
    close_connection()
