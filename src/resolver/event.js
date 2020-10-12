const Organizations = require("../../models/organisation.model");
const Events = require("../../models/event.model");

module.exports = {
  // Queries
  getAllEvents: async () => {
    return await Events.find({});
  },
  getEventbyID: async (args) => {
    return await Events.findById(args.id);
  },
  getEventsbyOrg: async (args) => {
    return await Events.find({ org_id: args.org_id });
  },

  // Mutation
  createEvent: async (args) => {
    let event = await Events.create({
      org_id: args.org_id,
      name: args.name,
      date: args.date,
    });
    return event;
  },
  updateLocation: async (args) => {
    let { org_id, name, date } = args;
    let event = await this.getEventbyID(args.id);
    let { nModified } = await Events.updateOne(
      { _id: args.id },
      {
        org_id: org_id === undefined ? event.org_id : org_id,
        name: name === undefined ? event.name : name,
        date: date === undefined ? event.date : date,
      }
    );
    if (nModified) return "Success";
    return "ID not found";
  },
  removeLocation: async (args) => {
    let { deletedCount } = await Events.deleteOne({ _id: args.id });
    if (deletedCount) return "Success";
    return "ID not found";
  },
  // Helper of remove
  removebyOrg: async (id) => {
    return await Events.deleteMany({ org_id: id });
  },
};
