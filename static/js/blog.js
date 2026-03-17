/* Clickable post cards */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.list__item.post').forEach(function (card) {
        var link = card.querySelector('.post__title a');
        if (!link) return;
        card.style.cursor = 'pointer';
        card.addEventListener('click', function (e) {
            if (e.target.closest('a, button')) return;
            window.location.href = link.href;
        });
    });
});

/* Widget "show more" buttons */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.widget-more-btn').forEach(function (btn) {
        var widget = btn.closest('.widget');
        var hidden = widget.querySelectorAll('.widget-extra').length;
        btn.textContent = 'Ещё ' + hidden + ' ↓';

        btn.addEventListener('click', function () {
            var expanded = widget.classList.toggle('widget-expanded');
            btn.setAttribute('aria-expanded', String(expanded));
            btn.textContent = expanded ? 'Скрыть ↑' : 'Ещё ' + hidden + ' ↓';
        });
    });
});

/* Back to top button */
(function () {
    var btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
