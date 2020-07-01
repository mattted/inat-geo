Rails.application.routes.draw do

  scope '/api' do 
    resources :counties, only: :index
    resources :states, only: :index
    resources :observations, only: [:index, :create]
    get 'counties_obs', to: 'counties#counties_obs'
    get 'obs_per_county', to: 'observations#obs_per_county'
    get 'org_per_county', to: 'observations#org_per_county'
    get 'obs_for_inforec', to: 'observations#obs_for_inforec'
    get 'counties_obs_by_query', to: 'observations#counties_obs_by_query'
    get 'states_obs_by_query', to: 'observations#states_obs_by_query'
    get 'counties_partition', to: 'observations#counties_partition'
    get 'datalist', to: 'organisms#datalist'
  end
end
