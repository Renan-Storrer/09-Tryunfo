import React from 'react';

import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  // state = {
  //   cardName: '',
  //   cardDescription: '',
  //   cardAttr1: '0',
  //   cardAttr2: '0',
  //   cardAttr3: '0',
  //   cardImage: '',
  //   cardRare: 'normal',
  //   cardTrunfo: false,
  //   isSaveButtonDisabled: true,
  //   saveCard: [],
  //   hasTrunfo: false,
  // };

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form />
        <Card />
      </div>
    );
  }
}

export default App;
