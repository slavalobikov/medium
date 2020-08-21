import React, {useEffect, useState} from 'react';
import ErrorMessage from "../../common/ErrorMessage/Error-message";


const ArtikleForm = ({onSubmit, errors, initialValues}) => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [description, setDescription] = useState('');
    const [tagList, setTagList] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        const article = {
            title,
            body,
            description,
            tagList
        };
        onSubmit(article);
    };

    useEffect( () => {
        if (!initialValues) {
            return
        }
        setTitle(initialValues.title);
        setBody(initialValues.body);
        setDescription(initialValues.description);
        setTagList(initialValues.tagList.join(' '));
    }, [initialValues]);


    return <div>
        <div>
            <div>
                {errors &&  <ErrorMessage backendErrors={errors} />}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" value={title} placeholder={'Введите заголовок'}
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" value={body} placeholder={'Введите о чем ваш пост'}
                               onChange={(e) => setBody(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" value={description} placeholder={'Введите пост'}
                               onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" value={tagList} placeholder={'Введите тэги'}
                               onChange={(e) => setTagList(e.target.value)}/>
                    </div>
                    <div>
                        <button type={'submit'}> dsfsdf</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
};

export default ArtikleForm;