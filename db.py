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

class _Global:
    pass

def make_cursor():
    db = mysql.connector.connect(
        host = _sql.server,
        user = _sql.username,
        passwd = _sql.password,
        database = _sql.database,
        ssl_ca='cert.pem'
    )
    cursor = db.cursor()
    _Global.db = db
    _Global.cursor = cursor
    return cursor

def close_db():
    try:
        _Global.cursor.close()
        _Global.db.close()
    except mysql.connector.errors.DatabaseError:
        pass

make_cursor()

def get_companies(length, offset):
    try:
        _Global.cursor.execute('SELECT * FROM `COMPANY` LIMIT %s OFFSET %s',
                               (length, offset))

        return [Company(*row)._asdict() for row in _Global.cursor.fetchall()]
    except mysql.connector.errors.DatabaseError as e:
        close_db()
        make_cursor()
        raise e

def get_jobs(company_name):
    try:
        _Global.cursor.execute('SELECT * FROM `JOBDESCRIPTION` WHERE CompanyName = %s',
                               (company_name,))

        return [JobDescription(*row)._asdict() for row in _Global.cursor.fetchall()]
    except mysql.connector.errors.DatabaseError as e:
        close_db()
        make_cursor()
        raise e

def close_connection():
    _Global.db.commit()
    close_db()

if __name__ == '__main__':
    print(get_jobs('Skipfire'))
    close_connection()
