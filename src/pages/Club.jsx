import { useNavigate } from "react-router-dom";
import { useState } from 'react'

function Club () {
    const navigate = useNavigate();
    const [state, setState] = useState({
        clubname: '',
        introduction: '',
    })

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className="DiaryEditor">
            <h2>Create Club</h2>
            <div>
                클럽명 : 
                <input name="clubname" value={state.clubname} onChange={handleChangeState}/>
            </div>
            <div>
                소개 :
                <textarea name="introduction"value={state.introduction} onChange={handleChangeState}/>
            </div>
            <div>
                <button onClick={(event) => {
                    event.preventDefault();
                    navigate("/Schedule");
                    }}>클럽 생성하기</button>
            </div>
        </div>
    );
};

export default Club;