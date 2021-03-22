# coding=utf8
import psycopg2
from configparser import ConfigParser

def config(filename='database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

def create_tables():
    """ create tables in the PostgreSQL database"""
    commands = (
        """
        DROP TABLE IF EXISTS maharasthra_input;
        CREATE TABLE maharasthra_input (
            input_id SERIAL PRIMARY KEY,
            year VARCHAR(255) NOT NULL,
            rest_of_maharastra VARCHAR(255) NOT NULL,
            district VARCHAR(255) NOT NULL,
            tahsil VARCHAR(255) NOT NULL,
            village VARCHAR(255) NOT NULL,
            property_no VARCHAR(255) NOT NULL,
            property_name VARCHAR(255) NOT NULL
        );
        """,
        """
        DROP TABLE IF EXISTS maharasthra_output;
        CREATE TABLE maharasthra_output (
            output_id SERIAL PRIMARY KEY,
            year VARCHAR(255) NOT NULL,
            district VARCHAR(255) NOT NULL,
            tahsil VARCHAR(255) NOT NULL,
            village VARCHAR(255) NOT NULL,
            property_no VARCHAR(255) NOT NULL,
            विलेखाचा_प्रकार TEXT,
            मोबदला TEXT,
            बाजारभाव TEXT,
            भूमापन_पोटहिस्सा_व_घरक्रमांक TEXT,
            क्षेत्रफळ TEXT,
            आकारणी_किंवा_जुडी_देण्यात_असेल_तेव्हा TEXT,
            दस्तऐवज_करुन_देणाया_लिहून_ठेवणाया_पक्षकाराचे_नाव_किंवा_दिवाणी_न्यायालयाचा_हुकुमनामा_किंवा_आदेश_असल्यास_प्रतिवादिचे_नाव_व_पत्ता TEXT,
            दस्तऐवज_करुन_घेणाया_पक्षकाराचे_व_किंवा_दिवाणी_न्यायालयाचा_हुकुमनामा_किंवा_आदेश_असल्यास_प्रतिवादिचे_नाव_व_पत्ता TEXT,
            दस्तऐवज_करुन_दिल्याचा_दिनांक TEXT,
            दस्त_नोंदणी_केल्याचा_दिनांक TEXT,
            अनुक्रमांक_खंड_व_पृष्ठ TEXT,
            बाजारभावाप्रमाणे_मुद्रांक_शुल्क TEXT,
            बाजारभावाप्रमाणे_नोंदणी_शुल्क TEXT,
            शेरा TEXT
        );
        """)
    conn = None
    try:
        # read the connection parameters
        params = config()
        # connect to the PostgreSQL server
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        # create table one by one
        for command in commands:
            cur.execute(command)
        # close communication with the PostgreSQL database server
        cur.close()
        # commit the changes
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def insert_input(values):
    sql = "INSERT INTO maharasthra_input(year, rest_of_maharastra, district, tahsil, village, property_no, property_name) VALUES(%s, %s, %s, %s, %s, %s, %s)"
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.executemany(sql,values)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
        
create_tables()
insert_input([('2020', 'Yes', 'पुणे', 'मुळ्शी', 'ताथवडे', '60', 'ऑस्टिन पार्क'),
        ('2020', 'Yes', 'पुणे', 'मुळ्शी', 'ताथवडे', '60', 'ऑस्टिन पार्क एन एक्स टी'),
        ('2020', 'Yes', 'पुणे', 'मुळ्शी', 'ताथवडे', '60', 'द - नुक'),
        ('2020', 'Yes', 'पुणे', 'मुळ्शी', 'वाकड', '238', 'ऑस्टिन प्लाझा')])
