import platform
import subprocess
import sys

def install_req():
    if platform.system() == "Windows":
        subprocess.call(
            "pip install -r requirements.txt")
    else:
        if sys.version_info[0] < 3:
            subprocess.call(
                "pip install -r requirements.txt", shell=True)
        else:
            subprocess.call(
                "pip3 install -r requirements.txt", shell=True)

install_req()
