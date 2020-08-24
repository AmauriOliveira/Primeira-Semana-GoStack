import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header';
import background from './assets/geo.png';

import './App.css';

export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then((response) => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        //setProjects([...projects, `Novo ${Date.now()}`]);
        const response = await api.post('/projects', {
            title: `Novo ${Date.now()}`,
            owner: "Jose"
        });

        const proj = response.data;
        console.log(proj);
        setProjects([...projects, proj]);
    };

    return (
        <>
            <Header title="Projects">
                <img src={background} width="300" />
                <ul>
                    {projects.map(project => <li key={project.id}>{project.title}</li>)}
                </ul>
            </Header>
            <button
                type="button"
                onClick={handleAddProject}>Add Project
            </button>
        </>
    );
}