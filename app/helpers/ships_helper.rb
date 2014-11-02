module ShipsHelper
  def full_search(imonumber)
    url = "http://www.fleetmon.com/api/p/personal-v1/vessels_terrestrial/?username=apesic&api_key=#{ENV["FLEETMON_API_KEY"]}&format=json&imonumber=#{imonumber}"
    result = HTTParty.get(url)
    return result["objects"] if result["objects"]
    nil
  end

  def basic_search(imonumber)
    url = "http://www.fleetmon.com/api/p/personal-v1/vesselurl/?username=apesic&api_key=#{ENV["FLEETMON_API_KEY"]}&format=json&imo=#{imonumber}"
    result = HTTParty.get(url)
    return result["objects"] if result["objects"]
    nil
  end

  def name_search(name)

  end
end
