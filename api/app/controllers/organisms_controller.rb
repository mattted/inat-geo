class OrganismsController < ApplicationController

  def kingdom
    render json: Organism.kingdom
  end

  def phylum
    render json: Organism.phylum
  end

  def klass
    render json: Organism.klass
  end

  def order
    render json: Organism.order
  end

  def family
    render json: Organism.family
  end

  def genus
    render json: Organism.genus
  end

  def species
    render json: Organism.speciecnames
  end

  def common
    render json: Organism.common
  end

end
