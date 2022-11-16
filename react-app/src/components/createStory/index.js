import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStory } from "../../store/story";

const CreateStory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const data = { title, image, content };

    dispatch(createStory(data))
      .then(() => {
        history.push(`/users/${user.id}`);
      })
      .catch(() => {
        alert("failed");
      });
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tell your story..."
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="imageurl"
      />
      <button type="submit">Publish</button>
    </form>
  );
};

export default CreateStory;
