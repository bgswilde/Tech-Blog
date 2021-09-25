INSERT INTO user (username, password, created_at, updated_at)
VALUES
    ('machoman', 'password', '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('yodelking', 'password', '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('waterlilly', 'password', '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('mustachio', 'password', '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('powderdonut', 'password', '2020-03-20 16:12:03', '2020-03-20 16:12:03');

INSERT INTO blogpost (title, content, user_id, created_at, updated_at)
VALUES
    ('Article 1: The Start', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('This One is Amazing!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Say it aint so!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Can Your Dog Eat Your Tech Homework?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 3, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Best Bets on Memes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 4, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('The Alaskan Tech Revival', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 5, '2020-03-20 16:12:03', '2020-03-20 16:12:03');

INSERT INTO comment (comment_text, user_id, blogpost_id, created_at, updated_at)
VALUES
    ('Great article!', 3, 1, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Cool!', 4, 1, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Strong!', 1, 2, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Stronger!', 1, 4, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Strongest!', 1, 5, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Great article!', 2, 1, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Good read!', 5, 6, '2020-03-20 16:12:03', '2020-03-20 16:12:03'),
    ('Great!', 3, 3, '2020-03-20 16:12:03', '2020-03-20 16:12:03');
