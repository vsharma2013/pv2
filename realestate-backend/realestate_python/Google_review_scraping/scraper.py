# -*- coding: utf-8 -*-
from googlemaps import GoogleMapsScraper
from datetime import datetime, timedelta
import argparse
import psycopg2

import asyncio 
import asyncpg
import os.path as path
import json 
import shutil


import re
import datetime
from datetime import date
from dateutil.relativedelta import relativedelta

def convert_google_review_date(googel_date):
    print("External Function called........",googel_date)
    db_date = googel_date
    if re.search(r'\b' + "hour" + r'\b', db_date): 
        print(db_date) 
        today = date.today()
        d1 = today.strftime("%Y-%m-%d")
        print("One Hour ago =", d1)
        return d1

    elif re.search(r'\b' + "hours" + r'\b', db_date): 
        print(db_date) 
        today = date.today()
        d1 = today.strftime("%Y-%m-%d")
        print("few Hours ago=", d1)
        return d1

    elif re.search(r'\b' + "day" + r'\b', db_date):
        print(db_date)  
        today = date.today()-datetime.timedelta(1)
        d1 = today.strftime("%Y-%m-%d")
        print("one Day ago =", d1)
        return d1

    elif re.search(r'\b' + "days" + r'\b', db_date): 
        print(db_date) 
        numbers = [int(word) for word in db_date.split() if word.isdigit()]
        today = date.today()-datetime.timedelta(numbers[0])
        d1 = today.strftime("%Y-%m-%d")
        print("few days ago =", d1 ) 
        return d1

    elif re.search(r'\b' + "week" + r'\b', db_date): 
        print(db_date) 
        today = date.today()-datetime.timedelta(weeks=1)
        d1 = today.strftime("%Y-%m-%d")
        print("One week ago =",d1)

    elif re.search(r'\b' + "weeks" + r'\b', db_date): 
        print(db_date) 
        numbers = [int(word) for word in db_date.split() if word.isdigit()]
        today = date.today()-datetime.timedelta(weeks=numbers[0])
        d1 = today.strftime("%Y-%m-%d")
        print("Few weeks ago =",d1)
        return d1

    elif re.search(r'\b' + "month" + r'\b', db_date): 
        print(db_date)
        today = date.today()- relativedelta(months=1)
        d1 = today.strftime("%Y-%m-%d")
        print("One month ago =",d1)
        return d1

    elif re.search(r'\b' + "months" + r'\b', db_date): 
        print(db_date)
        numbers = [int(word) for word in db_date.split() if word.isdigit()]
        today = date.today()-relativedelta(months=numbers[0])
        d1 = today.strftime("%Y-%m-%d")
        print("few months ago =",d1)
        return d1

    elif re.search(r'\b' + "year" + r'\b', db_date): 
        print(db_date)
        today = date.today()-relativedelta(years=1)
        d1 = today.strftime("%Y-%m-%d")
        print("one year ago =",d1)
        return d1

    elif re.search(r'\b' + "years" + r'\b', db_date): 
        print(db_date)
        numbers = [int(word) for word in db_date.split() if word.isdigit()]
        today = date.today()-relativedelta(years=numbers[0])
        d1 = today.strftime("%Y-%m-%d")
        print("few years ago =",d1)
        return d1

    else:
        today = date.today()
        d1 = today.strftime("%Y-%m-%d")
        print("Return Today date =",d1)
        return d1


