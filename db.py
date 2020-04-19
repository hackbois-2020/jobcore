import json
from collections import namedtuple
from dotmap import DotMap
import mysql.connector
from config import Config

Company = namedtuple('COMPANY',
    'CompanyName Modified HiringStatus Comment')
JobDescription = namedtuple('JOBDESCRIPTION',
    'JobTitle Salary JobResponsibilities TimeCommitment TypeOfContract '
    'DateUpload ContractStart ContractDuration Link CompanyName')

_sql = DotMap(Config.sql)
_db = mysql.connector.connect(
    host = _sql.server,
    user = _sql.username,
    passwd = _sql.password,
    database = _sql.database,
    ssl_ca='cert.pem'
)
_cursor = _db.cursor()

def get_companies(length, offset):
    _cursor.execute('SELECT * FROM `COMPANY` LIMIT %s OFFSET %s',
                    (length, offset))

    return [Company(*row)._asdict() for row in _cursor.fetchall()]

def get_jobs(company_name):
    _cursor.execute('SELECT * FROM `JOBDESCRIPTION` WHERE CompanyName = %s',
                    (company_name,))

    return [JobDescription(*row)._asdict() for row in _cursor.fetchall()]

def close_connection():
    _db.commit()
    _cursor.close()
    _db.close()

if __name__ == '__main__':
    print(get_jobs('Skipfire'))
    close_connection()
