class ObservationsController < ApplicationController

  def obs_per_county
    render json: Observation.obs_per_county
  end

  def org_per_county
    render json: Observation.org_per_county
  end

  def counties_obs_by_query
    render json: Observation.counties_obs_by_query(params)
  end

  def states_obs_by_query
    render json: Observation.states_obs_by_query(params["column"], params["search"])
  end

  def obs_for_inforec
    if params.keys.include?("geoid")
      render json: Observation.obs_for_inforec_by_geom(params["column"], params["search"], params["geotype"], params["geoid"])
    else
      render json: Observation.obs_for_inforec(params["column"], params["search"])
    end
  end

  def counties_partition
    render json: Observation.county_partition('test', 'test')
  end

  def index
    render json: Observation.all
  end

  def create
    geo_factory = RGeo::Geographic.spherical_factory(srid: 4269)
    obs = Observation.new(obs_params)
    obs.geom = geo_factory.point(obs.lon, obs.lat)
    obs.county = County.find{ |c| c.geom.contains?(obs.geom) }
    obs.organism = Organism.find_by(params["col"].to_sym => params["name"])

    if obs.save
      render json: obs
    else 
      error_messages = obs.errors.full_messages.map do |error|
        if error == "County must exist"
          val = "Latitude/Longitude must be within the United States"
        elsif error == "Organism must exist"
          val = "Organism searched for/selected from menu"
        else
          val = error
        end
        val
      end
      render json: { errors: error_messages.join(', '), status: :unprocessable_entity }
    end
  end

  private

    def obs_params
      params.require(:observation).permit(:date, :lat, :lon)
    end

end
