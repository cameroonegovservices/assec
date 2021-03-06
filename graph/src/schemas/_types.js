const scalars = `
  scalar Date
  scalar GeoJSON
`;

const block = `
type BlockType {
  id: ID!
  ctime: Date!
  mtime: Date!
  slug: String!
  label: String!
  content: String!
}
`;

const subscriber = `
type LatLngType {
  lat: Float!
  lng: Float!
}

type PreferenceType {
  usages: ID!
  origines: ID!
  department: ID!
  latlng: LatLngType!
}

type SubscriberType {
  id: ID!
  ctime: Date!
  mtime: Date!
  email: String!
  preferences: [PreferenceType]
}
`;

const suos = `
type SUOType {
  id: ID!
  ctime: Date!
  mtime: Date!
  label: String!
}

type SUOSType {
  usages: [SUOType]
  origines: [SUOType]
  situations: [SUOType]
}
`;

const departement = `
type DepartementType {
  id: ID!
  ctime: Date!
  mtime: Date!
  code: String!
  slug: String!
  name: String!
  label: String!
  usages: [SUOType]!
  origines: [SUOType]!
  situations: [SUOType]!
}
`;

const restriction = `
type RestrictionType {
  id: ID!
  ctime: Date!
  mtime: Date!
  usages: [ID]!
  label: String!
  origines: [ID]!
  department: ID!
  situations: [ID]!
  information: String
  description: String!
}

type RulesType {
  zone: ZoneType
  situation: SituationType
  restrictions: [RestrictionType]
}
`;

const zone = `
type SituationType {
  id: ID
  slug: String
  label: String
}

type AlerteType {
  end_date: String
  start_date: String
  situation: SituationType
}

type ZoneType {
  id: ID!
  ctime: Date
  mtime: Date
  name: String!
  label: String!
  order: String!
  department: ID
  geojson: String!
  shortname: String!
  alerte: AlerteType
  description: String
}
`;

const widget = `
type QuestionType {
  id: ID!
  order: Int!
  ctime: Date!
  mtime: Date!
  type: String!
  title: String!
  department: ID!
  display: String!
  description: String
}

type SituationExtendedType {
  id: ID!
  zoneid: ID!
  name: String!
  label: String!
  order: String!
  geojson: String!
  shortname: String!
  description: String
}

type MapType {
  zone: GeoJSON!
  center: [Float]!
  maxbounds: [[Float]]!
}

type QuestionExtendedType {
  id: ID!
  order: Int!
  ctime: Date!
  mtime: Date!
  type: String!
  title: String!
  department: ID!
  display: String!
  map: MapType
  values: [SUOType]
  description: String
  zones: [SituationExtendedType]
}

type WidgetType {
  department: ID!
  questions: [QuestionExtendedType]!
}
`;

const typeDefs = `
${scalars}
${suos}
${zone}
${block}
${widget}
${subscriber}
${restriction}
${departement}
`;

export default typeDefs;
