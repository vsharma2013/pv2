# coding=utf8
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from selenium.webdriver.support.expected_conditions import \
    presence_of_all_elements_located, \
    staleness_of, \
    presence_of_element_located, \
    number_of_windows_to_be
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from PIL import Image
from io import BytesIO
import time
import deathbycaptcha
import traceback
from selenium.webdriver.chrome.options import Options
import psycopg2
from configparser import ConfigParser
import os.path as path
import json

def config():
    config_var =  path.abspath(path.join(__file__ ,"../../Config_db/db.json"))
    file_output = open(config_var, "r")
    db_params = json.load(file_output) 
    return db_params

def get_inputs():
    """ query parts from the parts table """
    conn = None
    results = []
    try:
        db_params = config()
        conn = psycopg2.connect(database = db_params['database'], user = db_params['user'], password = db_params['password'], host = db_params['host'], port=db_params['port'])
        cur = conn.cursor()
        cur.execute("SELECT * FROM project_property_transaction where property_no != ''")
        rows = cur.fetchall()
        print("The number of inputs: ", cur.rowcount)
        for row in rows:
            results.append(row)
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
        return results

def insert_output(values):
    print("************** Storing Record To Database **************************")
    #print("Length of List: ",len(values))
    project_id = str(values[0])
    year_input = str(values[1])
    district_input = str(values[2]).replace('"', '').replace("'", "")
    tahsil_input = str(values[3]).replace('"', '').replace("'", "")
    village_input = str(values[4]).replace('"', '').replace("'", "")
    property_input = str(values[5]).replace('"', '').replace("'", "")
    result_1 = str(values[6]).replace('"', '').replace("'", "")
    result_2 = str(values[7]).replace('"', '').replace("'", "")
    result_3 = str(values[8]).replace('"', '').replace("'", "")
    result_4 = str(values[9]).replace('"', '').replace("'", "")
    result_5 = str(values[10]).replace('"', '').replace("'", "")
    result_6 = str(values[11]).replace('"', '').replace("'", "")
    result_7 = str(values[12]).replace('"', '').replace("'", "")
    result_8 = str(values[13]).replace('"', '').replace("'", "")
    result_9 = str(values[14]).replace('"', '').replace("'", "")
    result_10 = str(values[15]).replace('"', '').replace("'", "")
    result_11 = str(values[16]).replace('"', '').replace("'", "")
    result_12 = str(values[17]).replace('"', '').replace("'", "")
    result_13 = str(values[18]).replace('"', '').replace("'", "")
    result_14 = str(values[19]).replace('"', '').replace("'", "")

    db_params = config()
    conn = psycopg2.connect(database = db_params['database'], user = db_params['user'], password = db_params['password'], host = db_params['host'], port=db_params['port'])
    cur = conn.cursor()

    try:
        select_sql = "SELECT project_id  FROM project_recent_transac where project_id ='"+project_id+"' AND year ='"+year_input+"' AND district ='"+district_input+"' AND tahsil ='"+tahsil_input+"' AND village ='"+village_input+"' AND property_no ='"+property_input+"' AND विलेखाचा_प्रकार ='"+result_1+"' AND मोबदला ='"+result_2+"' AND बाजारभाव ='"+result_3+"' AND भूमापन_पोटहिस्सा_व_घरक् ='"+result_4+"' AND \
        क्षेत्रफळ ='"+result_5+"' AND आकारणी_किंवा_जुडी_देण्य ='"+result_6+"' AND दस्तऐवज_करुन_देणाया_लिह ='"+result_7+"' AND दस्तऐवज_करुन_घेणाया_पक् ='"+result_8+"' AND \
        दस्तऐवज_करुन_दिल्याचा_द ='"+result_9+"' AND दस्त_नोंदणी_केल्याचा_दि ='"+result_10+"' AND अनुक्रमांक_खंड_व_पृष्ठ ='"+result_11+"' AND बाजारभावाप्रमाणे_मुद् ='"+result_12+"' AND बाजारभावाप्रमाणे_नोंद ='"+result_13+"' AND शेरा ='"+result_14+"' "
        #print("QUERY:",select_sql)
        cur.execute(select_sql)
        cur.fetchall()
        print("If Record id there? : ", cur.rowcount)
        if(cur.rowcount == 0):
            sql = "INSERT INTO project_recent_transac(project_id, year, district, tahsil, village, property_no,विलेखाचा_प्रकार, मोबदला, बाजारभाव, भूमापन_पोटहिस्सा_व_घरक्रमांक, क्षेत्रफळ, आकारणी_किंवा_जुडी_देण्यात_असेल_तेव्हा, दस्तऐवज_करुन_देणाया_लिहून_ठेवणाया_पक्षकाराचे_नाव_किंवा_दिवाणी_न्यायालयाचा_हुकुमनामा_किंवा_आदेश_असल्यास_प्रतिवादिचे_नाव_व_पत्ता, दस्तऐवज_करुन_घेणाया_पक्षकाराचे_व_किंवा_दिवाणी_न्यायालयाचा_हुकुमनामा_किंवा_आदेश_असल्यास_प्रतिवादिचे_नाव_व_पत्ता, दस्तऐवज_करुन_दिल्याचा_दिनांक, दस्त_नोंदणी_केल्याचा_दिनांक, अनुक्रमांक_खंड_व_पृष्ठ, बाजारभावाप्रमाणे_मुद्रांक_शुल्क, बाजारभावाप्रमाणे_नोंदणी_शुल्क, शेरा) VALUES( '"+project_id+"', '"+year_input+"', '"+district_input+"', '"+tahsil_input+"', '"+village_input+"', '"+property_input+"', '"+result_1+"', '"+result_2+"', '"+result_3+"', '"+result_4+"', '"+result_5+"', '"+result_6+"', '"+result_7+"', '"+result_8+"', '"+result_9+"', '"+result_10+"', '"+result_11+"', '"+result_12+"', '"+result_13+"', '"+result_14+"')"
            #print(sql)
            cur.execute(sql)
            conn.commit()
            cur.close()
            print("One Row Inserted..........\n******************************\n")
        else:
            print("Record Already Exist......\n******************************\n")

        conn.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def take_screenshot(element, driver, filename='screenshot.png'):
  """
    Source: https://stackoverflow.com/questions/15018372/how-to-take-partial-screenshot-with-selenium-webdriver-in-python
  """
  location = element.location_once_scrolled_into_view
  size = element.size
  png = driver.get_screenshot_as_png() # saves screenshot of entire page

  im = Image.open(BytesIO(png)) # uses PIL library to open image in memory

  left = location['x']
  top = location['y']
  right = location['x'] + size['width']
  bottom = location['y'] + size['height']
  im = im.crop((left, top, right, bottom)) # defines crop points
  im.save(filename) # saves new cropped image

