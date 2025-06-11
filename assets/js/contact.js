document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
            submitBtn.disabled = true;
            
            // In a real implementation, this would be handled by Web3Forms
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="bx bx-check"></i>';
            }, 1500);
            
            // For demo purposes only - remove in production
            e.preventDefault();
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Send Message</span><i class="bx bx-send"></i>';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        });
    }
});