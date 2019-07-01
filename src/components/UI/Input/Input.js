import React from 'react';
import classes from './Input.css';

const Input = (props) => {
  console.log(props)
  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  if( props.invalid && props.touched) {
    // eslint-disable-next-line no-lone-blocks
    {props.valueType ? validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}!</p> :
      validationError = <p className={classes.ValidationError}>Please enter a something!</p>}
  }

  // Change inputType to inputtype to remove error "React does not recognize the `inputType` prop on a DOM element"
  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
    case ('select'):
      inputElement = <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>{option.displayValue}</option>
        ))}
      </select>;
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
