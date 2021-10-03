const sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');
const router = require('express').Router();

// finds all the posts and needed data to display to the homepage
router.get('/', (req, res) => {
    console.log(req.session);

    BlogPost.findAll({
        attributes: [
            'id', 
            'title',
            'content',  
            'created_at',
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blogpost_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                },
                order: [['created_at', 'ASC']]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        // take the data, serialize it, and render homepage.handlebars
        .then(dbBlogPostData => {
            const blogposts = dbBlogPostData.map(blogpost => blogpost.get({ plain: true }))
            res.render('homepage', {
                blogposts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login route. Renders the login page, unless already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', {
        loggedIn: req.session.loggedIn
    });
});

// route to get info on a single post and render the single-blogpost.handlebars page
router.get('/post/:id', (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',  
            'title',
            'content', 
            'created_at', 
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blogpost_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                },
                order: [['created_at', 'ASC']]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        // handle errors, serialize data, render the single-blogpost.handlebars page
        .then(dbBlogPostData => {
            if (!dbBlogPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const blogpost = dbBlogPostData.get({ plain: true });

            res.render('single-blogpost', {
                blogpost,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;