timeout = 30
WINDOW_SIZE = "1920,1080"
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
driver = webdriver.Chrome(options=chrome_options)
##driver = webdriver.Chrome()
##driver.maximize_window()
dbc_client = deathbycaptcha.SocketClient("anoopmr", "bangal0@rE")
inputs = get_inputs()
count_data = 1
for input_tuples in inputs:
    #print("XXXXXX",input_tuples)
    project_id = int(input_tuples[0])
    year_input = int(input_tuples[1])
    maharastra_input = input_tuples[7]
    district_input = input_tuples[2]
    tahsil_input = input_tuples[3]
    village_input = input_tuples[4]
    property_input = int(input_tuples[5])
    name_input = input_tuples[6]
    print("Processing:", count_data)
    maharastra = False
##    print(year_input, i)
    # print(year_input)
    # print(maharastra_input)
    # print(district_input)
    # print(tahsil_input)
    # print(village_input)
    # print(property_input)
    # print(name_input)
    while True:
        try:
            driver.get("https://freesearchigrservice.maharashtra.gov.in/")
            print("Visiting: https://freesearchigrservice.maharashtra.gov.in/")
            while_count = 0
            website_error = False
            while True:
                if while_count > 2:
                    website_error = True
                    break
                try:
                    WebDriverWait(driver, timeout).until(presence_of_element_located((By.XPATH, '//*[@id="popup"]/div/a')))
                    break
                except:
                    while_count += 1
                    driver.refresh()
                    pass
            if website_error:
                print("Website is unresponsive, trying again...")
                continue
            driver.find_element_by_xpath('//*[@id="popup"]/div/a').click()
            if maharastra_input.lower() == "yes":
                WebDriverWait(driver, timeout).until(presence_of_element_located((By.NAME, "btnOtherdistrictSearch")))
                driver.find_element_by_name("btnOtherdistrictSearch").click()
                maharastra = True
                WebDriverWait(driver, timeout).until(presence_of_element_located((By.XPATH, '//*[@id="btnOtherdistrictSearch"][contains(@style, "SandyBrown")]')))
            selectyear = Select(driver.find_element_by_name("ddlFromYear1")).select_by_visible_text(str(year_input))
            WebDriverWait(driver, timeout).until(presence_of_element_located((By.XPATH, '//*[@id="ddlDistrict1"]/option[1]')))
            selectdistrict = Select(driver.find_element_by_name("ddlDistrict1")).select_by_visible_text(district_input)
            WebDriverWait(driver, timeout).until(presence_of_element_located((By.XPATH, '//*[@id="ddltahsil"]/option[1]')))
            if maharastra:
                while_count = 0
                website_error = False
                while True:
                    if while_count > 30:
                        website_error = True
                        break
                    time.sleep(1)
                    try:
                        selecttahsil = Select(driver.find_element_by_name("ddltahsil")).select_by_visible_text(tahsil_input)
                        break
                    except:
                        while_count += 1
                        pass
                if website_error:
                    print("Website is unresponsive, trying again...")
                    continue
                WebDriverWait(driver, timeout).until(presence_of_element_located((By.XPATH, '//*[@id="ddlvillage"]/option[1]')))
            while_count = 0
            website_error = False
            while True:
                if while_count > 30:
                    website_error = True
                    break
                time.sleep(1)
                try:
                    selectvillage = Select(driver.find_element_by_name("ddlvillage")).select_by_visible_text(village_input)
                    break
                except:
                    while_count += 1
                    pass
            if website_error:
                print("Website is unresponsive, trying again...")
                continue
            while_count = 0
            website_error = False
            while True:
                if while_count > 30:
                    website_error = True
                    break
                try:
                    time.sleep(1)
                    inputproperty = driver.find_element_by_name("txtAttributeValue1").send_keys(str(property_input))
                    break
                except:
                    while_count += 1
                    pass
            if website_error:
                print("Website is unresponsive, trying again...")
                continue
            captchaold = driver.find_element_by_id("imgCaptcha_new").get_attribute("src")
            # print(captchaold)
            inputcaptcha = driver.find_element_by_name("txtImg1").send_keys("123456")
            time.sleep(1)
            if driver.find_element_by_name("txtAttributeValue1").get_attribute("value") == "":
                inputproperty = driver.find_element_by_name("txtAttributeValue1").send_keys(str(property_input))
            if driver.find_element_by_name("txtImg1").get_attribute("value") == "":
                driver.find_element_by_name("txtImg1").send_keys("123456")
            driver.find_element_by_name("btnSearch_RestMaha").click()
            WebDriverWait(driver, timeout).until(presence_of_element_located((By.ID, "lblimg_new")))
            WebDriverWait(driver, timeout).until(presence_of_element_located((By.ID, "imgCaptcha_new")))
            while_count = 0
            website_error = False
            while True:
                if while_count > 30:
                    website_error = True
                    break
                time.sleep(1)
                captchaelement = driver.find_element_by_id("imgCaptcha_new")
                if captchaelement.get_attribute("src") == captchaold:
                    while_count += 1
                    pass
                else:
                    break
            if website_error:
                print("Website is unresponsive, trying again...")
                continue
            print("Screenshot a captcha...")
            while True:
                try:
                    time.sleep(1)
                    captchaelement.screenshot("screenshot.png")
                    # take_screenshot(captchaelement, driver)
                    break
                except Exception as e:
                    print(e)
                    pass
            try:
                balance = dbc_client.get_balance()
                captcha = dbc_client.decode("screenshot.png")
                if captcha:
                    print ("CAPTCHA %s solved: %s" % (captcha["captcha"], captcha["text"]))
            except deathbycaptcha.AccessDeniedException:
                print("error")
            inputcaptcha = driver.find_element_by_name("txtImg1").send_keys(captcha["text"].upper()) # Input the captcha
            if driver.find_element_by_name("txtAttributeValue1").get_attribute("value") == "":
            # inputproperty = driver.find_element_by_name("txtAttributeValue1").clear()
                inputproperty = driver.find_element_by_name("txtAttributeValue1").send_keys(str(property_input))
            driver.find_element_by_name("btnSearch_RestMaha").click()
            WebDriverWait(driver, timeout).until(presence_of_all_elements_located((By.XPATH, '//*[@id="RegistrationGrid"]/tbody/tr/td[10]/input')))
            next_page = 2 # Note the next page
            while True:
                print("Checking page:",next_page - 1)
                buttons = driver.find_elements_by_xpath('//*[@id="RegistrationGrid"]/tbody/tr/td[10]/input')
                lengthbuttons = len(buttons)
                print("Number of details buttons:", lengthbuttons)
                current = driver.window_handles[0]
                for j in range(2, lengthbuttons+2):
                    print("Checking detail button:",j-1)
