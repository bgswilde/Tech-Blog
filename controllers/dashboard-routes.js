const router = require('express').Router();
const sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// route to get all of a users posts to render to their dashboard
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
        // handle errors, serialize the data and render the dashboard.handlebars page
        .then(dbBlogpostData => {
            const blogposts = dbBlogpostData.map(blogpost => blogpost.get({ plain: true }));
            res.render('dashboard', { blogposts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route to get the info on a single blogpost in order to edit on the rendered edit-blogpost.handlebars page
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
        // handle errors, serialize the data and render the edit-blogpost.handlebars page
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