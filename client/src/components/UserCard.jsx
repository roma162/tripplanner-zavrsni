import React from 'react'
import UserImage from './UserImage';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const UserCard = ({userId, handleChange, loc, picturePath} ) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`https://tripplanner-zavrsni.onrender.com/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data  = await response.json();
        setUser(data);
    };
    useEffect(() => {
        getUser();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(picturePath)
    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        role,
    } = user;
    
    return (
        <div>
            <div className='user mt-4' >
                <div className='user__info' onClick={() => navigate(`/profile/${userId}`)}>
                    <UserImage image={picturePath} />
                    <h4>{firstName} {lastName}</h4>
                </div>

                <Divider sx={{ color: "#9B9A9C", borderTop: "#E7473C" }} textAlign="left">Informacije</Divider>
            
            <div className='user__desc'>
                <i className='icons icons--location icons--xsm'/>
                <span>{location}</span>
            </div>

            <div className='user__desc'>
                <i className='icons icons--briefcase-user icons--xsm'/>
                <span>{role}</span>
            </div>
            { window.location.href.includes('home') ?
            <div>
                <Divider sx={{ color: "#9B9A9C" }} textAlign="left">Filter</Divider>
                <FormControl fullWidth  sx= {{margin: "2rem 0"}}>
                    <InputLabel id="demo-simple-select-label">Lokacije</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={loc}
                        label="Location"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Clear Filter"}>Clear Filter </MenuItem>
                        <MenuItem value={"Zagreb"}>Zagreb</MenuItem>
                        <MenuItem value={"Split"}>Split</MenuItem>
                        <MenuItem value={"Dubrovnik"}>Dubrovnik</MenuItem>
                        <MenuItem value={"Osijek"}>Osijek</MenuItem>
                    </Select>
                </FormControl>
            </div> : 
            <div>
                <Divider sx={{ color: "#9B9A9C", margin: "1rem 0" }}></Divider>
            </div>
            }
            
            </div>

            
        </div>
    )
}

export default UserCard