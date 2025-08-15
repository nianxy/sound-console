// 预加载音效
document.addEventListener('DOMContentLoaded', function() {
    // 创建音频对象
    const correctSound = new Audio();
    const wrongSound = new Audio();
    const victorySound = new Audio();
    const failureSound = new Audio();
    
    // 设置音频源 - 这里使用免费在线音效链接
    correctSound.src = './sound/correct.mp3';
    wrongSound.src = './sound/error.mp3';
    victorySound.src = './sound/success.mp3';
    failureSound.src = './sound/failure.mp3';
    
    // 设置预加载
    correctSound.preload = 'auto';
    wrongSound.preload = 'auto';
    victorySound.preload = 'auto';
    failureSound.preload = 'auto';
    
    // 预加载音频
    correctSound.load();
    wrongSound.load();
    victorySound.load();
    failureSound.load();
    
    // 状态显示
    const statusEl = document.querySelector('.status');
    
    // 等待所有音效加载完成
    const sounds = [correctSound, wrongSound];
    let soundsLoaded = 0;
    
    sounds.forEach(sound => {
        sound.addEventListener('canplaythrough', () => {
            soundsLoaded++;
            if(soundsLoaded === sounds.length) {
                statusEl.textContent = '音效已准备就绪';
            }
        });
        
        sound.addEventListener('error', () => {
            statusEl.textContent = '音效加载出错，请检查网络连接';
        });
    });
    
    // 点击按钮播放相应音效
    document.querySelector('.btn.correct').addEventListener('touchstart', () => {
        correctSound.currentTime = 0;
        correctSound.play();
        animateButton('correct');
    });
    
    document.querySelector('.btn.correct').addEventListener('touchend', () => {
        document.querySelector('.btn.correct').classList.remove('playing');
    });
    
    document.querySelector('.btn.wrong').addEventListener('touchstart', () => {
        wrongSound.currentTime = 0;
        wrongSound.play();
        animateButton('wrong');
    });
    
    document.querySelector('.btn.wrong').addEventListener('touchend', () => {
        document.querySelector('.btn.wrong').classList.remove('playing');
    });
    
    document.querySelector('.btn.victory').addEventListener('touchstart', () => {
        victorySound.currentTime = 0;
        victorySound.play();
        animateButton('victory');
    });
    
    document.querySelector('.btn.victory').addEventListener('touchend', () => {
        document.querySelector('.btn.victory').classList.remove('playing');
    });
    
    document.querySelector('.btn.failure').addEventListener('touchstart', () => {
        failureSound.currentTime = 0;
        failureSound.play();
        animateButton('failure');
    });
    
    document.querySelector('.btn.failure').addEventListener('touchend', () => {
        document.querySelector('.btn.failure').classList.remove('playing');
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