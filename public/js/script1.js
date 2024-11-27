// Songs Data - Add your songs here
const songsData = [
    {
        title: "Warriyo",
        artist: "Mortals",
        coverPath: "assets/Cover/1.jpg",
        audioPath: "assets/Songs/1.mp3"
    },
    {
        title: "Cielo",
        artist: "Huma",
        coverPath: "assets/Cover/2.jpg",
        audioPath: "assets/Songs/2.mp3"
    },
    {
        title: "Invincible",
        artist: "NCS",
        coverPath: "assets/Cover/3.jpg",
        audioPath: "assets/Songs/3.mp3"
    },
    {
        title: "Heart",
        artist: "NCS",
        coverPath: "assets/Cover/4.jpg",
        audioPath: "assets/Songs/4.mp3"
    },
    {
        title: "Heaven",
        artist: "Huma",
        coverPath: "assets/Cover/5.jpg",
        audioPath: "assets/Songs/5.mp3"
    },
    {
        title: "EH!DE",
        artist: "Jojo",
        coverPath: "assets/Cover/6.jpg",
        audioPath: "assets/Songs/6.mp3"
    },
    {
        title: "Heroes",
        artist: "Jojo",
        coverPath: "assets/Cover/7.jpg",
        audioPath: "assets/Songs/7.mp3"
    },
    {
        title: "Different",
        artist: "Sia",
        coverPath: "assets/Cover/8.jpg",
        audioPath: "assets/Songs/8.mp3"
    },
    {
        title: "New",
        artist: "Sia",
        coverPath: "assets/Cover/9.jpg",
        audioPath: "assets/Songs/9.mp3"
    },
    {
        title: "Love",
        artist: "Mortals",
        coverPath: "assets/Cover/10.jpg",
        audioPath: "assets/Songs/10.mp3"
    },
    // Add more songs as needed
];

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const playButton = document.querySelector('.control-button.play');
const pauseButton = document.querySelector('.control-button.pause');
const progressBar = document.querySelector('.progress-slider');
const progress = document.querySelector('.progress');
const volumeSlider = document.querySelector('.volume-slider');
const volumeProgress = document.querySelector('.volume-progress');
const currentTime = document.querySelector('.time.current');
const totalTime = document.querySelector('.time.total');
const prevButton = document.querySelector('.control-button.previous');
const nextButton = document.querySelector('.control-button.next');
const shuffleButton = document.querySelector('.control-button.shuffle');
const repeatButton = document.querySelector('.control-button.repeat');
const likeButton = document.querySelector('.like-button');
const searchInput = document.querySelector('.search-bar input');
const musicCards = document.querySelectorAll('.music-card');
const songCards = document.querySelectorAll('.song-card');
const nowPlayingImage = document.querySelector('.now-playing img');
const nowPlayingTitle = document.querySelector('.now-playing h4');
const nowPlayingArtist = document.querySelector('.now-playing p');

// Audio Object
const audio = new Audio();

// State Management
let isPlaying = false;
let currentVolume = 1;
let isShuffle = false;
let repeatMode = 'none'; // none, one, all
let currentTrackIndex = 0;

// Navigation Handling
function handleNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            item.classList.add('active');
            const pageId = `${item.dataset.page}-page`;
            document.getElementById(pageId)?.classList.add('active');
        });
    });
}

function toggleDropdown() {
    document.getElementById("userDropdown").classList.toggle("show");
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.user-profile, .user-profile *')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


// Player Controls
function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    } else {
        audio.pause();
        playButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

function loadTrack(index) {
    currentTrackIndex = index;
    const song = songsData[index];
    
    audio.src = song.audioPath;
    nowPlayingImage.src = song.coverPath;
    nowPlayingTitle.textContent = song.title;
    nowPlayingArtist.textContent = song.artist;
    
    updateTimeDisplay();
    
    if (isPlaying) {
        audio.play();
    }
}

function playNextTrack() {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * songsData.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % songsData.length;
    }
    loadTrack(currentTrackIndex);
}

function playPreviousTrack() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else {
        currentTrackIndex = (currentTrackIndex - 1 + songsData.length) % songsData.length;
        loadTrack(currentTrackIndex);
    }
}

// Progress Bar Functions
function updateProgress(value) {
    progress.style.width = `${value}%`;
}

function handleProgressBarClick(e) {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newTime = (percentage / 100) * audio.duration;
    audio.currentTime = newTime;
    updateProgress(percentage);
}

// Volume Control
function updateVolume(value) {
    currentVolume = value / 100;
    audio.volume = currentVolume;
    volumeProgress.style.width = `${value}%`;
}

function handleVolumeClick(e) {
    const rect = volumeSlider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    updateVolume(percentage);
}

