class Observation < ApplicationRecord
  belongs_to :county
  belongs_to :organism

  # scope :num_per_county, -> { Rails.cache.fetch('obs_per_county', :expires_in => 12.hours){ group("county_id").count }}
  # scope :org_per_county, -> { Rails.cache.fetch('org_per_county', :expires_in => 12.hours){ select(:organism_id).distinct.group(:county_id).count }}
  # scope :org_per_county, -> { select(:organism_id).distinct.group(:county_id).count }

  def self.obs_per_county
    Rails.cache.fetch("obs_per_county", expires_in: 12.hours) do
      Observation.group("county_id").count
    end
  end

  def self.org_per_county
    Rails.cache.fetch("org_per_county", expires_in: 12.hours) do
      Observation.select(:organism_id).distinct.group(:county_id).count
    end
  end

  def self.counties_obs_by_query(params)
    kingdom = params["kingdom"]
    subcat = params["subcat"]
    selected = params["selection"]
    Rails.cache.fetch("org_per_county_#{kingdom}_#{subcat}_#{selected}", expires_in: 12.hours) do
      Observation.joins(:organism).where("organisms.#{subcat} = '#{selected}' and organisms.kingdom = '#{kingdom}'").group("county_id").count
    end
  end

  def self.states_obs_by_query(params)
    kingdom = params["kingdom"]
    subcat = params["subcat"]
    selected = params["selection"]
    Rails.cache.fetch("org_per_state_#{kingdom}_#{subcat}_#{selected}", expires_in: 12.hours) do
      Observation.joins(:organism).joins(county: :state).where("organisms.#{subcat} = '#{selected}' and organisms.kingdom = '#{kingdom}'").group("states.id").count
    end
  end

  def self.partition(sel, subcat, kingdom)
    select_options = ['b.phylum', 'b.klass', 'b.order', 'b.family', 'b.genus', 'b.species', 'count(b.species)']
    idx = select_options.find_index { |el| "b.#{subcat}" == el }


    sql = <<-SQL
      select * from (
      select #{select_options[idx..-1].join(', ')}
      from observations a
      inner join organisms b
      on a.tid = b.tid
      where b.#{subcat} = '#{sel}'
      group by #{select_options[idx...-1].join(', ')}) as agg where agg.count > 0;
    SQL

    # Rails.cache.fetch("partition_data_#{sel}_#{subcat}_#{kingdom}", expires_in: 10.days) do
      ActiveRecord::Base.connection.execute(sql)
    # end
  end

  def self.obs_for_inforec(column, searchable, page_num, ordered)
    selection = 'observations.date, counties.name, states.name as state, organisms.*, observations.url, observations.img'
    Observation.joins(:organism).joins(county: :state).select(selection)
      .where("organisms.#{column} = '#{searchable}' and observations.date is not null")
      .order(date: :desc).page(page_num).per(20)
      # .order(date: :desc).page(page_num).per(20)
  end

  def self.obs_for_inforec_by_geom(column, searchable, geotype, geoid, page_num, ordered)
    if geotype == "states"
      sql_where = "organisms.#{column} = '#{searchable}' and observations.date is not null and states.id = '#{geoid}'"
    else
      sql_where = "organisms.#{column} = '#{searchable}' and observations.date is not null and counties.id = '#{geoid}'"
    end
    selection = 'observations.date, counties.name, states.name as state, organisms.*, observations.url, observations.img'
    Observation.joins(:organism).joins(county: :state).select(selection)
      .where(sql_where)
      .order(date: :desc).page(page_num).per(20)
  end
end
