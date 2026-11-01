

// =================================
// SWEETIE - LOVE SURPRISE APP
// =================================

// 1. SCREEN NAVIGATION

function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  const navItems = document.querySelectorAll('.nav-item');

  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  navItems.forEach(item => {
    item.classList.remove('active');
  });

  const selectedScreen = document.getElementById(screenId);

  if (!selectedScreen) return;

  selectedScreen.classList.add('active');

  const selectedNav = document.querySelector(
    `.nav-item[data-screen="${screenId}"]`
  );

  if (selectedNav) {
    selectedNav.classList.add('active');
  }

  // Reset scroll position
  selectedScreen.scrollTop = 0;
}


// 2. FLOATING HEART ANIMATION

const heartsBg = document.getElementById('heartsBg');

function createFloatingHeart() {
  const heart = document.createElement('span');

  heart.className = 'floating-heart';

  const hearts = ['💗', '💕', '♡', '🌸', '💖'];

  heart.innerText =
    hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left = Math.random() * 100 + '%';

  heart.style.animationDuration =
    (5 + Math.random() * 4) + 's';

  heart.style.fontSize =
    (12 + Math.random() * 15) + 'px';

  heartsBg.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createFloatingHeart, 900);


// 3. MUSIC PLAYER

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const albumArt = document.getElementById('albumArt');

function toggleMusic() {
  if (!audioPlayer.src) return;

  if (audioPlayer.paused) {
    audioPlayer.play()
      .then(() => {
        playBtn.innerText = 'Ⅱ';
        albumArt.classList.add('playing');
      })
      .catch(() => {
        alert('Please add a valid music file in assets/music.mp3');
      });
  } else {
    audioPlayer.pause();

    playBtn.innerText = '▶';
    albumArt.classList.remove('playing');
  }
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

audioPlayer.addEventListener('loadedmetadata', () => {
  duration.innerText = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', () => {
  if (!audioPlayer.duration) return;

  const percentage =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;

  progress.value = percentage;

  currentTime.innerText =
    formatTime(audioPlayer.currentTime);
});

progress.addEventListener('input', () => {
  if (audioPlayer.duration) {
    audioPlayer.currentTime =
      (progress.value / 100) * audioPlayer.duration;
  }
});

audioPlayer.addEventListener('ended', () => {
  playBtn.innerText = '▶';
  albumArt.classList.remove('playing');
  progress.value = 0;
});

audioPlayer.addEventListener('pause', () => {
  playBtn.innerText = '▶';
  albumArt.classList.remove('playing');
});


// 4. SECRET PASSWORD

const SECRET_PASSWORD = 'aashish';

function unlockSurprise() {
  const passwordInput =
    document.getElementById('secretPassword');

  const passwordMessage =
    document.getElementById('passwordMessage');

  const unlockedMessage =
    document.getElementById('unlockedMessage');

  const giftIcon =
    document.getElementById('giftIcon');

  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === SECRET_PASSWORD) {

    passwordMessage.innerText = 'Correct password! 💗';

    giftIcon.innerText = '🎉';

    unlockedMessage.classList.remove('hidden');

    passwordInput.disabled = true;

    passwordInput.style.display = 'none';

    document.querySelector(
      '.secret-box > .primary-btn'
    ).style.display = 'none';

    celebrate();

  } else {

    passwordMessage.innerText =
      'Oops! Wrong password. Try again 🥺';

    passwordInput.value = '';

    passwordInput.focus();

  }
}

// Enter key also unlocks the surprise

document.getElementById('secretPassword')
  .addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      unlockSurprise();
    }
  });


// 5. FINAL CELEBRATION

function celebrate() {

  const emojis = [
    '💗', '❤️', '💕', '💖',
    '🌸', '✨', '💝', '🥰'
  ];

  for (let i = 0; i < 35; i++) {

    const element = document.createElement('div');

    element.className = 'celebration-heart';

    element.innerText =
      emojis[Math.floor(Math.random() * emojis.length)];

    element.style.left = Math.random() * 100 + 'vw';

    element.style.animationDelay =
      Math.random() * 1.5 + 's';

    element.style.fontSize =
      (15 + Math.random() * 25) + 'px';

    document.body.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 5000);

  }
}


// 6. INITIAL APP SETUP

document.addEventListener('DOMContentLoaded', () => {

  showScreen('home');

  // Welcome animation
  setTimeout(() => {
    createFloatingHeart();
  }, 500);

});
