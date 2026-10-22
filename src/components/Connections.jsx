import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections) 

    const fetchConnections = async() => {
        if(connections) return;
        try{
            const res = await axios.get(BASE_URL+ "/user/connections", {withCredentials: true});
            dispatch(addConnection(res.data.data));
            console.log(res.data.data);
        }catch(err){

        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

  return (
    <div>Connections</div>
  )
}

export default Connections