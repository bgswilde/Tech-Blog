const router = require('express').Router();
const sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    BlogPost.findAll({
        where: {
            user_id: req.session.user_id
        },
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
        .then(dbBlogpostData => {
            const blogposts = dbBlogpostData.map(blogpost => blogpost.get({ plain: true }));
            res.render('dashboard', { blogposts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/edit/:id', withAuth, (req, res) => {
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
        .then(dbBlogpostData => {
            if (!dbBlogpostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const blogpost = dbBlogpostData.get({ plain: true });
            res.render('edit-blogpost', {
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