// Time Display
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimeDisplay() {
    currentTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent = formatTime(audio.duration);
}

// Shuffle and Repeat
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleButton.style.color = isShuffle ? '#C4184B' : 'inherit';
}

function toggleRepeat() {
    switch (repeatMode) {
        case 'none':
            repeatMode = 'all';
            repeatButton.textContent = '🔁';
            repeatButton.style.color = '#C4184B';
            break;
        case 'all':
            repeatMode = 'one';
            repeatButton.textContent = '🔂';
            break;
        case 'one':
            repeatMode = 'none';
            repeatButton.textContent = '🔁';
            repeatButton.style.color = 'inherit';
            break;
    }
}

// Like Button
function toggleLike() {
    const isLiked = likeButton.textContent === '♥';
    likeButton.textContent = isLiked ? '♡' : '♥';
    
}


// Search Functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const allMusicItems = [...musicCards, ...songCards];
    
    allMusicItems.forEach(item => {
        const title = item.querySelector('h3, h4').textContent.toLowerCase();
        const artist = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || artist.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize first track
    if (songsData.length > 0) {
        loadTrack(0);
    }

    // Navigation
    handleNavigation();

    // Player Controls
    playButton.addEventListener('click', togglePlayPause);
    pauseButton.addEventListener('click', togglePlayPause);
    prevButton.addEventListener('click', playPreviousTrack);
    nextButton.addEventListener('click', playNextTrack);
    shuffleButton.addEventListener('click', toggleShuffle);
    repeatButton.addEventListener('click', toggleRepeat);
    likeButton.addEventListener('click', toggleLike);

    // Progress and Volume
    progressBar.addEventListener('click', handleProgressBarClick);
    volumeSlider.addEventListener('click', handleVolumeClick);

    // Audio Events
    audio.addEventListener('timeupdate', () => {
        const percentage = (audio.currentTime / audio.duration) * 100;
        updateProgress(percentage);
        updateTimeDisplay();
    });

    audio.addEventListener('ended', () => {
        if (repeatMode === 'one') {
            audio.currentTime = 0;
            audio.play();
        } else if (repeatMode === 'all' || currentTrackIndex < songsData.length - 1) {
            playNextTrack();
        } else {
            isPlaying = false;
            playButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';
        }
    });

    // Search
    searchInput.addEventListener('input', handleSearch);

    // Song Cards
    songCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            loadTrack(index);
            isPlaying = true;
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline-block';
            audio.play();
        });
    });
});

// Drag functionality
let isDraggingProgress = false;
let isDraggingVolume = false;

progressBar.addEventListener('mousedown', () => isDraggingProgress = true);
volumeSlider.addEventListener('mousedown', () => isDraggingVolume = true);

document.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) {
        handleProgressBarClick(e);
    }
    if (isDraggingVolume) {
        handleVolumeClick(e);
    }
});

document.addEventListener('mouseup', () => {
    isDraggingProgress = false;
    isDraggingVolume = false;
});

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
    } else if (e.code === 'ArrowLeft') {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    } else if (e.code === 'ArrowRight') {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const playerControls = document.querySelector('.player-controls');
    const playButton = playerControls.querySelector('.control-button.play');
    const pauseButton = playerControls.querySelector('.control-button.pause');
    
    // Flag to track playing state
    let isPlaying = false;
    
    // Function to toggle play/pause
    function togglePlayPause() {
        isPlaying = !isPlaying;
        playerControls.classList.toggle('playing', isPlaying);
        
        // Here you can add your audio playing logic
        if (isPlaying) {
            // Add code to play audio
            console.log('Playing audio');
        } else {
            // Add code to pause audio
            console.log('Pausing audio');
        }
    }
    
    // Add click event listeners
    playButton.addEventListener('click', togglePlayPause);
    pauseButton.addEventListener('click', togglePlayPause);
    
    // Add click handlers for other buttons
    const shuffleButton = playerControls.querySelector('.control-button.shuffle');
    const previousButton = playerControls.querySelector('.control-button.previous');
    const nextButton = playerControls.querySelector('.control-button.next');
    const repeatButton = playerControls.querySelector('.control-button.repeat');
    
    shuffleButton.addEventListener('click', () => {
        console.log('Shuffle clicked');
        // Add your shuffle functionality here
    });
    
    previousButton.addEventListener('click', () => {
        console.log('Previous clicked');
        // Add your previous track functionality here
    });
    
    nextButton.addEventListener('click', () => {
        console.log('Next clicked');
        // Add your next track functionality here
    });
    
    repeatButton.addEventListener('click', () => {
        console.log('Repeat clicked');
        // Add your repeat functionality here
    });
});