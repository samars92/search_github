import React, { useState, useEffect, useCallback } from 'react';
import { Owner } from '../App';
import './cards.css';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

type Props = {
    data: any;
};

const UserCard: React.FC<Props> = ({
    data
  }) => {
    const dispatch: Dispatch<any> = useDispatch();

      return (
        <div className="row">
            <div className="column">
                <div className="card" key={data.id}>
                    <img className="img" src={data.avatar_url}></img>
                    <p><span> Name: {data.login} </span></p>
                    <p><span> Owner Type: {data.type} </span></p>
                    <p><span> Score: {data.score} </span></p>
                </div>
            </div>
        </div>
      );
  }
  
  export default UserCard;