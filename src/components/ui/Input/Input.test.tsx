import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import RepositoriesStore from '@/stores/repositories-store';

jest.mock('@/stores/repositories-store', () => ({
    editRepository: jest.fn(),
}));

describe('Input', () => {
    const mockSetCurrentEdit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('updates value on change and calls editRepository on submit', () => {
        const { editRepository } = RepositoriesStore;
        render(
            <Input
                name="Test Repo"
                id={1}
                setCurrentEdit={mockSetCurrentEdit}
            />,
        );

        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'Updated Repo' } });

        const submitButton = screen.getByRole('button', { name: '' });
        fireEvent.click(submitButton);

        expect(editRepository).toHaveBeenCalledWith(1, 'Updated Repo');
        expect(mockSetCurrentEdit).toHaveBeenCalledWith(null);
    });

    test('cancels edit on cancel button click', () => {
        render(
            <Input
                name="Test Repo"
                id={1}
                setCurrentEdit={mockSetCurrentEdit}
            />,
        );

        const cancelButton = screen.getByRole('button', { name: /clear/i });
        fireEvent.click(cancelButton);

        expect(mockSetCurrentEdit).toHaveBeenCalledWith(null);
    });
});
