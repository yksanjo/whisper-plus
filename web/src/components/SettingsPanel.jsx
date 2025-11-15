function SettingsPanel({ settings, onSettingsChange, disabled }) {
  const updateSetting = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      <div className="space-y-4">
        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model Size
          </label>
          <select
            value={settings.model}
            onChange={(e) => updateSetting('model', e.target.value)}
            disabled={disabled}
            className="input"
          >
            <option value="tiny">Tiny (Fastest, ~39M params)</option>
            <option value="base">Base (Balanced, ~74M params)</option>
            <option value="small">Small (Better, ~244M params)</option>
            <option value="medium">Medium (High quality, ~769M params)</option>
            <option value="large">Large (Best quality, ~1550M params)</option>
          </select>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => updateSetting('language', e.target.value)}
            disabled={disabled}
            className="input"
          >
            <option value="auto">Auto-detect</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        {/* Options */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.withTimestamps}
              onChange={(e) => updateSetting('withTimestamps', e.target.checked)}
              disabled={disabled}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Include timestamps</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.translate}
              onChange={(e) => updateSetting('translate', e.target.checked)}
              disabled={disabled}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Translate to English</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel

