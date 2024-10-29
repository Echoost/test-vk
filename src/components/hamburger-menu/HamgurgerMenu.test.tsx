import { render, screen, fireEvent } from '@testing-library/react';
import HamburgerMenu from './HamburgerMenu';

describe('HamburgerMenu', () => {
    test('renders hamburger menu button', () => {
        render(<HamburgerMenu />);
        const button = screen.getByRole('button', { name: /menu/i });
        expect(button).toBeInTheDocument();
    });

    test('opens menu on button click', () => {
        render(<HamburgerMenu />);
        const button = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(button);
    });

    test('closes menu on close button click', () => {
        render(<HamburgerMenu />);
        const button = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(button);
    });
});
