import React, {Component} from 'react'
import {connect} from "react-redux";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'YourName'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      zipcode: {
        elementType: 'input',
        valueType: 'zip code',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touch: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      email: {
        elementType: 'input',
        valueType: 'e-mail',
        elementConfig: {
          type: 'text',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ],
        },
        value: '',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for ( let formElementIdentifer in this.state.orderForm) {
      formData[formElementIdentifer] = this.state.orderForm[formElementIdentifer].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }
      this.props.onOrderBurger(order);

  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderform = {
      ...this.state.orderForm
    };
    const updatedOrderformElement = {
      ...updatedOrderform[inputIdentifier]
    };

    updatedOrderformElement.value = event.target.value;
    updatedOrderformElement.valid = this.checkValidity(updatedOrderformElement.value, updatedOrderformElement.validation);
    updatedOrderformElement.touch = true;
    updatedOrderform[inputIdentifier] = updatedOrderformElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderform) {
      formIsValid = updatedOrderform[inputIdentifier].valid && formIsValid
    }

    this.setState({orderForm: updatedOrderform, formIsValid: formIsValid})
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touch}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            valueType={formElement.config.valueType}
          />
        ))}
        <Button btnType={'Success'} clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ing: state.ingredients,
    price: state.totalPrice,
    loading: state.loading
  }
};
const mapDispatchToProps = dispatch => {
  return{
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
