(function () {
    'use strict';

    const storageKey = 'sqdmc_project';
    const readProject = () => {
        try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
        catch { return {}; }
    };
    const writeProject = project => localStorage.setItem(storageKey, JSON.stringify(project));
    const isZh = () => document.body.classList.contains('show-zh');
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));

    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            nav .site-mobile-menu { display:flex !important; position:absolute; left:0; right:0; top:100%;
                flex-direction:column; gap:0; padding:1rem 1.5rem; background:white; border-bottom:1px solid #e5e7eb;
                box-shadow:0 12px 24px rgba(0,0,0,.08); }
            nav .site-mobile-menu a, nav .site-mobile-menu button { padding:.65rem 0; }
        }
        .site-workflow-card { max-width:72rem; margin:1rem auto 0; padding:0 1.5rem; }
        .site-action-row { display:flex; flex-wrap:wrap; gap:.5rem; margin:.75rem 0; }
        .site-action { border:1px solid #d1d5db; border-radius:.375rem; padding:.45rem .75rem; font-size:.75rem;
            background:#fff; color:#374151; cursor:pointer; }
        .site-action:hover, .site-action:focus { border-color:#0f5132; color:#0f5132; outline:none; }
    `;
    document.head.appendChild(style);

    // Mobile navigation shared by all pages.
    const mobileButton = document.querySelector('nav button.md\\:hidden');
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
        if (checkbox.closest('#jurisdiction-check')) return;
        const key = `sqdmc_check_${location.pathname}_${index}`;
        checkbox.checked = localStorage.getItem(key) === '1';
        checkbox.addEventListener('change', () => localStorage.setItem(key, checkbox.checked ? '1' : '0'));
    });

    // Show the cross-module project state after a risk assessment has been completed.
    const project = readProject();
    if (project.riskTier && !document.body.dataset.hideWorkflowState) {
        const nav = document.querySelector('nav');
        if (nav) {
            const tierText = {
                low: isZh() ? '低风险初筛' : 'Low-risk triage',
                medium: isZh() ? '中风险初筛' : 'Medium-risk triage',
                high: isZh() ? '高风险初筛' : 'High-risk triage'
            }[project.riskTier] || project.riskTier;
            const box = document.createElement('div');
            box.className = 'site-workflow-card';
            box.innerHTML = `<div class="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span>${isZh() ? '当前项目状态' : 'Current project state'}：<strong>${escapeHtml(tierText)}</strong>${project.jurisdictions ? ` · ${escapeHtml(project.jurisdictions)}` : ''}${project.deidTier ? ` · ${escapeHtml(project.deidTier)}` : ''}</span>
                <a class="text-primary font-medium hover:underline" href="module1.html#section1-2">${isZh() ? '重新评估' : 'Reassess'}</a>
            </div>`;
            nav.insertAdjacentElement('afterend', box);
        }
    }

    // Jurisdiction check: educational routing, not an automated legal opinion.
    const jurisdictionCheck = document.getElementById('jurisdiction-check');
    if (jurisdictionCheck) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-secondary';
        button.textContent = isZh() ? '保存管辖范围初筛' : 'Save jurisdiction triage';
        const output = document.createElement('p');
        output.className = 'mt-3 text-sm text-gray-700';
        jurisdictionCheck.append(button, output);
        button.addEventListener('click', () => {
            const checked = Array.from(jurisdictionCheck.querySelectorAll('input[type="checkbox"]:checked')).map(item => item.dataset.label);
            const current = readProject();
            current.jurisdictions = checked.length ? checked.join(' + ') : (isZh() ? '仅机构规则，仍需人工核实' : 'Institutional rules only; manual verification required');
            current.jurisdictionAssessedAt = new Date().toISOString();
            writeProject(current);
            output.textContent = isZh()
                ? `已保存：${current.jurisdictions}。这只是导航提示，不构成法律意见。`
                : `Saved: ${current.jurisdictions}. This is routing guidance, not legal advice.`;
        });
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

    // Export a compact, non-sensitive project record from the toolkit.
    const toolkitMain = document.querySelector('main');
    if (toolkitMain && /tools\.html$/i.test(location.pathname)) {
        const panel = document.createElement('section');
        panel.className = 'rounded-xl border border-primary/20 bg-primary/5 p-5';
        panel.innerHTML = `<h2 class="font-semibold text-gray-900">${isZh() ? '项目决策记录' : 'Project decision record'}</h2>
            <p class="text-sm text-gray-600 mt-1">${isZh() ? '仅导出本设备保存的风险、管辖和去标识化级别；不要在此记录参与者身份。' : 'Exports only risk, jurisdiction and de-identification settings stored on this device. Do not record participant identities here.'}</p>`;
        const actions = document.createElement('div');
        actions.className = 'site-action-row';
        const exportButton = document.createElement('button');
        exportButton.className = 'site-action';
        exportButton.textContent = isZh() ? '导出 JSON 记录' : 'Export JSON record';
        exportButton.addEventListener('click', () => {
            const data = JSON.stringify(readProject(), null, 2);
            const url = URL.createObjectURL(new Blob([data], {type: 'application/json'}));
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'SQDMC-project-record.json';
            anchor.click();
            URL.revokeObjectURL(url);
        });
        actions.append(exportButton);
        panel.append(actions);
        toolkitMain.prepend(panel);
    }

    // Improve current-page semantics.
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('a[href]').forEach(link => {
        if (link.getAttribute('href') === currentFile) link.setAttribute('aria-current', 'page');
    });
})();
