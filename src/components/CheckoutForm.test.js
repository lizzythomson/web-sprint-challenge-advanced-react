import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckoutForm from './CheckoutForm';

// Write up the two tests here and make sure they are testing what the title shows

test('renders without errors', () => {
  render(<CheckoutForm />);
});

test('shows success message on submit with form details', async () => {
  render(<CheckoutForm />);

  //   Ensuring that the success message isn't already appearing on the page before the test
  const initialSuccessMessage = screen.queryByTestId(/successMessage/i);
  expect(initialSuccessMessage).not.toBeInTheDocument();

  const firstNameTestCustomer = 'Sammy';
  const lastNameTestCustomer = 'Sosa';
  const addressTestCustomer = '1234 Yankee Stadium Lane';
  const cityTestCustomer = 'New York';
  const stateTestCustomer = 'NY';
  const zipTestCustomer = '98765';

  const firstName = screen.getByLabelText(/first name:/i);
  userEvent.type(firstName, firstNameTestCustomer);

  const lastName = screen.getByLabelText(/last name:/i);
  userEvent.type(lastName, lastNameTestCustomer);

  const address = screen.getByLabelText(/address:/i);
  userEvent.type(address, addressTestCustomer);

  const city = screen.getByLabelText(/city:/i);
  userEvent.type(city, cityTestCustomer);

  const state = screen.getByLabelText(/state:/i);
  userEvent.type(state, stateTestCustomer);

  const zip = screen.getByLabelText(/zip:/i);
  userEvent.type(zip, zipTestCustomer);

  const button = screen.getByRole('button');
  userEvent.click(button);

  waitFor(async () => {
    const successMessage = screen.queryByTestId(/successMessage/i);
    expect(successMessage).toBeInTheDocument();
  });
});
