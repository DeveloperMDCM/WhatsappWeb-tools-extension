import { useEffect, useState } from 'react';
import '../index.css'
const Popup = () => {
  const [theme, setTheme] = useState('default');
  const [isEnabled, setIsEnabled] = useState(false);

  
  useEffect(() => {
    chrome.storage.local.get(['theme', 'isEnabled'], (result) => {
      setTheme(result.theme || 'default');
      setIsEnabled(!!result.isEnabled);
    });
  }, []);

  
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    chrome.storage.local.set({ theme: newTheme, isEnabled: true });
    applyTheme(newTheme);
  };

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    chrome.storage.local.set({ isEnabled: checked });

    if (checked) {
      chrome.storage.local.get(['theme'], (result) => {
        const savedTheme = result.theme || 'default';
        applyTheme(savedTheme);
      });
    } else {
      applyTheme('default');
    }
  };

  const applyTheme = (themeToApply: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        func: (theme) => {
          document.body.setAttribute('data-theme', theme);
        },
        args: [themeToApply]
      });
    });
  };

  return (
    <div style={{ padding: '10px', width: '250px' }}>
      <h3>Configuración de Tema</h3>
    
      <div style={{ marginBottom: '15px' }}>
        <label>
        <div className="toggle" >
            <input type="checkbox" checked={isEnabled} 
            onChange={(e) => handleToggle(e.target.checked)}
            />
            <span className="slider"></span>
          </div>
          {/* <input 
            type="checkbox" 
            checked={isEnabled} 
            
          /> */}
          Active Themes Custom
        </label>
      </div>
      
      <select 
        value={theme} 
        onChange={(e) => handleThemeChange(e.target.value)}
        disabled={!isEnabled}
      >
        <option value="default">Default</option>
        <option value="dark">Dark</option>
        <option value="custom">Custom</option>
      </select>
    </div>
  );
};

export default Popup;