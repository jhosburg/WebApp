# WebApp
Web Application for Sea Dragon Energy simulation tool

 ## Requirements to run
Packages neccessary to run:

**NPM/NodeJS**
  1. react-scripts
  2. @coreui/coreui
  3. @coreui/react

**Virtual Environment Python**
  1. django
  2. djangorestframework
  3. django-cors-headers


**PROJECT MANAGEMENT**
"TeamGantt"

**Run Web Application**
    To view the website as a user, you can run the run_as_user.py script. It will 
    invoke the backend server as well as run the web application development server.
    You will still need to install the necessary dependencies using install.py or manually 
    installing the packages yourself.

**Install Necessary Dependencies**
    Run the install.py script to install the required dependencies to view the website.

## RULES

### Clone Repository: instruction on how to obtain the source code
    
**Step 1** - Clone the project repository from Github

    "git clone https://github.com/jhosburg/WebApp.git"

**Step 2** - Type the command below using VS Code terminal or a command prompt 

    "npm i" OR "npm install node"

**Step 3** - Make sure to navigate to web-app-react folder

    "cd web-app-react"

**Step 4** - Run the code on web browser (localhost)

    "npm start"



 ### Before Code Changes:

**Step 1** - Pull Existing Code

    git pull

**Step 2** - Check all the code changes are been reflected on your remote desktop/local machine



### Create a branch steps:

**Step 1** - Create a child branch from main 

    git checkout -b "first_name OR the issue you are branching to solve"

**Step 2** - command to go back to main branch

    git checkout main
    
**Step 3** - To verify your current branch and check how many branches created

    git branch

**Step 4** - Delete a branch. NOTE: do not delete the main branch 

    git checkout -d "name of the branch" 

**step 5** - Merge from your file in gitHub page



### Rules to pull changes

**step 1** - Always pull from the main branch:

    git checkout main

**step 2** - pull the new changes:

    git pull



### Web-app-react: FrontEnd After Code Changes
    
**Step 1** - Push changes to GitHub

    git pull

**Step 2** - Add the file with code changes

     "git add --all" or " git add . "

**Step 3** - Write a meaningful message for the added code change
    
    git commit -m "COMMIT MESSAGE "


**Step 4** - Push changes to GitHub

    git push




### Backend:


**Step 1** - in your terminal: 

      "python -m pip install django"
    OR
      "python3 -m pip install django"


**Step 2** - Use this code to create new Django project only
    
    "django-admin startproject backend"


**Step 3** Run Django server 

    "python manager.py runserver"


**install required commands to run django**


"python -m pip install django"
OR
"python3 -m pip install django"

"pip install axios"


**Technical Debugging steps**

Use these commands if you clone the repo and the backend(Django) does not run:

"pip install corsheaders"
"pip install django-cors-headers"
"pip install djangorestframework" 


**New Comments Coming Soon! Stay Tuned!**



### backend Django REGISTER account example:

{
  "email": "sdei@sdsu.edu",
   "username": "sdeiadmin",
   "password": "Compe492"
}


### login backend Django LOGIN example
  
 {
   "email": "sdei@sdsu.edu",
   "password": "Compe492"
 }


  ### postgreSQL Database Instruction

 - step 1: download https://www.postgresql.org/download/windows/
           watch this video  https://www.youtube.com/watch?v=d--mEqEUybA

 - step 2: follow this video: https://www.youtube.com/watch?v=69YkZqZgz9s

 - step 3: establish connection
        "pip install psycopg2-binary"
        "install pip install Pillow"
- step 5:
        "python manage.py makemigrations"
        "python manage.py sqlmigrate nameOFbackendFile 0001"
        "python manage.py migrate"

- step 6:  In your pgadmin, refresh the database and you should see a few new       tables created along with our table


- step 7: to see the details that you entered during signup like username and password:

    1) Go to PgAdmin
    2) Go to PostgreSQL server
    3) Inside server you will see your Database that you created 
    4) Go to Schemas then public then Tables 
    5) If you have migrated everything correctly(according to step 1-6 instructions) you should see tables inside the Schemas/public/Tables. Try refreshing the database if you have done everything correctly. 
    6) Inside Tables you will see a table named sdei_appuser. The data is in this table.
    7) Right-click on sdei_appuser and you will see something like View/Edit data. Click on it and then click all rows to see the data.
    8) Alternatively, to see data right click on sdei_appuser and go to Scripts and click on SELECT. A new tab should open with a Select query, you can run this select script to see the data as well.