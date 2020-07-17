import React, {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from "../../context/currentUser";
import useFetch from "../../Hooks/useFetch";
import ErrorMessage from "../../common/ErrorMessage/Error-message";
import useLocalStorage from "../../Hooks/useLocalStorage";
import {Redirect} from "react-router-dom";

const Settings = () => {

    const [currentUserState , dispatch] = useContext(CurrentUserContext);



    const apiURL = '/user';
    const [{response, error}, doFetch] = useFetch(apiURL);
    const [image, setImage] = useState('')
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        doFetch({
            method: 'put',
            data: {
                user: {
                    ...currentUserState.currentUser,
                    image,
                    username,
                    bio,
                    email,
                    password
                }
            }
        })
    };

    const [, setToken] = useLocalStorage('token')

    const logout = (e) => {
        e.preventDefault();
        setToken('');
        dispatch({type: 'LOGOUT'})
        setIsSuccessfullLogout(true)
    };

    useEffect(() => {
        if (!currentUserState.currentUser) {
            return
        }
        setImage(currentUserState.currentUser.image);
        setUsername(currentUserState.currentUser.username);
        setBio(currentUserState.currentUser.bio);
        setEmail(currentUserState.currentUser.email);


    }, [currentUserState.currentUser]);

    useEffect(() => {
        if (!response) {
            return
        }
        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    }, [response, dispatch]);

    if (isSuccessfullLogout) {
        return <Redirect to={'/'} />
    }

    return <div>
        <div>
            <h1>Ваши настройки</h1>
            {error && <ErrorMessage backendErrors={error.errors}  /> }
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={'Вставьте ссылку на вашу картинку'}
                       value={image} onChange={e => setImage(e.target.value) }/>
                <input type="text" placeholder={'Имя пользователя'}
                       value={username} onChange={e => setUsername(e.target.value)} />
                <input type="textarea" placeholder={'Расскажите о себе'}
                       value={bio} onChange={e => setBio(e.target.value)} />
                <input type="text" placeholder={'Почта'}
                       value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder={'Пароль'}
                       value={password} onChange={e => setPassword(e.target.value)}/>
                <button type={'submit'}>
                    Изменить
                </button>

            </form>
            <hr/>
            <button onClick={logout}>Выйти из акакунта</button>
        </div>
    </div>
};

export default Settings;