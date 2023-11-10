import subprocess
import os
import sys
from threading import Thread
import time


def run_npm_module(selected_dir):
    try:
        if sys.platform.startswith('win'):  # For Windows
            subprocess.check_call('npm start', cwd=selected_dir, shell=True)
        else:  # For Linux and Mac
            subprocess.check_call(['npm', 'start'], cwd=selected_dir)
        print(f"Front end started successfully")
    except subprocess.CalledProcessError:
        print(f"Front end failed to start")
        sys.exit()

def run_in_virtualenv(command, selected_dir):
    try:

        if sys.platform.startswith('win'):  # For Windows
            activate_cmd = 'activate && '
        else:  # For Linux and Mac
            activate_cmd = 'source .venv/bin/activate && '


        full_cmd = activate_cmd + command
        subprocess.check_call(full_cmd, shell=True, cwd=selected_dir)

    except subprocess.CalledProcessError:
        print("Failed to execute command in the virtual environment.")
        sys.exit()

print("\n---------------------------------")
print("Force quit will be required to exit: CNTRL + C")
print("---------------------------------")
time.sleep(1)


print("\n \n---------------------------------")
print("You will be nodified when the site is fully running")
print("---------------------------------")

time.sleep(1)

current_file_path = os.path.abspath(__file__)  # project file destination
front_file_path = os.path.join(os.path.dirname(current_file_path), 'web-app-react/src')
back_file_path = os.path.join(os.path.dirname(current_file_path), 'backend')

run_front_end = Thread(target=run_npm_module, args=(front_file_path,))

if sys.platform.startswith('win'):  # For Windows
    run_back_end = Thread(target=run_in_virtualenv, args=('py manage.py runserver', back_file_path))
else:  # For Linux and Mac
    run_back_end = Thread(target=run_in_virtualenv, args=('python3 manage.py runserver', back_file_path))


run_front_end.start()

run_back_end.start()

time.sleep(10)

print("\n---------------------------------")
print("*** Site is fully Running ***")
print("---------------------------------")

print("\n---------------------------------")
print("Force quit required to exit: CNTRL + C")
print("---------------------------------")

run_front_end.join()
run_back_end.join()


