import React from 'react';

import NewsletterForm from './NewsletterForm';

const HeroContainer = () => (
  <div id="hero-container" className="flex-rows flex-end flex-4">
    <div className="flex-columns flex-between items-end">
      <div className="flex-1 items-end col-50">
        <h2 className="logo">
          <span>ASSEC</span>
        </h2>
        <h1 className="baseline">
          <span>
            <strong>Optimiser la réponse collective du monde agricole</strong>{' '}
            et des services de l&apos;État au problème de pénurie d&apos;eau en
            période de sécheresse
          </span>
        </h1>
        <hr className="liner my20" />
        <p className="notice mb12">
          <i className="icon icon-mail mr3" />
          Prévenez-moi quand le service est opérationnel
        </p>
        <NewsletterForm />
      </div>
      <div className="flex-1 items-start col-50 pl40">
        <p>Lorem ipsum dolor sit amet</p>
      </div>
    </div>
    <span className="more pb20 pt80">
      <i className="ico icon-down-open-big" />
    </span>
  </div>
);
HeroContainer.propTypes = {};
export default HeroContainer;
