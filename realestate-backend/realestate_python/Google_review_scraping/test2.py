# -*- coding: utf-8 -*-
from googlemaps import GoogleMapsScraper
from datetime import datetime, timedelta
import argparse
import psycopg2

import asyncio
import asyncpg

async def main():
    # conn = await asyncpg.connect(database = "propadvisor_db", user = "postgres", password = "9335", host = "localhost", port = "5432")
    # query="SELECT project_id, project_name, google_review_link from project_details where google_review_link != '' "
    # rows = await conn.fetch(query)

    #for row in rows:
        # project_id = row[0]
        # project_name = row[1]
        # google_review_link = row[2]
        # print("************************************************************************************************\n")
        # print ("project_id : ",project_id )
        # print ("project_name : ",project_name )
        # print ("google_review_link :",google_review_link )

    parser = argparse.ArgumentParser(description='Google Maps reviews scraper.')
    parser.add_argument('--N', type=int, default=100, help='Number of reviews to scrape')
    parser.add_argument('--place', dest='place', action='store_true', help='Scrape place metadata')
    parser.add_argument('--debug', dest='debug', action='store_true', help='Run scraper using browser graphical interface')
    parser.add_argument('--source', dest='source', action='store_true', help='Add source url to CSV file (for multiple urls in a single file)')
    parser.set_defaults(place=False, debug=False, source=False)

    args = parser.parse_args()

    #urls_file = [google_review_link]
    #urls_file = ['https://www.google.com/maps/place/Purva+Whitehall/@12.9170661,77.6700152,17z/data=!3m1!4b1!4m10!1m2!2m1!1sbangalore+apartments!3m6!1s0x3bae13724a6e7a53:0x64600b55324bd850!8m2!3d12.9170609!4d77.6722039!9m1!1b1']
    urls_file = ['https://www.google.com/maps/place/Bharat+Skyvistas+Bluez/@19.2235109,72.8630312,17z/data=!3m1!4b1!4m7!3m6!1s0x0:0x57cd3dc06e975425!8m2!3d19.2235109!4d72.8652199!9m1!1b1']
    #urls_file = ['https://www.google.com/maps/place/Alcove+Service+Apartments/@12.9285776,77.629614,17z/data=!4m13!1m2!2m1!1sapartment+near+bangalore,+karnataka!3m9!1s0x3bae1460b308194d:0x6c455e62e871d6b0!5m2!4m1!1i2!8m2!3d12.9285724!4d77.6318027!9m1!1b1']

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
                                # #print("Project Name: ",project_name)
                                print("Row Number: ",row_count)
                                print("Review:", user_review)
                                print("Review Date:",row_data[1])
                                print("Review Rating:",row_data[3])
                                print("Reviewer Name:",row_data[4])
                                
                                # query = "SELECT project_id from google_reviews where  project_id = '"+str(project_id)+"' \
                                # AND  reviewer_name = '"+str(row_data[4])+"' AND review_date='"+str(row_data[1])+"' \
                                # AND rating='"+str(row_data[3])+"' AND review='"+user_review+"'"
                                # records = await conn.fetch(query)
                                # row_affected = len(records)

                                # if(row_affected == 0):
                                #     insert_query = "INSERT INTO google_reviews(project_id, reviewer_name, review_date, \
                                #     rating, review) VALUES ('"+str(project_id)+"', '"+str(row_data[4])+"', '"+str(row_data[1])+"', \
                                #     '"+str(row_data[3])+"', '"+user_review+"')"
                                #     await conn.execute(insert_query)
                                #     print("One Row Inserted...")
                                # else:
                                #     print("Information Already Exist...")

                                print("\n")
                                row_count = row_count+1
                            n += len(reviews)
    
                    except:
                        print("*********************************************")
                        print("Cannot Fetch reviews of project")
                        print("*********************************************")
                        print("\n")


asyncio.get_event_loop().run_until_complete(main())


