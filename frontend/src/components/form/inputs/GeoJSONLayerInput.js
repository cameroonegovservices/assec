import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GeoJSON } from 'react-leaflet';

// eslint
class GeoJSONLayerInput extends React.PureComponent {
  render () {
    const {
      id, geojson, input, selected, dispatch,
    } = this.props;
    const isselected = id === selected;
    const commons = {
      data: geojson,
      onClick: () => {
        input.onChange(id);
        dispatch({
          type: 'onAreaSelected',
          id: isselected ? null : id,
        });
      },
    };
    return (
      (isselected && (
        <GeoJSON {...commons}
          key={`mapzone_${id}_active`}
          className="geojson-layer active" />
      )) || (
        <GeoJSON {...commons} key={`mapzone_${id}`} className="geojson-layer" />
      )
    );
  }
}

GeoJSONLayerInput.defaultProps = {
  selected: null,
};

GeoJSONLayerInput.propTypes = {
  selected: PropTypes.string,
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  geojson: PropTypes.object.isRequired,
};

export default connect()(GeoJSONLayerInput);