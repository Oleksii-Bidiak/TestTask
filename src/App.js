import React from 'react';
import Header from './Components/sections/Header/Header.jsx';
import MainBlock from './Components/sections/MainBlock/MainBlock.jsx';
import FormSection from './Components/sections/PostForm/FormSection.jsx';
import Users from './Components/sections/Users/Users.jsx';

import './styles/App.scss';
import './styles/colors.scss'
import './styles/common.scss'

function App() {
  return (
    <main className="App">
      <Header />
      <MainBlock />
      <Users />
      <FormSection />
    </main>
  );
}

export default App;
