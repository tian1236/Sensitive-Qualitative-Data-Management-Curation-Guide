(function () {
    'use strict';

    const isZh = () => document.body.classList.contains('show-zh');

    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            nav .site-mobile-menu { display:flex !important; position:absolute; left:0; right:0; top:100%;
                flex-direction:column; gap:0; padding:1rem 1.5rem; background:white; border-bottom:1px solid #e5e7eb;
                box-shadow:0 12px 24px rgba(0,0,0,.08); }
            nav .site-mobile-menu a, nav .site-mobile-menu button { padding:.65rem 0; }
            nav .site-mobile-menu .site-nav-dropdown { width:100%; padding-bottom:0; margin-bottom:0; }
            nav .site-mobile-menu .site-nav-trigger { width:100%; justify-content:space-between; }
            nav .site-mobile-menu .site-nav-dropdown-menu { display:none; position:static; min-width:0; margin:0;
                padding:.1rem 0 .25rem 1rem; border:0; box-shadow:none; background:transparent; }
            nav .site-mobile-menu .site-nav-dropdown.is-open .site-nav-dropdown-menu { display:flex; }
        }
        .site-nav-dropdown { position:relative; padding-bottom:.55rem; margin-bottom:-.55rem; }
        .site-nav-trigger { display:flex; align-items:center; gap:.3rem; color:#4b5563; transition:color .15s; }
        .site-nav-trigger:hover, .site-nav-dropdown:focus-within .site-nav-trigger { color:#0f5132; }
        .site-nav-dropdown-menu { display:none; position:absolute; top:100%; left:50%; z-index:60;
            width:18rem; transform:translateX(-50%); flex-direction:column; padding:.5rem; border:1px solid #e5e7eb;
            border-radius:.75rem; background:#fff; box-shadow:0 12px 28px rgba(15,81,50,.12); }
        .site-nav-dropdown:hover .site-nav-dropdown-menu, .site-nav-dropdown:focus-within .site-nav-dropdown-menu,
        .site-nav-dropdown.is-open .site-nav-dropdown-menu { display:flex; }
        .site-nav-dropdown-menu a { display:block; padding:.6rem .75rem; border-radius:.45rem; line-height:1.35; }
        .site-nav-dropdown-menu a:hover, .site-nav-dropdown-menu a:focus { background:#e6f0ea; color:#0f5132; outline:none; }
        /* Shared woodland-paper visual language. */
        body { background:#fbfaf5; color:#26332b; }
        nav { border-color:rgba(73,104,81,.16) !important; box-shadow:0 2px 14px rgba(31,57,40,.045); }
        nav + header:not(.tools-hero), nav + section.home-hero { position:relative; overflow:hidden; background:linear-gradient(135deg,#dcebdd 0%,#f6f4cf 54%,#f9f6e9 100%) !important; }
        nav + header:not(.tools-hero):before, nav + section.home-hero:before { content:''; position:absolute; inset:-45% 32% auto -12%; height:175%; border-radius:48%; background:radial-gradient(ellipse,rgba(37,92,65,.25),rgba(37,92,65,0) 65%); filter:blur(10px); pointer-events:none; }
        nav + header:not(.tools-hero):after, nav + section.home-hero:after { content:''; position:absolute; width:20rem; height:20rem; right:-6rem; bottom:-13rem; border-radius:50%; background:radial-gradient(circle,rgba(212,194,93,.42),rgba(212,194,93,0) 68%); pointer-events:none; }
        nav + header:not(.tools-hero) > *, nav + section.home-hero > * { position:relative; z-index:1; }
        .home-hero { border-bottom:1px solid rgba(73,104,81,.14); }
        .home-intro-card { border-color:#d9dfc2 !important; border-radius:1rem !important; background:linear-gradient(145deg,#fffef6,#f8f7ea) !important; box-shadow:0 10px 20px rgba(73,79,47,.12) !important; }
        .home-value-card { position:relative; overflow:hidden; border-radius:1rem !important; border-color:#d8dfc5 !important; background:linear-gradient(145deg,#fffef8,#f5f7e9) !important; box-shadow:0 9px 19px rgba(47,68,49,.1) !important; }
        .home-value-card:before { content:''; position:absolute; left:0; top:0; bottom:0; width:.28rem; background:#4d7651; }
        .home-value-card:nth-child(2):before { background:#c79245; }.home-value-card:nth-child(3):before { background:#4f8392; }
        .home-value-card:hover, .home-intro-card:hover { transform:translateY(-2px); box-shadow:0 15px 25px rgba(47,68,49,.14) !important; }
        .card-hover, .reference-card, .template-block { border-color:#dfe4d7 !important; box-shadow:0 7px 17px rgba(47,68,49,.055); }
        .card-hover:hover { border-color:#9db9a0 !important; box-shadow:0 14px 25px rgba(47,68,49,.12) !important; }
        aside .sticky:not(.tools-sidebar) { border:1px solid #dde6d9; border-radius:.9rem; padding:1rem; background:linear-gradient(180deg,#fffef9,#f3f7ef); box-shadow:0 7px 17px rgba(47,68,49,.055); }
        aside .sticky:not(.tools-sidebar) nav { box-shadow:none; }
        aside .sticky:not(.tools-sidebar) nav a { border-radius:.4rem; padding:.42rem .55rem; }
        aside .sticky:not(.tools-sidebar) nav a:hover { background:#e8f1e7; }
        /* Complete site treatment: field-notebook paper, calm forest ink and deliberate hierarchy. */
        body.bg-white, body.bg-slate-50 { background-color:#f7f1e4 !important; background-image:radial-gradient(rgba(83,73,46,.045) .65px,transparent .75px),radial-gradient(rgba(255,255,255,.72) .65px,transparent .75px),linear-gradient(125deg,rgba(255,255,255,.68),rgba(243,237,218,.7)) !important; background-size:9px 9px,13px 13px,100% 100% !important; background-position:0 0,4px 5px,0 0 !important; }
        h1,h2,h3 { color:#223c2a; letter-spacing:-.018em; }
        h1 { font-family:Georgia,'Times New Roman','Noto Serif SC',serif; font-weight:700; }
        h2 { font-family:Georgia,'Times New Roman','Noto Serif SC',serif; }
        p { line-height:1.72; }
        nav { background:rgba(255,253,245,.93) !important; }
        nav .container { min-height:3.75rem; }
        nav a[href="index.html"] { letter-spacing:-.02em; }
        .site-nav-dropdown-menu { border-color:#d8e0ce; background:linear-gradient(155deg,#fffef8,#f3f6ec); box-shadow:0 15px 35px rgba(46,70,46,.16); }
        .site-nav-dropdown-menu a { color:#415448; }
        nav + section:not(.home-hero) { position:relative; overflow:hidden; background:linear-gradient(135deg,#e2efdf 0%,#f5f0ca 58%,#f8f4e5 100%) !important; }
        nav + section:not(.home-hero):before { content:''; position:absolute; width:28rem; height:18rem; left:-10rem; top:-12rem; border-radius:50%; background:radial-gradient(ellipse,rgba(40,91,59,.2),rgba(40,91,59,0) 66%); pointer-events:none; }
        nav + section:not(.home-hero) > .container { position:relative; z-index:1; }
        main .bg-white.border, main .reference-card, main .template-block { background:linear-gradient(145deg,rgba(255,255,252,.95),rgba(250,247,232,.9)) !important; }
        main .border-gray-200 { border-color:#d9dfcf !important; }
        main details { border-color:#d5dfcf !important; background:rgba(255,254,248,.72); border-radius:.85rem; }
        details > summary.deep-dive-note, details > summary.deep-dive-processing, details > summary.deep-dive-standards { min-height:4.15rem; padding:1rem 1.25rem !important; background:linear-gradient(100deg,#e0eddd 0%,#edf3df 52%,#fbf6da 100%) !important; color:#1f5c37 !important; border:1px solid #d5dfc8; border-left:5px solid #4d7651; border-radius:.9rem .9rem 0 0; box-shadow:inset 0 1px rgba(255,255,255,.88); font-size:1.05rem; }
        details > summary.deep-dive-note .lang-en, details > summary.deep-dive-note .lang-zh, details > summary.deep-dive-processing .lang-en, details > summary.deep-dive-processing .lang-zh, details > summary.deep-dive-standards .lang-en, details > summary.deep-dive-standards .lang-zh { color:#1f5c37 !important; }
        details > summary.deep-dive-note > i, details > summary.deep-dive-processing > i, details > summary.deep-dive-standards > i { color:#2f6b43; stroke-width:3; }
        details:has(> summary.deep-dive-note), details:has(> summary.deep-dive-processing), details:has(> summary.deep-dive-standards) { border-color:#d5dfc8 !important; border-radius:.9rem; overflow:hidden; }
        main blockquote { border-color:#85a486 !important; background:rgba(234,243,229,.66) !important; border-radius:0 .75rem .75rem 0; }
        main table { background:rgba(255,254,249,.82); border-radius:.75rem; overflow:hidden; }
        main th { background:#edf4e7; color:#27452f; }
        a.bg-primary, button.bg-primary, .bg-primary.text-white { box-shadow:0 5px 0 rgba(20,62,36,.18),0 10px 20px rgba(27,83,46,.16); }
        a.bg-primary:hover, button.bg-primary:hover { transform:translateY(-1px); box-shadow:0 6px 0 rgba(20,62,36,.18),0 13px 22px rgba(27,83,46,.18); }
        footer { position:relative; overflow:hidden; background:linear-gradient(125deg,#183b28,#2d6043 63%,#6c7d3e) !important; }
        footer:before { content:''; position:absolute; width:22rem; height:22rem; border-radius:50%; right:-8rem; top:-15rem; background:radial-gradient(circle,rgba(206,217,124,.25),rgba(206,217,124,0) 68%); }
        footer > * { position:relative; z-index:1; }
        footer a:hover { color:#f8edb5; }
        @media (min-width:768px) {
            footer .site-footer-grid { grid-template-columns:minmax(0,1.6fr) minmax(0,1.25fr) minmax(0,1.15fr) minmax(0,.7fr); }
        }
        /* Layered watercolour pigment marks for every page banner. */
        body .site-hero-banner { isolation:isolate; }
        body .site-hero-banner:before { content:''; position:absolute; z-index:0; inset:0; background-image:radial-gradient(ellipse 55% 120% at -10% 18%,rgba(28,76,49,.42),rgba(44,98,64,.17) 38%,transparent 72%),radial-gradient(ellipse 48% 126% at 48% -15%,rgba(104,146,81,.32),transparent 68%),radial-gradient(ellipse 50% 116% at 110% 62%,rgba(210,192,70,.4),rgba(235,223,139,.15) 43%,transparent 76%),linear-gradient(110deg,rgba(255,255,255,.18),rgba(255,255,255,0) 45%,rgba(255,255,255,.2)),radial-gradient(rgba(255,255,255,.58) .65px,transparent .85px),radial-gradient(rgba(53,91,51,.15) .55px,transparent .8px); background-size:100% 100%,100% 100%,100% 100%,100% 100%,11px 11px,17px 17px; background-position:0 0,0 0,0 0,0 0,0 0,5px 6px; mix-blend-mode:multiply; pointer-events:none; }
        body .site-hero-banner:after { content:''; position:absolute; z-index:0; right:7%; top:-38%; width:18rem; height:17rem; border-radius:48% 52% 44% 56%; background:radial-gradient(ellipse at 35% 38%,rgba(255,255,255,.55),transparent 16%),radial-gradient(ellipse at 68% 60%,rgba(230,215,102,.36),transparent 52%),radial-gradient(ellipse at 40% 55%,rgba(63,112,69,.18),transparent 70%); filter:blur(2px); opacity:.82; transform:rotate(-13deg); pointer-events:none; }
        body .site-hero-banner > * { position:relative; z-index:1; }
        body .site-hero-module2:before { background-position:0 0,0 0,14% 0,0 0,2px 4px,8px 3px; } body .site-hero-module3:before { background-position:8% 0,-11% 0,0 0,0 0,6px 2px,1px 8px; } body .site-hero-module4:before { background-position:-8% 0,8% 0,-10% 0,0 0,3px 7px,9px 1px; } body .site-hero-tools:before { background-position:6% 0,0 0,12% 0,0 0,1px 2px,7px 8px; }
        @media (max-width:767px) { body .site-hero-banner:before { background-image:radial-gradient(ellipse 70% 125% at -12% 10%,rgba(28,76,49,.34),transparent 72%),radial-gradient(ellipse 58% 120% at 110% 65%,rgba(210,192,70,.3),transparent 75%),linear-gradient(110deg,rgba(255,255,255,.18),rgba(255,255,255,0)); } body .site-hero-banner:after { right:-5rem; top:-3rem; opacity:.58; } }
        .hazel-note { position:relative; isolation:isolate; border:1px solid #e1d8c6 !important; border-radius:.22rem !important; background-color:#fffdf6 !important; background-image:radial-gradient(rgba(100,83,55,.075) .55px,transparent .75px),radial-gradient(rgba(255,255,255,.9) .6px,transparent .8px),linear-gradient(145deg,rgba(255,255,252,.99),rgba(248,244,232,.98)) !important; background-size:8px 8px,12px 12px,100% 100% !important; background-position:0 0,3px 4px,0 0 !important; box-shadow:3px 4px 0 rgba(85,75,55,.13),6px 8px 0 rgba(85,75,55,.055),0 13px 22px rgba(54,62,42,.12) !important; clip-path:polygon(0 1.2%,2% .2%,5% 1.1%,9% .25%,13% 1%,18% .15%,23% 1%,29% .2%,35% 1%,41% .2%,47% 1%,54% .2%,61% 1%,69% .1%,76% 1%,83% .2%,90% 1%,96% .15%,100% 1.1%,99.4% 10%,100% 18%,99.25% 27%,100% 36%,99.3% 46%,100% 56%,99.35% 67%,100% 77%,99.3% 88%,100% 98.6%,94% 99.5%,88% 98.9%,81% 99.65%,74% 99%,67% 99.7%,59% 99%,51% 99.75%,43% 99%,34% 99.7%,25% 99%,16% 99.65%,8% 99%,0 98.7%,.65% 88%,0 77%,.7% 67%,0 56%,.75% 46%,0 36%,.7% 26%,0 16%,.65% 7%); }
        .hazel-note:after { content:''; position:absolute; z-index:0; left:7%; right:7%; bottom:4px; height:7px; background:radial-gradient(circle,rgba(72,66,46,.24) 1px,transparent 1.35px) 0 0/5px 5px; opacity:.35; filter:blur(.15px); pointer-events:none; }
        .hazel-note > * { position:relative; z-index:1; }
        .hazel-note p { letter-spacing:.008em; }
        .hazel-note .hazel-note-title { color:#111827 !important; font-family:'Segoe Print','Bradley Hand','KaiTi','STKaiti',cursive; font-size:1.08em; font-weight:800; letter-spacing:.02em; }
        .hazel-note p:not(.hazel-note-title):not(.text-primary) { color:#171b18 !important; font-family:'Bradley Hand','Chalkboard SE','Comic Sans MS','KaiTi','STKaiti',cursive; font-size:1.01em; line-height:1.78; }
        .hazel-note p.text-primary { color:#174a2b !important; font-weight:700; line-height:1.72; }
        body.show-zh .hazel-note .hazel-note-title { font-family:'STKaiti','KaiTi','Microsoft YaHei',cursive; }
        body.show-zh .hazel-note p:not(.hazel-note-title):not(.text-primary) { font-family:'KaiTi','STKaiti','Microsoft YaHei',cursive; }
        @media (max-width:767px) { .home-hero { padding-top:2.25rem !important; padding-bottom:2.75rem !important; }.home-intro-card { margin-bottom:1.5rem !important; } }
        .site-toc-active { color:#0f5132 !important; font-weight:700; }
        .site-action-row { display:flex; flex-wrap:wrap; gap:.5rem; margin:.75rem 0; }
        .site-action { border:1px solid #d1d5db; border-radius:.375rem; padding:.45rem .75rem; font-size:.75rem;
            background:#fff; color:#374151; cursor:pointer; }
        .site-action:hover, .site-action:focus { border-color:#0f5132; color:#0f5132; outline:none; }
        .hazel-squirrel-slot { width:88px !important; height:88px !important; min-width:88px; display:flex;
            align-items:flex-start; justify-content:flex-start; overflow:visible; background:transparent !important;
            border-radius:0 !important; }
        .hazel-squirrel-avatar { width:88px; height:88px; display:block; object-fit:contain; }
        @media (max-width: 640px) {
            .hazel-squirrel-slot { width:64px !important; height:64px !important; min-width:64px; }
            .hazel-squirrel-avatar { width:64px; height:64px; }
        }
    `;
    document.head.appendChild(style);

    // Replace every legacy Hazel squirrel emoji with the shared researcher illustration.
    document.querySelectorAll('span').forEach(icon => {
        if (icon.childElementCount === 0 && icon.textContent.trim() === '🐿️') {
            const avatar = document.createElement('img');
            const slot = icon.parentElement;
            const card = slot.parentElement;
            const panel = card && card.parentElement;
            const isMistakeCard = panel && panel.textContent.includes('Hazel’s Mistake');
            avatar.src = isMistakeCard ? 'assets/hazel-squirrel-mistake.png' : 'assets/hazel-squirrel-researcher.png';
            avatar.alt = '';
            avatar.className = 'hazel-squirrel-avatar';
            slot.classList.remove('w-9', 'h-9', 'w-10', 'h-10', 'rounded-full', 'bg-white', 'bg-accent', 'justify-center');
            slot.classList.add('hazel-squirrel-slot');
            panel.classList.add('hazel-note');
            icon.textContent = '';
            icon.appendChild(avatar);
        }
    });

    // Give every Hazel scenario card the same calm, handwritten-note treatment.
    document.querySelectorAll('img[src*="hazel-squirrel"]').forEach(image => {
        let card = image.parentElement;
        while (card && card !== document.body) {
            if (card.classList && (card.classList.contains('home-intro-card') || card.classList.contains('bg-accent/30'))) break;
            if (card.tagName === 'SECTION' && !card.id) break;
            card = card.parentElement;
        }
        if (card && card !== document.body) card.classList.add('hazel-note');
    });
    document.querySelectorAll('.hazel-note p.font-medium').forEach(title => title.classList.add('hazel-note-title'));

    // Every Deep Dive follows one shared green paper-header design.
    document.querySelectorAll('details > summary').forEach(summary => {
        if (/deep\s*dive|深度拓展/i.test(summary.textContent)) summary.classList.add('deep-dive-note');
    });

    const pageKey = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
    const heroBanner = document.querySelector('nav + header, nav + section');
    if (heroBanner) heroBanner.classList.add('site-hero-banner', `site-hero-${pageKey === 'index' ? 'home' : pageKey}`);

    // Shared site navigation: grouped modules and resources with hover/focus menus.
    const mobileButton = document.querySelector('nav button.md\\:hidden');
    const primaryNav = document.querySelector('nav > div > div.hidden');
    if (primaryNav) {
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        const navLink = (href, en, zh) => `<a href="${href}" class="hover:text-primary transition-colors${currentPage === href ? ' text-primary font-semibold' : ''}"><span class="lang-en">${en}</span><span class="lang-zh">${zh}</span></a>`;
        const group = (id, en, zh, links) => `<div class="site-nav-dropdown"><button type="button" class="site-nav-trigger" aria-expanded="false" aria-controls="${id}"><span class="lang-en">${en}</span><span class="lang-zh">${zh}</span><span aria-hidden="true">▾</span></button><div id="${id}" class="site-nav-dropdown-menu">${links}</div></div>`;
        primaryNav.innerHTML = [
            navLink('index.html', 'Home', '首页'),
            group('modules-menu', 'Modules', '模块', [
                navLink('module1.html', '1 · Foundations', '1 · 基础认知'),
                navLink('module2.html', '2 · Full Lifecycle Management', '2 · 全生命周期管理'),
                navLink('module3.html', '3 · Legal & Ethical Frameworks', '3 · 法律与伦理框架'),
                navLink('module4.html', '4 · Curation & Archiving', '4 · 策展与归档'),
                navLink('module5.html', '5 · Case Practice', '5 · 案例演练')
            ].join('')),
            group('resources-menu', 'Resources', '资源', [
                navLink('tools.html', 'Learning Materials', '学习资料'),
                navLink('references.html', 'References', '参考文献'),
                navLink('glossary.html', 'Glossary', '术语表')
            ].join('')),
            navLink('about.html', 'About', '关于本站'),
            '<button id="langToggle" class="px-3 py-1 border border-gray-300 rounded text-xs hover:border-primary hover:text-primary transition-colors"><span class="lang-en">中文</span><span class="lang-zh">English</span></button>'
        ].join('');
        primaryNav.querySelectorAll('.site-nav-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const dropdown = trigger.parentElement;
                const opening = !dropdown.classList.contains('is-open');
                primaryNav.querySelectorAll('.site-nav-dropdown').forEach(item => {
                    item.classList.remove('is-open');
                    item.querySelector('.site-nav-trigger').setAttribute('aria-expanded', 'false');
                });
                dropdown.classList.toggle('is-open', opening);
                trigger.setAttribute('aria-expanded', String(opening));
            });
        });
        const languageToggle = primaryNav.querySelector('#langToggle');
        languageToggle.addEventListener('click', () => {
            document.body.classList.toggle('show-zh');
            const lang = document.body.classList.contains('show-zh') ? 'zh' : 'en';
            localStorage.setItem('sqdmc_lang', lang);
            document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        });
    }
    if (mobileButton) {
        const navRow = mobileButton.parentElement;
        const menu = Array.from(navRow.children).find(node => node.tagName === 'DIV' && node.classList.contains('hidden'));
        mobileButton.setAttribute('aria-label', isZh() ? '打开导航菜单' : 'Open navigation menu');
        mobileButton.setAttribute('aria-expanded', 'false');
        if (menu) {
            mobileButton.addEventListener('click', () => {
                const open = menu.classList.toggle('site-mobile-menu');
                mobileButton.setAttribute('aria-expanded', String(open));
            });
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape') {
                    menu.classList.remove('site-mobile-menu');
                    mobileButton.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Persist checklist progress locally; no research data leaves the device.
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
        const key = `sqdmc_check_${location.pathname}_${index}`;
        checkbox.checked = localStorage.getItem(key) === '1';
        checkbox.addEventListener('change', () => localStorage.setItem(key, checkbox.checked ? '1' : '0'));
    });

    // Deep-dive notes should be visible by default, while remaining collapsible.
    document.querySelectorAll('details').forEach(detail => {
        const summary = detail.querySelector(':scope > summary');
        if (summary && /deep\s*dive|深度拓展/i.test(summary.textContent)) detail.open = true;
    });

    // Keep left-hand table-of-contents links in sync with the section in view.
    const tocLinks = Array.from(document.querySelectorAll('aside nav a[href^="#"]'))
        .map(link => ({ link, target: document.getElementById(link.getAttribute('href').slice(1)) }))
        .filter(item => item.target);
    if (tocLinks.length) {
        let currentIndex = -1;
        let ticking = false;
        const updateToc = () => {
            const readingLine = 180;
            let nextIndex = 0;
            tocLinks.forEach((item, index) => {
                if (item.target.getBoundingClientRect().top <= readingLine) nextIndex = index;
            });
            if (nextIndex !== currentIndex) {
                tocLinks.forEach((item, index) => {
                    const active = index === nextIndex;
                    item.link.classList.toggle('site-toc-active', active);
                    item.link.setAttribute('aria-current', active ? 'location' : 'false');
                });
                currentIndex = nextIndex;
            }
            ticking = false;
        };
        const scheduleTocUpdate = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateToc);
            }
        };
        window.addEventListener('scroll', scheduleTocUpdate, { passive: true });
        window.addEventListener('resize', scheduleTocUpdate);
        window.addEventListener('hashchange', scheduleTocUpdate);
        updateToc();
    }

    // Make static toolkit templates actually reusable.
    document.querySelectorAll('.template-block.template-code').forEach((block, index) => {
        const actions = document.createElement('div');
        actions.className = 'site-action-row';
        const copy = document.createElement('button');
        const download = document.createElement('button');
        copy.className = download.className = 'site-action';
        copy.type = download.type = 'button';
        copy.textContent = isZh() ? '复制模板' : 'Copy template';
        download.textContent = isZh() ? '下载文本' : 'Download text';
        const templateText = () => {
            const preferred = block.querySelector(isZh() ? '.lang-zh' : '.lang-en');
            return (preferred || block).textContent.trim();
        };
        copy.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(templateText());
                copy.textContent = isZh() ? '已复制' : 'Copied';
            } catch {
                copy.textContent = isZh() ? '复制失败，请手动选择' : 'Copy failed; select manually';
            }
        });
        download.addEventListener('click', () => {
            const blob = new Blob([templateText()], {type: 'text/plain;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `SQDMC-template-${index + 1}.txt`;
            anchor.click();
            URL.revokeObjectURL(url);
        });
        actions.append(copy, download);
        block.insertAdjacentElement('beforebegin', actions);
    });

    // Keep every non-homepage footer consistent while preserving the bespoke homepage footer.
    const footer = document.querySelector('footer');
    const footerFile = location.pathname.split('/').pop() || 'index.html';
    if (footer && footerFile !== 'index.html') {
        footer.className = 'bg-gray-800 text-gray-300 py-12 mt-16';
        footer.innerHTML = `
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="site-footer-grid grid gap-x-12 gap-y-8 mb-8">
                    <div>
                        <div class="flex items-center gap-2 mb-3">
                            <i data-lucide="archive" class="text-white w-5 h-5"></i>
                            <span class="font-bold text-white text-lg">SQDMC Guide</span>
                        </div>
                        <p class="text-sm text-gray-400">Sensitive Qualitative Data Management &amp; Curation Guide for researchers and data practitioners.</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-3 text-sm">Modules</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="module1.html" class="hover:text-white transition-colors">1 &middot; Foundations</a></li>
                            <li><a href="module2.html" class="hover:text-white transition-colors">2 &middot; Full Lifecycle Management</a></li>
                            <li><a href="module3.html" class="hover:text-white transition-colors">3 &middot; Legal &amp; Ethical Frameworks</a></li>
                            <li><a href="module4.html" class="hover:text-white transition-colors">4 &middot; Curation &amp; Archiving</a></li>
                            <li><a href="module5.html" class="hover:text-white transition-colors">5 &middot; Case Practice</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white mb-3 text-sm">Resources</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="tools.html" class="hover:text-white transition-colors">Learning Materials</a></li>
                            <li><a href="references.html" class="hover:text-white transition-colors">References</a></li>
                            <li><a href="glossary.html" class="hover:text-white transition-colors">Glossary</a></li>
                        </ul>
                    </div>
                    <div class="pt-7">
                        <ul class="space-y-2 text-sm">
                            <li><a href="index.html" class="hover:text-white transition-colors">Home</a></li>
                            <li><a href="about.html" class="hover:text-white transition-colors">About</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-700 pt-6 text-xs text-gray-500 text-center">For educational reference only. Not legal or professional advice.</div>
            </div>`;
        if (window.lucide) window.lucide.createIcons();
    }

    // Source notes point straight to the issuing body; Related Materials still lead to the reference guide.
    const sourceTargets = {
        'references.html#pdpo': 'https://www.pcpd.org.hk/english/data_privacy_law/6_data_protection_principles/principles.html',
        'references.html#pdpo-crossborder': 'https://www.pcpd.org.hk/english/resources_centre/publications/files/GN_crossborder_e.pdf',
        'references.html#gdpr': 'https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=en',
        'references.html#common-rule': 'https://www.hhs.gov/ohrp/regulations-and-policy/regulations/45-cfr-46/index.html',
        'references.html#nist-sanitization': 'https://csrc.nist.gov/pubs/sp/800/88/r2/final',
        'references.html#ukds-anonymisation': 'https://ukdataservice.ac.uk/learning-hub/research-data-management/anonymisation/anonymising-qualitative-data/',
        'references.html#ddi': 'https://ddialliance.org/product_overview',
        'references.html#fair': 'https://www.go-fair.org/fair-principles/',
        'references.html#datacite': 'https://schema.datacite.org/'
    };
    document.querySelectorAll('a[href^="references.html#"]').forEach(link => {
        const sourceNote = link.closest('p, sup');
        const target = sourceTargets[link.getAttribute('href')];
        if (target && sourceNote && /source|来源/i.test(sourceNote.textContent)) link.href = target;
    });

    // Present the reference cards in the same module order as the guide.
    if (false && footerFile === 'references.html') {
        const referenceList = document.querySelector('main > .space-y-5');
        if (referenceList) {
            const card = id => document.getElementById(id);
            const websiteCard = (id, en, zh, entries) => {
                const section = document.createElement('section');
                section.id = id;
                section.className = 'reference-card scroll-mt-24 border border-gray-200 rounded-xl p-6';
                section.innerHTML = `<h3 class="font-semibold text-lg text-gray-900"><span class="lang-en">${en}</span><span class="lang-zh">${zh}</span></h3><div class="mt-3 space-y-3 text-sm text-gray-600">${entries.map(entry => `<div><a class="text-primary underline font-medium" href="${entry.url}" target="_blank" rel="noopener">${entry.name}</a><p class="mt-1"><span class="lang-en">${entry.en}</span><span class="lang-zh">${entry.zh}</span></p></div>`).join('')}</div>`;
                return section;
            };
            const module2Web = websiteCard('module2-web-sources', 'Module 2: Regulatory web sources', '模块 2：法规网页来源', [
                {name: 'EUR-Lex — Regulation (EU) 2016/679 (GDPR)', url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=en', en: 'Official GDPR text for lawful bases, research safeguards, data-subject rights and transfers.', zh: 'GDPR 官方文本，涵盖合法依据、研究保障、数据主体权利与跨境传输。'},
                {name: 'GDPR-info — Chapter V', url: 'https://gdpr-info.eu/chapter-5/', en: 'Plain-language guide to GDPR Chapter V rules on international data transfers.', zh: 'GDPR 第五章国际数据传输规则的易读指引。'}
            ]);
            const module4Web = websiteCard('module4-web-sources', 'Module 4: Additional web sources', '模块 4：补充网页来源', [
                {name: 'UK Data Service — Anonymising qualitative data', url: 'https://ukdataservice.ac.uk/learning-hub/research-data-management/anonymisation/anonymising-qualitative-data/', en: 'Practical guidance for planning and carrying out risk-based qualitative anonymisation.', zh: '用于规划和实施风险导向定性资料匿名化的实务指引。'},
                {name: 'ARX — Data Anonymization Tool', url: 'https://arx.deidentifier.org/', en: 'Open-source anonymisation software supporting formal privacy models and utility trade-offs.', zh: '支持正式隐私模型及数据可用性权衡的开源匿名化软件。'},
                {name: 'Disclosure Risk Assessment learning path', url: 'https://centre.humdata.org/learning-path/disclosure-risk-assessment-overview/prepare-the-disclosure-risk-assessment/', en: 'Step-by-step learning resource for preparing a disclosure-risk assessment.', zh: '用于准备披露风险评估的分步学习资源。'}
            ]);
            const groups = [
                {en: 'Module 1 · Foundations', zh: '模块 1 · 基础', cards: [card('risk-assessment'), card('sensitivity-assessment'), card('module1-3-risk-triage')]},
                {en: 'Module 2 · Full Lifecycle Management', zh: '模块 2 · 全生命周期管理', cards: [card('consent-resources'), card('module2-2-processing'), card('module2-3-storage-security'), card('module2-4-sharing'), card('module2-5-retention'), card('pdpo-crossborder'), module2Web, card('nist-sanitization')]},
                {en: 'Module 3 · Legal & Ethical Frameworks', zh: '模块 3 · 法律与伦理框架', cards: [card('pdpo'), card('gdpr'), card('common-rule')]},
                {en: 'Module 4 · Curation & Archiving', zh: '模块 4 · 策展与归档', cards: [module4Web, card('ddi'), card('fair'), card('datacite')]},
                {en: 'Module 5 · Case Practice', zh: '模块 5 · 案例练习', cards: [card('module5-case-practice')]}
            ];
            const fragments = document.createDocumentFragment();
            groups.forEach(group => {
                const wrapper = document.createElement('section');
                wrapper.className = 'space-y-5 pt-8 first:pt-0';
                wrapper.innerHTML = `<h2 class="border-b border-gray-200 pb-3 text-xl font-bold text-gray-900"><span class="lang-en">${group.en}</span><span class="lang-zh">${group.zh}</span></h2>`;
                group.cards.filter(Boolean).forEach(item => wrapper.appendChild(item));
                fragments.appendChild(wrapper);
            });
            referenceList.replaceChildren(fragments);
        }
    }

    // Expand the practical context for every learning-material and tool card.
    if (footerFile === 'tools.html' && !document.body.hasAttribute('data-static-tool-descriptions')) {
        const toolDetails = {
            'UK Data Service': {
                en: 'A practical video library for researchers preparing qualitative material for deposit. It explains the connected workflow of data management, anonymisation, consent, sharing and archiving, making it especially useful from project planning through repository submission.',
                zh: '面向准备归档定性资料的研究者的视频资源库。内容串联数据管理、去标识化、知情同意、数据共享与归档流程，适合从项目规划到提交仓储的各阶段使用。'
            },
            'ICPSR': {
                en: 'Step-by-step learning on professional curation, confidentiality and disclosure-risk assessment. The deposit-workflow demonstrations are useful when turning a completed study into a well-documented, responsibly accessible data package.',
                zh: '提供专业数据策展、保密与披露风险评估的分步学习内容。数据提交流程演示尤其适合在研究完成后，将资料整理为文档完善、可负责任访问的数据包。'
            },
            'Stats4SD': {
                en: 'A four-part, accessible introduction to the purpose, characteristics and lifecycle of qualitative data. It is a good starting point for learners who need a practical overview before applying more detailed governance or curation guidance.',
                zh: '四集系列从定性数据的作用、特征和流转过程入手，提供易于理解的基础框架。适合作为学习更细致的数据治理或策展指引之前的实践性入门。'
            },
            'QDR & SSRC': {
                en: 'A free self-guided course with four modules on planning, managing, sharing and writing with qualitative data. Its 27 exercises and worked solutions make it particularly valuable for converting guidance into repeatable project decisions.',
                zh: '免费的自主学习课程，涵盖定性数据的规划、管理、共享和写作四个模块。课程配有 27 个练习及答案，特别适合将原则转化为可重复执行的项目决策。'
            },
            'QDR': {
                en: 'A specialist repository for qualitative and multi-method social-science data, hosted by Syracuse University. It offers expert support on curation, consent, anonymisation and access management—particularly relevant when sensitive material needs a sustainable sharing pathway.',
                zh: '由雪城大学托管的定性与多方法社会科学专业仓储，提供策展、知情同意、去标识化和访问管理支持，尤其适合为敏感资料设计可持续的共享路径。'
            },
            'UK Data Service / Qualidata': {
                en: 'A long-established source of detailed guidance on qualitative-data archiving. Use it to work through anonymisation choices, consent wording and full-lifecycle curation decisions before data are prepared for deposit or reuse.',
                zh: '历史悠久的定性数据归档指导资源，可用于梳理去标识化选择、同意书措辞和全生命周期策展决策，再着手准备资料归档或再利用。'
            },
            'QualCoder': {
                en: 'Free, cross-platform QDA software for coding and analysing text, PDFs, images, audio and video. It suits researchers who want a locally controlled workflow, while its AI-assisted coding suggestions and thematic clustering can help organise larger bodies of material.',
                zh: '免费的跨平台定性数据分析软件，支持文本、PDF、图像、音频和视频的编码与分析。适合希望在本地掌控数据流程的研究者；AI 辅助编码建议和主题聚类也能帮助整理较大规模资料。'
            },
            'OpenQDA': {
                en: 'A web-based open-source platform designed for collaborative coding. Its research-process-oriented interface, plug-in architecture and REFI-compatible data structure make it useful for teams that need interoperable transfer, analysis and visualisation workflows.',
                zh: '面向协作编码的网页开源平台。其研究流程导向界面、开放插件架构和兼容 REFI 的数据结构，适合需要互操作数据传输、分析与可视化流程的团队。'
            },
            'Taguette': {
                en: 'A lightweight open-source tool for real-time multi-user qualitative projects. It supports common document formats and exports codebooks, highlighted documents and SQLite files, making it a practical choice for transparent coding and handover.',
                zh: '轻量级开源定性研究工具，支持实时多用户协作及多种常见文档格式，并可导出代码本、高亮文档和 SQLite 文件，适合进行透明编码和项目交接。'
            },
            'QualiAnon': {
                en: 'A semi-automated open-source option for anonymising and pseudonymising transcripts and field notes. Researchers retain control over what is changed and when, making it better suited to nuanced qualitative narratives than a fully automatic replacement process.',
                zh: '用于访谈转录稿和田野笔记去标识化、假名化的半自动开源工具。研究者可控制修改哪些内容及何时修改，因此比全自动替换更适合处理细腻的定性叙事。'
            },
            'De-ID App': {
                en: 'A commercial interview-text review tool that flags sensitive information by risk level: HIPAA-protected identifiers in red, medium-risk dates and locations in yellow, and lower-risk content in blue. It can support systematic human review rather than replace it.',
                zh: '商业化访谈文本审查工具，按风险等级以颜色标记敏感信息：红色为 HIPAA 受保护标识符，黄色为日期和地点等中等风险信息，蓝色为较低风险内容。它适合支持系统化人工复核，而非取代人工判断。'
            },
            'ARX': {
                en: 'A comprehensive open-source anonymisation environment with a graphical interface for large datasets. It supports k-anonymity, l-diversity, t-closeness and differential privacy, so it is useful when a project needs to compare formal privacy models and their utility trade-offs.',
                zh: '功能全面、带图形界面的开源匿名化环境，可处理较大规模数据集，并支持 k-匿名性、l-多样性、t-接近性和差分隐私。适合需要比较正式隐私模型及其数据可用性权衡的项目。'
            },
            'sdcMicro': {
                en: 'A World Bank-developed R package for statistical disclosure control, risk estimation and anonymisation of microdata. It is best for users with basic R and statistics knowledge who need a reproducible, script-based disclosure-risk workflow.',
                zh: '由世界银行开发的 R 语言包，用于微观数据的统计披露控制、风险估计和匿名化。适合具备基础 R 与统计知识、需要可复现脚本化披露风险流程的使用者。'
            }
        };
        const recommendedUse = {
            'UK Data Service': {en: 'Recommended use: begin here when designing a data-management plan or preparing interview material for deposit.', zh: '推荐使用方式：在制定数据管理计划或准备将访谈资料提交归档时优先参考。'},
            'ICPSR video': {en: 'Recommended use: follow the demonstrations when documenting files, assessing disclosure risk and preparing a deposit package.', zh: '推荐使用方式：在编制文件说明、评估披露风险及准备数据提交包时跟随演示操作。'},
            'Stats4SD': {en: 'Recommended use: use as an orientation resource for new researchers or research teams before assigning data-management roles.', zh: '推荐使用方式：适合新研究者或研究团队在分配数据管理职责前进行入门学习。'},
            'QDR & SSRC': {en: 'Recommended use: complete the exercises alongside an active project, recording decisions in the project data-management documentation.', zh: '推荐使用方式：结合正在进行的项目完成练习，并将决策记录到项目数据管理文档中。'},
            'QDR': {en: 'Recommended use: consult early—before recruitment or consent materials are finalised—when a future repository deposit is likely.', zh: '推荐使用方式：如计划未来归档，应在招募和同意书材料定稿前及早咨询。'},
            'ICPSR repository': {en: 'Recommended use: consider it when a study needs professionally managed restricted access rather than open download.', zh: '推荐使用方式：当研究需要专业管理的受限访问，而非公开下载时，可优先考虑。'},
            'UK Data Service / Qualidata': {en: 'Recommended use: use its guidance to review consent language and anonymisation choices at each lifecycle hand-off.', zh: '推荐使用方式：可在数据生命周期的每次交接时，用其指引复核同意书措辞和去标识化选择。'},
            'QualCoder': {en: 'Recommended use: choose it for local, mixed-media analysis where the research team needs close control of files and coding decisions.', zh: '推荐使用方式：适合需要严密控制本地文件和编码决策的混合媒体定性分析。'},
            'OpenQDA': {en: 'Recommended use: choose it for teams that need a shared web workspace and compatible transfer between research stages or tools.', zh: '推荐使用方式：适合需要共享网页工作区，并在研究阶段或工具之间进行兼容传递的团队。'},
            'Taguette': {en: 'Recommended use: use it for smaller collaborative projects that need simple coding, reviewable outputs and straightforward handover files.', zh: '推荐使用方式：适合需要简明编码、可审阅输出及易于交接文件的小型协作项目。'},
            'QualiAnon': {en: 'Recommended use: apply it during a human-led review of transcripts, retaining an audit trail of replacements and unresolved contextual risks.', zh: '推荐使用方式：适合在人工主导的转录稿复核中使用，并保留替换记录及未解决语境风险的审计轨迹。'},
            'De-ID App': {en: 'Recommended use: use the flags to prioritise review, then make final contextual decisions with the research team or data steward.', zh: '推荐使用方式：可利用颜色标记确定复核优先级，再由研究团队或数据管理员作出最终语境判断。'},
            'ARX': {en: 'Recommended use: use it to test alternative privacy settings and document the resulting protection-versus-utility trade-offs.', zh: '推荐使用方式：可用于测试不同隐私参数，并记录保护程度与数据可用性之间的权衡。'},
            'sdcMicro': {en: 'Recommended use: use it when the assessment must be reproducible in code and supported by explicit statistical disclosure-risk evidence.', zh: '推荐使用方式：适合需要通过代码复现评估，并以明确统计披露风险证据支持决策的情形。'}
        };
        document.querySelectorAll('.resource').forEach(card => {
            const title = card.querySelector('b')?.textContent.trim() || '';
            let detail = Object.entries(toolDetails).filter(([name]) => title.startsWith(name)).sort(([a], [b]) => b.length - a.length)[0]?.[1];
            if (title.startsWith('ICPSR') && card.href.includes('icpsr.umich.edu')) {
                detail = {
                    en: 'The world\'s largest social-science data archive, offering professional curation and tiered restricted-use agreements for qualitative studies. It is particularly relevant for projects that need strong confidentiality controls and a managed route for access to sensitive data.',
                    zh: '全球最大的社会科学数据档案馆，为定性研究提供专业策展与分级受限访问协议。特别适合需要严格保密控制，并为敏感资料设计受管理访问路径的项目。'
                };
            }
            let use = Object.entries(recommendedUse).filter(([name]) => title.startsWith(name)).sort(([a], [b]) => b.length - a.length)[0]?.[1];
            if (title.startsWith('ICPSR') && card.href.includes('youtube.com')) use = recommendedUse['ICPSR video'];
            if (title.startsWith('ICPSR') && card.href.includes('icpsr.umich.edu')) use = recommendedUse['ICPSR repository'];
            const summary = card.querySelector('p');
            if (!detail || !use || !summary) return;
            summary.classList.add('hidden');
            const description = document.createElement('div');
            description.className = 'mt-2 text-sm text-gray-600 space-y-2';
            description.innerHTML = `<p><span class="lang-en">${detail.en}</span><span class="lang-zh">${detail.zh}</span></p><p class="text-xs text-gray-500"><span class="lang-en">${use.en}</span><span class="lang-zh">${use.zh}</span></p>`;
            summary.insertAdjacentElement('afterend', description);
        });
    }

    // Improve current-page semantics.
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('a[href]').forEach(link => {
        if (link.getAttribute('href') === currentFile) link.setAttribute('aria-current', 'page');
    });
})();
