import React from 'react';
import {
  Button,
  FormControl,
  InputBase,
  InputLabel,
  Stack
} from '@mui/material';
import PropTypes from 'prop-types';

import { getTodoStatusOptions } from '@/helpers';

import { SelectControlled } from '../SelectControlled';

const FiltersTodos = ({ filtersData = [], setFiltersOnChange = () => {} }) => {
  const [isResetButtonDisabled, setIsResetButtonDisabled] =
    React.useState(true);

  React.useEffect(() => {
    setFiltersOnChange({
      todoName: filtersData.todoName,
      todoNote: filtersData.todoNote,
      todoStatuses: filtersData.todoStatuses
    });

    toggleIsResetButtonDisabled();
  }, [filtersData.todoName, filtersData.todoNote, filtersData.todoStatuses]);

  const handleInput = (event, typeOfFilter) => {
    setFiltersOnChange((prevState) => ({
      ...prevState,
      [typeOfFilter]: event.target.value
    }));
  };

  const handleSelect = (event, typeOfFilter) => {
    const selectedValue = event.target.value;

    setFiltersOnChange((prevState) => ({
      ...prevState,
      [typeOfFilter]:
        typeof selectedValue === 'string'
          ? selectedValue.split(',')
          : selectedValue
    }));
  };

  const toggleIsResetButtonDisabled = () => {
    if (
      filtersData.todoName ||
      filtersData.todoNote ||
      filtersData.todoStatuses.length
    ) {
      setIsResetButtonDisabled(false);
    } else {
      setIsResetButtonDisabled(true);
    }
  };

  const resetFiltersOnClick = () => {
    setFiltersOnChange((prevState) => ({
      ...prevState,
      todoName: '',
      todoNote: '',
      todoStatuses: []
    }));
  };

  return (
    <Stack
      component="form"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={5}
    >
      <FormControl
        sx={{
          position: 'relative'
        }}
        fullWidth
      >
        <InputLabel htmlFor="todoName" size="small" sx={{ top: '2px' }}>
          Name of TODO
        </InputLabel>
        <InputBase
          id="todoName"
          size="medium"
          sx={{ minHeight: '45px' }}
          value={filtersData.todoName}
          onChange={() => handleInput(event, 'todoName')}
        />
      </FormControl>

      <FormControl
        sx={{
          position: 'relative'
        }}
        fullWidth
      >
        <InputLabel htmlFor="todoNote" size="small" sx={{ top: '2px' }}>
          Note of TODO
        </InputLabel>
        <InputBase
          id="todoNote"
          size="medium"
          sx={{ minHeight: '45px' }}
          value={filtersData.todoNote}
          onChange={() => handleInput(event, 'todoNote')}
        />
      </FormControl>

      <SelectControlled
        name="todoStatus"
        isMultiple
        value={filtersData.todoStatuses}
        labelText="Status of TODO"
        onChange={(event) => handleSelect(event, 'todoStatuses')}
        listOfOptions={getTodoStatusOptions()}
      />

      <Button
        variant="danger"
        disabled={isResetButtonDisabled}
        sx={{ height: '45px' }}
        onClick={resetFiltersOnClick}
      >
        Reset
      </Button>
    </Stack>
  );
};

export default React.memo(FiltersTodos);

FiltersTodos.propTypes = {
  filtersData: PropTypes.shape({
    todoName: PropTypes.string,
    todoNote: PropTypes.string,
    todoStatuses: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  setFiltersOnChange: PropTypes.func.isRequired
};
