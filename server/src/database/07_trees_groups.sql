CREATE TABLE IF NOT EXISTS trees_groups (
    tree_id CHAR(36 CHAR) NOT NULL,
    group_id CHAR(36 CHAR) NOT NULL,
    PRIMARY KEY (tree_id, group_id),
    CONSTRAINT fk_trees_groups_tree
        FOREIGN KEY (tree_id)
        REFERENCES trees (id),
    CONSTRAINT fk_trees_groups_group
        FOREIGN KEY (group_id)
        REFERENCES groups (id)
);