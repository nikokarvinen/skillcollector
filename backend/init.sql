-- Create skillcollector role if it does not exist
CREATE ROLE skillcollector WITH LOGIN PASSWORD 'skillcollector' CREATEDB;

-- Connect to the default database
\c postgres

-- Creates the answerdb database if it does not already exist
CREATE DATABASE answerdb WITH OWNER skillcollector;

-- Connect to the answerdb database
\c answerdb skillcollector

-- Create the ratings table
CREATE TABLE IF NOT EXISTS ratings(
    user_id integer NOT NULL,
    user_hash varchar(50),
    skill_id varchar(50),
    title varchar(255),
    rating integer,
    is_sfia boolean,
    datetime timestamp with time zone,
    UNIQUE(user_hash, skill_id)
);

-- Create the skills table
CREATE TABLE IF NOT EXISTS skills(
    id varchar(20) NOT NULL PRIMARY KEY,
    title varchar(50),
    category varchar(50),
    subcategory varchar(50),
    gen_description varchar(255)
);

-- Create the users table
CREATE TABLE IF NOT EXISTS users(
    user_id serial PRIMARY KEY,
    user_hash varchar(50) NOT NULL UNIQUE
);

-- Create the users_credentials table
CREATE TABLE IF NOT EXISTS users_credentials(
    id serial PRIMARY KEY,
    username varchar(50) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);

-- Change the ownership of all the tables to skillcollector
ALTER TABLE public.ratings OWNER TO skillcollector;
ALTER TABLE public.skills OWNER TO skillcollector;
ALTER TABLE public.users OWNER TO skillcollector;
ALTER TABLE public.users_credentials OWNER TO skillcollector;

insert into users (user_hash) values ('0123456789');
