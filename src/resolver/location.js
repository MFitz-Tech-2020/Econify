const rp = require("request-promise");

const Organizations = require("../../models/organisation.model");
const Locations = require("../../models/location.model");

module.exports = {
  // Queries
  getAllLocations: async () => {
    return await Locations.find({});
  },
  getLocationsbyOrg: async (args) => {
    return await Locations.find({ org_id: args.org_id });
  },
  getLocationsbyID: async (args) => {
    return await Locations.findById(args.id);
  },

  // Mutation
  createLocation: async (args) => {
    let { org_id, name, address, latitude, longitude } = args;
    // If the latitude or longitude is not provided, get them using Google Place API
    if (args.latitude === undefined || args.longitude === undefined) {
      let place_api_uri =
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
        args.address +
        "&inputtype=textquery&fields=formatted_address,geometry&key=AIzaSyAvkptieksaTxHproqyDq-_n_sjVYRxtJ4";
      let place_result = await rp({
        uri: place_api_uri,
        method: "GET",
      });
      console.log(place_result);
      if (place_result.status !== "OK") return null;
      latitude = place_result.candidates[0].geometry.location.lat;
      longitude = place_result.candidates[0].geometry.location.lng;
      address = place_result.candidates[0].formatted_address;
    }

    let loc = await Locations.create({
      org_id: org_id,
      name: name,
      address: address,
      latitude: latitude,
      longitude: longitude,
    });
    return loc;
  },
  updateLocation: async (args) => {
    let { org_id, name, address, latitude, longitude } = args;
    let loc = await getLocationsbyID(args.id);
    let { nModified } = await Organizations.updateOne(
      { _id: args.id },
      {
        org_id: org_id === undefined ? loc.org_id : org_id,
        name: org_id === undefined ? loc.org_id : org_id,
        address: address === undefined ? loc.address : address,
        latitude: latitude === undefined ? loc.latitude : latitude,
        longitude: longitude === undefined ? loc.longitude : longitude,
      }
    );
    if (nModified) return "Success";
    return "ID not found";
  },
  removeLocation: async (args) => {
    let { deletedCount } = await Locations.deleteOne({ _id: args.id });
    if (deletedCount) return "Success";
    return "ID not found";
  },

  // Helper of remove
  removebyOrg: async (id) => {
    return await Locations.deleteMany({ org_id: id });
  },
};
