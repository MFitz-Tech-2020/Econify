const Organizations = require("../../models/organisation.model");
const Locations = require("../../models/location.model");
const Events = require("../../models/event.model");
const EventController = require("./event");
const LocationController = require("./event");

module.exports = {
  // Queries
  getAllOrgs: async () => {
    return await Organizations.find({});
  },
  getOrgbyID: async (args) => {
    return await Organizations.findById(args.id);
  },
  getOrgbyLocation: async (args) => {
    let loc = await Locations.findById(args.location_id);
    return await Organizations.findById(loc.org_id);
  },
  getOrgbyEvent: async (args) => {
    let event = await Events.findById(args.event_id);
    return await Organizations.findById(event.org_id);
  },

  // Mutations
  createOrg: async (args) => {
    let org = await Organizations.create({
      name: args.name,
    });
    return org;
  },
  updateOrg: async (args) => {
    let { nModified } = await Organizations.updateOne(
      { _id: args.id },
      { name: args.name }
    );
    if (nModified) return "Success";
    return "ID not found";
  },
  removeOrg: async (args) => {
    await LocationController.removebyOrg(args.id);
    await EventController.removebyOrg(args.id);
    let { deletedCount } = await Organizations.deleteOne({ _id: args.id });
    if (deletedCount) return "Success";
    return "ID not found";
  },
};
