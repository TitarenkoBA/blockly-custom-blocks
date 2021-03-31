import React from 'react';
import BlocklyEditor from './components/BlocklyEditor/BlocklyEditor';

import { blocks, variables, eventTypes } from './components/BlocklyEditor/payload';

class App extends React.Component {
  render() {
    return (
      <BlocklyEditor blocks={blocks} variables={variables} eventTypes={eventTypes}/>
    );
  }
}

export default App;
