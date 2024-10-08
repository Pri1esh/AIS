import { render, screen } from '@testing-library/react';
import HomePage from '../pages/index';
jest.mock('axios');

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    baseImagePath: 'https://www.adaniinternationalschool.org',
  },
}));

describe('HomePage', () => {
  test('should render without issue', async () => {
    render(<HomePage />);
    const getByText = screen.getByText(/Server Error/);
    expect(getByText).toBeInTheDocument();
  });
});
