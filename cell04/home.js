function openModal(agentId) {
  document.getElementById(`modal-${agentId}`).style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Animate skill bars
  const progressBars = document.querySelectorAll(`#modal-${agentId} .progress-fill`);
  progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
          bar.style.width = width;
      }, 100);
  });
}

function closeModal(agentId) {
  document.getElementById(`modal-${agentId}`).style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal-overlay')) {
      event.target.style.display = 'none';
      document.body.style.overflow = 'auto';
  }
}

// Import statements for React component
import $ from "jquery";
import { useEffect } from "react";
import $ from "jquery";
import { useEffect } from "react";

const Example = () => {
useEffect(() => {
  // Add smooth fade-in animation for all elements
  $(".profile-card").hide().fadeIn(1000);
  
  // Add hover effects
  $(".profile-card").hover(
    function() {
      $(this).find(".hover-effect").css("opacity", "1");
    },
    function() {
      $(this).find(".hover-effect").css("opacity", "0");
    }
  );
}, []);

return (
  <div id="myDiv" className="glassmorphism">
    Hello jQuery in React
  </div>
);
};

export default Example;