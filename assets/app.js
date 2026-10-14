/* ==========================================================
   明狗娃的自留地 — 交互脚本
   ========================================================== */

/* 部署信息：第一次推送前确认仓库名 */
const REPO = 'ziliudi';
const HOST = 'DESKTOP-UICVL2T'; // 本机主机名，内网访问用

/* ---------------- 数据：内网工具 ----------------
   port 为 null 表示走默认端口或不带端口 */
const TOOL_GROUPS = [
  {
    name: '数据与运营',
    tools: [
      { name: '罗盘', icon: '🧭', desc: '腾讯广告数据聚合看板，5 个主体 641 个账号一屏汇总', port: 8000 },
      { name: '谛听', icon: '🎧', desc: '电商多渠道数据采集：小店投放 / 妙思灵感 / 即创 / 短视频洞察', port: 8850 },
      { name: '内容监看大屏', icon: '📺', desc: '直播间与内容线的实时监看大屏', port: 8899 },
      { name: '微信豆数据统计', icon: '📊', desc: '视频号投放消耗与效果统计', port: null }
    ]
  },
  {
    name: '视频生产',
    tools: [
      { name: 'H3 工作台', icon: '🎬', desc: 'MiniMax H3 视频生成：文生视频 / 首尾帧 / 全能参考 / 多机调度', port: 8900 },
      { name: 'Minimax 导演台', icon: '🎛️', desc: '多机任务调度控制台，云端 GPU 统一排队出片', port: 8910 },
      { name: 'H3 场景素材工厂', icon: '🏭', desc: '批量场景素材生产：自动发散场景 + 提示词 + 云端出片', port: 8912 },
      { name: '智能剪辑', icon: '✂️', desc: '拆稿 → 配音 → 对口型 → 对齐 → 空镜 → 合成 六步流水线', port: 8600 },
      { name: '视频号对口型工坊', icon: '👄', desc: '数字人对口型，直接产出竖屏营销成片', port: 5056 },
      { name: 'Qwen Image 2.1', icon: '🖼️', desc: '本地文生图 / 图生图工作台，带历史与批量重跑', port: 7870 }
    ]
  },
  {
    name: '素材库',
    tools: [
      { name: '万象镜头库', icon: '🌌', desc: '按产品线 / 类别 / 子类别组织的镜头素材库', port: 8130 },
      { name: 'AI 镜库', icon: '🔭', desc: '素材归档与衍生视频内容生成', port: 8121 },
      { name: '杭州素材库', icon: '🗂️', desc: '素材归档库', port: 8120 }
    ]
  },
  {
    name: '效率工具',
    tools: [
      { name: '观策内容团队工作台', icon: '🧰', desc: '内容团队局域网协作台：成片典藏 / ADQ / 数据罗盘', port: 4180 },
      { name: '与AI同行工作台', icon: '🤝', desc: '本地 AI 工具整合包', port: 7860 },
      { name: 'FG 素材调度看板', icon: '📌', desc: '直播间素材调度与分配', port: 8765 },
      { name: '企业豆包水印抹除', icon: '💧', desc: '批量去水印并自动转码交付', port: 3000 },
      { name: '智能采集', icon: '📡', desc: '7 渠道素材实时采集与榜单聚合', port: 8851 }
    ]
  }
];

/* ---------------- 数据：公开作品 ---------------- */
const WORKS = [
  {
    name: '明狗娃的博客',
    icon: '📖',
    desc: 'Hexo 博客，教程 / 资源 / 生活杂记',
    url: 'https://minggouwa.github.io/',
    tag: 'Blog'
  },
  {
    name: 'Moogle',
    icon: '🔍',
    desc: 'GitHub 上的自留仓库',
    url: 'https://github.com/minggouwa/Moogle',
    tag: 'Repo'
  },
  {
    name: '狗抓',
    icon: '🐾',
    desc: '浏览器视频嗅探与下载扩展 v1.5.3',
    url: '',
    tag: 'Extension'
  },
  {
    name: '豆包无水印下载助手',
    icon: '⬇️',
    desc: '豆包原图 / 无水印视频下载扩展 v1.1.0',
    url: '',
    tag: 'Extension'
  },
  {
    name: '自留地新标签页',
    icon: '🗔',
    desc: '自用新标签页：卡片网格 + 书签 v5.7',
    url: '',
    tag: 'Extension'
  }
];

/* ---------------- 渲染 ---------------- */
const arrowSvg =
  '<span class="card-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg></span>';

function cardHtml(item, isLan) {
  const href = isLan ? `http://${HOST}:${item.port}` : item.url;

  const meta = isLan
    ? `<div class="card-meta lan">内网${item.port ? ` · :${item.port}` : ''}</div>`
    : `<div class="card-meta">${item.tag || 'Link'}</div>`;

  const inner = `
    <div class="card-head">
      <div class="card-icon">${item.icon}</div>
      <div class="card-name">${item.name}</div>
    </div>
    <div class="card-desc">${item.desc}</div>
    ${meta}
    ${href ? arrowSvg : ''}
  `;

  if (!href) return `<div class="card" tabindex="0">${inner}</div>`;

  const extra = isLan ? ' title="需要在我的局域网内访问"' : ' target="_blank" rel="noopener"';
  return `<a class="card" href="${href}"${extra}>${inner}</a>`;
}

function renderTools() {
  const box = document.getElementById('toolGroups');
  if (!box) return;

  let idx = 0;
  box.innerHTML = TOOL_GROUPS.map((g) => {
    const cards = g.tools
      .map((t) => {
        const html = cardHtml(t, true).replace('class="card"', `class="card" style="--i:${idx}"`);
        idx += 1;
        return html;
      })
      .join('');
    return `
      <div class="group">
        <div class="group-title">
          <span>${g.name}</span>
          <span class="count">${g.tools.length}</span>
          <span class="rule"></span>
        </div>
        <div class="grid">${cards}</div>
      </div>`;
  }).join('');
}

function renderWorks() {
  const box = document.getElementById('workGrid');
  if (!box) return;
  box.innerHTML = WORKS.map((w, i) => {
    return cardHtml(w, false).replace('class="card"', `class="card" style="--i:${i}"`);
  }).join('');
}

/* ---------------- 主题 ---------------- */
const SUN =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2.5 12h2M19.5 12h2M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5"/></svg>';
const MOON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z"/></svg>';

function initTheme() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;

  const sync = () => {
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    btn.innerHTML = dark ? SUN : MOON;
  };

  sync();
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('mgw-theme', next);
    } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'light' ? '#f4f7fb' : '#070b11');
    sync();
  });
}

/* ---------------- 卡片光效跟随 ---------------- */
function initCardGlow() {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

/* ---------------- 回到顶部 ---------------- */
function initToTop() {
  const btn = document.getElementById('toTop');
  if (!btn) return;

  const onScroll = () => btn.classList.toggle('show', window.scrollY > 460);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------- 初始化 ---------------- */
function init() {
  renderTools();
  renderWorks();
  initTheme();
  initCardGlow();
  initToTop();

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const repoLink = document.getElementById('repoLink');
  if (repoLink) repoLink.href = `https://github.com/minggouwa/${REPO}`;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
