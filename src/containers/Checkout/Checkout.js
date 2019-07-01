import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  onCheckoutContinued = () => {
    this.props.history.replace('/checkout/contact-data')
  };

  render() {
    let summary = null
    if (this.props.ing) {
      summary =
        <div>
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutContinued={this.onCheckoutContinued}
            onCheckoutCancelled={this.onCheckoutCancelled}/>
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}/>
        </div>
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
};

export default connect(mapStateToProps)(Checkout);
