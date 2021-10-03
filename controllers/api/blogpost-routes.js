const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');

// get needed blogpost data for displaying all posts
router.get('/', (req, res) => {
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
        .then(dbBlogpostData => res.json(dbBlogpostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get a single blogpost
router.get('/:id', (req, res) => {
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
                }
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
            res.json(dbBlogpostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a post
router.post('/', (req, res) => {
    BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(dbBlogpostData => res.json(dbBlogpostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit a post
router.put('/:id', (req, res) => {
    BlogPost.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbBlogpostData => {
            if (!dbBlogpostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbBlogpostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbBlogpostData => {
            if (!dbBlogpostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbBlogpostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;