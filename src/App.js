import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    saveCard: [],
    hasTrunfo: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      this.handleButtonClick();
    });
  };

  handleButtonClick = () => {
    const { cardName: cN, cardDescription: cD, cardImage: cI,
      cardAttr1: cA1, cardAttr2: cA2, cardAttr3: cA3 } = this.state;

    const allAttrValue = 210;
    const sumAllAttr = (Number(cA1) + Number(cA2) + Number(cA3) <= allAttrValue);

    const maxAttrValue = 90;
    const attrLimit = cA1 <= maxAttrValue && cA2 <= maxAttrValue && cA3 <= maxAttrValue;

    const emptyInput = cN.length !== 0 && cD.length !== 0 && cI.length !== 0;
    const negativeAttr = cA1 >= 0 && cA2 >= 0 && cA3 >= 0;

    if (sumAllAttr && attrLimit && emptyInput && negativeAttr) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  };

  onSaveButtonClick = () => {
    const { cardName: cN, cardDescription: cD, cardImage: cI, cardAttr1: cA1,
      cardAttr2: cA2, cardAttr3: cA3, cardRare: cR, hasTrunfo: hT } = this.state;

    const fillCard = { cN, cD, cI, cA1, cA2, cA3, cR, hT };

    this.setState((previusState) => ({
      saveCard: [...previusState.saveCard, fillCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: true,
    }));
  };

  validateTrunfo = () => {
    this.setState({
      hasTrunfo: false,
    });
  };

  eraseCard = (index) => {
    const { saveCard } = this.state;
    const deleteList = saveCard.slice((card) => card.cardName !== index);
    deleteList.splice(index, 1);
    this.setState({
      saveCard: deleteList,
    }, this.validateTrunfo());
  };

  render() {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, isSaveButtonDisabled, hasTrunfo, saveCard } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <h4>Carta</h4>
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
        />
        <div>
          <h4>Carta Renderizada</h4>
          {saveCard.map((render) => (
            <Card
              key={ render.cN }
              cardName={ render.cN }
              cardDescription={ render.cD }
              cardAttr1={ render.cA1 }
              cardAttr2={ render.cA2 }
              cardAttr3={ render.cA3 }
              cardImage={ render.cI }
              cardRare={ render.cR }
              cardTrunfo={ render.cd }
            />
          ))}
          <button
            type="button"
            data-testid="delete-button"
            onClick={ this.eraseCard }
          >
            Excluir
          </button>
        </div>
      </div>
    );
  }
}

export default App;
