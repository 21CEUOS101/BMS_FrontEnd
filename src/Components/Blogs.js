import React from 'react'
import Blog from './Blog';
import { Box, Grid } from '@mui/material';
import Axios from 'axios';

function Blogs() {

  const [data, setData] = React.useState(new Array());

  const getBlogs =  async () => {
  
    await Axios.get("http://localhost:8080/getAllBlogs").then((response) => {
      console.log(response.data);
      setData(response.data);
      return response.data;
    });

  }

  React.useEffect(() => {
    getBlogs();
    console.log(data);
  }, []);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 10, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            {Array.from(Array(data?.length)).map((_, index) => (
                <Grid item xs={12} sm={4} md={3} lg={5} key={index}>
                    <Blog blog={data?.at(index)}/>
                </Grid>
            ))}
        </Grid>
    </Box>
      );
}
    
export default Blogs;
    