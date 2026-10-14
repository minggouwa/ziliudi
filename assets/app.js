/* ==========================================================
   明狗娃的自留地 — 交互脚本
   ========================================================== */

/* ---------------- 打字机小标题（改这里换文案）---------------- */
const TYPED_LINES = [
  '慢慢来，比较快',
  '把日子过成自己喜欢的样子',
  '做点有用又好玩的东西',
  '生活里的小确幸，值得记下来',
  '把重复的活交给机器，把时间留给自己'
];

/* ---------------- 网站导航（改这里换站点）---------------- */
const GUIDE_GROUPS = [
  {
    name: '常用',
    sites: [
      { name: 'GitHub', icon: '🐙', desc: '代码托管与开源社区', url: 'https://github.com/' },
      { name: '掘金', icon: '💎', desc: '中文技术社区，前端后端都在这看', url: 'https://juejin.cn/' },
      { name: '知乎', icon: '📘', desc: '有问题先搜一圈', url: 'https://www.zhihu.com/' },
      { name: '哔哩哔哩', icon: '📺', desc: '教程、开箱和电子榨菜', url: 'https://www.bilibili.com/' }
    ]
  },
  {
    name: 'AI 工具',
    sites: [
      { name: 'ChatGPT', icon: '🤖', desc: '通用对话与写作助手', url: 'https://chatgpt.com/' },
      { name: 'Claude', icon: '🧠', desc: '长文本、写代码、读文档', url: 'https://claude.ai/' },
      { name: '即梦 AI', icon: '🎨', desc: '图像与视频生成', url: 'https://jimeng.jianying.com/' },
      { name: '可灵 AI', icon: '🎬', desc: '视频生成', url: 'https://klingai.kuaishou.com/' }
    ]
  },
  {
    name: '设计 · 素材',
    sites: [
      { name: 'Figma', icon: '🧩', desc: '界面设计与协作', url: 'https://www.figma.com/' },
      { name: 'Dribbble', icon: '🏀', desc: '设计灵感社区', url: 'https://dribbble.com/' },
      { name: 'Unsplash', icon: '🖼️', desc: '免费高清图库', url: 'https://unsplash.com/' },
      { name: 'iconfont', icon: '✒️', desc: '阿里矢量图标库', url: 'https://www.iconfont.cn/' }
    ]
  },
  {
    name: '效率工具',
    sites: [
      { name: 'TinyPNG', icon: '🗜️', desc: '图片无损压缩', url: 'https://tinypng.com/' },
      { name: 'Carbon', icon: '⌨️', desc: '把代码贴成好看的图片', url: 'https://carbon.now.sh/' },
      { name: 'JSON 在线解析', icon: '🔧', desc: '格式化、校验、转结构', url: 'https://www.json.cn/' },
      { name: 'Regex101', icon: '🔍', desc: '正则表达式调试', url: 'https://regex101.com/' }
    ]
  }
];

/* ---------------- 文章（示例占位，待替换）---------------- */
const POSTS = [
  {
    date: '2021-07-15',
    title: '搭建博客',
    excerpt: '记一次从零把静态博客跑起来的过程 —— 域名、托管、主题，踩过的坑都在这儿。',
    url: 'https://minggouwa.github.io/2021/07/搭建博客/index.html'
  },
  {
    date: '2024-03-02',
    title: '素材攒多了怎么办',
    excerpt: '从几百个 G 的散装文件夹，到能按产品线、类别一级级找下去 —— 我的素材管理思路。',
    url: 'https://minggouwa.github.io/'
  },
  {
    date: '2025-11-18',
    title: '我的 AI 工具清单',
    excerpt: '这两年攒下来的趁手家伙：出图的、出片的、对口型的，哪些真在用，哪些吃灰了。',
    url: 'https://minggouwa.github.io/'
  }
];

/* ---------------- 工具 ---------------- */
const arrowSvg =
  '<span class="card-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg></span>';

function hostOf(url) {
  try { return new URL(url).host.replace(/^www\./, ''); } catch (e) { return ''; }
}

function renderGuide() {
  const box = document.getElementById('guideGroups');
  if (!box) return;

  let idx = 0;
  box.innerHTML = GUIDE_GROUPS.map((g) => {
    const cards = g.sites
      .map((s) => {
        const html = `
          <a class="card" style="--i:${idx}" href="${s.url}" target="_blank" rel="noopener">
            <div class="card-head">
              <div class="card-icon">${s.icon}</div>
              <div class="card-name">${s.name}</div>
            </div>
            <div class="card-desc">${s.desc}</div>
            <div class="card-meta">${hostOf(s.url)}</div>
            ${arrowSvg}
          </a>`;
        idx += 1;
        return html;
      })
      .join('');

    return `
      <div class="group">
        <div class="group-title">
          <span>${g.name}</span>
          <span class="count">${g.sites.length}</span>
          <span class="rule"></span>
        </div>
        <div class="grid">${cards}</div>
      </div>`;
  }).join('');
}

function renderPosts() {
  const box = document.getElementById('postList');
  if (!box) return;
  box.innerHTML = POSTS.map(
    (p) => `
      <a class="post" href="${p.url}" target="_blank" rel="noopener">
        <span class="post-date">${p.date}</span>
        <span class="post-main">
          <span class="post-title">${p.title}</span>
          <span class="post-excerpt">${p.excerpt}</span>
        </span>
      </a>`
  ).join('');
}

/* ---------------- 打字机 ---------------- */
function initTyped() {
  const el = document.getElementById('typed');
  if (!el || !TYPED_LINES.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = TYPED_LINES[0];
    return;
  }

  const TYPE = 105, DEL = 52, HOLD = 1900, GAP = 420;
  let line = 0, ch = 0, deleting = false;

  function tick() {
    const text = TYPED_LINES[line];
    ch += deleting ? -1 : 1;
    el.textContent = text.slice(0, ch);

    if (!deleting && ch === text.length) {
      deleting = true;
      return setTimeout(tick, HOLD);
    }
    if (deleting && ch === 0) {
      deleting = false;
      line = (line + 1) % TYPED_LINES.length;
      return setTimeout(tick, GAP);
    }
    return setTimeout(tick, deleting ? DEL : TYPE);
  }

  setTimeout(tick, 700);
}

/* ---------------- 顶栏：滚过首页变实底 ---------------- */
function initTopbar() {
  const bar = document.getElementById('topbar');
  const hero = document.getElementById('top');
  if (!bar || !hero) return;

  const onScroll = () => {
    const threshold = Math.max(hero.offsetHeight - 76, 120);
    bar.classList.toggle('solid', window.scrollY > threshold);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
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
    try { localStorage.setItem('mgw-theme', next); } catch (e) {}
    sync();
  });
}

/* ---------------- 卡片跟随光效 ---------------- */
function initCardGlow() {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest ? e.target.closest('.card') : null;
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

/* ---------------- 初始化 ---------------- */
function init() {
  renderGuide();
  renderPosts();
  initTyped();
  initTopbar();
  initTheme();
  initCardGlow();

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
