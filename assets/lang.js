// Bilingual toggle: switches body[data-lang] between "ja" and "en".
// CSS hides the inactive language block via [data-lang-block].
// Choice persists in localStorage and propagates to every page in the site.
// Also listens to the storage event so other open tabs update live.

(function () {
    var KEY = 'meon-lang';
    var SUPPORTED = ['ja', 'en'];

    function detectInitial() {
        var saved = null;
        try { saved = localStorage.getItem(KEY); } catch (e) {}
        if (saved && SUPPORTED.indexOf(saved) >= 0) return saved;
        var nav = (navigator.language || 'ja').toLowerCase();
        return nav.indexOf('ja') === 0 ? 'ja' : 'en';
    }

    function applyLang(lang) {
        document.documentElement.lang = lang;
        document.body.setAttribute('data-lang', lang);

        // Update language switcher labels
        var labels = document.querySelectorAll('.lang-switch__label');
        labels.forEach(function (el) {
            el.textContent = (lang === 'ja') ? 'JA' : 'EN';
        });
        var btns = document.querySelectorAll('.lang-switch');
        btns.forEach(function (b) {
            b.setAttribute('aria-label',
                lang === 'ja' ? '言語を切り替える (現在: 日本語)' : 'Switch language (current: English)');
            b.setAttribute('title',
                lang === 'ja' ? 'English に切り替え' : '日本語に切り替え');
        });

        // Swap document.title using bilingual meta tags
        var jaTitle = document.querySelector('meta[name="title-ja"]');
        var enTitle = document.querySelector('meta[name="title-en"]');
        if (jaTitle && enTitle) {
            document.title = (lang === 'ja' ? jaTitle.content : enTitle.content);
        }
    }

    function setLang(next) {
        try { localStorage.setItem(KEY, next); } catch (e) {}
        applyLang(next);
    }

    function init() {
        applyLang(detectInitial());

        // Click handler — works for any .lang-switch on the page
        document.addEventListener('click', function (ev) {
            var btn = ev.target.closest && ev.target.closest('.lang-switch');
            if (!btn) return;
            ev.preventDefault();
            var current = document.body.getAttribute('data-lang') || 'ja';
            setLang(current === 'ja' ? 'en' : 'ja');
        });

        // Cross-tab sync — when another open tab toggles the language,
        // update this tab automatically.
        window.addEventListener('storage', function (ev) {
            if (ev.key === KEY && ev.newValue && SUPPORTED.indexOf(ev.newValue) >= 0) {
                applyLang(ev.newValue);
            }
        });

        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
