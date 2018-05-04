import React from 'react';
import getConfig from 'next/config';
import { Element } from 'react-scroll';
import { StickyContainer, Sticky } from 'react-sticky';

// application
import './../scss/styles.scss';
import withApollo from './../app/core/withApollo';
import MainFooter from './../app/components/MainFooter';
import DocumentHead from './../app/components/DocumentHead';
import ShadowLiner from './../app/components/ui/ShadowLiner';
import HeroContainer from './../app/components/HeroContainer';
import MainNavigation from './../app/components/MainNavigation';

// blocks
import Equipe from './../app/components/blocks/Equipe';
import Pourquoi from './../app/components/blocks/Pourquoi';
import NosSponsors from './../app/components/blocks/NosSponsors';
import ContactezNous from './../app/components/blocks/ContactezNous';
import QueFaisonsNous from './../app/components/blocks/QueFaisonsNous';
import CommentParticiper from './../app/components/blocks/CommentParticiper';

const { publicRuntimeConfig: envconfig } = getConfig();

// if (envconfig.usedebug) {
/* eslint-disable */
console.log('**** Frontend Application Debug ****');
console.log('USE_DEBUG', envconfig.usedebug);
console.log('REACT_APP_VERSION', envconfig.appversion);
console.log('REACT_APP_WIDGET_URI', envconfig.widgeturi);
console.log('REACT_APP_GRAPHQL_URI', envconfig.graphqluri);
/* eslint-disable */
// }

const App = withApollo(props => (
  <StickyContainer id="site-container" className="sticky-container">
    <DocumentHead pagetitle="Home" />
    <div id="top-container" className="padded flex-rows flex-between">
      <Sticky>{stickyprops => <MainNavigation {...stickyprops} />}</Sticky>
      <HeroContainer />
    </div>
    <div id="lames-container" className="pb120">
      <Pourquoi />
      <QueFaisonsNous />
      <CommentParticiper />
    </div>
    <Element name="essayez-la-demo">
      <iframe
        title="assec-widget"
        id="demo"
        border="0"
        height="520"
        width="100%"
        frameBorder="0"
        src={envconfig.widgeturi}
      />
    </Element>
    <Element
      name="qui-sommes-nous"
      id="qui-sommes-nous"
      className="padded pb60">
      <ShadowLiner className="mb40" />
      <div className="flex-columns flex-between">
        <ContactezNous />
        <Equipe />
      </div>
      <NosSponsors />
    </Element>
    <MainFooter version={envconfig.appversion} />
  </StickyContainer>
));

export default App;
