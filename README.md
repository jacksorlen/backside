$ sudo -u postgres psql

postgres=# CREATE DATABASE backside;
postgres=# CREATE USER backside WITH ENCRYPTED PASSWORD 'password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE backside TO backside;
postgres=# exit




$ psql -h localhost -p 5432 -U backside -d backside

backside=> \c backside

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  username VARCHAR(21) NOT NULL,
  password VARCHAR(120) NOT NULL,
  role VARCHAR(10) NOT NULL
);

CREATE TABLE letters (
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL UNIQUE,
    date_of_publication TIMESTAMP NOT NULL,
    picture_name VARCHAR(100) NOT NULL,
    html_text TEXT,
    state VARCHAR(6) NOT NULL
);

