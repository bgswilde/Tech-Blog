const sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');
const router = require('express').Router();

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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

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
        .then(dbBlogPostData => {
            if (!dbBlogPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const blogpost = dbBlogPostData.get({ plain: true });

            res.render('single-post', {
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