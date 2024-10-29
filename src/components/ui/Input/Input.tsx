import { ChangeEvent } from 'react';
import { useState } from 'react';
import RepositoriesStore from '@/stores/repositories-store';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Box } from '@mui/material';

interface IInput {
    name: string;
    id: number;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setCurrentEdit: React.Dispatch<React.SetStateAction<number>>;
}

export const Input = ({ name, id, setCurrentEdit }: IInput) => {
    const { editRepository } = RepositoriesStore;
    const [value, setValue] = useState(name);

    const handleChangeValue = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editRepository(id, value);
        setCurrentEdit(null);
    };

    const handleCancel = () => {
        setCurrentEdit(null);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Box display={'flex'} gap={'20px'} alignItems={'flex-end'}>
                <TextField
                    sx={{ color: '#fff' }}
                    id="standard-basic"
                    label="Изменить название"
                    value={value}
                    onChange={handleChangeValue}
                    variant="standard"
                    InputLabelProps={{ style: { color: 'white' } }}
                    inputProps={{
                        style: {
                            color: 'white',
                            borderBottom: '1px solid white',
                        },
                    }}
                />
                <IconButton color="primary" type="submit">
                    <CheckIcon />
                </IconButton>
                <IconButton
                    color="primary"
                    aria-label="Clear"
                    onClick={handleCancel}
                >
                    <ClearIcon />
                </IconButton>
            </Box>
        </form>
    );
};
