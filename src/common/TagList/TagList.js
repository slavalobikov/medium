import React from "react";

const TagList = ({tags}) => {

return (
    <div>
        {tags.map(tag => (
            <span key={tag}>{tag}</span>))}
    </div>

)
};

export default TagList;