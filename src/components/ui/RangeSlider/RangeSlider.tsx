import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import RepositoriesStore from '@/stores/repositories-store';
export const RangeSlider = () => {
    const { filterByYearRange } = RepositoriesStore;
    const [value, setValue] = useState<number[]>([null, null]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {
        filterByYearRange(value[0], value[1]);
    }, [value]);

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                max={2024}
                min={2013}
            />
        </Box>
    );
};
