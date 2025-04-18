import css from './styles.css?inline';
import themesJson from './themes.json';
// const $sp = (el: string, pty: string) =>
//   document.documentElement.style.setProperty(el, pty);

// $sp('--splashscreen-startup-background', '#000');
// $sp('--splashscreen-progress-primary', '#f00');
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

// Apply theme
chrome.storage.local.get(['theme', 'isEnabled'], (result) => {
  if (result.isEnabled) {
    document.body.setAttribute('data-theme', result.theme || 'default');
  }
});

// Listen for changes from popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'applyTheme') {
    document.body.setAttribute('data-theme', request.theme);
  }
});


function initScript() {
  // const $$ = (el: String) => document.querySelector(el); // any element

  if (document.getElementById('custom-toggle-button-menu')) return;

  const buttonContainer = document.querySelector(
    '.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.xeuugli.x2lwn1j.xozqiw3.x1oa3qoh.x12fk4p8'
  );
  if (!buttonContainer) return;

  
  const buttonOpenCloseMenuLeft = document.createElement('button');
  const buttonOpenCloseChats = document.createElement('button');
  buttonOpenCloseMenuLeft.innerHTML = `
        <button id="custom-toggle-button-menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 21h-6a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6.5" />
            <path d="M9 18h3" />
            <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M19.001 15.5v1.5" />
            <path d="M19.001 21v1.5" />
            <path d="M22.032 17.25l-1.299 .75" />
            <path d="M17.27 20l-1.3 .75" />
            <path d="M15.97 17.25l1.3 .75" />
            <path d="M20.733 20l1.3 .75" />
        </svg>
        </button>
      `;
  buttonOpenCloseChats.innerHTML = `
        <button id="custom-toggle-button-chats">
         <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-box-align-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.002 3.003h-5a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h5a1 1 0 0 0 1 -1v-16a1 1 0 0 0 -1 -1z" /><path d="M15.002 19.003a1 1 0 0 1 .117 1.993l-.127 .007a1 1 0 0 1 -.117 -1.993l.127 -.007z" /><path d="M20.003 19.003a1 1 0 0 1 .117 1.993l-.128 .007a1 1 0 0 1 -.117 -1.993l.128 -.007z" /><path d="M20.003 14.002a1 1 0 0 1 .117 1.993l-.128 .007a1 1 0 0 1 -.117 -1.993l.128 -.007z" /><path d="M20.003 8.002a1 1 0 0 1 .117 1.993l-.128 .007a1 1 0 0 1 -.117 -1.993l.128 -.007z" /><path d="M20.003 3.002a1 1 0 0 1 .117 1.993l-.128 .007a1 1 0 0 1 -.117 -1.993l.128 -.007z" /><path d="M15.002 3.002a1 1 0 0 1 .117 1.993l-.127 .007a1 1 0 0 1 -.117 -1.993l.127 -.007z" /></svg>
        </button>
      `;

  
  const menuContainer = document.querySelector(
    '.x9f619.x1n2onr6.xyw6214.x5yr21d.x6ikm8r.x10wlt62.x17dzmu4.x1i1dayz.x2ipvbc.x1w8yi2h.xyyilfv.x1iyjqo2.xy80clv.x26u7qi.x1ux35ld'
  );
  if (!menuContainer) return;

  const menu = document.createElement('div');
  menu.id = 'custom-theme-menu';
 
  const themesHtml = themesJson.themes
    .map(
      (theme) => `
    <div title="${theme.name}" class="theme-card ${theme.value === 'default' ? 'selected' : ''
        }" data-theme="${theme.value}">
      <input type="radio" class="theme-radio" id="theme-${theme.value
        }" name="theme" ${theme.value === 'default' ? 'checked' : ''}>
      <label for="theme-${theme.value}" class="chat-preview">
        <div class="msg sent"></div>
        <div class="msg received"></div>
      </label>
    </div>
  `
    )
    .join('');
 
  menu.innerHTML = `
    <div class="settings-items-title">
    <h3 style="margin: 0;">Configuración</h3>
    <a href="https://github.com/hpsan/whatsapp-tools-changer" target="_blank">
    <div>
    <span>v1.0</span>
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
    </div>
    </a>
    </div>
    <hr>
    <section class="themes-section">
    <h2>Themes</h2>
    <div class="themes-grid">
      ${themesHtml}
      </div>
    </section>

   
  `;

 
  buttonContainer.appendChild(buttonOpenCloseMenuLeft);
  buttonContainer.appendChild(buttonOpenCloseChats);

  menuContainer.appendChild(menu); // ¡Insert the menu inside the container!

  buttonOpenCloseMenuLeft.addEventListener('click', () => {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
      return;
    }
    menu.style.display = 'block';
  });

  buttonOpenCloseChats.addEventListener('click', () => {
    const chatsMenu = document.querySelector(
      '._aigw.x9f619.x1n2onr6.x5yr21d.x17dzmu4.x1i1dayz.x2ipvbc.x1w8yi2h.x78zum5.xdt5ytf.xa1v5g2.x1plvlek.xryxfnj.xd32934.x1m6msm'
    ) as HTMLInputElement;
    const statusMenu = document.querySelector(
      '._aigw.false.xxpasqj.x9f619.x1n2onr6.x5yr21d.x17dzmu4.x1i1dayz.x2ipvbc.x1w8yi2h.x78zum5.xdt5ytf.xd32934.x6ikm8r.x10wlt62.x1ks9yow.xy80clv.x26u7qi.x1ux35ld'
    ) as HTMLInputElement;
    if (chatsMenu && statusMenu) {
      chatsMenu.style.display =
        chatsMenu.style.display === 'block' ? 'none' : 'block';
      statusMenu.style.display =
        statusMenu.style.display === 'block' ? 'none' : 'block';
    }
  });

  
  const themeRadios = menu.querySelectorAll('.theme-radio');
  themeRadios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      const selectedTheme = (e.target as HTMLInputElement).id.replace(
        'theme-',
        ''
      );
  
      menu.querySelectorAll('.theme-card').forEach((card) => {
        card.classList.remove('selected');
      });
   
      const selectedCard = menu.querySelector(
        `[data-theme="${selectedTheme}"]`
      );
      selectedCard?.classList.add('selected');
      chrome.storage.local.set({ theme: selectedTheme, isEnabled: true });
      document.body.setAttribute('data-theme', selectedTheme);
    });
  });
 
  chrome.storage.local.get(['theme', 'isEnabled'], (result) => {
    const savedTheme = result.theme || 'default';
    const radio = menu.querySelector(
      `#theme-${savedTheme}`
    ) as HTMLInputElement;
    if (radio) {
      menu.querySelectorAll('.theme-card').forEach((card) => {
        card.classList.remove('selected');
      });
      radio.checked = true;
      const selectedCard = menu.querySelector(`[data-theme="${savedTheme}"]`);
      selectedCard?.classList.add('selected');
    }
  });
}


const observer = new MutationObserver(() => {
  const targetContainer = document.querySelector(
    '.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xeuugli.x2lwn1j.xl56j7k.x1q0g3np.x6s0dn4.xvy4d1p.xxk0z11'
  );
  if (targetContainer) {
    initScript();
    observer.disconnect(); 
  }
});


observer.observe(document.body, { childList: true, subtree: true });
