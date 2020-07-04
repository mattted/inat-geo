# Downloads
  * GBIF research grade iNaturalist observation dataset includes occurence.txt and multimedia.txt, which can be joined on the gbifID
  * GBIF backbone taxonomy dataset includes VernacularName.tsv and multimedia, which can be joined by taxonID

# Multimedia
  * iNaturalist
    ```shell
    csvcut -t -c 1,4 multimedia.txt > inat_images.csv
    ```
     
  * GBIF Backbone
    ```shell
    csvcut -t -c 1,2 Multimedia.tsv > gbif_images.csv
    ```

# Common Names
  * GBIF VernacularName.tsv has quotes, so -u flag must be used to ignore quotes
  * Use csv grep to filter non-english vernacular names
    ```shell
    csvcut -t -c 1,2,3 -u 3 VernacularName.tsv | csvgrep -c 3 -r 'en' > gbif_common.csv
    ```

# Observations
  * iNat observations need a gbifID[1] and taxonKey[220] (matches taxonID in vernacular names)  
  * occurence.txt has quotes, so -u flag must be used to ignore quotes
    ```shell
    csvcut -t -c 1,220,68,71,99,133,134,191-196,230 occurrence.txt > inat_obs.csv
    ```

# Import into staging database 
  * Make sql table creation statements based on csv files & datatypes 
  ```shell
  head -n 200 gbif_common.csv | csvsql --no-constraints --tables gbif_common > gbif_common.sql
  head -n 200 gbif_images.csv | csvsql --no-constraints --tables gbif_images > gbif_images.sql
  head -n 200 inat_images.csv | csvsql --no-constraints --tables inat_images > inat_images.sql
  head -n 200 inat_obs.csv | csvsql --no-constraints --tables inat_obs > inat_obs.sql
  ```

  * Change column headers to match appropriate naming scheme
  * Create tables and import from csv after connecting to staging database
  ```psql
  \i gbif_common.sql
  \i gbif_images.sql
  \i inat_images.sql
  \i inat_obs.sql
  \copy gbif_common FROM '/home/matted/Code/inat-geo/api/db/raw/gbif_common.csv' delimiter ',' csv header;
  \copy gbif_images FROM '/home/matted/Code/inat-geo/api/db/raw/gbif_images.csv' delimiter ',' csv header;
  \copy inat_images FROM '/home/matted/Code/inat-geo/api/db/raw/inat_images.csv' delimiter ',' csv header;
  \copy inat_obs FROM '/home/matted/Code/inat-geo/api/db/raw/inat_obs.csv' delimiter ',' csv header;
  ```

# Set up appropriate table stuctures
  * Remove common name duplicates based on taxonKey (tid)
  ```psql
  delete from gbif_common a using gbif_common b where a.tid = b.tid and a.ctid < b.ctid;
  ```
  * Create common name column
  ```psql
  alter table inat_obs add column common varchar;
  ```
  * Join common name to observations using tid (taxonID/taxonKey)
  ```psql
  update inat_obs set common = gbif_common.common from gbif_common where inat_obs.tid = gbif_common.tid and gbif_common.lang = 'en';
  ```

# Copy to rails database for processing
  * Copy from staging to post creation/migration rails database
  ```shell
  pg_dump -t inat_obs inat_stage | psql inat
  ```
  ```psql
  alter table inat_obs rename to biodiv
  ```

# PSQL to copy inat_images to observations
  ```psql
  update observations a
  set img = b.array_agg
  from 
    (select c.gid, array_agg(d.imgi) 
    from observations c 
    inner join inat_images d 
    on c.gid = d.gid)
  as b 
  where a.gid = b.gid;