##                    print(j)
                    driver.switch_to.window(current)
                    property_column = driver.find_element_by_xpath('//*[@id="RegistrationGrid"]/tbody/tr['+str(j)+']/td[7]').text
                    if name_input not in property_column: # Check if the property name is in description column
                        ##print(property_column)
                        continue
                    button = driver.find_element_by_xpath('//*[@id="RegistrationGrid"]/tbody/tr['+str(j)+']/td[10]/input')
                    button.click()
                    WebDriverWait(driver, timeout).until(number_of_windows_to_be(2))
                    newWindow = [window for window in driver.window_handles if window != current][0]
                    driver.switch_to.window(newWindow)
                    while True:
                        try:
                            WebDriverWait(driver, timeout).until(presence_of_all_elements_located((By.XPATH, '/html/body/table[3]/tbody/tr/td[2]')))
                            break
                        except:
                            driver.refresh()
                    try:
                        result_1 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[1]/td[2]").text
                    except:
                        result_1 = ""
                    try:
                        result_2 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[2]/td[2]").text
                    except:
                        result_2 = ""
                    try:
                        result_3 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[3]/td[2]").text
                    except:
                        result_3 = ""
                    try:
                        result_4 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[4]/td[2]").text
                    except:
                        result_4 = ""
                    try:
                        result_5 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[5]/td[2]").text
                    except:
                        result_5 = ""
                    try:
                        result_6 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[6]/td[2]").text
                    except:
                        result_6 = ""
                    try:
                        result_7 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[7]/td[2]").text
                    except:
                        result_7 = ""
                    try:
                        result_8 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[8]/td[2]").text
                    except:
                        result_8 = ""
                    try:
                        result_9 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[9]/td[2]").text
                    except:
                        result_9 = ""
                    try:
                        result_10 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[10]/td[2]").text
                    except:
                        result_10 = ""
                    try:
                        result_11 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[11]/td[2]").text
                    except:
                        result_11 = ""
                    try:
                        result_12 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[12]/td[2]").text
                    except:
                        result_12 = ""
                    try:
                        result_13 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[13]/td[2]").text
                    except:
                        result_13 = ""
                    try:
                        result_14 = driver.find_element_by_xpath("/html/body/table[3]/tbody/tr[14]/td[2]").text
                    except:
                        result_14 = ""
