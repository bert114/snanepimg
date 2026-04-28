const imagePurposes = [
  "All",
  "Icon",
  "Product",
  "Social post",
  "Website banner",
  "Logo",
  "Art",
];
const styles = ["Realistic", "Illustration", "3D", "Anime", "Minimalist"];
const backgrounds = ["Solid white", "Detailed scene", "Transparent"];
const ratios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

export function GenerationPreferences() {
  return (
    <section className="generation-preferences">
      <div className="generation-preferences__header">
        <p>Image setup</p>
        <h2>Generation Preferences</h2>
        <span>Configure the output style, format, and visual direction.</span>
      </div>

      <div className="generation-preferences__grid">
        <PreferenceGroup title="Image purpose">
          <ChipGrid items={imagePurposes} active="All" />
        </PreferenceGroup>

        <PreferenceGroup title="Style / Model">
          <ChipGrid items={styles} active="Realistic" />
        </PreferenceGroup>

        <PreferenceGroup title="Background">
          <ChipGrid items={backgrounds} active="Solid white" />
        </PreferenceGroup>

        <PreferenceGroup title="Color preference">
          <div className="color-input">
            <input type="color" defaultValue="#00E5FF" />
            <input type="text" defaultValue="#00E5FF" />
          </div>
        </PreferenceGroup>

        <PreferenceGroup title="Aspect ratio">
          <ChipGrid items={ratios} active="1:1" />
        </PreferenceGroup>

        <PreferenceGroup title="Number of images">
          <select>
            <option>Auto — depends on selected model</option>
            <option>1 image</option>
            <option>2 images</option>
            <option>4 images</option>
          </select>
        </PreferenceGroup>
      </div>
    </section>
  );
}

function PreferenceGroup({ title, children }) {
  return (
    <div className="preference-group">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function ChipGrid({ items, active }) {
  return (
    <div className="chip-grid">
      {items.map((item) => (
        <button
          key={item}
          className={`chip ${item === active ? "chip--active" : ""}`}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
