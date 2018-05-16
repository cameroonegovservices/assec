import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

// application
import { stepForward, closePopin, stepBackward } from './../actions';

const WidgetPopin = ({
  step,
  title,
  islast,
  isfirst,
  dispatch,
  description,
}) => {
  const content = description;
  // const content = description.split('\\s\\s').join('\\n');
  return (
    <div className="assec-widget-popin shadowed">
      <div className="overlay" />
      <div className="container">
        <div className="inner">
          <h3 className="title">
            <span className="badge">
              <span>{step + 1}</span>
            </span>
            <span>{title}</span>
          </h3>
          <ReactMarkdown source={content} escapeHtml={false} />
        </div>
        <nav className="navigation">
          {!isfirst && (
            <button type="button"
              onClick={() => {
                dispatch(stepBackward());
                dispatch(closePopin());
              }}>
              <span>Revenir à la question précédente</span>
            </button>
          )}
          <button className="ml20"
            type="button"
            onClick={() => {
              dispatch(closePopin());
            }}>
            <span>Modifier mon choix</span>
          </button>
          {!islast && (
            <button className="ml20"
              type="button"
              onClick={() => {
                dispatch(stepForward());
                dispatch(closePopin());
              }}>
              <span>Passer à la question suivante</span>
            </button>
          )}
          {islast && (
            <button className="ml20"
              type="button"
              onClick={() => {
                dispatch(stepForward());
                dispatch(closePopin());
              }}>
              <span>Voir les restrictions</span>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

WidgetPopin.propTypes = {
  step: PropTypes.number.isRequired,
  islast: PropTypes.bool.isRequired,
  isfirst: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default connect()(WidgetPopin);