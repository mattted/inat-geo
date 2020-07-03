puts 'Copying GBIF Images'
connection = ActiveRecord::Base.connection()

sql = <<-SQL
  update observations a
  set img = b.array_agg
  from (select c.gid, array_agg(d.imgi) from observations c inner join inat_images d on c.gid = d.gid group by c.gid) as b 
  where a.gid = b.gid;
SQL

connection.execute sql
