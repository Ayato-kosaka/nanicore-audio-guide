-- Change column type of prompt_usages.target_type from enum to text
ALTER TABLE prompt_usages ALTER COLUMN target_type TYPE TEXT;

-- Drop obsolete enum type
DROP TYPE IF EXISTS prompt_usages_target_type;
