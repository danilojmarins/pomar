CREATE TABLE IF NOT EXISTS trees (
    id CHAR(36 CHAR) NOT NULL PRIMARY KEY,
    description VARCHAR2(255 CHAR) NOT NULL,
    age NUMBER(3) NOT NULL,
    species_id CHAR(36 CHAR) NOT NULL,
    CONSTRAINT fk_trees_species
        FOREIGN KEY (species_id)
        REFERENCES species (id)
        ON DELETE CASCADE
);

INSERT INTO sys.trees VALUES ('440643fa-fac5-4ba2-93fc-63801f27b525', 'Carvalho', 36, '04f22d17-cd48-49e3-b380-2540b780c2d0');
INSERT INTO sys.trees VALUES ('93028b46-f80b-4b2f-80bf-208f1ccfaf31', 'Pinheiro', 30, '04f22d17-cd48-49e3-b380-2540b780c2d0');
INSERT INTO sys.trees VALUES ('68c78ae3-1c19-4fc9-94cb-82760fe5893a', 'Oliveira', 2, 'd63231d7-3a7f-433d-8f69-6f6c0580cc24');
INSERT INTO sys.trees VALUES ('dda242ae-3409-4487-8e10-48e2d6501ea6', 'Salgueiro', 200, 'd22329f7-0f84-419c-b7fe-28d01e37f558');