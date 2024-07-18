// node index.js in API folder
// npm run start in CLIENT folder

const express = require('express');
const app = express();
app.listen(4000);


const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require('./models/post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const uploadMiddleWare = multer({dest: 'uploads/'})
const fs = require('fs')


const salt = bcrypt.genSaltSync(10)
const secret = 'dgyhwhsyg26ud3872he2g3b8d3'


const cors = require('cors')
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname + '/uploads'))


mongoose.connect
    ('mongodb+srv://blogApp:AdzvmCXZnvT1FNWe@cluster0.jfxq93z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').
    then(msg => {
        console.log("connection successful")
    }).catch(err => {
        console.log("error connecting")
    })



app.post('/register', async (req,res) =>{
    const {username, password} = req.body
    try{

        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        })
        res.json(userDoc)
    } catch(e){
        res.status(400).json(e)
        
    }
    
})



app.post('/login', async (req,res) =>{
    const {username,password} = req.body
    // console.log(req.body)
    
    const userDoc = await User.findOne({username})
    
    if (!userDoc) {
        return res.status(400).json("User not found");
    }
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
        //logged in
        jwt.sign({username,id: userDoc.id},secret,{},(err,token) => {
            if(err) throw err
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            })
        })
    }else{
        res.status(400).json('wrong credentials')
    }
})



// created an end-point
// app.get('/profile', (req,res) => {
//     const {token} = req.cookies
//     jwt.verify(token,secret,{},(err, info) => {
//         if (err) {
//             console.error("JWT Verification Error:", err);
//             return res.status(401).json({ message: "Unauthorized" });
//         }
//         res.json(info)
//     })

//     // res.json(req.cookies)
// })

app.get("/profile", (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        // Redirect to default home screen
        return res.redirect("/");
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid JWT token" });
        }
        res.json(info);
    });
});

app.get('/myPosts', (req,res) =>{
    const {token} = req.cookies
    if (!token) {
        return res.status(401).json({ message: 'JWT token is required' });
    }
    jwt.verify(token,secret,{}, async (err, info) => {
        if(err) throw err
        const { id } = info; // Using id here
        try {
            const posts = await Post.find({ author: id }).populate('author',['username']).sort({createdAt: -1}); // no need to populate here
            res.json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ message: 'Error fetching posts' });
        } 
    })
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post',uploadMiddleWare.single('file'), async (req,res) =>{
    const {originalname, path} = req.file;
    const parts  = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath  = path + '.'+ext
    fs.renameSync(path, newPath)

    const {token} = req.cookies
    if (!token) {
        return res.status(401).json({ message: 'JWT token is required' });
    }
    jwt.verify(token,secret,{}, async (err, info) => {
        if(err) throw err
    
    const {title,summary,content} = req.body
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
    })

    res.json(postDoc)
    })

    
})

app.get('/post', async (req,res) => {
    // const posts = await Post.find();
    res.json(
        await Post.find().
        populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
        );
})

app.get('/post/:id', async (req,res) =>{
    const {id} = req.params
    // const content = await Post.findById(id,{content:1})
    const postDoc = await Post.findById(id)
    res.json(postDoc)
})

app.get('/edit/:id', async (req,res) => {
    const {id} = req.params

    const postDoc = await Post.findById(id)
    res.json(postDoc)
})

console.log("hello")


// AdzvmCXZnvT1FNWe