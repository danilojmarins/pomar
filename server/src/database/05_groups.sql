CREATE TABLE IF NOT EXISTS groups (
    id CHAR(36 CHAR) NOT NULL PRIMARY KEY,
    name VARCHAR2(64 CHAR) NOT NULL,
    description VARCHAR2(255) NOT NULL
);

INSERT INTO sys.groups VALUES ('f1e24c47-7915-4c85-8641-570e143d2e50', 'Suculentas', 'Jensenobotrya lossowiana');
INSERT INTO sys.groups VALUES ('8ae1c6fc-b2dd-4cab-bd7c-b1e12d43ea3a', 'Oleaginosas', 'Gafutaora subinuma');