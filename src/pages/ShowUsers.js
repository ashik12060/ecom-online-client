import React, { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance';
import UserInfo from './UserInfo';
import { Box, Grid } from '@mui/material';
import Loader from '../components/Loader';
import axios from 'axios';

const ShowUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postAddLike, setPostAddLike] = useState([]);
    const [postRemoveLike, setPostRemoveLike] = useState([]);

    const showAllUsers = async () => {
        
        setLoading(true);
        try {
          
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
          setUsers(data);
          // console.log(users)
          console.log(data);
          setLoading(false);
        } catch (error) {}
      };
    
      useEffect(() => {
        showAllUsers();
      }, []);

    //   let uiPosts =users;
    // postAddLike.length > 0
    //   ? postAddLike
    //   : postRemoveLike.length > 0
    //   ? postRemoveLike
    //   :  users;



  return (
    <div>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container className="me-1" spacing={1}>
              {loading ? (
                <Loader />
              ) : (
                users.map((user, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                    <UserInfo
                
                    //   image={product.image ? product.image.url : ""}
                      id={user._id}
                      name={user.name}

                    //   title={product.title}
                    //   content={product.content}
                    //   feature1={product.feature1}
                    //   subheader={moment(product.createdAt).format(
                    //     "MMMM DD, YYYY"
                    //   )}
                    //   comments={users.comments.length}
                    //   likes={users.likes.length}
                    //   likesId={users.likes}
                      showAllUsers={showAllUsers}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
    </div>
  )
}

export default ShowUsers