import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { render, fireEvent, getByTestId, getByLabelText, waitFor } from "@testing-library/react";
import Login from '../components/Login';

test("renders Login without crashing", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
})