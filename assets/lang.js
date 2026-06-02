// Bilingual toggle: switches body[data-lang] between "ja" and "en".
// CSS hides the inactive language block via [data-lang-block].
// Choice persists in localStorage so the user keeps the same language across pages.

(function () {
    var KEY = 'meon-lang';
    var supported = ['ja', 'en'];

    function detectInitial() {
        var saved = null;
        try { saved = localStorage.getItem(KEY); } catch (e) {}
        if (saved && supported.indexOf(saved) >= 0) return saved;
        var nav = (navigator.language || 'ja').toLowerCase();
        return nav.indexOf('ja') === 0 ? 'ja' : 'en';
    }

    function applyLang(lang) {
        document.documentElement.lang = lang;
        document.body.setAttribute('data-lang', lang);
        var btn = document.querySelector('.lang-switch');
        if (btn) btn.textContent = lang === 'ja' ? 'EN' : '日本語';
        // Swap document <title> if a bilingual title is provided in <meta>
        var jaTitle = document.querySelector('meta[name="title-ja"]');
        var enTitle = document.querySelector('meta[name="title-en"]');
        if (jaTitle && enTitle) {
            document.title = (lang === 'ja' ? jaTitle.content : enTitle.content);
        }
    }

    function init() {
        var lang = detectInitial();
        applyLang(lang);
        var btn = document.querySelector('.lang-switch');
        if (btn) {
            btn.addEventListener('click', function () {
                var current = document.body.getAttribute('data-lang') || 'ja';
                var next = current === 'ja' ? 'en' : 'ja';
                try { localStorage.setItem(KEY, next); } catch (e) {}
                applyLang(next);
            });
        }
        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
