import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onChange, isHeader = false }) => {

  return (
    <Box sx={{ maxWidth: isHeader ? '500px' : '400px', }}>
      <TextField fullWidth variant="outlined" size="small" placeholder={isHeader ? "Search" : "Search"} onChange={onChange}  autoComplete="off"  autoCorrect="off" 
        sx={{ '& .MuiOutlinedInput-root': { backgroundColor:'#fff',borderRadius:  '50px'}, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor:'#814AEB' }, }}
        
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ) 
        }}
      />
    </Box>
  );
};

export default SearchBar;
