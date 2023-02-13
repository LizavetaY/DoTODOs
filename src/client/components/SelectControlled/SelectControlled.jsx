import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

const SelectControlled = ({
  name = '',
  isMultiple = false,
  value = '',
  labelText = '',
  onChange = () => {},
  listOfOptions = []
}) => {
  const hasPadding =
    isMultiple || name.toLowerCase().includes('chart') ? false : true;

  return (
    <FormControl
      sx={{
        position: 'relative',
        pb: hasPadding ? '40px' : '0'
      }}
      fullWidth
    >
      {!!labelText && (
        <InputLabel htmlFor={name} size="small" sx={{ top: '2px' }}>
          {labelText}
        </InputLabel>
      )}

      <Select
        id={name}
        name={name}
        size="medium"
        multiple={isMultiple}
        sx={{ minHeight: '45px' }}
        value={value}
        onChange={onChange}
      >
        {listOfOptions.map((item) => (
          <MenuItem key={item.id} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(SelectControlled);

SelectControlled.propTypes = {
  name: PropTypes.string.isRequired,
  isMultiple: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  listOfOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired
};
