import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {Image} from 'cloudinary-react';
function Profile() {

    const { user, isLoggedIn,image } = useContext(AppContext); 
    


  return (
    <section className="vh-100" style={{backgroundColor: "#9de2ff"}}>
        <div className="container-fluid py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-6" style={{borderRadius: 15 , backgroundColor : 'white'}}>
                <div className="card" style={{borderRadius: 15 , backgroundColor : 'white'}}>
                <div className="card-body p-3">
                    <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                                      <Image style={{
                                          borderRadius: 20,
                                          width: 250,
                                          height: 250,
                                          overflow: 'hidden',
                                          position: 'relative',
                                          zIndex: 0
                                      }} cloudName="dhmfl6vxk" publicId={image} />
                    </div>
                    <div className="flex-grow-1 ms-5 col-xl-30">
                        <h5 className="mb-1">{user.name}</h5>
                        <p className="mb-2 pb-1" style={{color: "#2b2a2a"}}>{user.role}</p>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{backgroundColor: "#efefef"}}>
                        <div>
                            <p className="small text-muted mb-1">Articles</p>
                            <p className="mb-0">{user.blogsCount}</p>
                        </div>
                        <div className="px-3">
                            <p className="small text-muted mb-1">Created At</p>
                            <p className="mb-0">{user.createdAt}</p>
                        </div>
                        <div>
                            <p className="small text-muted mb-1">Email</p>
                            <p className="mb-0">{user.email}</p>
                        </div>
                        </div>
                        <div className="d-flex pt-1">
                        <Link to="/uploadImage" className="btn btn-primary btn-sm px-3 me-2">Upload Image</Link>
                        <Link to="/editProfile">Edit Profile</Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
  )
}

export default Profile