async def main():
    try:
        shutil.rmtree('./data') 
    except:
        pass
    
    config_var =  path.abspath(path.join(__file__ ,"../../Config_db/db.json"))
    file_output = open(config_var, "r")
    db_params = json.load(file_output) 
    # print( db_params['database'])
    # print( db_params['user'])
    # print( db_params['host'])
    # print( db_params['port'])

    conn = await asyncpg.connect(database = db_params['database'], user = db_params['user'], password = db_params['password'], host =   db_params['host'], port = db_params['port'])
    query= "SELECT project_id, project_name, google_review_link from project_details where google_review_link IS NOT NULL AND google_review_link != ''"
    #query = "SELECT project_id, project_name, google_review_link from project_details where project_id = '106'"
    rows = await conn.fetch(query)

    for row in rows:
        project_id = row[0]
        project_name = row[1]
        google_review_link = row[2]
        print("************************************************************************************************\n")
        print ("project_id : ",project_id )
        print ("project_name : ",project_name )
        print ("google_review_link :",google_review_link )

        parser = argparse.ArgumentParser(description='Google Maps reviews scraper.')
        parser.add_argument('--N', type=int, default=100, help='Number of reviews to scrape')
        parser.add_argument('--place', dest='place', action='store_true', help='Scrape place metadata')
        parser.add_argument('--debug', dest='debug', action='store_true', help='Run scraper using browser graphical interface')
        parser.add_argument('--source', dest='source', action='store_true', help='Add source url to CSV file (for multiple urls in a single file)')
        parser.set_defaults(place=False, debug=False, source=False)

        args = parser.parse_args()

        urls_file = [google_review_link]
        #urls_file = ['https://www.google.com/maps/place/Golden+Blessings/@18.6092482,73.7593236,17z/data=!3m1!4b1!4m21!1m13!4m12!1m4!2m2!1d80.9539467!2d26.7547724!4e1!1m6!1m2!1s0x3bc2b9773c37683b:0xa4dc7ad3f6cd879a!2sgolden+blessings!2m2!1d73.7615123!2d18.6092431!3m6!1s0x3bc2b9773c37683b:0xa4dc7ad3f6cd879a!8m2!3d18.6092431!4d73.7615123!9m1!1b1']

        with GoogleMapsScraper(debug=args.debug) as scraper:
            for url in urls_file:
                print("\n************************************************************************************************\n")
                #print(url)
                if args.place:
                    print(scraper.get_account(url))
                else:
                    error = scraper.sort_by_date(url)
                    if error == 0:
                        count_review = scraper.get_count_reviews()
                        print("Number Of Google Review: ",count_review)
                        print("\n")
                        n = 0 
                        row_count = 1
                        try:
                            while n < int(count_review):
                                reviews = scraper.get_reviews(n)
                                for r in reviews:
                                    row_data = list(r.values())
                                    user_review = row_data[0].replace("'","''")
                                    print("Project Name: ",project_name)
                                    print("Row Number: ",row_count)
                                    print("Review:", user_review)
                                    print("Review Date:",row_data[1])
                                    print("Review Rating:",row_data[3])
                                    print("Reviewer Name:",row_data[4])
                                    from datetime import datetime
                                    now = datetime.now()
                                    print("now",now)

                                    row_data[1] = convert_google_review_date(row_data[1])

                                    query = " SELECT project_id FROM project_review where  project_id = '"+str(project_id)+"' \
                                    AND reviewer_id = '0' AND reviewer_name = '"+str(row_data[4])+"' AND reviewer_type = 'google_reviewer' \
                                    AND overall_rating = '"+str(int(row_data[3]))+"' AND review = '"+user_review+"'  AND review_date='"+str(row_data[1])+"' "   
                         
                                    records = await conn.fetch(query)
                                    row_affected = len(records)
                                    print("row_affected",row_affected)
                                    

                                    if(row_affected == 0):
                                        insert_query = "INSERT INTO public.project_review( project_id, reviewer_id, reviewer_name, reviewer_type, \
                                        location_rating, amenities_rating, layout_planning_rating, overall_rating, customer_service_rating, \
                                        vfm, review_title, review, review_date, status, email_varified, review_time) VALUES ( '"+str(project_id)+"',\
                                        '0', '"+str(row_data[4])+"', 'google_reviewer', '0', '0', '0', '"+str(int(row_data[3]))+"', '0', '0', \
                                        '', '"+user_review+"', '"+str(row_data[1])+"', 'approved', 'true', '"+str(now)+"' ) "
                                        
                                        await conn.execute(insert_query)
                                        print("----------One Row Inserted...")
                                    else:
                                        print("----------Information Already Exist...")

                                    print("\n")
                                    row_count = row_count+1
                                n += len(reviews)
                        except:
                            print("*********************************************")
                            print("Cannot Fetch reviews of project", project_name)
                            print("*********************************************")
                            print("\n")


asyncio.get_event_loop().run_until_complete(main())


