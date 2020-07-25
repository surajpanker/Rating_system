<h1># Rating_system</h1>

<h3>Technologies Used <h3/> 
   Nodejs <br>
   MongoDb <br>
   Mongoose <br>
   Express <br>

    
 ### Backend
![Nodejs - ExpressJS](https://github.com/margiki/NHS-nodejs-webapp/blob/master/github_readme_photos/backend.jpg)
 ### Database
![MongoDB - Mongoose](https://github.com/margiki/NHS-nodejs-webapp/blob/master/github_readme_photos/database.jpg)
 ### Databse Schema

**The available application is connected to a MongoDB database online.**
  Inside the file, you need to change the database link from
  mongoose.connect('mongodb+srv://taskapp:taskapp@cluster0-7hhag.mongodb.net/rating_system?retryWrites=true&w=majority); to mongoose.connect("your-database-link");
  <h3>All assumptions<h3/><br>
  <p> In this project , Basically i assume that by default all passanger and driver have 0 by default rating <p/>
  
  URI |	Returns
----|----
/signup |	sign up through following deatils| ['email', 'password', 'name', 'phone', 'roleId', 'roleString']
/login |  login through following deatils  |  ['email', 'password']
/givenrating |	given  rating about a specific driver or passanger | ['email', 'password', 'roleString', 'rating', 'roleStringTo']
/getratting	| returns aggregate rating about the passanger or driver in the system | | ['email', 'password']


 <h3>datbase schema <h3/>
     User has <br>
      email  <br>
     password  <br>
     name <br>
     phone <br>
     rating [ by deafult 0] <br>
     roleStringTo  [ passanger /driver]  <br>
     roleString  [ passanger /driver]   <br>
     tokens <br>


<h3>Steps to run your application <h3/>
    npm i <br>
   npm start 
 
