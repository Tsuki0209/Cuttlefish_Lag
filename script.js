// script.js

// 詳細を表示/非表示にする関数
function showDetails(id) {
    const element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// スムーズスクロールを有効化
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// フィルター機能
document.addEventListener('DOMContentLoaded', () => {
    const lagTypeFilter = document.getElementById('lag-type-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');

    function applyFilters() {
        const selectedLagType = lagTypeFilter.value;
        const selectedDifficulty = difficultyFilter.value;

        // すべての .technique 要素を取得
        const techniques = document.querySelectorAll('#advanced .technique');
        // すべてのセクション見出し（共通、スプラトゥーン2、スプラトゥーン3）を表示
        const sectionHeaders = document.querySelectorAll('#advanced h3:not(.technique h3)');
        sectionHeaders.forEach(header => header.classList.remove('hidden'));

        techniques.forEach(technique => {
            // 「使用ラグ」のテキスト（例: "使用ラグ : Limit, Block"）
            const lagText = technique.querySelector('p:nth-of-type(1)').textContent.replace('使用ラグ : ', '').trim();
            // 「難易度」のテキスト（例: "難易度 : 低"）
            const difficultyText = technique.querySelector('p:nth-of-type(2)').textContent;

            // ラグの種類を厳密に比較
            const lagMatch = selectedLagType === '' || lagText === selectedLagType;

            // 難易度を厳密に比較（"難易度 : "を除去して比較）
            const difficultyValue = difficultyText.replace('難易度 : ', '').trim();
            const difficultyMatch = selectedDifficulty === '' || difficultyValue === selectedDifficulty;

            // 両方の条件を満たす場合に表示
            if (lagMatch && difficultyMatch) {
                technique.classList.remove('hidden');
            } else {
                technique.classList.add('hidden');
            }
        });
    }

    // フィルター変更時に適用
    lagTypeFilter.addEventListener('change', applyFilters);
    difficultyFilter.addEventListener('change', applyFilters);

    // 初期表示時にフィルターを適用
    applyFilters();
});