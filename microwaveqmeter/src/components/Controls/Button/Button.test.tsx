import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});


test('Call click handler after click on', () => {
    const handleClick  = jest.fn();
    container = render(<Button text="Click me" onClick={handleClick }/>)
    
    const { getByText } = container;
    fireEvent.click(getByText("Click me"));

    expect(handleClick ).toHaveBeenCalledTimes(1);
})

