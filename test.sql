CREATE TABLE personal_info
(
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    about VARCHAR(255) NOT NULL,
    extra VARCHAR(255) NOT NULL,
    dribble VARCHAR(255) NOT NULL,
    twitter VARCHAR(255) NOT NULL,
    linkedin VARCHAR(255) NOT NULL,
    github VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    id SERIAL PRIMARY KEY
);

CREATE TABLE portfolio
(
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    url VARCHAR(255) ,
    pid SERIAL PRIMARY KEY
);

CREATE TABLE role
(
    roleid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE skill_categories
(
    name VARCHAR(255) NOT NULL,
    cat_id SERIAL PRIMARY KEY
);

CREATE TABLE skill
(
    name VARCHAR(255) NOT NULL,
    cat_id integer NOT NULL,
    icon_name VARCHAR(255) NOT NULL,
    CONSTRAINT skill_level_id FOREIGN KEY (cat_id) REFERENCES skill_categories(cat_id) ,
    skill_id SERIAL PRIMARY KEY
);

CREATE TABLE users
(
    username VARCHAR(255) NOT NULL,
    roleid integer NOT NULL,
    password VARCHAR(255) NOT NULL,
    userid SERIAL PRIMARY KEY
);

-- data inserts

INSERT INTO role
    (name)
VALUES
    ("admin");
INSERT INTO users
    (username, roleid, password)
VALUES
    ('rubenw', 1, '$2y$10$wWKewl/TQs.7ig6pKce.hu8gz04mwMYvMQ.TOENNR5HbtBtOaP3D.');