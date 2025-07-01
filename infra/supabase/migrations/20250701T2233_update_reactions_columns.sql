-- Change reactions columns target_type and action_type to text
ALTER TABLE reactions ALTER COLUMN target_type TYPE TEXT USING target_type::text;
ALTER TABLE reactions ALTER COLUMN action_type TYPE TEXT USING action_type::text;

-- Drop obsolete enum types
DROP TYPE IF EXISTS reactions_target_type;
DROP TYPE IF EXISTS reactions_action_type;
