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

INSERT INTO sys.harvests VALUES ('78165774-20dc-4ee1-ba07-072bc0aaf549', 'OK', DATE '2023-12-13', 105.2, '440643fa-fac5-4ba2-93fc-63801f27b525');
INSERT INTO sys.harvests VALUES ('be51a71b-7132-4a45-a235-cb2332f6bcbc', 'Baixa umidade', DATE '2024-12-31', 5, '93028b46-f80b-4b2f-80bf-208f1ccfaf31');
INSERT INTO sys.harvests VALUES ('57ee35ab-e6a1-4fe6-9f4d-ad6c3b414e15', 'OK', DATE '2024-01-01', 200, '68c78ae3-1c19-4fc9-94cb-82760fe5893a');
INSERT INTO sys.harvests VALUES ('8178247b-aee5-4918-82bd-93642011c8ab', 'Solo batido', DATE '2024-01-07', 86.7, 'dda242ae-3409-4487-8e10-48e2d6501ea6');