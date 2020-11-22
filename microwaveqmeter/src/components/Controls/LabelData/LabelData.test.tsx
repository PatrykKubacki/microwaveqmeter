import React from 'react';
import { render } from '@testing-library/react';
import LabelData from './LabelData';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

const testCases = [['Q Factor', '11843.3'],['testLabel','testValue'],['', '436']]

test.each(testCases)('should render %s label with %s value',(label, value) => {
    container = render(<LabelData label={label} value={value}/>);
    const { getByText } = container;

    expect(getByText(`${label}: ${value}`)).toBeInTheDocument();
})