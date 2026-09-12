import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const healthResponse =
          await fetch("/health");

        if (!healthResponse.ok) {
          throw new Error("API unavailable");
        }

        setApiStatus("Healthy");

        const response =
          await fetch("/api/items");

        if (!response.ok) {
          throw new Error("Unable to fetch items");
        }

        const result = await response.json();

        setItems(result.data);
      } catch (err) {
        setApiStatus("Unavailable");
        setError(err.message);
      }
    }

    loadData();
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <div className="badge">
          Docker Multi-Service
        </div>

        <h1>
          Multi-Service
          <span> Application</span>
        </h1>

        <p>
          React + Node.js + MongoDB + Redis + Nginx
        </p>

        <div className="status-card">
          <div>
            <small>API STATUS</small>
            <strong>{apiStatus}</strong>
          </div>

          <div className="pulse"></div>
        </div>
      </header>

      <main>
        <section className="services">
          <Service
            name="React"
            description="Frontend application"
            icon="⚛️"
          />

          <Service
            name="Node.js"
            description="Express API"
            icon="🟢"
          />

          <Service
            name="MongoDB"
            description="Persistent database"
            icon="🍃"
          />

          <Service
            name="Redis"
            description="High-speed cache"
            icon="⚡"
          />

          <Service
            name="Nginx"
            description="Reverse proxy"
            icon="🌐"
          />
        </section>

        <section className="items-section">
          <h2>Infrastructure Services</h2>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <div className="items">
            {items.map((item) => (
              <article
                className="item"
                key={item.id}
              >
                <div className="item-number">
                  {String(item.id).padStart(2, "0")}
                </div>

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    {item.description}
                  </p>
                </div>

                <span className="running">
                  {item.status}
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>
          Built with Docker Compose
        </p>
      </footer>
    </div>
  );
}

function Service({
  name,
  description,
  icon
}) {
  return (
    <div className="service">
      <div className="service-icon">
        {icon}
      </div>

      <h3>{name}</h3>

      <p>{description}</p>
    </div>
  );
}

export default App;