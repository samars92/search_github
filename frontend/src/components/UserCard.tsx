import React from 'react';
import './cards.css';


type Props = {
    data: any;
};

const UserCard: React.FC<Props> = ({data}) => {

    return (
        <div className="row">
            <div className="column">
                <div className="card" key={data.id}>
                    <img className="img" src={data.avatar_url}/>
                    <p><span> Name: {data.login} </span></p>
                    <p><span> Owner Type: {data.type} </span></p>
                    <p><span> Score: {data.score} </span></p>
                </div>
            </div>
        </div>
    );
}

export default UserCard;