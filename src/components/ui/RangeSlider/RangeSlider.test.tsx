import { render, fireEvent } from '@testing-library/react';
import { RangeSlider } from './RangeSlider';

describe('RangeSlider', () => {
    test('should log value on change', () => {
        const { getAllByRole } = render(<RangeSlider />);
        const sliders = getAllByRole('slider');

        expect(sliders.length).toBeGreaterThan(0);

        fireEvent.change(sliders[0], { target: { value: '50' } });
    });
});
