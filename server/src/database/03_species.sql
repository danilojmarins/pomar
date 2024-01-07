CREATE TABLE IF NOT EXISTS species (
    id CHAR(36 CHAR) NOT NULL PRIMARY KEY,
    description VARCHAR2(255 CHAR) NOT NULL
);

INSERT INTO sys.species VALUES ('04f22d17-cd48-49e3-b380-2540b780c2d0', 'Grevilea-robusta');
INSERT INTO sys.species VALUES ('287af866-0b9f-4f29-a791-3e457be47129', 'Quercus rubra');
INSERT INTO sys.species VALUES ('d63231d7-3a7f-433d-8f69-6f6c0580cc24', 'Fagus sylvatica');
INSERT INTO sys.species VALUES ('d22329f7-0f84-419c-b7fe-28d01e37f558', 'Faia-purpura');