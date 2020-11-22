import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

const correctValuesTestCases = ['12', '12.00', '3.23', '3.1'];
const inCorrectValuesTestCases = ['dsad', 'incorrectValue', '4s4', '44.a', '44.s4']

test.each(correctValuesTestCases)('set value %d in the input', (value) => {
    container = render(<Input label="testLabel"/>)
    const { getByLabelText } = container;

    const input = getByLabelText("testLabel");
    fireEvent.change(input, {target: {value: value}});

    expect(input.value).toBe(value)
})
    
test.each(inCorrectValuesTestCases)('should not set value %s in the input', (value) => {
    container = render(<Input label="testLabel"/>)
    const { getByLabelText } = container;

    const input = getByLabelText("testLabel");
    fireEvent.change(input, {target: {value: value}});

    expect(input.value).toBe('')
})
    