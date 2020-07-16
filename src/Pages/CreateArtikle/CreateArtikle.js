import React from 'react';
import ArtikleForm from "./ArticleForm";

const CreateArtikle = () => {

    const errors = {};
    const initialValues = {};
    const handleSubmit = data => {
        alert(data)
    };

  return <div>
      <ArtikleForm errors={errors} initialValues={initialValues} onSubmit={handleSubmit}  />
  </div>
};

export default CreateArtikle;