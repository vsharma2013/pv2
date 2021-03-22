Prerequisites
- Python 3 (https://www.python.org/downloads/), make sure your PIP is on the PATH.
You can check your python installation by type "python" and "pip" in cmd/terminal.
- ChromeDriver (https://chromedriver.chromium.org/downloads)
Please download and replace the chromedriver.exe in this folder with yours.
note: Make sure the version is the same as your chrome version.
FOR Ubuntu:
You need to install "sudo apt-get install python3-psycopg2" for install postgre python.

How to use
1. For the first time run, run setup by type "python setup.py" in cmd/terminal for libraries installation.

Note: for the linux user maybe you need to use "python3" instead "python"

2. Edit database.ini, run db.py (it will create a table and seed an values for example), and put your input on table maharasthra_input.
3. Next, run main.py by type "python main.py" in cmd/terminal.
4. Output will be saved on maharasthra_output table.