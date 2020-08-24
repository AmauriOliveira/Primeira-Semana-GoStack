const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()} ${url}]`;

    console.time(logLabel);
    next();
    console.time(logLabel);
}
function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ erro: 'Invalid project ID.' });
    }

    return next();
}

app.use('/projects/:id', validateProjectId);//aplica só em determinadas rotas
app.use(logRequests);///coloca um midleware

app.use(cors());
app.use(express.json());///para avisar que vai ser usado json

const projects = [];

app.get('/projects', (request, response) => {
    const { title = '', owner = '' } = request.query;

    const preResults = projects.filter(project => project.title.includes(title));
    const results = preResults.filter(project => project.owner.includes(owner));

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    //console.log(` O projeto ${title} pertence ao ${owner}.`);
    const project = { id: uuid(), title, owner };
    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ erro: 'Project not found.' });
    }
    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ erro: 'Project not found.' });
    }
    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('🚀 Back-end Started! 🚀');
});