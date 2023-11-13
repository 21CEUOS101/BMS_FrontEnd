import { Box, Grid } from '@mui/material';
import React from 'react'
import Blog from './Blog';
import Axios from 'axios';
import { AppContext } from '../App';

function UserBlogs() {

  const [data, setData] = React.useState(new Array());
  const {user} = React.useContext(AppContext);
  const getBlogs =  async () => {
    console.log(user.id);
      return await Axios.get(`http://localhost:8080/getBlogsByBloggerId/${user.id}`).then((response) => {
      console.log(response.data);
      setData(response.data);
      return response.data;
    });

  }

  React.useEffect(() => {
    if (user !== null && user !== undefined && user !== "") {
      console.log(user);
      getBlogs().then((data) => {
        console.log(data);
      });
    }
    console.log(data);
  }, [user]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 10, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }} >
            {Array.from(Array(data?.length)).map((_, index) => (
                <Grid item xs={12} sm={4} md={3} lg={5} key={index}>
                <Blog blog={data?.at(index)} isUpdate={true} />
                </Grid>
            ))}
        </Grid>
    </Box>
      );
}

export default UserBlogs;