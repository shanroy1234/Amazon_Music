import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Player from './Player';
import Home from '../pages/Home';
import Library from '../pages/Library';
import Search from '../pages/Search';
import Playlist from '../pages/Playlist';
import Album from '../pages/Album';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/album/:id" element={<Album />} />
            </Routes>
          </main>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;