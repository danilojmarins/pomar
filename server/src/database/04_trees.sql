CREATE TABLE IF NOT EXISTS trees (
    id CHAR(36 CHAR) NOT NULL PRIMARY KEY,
    description VARCHAR2(255 CHAR) NOT NULL,
    age INTERVAL YEAR TO MONTH NOT NULL,
    species_id CHAR(36 CHAR) NOT NULL,
    CONSTRAINT fk_trees_species
        FOREIGN KEY (species_id)
        REFERENCES species (id)
);