# Normal Forms

1. 0NF
2. 1 NF
   - Rules:
     - Atomic Values
     - Unique Column Names
     - Positional dependency of data
     - Column should contain data that are of the same type
     - Determine Primary Key
3. 2 NF
   - Rules:
     - Must be in 1 NF
     - No non-key attribute should depend on part of a candidate key
4. 3 NF
   - Rules:
     - Must be in 2 NF
     - Must not contain transitive dependency
