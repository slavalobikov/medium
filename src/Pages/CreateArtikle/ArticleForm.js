import React, {useState} from 'react';

const ArtikleForm = ({onSubmit, errors, initialValues}) => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [description, setDescription] = useState('');
    const [tagList, setTagList] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({foo:'foo'});

    };


    return <div>
        <div>
            <div>
                BackEndErrorMessages
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