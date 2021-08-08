import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/style.css'

const Home = () => {

  const [users, setUsers] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [userInputs, setUserInputs] = useState({
    name: '',
    profession: ''
  })

  const onChange = e => setUserInputs({...userInputs, [e.target.name]: e.target.value});

  const showModal = () => setDisplayModal(true);

  const closeModal = e => {
    e.preventDefault();
    setDisplayModal(false);
    setUserInputs({
      name: '',
      profession: ''
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if(userInputs.name.trim() !== '' && userInputs.profession.trim() !== ''){
      postUser(userInputs);
      setDisplayModal(false);
      setUserInputs({
        name: '',
        profession: ''
      });
    } else {
      alert('Some Credentials are missing');
    }
  }

  const getDefaultUsers = async () => {
    const result = await axios.get('/.netlify/functions/users');
    const data = await result.data;
    setUsers([
      ...users,
      ...data
    ]);
  }

  const postUser = async (user) => {
    const result = await axios.post('/.netlify/functions/users', {...user});
    const data = await result.data;
    console.log(data);
    setUsers([
      ...users,
      data
    ]);
  }

  useEffect(() => {
    document.body.style.paddingTop = `${document.getElementById('header').clientHeight}px`;
    if(users.length !== 0) {
      let nodeList;
      nodeList = Array.from(document.querySelectorAll('.user-box'));
      nodeList[nodeList.length - 1].scrollIntoView({behavior: "smooth"});
    }
  }, [users]);



  return (
    <div>
      <title>Serverless | Ahmed Faraz</title>
      <header id="header">
        <p>Technologies used are</p>
        <p><span>Netlify Serverless</span> + <span>Gatsby</span></p>
        <div className="controls">
          <button onClick={getDefaultUsers}>GET Default Users</button>
          <button onClick={showModal}>POST New User</button>
        </div>
      </header>
      <main id="main">
          {
            users.length === 0 ? <p>No Users Found.</p> : (users.map((user, index) => 
              <div key={index} className={`user-box ${user.type}`}>
                <p>{user.name}</p>
                <small>{user.profession}</small>
              </div>))
          }
      </main>
      <div className={`modal ${displayModal && 'show'}`}>
        <form>
          <button onClick={closeModal}>x</button>
          <input type="text" name="name" onChange={onChange} value={userInputs.name} placeholder="Enter User's Name"/>
          <input type="text" name="profession" onChange={onChange} value={userInputs.profession} placeholder="Enter User's Profession" />
          <input type="submit" value="POST" onClick={onSubmit} />
        </form>
      </div>
    </div>
  )
}

export default Home;