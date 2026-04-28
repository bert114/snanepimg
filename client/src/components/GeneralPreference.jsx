const purposes = [
  "All",
  "Icon",
  "Product",
  "Social Post",
  "Website Banner",
  "Logo",
  "Art",
];

const models = [
  { title: "Realistic", desc: "Photo-like" },
  { title: "Illustration", desc: "Drawn style" },
  { title: "3D", desc: "Depth/object" },
  { title: "Anime", desc: "Stylized" },
  { title: "Minimalist", desc: "Clean/simple" },
];

const backgrounds = [
  { title: "Solid white", desc: "Clean backdrop" },
  { title: "Detailed scene", desc: "Full environment" },
  { title: "Transparent", desc: "Checkerboard" },
];

const colors = ["cyan", "blue", "purple", "custom"];

const ratios = [
  { label: "1:1", shape: "square" },
  { label: "16:9", shape: "wide" },
  { label: "9:16", shape: "tall" },
  { label: "4:3", shape: "wide" },
  { label: "3:4", shape: "tall" },
];

function GenerationPreferences() {
  return (
    <section className="generation-preferences">
      <header className="generation-preferences__header">
        <h2>Generation Preferences</h2>
        <p>Configure how the AI should generate your image.</p>
      </header>

      <div className="generation-preferences__body">
        <PreferenceBlock title="Image Purpose">
          <div className="chip-list">
            {purposes.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`chip ${index === 0 ? "chip--active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </PreferenceBlock>

        <PreferenceBlock title="Style / Model">
          <div className="card-grid">
            {models.map((item, index) => (
              <OptionCard
                key={item.title}
                title={item.title}
                desc={item.desc}
                active={index === 0}
              />
            ))}
          </div>
        </PreferenceBlock>

        <PreferenceBlock title="Background">
          <div className="card-grid card-grid--three">
            {backgrounds.map((item, index) => (
              <OptionCard
                key={item.title}
                title={item.title}
                desc={item.desc}
                active={index === 0}
              />
            ))}
          </div>
        </PreferenceBlock>

        <PreferenceBlock title="Color Preference">
          <div className="color-row">
            <input type="color" defaultValue="#00E5FF" />
            <input type="text" defaultValue="#00E5FF" />
          </div>

          <div className="chip-list chip-list--small">
            {colors.map((item) => (
              <button key={item} type="button" className="chip chip--small">
                {item}
              </button>
            ))}
          </div>
        </PreferenceBlock>

        <PreferenceBlock title="Aspect Ratio">
          <div className="ratio-list">
            {ratios.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={`ratio-button ${index === 0 ? "ratio-button--active" : ""}`}
              >
                <span>{item.label}</span>
                <i className={`ratio-shape ratio-shape--${item.shape}`} />
              </button>
            ))}
          </div>
        </PreferenceBlock>

        <PreferenceBlock title="Number of Images">
          <select className="image-count-select">
            <option>Auto — depends on selected model</option>
            <option>1 image</option>
            <option>2 images</option>
            <option>4 images</option>
          </select>
        </PreferenceBlock>
      </div>
    </section>
  );
}

function PreferenceBlock({ title, children }) {
  return (
    <div className="preference-block">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function OptionCard({ title, desc, active }) {
  return (
    <button
      type="button"
      className={`option-card ${active ? "option-card--active" : ""}`}
    >
      <strong>
        {active ? "✓ " : ""}
        {title}
      </strong>
      <span>{desc}</span>
    </button>
  );
}

export default GenerationPreferences;
