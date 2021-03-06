import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

// application
import { Logger } from './../core/logger';
import { closePopin } from './../actions';

const renderOverlay = () => (
  <Motion style={{ opacity: spring(100) }} defaultStyle={{ opacity: 0 }}>
    {(value) => {
      const opacity = value.opacity / 100;
      return <div style={{ opacity }} className="popin-background overlay" />;
    }}
  </Motion>
);

class AppPopin extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { opened: false };
    this.closePopin = this.closePopin.bind(this);
    this.renderPopin = this.renderPopin.bind(this);
  }

  componentWillReceiveProps (next) {
    if (this.state.opened) return;
    if (!next.popin && this.state.opened) {
      this.setState({ opened: false });
      return;
    }
    if (next.popin && !this.state.opened) {
      this.setState({ opened: true });
    }
  }

  closePopin () {
    const { dispatch } = this.props;
    dispatch(closePopin());
  }

  renderPopin () {
    const { Type, ...rest } = this.props.popin;
    try {
      return (
        <div className="popin-foreground">
          <Type {...rest} onClose={this.closePopin} />
        </div>
      );
    } catch (err) {
      Logger.debug(`Unable to open popin with type: ${Type}`);
      return null;
    }
  }

  render () {
    const { opened } = this.state;
    if (!this.props.popin) return null;
    return (
      <div className={`popin ${opened ? 'opened' : ''}`}>
        {opened && (
          <React.Fragment>
            {renderOverlay()}
            {this.renderPopin()}
          </React.Fragment>
        )}
      </div>
    );
  }
}

AppPopin.defaultProps = {
  popin: null,
};

AppPopin.propTypes = {
  popin: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ popin }) => ({ popin }))(AppPopin);
