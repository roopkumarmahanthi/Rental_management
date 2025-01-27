const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const bodyparser = require("body-parser");
const session = require('express-session'); //middleware
//const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/User');
var bcrypt = require('bcryptjs');

const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    console.log("MongoDb connected succussfully")
    })
    .catch((error)=>{
    console.log(`${error}`)
   })

// const store =new MongoDBStore({
//     uri : "mongodb+srv://roopkumar:anits136@cluster0.clp89.mongodb.net/Rental",
//     collections : "mySession"
// })

// app.use(session({
//     secret: 'The secret key',
//     resave: false,
//     saveUninitialized: false,
//     store: store,  // Ensure you're using a store (like MongoDBStore)
//     cookie: {
//         httpOnly: true,
//         secure: false,  // Use true if using HTTPS in production
//         sameSite: 'lax',  // Prevent cross-site issues
//     }
// }));



// const checkAuth =(req,res,next)=>{
//     console.log("Authentication process before");
//     if(req.session){
//         console.log("There is a session");
//     }
//     console.log("Session ID:", req.sessionID);
//     console.log("Session Data:", req.session);
//     console.log(req.session.isAuth,req.person);
//     console.log("Authonitication process ");
//     if(req.session.isAuth){ 
//         console.log("Successfully Logged ");
//         next();
        
//     }
//     else{
//         res.json({redirectTo : '/Login'})
//     }
// }

app.get('/validatedashboard',(req,res)=>{
    console.log("And I am coming to the Dashboard Link ");
    res.json({redirectTo : "/DashBoard"})
})

app.post('/signup',async(req,res)=>{
    console.log(req.body);
    const {username ,phonenumber,password} =req.body

    let user = await User.findOne({phonenumber})
    if(user){
        return res.json({redirectTo : '/Signup'})
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    user =new User({
        username,
        phonenumber,
        password :  hashedPassword
    })
    await user.save()
    res.json({redirectTo : '/Login'})
})

app.post("/login", async (req, res) => {
    const { phonenumber, password } = req.body;

    const user = await User.findOne({ phonenumber });
    if (!user) {
        return res.json({ redirectTo: "/Signup" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.json({ redirectTo: "/Signup" });
    }
    res.json({ redirectTo: "/HomePage" });
    // Set the authentication flag in the session
   // req.session.isAuth = true;
   // req.session.person = phonenumber;
    // Save the session and handle potential errors
    // req.session.save((err) => {
    //     if (err) {
    //         console.error("Error saving session:", err);
    //         return res.status(500).json({ error: "Session Save Error" });
    //     }
   
    //     console.log("Session saved:", req.session);
    // });
});






const db = new sqlite3.Database('./home.db');
// POST endpoint for adding properties
app.post('/homePage', (req, res) => {
    const sql = "INSERT INTO RentHouse (`houseName`, `ownerName`, `ownerPhone`, `address`, `houseType`, `bhkType`) VALUES (?, ?, ?, ?, ?, ?)";
    
    const values = [
        req.body.houseName,
        req.body.ownerName,
        req.body.ownerPhone,
        req.body.address,
        req.body.houseType,
        req.body.bhkType
    ];
    
    db.run(sql, values, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Database Error" });
        }
        res.status(200).json({ message: "Data inserted successfully", id: this.lastID });
    });
});

// GET endpoint for fetching rental list
app.get('/searchRentals', (req, res) => {
    const { address, houseType, bhkType } = req.query;

    // Build SQL query with optional filters
    let sql = "SELECT * FROM RentHouse WHERE 1=1";
    const params = [];

    if (address) {
        sql += " AND address = ?";
        params.push(address);
    }
    if (houseType) {
        sql += " AND houseType = ?";
        params.push(houseType);
    }
    if (bhkType) {
        sql += " AND bhkType = ?";
        params.push(bhkType);
    }

    // Execute the query
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Database Error" });
        }
        res.status(200).json(rows);
    });
});





app.get('/getHotelsByPhone/:phoneNumber', (req, res) => {
    console.log("request received");
    const { phoneNumber } = req.params; // Extract phoneNumber from the URL params
  
    // Query the database to fetch rental houses that match the given phone number
    const query = `
      SELECT * FROM RentHouse
      WHERE ownerPhone = ?`; // Assuming "userPhone" is the column in the "rentalhouse" table storing phone numbers
  
    db.all(query, [phoneNumber], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching data' });
      }
  
      if (rows.length > 0) {
        // If matching records are found, return them as a JSON response
        res.json(rows);
      } else {
        // If no records are found, send a 404 error with a message
        res.status(404).json({ message: 'No hotels found for this phone number' });
      }
    });
  });







app.listen(port, () => {
    console.log("Listening at 8081");
});
