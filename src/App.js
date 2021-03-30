import React from 'react';
import BlocklyEditor from './components/BlocklyEditor/BlocklyEditor';

import { blocks, variables } from './components/BlocklyEditor/payload';

class App extends React.Component {
  render() {
    return (
      <BlocklyEditor blocks={blocks} variables={variables} />
    );
  }
}

export default App;
