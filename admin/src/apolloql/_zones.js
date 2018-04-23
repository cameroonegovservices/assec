import gql from 'graphql-tag';

import { DPT_ZONES } from './queries';

export const CREATE_ZONE = gql(`
mutation createZone(
  $dpt: ID!
  $help: String
  $name: String!
  $order: String!
  $geojson: String!
) {
  createZone(
    dpt: $dpt
    name: $name
    help: $help
    order: $order
    geojson: $geojson
  ) {
    id
    dpt
    help
    name
    order
    geojson
  }
}
`);

export const DELETE_ZONE = gql(`
mutation deleteZone (
  $id: ID!
) {
  deleteZone (
    id: $id
  ) {
    id
    dpt
  }
}
`);

const getCurrentZones = (store, dpt) => {
  const data = store.readQuery({
    variables: { dpt },
    query: DPT_ZONES,
  });
  return data.zones;
};

export const UPDATE_DPT_ZONES = (store, { data }) => {
  let entries = [];
  let variables = {};
  if (data.createZone) {
    const { dpt } = data.createZone;
    const zones = getCurrentZones(store, dpt);
    entries = zones.concat([data.createZone]);
    variables = { dpt };
  }
  // if (data.updateZone) {
  //   entries = zones.map(dpt =>
  //     (dpt.id === data.updateZone.id ? data.updateZone.id : dpt));
  // }
  if (data.deleteZone) {
    const { dpt, id } = data.deleteZone;
    const zones = getCurrentZones(store, dpt);
    entries = zones.filter(obj => obj.id !== id);
    variables = { dpt };
  }
  store.writeQuery({
    variables,
    query: DPT_ZONES,
    data: { zones: entries },
  });
};