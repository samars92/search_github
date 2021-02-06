import React, { useState, useEffect, useCallback } from 'react';
import { Owner } from '../App';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import './cards.css';


type Props = {
    id: number,
    name: string, 
    owner: Owner | undefined,
    score: number
};

const RepoCard: React.FC<Props> = ({
    id,
    name,
    owner,
    score
  }) => {
    const dispatch: Dispatch<any> = useDispatch();

    return (
    <div className="row">
        <div className="column">
            <div className="card" key={id}>
                <img className="img" src={owner? owner.avatar_url: ''}></img>
                <p><span> Repo Name: {name} </span></p>
                <p><span> Owner: {owner? owner.login: ''} </span></p>
                <p><span> Owner Type: {owner? owner.type: ''} </span></p>
                <p><span> Score: {score} </span></p>
            </div>
        </div>
    </div>
    );
      
  }
  
  export default RepoCard;