const router = require('express').Router();
const { Comment } = require('../../models');

// get needed comment data for displaying, editing, and deleting comments (fetched in public/javascript/comment.js)
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'created_at'
        ],
        order: [['created_at', 'ASC']]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

// creates comment (fetched in public/javascript/comment.js)
router.post('/', (req, res) => {
    // check the session to use user_id from session data in creation of the comment
    if (req.session) {  
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// deletes the comment (fetched in public/javascript/comment.js)
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id'});
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;