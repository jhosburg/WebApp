import subprocess
import os
import sys
import time
def clear_output():
    if sys.platform.startswith('win'):  # For Windows
        os.system('cls')
    else:  # For Linux and Mac
        os.system('clear')


def install_npm_module(module_name,selected_dir,save=False):
    try:
        npm_commands = ['npm', 'install', module_name]
        if save:
            npm_commands.append("--save")

        if sys.platform.startswith('win'):  # For Windows
            subprocess.check_call(npm_commands,shell=True, cwd=selected_dir)
        else:  # For Linux and Mac
            subprocess.check_call(npm_commands,cwd=selected_dir)
        
        print(f"\n***Successfully installed npm module: {module_name}***\n")
        time.sleep(3)
        clear_output()
        
    except subprocess.CalledProcessError:
        print(f"\n***Failed to install npm module: {module_name}***\n")
        sys.exit()


def run_in_virtualenv(commands,selected_dir):
    try:
        if sys.platform.startswith('win'):  # For Windows
            activate_cmd = 'activate && '
        else:  # For Linux and Mac
            activate_cmd = '. .venv/bin/activate && '

        full_cmd = activate_cmd + ' && '.join(commands)
        subprocess.check_call(full_cmd, shell=True,cwd=selected_dir)
        print(f"\n***Successfully virtual command: {commands}***\n")
        time.sleep(3)
        clear_output()

    except subprocess.CalledProcessError:
        print("\n***Failed to execute commands in the virtual environment.***\n")
        sys.exit()
    
def check_installs():
    try:

        if sys.platform.startswith('win'):  # For Windows
            subprocess.check_call(['node', '-v'],shell=True)
        else:  # For Linux and Mac
            subprocess.check_call(['node', '-v'])
        print("\n***NodeJs confirmed to be installed***\n")
    except subprocess.CalledProcessError:
        print("\n***NodeJs is not installed. Please install or try to install packages manually***\n")
        sys.exit()


check_installs()
current_file_path = os.path.abspath(__file__) ##project file destination

dest_file_path = os.path.join(os.path.dirname(current_file_path), 'web-app-react')

install_npm_module("react-scripts",dest_file_path,True)
install_npm_module("@coreui/coreui",dest_file_path,True)
#install_npm_module("@coreui/react",dest_file_path, True)

dest_file_path = os.path.join(os.path.dirname(current_file_path), 'backend')

if sys.platform.startswith('win'):  # For Windows
    virtualenv_commands = [
        'pip install django',
        'pip install djangorestframework',
        'pip install django-cors-headers'
    ]
else:  # For Linux and Mac
    virtualenv_commands = [
        'pip3 install django',
        'pip3 install djangorestframework',
        'pip3 install django-cors-headers'
    ]
    


run_in_virtualenv(virtualenv_commands,dest_file_path)

print("All packages for the web application have been successfully installed")