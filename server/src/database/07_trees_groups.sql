CREATE TABLE IF NOT EXISTS trees_groups (
    tree_id CHAR(36 CHAR) NOT NULL,
    group_id CHAR(36 CHAR) NOT NULL,
    PRIMARY KEY (tree_id, group_id),
    CONSTRAINT fk_trees_groups_tree
        FOREIGN KEY (tree_id)
        REFERENCES trees (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_trees_groups_group
        FOREIGN KEY (group_id)
        REFERENCES groups (id)
        ON DELETE CASCADE
);

INSERT INTO sys.trees_groups VALUES ('440643fa-fac5-4ba2-93fc-63801f27b525', 'f1e24c47-7915-4c85-8641-570e143d2e50');
INSERT INTO sys.trees_groups VALUES ('440643fa-fac5-4ba2-93fc-63801f27b525', '8ae1c6fc-b2dd-4cab-bd7c-b1e12d43ea3a');
INSERT INTO sys.trees_groups VALUES ('93028b46-f80b-4b2f-80bf-208f1ccfaf31', 'f1e24c47-7915-4c85-8641-570e143d2e50');
INSERT INTO sys.trees_groups VALUES ('68c78ae3-1c19-4fc9-94cb-82760fe5893a', '8ae1c6fc-b2dd-4cab-bd7c-b1e12d43ea3a');
INSERT INTO sys.trees_groups VALUES ('dda242ae-3409-4487-8e10-48e2d6501ea6', 'f1e24c47-7915-4c85-8641-570e143d2e50');
INSERT INTO sys.trees_groups VALUES ('dda242ae-3409-4487-8e10-48e2d6501ea6', '8ae1c6fc-b2dd-4cab-bd7c-b1e12d43ea3a');