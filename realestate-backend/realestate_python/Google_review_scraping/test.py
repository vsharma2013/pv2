import psycopg2
import os.path as path
import json 

config_var =  path.abspath(path.join(__file__ ,"../../Config_db/db.json"))
file_output = open(config_var, "r")
db_params = json.load(file_output) 
print( db_params['database'])
print( db_params['user'])
print( db_params['host'])
print( db_params['port'])

conn = psycopg2.connect(
    database = db_params['database'],
    user = db_params['user'],
    password = db_params['password'],
    host = "ec2-3-24-150-2.ap-southeast-2.compute.amazonaws.com",
    port=db_params['port']
)

cur = conn.cursor()

cur.execute("SELECT * from visitor_login")
rows = cur.fetchall()
print("XXXXXX", rows)

conn.close()