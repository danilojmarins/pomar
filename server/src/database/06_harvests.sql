CREATE TABLE IF NOT EXISTS harvests (
    id CHAR(36 CHAR) NOT NULL PRIMARY KEY,
    information VARCHAR2(255 CHAR) NOT NULL,
    harvest_date DATE NOT NULL,
    weight NUMBER(10,2) NOT NULL,
    tree_id CHAR(36 CHAR) NOT NULL,
    CONSTRAINT fk_harvests_tree
        FOREIGN KEY (tree_id)
        REFERENCES trees (id)
);