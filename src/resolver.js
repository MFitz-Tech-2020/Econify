const Organizations = require("./resolver/org");
const Locations = require("./resolver/location");
const Events = require("./resolver/event");
module.exports = {
  Query: {
    // Organizations
    organizations: () => Organizations.getAllOrgs(),
    organization: (root, args) => Organizations.getOrgbyID(args),
    orgbyLocation: (root, args) => Organizations.getOrgbyLocation(args),
    orgbyEvent: (root, args) => Organizations.getOrgbyEvent(args),
    // Locations
    locations: () => Locations.getAllLocations(),
    locationsbyOrg: (root, args) => Locations.getLocationsbyOrg(args),
    location: (root, args) => Locations.getLocationsbyID(args),
    // Events
    events: () => Events.getAllEvents(),
    event: (root, args) => Events.getEventbyID(args),
    eventsbyOrg: (root, args) => Events.getEventsbyOrg(args),
  },
  Mutation: {
    // Organizations
    createOrg: (root, args) => Organizations.createOrg(args),
    updateOrg: (root, args) => Organizations.updateOrg(args),
    removeOrg: (root, args) => Organizations.removeOrg(args),
    // Locations
    createLocation: (root, args) => Locations.createLocation(args),
    // Events
    createEvent: (root, args) => Events.createEvent(args),
  },

  Organization: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
  },
  Location: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    address: (parent) => parent.address,
    latitude: (parent) => parent.latitude,
    longitude: (parent) => parent.longitude,
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
  },
  Event: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    date: (parent) => parent.date,
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
  },
};
