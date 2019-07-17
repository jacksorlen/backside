<p style="text-align: center; font-size: 26px; font-weight: bold;">Backside</p>

<p style="margin: 12px 0px 12px 0px;">It's just a simple personal blog for literature publications with separated frontend and backend. In this way, I connect the craving for creativity with a passion for programming.</p>

<div style="margin: -12px 0 0 0;text-align: center">
  <a style="outline: 0; text-decoration: none;" href="https://www.annagreille.art">www.annagreille.art</a>
</div>

<p style="margin: 12px 0 0 0; font-size: 16px; font-weight: bold;">Works normal for me with:</p>
&emsp;1.&emsp;<b>AdoptOpenJDK</b> <i>11.0.3</i></br>
&emsp;2.&emsp;<b>Eclipse OpenJ9 VM</b> <i>0.14.3</i></br>
&emsp;3.&emsp;<b>Apache Maven</b> <i>3.6.1</i></br>
&emsp;4.&emsp;<b>Node</b> <i>v10.16.0</i></br>
&emsp;5.&emsp;<b>npm</b> <i>6.9.0</i></br>
&emsp;6.&emsp;<b>PostgreSQL</b> <i>11.4</i></br>
&emsp;7.&emsp;<b>Ubuntu</b> <i>16.04</i></br>

<p style="text-align: center; font-size: 18px; font-weight: bold; margin: 12px 0 0 0;">Database preparing</p>

<p style="margin: 6px 0 -12px 0px;">1. Open terminal and login as <b>postgres</b> user to <b>psql</b>:</p>

```
$ sudo -u postgres psql
```

<p style="margin: 32px 0 -12px 0;">2. Create database with name <b>backside</b>:</p>

```
$ postgres=# CREATE DATABASE backside;
```

<p style="margin: 32px 0 -12px 0;">3. Register our user <b>backside</b> with some password:</p>

```
$ postgres=# CREATE USER backside WITH ENCRYPTED PASSWORD 'password';
```

<p style="margin: 32px 0 -12px 0;">4. Grant privileges on <b>backside</b> database to our user and exit from <b>psql</b> as <b>postgres</b> user, but be careful, because we have database with name <b>backside</b> and user with name <b>backside!</b></p>

```
$ postgres=# GRANT ALL PRIVILEGES ON DATABASE backside TO backside;

$ postgres=# exit
```

<p style="margin: 32px 0 -12px 0;">5. Login as <b>backside</b> user to our <b>backside</b> database:</p>

```
$ psql -h localhost -p 5432 -U backside -d backside
```

<p style="margin: 32px 0 -12px 0;">6. Connect to <b>backside</b> database:</p>

```
$ backside=> \c backside
```

<p style="margin: 32px 0 -12px 0;">7. Create tables <b>authors</b> for admin registration and <b>letters</b> for posts saving:</p>

```sql
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
```