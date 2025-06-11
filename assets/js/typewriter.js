document.addEventListener('DOMContentLoaded', () => {
    const typeText = document.querySelector('.type-text');
    const cursor = document.querySelector('.type-cursor');
    const words = [
        "AI/ML Engineer",
        "Full-Stack Developer",
        "Data Analyst",
        "Python Expert",
        "Problem Solver"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);

        typeText.textContent = currentChar;
        cursor.classList.add('typing');

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            cursor.classList.remove('typing');

            if (!isDeleting) {
                isDeleting = true;
                setTimeout(type, 1000);
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            }
        }
    }

    setTimeout(type, 1000);
});
