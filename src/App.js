import React, { useEffect, useState } from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => setRepos(res.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `${Date.now()}`,
      url: "www.url.com",
      techs: ["react", "node"]
    })

    setRepos([...repos, response.data])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)

    const newRepos = repos.filter(repo => repo.id !== id)

    setRepos(newRepos)
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repos.map((repo) =>
          <li key={repo.id}>
            <strong>{repo.title}</strong>

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
