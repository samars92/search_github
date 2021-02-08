import React from 'react';
import {Owner} from '../App';

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

    return (
        <div className="row">
            <div className="column">
                <div className="card" key={id}>
                    <img className="img" src={owner ? owner.avatar_url : ''}/>
                    <p><span> Repo Name: {name} </span></p>
                    <p><span> Owner: {owner ? owner.login : ''} </span></p>
                    <p><span> Owner Type: {owner ? owner.type : ''} </span></p>
                    <p><span> Score: {score} </span></p>
                </div>
            </div>
        </div>
    );

}

export default RepoCard;