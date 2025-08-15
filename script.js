const mainButtons = [
    { class: 'correct', text: '正确', sound: './sound/correct.mp3', icon: '✓' },
    { class: 'wrong', text: '错误', sound: './sound/error.mp3', icon: '✗' },
    { class: 'victory', text: '胜利通关', sound: './sound/success.mp3', icon: '🏆' },
    { class: 'failure', text: '通关失败', sound: './sound/failure.mp3', icon: '💀' },
];

const smallButtons = [
    { text: '尴尬', sound: './sound/ganga.mp3' },
    { text: '背媳妇', sound: './sound/beixifu.mp3' },
];


// 预加载音效
document.addEventListener('DOMContentLoaded', function() {
    const mainButtonsContainer = document.querySelector('.buttons-container');
    const smallButtonsContainer = document.querySelector('.small-buttons-container');
    const statusEl = document.querySelector('.status');
    const stopAllBtn = document.getElementById('stop-all-btn');

    const allSounds = [];

    // 创建并预加载音频对象
    function createAndPreloadSound(src) {
        const sound = new Audio();
        sound.src = src;
        sound.preload = 'auto';
        sound.load();
        allSounds.push(sound);
        return sound;
    }

    // 动态生成主要按钮并设置事件
    mainButtons.forEach(config => {
        const button = document.createElement('button');
        button.className = `base-btn btn ${config.class}`;
        button.innerHTML = `<span class="btn-icon">${config.icon}</span><span>${config.text}</span>`;
        
        const sound = createAndPreloadSound(config.sound);

        button.addEventListener('touchstart', () => {
            sound.currentTime = 0;
            sound.play();
            animateButton(config.class);
        });

        button.addEventListener('touchend', () => {
            button.classList.remove('playing');
        });

        mainButtonsContainer.appendChild(button);
    });
    
    // 动态生成小按钮并设置事件
    smallButtons.forEach(config => {
        const button = document.createElement('button');
        button.className = 'base-btn small-btn';
        button.innerHTML = `<span class="small-btn-icon">🎵</span><span>${config.text}</span>`;
        
        const sound = createAndPreloadSound(config.sound);

        button.addEventListener('touchstart', () => {
            sound.currentTime = 0;
            sound.play();
        });

        smallButtonsContainer.appendChild(button);
    });

    // 停止所有音效
    stopAllBtn.addEventListener('touchstart', () => {
        allSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    });
    
    // 按钮点击动画
    function animateButton(className) {
        const btn = document.querySelector(`.btn.${className}`);
        btn.classList.add('playing');
        
        setTimeout(() => {
            btn.classList.remove('playing');
        }, 500);
    }
});