##                    data = pd.DataFrame({"Year":[year_input], "District":[district_input], "Tahsil":[tahsil_input], "Village":[village_input], "Property No":[property_input], "विलेखाचा प्रकार":[result_1], "मोबदला":[result_2], "बाजारभाव":[result_3], "भू-मापन,पोटहिस्सा व घरक्रमांक":[result_4], "क्षेत्रफळ":[result_5], "आकारणी किंवा जुडी देण्यात असेल तेव्हा.":[result_6], "दस्तऐवज करुन देणा-या/लिहून ठेवणा-या पक्षकाराचे नाव किंवा दिवाणी न्यायालयाचा हुकुमनामा किंवा आदेश असल्यास,प्रतिवादिचे नाव व पत्ता.":[result_7], "दस्तऐवज करुन घेणा-या पक्षकाराचे व किंवा दिवाणी न्यायालयाचा हुकुमनामा किंवा आदेश असल्यास,प्रतिवादिचे नाव व पत्ता":[result_8], "दस्तऐवज करुन दिल्याचा दिनांक":[result_9], "दस्त नोंदणी केल्याचा दिनांक":[result_10], "अनुक्रमांक,खंड व पृष्ठ":[result_11], "बाजारभावाप्रमाणे मुद्रांक शुल्क":[result_12], "बाजारभावाप्रमाणे नोंदणी शुल्क":[result_13], "शेरा":[result_14]})
##                    try:
##                        append_df_to_excel(data, excel_output)
##                    except Exception as e:
##                        data.to_excel(excel_output, index=False)
                    data = [project_id,year_input, district_input, tahsil_input, village_input, property_input, result_1, result_2, result_3, result_4, result_5, result_6, result_7, result_8, result_9, result_10, result_11, result_12, result_13, result_14]
                    insert_output(data)
                    driver.close()
                    time.sleep(1)
                driver.switch_to.window(current)
                try:
                    driver.find_element_by_xpath('//*[@id="RegistrationGrid"]/tbody/tr[12]/td/table/tbody/tr/td['+str(next_page)+']').click() # Search if the next page is available
                    while True:
                        try:
                            time.sleep(1)
                            driver.find_element_by_xpath('//*[@id="RegistrationGrid"]/tbody/tr[12]/td/table/tbody/tr/td['+str(next_page)+']/a')
                        except:
##                            traceback.print_exc()
                            break
                    next_page += 1
                except:
##                    traceback.print_exc()
                    break
            driver.switch_to.window(current)
            count_data += 1
            break
        except:
            traceback.print_exc()
            print("Trying to restart because timeout...")
            pass
driver.quit()        
    
